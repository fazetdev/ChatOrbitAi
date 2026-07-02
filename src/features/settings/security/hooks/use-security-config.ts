"use client";

import * as React from "react";
import type { SecurityConfig } from "../types";

import {
  getSecurityConfig,
  updateSecurityConfig,
  patchSecurityConfig,
} from "../services/security.service";

export function useSecurityConfig() {
  const [config, setConfig] = React.useState<SecurityConfig | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const data = await getSecurityConfig();
        if (mounted) setConfig(data);
      } catch {
        setError("Failed to load security configuration.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  function updateField<K extends keyof SecurityConfig>(
    key: K,
    value: SecurityConfig[K]
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
    section: keyof SecurityConfig,
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
    if (config.session.timeoutMinutes < 5) return false;
    if (config.passwordPolicy.minLength < 6) return false;
    return true;
  }

  async function save() {
    if (!config) return;

    setError(null);
    setSaved(false);

    if (!validate()) {
      setError("Security configuration validation failed.");
      return;
    }

    setSaving(true);

    try {
      const updated = await updateSecurityConfig(config);
      setConfig(updated);
      setSaved(true);
    } catch {
      setError("Failed to save security configuration.");
    } finally {
      setSaving(false);
    }
  }

  async function patch(updates: Partial<SecurityConfig>) {
    if (!config) return;

    setSaving(true);
    setError(null);

    try {
      const updated = await patchSecurityConfig(updates);
      setConfig(updated);
      setSaved(true);
    } catch {
      setError("Failed to update security configuration.");
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
