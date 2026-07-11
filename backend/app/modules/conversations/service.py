from .events import (
    ConversationUpdatedEvent,
    MessageReceivedEvent,
    MessageStoredEvent,
)
from .repository import ConversationRepository
from .schemas import Conversation, ConversationMessage, ConversationState

from app.modules.whatsapp.schemas import IncomingMessage

from .repository import ConversationRepository
from .schemas import (
    Conversation,
    ConversationMessage,
    ConversationState,
)

class ConversationService:
    """
    Application service for conversation management.
    """

    def __init__(
        self,
        repository: ConversationRepository,
    ) -> None:
        self._repository = repository

    def process_incoming_message(
        self,
        message: IncomingMessage,
    ) -> None:
        """
        Process a normalized incoming WhatsApp message.

        Full business implementation will be completed
        during the Conversation milestone.
        """

        raise NotImplementedError(
            "Conversation processing will be implemented in a later milestone."
        )

    def create_conversation(
        self,
        conversation: Conversation,
    ) -> None:
        """
        Create a new conversation.
        """

        self._repository.create_conversation(conversation)

    def save_message(
        self,
        message: ConversationMessage,
    ) -> None:
        """
        Persist a conversation message.
        """

        self._repository.save_message(message)

    def update_state(
        self,
        state: ConversationState,
    ) -> None:
        """
        Persist conversation state.
        """

        self._repository.update_state(state)