"use client";

import * as React from "react";
import { Bot } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import EmptyState from "@/components/shared/empty-state";

import { useAIConfig } from "../hooks/use-ai-config";

export default function AIConfigSection(): React.JSX.Element {
  const {
    config,
    loading,
    error,
    saving,
    saved,
    updateField,
    updateFeature,
    save,
  } = useAIConfig();

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading AI configuration...</div>;
  }

  if (error || !config) {
    return (
      <EmptyState
        icon={Bot}
        title="AI configuration not available"
        description={error ?? "Something went wrong"}
      />
    );
  }

  return (
    <>
      <PageHeader
        title="AI Configuration"
        description="Control how AI behaves across your workspace."
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
        {/* AI Identity */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">AI Identity</h2>

          <input
            value={config.assistantName}
            onChange={(e) => updateField("assistantName", e.target.value)}
            placeholder="Assistant name"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {/* Behavior */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Response Behavior</h2>

          <select
            value={config.tone}
            onChange={(e) => updateField("tone", e.target.value as any)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="formal">Formal</option>
            <option value="friendly">Friendly</option>
            <option value="sales">Sales</option>
            <option value="neutral">Neutral</option>
          </select>

          <select
            value={config.responseLength}
            onChange={(e) =>
              updateField("responseLength", e.target.value as any)
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        {/* Language */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Language</h2>

          <input
            value={config.defaultLanguage}
            onChange={(e) => updateField("defaultLanguage", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Default language"
          />

          <input
            value={config.fallbackLanguage}
            onChange={(e) => updateField("fallbackLanguage", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Fallback language"
          />
        </div>

        {/* System Prompt */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">System Prompt</h2>

          <textarea
            value={config.systemPrompt}
            onChange={(e) => updateField("systemPrompt", e.target.value)}
            rows={6}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {/* Features */}
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Features</h2>

          <label className="flex items-center justify-between">
            <span>AI Replies</span>
            <input
              type="checkbox"
              checked={config.features.aiReplies}
              onChange={(e) =>
                updateFeature("aiReplies", e.target.checked)
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Auto Suggestions</span>
            <input
              type="checkbox"
              checked={config.features.autoSuggestions}
              onChange={(e) =>
                updateFeature("autoSuggestions", e.target.checked)
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Conversation Summary</span>
            <input
              type="checkbox"
              checked={config.features.conversationSummary}
              onChange={(e) =>
                updateFeature("conversationSummary", e.target.checked)
              }
            />
          </label>
        </div>
      </div>
    </>
  );
}
