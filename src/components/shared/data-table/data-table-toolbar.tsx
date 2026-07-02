"use client";

import * as React from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableToolbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export function DataTableToolbar({
  search = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  children,
  actions,
}: DataTableToolbarProps): React.JSX.Element {
  return (
    <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-9"
          />
        </div>

        {children}
      </div>

      <div className="flex items-center gap-2">
        {actions}

        <Button variant="outline">
          Export
        </Button>
      </div>
    </div>
  );
}
