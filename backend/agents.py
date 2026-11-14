from backend.models import Actor, Event


def process_incident(actor: Actor, event: Event):


    if event.severity >= 8:
        decision = "PRIORITISE EMERGENCY"
    elif event.severity >= 5:
        decision = "INVESTIGATE INCIDENT"
    else:
        decision = "MONITOR SITUATION"

    if actor.actor_type == "hospital":
        if actor.resources < 20:
            decision = "REQUEST MEDICAL SUPPLIES"

    elif actor.actor_type == "shelter":
        if actor.resources < 30:
            decision = "REQUEST SHELTER SUPPLIES"

    elif actor.actor_type == "vehicle":
        if event.severity >= 8:
            decision = "REROUTE TO EMERGENCY"

    actor.local_events.append(event)

    return {
        "actor": actor.name,
        "decision": decision,
        "online": actor.online,
        "event_id": event.event_id
    }