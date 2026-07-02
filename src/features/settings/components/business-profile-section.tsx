"use client";

import * as React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useBusinessProfile } from "../hooks/use-business-profile";

export default function BusinessProfileSection(): React.JSX.Element {
  const {
    form,
    loading,
    saving,
    saved,
    error,
    updateField,
    save,
  } = useBusinessProfile();

  if (loading || !form) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Loading business profile...</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="text-sm text-muted-foreground">
            Please wait while we load your workspace data.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Basic details about your business used across the platform.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Business Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Input
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Email *</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Website</Label>
            <Input
              value={form.website}
              onChange={(e) => updateField("website", e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {saved && (
            <p className="text-sm text-green-600">
              Changes saved successfully.
            </p>
          )}

          <button
            onClick={save}
            disabled={saving}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
