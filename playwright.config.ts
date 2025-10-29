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
    ['html', { outputFolder: 'results/html-report' }],
  ],
  use: {
    testIdAttribute: 'data-testid',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    locale: 'en-US',
    headless: true,
    baseURL: process.env.CI ? 'http://127.0.0.1:5173' : 'http://localhost:5173',
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
  webServer: {
    command: 'npm run dev',
    url: process.env.CI ? 'http://127.0.0.1:5173' : 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000, // 3 minutes for server startup
  },
})
