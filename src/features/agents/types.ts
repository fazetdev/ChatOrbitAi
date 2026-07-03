export type AgentStatus = 'active' | 'inactive';

export type AgentTone =
  | 'professional'
  | 'friendly'
  | 'casual'
  | 'formal';

export interface AgentConfig {
  systemPrompt: string;
  tone: AgentTone;
}

export interface Agent {
  id: string;
  name: string;
  description?: string;
  status: AgentStatus;
  config: AgentConfig;
  createdAt: string;
  updatedAt: string;
}
