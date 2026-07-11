from abc import ABC, abstractmethod

from .schemas import Conversation, ConversationMessage, ConversationState


class ConversationRepository(ABC):
    """
    Repository contract for Conversation persistence.
    """

    @abstractmethod
    def create_conversation(
        self,
        conversation: Conversation,
    ) -> None:
        """
        Persist a new conversation.
        """
        raise NotImplementedError

    @abstractmethod
    def save_message(
        self,
        message: ConversationMessage,
    ) -> None:
        """
        Persist a conversation message.
        """
        raise NotImplementedError

    @abstractmethod
    def get_conversation(
        self,
        conversation_id: str,
    ) -> Conversation | None:
        """
        Retrieve a conversation.
        """
        raise NotImplementedError

    @abstractmethod
    def update_state(
        self,
        state: ConversationState,
    ) -> None:
        """
        Persist the conversation state.
        """
        raise NotImplementedError