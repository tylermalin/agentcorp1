import { describe, expect, it } from "vitest";
import { DEFAULT_ANSWERS, decodeAnswers, encodeAnswers, nice, recommend, type Answers } from "./planner";

const a = (over: Partial<Answers>): Answers => ({ ...DEFAULT_ANSWERS, ...over });

describe("recommend (mirrors /skill.md Step 2)", () => {
  it("token governance -> DAO charter, regardless of count", () => {
    expect(recommend(a({ governance: "token", count: "20+" })).code).toBe("DE-DAO-LLC");
  });
  it("multiple workloads -> Series LLC with series", () => {
    const p = recommend(a({ count: "6-20" }));
    expect(p.code).toBe("DE-SERIES-LLC");
    expect(p.seriesCount).toBe(12);
  });
  it("one agent, operator governed -> standard LLC, no series", () => {
    const p = recommend(a({ kind: "agents", count: "1", governance: "none" }));
    expect(p.code).toBe("DE-LLC");
    expect(p.seriesCount).toBe(0);
  });
  it("client engagements lean Series even at one", () => {
    expect(recommend(a({ kind: "clients", count: "1" })).code).toBe("DE-SERIES-LLC");
  });
  it("always keeps the human filing steps", () => {
    const p = recommend(a({}));
    expect(p.youDo.join(" ")).toMatch(/Certificate of Formation/);
    expect(p.youDo.join(" ")).toMatch(/registered agent/);
    expect(p.youDo.join(" ")).toMatch(/EIN/);
  });
  it("flags a missing human signer", () => {
    expect(recommend(a({ approver: "none" })).cautions.join(" ")).toMatch(/human signer/);
  });
  it("guardrails scale with spend and round nicely", () => {
    const low = recommend(a({ spend: "lt1k" })).guardrails;
    const high = recommend(a({ spend: "gt100k" })).guardrails;
    expect(high.dailyCapUsd).toBeGreaterThan(low.dailyCapUsd);
    expect(low.approvalAboveUsd).toBeLessThan(low.dailyCapUsd);
  });
});

describe("helpers", () => {
  it("nice() rounds to 1/2/2.5/5 steps", () => {
    expect(nice(200)).toBe(200);
    expect(nice(1667)).toBe(2000);
    expect(nice(26.7)).toBe(25);
    expect(nice(5000)).toBe(5000);
  });
  it("answers round-trip through the share link", () => {
    const ans = a({ kind: "assets", count: "20+", spend: "gt100k", rails: "fiat" });
    expect(decodeAnswers(encodeAnswers(ans))).toEqual(ans);
  });
  it("rejects incomplete or bogus links", () => {
    expect(decodeAnswers("kind=agents")).toBeNull();
    expect(decodeAnswers(encodeAnswers(DEFAULT_ANSWERS).replace("kind=agents", "kind=evil"))?.kind).toBe("agents");
  });
});
