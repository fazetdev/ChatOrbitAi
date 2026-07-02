import type { SystemPreferencesConfig } from "../types";
import { mockSystemPreferencesConfig } from "../mock-data";

/**
 * Mock DB (will be replaced by FastAPI later)
 */
let db: SystemPreferencesConfig = { ...mockSystemPreferencesConfig };

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Get system preferences
 */
export async function getSystemPreferences(): Promise<SystemPreferencesConfig> {
  await delay(600);
  return db;
}

/**
 * Update full system preferences
 */
export async function updateSystemPreferences(
  config: SystemPreferencesConfig
): Promise<SystemPreferencesConfig> {
  await delay(600);

  db = { ...config };
  return db;
}

/**
 * Patch system preferences (partial update)
 */
export async function patchSystemPreferences(
  updates: Partial<SystemPreferencesConfig>
): Promise<SystemPreferencesConfig> {
  await delay(600);

  db = {
    ...db,

    ui: {
      ...db.ui,
      ...(updates.ui || {}),
    },

    data: {
      ...db.data,
      ...(updates.data || {}),
    },

    system: {
      ...db.system,
      ...(updates.system || {}),
    },

    workspaceDefaults: {
      ...db.workspaceDefaults,
      ...(updates.workspaceDefaults || {}),
    },
  };

  return db;
}
