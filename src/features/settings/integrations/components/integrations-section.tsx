"use client";

import * as React from "react";
import { Plug } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import EmptyState from "@/components/shared/empty-state";

import { useIntegrationsConfig } from "../hooks/use-integrations-config";

export default function IntegrationsSection(): React.JSX.Element {
  const {
    config,
    loading,
    error,
    saving,
    saved,
    updateField,
    updateNested,
    save,
  } = useIntegrationsConfig();

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading integrations...
      </div>
    );
  }

  if (error || !config) {
    return (
      <EmptyState
        icon={Plug}
        title="Integrations unavailable"
        description={error ?? "Something went wrong"}
      />
    );
  }

  return (
    <>
      <PageHeader
        title="API Integrations"
        description="Manage external services and system connections."
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

        {/* API Keys */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">API Keys</h2>

          <input
            value={config.apiKeys.aiProviderKey}
            onChange={(e) =>
              updateNested("apiKeys", { aiProviderKey: e.target.value })
            }
            placeholder="AI Provider Key"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <input
            value={config.apiKeys.whatsappApiKey}
            onChange={(e) =>
              updateNested("apiKeys", { whatsappApiKey: e.target.value })
            }
            placeholder="WhatsApp API Key"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <input
            value={config.apiKeys.webhookSecret}
            onChange={(e) =>
              updateNested("apiKeys", { webhookSecret: e.target.value })
            }
            placeholder="Webhook Secret"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {/* Endpoints */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Endpoints</h2>

          <input
            value={config.endpoints.baseApiUrl}
            onChange={(e) =>
              updateNested("endpoints", { baseApiUrl: e.target.value })
            }
            placeholder="Base API URL"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <input
            value={config.endpoints.webhookUrl}
            onChange={(e) =>
              updateNested("endpoints", { webhookUrl: e.target.value })
            }
            placeholder="Webhook URL"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <select
            value={config.endpoints.environment}
            onChange={(e) =>
              updateNested("endpoints", {
                environment: e.target.value as any,
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="development">Development</option>
            <option value="production">Production</option>
          </select>
        </div>

        {/* Status */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Integration Status</h2>

          <div className="text-sm">
            WhatsApp: <span className="font-medium">{config.status.whatsapp}</span>
          </div>

          <div className="text-sm">
            AI: <span className="font-medium">{config.status.ai}</span>
          </div>

          <div className="text-sm">
            Webhooks: <span className="font-medium">{config.status.webhooks}</span>
          </div>
        </div>

        {/* Features */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Feature Toggles</h2>

          <label className="flex items-center justify-between">
            <span>AI Integration</span>
            <input
              type="checkbox"
              checked={config.features.aiIntegration}
              onChange={(e) =>
                updateNested("features", {
                  aiIntegration: e.target.checked,
                })
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>WhatsApp Integration</span>
            <input
              type="checkbox"
              checked={config.features.whatsappIntegration}
              onChange={(e) =>
                updateNested("features", {
                  whatsappIntegration: e.target.checked,
                })
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Webhook Integration</span>
            <input
              type="checkbox"
              checked={config.features.webhookIntegration}
              onChange={(e) =>
                updateNested("features", {
                  webhookIntegration: e.target.checked,
                })
              }
            />
          </label>
        </div>

      </div>
    </>
  );
}
