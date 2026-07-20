from abc import ABC, abstractmethod

from sqlalchemy.orm import Session

from app.db.models.conversation import Conversation
from app.db.models.message import Message


class ConversationRepository(ABC):
    """
    Repository contract for conversation persistence.
    """

    @abstractmethod
    def create(self, conversation: Conversation) -> Conversation:
        raise NotImplementedError

    @abstractmethod
    def get_by_id(self, conversation_id: str) -> Conversation | None:
        raise NotImplementedError

    @abstractmethod
    def save(self, conversation: Conversation) -> Conversation:
        raise NotImplementedError


class SQLConversationRepository(ConversationRepository):
    """
    SQLAlchemy implementation.
    """

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        conversation: Conversation,
    ) -> Conversation:

        self.db.add(conversation)
        self.db.commit()
        self.db.refresh(conversation)

        return conversation

    def get_by_id(
        self,
        conversation_id: str,
    ) -> Conversation | None:

        return (
            self.db.query(Conversation)
            .filter(
                Conversation.id == conversation_id
            )
            .first()
        )

    def save(
        self,
        conversation: Conversation,
    ) -> Conversation:

        self.db.add(conversation)
        self.db.commit()
        self.db.refresh(conversation)

        return conversation