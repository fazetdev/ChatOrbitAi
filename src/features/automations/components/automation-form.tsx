"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  automationSchema,
  type AutomationFormValues,
} from "../schemas";

import { AUTOMATION_STATUS, AUTOMATION_TYPES } from "../constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  defaultValues?: Partial<AutomationFormValues>;
  onSubmit: (values: AutomationFormValues) => void;
}

export default function AutomationForm({
  defaultValues,
  onSubmit,
}: Props): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AutomationFormValues>({
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
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="automation-name">Name</Label>
        <Input
          id="automation-name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="automation-description">Description</Label>
        <Input
          id="automation-description"
          aria-invalid={!!errors.description}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Type</Label>
        <select
          {...register("type")}
          className="flex h-10 w-full rounded-md border bg-background px-3"
        >
          {AUTOMATION_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <select
          {...register("status")}
          className="flex h-10 w-full rounded-md border bg-background px-3"
        >
          {AUTOMATION_STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Automation"}
      </Button>
    </form>
  );
}
