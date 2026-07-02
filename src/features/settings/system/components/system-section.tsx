"use client";

import * as React from "react";
import { Settings } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import EmptyState from "@/components/shared/empty-state";

import { useSystemPreferences } from "../hooks/use-system-preferences";

export default function SystemSection(): React.JSX.Element {
  const {
    config,
    loading,
    error,
    saving,
    saved,
    updateNested,
    save,
  } = useSystemPreferences();

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading system preferences...
      </div>
    );
  }

  if (error || !config) {
    return (
      <EmptyState
        icon={Settings}
        title="System preferences unavailable"
        description={error ?? "Something went wrong"}
      />
    );
  }

  return (
    <>
      <PageHeader
        title="System Preferences"
        description="Global behavior settings for your entire SaaS platform."
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

        {/* UI Preferences */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">UI Preferences</h2>

          <select
            value={config.ui.theme}
            onChange={(e) =>
              updateNested("ui", { theme: e.target.value as any })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>

          <select
            value={config.ui.language}
            onChange={(e) =>
              updateNested("ui", { language: e.target.value as any })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>

          <select
            value={config.ui.dateFormat}
            onChange={(e) =>
              updateNested("ui", { dateFormat: e.target.value as any })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          </select>

          <select
            value={config.ui.defaultLandingPage}
            onChange={(e) =>
              updateNested("ui", { defaultLandingPage: e.target.value as any })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="dashboard">Dashboard</option>
            <option value="contacts">Contacts</option>
            <option value="conversations">Conversations</option>
          </select>
        </div>

        {/* Data Preferences */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Data Preferences</h2>

          <label className="flex items-center justify-between">
            <span>Auto Save</span>
            <input
              type="checkbox"
              checked={config.data.autoSave}
              onChange={(e) =>
                updateNested("data", { autoSave: e.target.checked })
              }
            />
          </label>

          <input
            type="number"
            value={config.data.refreshIntervalSeconds}
            onChange={(e) =>
              updateNested("data", {
                refreshIntervalSeconds: Number(e.target.value),
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Refresh interval (seconds)"
          />

          <input
            type="number"
            value={config.data.defaultPageSize}
            onChange={(e) =>
              updateNested("data", {
                defaultPageSize: Number(e.target.value),
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Default page size"
          />
        </div>

        {/* System Preferences */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">System Behavior</h2>

          <label className="flex items-center justify-between">
            <span>Debug Mode</span>
            <input
              type="checkbox"
              checked={config.system.debugMode}
              onChange={(e) =>
                updateNested("system", { debugMode: e.target.checked })
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Background Sync</span>
            <input
              type="checkbox"
              checked={config.system.backgroundSync}
              onChange={(e) =>
                updateNested("system", { backgroundSync: e.target.checked })
              }
            />
          </label>

          <select
            value={config.system.apiLoggingLevel}
            onChange={(e) =>
              updateNested("system", {
                apiLoggingLevel: e.target.value as any,
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="basic">Basic</option>
            <option value="verbose">Verbose</option>
          </select>
        </div>

        {/* Workspace Defaults */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Workspace Defaults</h2>

          <input
            value={config.workspaceDefaults.defaultAiModel}
            onChange={(e) =>
              updateNested("workspaceDefaults", {
                defaultAiModel: e.target.value,
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Default AI Model"
          />

          <select
            value={config.workspaceDefaults.defaultMessageMode}
            onChange={(e) =>
              updateNested("workspaceDefaults", {
                defaultMessageMode: e.target.value as any,
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="auto">Auto</option>
            <option value="manual">Manual</option>
          </select>

          <select
            value={config.workspaceDefaults.defaultWhatsAppMode}
            onChange={(e) =>
              updateNested("workspaceDefaults", {
                defaultWhatsAppMode: e.target.value as any,
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="api">API</option>
            <option value="session">Session</option>
          </select>
        </div>

      </div>
    </>
  );
}
