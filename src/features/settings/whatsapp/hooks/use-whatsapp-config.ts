"use client";

import * as React from "react";
import type { WhatsAppConfig } from "../types";

import {
  getWhatsAppConfig,
  updateWhatsAppConfig,
  patchWhatsAppConfig,
} from "../services/whatsapp-config.service";

export function useWhatsAppConfig() {
  const [config, setConfig] = React.useState<WhatsAppConfig | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const data = await getWhatsAppConfig();
        if (mounted) setConfig(data);
      } catch {
        setError("Failed to load WhatsApp configuration.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  function updateField<K extends keyof WhatsAppConfig>(
    key: K,
    value: WhatsAppConfig[K]
  ) {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function updateNested<K extends keyof WhatsAppConfig>(
    section: K,
    updates: Partial<WhatsAppConfig[K]>
  ) {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...(prev[section] as object),
          ...updates,
        },
      };
    });
  }

  function validate(): boolean {
    if (!config) return false;
    if (!config.webhook.url.trim()) return false;
    return true;
  }

  async function save() {
    if (!config) return;

    setError(null);
    setSaved(false);

    if (!validate()) {
      setError("Webhook URL is required.");
      return;
    }

    setSaving(true);

    try {
      const updated = await updateWhatsAppConfig(config);
      setConfig(updated);
      setSaved(true);
    } catch {
      setError("Failed to save WhatsApp configuration.");
    } finally {
      setSaving(false);
    }
  }

  async function patch(updates: Partial<WhatsAppConfig>) {
    if (!config) return;

    setSaving(true);
    setError(null);

    try {
      const updated = await patchWhatsAppConfig(updates);
      setConfig(updated);
      setSaved(true);
    } catch {
      setError("Failed to update WhatsApp configuration.");
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
