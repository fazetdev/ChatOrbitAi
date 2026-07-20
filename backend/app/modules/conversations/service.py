from sqlalchemy.orm import Session

from app.db.models.conversation import Conversation


class ConversationService:
    """
    Business logic for conversations.
    """

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def get_conversation_by_phone(
        self,
        phone: str,
    ) -> Conversation | None:

        return (
            self.db.query(Conversation)
            .filter(
                Conversation.contact_phone == phone
            )
            .first()
        )

    def create_conversation(
        self,
        conversation: Conversation,
    ) -> Conversation:

        self.db.add(conversation)
        self.db.commit()
        self.db.refresh(conversation)

        return conversation

    def update_last_message(
        self,
        conversation: Conversation,
    ) -> Conversation:

        self.db.add(conversation)
        self.db.commit()
        self.db.refresh(conversation)

        return conversation