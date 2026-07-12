from datetime import datetime
from enum import Enum
from uuid import uuid4

from sqlalchemy import (
    DateTime,
    Enum as SQLEnum,
    ForeignKey,
    String,
    Text,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class MessageDirection(str, Enum):
    """Direction of a WhatsApp message."""

    INBOUND = "INBOUND"
    OUTBOUND = "OUTBOUND"


class MessageType(str, Enum):
    """Supported WhatsApp message types."""

    TEXT = "TEXT"
    IMAGE = "IMAGE"
    VIDEO = "VIDEO"
    AUDIO = "AUDIO"
    DOCUMENT = "DOCUMENT"
    LOCATION = "LOCATION"
    CONTACT = "CONTACT"
    INTERACTIVE = "INTERACTIVE"
    REACTION = "REACTION"
    UNKNOWN = "UNKNOWN"


class Message(Base):
    """
    Immutable WhatsApp message.

    This table is the authoritative record
    of every inbound and outbound message.
    """

    __tablename__ = "messages"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    conversation_id: Mapped[str] = mapped_column(
        ForeignKey("conversations.id"),
        nullable=False,
        index=True,
    )

    external_message_id: Mapped[str] = mapped_column(
        String(128),
        nullable=False,
        unique=True,
        index=True,
    )

    direction: Mapped[MessageDirection] = mapped_column(
        SQLEnum(
            MessageDirection,
            name="message_direction",
        ),
        nullable=False,
    )

    message_type: Mapped[MessageType] = mapped_column(
        SQLEnum(
            MessageType,
            name="message_type",
        ),
        nullable=False,
    )

    sender_phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    whatsapp_timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    conversation: Mapped["Conversation"] = relationship(
        back_populates="messages",
    )

    delivery_events: Mapped[list["DeliveryEvent"]] = relationship(
        back_populates="message",
    )