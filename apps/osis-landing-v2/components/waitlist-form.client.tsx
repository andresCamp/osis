"use client"

import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import CustomInput from "@/components/ui/custom-input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import posthog from "posthog-js"

type EarlyAccessFormProps = {
  className?: string
  onSuccess?: () => void
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(1, "Company is required"),
})

export function WaitlistForm({ className, onSuccess }: EarlyAccessFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", company: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        const errorMessage = data?.error || "Failed to submit. Please try again."
        form.setError("email", { message: errorMessage })
        return
      }
      onSuccess?.()
    } finally {
      posthog.capture('waitlist_signup', {
        email: values.email, // include any relevant properties
        name: values.name,
        company: values.company,
      });
      // no-op
    }
  }

  const { formState } = form

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid items-start gap-4 mt-4", className)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Name</FormLabel>
              <FormControl>
                <CustomInput label="Name" placeholder="Your name" variant="dark" required error={formState.errors.name?.message} success={!!field.value && !formState.errors.name} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <CustomInput label="Email" type="email" placeholder="you@company.com" variant="dark" required error={formState.errors.email?.message} success={!!field.value && !formState.errors.email} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Company</FormLabel>
              <FormControl>
                <CustomInput label="Company" placeholder="Company or team" variant="dark" required error={formState.errors.company?.message} success={!!field.value && !formState.errors.company} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={formState.isSubmitting || !formState.isValid} className="py-8 text-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer">
          {formState.isSubmitting ? "Submitting..." : "Request Early Access"}
        </Button>
      </form>
    </Form>
  )
}