from fastapi import APIRouter, Request, Response, status

router = APIRouter(
    prefix="/webhook",
    tags=["WhatsApp"],
)


@router.get("")
async def verify_webhook() -> Response:
    """
    Verify the WhatsApp webhook.

    Implementation will be completed during
    Milestone 2 when Meta webhook verification
    is integrated.
    """
    return Response(status_code=status.HTTP_501_NOT_IMPLEMENTED)


@router.post("")
async def receive_webhook(request: Request) -> Response:
    """
    Receive incoming WhatsApp webhook events.

    Implementation will be completed during
    Milestone 2.
    """
    return Response(status_code=status.HTTP_501_NOT_IMPLEMENTED)