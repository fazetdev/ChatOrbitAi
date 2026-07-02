import type { APIIntegrationsConfig } from "../types";
import { mockIntegrationsConfig } from "../mock-data";

/**
 * Mock DB (will be replaced by FastAPI later)
 */
let db: APIIntegrationsConfig = { ...mockIntegrationsConfig };

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Get integrations config
 */
export async function getIntegrationsConfig(): Promise<APIIntegrationsConfig> {
  await delay(600);
  return db;
}

/**
 * Update full integrations config
 */
export async function updateIntegrationsConfig(
  config: APIIntegrationsConfig
): Promise<APIIntegrationsConfig> {
  await delay(600);

  db = { ...config };
  return db;
}

/**
 * Patch integrations config (partial update)
 */
export async function patchIntegrationsConfig(
  updates: Partial<APIIntegrationsConfig>
): Promise<APIIntegrationsConfig> {
  await delay(600);

  db = {
    ...db,

    apiKeys: {
      ...db.apiKeys,
      ...(updates.apiKeys || {}),
    },

    endpoints: {
      ...db.endpoints,
      ...(updates.endpoints || {}),
    },

    status: {
      ...db.status,
      ...(updates.status || {}),
    },

    features: {
      ...db.features,
      ...(updates.features || {}),
    },
  };

  return db;
}
