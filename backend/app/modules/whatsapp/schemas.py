from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class WebhookVerification:
    """Incoming webhook verification request."""

    mode: str
    token: str
    challenge: str


@dataclass(frozen=True)
class IncomingMessage:
    """Normalized incoming WhatsApp message."""

    message_id: str
    phone_number_id: str
    from_number: str
    message_type: str
    content: str
    timestamp: str


@dataclass(frozen=True)
class OutgoingMessage:
    """Outgoing WhatsApp message."""

    to: str
    content: str


@dataclass(frozen=True)
class DeliveryStatus:
    """WhatsApp delivery status update."""

    message_id: str
    status: str
    timestamp: str
    recipient_id: Optional[str] = None
