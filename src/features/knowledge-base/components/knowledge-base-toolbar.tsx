"use client";

import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
}

export default function KnowledgeBaseToolbar({
  search,
  onSearchChange,
  onCreate,
}: Props): React.JSX.Element {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search knowledge bases..."
          className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm"
        />
      </div>

      <Button onClick={onCreate}>
        <Plus className="mr-2 h-4 w-4" />
        New Knowledge Base
      </Button>
    </div>
  );
}
