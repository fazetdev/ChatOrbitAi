import type { Agent } from './types';

export const mockAgents: Agent[] = [
  {
    id: 'agent_1',
    name: 'Customer Support Agent',
    description: 'Handles customer inquiries and support requests.',
    status: 'active',
    config: {
      systemPrompt:
        'You are a professional customer support assistant. Provide accurate, helpful, and concise responses.',
      tone: 'professional',
    },
    createdAt: '2026-01-01',
    updatedAt: '2026-01-15',
  },
  {
    id: 'agent_2',
    name: 'Sales Assistant',
    description: 'Engages leads and answers product-related questions.',
    status: 'active',
    config: {
      systemPrompt:
        'You are a friendly sales assistant focused on understanding customer needs and recommending suitable solutions.',
      tone: 'friendly',
    },
    createdAt: '2026-01-05',
    updatedAt: '2026-01-16',
  },
  {
    id: 'agent_3',
    name: 'General Assistant',
    description: 'Fallback AI assistant for general conversations.',
    status: 'inactive',
    config: {
      systemPrompt:
        'You are a helpful AI assistant. Respond clearly and escalate when necessary.',
      tone: 'casual',
    },
    createdAt: '2026-01-08',
    updatedAt: '2026-01-18',
  },
];
