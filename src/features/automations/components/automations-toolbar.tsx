"use client";

import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  onAddAutomation: () => void;
}

export default function AutomationsToolbar({
  search,
  onSearchChange,
  onAddAutomation,
}: Props): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search automations..."
          className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={onAddAutomation}>
          <Plus className="h-4 w-4 mr-2" />
          Add Automation
        </Button>
      </div>
    </div>
  );
}
