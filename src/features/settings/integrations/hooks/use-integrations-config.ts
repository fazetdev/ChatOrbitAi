"use client";

import * as React from "react";
import type { APIIntegrationsConfig } from "../types";

import {
  getIntegrationsConfig,
  updateIntegrationsConfig,
  patchIntegrationsConfig,
} from "../services/integrations.service";

export function useIntegrationsConfig() {
  const [config, setConfig] = React.useState<APIIntegrationsConfig | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const data = await getIntegrationsConfig();
        if (mounted) setConfig(data);
      } catch {
        setError("Failed to load integrations configuration.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  function updateField<K extends keyof APIIntegrationsConfig>(
    key: K,
    value: APIIntegrationsConfig[K]
  ) {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function updateNested(
    section: keyof APIIntegrationsConfig,
    updates: any
  ) {
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

    if (!config.endpoints.baseApiUrl.trim()) return false;

    return true;
  }

  async function save() {
    if (!config) return;

    setError(null);
    setSaved(false);

    if (!validate()) {
      setError("Base API URL is required.");
      return;
    }

    setSaving(true);

    try {
      const updated = await updateIntegrationsConfig(config);
      setConfig(updated);
      setSaved(true);
    } catch {
      setError("Failed to save integrations configuration.");
    } finally {
      setSaving(false);
    }
  }

  async function patch(updates: Partial<APIIntegrationsConfig>) {
    if (!config) return;

    setSaving(true);
    setError(null);

    try {
      const updated = await patchIntegrationsConfig(updates);
      setConfig(updated);
      setSaved(true);
    } catch {
      setError("Failed to update integrations configuration.");
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
