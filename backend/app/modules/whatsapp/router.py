from fastapi import APIRouter, Request, Response, status

router = APIRouter(
    prefix="/webhook",
    tags=["WhatsApp"],
)


@router.get(
    "",
    summary="Verify WhatsApp Webhook",
    status_code=status.HTTP_501_NOT_IMPLEMENTED,
)
async def verify_webhook() -> Response:
    """
    Verify the WhatsApp Cloud API webhook.

    Implementation will be completed during
    Milestone 2.
    """
    return Response(status_code=status.HTTP_501_NOT_IMPLEMENTED)


@router.post(
    "",
    summary="Receive WhatsApp Events",
    status_code=status.HTTP_501_NOT_IMPLEMENTED,
)
async def receive_webhook(request: Request) -> Response:
    """
    Receive incoming WhatsApp webhook events.

    Implementation will be completed during
    Milestone 2.
    """
    return Response(status_code=status.HTTP_501_NOT_IMPLEMENTED)