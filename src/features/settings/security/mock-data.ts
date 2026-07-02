import type { SecurityConfig } from "./types";

export const mockSecurityConfig: SecurityConfig = {
  session: {
    timeoutMinutes: 30,
    requireRelogin: true,
    maxConcurrentSessions: 2,
  },

  passwordPolicy: {
    minLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    expiryDays: 90,
  },

  accessControl: {
    allowMultipleDevices: true,
    maxSessionsPerUser: 2,
    adminOnlySensitiveActions: true,
  },

  activity: {
    lastLogin: "Never",
    failedLoginAttempts: 0,
    suspiciousActivity: false,
  },
};
