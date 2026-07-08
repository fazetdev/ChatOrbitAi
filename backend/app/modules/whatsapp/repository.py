from abc import ABC, abstractmethod

from .schemas import DeliveryStatus, IncomingMessage, OutgoingMessage


class WhatsAppRepository(ABC):
    """Repository contract for WhatsApp integration."""

    @abstractmethod
    def save_incoming_message(self, message: IncomingMessage) -> None:
        """Persist an incoming WhatsApp message."""
        raise NotImplementedError

    @abstractmethod
    def save_outgoing_message(self, message: OutgoingMessage) -> None:
        """Persist an outgoing WhatsApp message."""
        raise NotImplementedError

    @abstractmethod
    def save_delivery_status(self, status: DeliveryStatus) -> None:
        """Persist a delivery status update."""
        raise NotImplementedError
