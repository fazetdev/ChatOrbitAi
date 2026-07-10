from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, ConfigDict


class MessageType(str, Enum):
    """Supported WhatsApp message types."""

    TEXT = "text"
    IMAGE = "image"
    AUDIO = "audio"
    VIDEO = "video"
    DOCUMENT = "document"
    STICKER = "sticker"
    LOCATION = "location"
    CONTACT = "contact"
    INTERACTIVE = "interactive"
    UNKNOWN = "unknown"


class WebhookVerification(BaseModel):
    """Incoming webhook verification request."""

    model_config = ConfigDict(frozen=True)

    mode: str
    token: str
    challenge: str


class IncomingMessage(BaseModel):
    """Normalized incoming WhatsApp message."""

    model_config = ConfigDict(frozen=True)

    message_id: str
    phone_number_id: str
    from_number: str
    message_type: MessageType
    content: str
    timestamp: datetime


class OutgoingMessage(BaseModel):
    """Outgoing WhatsApp message."""

    model_config = ConfigDict(frozen=True)

    to: str
    content: str


class DeliveryStatus(BaseModel):
    """Normalized WhatsApp delivery status callback."""

    model_config = ConfigDict(frozen=True)

    message_id: str
    status: str
    timestamp: datetime
    recipient_id: Optional[str] = None