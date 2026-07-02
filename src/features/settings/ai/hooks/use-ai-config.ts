"use client";

import * as React from "react";
import type { AIConfig } from "../types";

import {
  getAIConfig,
  updateAIConfig,
  patchAIConfig,
} from "../services/ai-config.service";

export function useAIConfig() {
  const [config, setConfig] = React.useState<AIConfig | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const data = await getAIConfig();
        if (mounted) setConfig(data);
      } catch {
        setError("Failed to load AI configuration.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  function updateField<K extends keyof AIConfig>(
    key: K,
    value: AIConfig[K]
  ) {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function updateFeature<K extends keyof AIConfig["features"]>(
    key: K,
    value: boolean
  ) {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        features: {
          ...prev.features,
          [key]: value,
        },
      };
    });
  }

  function validate(): boolean {
    if (!config) return false;
    if (!config.assistantName.trim()) return false;
    if (!config.systemPrompt.trim()) return false;
    return true;
  }

  async function save() {
    if (!config) return;

    setError(null);
    setSaved(false);

    if (!validate()) {
      setError("Assistant name and system prompt are required.");
      return;
    }

    setSaving(true);

    try {
      const updated = await updateAIConfig(config);
      setConfig(updated);
      setSaved(true);
    } catch {
      setError("Failed to save AI configuration.");
    } finally {
      setSaving(false);
    }
  }

  async function patch(updates: Partial<AIConfig>) {
    if (!config) return;

    setSaving(true);
    setError(null);

    try {
      const updated = await patchAIConfig(updates);
      setConfig(updated);
      setSaved(true);
    } catch {
      setError("Failed to update AI configuration.");
    } finally {
      setSaving(false);
    }
  }

  return {
    config,
    loading,
    saving,
    saved,
    error,
    updateField,
    updateFeature,
    save,
    patch,
  };
}
