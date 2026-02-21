/**
 * AGENTCORP ADMIN — Waitlist Dashboard
 * Owner-only protected page. Fetches live waitlist data from Mailchimp via tRPC.
 * Features: search, entity type filter, pagination, CSV export, real-time count.
 */

import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const BRASS = "#c9a84c";
const WHITE = "#f2efe8";
const BLACK = "#080808";
const MUTED = "rgba(242,239,232,0.45)";
const BORDER = "rgba(201,168,76,0.12)";

const ENTITY_OPTIONS = [
  { value: "all", label: "All Entity Types" },
  { value: "IP License NFT", label: "IP License NFT" },
  { value: "Wyoming LLC", label: "Wyoming LLC" },
  { value: "Delaware Series LLC", label: "Delaware Series LLC" },
  { value: "Series Designation", label: "Series Designation" },
  { value: "DAO Operating Charter", label: "DAO Operating Charter" },
  { value: "Standard Delaware LLC", label: "Standard Delaware LLC" },
];

function formatDate(iso: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function Admin() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [entityFilter, setEntityFilter] = useState("all");
  const [offset, setOffset] = useState(0);
  const [exportStatus, setExportStatus] = useState<"idle" | "loading" | "done">("idle");
  const PAGE_SIZE = 50;

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  // Reset to first page on filter/search change
  useEffect(() => {
    setOffset(0);
  }, [entityFilter, debouncedSearch]);

  // Auth check
  const { data: user, isLoading: authLoading } = trpc.auth.me.useQuery();

  // Total count
  const { data: countData } = trpc.waitlist.count.useQuery(undefined, {
    enabled: user?.role === "admin",
    refetchInterval: 30_000,
  });

  // Member list
  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = trpc.waitlist.list.useQuery(
    { offset, count: PAGE_SIZE, entityFilter, search: debouncedSearch },
    {
      enabled: user?.role === "admin",
      refetchInterval: 60_000,
    }
  );

  // CSV export mutation
  const exportMutation = trpc.waitlist.exportCsv.useMutation({
    onSuccess: ({ csv, count }) => {
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `agentcorp-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus("done");
      setTimeout(() => setExportStatus("idle"), 2000);
      console.log(`[Admin] Exported ${count} members`);
    },
    onError: (err) => {
      console.error("[Admin] Export failed:", err);
      setExportStatus("idle");
    },
  });

  const handleExport = () => {
    setExportStatus("loading");
    exportMutation.mutate({ entityFilter });
  };

  // Loading auth
  if (authLoading) {
    return (
      <div style={{ background: BLACK, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: MUTED, fontFamily: "'DM Mono', monospace", fontSize: "12px", letterSpacing: "0.1em" }}>
          Verifying access...
        </span>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div style={{ background: BLACK, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "24px" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", color: WHITE }}>
          Access Denied
        </h1>
        <p style={{ color: MUTED, fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
          You must be signed in as the owner to access this page.
        </p>
        <Link href="/">
          <span style={{ color: BRASS, fontSize: "12px", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>
            ← Back to Home
          </span>
        </Link>
      </div>
    );
  }

  // Not admin
  if (user.role !== "admin") {
    return (
      <div style={{ background: BLACK, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "24px" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", color: WHITE }}>
          Forbidden
        </h1>
        <p style={{ color: MUTED, fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
          This page is restricted to the site owner.
        </p>
        <Link href="/">
          <span style={{ color: BRASS, fontSize: "12px", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>
            ← Back to Home
          </span>
        </Link>
      </div>
    );
  }

  const members = data?.members ?? [];
  const totalFiltered = data?.filtered ?? 0;
  const totalAll = countData?.total ?? 0;
  const totalPages = Math.ceil(totalFiltered / PAGE_SIZE);
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;

  return (
    <div style={{ background: BLACK, color: WHITE, minHeight: "100vh", fontFamily: "'DM Mono', monospace", position: "relative" }}>
      {/* Brass grid overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0,
          backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,8,8,0.97)", borderBottom: `1px solid ${BORDER}`, padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/">
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "14px", letterSpacing: "0.05em", cursor: "pointer" }}>
              AGENT<span style={{ color: BRASS }}>CORP</span>
            </span>
          </Link>
          <span style={{ color: BORDER, fontSize: "12px" }}>/</span>
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: BRASS }}>
            Admin Dashboard
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "10px", color: MUTED }}>
            {user.name || user.email || "Owner"}
          </span>
          <span style={{ fontSize: "10px", color: BRASS, border: `1px solid rgba(201,168,76,0.3)`, padding: "3px 8px", letterSpacing: "0.1em" }}>
            ADMIN
          </span>
        </div>
      </header>

      {/* Main content */}
      <main style={{ position: "relative", zIndex: 1, padding: "48px 48px" }}>

        {/* Page title + stats */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "9px", color: BRASS, letterSpacing: "0.2em", opacity: 0.7 }}>01</span>
            <span style={{ width: "32px", height: "1px", background: BRASS, opacity: 0.3 }} />
            <span style={{ fontSize: "9px", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase" as const }}>Waitlist</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "24px" }}>
            Waitlist{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: BRASS }}>
              Signups.
            </em>
          </h1>

          {/* Stat cards */}
          <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", marginBottom: "32px" }}>
            {[
              { label: "Total Subscribers", value: totalAll.toLocaleString(), highlight: true },
              { label: "Showing (filtered)", value: totalFiltered.toLocaleString(), highlight: false },
              { label: "Current Page", value: `${currentPage} / ${Math.max(totalPages, 1)}`, highlight: false },
              { label: "Audience", value: "Malama Foundation", highlight: false },
            ].map((s) => (
              <div key={s.label} style={{ border: `1px solid ${BORDER}`, padding: "16px 24px", minWidth: "160px", background: s.highlight ? "rgba(201,168,76,0.06)" : "transparent" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "24px", color: s.highlight ? BRASS : WHITE, lineHeight: 1, marginBottom: "4px" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: MUTED }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls row */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "24px", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 240px", minWidth: "200px" }}>
            <input
              type="text"
              placeholder="Search email or entity type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(201,168,76,0.04)",
                border: `1px solid ${BORDER}`,
                color: WHITE,
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                padding: "10px 16px",
                outline: "none",
                boxSizing: "border-box" as const,
              }}
            />
          </div>

          {/* Entity filter */}
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            style={{
              background: "rgba(201,168,76,0.04)",
              border: `1px solid ${BORDER}`,
              color: WHITE,
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              padding: "10px 16px",
              outline: "none",
              cursor: "pointer",
              flex: "0 0 auto",
            }}
          >
            {ENTITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} style={{ background: "#111", color: WHITE }}>
                {o.label}
              </option>
            ))}
          </select>

          {/* Refresh */}
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            style={{
              background: "none",
              border: `1px solid ${BORDER}`,
              color: MUTED,
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              padding: "10px 16px",
              cursor: isFetching ? "wait" : "pointer",
              opacity: isFetching ? 0.5 : 1,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = BRASS)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = BORDER)}
          >
            {isFetching ? "LOADING..." : "↻ REFRESH"}
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExport}
            disabled={exportStatus === "loading"}
            style={{
              background: exportStatus === "done" ? "rgba(74,222,128,0.15)" : BRASS,
              border: `1px solid ${exportStatus === "done" ? "rgba(74,222,128,0.4)" : BRASS}`,
              color: exportStatus === "done" ? "#4ade80" : BLACK,
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "10px",
              letterSpacing: "0.1em",
              padding: "10px 20px",
              cursor: exportStatus === "loading" ? "wait" : "pointer",
              opacity: exportStatus === "loading" ? 0.6 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {exportStatus === "loading" ? "EXPORTING..." : exportStatus === "done" ? "✓ DOWNLOADED" : "↓ EXPORT CSV"}
          </button>
        </div>

        {/* Table */}
        <div style={{ border: `1px solid ${BORDER}`, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${BRASS}`, background: "rgba(201,168,76,0.06)" }}>
                {["#", "Email", "Entity Interest", "Tags", "Signed Up", "Status"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      color: BRASS,
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase" as const,
                      fontWeight: 600,
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} style={{ padding: "48px 16px", textAlign: "center", color: MUTED }}>
                    <span style={{ fontSize: "11px", letterSpacing: "0.1em" }}>Loading members...</span>
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "48px 16px", textAlign: "center", color: MUTED }}>
                    <span style={{ fontSize: "11px", letterSpacing: "0.1em" }}>
                      {debouncedSearch || entityFilter !== "all"
                        ? "No members match the current filters."
                        : "No waitlist members yet."}
                    </span>
                  </td>
                </tr>
              ) : (
                members.map((m, i) => (
                  <tr
                    key={m.id}
                    style={{
                      borderBottom: `1px solid ${BORDER}`,
                      background: i % 2 === 0 ? "transparent" : "rgba(201,168,76,0.012)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.05)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "transparent" : "rgba(201,168,76,0.012)")}
                  >
                    <td style={{ padding: "14px 16px", color: "rgba(242,239,232,0.2)", fontSize: "10px" }}>
                      {offset + i + 1}
                    </td>
                    <td style={{ padding: "14px 16px", color: WHITE, fontFamily: "'DM Mono', monospace" }}>
                      {m.email}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        fontSize: "10px",
                        color: m.entityType !== "—" ? BRASS : MUTED,
                        letterSpacing: "0.05em",
                      }}>
                        {m.entityType}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        {m.tags.filter((t) => t !== "agentcorp-waitlist").map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "9px",
                              letterSpacing: "0.08em",
                              color: "rgba(201,168,76,0.6)",
                              border: `1px solid rgba(201,168,76,0.15)`,
                              padding: "2px 6px",
                              whiteSpace: "nowrap" as const,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", color: MUTED, whiteSpace: "nowrap" as const, fontSize: "10px" }}>
                      {formatDate(m.signedUpAt)}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        fontSize: "9px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase" as const,
                        color: m.status === "subscribed" ? "#4ade80" : MUTED,
                        border: `1px solid ${m.status === "subscribed" ? "rgba(74,222,128,0.3)" : "rgba(242,239,232,0.1)"}`,
                        padding: "3px 8px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}>
                        {m.status === "subscribed" && (
                          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
                        )}
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontSize: "10px", color: MUTED }}>
              Showing {offset + 1}–{Math.min(offset + PAGE_SIZE, totalFiltered)} of {totalFiltered} results
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
                disabled={offset === 0}
                style={{
                  background: "none",
                  border: `1px solid ${BORDER}`,
                  color: offset === 0 ? "rgba(242,239,232,0.15)" : MUTED,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  padding: "8px 16px",
                  cursor: offset === 0 ? "not-allowed" : "pointer",
                  letterSpacing: "0.1em",
                }}
              >
                ← PREV
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const page = i + 1;
                const pageOffset = (page - 1) * PAGE_SIZE;
                const isActive = pageOffset === offset;
                return (
                  <button
                    key={page}
                    onClick={() => setOffset(pageOffset)}
                    style={{
                      background: isActive ? BRASS : "none",
                      border: `1px solid ${isActive ? BRASS : BORDER}`,
                      color: isActive ? BLACK : MUTED,
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setOffset(offset + PAGE_SIZE)}
                disabled={offset + PAGE_SIZE >= totalFiltered}
                style={{
                  background: "none",
                  border: `1px solid ${BORDER}`,
                  color: offset + PAGE_SIZE >= totalFiltered ? "rgba(242,239,232,0.15)" : MUTED,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  padding: "8px 16px",
                  cursor: offset + PAGE_SIZE >= totalFiltered ? "not-allowed" : "pointer",
                  letterSpacing: "0.1em",
                }}
              >
                NEXT →
              </button>
            </div>
          </div>
        )}

        {/* Footer note */}
        <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.2)" }}>
            Data sourced live from Mailchimp · Malama Foundation Audience · Auto-refreshes every 60s
          </span>
          <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.2)" }}>
            © 2026 AgentCorp Protocol · Admin Only
          </span>
        </div>
      </main>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        input::placeholder { color: rgba(242,239,232,0.2); }
        input:focus { border-color: rgba(201,168,76,0.4) !important; }
        select option { background: #111; }
        @media (max-width: 900px) {
          main { padding: 32px 24px !important; }
          header { padding: 0 24px !important; }
        }
        @media (max-width: 600px) {
          main { padding: 24px 16px !important; }
          header { padding: 0 16px !important; }
        }
      `}</style>
    </div>
  );
}
