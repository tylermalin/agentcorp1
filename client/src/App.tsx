import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Whitepaper from "./pages/Whitepaper";
import Docs from "./pages/Docs";
import Mint from "./pages/Mint";
import Agent from "./pages/Agent";
import Admin from "./pages/Admin";
import { useEffect } from "react";

const DEFAULT_TITLE = "AgentsCorp — Entity Structure & Treasury Rails for AI Agents";

const PAGE_TITLES: Record<string, string> = {
  "/": DEFAULT_TITLE,
  "/whitepaper": "Whitepaper — AgentsCorp Architecture & Protocol Overview",
  "/docs": "Developer Docs — AgentsCorp",
  "/mint": "Entity Setup Preview — AgentsCorp (Target Q1 2027)",
  "/agent": "For Agents — /skill.md & SDK Integration | AgentsCorp",
  "/admin": "Admin Dashboard — AgentsCorp",
};

const PAGE_DESCRIPTIONS: Record<string, string> = {
  "/": "AgentsCorp helps agent platforms, operators, and enterprises structure Delaware Series LLCs (6 Del. C. § 18-215), anchor governing documents on Arweave, and connect treasury controls with per-series liability isolation. Pre-mainnet; target Q1 2027.",
  "/whitepaper": "AgentsCorp Architecture & Protocol Overview (v1.0): Delaware Series LLC structure, Arweave document anchoring, treasury and policy controls, and the 2027 roadmap.",
  "/docs": "Developer documentation for AgentsCorp: /skill.md, SDK preview, planned contract interface, document schema, and current deployment status.",
  "/mint": "Entity setup is in development. Preview the planned Delaware Series LLC setup flow and join the Q1 2027 design-partner cohort.",
  "/agent": "Wire AI agents into entity and treasury workflows with /skill.md, the TypeScript SDK, and Base Sepolia examples. Pre-mainnet; target Q1 2027.",
  "/admin": "Owner-only admin dashboard for AgentsCorp waitlist management.",
};

function TitleManager() {
  const [location] = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[location] || DEFAULT_TITLE;
    const description = PAGE_DESCRIPTIONS[location] || PAGE_DESCRIPTIONS["/"];

    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }

    // Update OG title and description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://www.agentscorp.xyz${location}`);

    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", title);

    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute("content", description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://www.agentscorp.xyz${location}`);
  }, [location]);

  return null;
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <TitleManager />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/whitepaper" component={Whitepaper} />
        <Route path="/docs" component={Docs} />
        <Route path="/mint" component={Mint} />
        <Route path="/agent" component={Agent} />
        <Route path="/admin" component={Admin} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#181818",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "#fafafa",
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                borderRadius: "12px",
              },
            }}
          />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
