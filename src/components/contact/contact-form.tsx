"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "@phosphor-icons/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Field, inputClass, submitClass } from "@/components/ui/field";

const TOPICS = ["Order milk", "Subscription", "Bulk supply", "Something else"] as const;

const schema = z.object({
  topic: z.string(),
  name: z.string().min(2, "Please tell us your name"),
  phone: z.string().min(6, "A valid phone number, please"),
  email: z.union([z.string().email("Check this email"), z.literal("")]),
  area: z.string().optional(),
  message: z.string().min(5, "A little more detail helps us help you"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { topic: TOPICS[0], email: "" },
  });

  const topic = watch("topic");

  const onSubmit = async (data: FormValues) => {
    // Simulate a network round-trip; wire to a real endpoint later.
    await new Promise((r) => setTimeout(r, 700));
    console.info("contact submission", data);
    setSent(true);
    toast.success("Message sent", {
      description: "We'll be in touch within one business day.",
    });
  };

  return (
    <div className="rounded-[1.5rem] md:rounded-[2.5rem] border hairline bg-cream p-8 md:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-16 text-center"
          >
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green/15 text-green">
              <Check size={28} />
            </span>
            <h3 className="mt-6 font-serif text-3xl text-night">Thank you.</h3>
            <p className="mt-3 max-w-xs text-stone">
              We&rsquo;ve received your message and will be in touch within one
              business day.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div>
              <span className="text-eyebrow text-stone/70">
                What can we help with?
              </span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setValue("topic", t)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm transition-colors",
                      topic === t
                        ? "bg-ink text-cream"
                        : "border hairline text-night hover:bg-bg",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field error={errors.name?.message}>
                <input
                  placeholder="Your name"
                  className={inputClass}
                  autoComplete="name"
                  {...register("name")}
                />
              </Field>
              <Field error={errors.phone?.message}>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className={inputClass}
                  autoComplete="tel"
                  {...register("phone")}
                />
              </Field>
            </div>

            <Field error={errors.email?.message}>
              <input
                type="email"
                placeholder="Email (optional)"
                className={inputClass}
                autoComplete="email"
                {...register("email")}
              />
            </Field>

            <input
              placeholder="Your area in Dhaka"
              className={inputClass}
              {...register("area")}
            />

            <Field error={errors.message?.message}>
              <textarea
                rows={4}
                placeholder="Tell us a little about what you need…"
                className={cn(inputClass, "resize-none")}
                {...register("message")}
              />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className={submitClass}
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
            <p className="text-center text-sm text-stone">
              We reply within one business day.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
