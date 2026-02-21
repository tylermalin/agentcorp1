import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Whitepaper from "./pages/Whitepaper";
import Docs from "./pages/Docs";
import Mint from "./pages/Mint";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/docs" component={Docs} />
      <Route path="/mint" component={Mint} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
