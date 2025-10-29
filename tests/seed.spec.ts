import { test, expect } from '@playwright/test';
import { getHomeUrl } from './helpers/config';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // Navigate to home page using helper
    await page.goto(getHomeUrl());
    // Basic check that page loads
    await expect(page).toHaveTitle('portfolio');
  });
});
