import PageHeader from "@/components/shared/page-header";
import StatCard from "@/components/shared/stat-card";
import ActivityFeed from "@/components/shared/activity-feed";
import QuickActions from "@/components/shared/quick-actions";

import {
  Users,
  MessageSquare,
  Bot,
  Zap,
  Plus,
  Workflow,
  Send,
} from "lucide-react";

export default function DashboardPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Monitor your WhatsApp AI automation performance in real time."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Contacts"
          value="1,248"
          icon={Users}
          trend={{ value: "+12%", positive: true }}
        />

        <StatCard
          title="Active Conversations"
          value="87"
          icon={MessageSquare}
          trend={{ value: "+4%", positive: true }}
        />

        <StatCard
          title="AI Responses"
          value="3,420"
          icon={Bot}
          trend={{ value: "+18%", positive: true }}
        />

        <StatCard
          title="Automations"
          value="512"
          icon={Zap}
          trend={{ value: "-2%", positive: false }}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ActivityFeed
          items={[
            {
              id: "1",
              title: "AI replied to customer",
              description: "Handled pricing inquiry",
              time: "2 min ago",
            },
            {
              id: "2",
              title: "New WhatsApp message",
              description: "+234 801 234 5678",
              time: "5 min ago",
            },
            {
              id: "3",
              title: "Automation triggered",
              description: "Welcome flow executed",
              time: "10 min ago",
            },
          ]}
        />

        <QuickActions
          items={[
            {
              title: "Add Contact",
              description: "Create new WhatsApp contact",
              href: "/contacts",
              icon: Plus,
            },
            {
              title: "Create Automation",
              description: "Build workflow",
              href: "/automations",
              icon: Workflow,
            },
            {
              title: "Send Campaign",
              description: "Broadcast message",
              href: "/campaigns",
              icon: Send,
            },
          ]}
        />
      </div>
    </>
  );
}
