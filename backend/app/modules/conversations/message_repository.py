from abc import ABC, abstractmethod

from sqlalchemy.orm import Session

from app.db.models.message import Message


class MessageRepository(ABC):
    """
    Repository contract for message persistence.
    """

    @abstractmethod
    def create(
        self,
        message: Message,
    ) -> Message:
        raise NotImplementedError

    @abstractmethod
    def get_by_external_id(
        self,
        external_message_id: str,
    ) -> Message | None:
        raise NotImplementedError


class SQLMessageRepository(MessageRepository):
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
        message: Message,
    ) -> Message:

        self.db.add(message)
        self.db.commit()
        self.db.refresh(message)

        return message

    def get_by_external_id(
        self,
        external_message_id: str,
    ) -> Message | None:

        return (
            self.db.query(Message)
            .filter(
                Message.external_message_id
                == external_message_id
            )
            .first()
        )
