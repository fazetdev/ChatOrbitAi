export type SecurityConfig = {
  session: {
    timeoutMinutes: number;
    requireRelogin: boolean;
    maxConcurrentSessions: number;
  };

  passwordPolicy: {
    minLength: number;
    requireSpecialChars: boolean;
    requireNumbers: boolean;
    expiryDays: number;
  };

  accessControl: {
    allowMultipleDevices: boolean;
    maxSessionsPerUser: number;
    adminOnlySensitiveActions: boolean;
  };

  activity: {
    lastLogin: string;
    failedLoginAttempts: number;
    suspiciousActivity: boolean;
  };
};
