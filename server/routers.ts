import { COOKIE_NAME } from "../shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

// ── Mailchimp helpers ──────────────────────────────────────────────────────
function getMailchimpConfig() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const dc = process.env.MAILCHIMP_DC || "us3";
  if (!apiKey || !audienceId) throw new Error("Mailchimp credentials not configured");
  const auth = Buffer.from(`anystring:${apiKey}`).toString("base64");
  return { apiKey, audienceId, dc, auth };
}

async function subscribeToMailchimp(
  email: string,
  entityType: string,
  tags: string[]
): Promise<{ success: boolean; message: string; alreadySubscribed?: boolean }> {
  const { dc, audienceId, auth } = getMailchimpConfig();
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  const body = {
    email_address: email,
    status: "subscribed",
    merge_fields: { ENTITY: entityType },
    tags,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as {
    status?: string | number;
    title?: string;
    detail?: string;
  };

  if (res.ok) return { success: true, message: "Successfully subscribed to waitlist!" };
  if (data.title === "Member Exists") {
    return { success: true, message: "You're already on the waitlist!", alreadySubscribed: true };
  }

  // Mailchimp returns 400 for problems the visitor can fix: a malformed address,
  // a domain on their fake-domain list, a previously unsubscribed member. Those
  // are BAD_REQUEST, and the message is safe to show. Anything else is ours
  // (bad key, wrong datacenter, missing audience) and stays a generic 500 so we
  // don't leak configuration detail to the browser.
  const message = data.detail || data.title || "Failed to subscribe";
  if (res.status === 400) {
    throw new TRPCError({ code: "BAD_REQUEST", message });
  }
  console.error("[Waitlist] Mailchimp error", res.status, message);
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong on our end. Please try again shortly.",
  });
}

// Mailchimp member shape returned from the list API
interface MailchimpMember {
  id: string;
  email_address: string;
  status: string;
  merge_fields: Record<string, string>;
  tags: Array<{ id: number; name: string }>;
  timestamp_signup: string;
  timestamp_opt: string;
  last_changed: string;
  ip_signup: string;
}

interface MailchimpListResponse {
  members: MailchimpMember[];
  total_items: number;
}

async function fetchMailchimpMembers(
  offset = 0,
  count = 100,
  entityFilter?: string
): Promise<{ members: MailchimpMember[]; total: number }> {
  const { dc, audienceId, auth } = getMailchimpConfig();

  const params = new URLSearchParams({
    offset: String(offset),
    count: String(count),
    sort_field: "timestamp_signup",
    sort_dir: "DESC",
    status: "subscribed",
  });

  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members?${params}`;
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
  });

  if (!res.ok) {
    const err = (await res.json()) as { detail?: string };
    throw new Error(err.detail || "Failed to fetch members from Mailchimp");
  }

  const data = (await res.json()) as MailchimpListResponse;
  let members = data.members;

  // Client-side filter by entity type if requested
  if (entityFilter && entityFilter !== "all") {
    members = members.filter(
      (m) =>
        (m.merge_fields.ENTITY || "").toLowerCase() === entityFilter.toLowerCase()
    );
  }

  return { members, total: data.total_items };
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
    // Public: subscribe to waitlist
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email("Please enter a valid email address"),
          entityType: z.string().min(1),
          source: z.string().optional().default("entity-card"),
        })
      )
      .mutation(async ({ input }) => {
        const tags = [
          "agentcorp-waitlist",
          input.entityType.toLowerCase().replace(/\s+/g, "-"),
        ];
        const result = await subscribeToMailchimp(input.email, input.entityType, tags);

        if (!result.alreadySubscribed) {
          const sourceLabel = input.source === "hero" ? "Hero Form" : "Entity Table";
          await notifyOwner({
            title: `New AgentCorp Waitlist Signup`,
            content: `Email: ${input.email}\nEntity Interest: ${input.entityType}\nSource: ${sourceLabel}\nMailchimp Tags: ${tags.join(", ")}`,
          }).catch((err) => {
            console.warn("[Waitlist] Owner notification failed:", err);
          });
        }

        return result;
      }),

    // Admin: list members with pagination and optional entity filter
    list: adminProcedure
      .input(
        z.object({
          offset: z.number().int().min(0).default(0),
          count: z.number().int().min(1).max(200).default(100),
          entityFilter: z.string().optional().default("all"),
          search: z.string().optional().default(""),
        })
      )
      .query(async ({ input }) => {
        const { members, total } = await fetchMailchimpMembers(
          input.offset,
          input.count,
          input.entityFilter
        );

        // Apply search filter client-side
        const filtered = input.search
          ? members.filter((m) =>
              m.email_address.toLowerCase().includes(input.search.toLowerCase()) ||
              (m.merge_fields.ENTITY || "").toLowerCase().includes(input.search.toLowerCase())
            )
          : members;

        return {
          members: filtered.map((m) => ({
            id: m.id,
            email: m.email_address,
            status: m.status,
            entityType: m.merge_fields.ENTITY || "—",
            tags: m.tags.map((t) => t.name),
            signedUpAt: m.timestamp_signup || m.timestamp_opt || m.last_changed,
            ipSignup: m.ip_signup || "—",
          })),
          total,
          filtered: filtered.length,
        };
      }),

    // Admin: total count
    count: adminProcedure.query(async () => {
      const { total } = await fetchMailchimpMembers(0, 1);
      return { total };
    }),

    // Admin: export all members as CSV string
    exportCsv: adminProcedure
      .input(
        z.object({
          entityFilter: z.string().optional().default("all"),
        })
      )
      .mutation(async ({ input }) => {
        // Fetch up to 1000 members for export
        const { members } = await fetchMailchimpMembers(0, 1000, input.entityFilter);

        const header = ["Email", "Entity Type", "Tags", "Signed Up At", "Status"];
        const rows = members.map((m) => [
          m.email_address,
          m.merge_fields.ENTITY || "",
          m.tags.map((t) => t.name).join("; "),
          m.timestamp_signup || m.timestamp_opt || m.last_changed,
          m.status,
        ]);

        const csv = [header, ...rows]
          .map((row) =>
            row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
          )
          .join("\n");

        return { csv, count: members.length };
      }),
  }),
});

export type AppRouter = typeof appRouter;
