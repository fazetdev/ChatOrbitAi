"use client";

import { Inbox } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
}

export function DataTableEmpty({
  title = "No data",
  description = "Nothing to display.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Inbox className="mb-4 h-10 w-10 text-muted-foreground" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
