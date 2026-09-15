import { z } from "zod";

/**
 * Sign-in credentials come from the env file so they are configurable without
 * a code change.
 *
 * These are Vite `VITE_*` variables, which are inlined into the client bundle
 * at build time — they are visible to anyone who opens the app. This is a demo
 * gate, not real authentication; a production build would verify credentials
 * on a server.
 */
const envSchema = z.object({
  VITE_AUTH_USERNAME: z.string().min(1),
  VITE_AUTH_PASSWORD: z.string().min(1),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  throw new Error(
    "Missing auth configuration. Copy .env.example to .env and set VITE_AUTH_USERNAME and VITE_AUTH_PASSWORD.",
  );
}

export const authConfig = {
  username: parsed.data.VITE_AUTH_USERNAME,
  password: parsed.data.VITE_AUTH_PASSWORD,
};
