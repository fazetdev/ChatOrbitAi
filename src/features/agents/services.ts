import { mockAgents } from "./mock-data";
import type { Agent } from "./types";

/**
 * Simulated API delay helper
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Agents Services (Mock API Layer)
 */
export const agentsService = {
  // Get all agents
  async getAgents(): Promise<Agent[]> {
    await delay(300);
    return mockAgents;
  },

  // Get a single agent
  async getAgentById(id: string): Promise<Agent | undefined> {
    await delay(200);
    return mockAgents.find(agent => agent.id === id);
  },
};
