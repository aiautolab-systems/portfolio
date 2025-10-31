import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: false, // Allow .only during development
  outputDir: './reports',
  retries: 1, // Retry failed tests once
  workers: 1,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'results/junit-report.xml' }],
  ],
  use: {
    testIdAttribute: 'data-testid',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    locale: 'en-US',
    headless: true,
    // Add some default timeouts
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        permissions: ['clipboard-read', 'clipboard-write'],
        viewport: { width: 1680, height: 930 },
      },
    },
  ],
  timeout: process.env.CI ? 60000 : 240000, // Shorter timeout in CI
  // webServer: process.env.CI ? undefined : {
  //   command: 'npm run dev',
  //   url: 'http://localhost:5173',
  //   reuseExistingServer: true,
  //   timeout: 180 * 1000,
  // },
})
