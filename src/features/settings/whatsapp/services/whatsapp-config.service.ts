import type { WhatsAppConfig } from "../types";
import { mockWhatsAppConfig } from "../mock-data";

/**
 * Mock DB (will be replaced by FastAPI later)
 */
let db: WhatsAppConfig = { ...mockWhatsAppConfig };

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Get WhatsApp configuration
 */
export async function getWhatsAppConfig(): Promise<WhatsAppConfig> {
  await delay(600);
  return db;
}

/**
 * Update full WhatsApp configuration
 */
export async function updateWhatsAppConfig(
  config: WhatsAppConfig
): Promise<WhatsAppConfig> {
  await delay(600);

  db = { ...config };
  return db;
}

/**
 * Patch WhatsApp configuration (partial update)
 */
export async function patchWhatsAppConfig(
  updates: Partial<WhatsAppConfig>
): Promise<WhatsAppConfig> {
  await delay(600);

  db = {
    ...db,
    ...updates,
    connection: {
      ...db.connection,
      ...(updates.connection || {}),
    },
    messaging: {
      ...db.messaging,
      ...(updates.messaging || {}),
    },
    webhook: {
      ...db.webhook,
      ...(updates.webhook || {}),
    },
    limits: {
      ...db.limits,
      ...(updates.limits || {}),
    },
  };

  return db;
}
