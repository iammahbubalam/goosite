/**
 * Shared form primitives so every form on the site (contact, checkout,
 * dealership) uses identical input styling and error presentation.
 */

export const inputClass =
  "w-full rounded-2xl border border-ink/15 bg-bg px-5 py-3.5 text-night placeholder:text-stone/60 transition-colors focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-ink/10";

export const submitClass =
  "w-full rounded-full bg-ink py-4 font-medium text-cream transition-all duration-500 hover:bg-ink-soft hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] disabled:opacity-60";

export function Field({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      {children}
      {error && <p className="mt-1.5 px-1 text-sm text-[#b15c3a]">{error}</p>}
    </div>
  );
}
