"use client";

import * as React from "react";
import type { SystemPreferencesConfig } from "../types";

import {
  getSystemPreferences,
  updateSystemPreferences,
  patchSystemPreferences,
} from "../services/system.service";

export function useSystemPreferences() {
  const [config, setConfig] = React.useState<SystemPreferencesConfig | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const data = await getSystemPreferences();
        if (mounted) setConfig(data);
      } catch {
        setError("Failed to load system preferences.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  function updateField<K extends keyof SystemPreferencesConfig>(
    key: K,
    value: SystemPreferencesConfig[K]
  ) {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function updateNested(section: keyof SystemPreferencesConfig, updates: any) {
    setConfig((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [section]: {
          ...(prev as any)[section],
          ...updates,
        },
      };
    });
  }

  function validate(): boolean {
    if (!config) return false;

    if (config.data.refreshIntervalSeconds < 5) return false;
    if (config.data.defaultPageSize < 5) return false;

    return true;
  }

  async function save() {
    if (!config) return;

    setError(null);
    setSaved(false);

    if (!validate()) {
      setError("System preferences validation failed.");
      return;
    }

    setSaving(true);

    try {
      const updated = await updateSystemPreferences(config);
      setConfig(updated);
      setSaved(true);
    } catch {
      setError("Failed to save system preferences.");
    } finally {
      setSaving(false);
    }
  }

  async function patch(updates: Partial<SystemPreferencesConfig>) {
    if (!config) return;

    setSaving(true);
    setError(null);

    try {
      const updated = await patchSystemPreferences(updates);
      setConfig(updated);
      setSaved(true);
    } catch {
      setError("Failed to update system preferences.");
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
    updateNested,
    save,
    patch,
  };
}
