import { cn } from "@/lib/utils";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type?: "ai" | "message" | "automation" | "system";
}

interface ActivityFeedProps {
  items: ActivityItem[];
  className?: string;
}

export default function ActivityFeed({
  items,
  className,
}: ActivityFeedProps): React.JSX.Element {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No recent activity.
          </p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 border-b pb-3 last:border-none"
          >
            <div>
              <p className="text-sm font-medium">
                {item.title}
              </p>

              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>

            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {item.time}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
