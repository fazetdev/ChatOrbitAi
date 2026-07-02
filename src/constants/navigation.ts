import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Bot,
  Workflow,
  Send,
  BarChart3,
  Settings,
  Database,
} from "lucide-react";

export const DASHBOARD_NAVIGATION = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Messaging",
    items: [
      {
        title: "Contacts",
        href: "/contacts",
        icon: Users,
      },
      {
        title: "Conversations",
        href: "/conversations",
        icon: MessageSquare,
      },
    ],
  },

  {
    label: "AI & Automation",
    items: [
      {
        title: "AI Agents",
        href: "/ai-agents",
        icon: Bot,
      },
      {
        title: "Automations",
        href: "/automations",
        icon: Workflow,
      },
      {
        title: "Campaigns",
        href: "/campaigns",
        icon: Send,
      },
    ],
  },

  {
    label: "Data & Insights",
    items: [
      {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
      {
        title: "Knowledge Base",
        href: "/knowledge-base",
        icon: Database,
      },
    ],
  },

  {
    label: "System",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];
