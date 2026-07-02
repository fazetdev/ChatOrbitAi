import type { BusinessProfileState } from "../hooks/use-business-profile";

/**
 * Mock database layer (will later be replaced by FastAPI)
 */
let mockDB: BusinessProfileState = {
  name: "NovaSphere AI",
  description: "AI-powered WhatsApp automation platform",
  email: "admin@novasphere.ai",
  phone: "+2348000000000",
  website: "https://novasphere.ai",
};

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Fetch business profile
 */
export async function getBusinessProfile(): Promise<BusinessProfileState> {
  await delay(800);
  return mockDB;
}

/**
 * Update business profile
 */
export async function updateBusinessProfile(
  data: BusinessProfileState
): Promise<BusinessProfileState> {
  await delay(800);

  mockDB = {
    ...data,
  };

  return mockDB;
}
