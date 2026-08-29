/**
 * Tests for admin waitlist procedures: list, count, exportCsv
 * These use adminProcedure so they require role === 'admin'
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";

// ── Mock fetch ──────────────────────────────────────────────────────────────
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// ── Context helpers ─────────────────────────────────────────────────────────
function makeAdminCtx(): TrpcContext {
  const user: User = {
    id: 1,
    openId: "admin-user",
    email: "tyler@www.agentscorp.xyz",
    name: "Tyler",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function makeUserCtx(): TrpcContext {
  const user: User = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function makeAnonCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ── Sample Mailchimp response ───────────────────────────────────────────────
const SAMPLE_MEMBERS = [
  {
    id: "abc123",
    email_address: "agent@example.com",
    status: "subscribed",
    merge_fields: { ENTITY: "IP License NFT" },
    tags: [{ id: 1, name: "agentcorp-waitlist" }, { id: 2, name: "ip-license-nft" }],
    timestamp_signup: "2026-02-01T10:00:00Z",
    timestamp_opt: "2026-02-01T10:00:00Z",
    last_changed: "2026-02-01T10:00:00Z",
    ip_signup: "1.2.3.4",
  },
  {
    id: "def456",
    email_address: "dao@example.com",
    status: "subscribed",
    merge_fields: { ENTITY: "Wyoming LLC" },
    tags: [{ id: 1, name: "agentcorp-waitlist" }, { id: 3, name: "wyoming-llc" }],
    timestamp_signup: "2026-02-02T12:00:00Z",
    timestamp_opt: "2026-02-02T12:00:00Z",
    last_changed: "2026-02-02T12:00:00Z",
    ip_signup: "5.6.7.8",
  },
];

function mockMailchimpList(members = SAMPLE_MEMBERS, total = 2) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ members, total_items: total }),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.MAILCHIMP_API_KEY = "test-key-us3";
  process.env.MAILCHIMP_AUDIENCE_ID = "test-audience-id";
  process.env.MAILCHIMP_DC = "us3";
});

// ── waitlist.count ──────────────────────────────────────────────────────────
describe("waitlist.count", () => {
  it("returns total subscriber count for admin", async () => {
    mockMailchimpList(SAMPLE_MEMBERS.slice(0, 1), 42);
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.waitlist.count();
    expect(result.total).toBe(42);
  });

  it("throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(makeUserCtx());
    await expect(caller.waitlist.count()).rejects.toThrow();
  });

  it("throws UNAUTHORIZED for anonymous users", async () => {
    const caller = appRouter.createCaller(makeAnonCtx());
    await expect(caller.waitlist.count()).rejects.toThrow();
  });
});

// ── waitlist.list ───────────────────────────────────────────────────────────
describe("waitlist.list", () => {
  it("returns paginated member list for admin", async () => {
    mockMailchimpList();
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.waitlist.list({});
    expect(result.members).toHaveLength(2);
    expect(result.members[0].email).toBe("agent@example.com");
    expect(result.members[0].entityType).toBe("IP License NFT");
    expect(result.total).toBe(2);
  });

  it("filters by entity type", async () => {
    mockMailchimpList();
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.waitlist.list({ entityFilter: "IP License NFT" });
    expect(result.members).toHaveLength(1);
    expect(result.members[0].email).toBe("agent@example.com");
  });

  it("filters by search term", async () => {
    mockMailchimpList();
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.waitlist.list({ search: "dao@" });
    expect(result.members).toHaveLength(1);
    expect(result.members[0].email).toBe("dao@example.com");
  });

  it("returns empty array when no members match search", async () => {
    mockMailchimpList();
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.waitlist.list({ search: "nonexistent@xyz.com" });
    expect(result.members).toHaveLength(0);
  });

  it("throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(makeUserCtx());
    await expect(caller.waitlist.list({})).rejects.toThrow();
  });
});

// ── waitlist.exportCsv ──────────────────────────────────────────────────────
describe("waitlist.exportCsv", () => {
  it("generates valid CSV with header and rows", async () => {
    mockMailchimpList();
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.waitlist.exportCsv({});
    expect(result.count).toBe(2);
    expect(result.csv).toContain("Email");
    expect(result.csv).toContain("Entity Type");
    expect(result.csv).toContain("agent@example.com");
    expect(result.csv).toContain("IP License NFT");
  });

  it("filters by entity type in export", async () => {
    mockMailchimpList();
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.waitlist.exportCsv({ entityFilter: "Wyoming LLC" });
    expect(result.csv).toContain("dao@example.com");
    expect(result.csv).not.toContain("agent@example.com");
  });

  it("throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(makeUserCtx());
    await expect(caller.waitlist.exportCsv({})).rejects.toThrow();
  });
});
