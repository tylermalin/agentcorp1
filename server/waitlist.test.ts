import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock fetch globally — used by both Mailchimp and notifyOwner
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

// Helper: mock a successful Mailchimp response followed by a successful notifyOwner response
function mockMailchimpSuccess() {
  // First call: Mailchimp subscribe
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: "abc123", status: "subscribed" }),
  });
  // Second call: notifyOwner (forge API)
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({}),
    text: async () => "",
  });
}

describe("waitlist.subscribe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.MAILCHIMP_API_KEY = "test-api-key-us3";
    process.env.MAILCHIMP_AUDIENCE_ID = "test-audience-id";
    process.env.MAILCHIMP_DC = "us3";
    // notifyOwner requires these env vars
    process.env.BUILT_IN_FORGE_API_URL = "https://api.manus.im/";
    process.env.BUILT_IN_FORGE_API_KEY = "test-forge-key";
  });

  it("successfully subscribes a new email and sends owner notification", async () => {
    mockMailchimpSuccess();

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.waitlist.subscribe({
      email: "agent@example.com",
      entityType: "IP License NFT",
      source: "entity-card",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("subscribed");

    // Mailchimp call
    const [mailchimpUrl, mailchimpOptions] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(mailchimpUrl).toContain("us3.api.mailchimp.com");
    expect(mailchimpUrl).toContain("test-audience-id");
    const body = JSON.parse(mailchimpOptions.body as string);
    expect(body.email_address).toBe("agent@example.com");
    expect(body.status).toBe("subscribed");
    expect(body.merge_fields.ENTITY).toBe("IP License NFT");
    expect(body.tags).toContain("agentcorp-waitlist");
    expect(body.tags).toContain("ip-license-nft");

    // Owner notification call
    expect(mockFetch).toHaveBeenCalledTimes(2);
    const [notifyUrl, notifyOptions] = mockFetch.mock.calls[1] as [string, RequestInit];
    expect(notifyUrl).toContain("forge.manus.ai");
    const notifyBody = JSON.parse(notifyOptions.body as string);
    expect(notifyBody.title).toBe("New AgentCorp Waitlist Signup");
    expect(notifyBody.content).toContain("agent@example.com");
    expect(notifyBody.content).toContain("IP License NFT");
    expect(notifyBody.content).toContain("Entity Table"); // source = "entity-card"
  });

  it("labels hero source correctly in owner notification", async () => {
    mockMailchimpSuccess();

    const caller = appRouter.createCaller(createPublicContext());
    await caller.waitlist.subscribe({
      email: "founder@example.com",
      entityType: "Wyoming LLC",
      source: "hero",
    });

    const [, notifyOptions] = mockFetch.mock.calls[1] as [string, RequestInit];
    const notifyBody = JSON.parse(notifyOptions.body as string);
    expect(notifyBody.content).toContain("Hero Form");
  });

  it("does NOT send owner notification for already-subscribed members", async () => {
    // Only one fetch call expected (Mailchimp only, no notifyOwner)
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
    // notifyOwner should NOT have been called
    expect(mockFetch).toHaveBeenCalledTimes(1);
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

  it("still returns success even if owner notification fails (non-fatal)", async () => {
    // Mailchimp succeeds
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "xyz789", status: "subscribed" }),
    });
    // notifyOwner fails
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => "Service unavailable",
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.waitlist.subscribe({
      email: "resilient@example.com",
      entityType: "IP License NFT",
      source: "hero",
    });

    // Subscription should still succeed despite notification failure
    expect(result.success).toBe(true);
    expect(result.alreadySubscribed).toBeUndefined();
  });
});
