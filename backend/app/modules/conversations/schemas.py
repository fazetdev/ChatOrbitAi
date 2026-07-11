from dataclasses import dataclass
from datetime import datetime
from enum import Enum


class ConversationStatus(str, Enum):
    """
    Current state of a conversation.
    """

    ACTIVE = "active"
    CLOSED = "closed"
    ARCHIVED = "archived"


class MessageDirection(str, Enum):
    """
    Direction of a message.
    """

    INBOUND = "inbound"
    OUTBOUND = "outbound"


@dataclass(frozen=True)
class Conversation:
    """
    Conversation aggregate.
    """

    conversation_id: str
    contact_id: str
    status: ConversationStatus
    created_at: datetime
    updated_at: datetime


@dataclass(frozen=True)
class ConversationMessage:
    """
    Internal conversation message.
    """

    message_id: str
    conversation_id: str
    direction: MessageDirection
    content: str
    message_type: str
    timestamp: datetime


@dataclass(frozen=True)
class ConversationState:
    """
    Current runtime state of a conversation.
    """

    conversation_id: str
    is_ai_locked: bool
    last_message_at: datetime