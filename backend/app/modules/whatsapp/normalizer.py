from typing import Any

from .schemas import IncomingMessage


class WhatsAppPayloadNormalizer:
    """
    Converts WhatsApp Cloud API webhook payloads
    into ChatOrbit AI domain models.
    """

    @staticmethod
    def normalize_incoming_message(...)(payload: dict[str, Any]) -> IncomingMessage:
        """
        Convert a Meta webhook payload into an
        IncomingMessage.

        Raises:
            ValueError:
                If the payload is not a supported
                WhatsApp message event.
        """

        try:
            value = payload["entry"][0]["changes"][0]["value"]

            metadata = value["metadata"]
            message = value["messages"][0]

            return IncomingMessage(
                message_id=message["id"],
                phone_number_id=metadata["phone_number_id"],
                from_number=message["from"],
                message_type=message["type"],
                content=message["text"]["body"],
                timestamp=message["timestamp"],
            )

        except (KeyError, IndexError, TypeError) as exc:
            raise ValueError(
                "Unsupported WhatsApp webhook payload."
            ) from exc