from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.models import Message, DeliveryEvent


class WhatsAppRepository:
    """
    Repository for WhatsApp message persistence.
    """

    def __init__(
        self,
        db: Session,
    ) -> None:
        self.db = db

    def save_incoming_message(
        self,
        message: Message,
    ) -> Message:

        self.db.add(message)
        self.db.commit()
        self.db.refresh(message)

        return message

    def save_outgoing_message(
        self,
        message: Message,
    ) -> Message:

        self.db.add(message)
        self.db.commit()
        self.db.refresh(message)

        return message

    def save_delivery_status(
        self,
        event: DeliveryEvent,
    ) -> DeliveryEvent:

        self.db.add(event)
        self.db.commit()
        self.db.refresh(event)

        return event

    def get_by_external_message_id(
        self,
        external_message_id: str,
    ) -> Message | None:

        stmt = select(Message).where(
            Message.external_message_id == external_message_id
        )

        return self.db.scalar(stmt)
