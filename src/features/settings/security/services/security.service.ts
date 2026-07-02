import type { SecurityConfig } from "../types";
import { mockSecurityConfig } from "../mock-data";

/**
 * Mock DB (will be replaced by FastAPI later)
 */
let db: SecurityConfig = { ...mockSecurityConfig };

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Get security config
 */
export async function getSecurityConfig(): Promise<SecurityConfig> {
  await delay(600);
  return db;
}

/**
 * Update full security config
 */
export async function updateSecurityConfig(
  config: SecurityConfig
): Promise<SecurityConfig> {
  await delay(600);

  db = { ...config };
  return db;
}

/**
 * Patch security config (partial update)
 */
export async function patchSecurityConfig(
  updates: Partial<SecurityConfig>
): Promise<SecurityConfig> {
  await delay(600);

  db = {
    ...db,

    session: {
      ...db.session,
      ...(updates.session || {}),
    },

    passwordPolicy: {
      ...db.passwordPolicy,
      ...(updates.passwordPolicy || {}),
    },

    accessControl: {
      ...db.accessControl,
      ...(updates.accessControl || {}),
    },

    activity: {
      ...db.activity,
      ...(updates.activity || {}),
    },
  };

  return db;
}
