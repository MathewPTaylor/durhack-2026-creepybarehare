from enum import Enum
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import uuid


class ActorType(str, Enum):
    HOSPITAL = "hospital"
    SHELTER = "shelter"
    VEHICLE = "vehicle"
    SENSOR = "sensor"


class Event(BaseModel):
    event_id: str = ""
    actor_id: str
    event_type: str
    location: str
    description: str
    severity: int = 1
    timestamp: str = ""
    synced: bool = False

    def model_post_init(self, context):
        if not self.event_id:
            self.event_id = str(uuid.uuid4())
        if not self.timestamp:
            self.timestamp = datetime.now(
                timezone.utc
            ).isoformat()


class Actor(BaseModel):
    actor_id: str
    name: str
    actor_type: ActorType
    location: str
    online: bool = True
    resources: int = 100
    local_events: list[Event] = []