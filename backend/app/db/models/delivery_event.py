from datetime import datetime
from enum import Enum
from uuid import uuid4

from sqlalchemy import (
    DateTime,
    Enum as SQLEnum,
    ForeignKey,
    String,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class DeliveryStatus(str, Enum):
    """
    WhatsApp delivery lifecycle.
    """

    SENT = "SENT"
    DELIVERED = "DELIVERED"
    READ = "READ"
    FAILED = "FAILED"


class DeliveryEvent(Base):
    """
    Immutable delivery event for a message.
    """

    __tablename__ = "delivery_events"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    message_id: Mapped[str] = mapped_column(
        ForeignKey("messages.id"),
        nullable=False,
        index=True,
    )

    status: Mapped[DeliveryStatus] = mapped_column(
        SQLEnum(
            DeliveryStatus,
            name="delivery_status",
        ),
        nullable=False,
    )

    whatsapp_status: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
    )

    whatsapp_timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    received_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    message: Mapped["Message"] = relationship(
        back_populates="delivery_events",
    )