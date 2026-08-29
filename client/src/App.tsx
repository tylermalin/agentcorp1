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

const PAGE_TITLES: Record<string, string> = {
  "/": "AgentCorp — On-Chain Legal Infrastructure",
  "/whitepaper": "AgentCorp Whitepaper — On-Chain Legal Protocol",
  "/docs": "AgentCorp Developer Docs — Smart Contract API",
  "/mint": "Mint a Delaware LLC on Base — Coming Q1 2027",
  "/agent": "Agent Minting — Autonomous Incorporation | AgentCorp",
  "/admin": "Admin Dashboard — AgentCorp",
};

const PAGE_DESCRIPTIONS: Record<string, string> = {
  "/": "Mint a Delaware Series LLC as an NFT on Base. Legal infrastructure for autonomous agents, founders, and DAOs. No lawyer. No waiting.",
  "/whitepaper": "The AgentCorp Protocol Whitepaper v1.0 — on-chain legal infrastructure, gas abstraction via Avocado, and the future of autonomous entity formation.",
  "/docs": "Developer documentation for the AgentCorp Protocol — smart contract interface, entity types, document schema, and SDK integration.",
  "/mint": "Form a Delaware Series LLC, DAO Charter, or Series Designation on Base in under 5 minutes. The NFT IS the entity.",
  "/agent": "Let your AI agent mint a legal entity autonomously. One SKILL.md file, USDC via Avocado, any LLM framework.",
  "/admin": "Owner-only admin dashboard for AgentCorp waitlist management.",
};

function TitleManager() {
  const [location] = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[location] || "AgentCorp — On-Chain Legal Infrastructure";
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
                background: "#0d0d0d",
                border: "1px solid rgba(201,168,76,0.25)",
                color: "#f2efe8",
                fontFamily: "'DM Mono', monospace",
                fontSize: "12px",
                borderRadius: "0",
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
