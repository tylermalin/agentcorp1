/**
 * Build-time renderer. scripts/prerender.mjs calls render(path) for each
 * public route and writes the HTML into dist/public so crawlers and link
 * unfurlers get real content and per-page meta without running JS.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { prerenderToNodeStream } from "react-dom/static";
import superjson from "superjson";
import App from "./App";
import { trpc } from "./lib/trpc";

export { ROUTES, SITE_ORIGIN } from "./lib/seo";

export async function render(path: string): Promise<string> {
  const queryClient = new QueryClient();
  const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })],
  });

  const { prelude } = await prerenderToNodeStream(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App ssrPath={path} />
      </QueryClientProvider>
    </trpc.Provider>,
  );

  let html = "";
  for await (const chunk of prelude) html += chunk.toString();
  return html;
}
