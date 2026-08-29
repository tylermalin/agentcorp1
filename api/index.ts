import "dotenv/config";
import express, { type Request, type Response } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

/**
 * Vercel serverless entry for the API.
 *
 * The long-lived Express server in server/_core/index.ts also serves the built
 * SPA and calls listen(). Neither of those applies here: Vercel serves the
 * static client from dist/public directly, and the platform owns the listener.
 * So this builds the same app with only the API surface and exports it.
 *
 * vercel.json rewrites /api/(.*) to this function. Vercel preserves the
 * original request URL, so the mount paths below match what the client calls.
 */
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// GET /api/oauth/callback
registerOAuthRoutes(app);

// POST|GET /api/trpc/*
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Deployment probe. Returns which env vars are present, never their values,
// so a failing waitlist can be diagnosed without reading the function logs.
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    ok: true,
    env: {
      mailchimpApiKey: Boolean(process.env.MAILCHIMP_API_KEY),
      mailchimpAudienceId: Boolean(process.env.MAILCHIMP_AUDIENCE_ID),
      mailchimpDc: process.env.MAILCHIMP_DC ?? "us3 (default)",
      jwtSecret: Boolean(process.env.JWT_SECRET),
      databaseUrl: Boolean(process.env.DATABASE_URL),
      oauthServerUrl: Boolean(process.env.OAUTH_SERVER_URL),
    },
  });
});

export default app;
