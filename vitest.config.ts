import { defineConfig } from "vitest/config";
import path from "path";

const templateRoot = path.resolve(import.meta.dirname);

export default defineConfig({
  root: templateRoot,
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    environment: "node",
    include: ["server/**/*.test.ts", "server/**/*.spec.ts", "client/src/**/*.test.ts"],
    // ENV in server/_core/env.ts is read once at import time, so values the
    // tests rely on must exist before any module loads.
    env: {
      BUILT_IN_FORGE_API_URL: "https://forge.manus.ai/",
      BUILT_IN_FORGE_API_KEY: "test-forge-key",
    },
  },
});
