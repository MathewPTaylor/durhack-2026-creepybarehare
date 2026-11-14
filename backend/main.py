from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from backend.models import Event
from backend.agents import process_incident
from backend.network import Network
from backend.reconciliation import reconcile_events
from backend.simulation import actors
from backend.gemini_service import analyse_report

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

    analysis = analyse_report(
        report.description
    )

    event = Event(
        actor_id="command",
        event_type="emergency",
        location=analysis.get(
            "location", report.location
        ),
        description=analysis.get(
            "incident", report.description
        ),
        severity=int(
            analysis.get("severity", 5)
        )
    )

    decisions = []

    for actor in actors.values():

        if network.is_connected(actor.location):
            decisions.append(
                process_incident(actor, event)
            )
        else:
            # The actor is isolated.
            # It still makes a local decision.
            decisions.append(
                process_incident(actor, event)
            )

    return {
        "incident": event.model_dump(),
        "analysis": analysis,
        "decisions": decisions
    }


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