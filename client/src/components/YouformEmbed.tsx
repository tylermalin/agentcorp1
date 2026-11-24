import { useEffect } from "react";
import { cn } from "@/lib/utils";

const SCRIPT_SRC = "https://app.youform.com/embed.js";

declare global {
  interface Window {
    YouformEmbed?: { __initialized?: boolean; init: () => void };
  }
}

/**
 * Youform inline embed. The vendor script scans for [data-youform-embed]
 * once on load; on client-side navigation we call YouformEmbed.init()
 * again so a freshly mounted container gets its iframe.
 */
export default function YouformEmbed({
  formId,
  height = 700,
  className,
}: {
  formId: string;
  height?: number;
  className?: string;
}) {
  useEffect(() => {
    if (window.YouformEmbed?.init) {
      window.YouformEmbed.init();
      return;
    }
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return; // loading; it will init on load
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, [formId]);

  return (
    <div
      data-youform-embed
      data-form={formId}
      data-base-url="https://app.youform.com"
      data-width="100%"
      data-height={String(height)}
      data-autoresize
      className={cn("w-full", className)}
    >
      <noscript>
        <a href={`https://app.youform.com/forms/${formId}`}>Open the early access form</a>
      </noscript>
    </div>
  );
}
