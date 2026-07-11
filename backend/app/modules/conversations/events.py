from dataclasses import dataclass
from datetime import datetime

from app.events.event_types import EventType


@dataclass(frozen=True)
class ConversationEvent:
    """
    Base event for the Conversation module.
    """

    event_type: EventType
    occurred_at: datetime


@dataclass(frozen=True)
class MessageStoredEvent(ConversationEvent):
    """
    Published after an incoming message
    has been successfully stored.
    """

    message_id: str
    conversation_id: str


@dataclass(frozen=True)
class MessageReceivedEvent(ConversationEvent):
    """
    Published after a new message becomes
    available for downstream processing.
    """

    message_id: str
    conversation_id: str


@dataclass(frozen=True)
class ConversationUpdatedEvent(ConversationEvent):
    """
    Published whenever a conversation's
    state changes.
    """

    conversation_id: str