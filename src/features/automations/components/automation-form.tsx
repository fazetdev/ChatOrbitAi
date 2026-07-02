"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { automationSchema, type AutomationFormValues } from "../schemas";
import { AUTOMATION_STATUS, AUTOMATION_TYPES } from "../constants";

interface Props {
  defaultValues?: Partial<AutomationFormValues>;
  onSubmit: (values: AutomationFormValues) => void;
}

export default function AutomationForm({
  defaultValues,
  onSubmit,
}: Props) {
  const form = useForm<AutomationFormValues>({
    resolver: zodResolver(automationSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "welcome",
      trigger: {
        type: "new-contact",
        config: {},
      },
      status: "draft",
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <input
        placeholder="Name"
        {...form.register("name")}
        className="border rounded px-3 py-2"
      />

      <input
        placeholder="Description"
        {...form.register("description")}
        className="border rounded px-3 py-2"
      />

      <select {...form.register("type")} className="border rounded px-3 py-2">
        {AUTOMATION_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select {...form.register("status")} className="border rounded px-3 py-2">
        {AUTOMATION_STATUS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-black text-white rounded px-3 py-2"
      >
        Save Automation
      </button>
    </form>
  );
}
