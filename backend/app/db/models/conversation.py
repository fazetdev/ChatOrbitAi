from datetime import datetime
from enum import Enum
from uuid import uuid4

from sqlalchemy import DateTime, Enum as SQLEnum, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ConversationStatus(str, Enum):
    """
    Current operational state of a conversation.
    """

    ACTIVE = "ACTIVE"
    ARCHIVED = "ARCHIVED"
    CLOSED = "CLOSED"


class Conversation(Base):
    """
    Operational view of a WhatsApp conversation.

    Messages remain the immutable source of truth.
    """

    __tablename__ = "conversations"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    contact_phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        index=True,
    )

    status: Mapped[ConversationStatus] = mapped_column(
        SQLEnum(
            ConversationStatus,
            name="conversation_status",
        ),
        nullable=False,
        default=ConversationStatus.ACTIVE,
    )

    last_message_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    unread_count: Mapped[int] = mapped_column(
        nullable=False,
        default=0,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    messages: Mapped[list["Message"]] = relationship(
        back_populates="conversation",
    )