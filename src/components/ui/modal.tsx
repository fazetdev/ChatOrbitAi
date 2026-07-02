"use client";

import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
}

export default function Modal({
  open,
  title,
  children,
  footer,
  onClose,
}: ModalProps): React.JSX.Element {
  if (!open) return <></>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl border bg-background shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 hover:bg-muted"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>

        {footer && (
          <div className="flex justify-end gap-2 border-t p-5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
