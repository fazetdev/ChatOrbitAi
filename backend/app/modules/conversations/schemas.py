from pydantic import BaseModel


class CreateConversationRequest(BaseModel):
    contact_phone: str


class CreateMessageRequest(BaseModel):
    conversation_id: str
    external_message_id: str
    sender_phone: str
    content: str


class ConversationResponse(BaseModel):
    id: str
    contact_phone: str

    model_config = {
        "from_attributes": True,
    }


class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    external_message_id: str
    sender_phone: str
    content: str

    model_config = {
        "from_attributes": True,
    }