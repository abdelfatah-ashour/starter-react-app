import { defineConfig, devices } from "@playwright/test";

/**
 * Acceptance tests run against the Vite dev server.
 * `npm test` starts the server for you (or reuses one already on :5173).
 *
 * The app sits behind a sign-in gate, so every project starts with an
 * authenticated session already in localStorage. This keeps
 * `tests/acceptance.spec.ts` exactly as the brief specifies it — the sign-in
 * flow itself is covered by `tests/auth.spec.ts`, which opts back out.
 */
const authenticatedState = {
  cookies: [],
  origins: [
    {
      origin: "http://localhost:5173",
      localStorage: [{ name: "pulseboard-auth", value: JSON.stringify({ username: "root" }) }],
    },
  ],
};

export default defineConfig({
  testDir: "./tests",
  testMatch: /\.spec\.ts$/,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    storageState: authenticatedState,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
