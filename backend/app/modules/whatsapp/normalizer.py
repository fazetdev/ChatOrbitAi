from datetime import datetime

from .schemas import IncomingMessage, MessageType


class WhatsAppPayloadNormalizer:
    """
    Convert WhatsApp Cloud API payloads
    into internal models.
    """

    @staticmethod
    def normalize_incoming_message(
        payload: dict,
    ) -> IncomingMessage:

        try:
            value = payload["entry"][0]["changes"][0]["value"]

            message = value["messages"][0]

            return IncomingMessage(
                message_id=message["id"],
                phone_number_id=value["metadata"]["phone_number_id"],
                from_number=message["from"],
                message_type=MessageType(
                    message.get("type", "unknown")
                ),
                content=(
                    message.get("text", {})
                    .get("body", "")
                ),
                timestamp=datetime.fromtimestamp(
                    int(message["timestamp"])
                ),
            )

        except Exception as exc:
            raise ValueError(
                "Invalid WhatsApp payload"
            ) from exc
