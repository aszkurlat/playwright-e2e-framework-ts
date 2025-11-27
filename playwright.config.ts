import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 1,
  globalSetup: require.resolve("./global-setup"),
  use: {
    baseURL: "https://www.saucedemo.com",
    headless: true,
    storageState: "storageStates/standardUser.json",
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  reporter: [
    ["list"],
    ["html", { open: "never" }],
  ],
});
