"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { contactSchema, type ContactFormValues } from "../schemas";
import { CONTACT_STATUS } from "../constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactFormProps {
  defaultValues?: Partial<ContactFormValues>;
  onSubmit(values: ContactFormValues): void;
  submitLabel?: string;
}

export default function ContactForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save",
}: ContactFormProps): React.JSX.Element {
  const { register, handleSubmit } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Name</Label>
        <Input {...register("name")} />
      </div>

      <div>
        <Label>Phone</Label>
        <Input {...register("phone")} />
      </div>

      <div>
        <Label>Email</Label>
        <Input {...register("email")} />
      </div>

      <div>
        <Label>Company</Label>
        <Input {...register("company")} />
      </div>

      <div>
        <Label>Status</Label>
        <select
          {...register("status")}
          className="flex h-10 w-full rounded-md border bg-background px-3"
        >
          {CONTACT_STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
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
