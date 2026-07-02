"use client";

import * as React from "react";
import {
  getBusinessProfile,
  updateBusinessProfile,
} from "../services/settings.service";

export type BusinessProfileState = {
  name: string;
  description: string;
  email: string;
  phone: string;
  website: string;
};

export function useBusinessProfile() {
  const [form, setForm] = React.useState<BusinessProfileState | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const data = await getBusinessProfile();
        if (mounted) setForm(data);
      } catch {
        setError("Failed to load business profile.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  function updateField(field: keyof BusinessProfileState, value: string) {
    setForm((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value,
      };
    });
  }

  function validate(): boolean {
    if (!form) return false;
    if (!form.name.trim()) return false;
    if (!form.email.trim()) return false;
    return true;
  }

  async function save() {
    if (!form) return;

    setError(null);
    setSaved(false);

    if (!validate()) {
      setError("Business name and email are required.");
      return;
    }

    setSaving(true);

    try {
      const updated = await updateBusinessProfile(form);
      setForm(updated);
      setSaved(true);
    } catch {
      setError("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  }

  return {
    form,
    loading,
    saving,
    saved,
    error,
    updateField,
    save,
  };
}
