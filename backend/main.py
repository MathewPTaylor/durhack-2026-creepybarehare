
from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel

from backend.models import Event
from backend.agents import process_incident
from backend.network import Network
from backend.reconciliation import reconcile_events
from backend.simulation import actors
from backend.gemini_service import analyse_report
from backend.elevenlabs_services import generate_speech

app = FastAPI(title="AEGIS Symphony API")

network = Network()


class Report(BaseModel):
    description: str
    location: str = "unknown"


@app.get("/")
def home():
    return {
        "system": "AEGIS Symphony",
        "status": "operational"
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

    # Analyse report
    analysis = analyse_report(report.description)

    # Create event
    event = Event(
        actor_id="command",
        event_type="emergency",
        location=analysis.get("location", report.location),
        description=analysis.get("incident", report.description),
        severity=int(analysis.get("severity", 5))
    )

    decisions = []

    for actor in actors.values():
        decisions.append(
            process_incident(actor, event)
        )

    announcement = (
        f"[shouting] ATTENTION! ATTENTION! "
        f"This is an emergency alert. "
        f"A {event.description} has been reported "
        f"at {event.location}! "
        f"All response units, respond immediately!"
    )

    audio = generate_speech(announcement)

    return Response(
        content=audio,
        media_type="audio/mpeg"
    )

@app.post("/disconnect/{region}")
def disconnect_region(region: str):

        network.disconnect(region)

        for actor in actors.values():
            if actor.location == region:
                actor.online = False

        return {
            "message": f"{region} disconnected",
            "network": network.status()
        }


@app.post("/reconnect/{region}")
def reconnect_region(region: str):

    if region not in network.partitions:
        raise HTTPException(
            status_code=400,
            detail="Region is not disconnected"
        )

    network.reconnect(region)

    for actor in actors.values():
        if actor.location == region:
            actor.online = True

    result = reconcile_events(actors)

    return {
        "message": f"{region} reconnected",
        "reconciliation": result,
        "network": network.status()
    }


@app.get("/events")
def get_events():

    events = {}

    for actor in actors.values():
        for event in actor.local_events:
            events[event.event_id] = event.model_dump()

    return list(events.values())
