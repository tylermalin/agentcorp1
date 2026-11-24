import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  entityType: string;
  source?: string;
  variant?: "default" | "hero";
  className?: string;
}

/** Waitlist signup wired to trpc.waitlist.subscribe (Mailchimp). */
export default function WaitlistForm({
  entityType,
  source = "entity-card",
  variant = "default",
  className,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const isHero = variant === "hero";

  const subscribe = trpc.waitlist.subscribe.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setAlreadySubscribed(data.alreadySubscribed ?? false);
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe.mutate({ email: email.trim(), entityType, source });
  };

  if (submitted) {
    return (
      <p
        role="status"
        className={cn(
          "flex items-center gap-2 rounded-lg border border-[#6ee7b7]/30 bg-[#6ee7b7]/5 px-4 py-3 text-sm text-[#e5e5e5]",
          isHero ? "max-w-md" : "mt-3",
          className,
        )}
      >
        <span aria-hidden className="text-[#6ee7b7]">✓</span>
        {alreadySubscribed
          ? "You're already on the list. We'll be in touch."
          : "You're on the list. We'll send launch updates."}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn(isHero ? "max-w-md" : "mt-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`wl-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`wl-${source}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isHero ? "founder@company.com" : "you@company.com"}
          required
          autoComplete="email"
          disabled={subscribe.isPending}
          className={cn(
            "min-w-0 flex-1 rounded-lg border border-white/15 bg-black text-sm text-white placeholder-[#737373] transition-colors duration-300 focus:border-[#6ee7b7]/60 focus:outline-none",
            isHero ? "px-4 py-3" : "px-3 py-2",
          )}
        />
        <button
          type="submit"
          disabled={subscribe.isPending}
          className={cn(
            "shrink-0 rounded-lg bg-[#6ee7b7] text-sm font-semibold text-black transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#a7f3d0] active:scale-[0.98] disabled:opacity-60",
            isHero ? "px-5 py-3" : "px-4 py-2",
          )}
        >
          {subscribe.isPending ? "Sending…" : isHero ? "Request access" : "Subscribe"}
        </button>
      </div>
      {subscribe.isError && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {subscribe.error?.message || "We couldn't add your email. Please try again."}
        </p>
      )}
      <p className="mt-2 text-xs text-[#737373]">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
