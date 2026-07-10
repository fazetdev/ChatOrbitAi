from enum import Enum


class EventType(str, Enum):
    # Conversation
    MESSAGE_RECEIVED = "message.received"
    MESSAGE_STORED = "message.stored"
    CONVERSATION_UPDATED = "conversation.updated"

    # Automation
    AUTOMATION_TRIGGERED = "automation.triggered"
    AUTOMATION_EXECUTED = "automation.executed"

    # AI Agent
    AGENT_REQUESTED = "agent.requested"
    AGENT_STARTED = "agent.started"
    AGENT_COMPLETED = "agent.completed"
    AGENT_FAILED = "agent.failed"

    # Knowledge Base
    KB_SEARCH_REQUESTED = "kb.search.requested"
    KB_SEARCH_COMPLETED = "kb.search.completed"

    # WhatsApp
    WHATSAPP_MESSAGE_SENT = "whatsapp.message.sent"
    WHATSAPP_MESSAGE_FAILED = "whatsapp.message.failed"

    # System
    ERROR_OCCURRED = "error.occurred"
    RETRY_SCHEDULED = "retry.scheduled"