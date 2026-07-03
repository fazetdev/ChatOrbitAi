"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { agentSchema, type AgentFormValues } from "../schemas";
import { AGENT_STATUSES, AGENT_TONES } from "../constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AgentFormProps {
  defaultValues?: Partial<AgentFormValues>;
  onSubmit(values: AgentFormValues): void;
  submitLabel?: string;
}

export default function AgentForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save",
}: AgentFormProps): React.JSX.Element {
  const { register, handleSubmit } = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues,
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Name</Label>
        <Input {...register("name")} />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea rows={3} {...register("description")} />
      </div>

      <div>
        <Label>System Prompt</Label>
        <Textarea rows={8} {...register("systemPrompt")} />
      </div>

      <div>
        <Label>Tone</Label>
        <select
          {...register("tone")}
          className="flex h-10 w-full rounded-md border bg-background px-3"
        >
          {AGENT_TONES.map((tone) => (
            <option key={tone} value={tone}>
              {tone.charAt(0).toUpperCase() + tone.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Status</Label>
        <select
          {...register("status")}
          className="flex h-10 w-full rounded-md border bg-background px-3"
        >
          {AGENT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
