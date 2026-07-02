"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";

import useClickOutside from "@/hooks/use-click-outside";

export default function UserMenu(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md p-2 hover:bg-muted transition"
      >
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <User className="h-4 w-4" />
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-background shadow-md">
          <div className="p-2 space-y-1">
            <Link
              href="/settings"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

            <button
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
