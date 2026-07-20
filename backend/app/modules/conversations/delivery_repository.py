from abc import ABC, abstractmethod

from sqlalchemy.orm import Session

from app.db.models.delivery_event import DeliveryEvent


class DeliveryEventRepository(ABC):
    """
    Repository contract for delivery events.
    """

    @abstractmethod
    def create(
        self,
        event: DeliveryEvent,
    ) -> DeliveryEvent:
        raise NotImplementedError


class SQLDeliveryEventRepository(DeliveryEventRepository):
    """
    SQLAlchemy implementation.
    """

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        event: DeliveryEvent,
    ) -> DeliveryEvent:

        self.db.add(event)
        self.db.commit()
        self.db.refresh(event)

        return event
