from enum import Enum


class EventType(str, Enum):
    MESSAGE_RECEIVED = "message.received"
    MESSAGE_STORED = "message.stored"
    CONVERSATION_UPDATED = "conversation.updated"

    AUTOMATION_TRIGGERED = "automation.triggered"
    AUTOMATION_EXECUTED = "automation.executed"

    AGENT_REQUESTED = "agent.requested"
    AGENT_RESPONSE_GENERATED = "agent.response.generated"

    KB_SEARCH_REQUESTED = "kb.search.requested"
    KB_SEARCH_COMPLETED = "kb.search.completed"

    WHATSAPP_MESSAGE_SENT = "whatsapp.message.sent"
    WHATSAPP_MESSAGE_FAILED = "whatsapp.message.failed"

    ERROR_OCCURRED = "error.occurred"
    RETRY_SCHEDULED = "retry.scheduled"
