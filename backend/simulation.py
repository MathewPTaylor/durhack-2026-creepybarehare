from backend.models import Actor, ActorType

actors = {
    "hospital-alpha": Actor(
        actor_id="hospital-alpha",
        name="Hospital Alpha",
        actor_type=ActorType.HOSPITAL,
        location="north"
    ),

    "shelter-north": Actor(
        actor_id="shelter-north",
        name="Northern Shelter",
        actor_type=ActorType.SHELTER,
        location="north"
    ),

    "vehicle-3": Actor(
        actor_id="vehicle-3",
        name="Ambulance",
        actor_type=ActorType.VEHICLE,
        location="central"
    ),

    "vehicle-2": Actor(
        actor_id="vehicle-2",
        name="Police",
        actor_type= ActorType.VEHICLE,
        location = "south"
    ),

    "vehicle-1": Actor(
        actor_id="vehicle-1",
        name="Fire",
        actor_type=ActorType.VEHICLE,
        location= "south"
    ),
    
    "sensor-north": Actor(
        actor_id="sensor-north",
        name="Northern Sensor",
        actor_type=ActorType.SENSOR,
        location="north"
    ),

    "sensor-central": Actor(
        actor_id="sensor-central",
        name="sensor-central",
        actor_type=ActorType.SENSOR,
        location="central",
    ),

    "sensor-south": Actor(
        actor_id="sensor-south",
        name="sensor-south",
        actor_type=ActorType.SENSOR,
        location="south",
    ),


}