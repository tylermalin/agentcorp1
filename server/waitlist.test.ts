import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("waitlist.subscribe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.MAILCHIMP_API_KEY = "test-api-key-us3";
    process.env.MAILCHIMP_AUDIENCE_ID = "test-audience-id";
    process.env.MAILCHIMP_DC = "us3";
  });

  it("successfully subscribes a new email", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "abc123", status: "subscribed" }),
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.waitlist.subscribe({
      email: "agent@example.com",
      entityType: "IP License NFT",
      source: "entity-card",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("subscribed");
    expect(mockFetch).toHaveBeenCalledOnce();

    const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("us3.api.mailchimp.com");
    expect(url).toContain("test-audience-id");

    const body = JSON.parse(options.body as string);
    expect(body.email_address).toBe("agent@example.com");
    expect(body.status).toBe("subscribed");
    expect(body.merge_fields.ENTITY).toBe("IP License NFT");
    expect(body.tags).toContain("agentcorp-waitlist");
    expect(body.tags).toContain("ip-license-nft");
  });

  it("handles already-subscribed members gracefully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ title: "Member Exists", detail: "already subscribed" }),
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.waitlist.subscribe({
      email: "existing@example.com",
      entityType: "Wyoming LLC",
      source: "entity-card",
    });

    expect(result.success).toBe(true);
    expect(result.alreadySubscribed).toBe(true);
  });

  it("rejects invalid email addresses", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.waitlist.subscribe({
        email: "not-an-email",
        entityType: "IP License NFT",
        source: "entity-card",
      })
    ).rejects.toThrow();
  });

  it("throws when Mailchimp API returns an error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ title: "API Error", detail: "Something went wrong" }),
    });

    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.waitlist.subscribe({
        email: "test@example.com",
        entityType: "IP License NFT",
        source: "entity-card",
      })
    ).rejects.toThrow("Something went wrong");
  });
});
