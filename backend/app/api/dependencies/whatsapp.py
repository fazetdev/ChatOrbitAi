from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.events.dispatcher import EventDispatcher

from app.modules.conversations.service import ConversationService
from app.modules.whatsapp.repository import WhatsAppRepository
from app.modules.whatsapp.service import WhatsAppService


def get_whatsapp_service(
    db: Session = Depends(get_db),
) -> WhatsAppService:

    whatsapp_repository = WhatsAppRepository(db)

    conversation_service = ConversationService(
        db
    )

    dispatcher = EventDispatcher()

    return WhatsAppService(
        repository=whatsapp_repository,
        conversation_service=conversation_service,
        event_dispatcher=dispatcher,
    )