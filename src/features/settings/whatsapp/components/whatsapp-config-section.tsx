"use client";

import * as React from "react";
import { MessageSquare } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import EmptyState from "@/components/shared/empty-state";

import { useWhatsAppConfig } from "../hooks/use-whatsapp-config";

export default function WhatsAppConfigSection(): React.JSX.Element {
  const {
    config,
    loading,
    error,
    saving,
    saved,
    updateField,
    updateNested,
    save,
  } = useWhatsAppConfig();

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading WhatsApp configuration...
      </div>
    );
  }

  if (error || !config) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="WhatsApp configuration unavailable"
        description={error ?? "Something went wrong"}
      />
    );
  }

  return (
    <>
      <PageHeader
        title="WhatsApp Configuration"
        description="Control how your WhatsApp integration behaves."
        actions={
          <button
            onClick={save}
            className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
          >
            {saving ? "Saving..." : saved ? "Saved" : "Save changes"}
          </button>
        }
      />

      <div className="space-y-6">

        {/* Connection */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Connection</h2>

          <div className="text-sm text-muted-foreground">
            Status: <span className="font-medium capitalize">{config.connection.status}</span>
          </div>

          <input
            value={config.connection.phoneNumber ?? ""}
            onChange={(e) =>
              updateNested("connection", { phoneNumber: e.target.value })
            }
            placeholder="Phone number"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {/* Messaging */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Messaging Behavior</h2>

          <label className="flex items-center justify-between">
            <span>Auto Reply</span>
            <input
              type="checkbox"
              checked={config.messaging.autoReply}
              onChange={(e) =>
                updateNested("messaging", {
                  autoReply: e.target.checked,
                })
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Typing Indicator</span>
            <input
              type="checkbox"
              checked={config.messaging.typingIndicator}
              onChange={(e) =>
                updateNested("messaging", {
                  typingIndicator: e.target.checked,
                })
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Read Receipts</span>
            <input
              type="checkbox"
              checked={config.messaging.readReceipts}
              onChange={(e) =>
                updateNested("messaging", {
                  readReceipts: e.target.checked,
                })
              }
            />
          </label>
        </div>

        {/* Webhook */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Webhook</h2>

          <input
            value={config.webhook.url}
            onChange={(e) =>
              updateNested("webhook", { url: e.target.value })
            }
            placeholder="Webhook URL"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <input
            value={config.webhook.secret}
            readOnly
            className="w-full rounded-md border px-3 py-2 text-sm bg-muted"
          />
        </div>

        {/* Limits */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Message Limits</h2>

          <input
            type="number"
            value={config.limits.dailyMessageLimit}
            onChange={(e) =>
              updateNested("limits", {
                dailyMessageLimit: Number(e.target.value),
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

      </div>
    </>
  );
}
