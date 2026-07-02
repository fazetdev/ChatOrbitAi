import type { AIConfig } from "../types";
import { mockAIConfig } from "../mock-data";

/**
 * Mock DB (will later be replaced by FastAPI)
 */
let db: AIConfig = { ...mockAIConfig };

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Get AI configuration
 */
export async function getAIConfig(): Promise<AIConfig> {
  await delay(600);
  return db;
}

/**
 * Update AI configuration
 */
export async function updateAIConfig(
  updates: AIConfig
): Promise<AIConfig> {
  await delay(600);

  db = {
    ...updates,
  };

  return db;
}

/**
 * Patch AI configuration (partial update)
 */
export async function patchAIConfig(
  updates: Partial<AIConfig>
): Promise<AIConfig> {
  await delay(600);

  db = {
    ...db,
    ...updates,
    features: {
      ...db.features,
      ...(updates.features || {}),
    },
  };

  return db;
}
