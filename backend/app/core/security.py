from hmac import compare_digest

from app.core.config import settings


def verify_webhook_token(mode: str, token: str) -> bool:
    """
    Verify the WhatsApp webhook verification request.

    Meta sends:
        hub.mode
        hub.verify_token

    Verification succeeds only when:
    - mode == "subscribe"
    - verify_token matches our configured token
    """

    expected_token = getattr(settings, "WHATSAPP_VERIFY_TOKEN", "")

    return (
        mode == "subscribe"
        and compare_digest(token, expected_token)
    )