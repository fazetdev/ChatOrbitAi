from dataclasses import dataclass

from app.events.event_types import EventType


@dataclass(frozen=True)
class WhatsAppEvent:
    """Base event for the WhatsApp module."""

    event_type: EventType


@dataclass(frozen=True)
class MessageReceivedEvent(WhatsAppEvent):
    """Published when an incoming WhatsApp message is received."""

    message_id: str
    tenant_id: str


@dataclass(frozen=True)
class MessageSentEvent(WhatsAppEvent):
    """Published when a WhatsApp message is sent."""

    message_id: str
    tenant_id: str


@dataclass(frozen=True)
class MessageFailedEvent(WhatsAppEvent):
    """Published when a WhatsApp message fails to send."""

    message_id: str
    tenant_id: str
