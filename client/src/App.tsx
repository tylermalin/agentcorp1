import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { metaFor, SITE_ORIGIN } from "./lib/seo";

// Everything except Home loads on demand to keep the landing bundle small.
const Whitepaper = lazy(() => import("./pages/Whitepaper"));
const Docs = lazy(() => import("./pages/Docs"));
const Setup = lazy(() => import("./pages/Setup"));
const Agent = lazy(() => import("./pages/Agent"));
const Admin = lazy(() => import("./pages/Admin"));
const Legal = lazy(() => import("./pages/Legal"));
const Planner = lazy(() => import("./pages/Planner"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Keeps head tags in sync on client-side navigation (static HTML already has them). */
function TitleManager() {
  const [location] = useLocation();

  useEffect(() => {
    const { title, description } = metaFor(location);
    const url = `${SITE_ORIGIN}${location === "/" ? "" : location}`;
    document.title = title;
    const set = (selector: string, attr: string, value: string) =>
      document.querySelector(selector)?.setAttribute(attr, value);
    set('meta[name="description"]', "content", description);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
    set('meta[property="og:url"]', "content", url);
    set('meta[property="twitter:title"]', "content", title);
    set('meta[property="twitter:description"]', "content", description);
    set('link[rel="canonical"]', "href", url);
  }, [location]);

  return null;
}

function Routes() {
  return (
    <>
      <TitleManager />
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/whitepaper" component={Whitepaper} />
          <Route path="/docs" component={Docs} />
          <Route path="/setup" component={Setup} />
          <Route path="/mint">
            <Redirect to="/setup" replace />
          </Route>
          <Route path="/agent" component={Agent} />
          <Route path="/admin" component={Admin} />
          <Route path="/legal" component={Legal} />
          <Route path="/planner" component={Planner} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

/** `ssrPath` is set only by the build-time pre-renderer. */
function App({ ssrPath }: { ssrPath?: string }) {
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
                fontFamily: "Geist, sans-serif",
                fontSize: "13px",
                borderRadius: "12px",
              },
            }}
          />
          <WouterRouter ssrPath={ssrPath}>
            <Routes />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
