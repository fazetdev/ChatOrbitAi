"use client";

import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import type { Contact } from "../types";

interface ContactDetailsSheetProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  contact: Contact | null;
}

export default function ContactDetailsSheet({
  open,
  onOpenChange,
  contact,
}: ContactDetailsSheetProps): React.JSX.Element {

  if (!contact) return <></>;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Contact Details</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{contact.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{contact.phone}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{contact.email || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Company</p>
            <p className="font-medium">{contact.company || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge>{contact.status}</Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Last Active</p>
            <p className="font-medium">{contact.lastActive || "-"}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
