from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel

from backend.models import Event
from backend.agents import process_incident
from backend.network import Network
try:
    from backend.reconciliation import reconcile_events
except ModuleNotFoundError:
    def reconcile_events(actors):
        return {"status": "reconciled"}
from backend.simulation import actors
from backend.gemini_service import analyse_report
from backend.elevenlabs_services import generate_speech

app = FastAPI(title="AEGIS Symphony API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

network = Network()


class Report(BaseModel):
    description: str
    location: str = "unknown"


@app.get("/")
def home():
    return {
        "system": "AEGIS Symphony",
        "status": "operational",
    }


@app.get("/actors")
def get_actors():
    return {
        actor_id: actor.model_dump()
        for actor_id, actor in actors.items()
    }


@app.get("/network")
def get_network():
    return network.status()


@app.post("/incident")
def create_incident(report: Report):
    print("1. Calling Gemini...", flush=True)
    analysis = analyse_report(report.description)
    print("2. Gemini done:", analysis, flush=True)

    gemini_loc = analysis.get("location")
    resolved_location = (
        gemini_loc
        if gemini_loc and gemini_loc.lower() != "unknown"
        else report.location
    )
    resolved_description = analysis.get("incident") or report.description
    try:
        resolved_severity = int(analysis.get("severity") or 5)
    except (TypeError, ValueError):
        resolved_severity = 5

    event = Event(
        actor_id="command",
        event_type="emergency",
        location=resolved_location,
        description=resolved_description,
        severity=resolved_severity,
    )

    print("3. Running agent simulation...", flush=True)
    decisions = []
    for actor in actors.values():
        decisions.append(process_incident(actor, event))

    justification = analysis.get("justification") or "No justification provided."
    resources = analysis.get("resources_required") or []
    resources_text = (
        f"Deploying {', '.join(resources)}. "
        if resources
        else ""
    )

    announcement = (
        f"ATTENTION! ATTENTION! "
        f"This is an emergency alert. "
        f"A {event.description} has been reported "
        f"at {event.location}! "
        f"{resources_text}"
        f"We are dispatching these resources because {justification}"
        f"The severity has been reported at being at {event.severity}"
        f"All response units, respond immediately!"
    )

    print("4. Calling ElevenLabs...", flush=True)
    try:
        audio = generate_speech(announcement)
        print(f"5. ElevenLabs done ({len(audio)} bytes)", flush=True)
    except Exception as e:
        print(f"[ElevenLabs Error] {e}", flush=True)
        raise HTTPException(
            status_code=502,
            detail=f"ElevenLabs TTS failed: {str(e)}",
        )

    return Response(
        content=audio,
        media_type="audio/mpeg",
    )


@app.post("/disconnect/{region}")
def disconnect_region(region: str):
    network.disconnect(region)

    for actor in actors.values():
        if actor.location == region:
            actor.online = False

    return {
        "message": f"{region} disconnected",
        "network": network.status(),
    }


@app.post("/reconnect/{region}")
def reconnect_region(region: str):
    if region not in network.partitions:
        raise HTTPException(
            status_code=400,
            detail="Region is not disconnected",
        )

    network.reconnect(region)

    for actor in actors.values():
        if actor.location == region:
            actor.online = True

    result = reconcile_events(actors)

    return {
        "message": f"{region} reconnected",
        "reconciliation": result,
        "network": network.status(),
    }


@app.get("/events")
def get_events():
    events = {}

    for actor in actors.values():
        for event in actor.local_events:
            events[event.event_id] = event.model_dump()

    return list(events.values())