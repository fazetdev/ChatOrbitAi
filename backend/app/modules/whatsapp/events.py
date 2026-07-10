from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.events.event_types import EventType


class WhatsAppEvent(BaseModel):
    """Base event for the WhatsApp module."""

    model_config = ConfigDict(frozen=True)

    event_type: EventType
    occurred_at: datetime


class MessageReceivedEvent(WhatsAppEvent):
    """Published when an incoming WhatsApp message is received."""

    conversation_id: str
    message_id: str
    phone_number: str


class MessageSentEvent(WhatsAppEvent):
    """Published when a WhatsApp message is successfully sent."""

    conversation_id: str
    message_id: str


class MessageFailedEvent(WhatsAppEvent):
    """Published when a WhatsApp message fails to send."""

    conversation_id: str
    message_id: str
    reason: str