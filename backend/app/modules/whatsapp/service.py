from .repository import WhatsAppRepository
from .schemas import DeliveryStatus, IncomingMessage, OutgoingMessage


class WhatsAppService:
    """Application service for WhatsApp integration."""

    def __init__(self, repository: WhatsAppRepository) -> None:
        self._repository = repository

    def receive_message(self, message: IncomingMessage) -> None:
        """Handle an incoming WhatsApp message."""
        self._repository.save_incoming_message(message)

    def send_message(self, message: OutgoingMessage) -> None:
        """Handle an outgoing WhatsApp message."""
        self._repository.save_outgoing_message(message)

    def update_delivery_status(self, status: DeliveryStatus) -> None:
        """Handle a delivery status update."""
        self._repository.save_delivery_status(status)
