"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  knowledgeBaseSchema,
  type KnowledgeBaseFormValues,
} from "../schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  defaultValues?: Partial<KnowledgeBaseFormValues>;
  onSubmit(values: KnowledgeBaseFormValues): void;
  submitLabel?: string;
}

export default function KnowledgeBaseForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save",
}: Props): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<KnowledgeBaseFormValues>({
    resolver: zodResolver(knowledgeBaseSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-2">
        <Label htmlFor="kb-name">Name</Label>
        <Input
          id="kb-name"
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
        <Label htmlFor="kb-description">Description</Label>
        <Textarea
          id="kb-description"
          rows={3}
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
        <Label htmlFor="kb-content">Content</Label>
        <Textarea
          id="kb-content"
          rows={8}
          aria-invalid={!!errors.content}
          {...register("content")}
        />
        {errors.content && (
          <p className="text-sm text-destructive" role="alert">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="kb-status">Status</Label>
        <select
          id="kb-status"
          aria-invalid={!!errors.status}
          {...register("status")}
          className="flex h-10 w-full rounded-md border bg-background px-3"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className="text-sm text-destructive" role="alert">
            {errors.status.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
