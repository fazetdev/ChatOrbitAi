"use client";

import * as React from "react";
import { Shield } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import EmptyState from "@/components/shared/empty-state";

import { useSecurityConfig } from "../hooks/use-security-config";

export default function SecuritySection(): React.JSX.Element {
  const {
    config,
    loading,
    error,
    saving,
    saved,
    updateNested,
    save,
  } = useSecurityConfig();

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading security settings...
      </div>
    );
  }

  if (error || !config) {
    return (
      <EmptyState
        icon={Shield}
        title="Security settings unavailable"
        description={error ?? "Something went wrong"}
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Security"
        description="Control authentication, access rules, and system protection."
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

        {/* Session */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Session Settings</h2>

          <input
            type="number"
            value={config.session.timeoutMinutes}
            onChange={(e) =>
              updateNested("session", {
                timeoutMinutes: Number(e.target.value),
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Session timeout (minutes)"
          />

          <label className="flex items-center justify-between">
            <span>Require Re-login</span>
            <input
              type="checkbox"
              checked={config.session.requireRelogin}
              onChange={(e) =>
                updateNested("session", {
                  requireRelogin: e.target.checked,
                })
              }
            />
          </label>

          <input
            type="number"
            value={config.session.maxConcurrentSessions}
            onChange={(e) =>
              updateNested("session", {
                maxConcurrentSessions: Number(e.target.value),
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Max sessions"
          />
        </div>

        {/* Password Policy */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Password Policy</h2>

          <input
            type="number"
            value={config.passwordPolicy.minLength}
            onChange={(e) =>
              updateNested("passwordPolicy", {
                minLength: Number(e.target.value),
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Minimum length"
          />

          <label className="flex items-center justify-between">
            <span>Require Special Characters</span>
            <input
              type="checkbox"
              checked={config.passwordPolicy.requireSpecialChars}
              onChange={(e) =>
                updateNested("passwordPolicy", {
                  requireSpecialChars: e.target.checked,
                })
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Require Numbers</span>
            <input
              type="checkbox"
              checked={config.passwordPolicy.requireNumbers}
              onChange={(e) =>
                updateNested("passwordPolicy", {
                  requireNumbers: e.target.checked,
                })
              }
            />
          </label>

          <input
            type="number"
            value={config.passwordPolicy.expiryDays}
            onChange={(e) =>
              updateNested("passwordPolicy", {
                expiryDays: Number(e.target.value),
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Password expiry (days)"
          />
        </div>

        {/* Access Control */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Access Control</h2>

          <label className="flex items-center justify-between">
            <span>Allow Multiple Devices</span>
            <input
              type="checkbox"
              checked={config.accessControl.allowMultipleDevices}
              onChange={(e) =>
                updateNested("accessControl", {
                  allowMultipleDevices: e.target.checked,
                })
              }
            />
          </label>

          <input
            type="number"
            value={config.accessControl.maxSessionsPerUser}
            onChange={(e) =>
              updateNested("accessControl", {
                maxSessionsPerUser: Number(e.target.value),
              })
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Max sessions per user"
          />

          <label className="flex items-center justify-between">
            <span>Admin-Only Sensitive Actions</span>
            <input
              type="checkbox"
              checked={config.accessControl.adminOnlySensitiveActions}
              onChange={(e) =>
                updateNested("accessControl", {
                  adminOnlySensitiveActions: e.target.checked,
                })
              }
            />
          </label>
        </div>

        {/* Activity */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Security Activity</h2>

          <div className="text-sm">
            Last Login:{" "}
            <span className="font-medium">{config.activity.lastLogin}</span>
          </div>

          <div className="text-sm">
            Failed Attempts:{" "}
            <span className="font-medium">{config.activity.failedLoginAttempts}</span>
          </div>

          <div className="text-sm">
            Suspicious Activity:{" "}
            <span className="font-medium">
              {config.activity.suspiciousActivity ? "Yes" : "No"}
            </span>
          </div>
        </div>

      </div>
    </>
  );
}
