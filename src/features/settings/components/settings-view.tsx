"use client";

import * as React from "react";

import {
  Building2,
  Users,
  Bot,
  MessageSquare,
  Plug,
  Shield,
  Settings,
} from "lucide-react";

import PageHeader from "@/components/shared/page-header";

import SettingsSidebar from "./settings-sidebar";

import BusinessProfileSection from "./business-profile-section";
import TeamRolesSection from "../team/components/team-roles-section";
import AIConfigSection from "../ai/components/ai-config-section";
import WhatsAppConfigSection from "../whatsapp/components/whatsapp-config-section";
import IntegrationsSection from "../integrations/components/integrations-section";
import SecuritySection from "../security/components/security-section";
import SystemSection from "../system/components/system-section";

import type { SettingsSection } from "../types";

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: "business-profile",
    title: "Business Profile",
    description: "Business information",
    icon: Building2,
    enabled: true,
  },
  {
    id: "team-roles",
    title: "Team & Roles",
    description: "Manage workspace members",
    icon: Users,
    enabled: true,
  },
  {
    id: "ai-configuration",
    title: "AI Configuration",
    description: "Control AI behavior",
    icon: Bot,
    enabled: true,
  },
  {
    id: "whatsapp-configuration",
    title: "WhatsApp Configuration",
    description: "Manage WhatsApp integration",
    icon: MessageSquare,
    enabled: true,
  },
  {
    id: "api-integrations",
    title: "API Integrations",
    description: "Manage API keys and external services",
    icon: Plug,
    enabled: true,
  },
  {
    id: "security",
    title: "Security",
    description: "Authentication and access control",
    icon: Shield,
    enabled: true,
  },
  {
    id: "system-preferences",
    title: "System Preferences",
    description: "Global system behavior",
    icon: Settings,
    enabled: true,
  },
];

export default function SettingsView(): React.JSX.Element {
  const [activeSection, setActiveSection] = React.useState(
    SETTINGS_SECTIONS[0].id
  );

  function renderSection() {
    switch (activeSection) {
      case "business-profile":
        return <BusinessProfileSection />;

      case "team-roles":
        return <TeamRolesSection />;

      case "ai-configuration":
        return <AIConfigSection />;

      case "whatsapp-configuration":
        return <WhatsAppConfigSection />;

      case "api-integrations":
        return <IntegrationsSection />;

      case "security":
        return <SecuritySection />;

      case "system-preferences":
        return <SystemSection />;

      default:
        return null;
    }
  }

  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure your workspace and system behavior."
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <SettingsSidebar
          sections={SETTINGS_SECTIONS}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div>{renderSection()}</div>
      </div>
    </>
  );
}
