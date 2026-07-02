import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { LucideIcon } from "lucide-react";

interface ActionItem {
  title: string;
  description?: string;
  href: string;
  icon?: LucideIcon;
}

interface QuickActionsProps {
  items: ActionItem[];
  className?: string;
}

export default function QuickActions({
  items,
  className,
}: QuickActionsProps): React.JSX.Element {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
            >
              {Icon && (
                <div className="rounded-md bg-muted p-2">
                  <Icon className="h-4 w-4" />
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {item.title}
                </span>

                {item.description && (
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
