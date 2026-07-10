from app.events.dispatcher import EventDispatcher

from .events import MessageReceivedEvent
from .repository import WhatsAppRepository
from .schemas import DeliveryStatus, IncomingMessage, OutgoingMessage


class WhatsAppService:
    """Application service for WhatsApp integration."""

    def __init__(
        self,
        repository: WhatsAppRepository,
        event_dispatcher: EventDispatcher,
    ) -> None:
        self._repository = repository
        self._event_dispatcher = event_dispatcher

    def receive_message(self, message: IncomingMessage) -> None:
        """Store an incoming WhatsApp message and publish an event."""

        self._repository.save_incoming_message(message)

        # Event publishing will be completed once the
        # Conversation module owns conversation creation
        # and the EventDispatcher is implemented.

    def send_message(self, message: OutgoingMessage) -> None:
        """Persist an outgoing WhatsApp message."""

        self._repository.save_outgoing_message(message)

    def update_delivery_status(self, status: DeliveryStatus) -> None:
        """Persist a delivery status update."""

        self._repository.save_delivery_status(status)