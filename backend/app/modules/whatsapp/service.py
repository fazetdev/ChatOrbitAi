from uuid import uuid4
from datetime import datetime

from app.db.models.message import (
    Message,
    MessageDirection,
    MessageType,
)

from app.events.dispatcher import EventDispatcher
from app.events.event_types import EventType

from app.modules.conversations.service import ConversationService

from .events import MessageReceivedEvent
from .repository import WhatsAppRepository
from .schemas import IncomingMessage


class WhatsAppService:
    """
    Handles WhatsApp message lifecycle.
    """

    def __init__(
        self,
        repository: WhatsAppRepository,
        conversation_service: ConversationService,
        event_dispatcher: EventDispatcher,
    ) -> None:
        self._repository = repository
        self._conversation_service = conversation_service
        self._event_dispatcher = event_dispatcher

    def receive_message(
        self,
        message: IncomingMessage,
    ) -> Message:

        conversation = (
            self._conversation_service
            .get_conversation_by_phone(
                message.from_number
            )
        )

        if conversation is None:
            conversation = (
                self._conversation_service
                .create_conversation(
                    self._create_conversation(
                        message.from_number,
                        message.timestamp,
                    )
                )
            )

        db_message = Message(
            id=str(uuid4()),
            conversation_id=conversation.id,
            external_message_id=message.message_id,
            direction=MessageDirection.INBOUND,
            message_type=MessageType(
                message.message_type.value.upper()
            ),
            sender_phone=message.from_number,
            content=message.content,
            whatsapp_timestamp=message.timestamp,
            created_at=message.timestamp,
        )

        saved_message = (
            self._repository
            .save_incoming_message(
                db_message
            )
        )

        event = MessageReceivedEvent(
            event_type=EventType.MESSAGE_RECEIVED,
            occurred_at=datetime.utcnow(),
            message_id=saved_message.id,
            conversation_id=conversation.id,
            phone_number=message.from_number,
        )

        self._event_dispatcher.publish(event)

        return saved_message

    @staticmethod
    def _create_conversation(
        phone: str,
        timestamp,
    ):
        from app.db.models.conversation import Conversation

        return Conversation(
            id=str(uuid4()),
            contact_phone=phone,
            last_message_at=timestamp,
        )
