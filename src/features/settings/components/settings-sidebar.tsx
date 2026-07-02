"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { SettingsSection } from "../types";

interface SettingsSidebarProps {
  sections: SettingsSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function SettingsSidebar({
  sections,
  activeSection,
  onSectionChange,
}: SettingsSidebarProps): React.JSX.Element {
  return (
    <Card className="w-full md:w-72 p-2">
      <nav
        className="flex flex-col gap-1"
        aria-label="Settings navigation"
      >
        {sections.map((section) => {
          const Icon = section.icon;
          const active = activeSection === section.id;

          return (
            <Button
              key={section.id}
              type="button"
              variant="ghost"
              disabled={!section.enabled}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "justify-start gap-3 h-auto px-3 py-3",
                active && "bg-muted"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />

              <div className="flex flex-col items-start text-left">
                <span className="font-medium">
                  {section.title}
                </span>

                <span className="text-xs text-muted-foreground">
                  {section.description}
                </span>
              </div>
            </Button>
          );
        })}
      </nav>
    </Card>
  );
}
