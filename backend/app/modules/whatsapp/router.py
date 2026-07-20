import logging

from fastapi import APIRouter, Depends, Query, Request, Response, status
from fastapi.responses import JSONResponse

from app.api.dependencies.whatsapp import get_whatsapp_service
from app.core.security import verify_webhook_token

from .normalizer import WhatsAppPayloadNormalizer
from .service import WhatsAppService


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
    Verify WhatsApp Cloud API webhook.
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

    return Response(
        status_code=status.HTTP_403_FORBIDDEN
    )


@router.post(
    "",
    summary="Receive WhatsApp Events",
)
async def receive_webhook(
    request: Request,
    whatsapp_service: WhatsAppService = Depends(
        get_whatsapp_service
    ),
) -> JSONResponse:
    """
    Receive WhatsApp messages.
    """

    try:
        payload = await request.json()

        incoming_message = (
            WhatsAppPayloadNormalizer
            .normalize_incoming_message(
                payload
            )
        )

        whatsapp_service.receive_message(
            incoming_message
        )

        logger.info(
            "WhatsApp message processed",
            extra={
                "message_id": incoming_message.message_id,
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
        logger.exception(
            "Webhook processing failed"
        )

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": "error",
                "message": "Internal server error",
            },
        )
