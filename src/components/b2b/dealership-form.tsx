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

const TYPES = ["Dealer", "Distributor"] as const;

const schema = z.object({
  type: z.string(),
  name: z.string().min(2, "Please tell us your name"),
  phone: z.string().min(6, "A valid phone number, please"),
  business: z.string().min(2, "Your business or proposed setup"),
  area: z.string().min(2, "Which area would you cover?"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function DealershipForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: TYPES[0] },
  });

  const type = watch("type");

  const onSubmit = async (data: FormValues) => {
    // Simulate a network round-trip; wire to a real endpoint later.
    await new Promise((r) => setTimeout(r, 700));
    console.info("dealership inquiry", data);
    setSent(true);
    toast.success("Inquiry received", {
      description: "Our partnerships team will call you within two business days.",
    });
  };

  return (
    <div className="rounded-[2.5rem] border hairline bg-cream p-8 md:p-10">
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
            <h3 className="mt-6 font-serif text-3xl text-night">
              Inquiry received.
            </h3>
            <p className="font-bn mt-2 text-stone">আবেদন গৃহীত হয়েছে।</p>
            <p className="mt-3 max-w-xs text-stone">
              Our partnerships team will call you within two business days to
              talk territory and terms.
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
                I want to become a…
              </span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setValue("type", t)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm transition-colors",
                      type === t
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

            <div className="grid gap-4 sm:grid-cols-2">
              <Field error={errors.business?.message}>
                <input
                  placeholder="Business name / setup"
                  className={inputClass}
                  {...register("business")}
                />
              </Field>
              <Field error={errors.area?.message}>
                <input
                  placeholder="Coverage area (e.g. Mirpur, Uttara)"
                  className={inputClass}
                  {...register("area")}
                />
              </Field>
            </div>

            <Field error={errors.message?.message}>
              <textarea
                rows={3}
                placeholder="Anything else we should know? (optional)"
                className={cn(inputClass, "resize-none")}
                {...register("message")}
              />
            </Field>

            <button type="submit" disabled={isSubmitting} className={submitClass}>
              {isSubmitting ? "Sending…" : "Apply for dealership · আবেদন করুন"}
            </button>
            <p className="text-center text-sm text-stone">
              We reply within two business days.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
