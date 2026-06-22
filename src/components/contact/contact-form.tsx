"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-2xl border border-ink/15 bg-bg px-5 py-3.5 text-night placeholder:text-stone/60 transition-colors focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-ink/10";

const TOPICS = ["Order milk", "Subscription", "Bulk supply", "Something else"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);

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
              Thank you.
            </h3>
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
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-6"
          >
            <div>
              <label className="text-eyebrow text-stone/70">
                What can we help with?
              </label>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
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
              <input
                required
                placeholder="Your name"
                className={inputClass}
                autoComplete="name"
              />
              <input
                required
                type="tel"
                placeholder="Phone number"
                className={inputClass}
                autoComplete="tel"
              />
            </div>
            <input
              type="email"
              placeholder="Email (optional)"
              className={inputClass}
              autoComplete="email"
            />
            <input placeholder="Your area in Dhaka" className={inputClass} />
            <textarea
              required
              rows={4}
              placeholder="Tell us a little about what you need…"
              className={cn(inputClass, "resize-none")}
            />

            <button
              type="submit"
              className="w-full rounded-full bg-ink py-4 font-medium text-cream transition-all duration-500 hover:bg-ink-soft hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              Send message
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
