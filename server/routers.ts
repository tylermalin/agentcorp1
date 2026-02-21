import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

// ── Mailchimp waitlist helper ──────────────────────────────────────────────
async function subscribeToMailchimp(
  email: string,
  entityType: string,
  tags: string[]
): Promise<{ success: boolean; message: string; alreadySubscribed?: boolean }> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const dc = process.env.MAILCHIMP_DC || "us3";

  if (!apiKey || !audienceId) {
    throw new Error("Mailchimp credentials not configured");
  }

  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
  const auth = Buffer.from(`anystring:${apiKey}`).toString("base64");

  const body = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      ENTITY: entityType,
    },
    tags,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as {
    status?: string | number;
    title?: string;
    detail?: string;
  };

  if (res.ok) {
    return { success: true, message: "Successfully subscribed to waitlist!" };
  }

  // Already subscribed — treat as success
  if (data.title === "Member Exists") {
    return {
      success: true,
      message: "You're already on the waitlist!",
      alreadySubscribed: true,
    };
  }

  throw new Error(data.detail || data.title || "Failed to subscribe");
}

// ── App Router ─────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  waitlist: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email("Please enter a valid email address"),
          entityType: z.string().min(1),
          source: z.string().optional().default("entity-card"),
        })
      )
      .mutation(async ({ input }) => {
        const tags = ["agentcorp-waitlist", input.entityType.toLowerCase().replace(/\s+/g, "-")];
        const result = await subscribeToMailchimp(input.email, input.entityType, tags);
        return result;
      }),
  }),
});

export type AppRouter = typeof appRouter;
