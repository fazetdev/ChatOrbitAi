import type { LucideIcon } from "lucide-react";

export interface SettingsSection {
  /**
   * Unique identifier for the section.
   * Stable for future routing and backend integration.
   */
  id: string;

  /**
   * Display name shown in the Settings navigation.
   */
  title: string;

  /**
   * Short description displayed beneath the title.
   */
  description: string;

  /**
   * Navigation icon.
   */
  icon: LucideIcon;

  /**
   * Whether the section is currently available.
   * Future backend-dependent sections can remain disabled until implemented.
   */
  enabled: boolean;
}
