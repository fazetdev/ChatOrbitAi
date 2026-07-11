import logging

from fastapi import APIRouter, Query, Request, Response, status
from fastapi.responses import JSONResponse

from app.core.security import verify_webhook_token

from .normalizer import WhatsAppPayloadNormalizer

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/webhook",
    tags=["WhatsApp"],
)


@router.get(
    "",
    summary="Verify WhatsApp Webhook",
)
async def verify_webhook(
    hub_mode: str = Query(..., alias="hub.mode"),
    hub_verify_token: str = Query(..., alias="hub.verify_token"),
    hub_challenge: str = Query(..., alias="hub.challenge"),
) -> Response:
    """
    Verify the WhatsApp Cloud API webhook.
    """

    if verify_webhook_token(
        mode=hub_mode,
        token=hub_verify_token,
    ):
        return Response(
            content=hub_challenge,
            media_type="text/plain",
            status_code=status.HTTP_200_OK,
        )

    return Response(status_code=status.HTTP_403_FORBIDDEN)


@router.post(
    "",
    summary="Receive WhatsApp Events",
    status_code=status.HTTP_200_OK,
)
async def receive_webhook(request: Request) -> JSONResponse:
    """
    Receive incoming WhatsApp webhook events.

    Currently this endpoint:
    - Receives the webhook payload.
    - Normalizes it into the internal IncomingMessage model.
    - Logs the successful normalization.

    Business processing (conversation storage, events,
    automation, AI, etc.) will be implemented in later
    milestones.
    """

    try:
        payload = await request.json()

        incoming_message = (
            WhatsAppPayloadNormalizer.normalize_incoming_message(
                payload
            )
        )

        logger.info(
            "Incoming WhatsApp message normalized.",
            extra={
                "message_id": incoming_message.message_id,
                "from_number": incoming_message.from_number,
                "message_type": incoming_message.message_type,
            },
        )

        return JSONResponse(
            content={
                "status": "received",
            }
        )

    except ValueError as exc:
        logger.warning(str(exc))

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "status": "error",
                "message": str(exc),
            },
        )

    except Exception:
        logger.exception("Unexpected webhook processing error.")

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": "error",
                "message": "Internal server error.",
            },
        )