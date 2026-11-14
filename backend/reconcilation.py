def reconcile_events(actors):


    all_events = {}

    for actor in actors.values():
        for event in actor.local_events:
            all_events[event.event_id] = event

    for actor in actors.values():
        actor.local_events = [
            all_events[event_id]
            for event_id in all_events
        ]

    return {
        "total_unique_events": len(all_events),
        "actors_reconciled": len(actors),
        "status": "RECONCILED"
    }