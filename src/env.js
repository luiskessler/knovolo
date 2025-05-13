import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    EXTENSION_AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),

    ORG_AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    RESET_PASSWORD_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    CRON_JOB_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),

    QDRANT_URL: z.string(),
    QDRANT_KEY: z.string(),

    GMAIL_USER: z.string(),
    GMAIL_PASS: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    FRONTEND_URL: z.string(),
    S3_URL: z.string(),
    BACKEND_API_URL: z.string(),
    REDIS_PORT: z.string(),
    REDIS_HOST: z.string(),

    STRIPE_SECRET_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),+
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    EXTENSION_AUTH_SECRET: process.env.EXTENSION_AUTH_SECRET,
    ORG_AUTH_SECRET: process.env.ORG_AUTH_SECRET,
    RESET_PASSWORD_SECRET: process.env.RESET_PASSWORD_SECRET,
    CRON_JOB_SECRET: process.env.CRON_JOB_SECRET,

    QDRANT_URL: process.env.QDRANT_URL,
    QDRANT_KEY: process.env.QDRANT_KEY,

    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    FRONTEND_URL: process.env.FRONTEND_URL,
    S3_URL: process.env.S3_URL,
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,

    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
