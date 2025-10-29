import { test, expect, Page } from '@playwright/test';
import { getHomeUrl } from '../helpers/config';

test.describe('Portfolio Page - Core Functionality', () => {
  let page: Page;
  const gotoHome = async () => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(getHomeUrl());
  };

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await gotoHome();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should load page successfully with all core elements', async () => {
    await gotoHome();
    // Verify page loads within reasonable time
    await expect(page).toHaveTitle(/portfolio/);
    
    // Check site header elements using test id
    await expect(page.getByTestId('site-header')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible();
    await expect(page.getByTestId('hero-title')).toContainText('Lead Software Development Engineer in Test');
    
    // Verify navigation is present
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Check hero section
    await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible();
    await expect(page.getByTestId('hero-title')).toContainText('Lead Software Development Engineer in Test');
    
    // Verify footer
    const currentYear = new Date().getFullYear();
    await expect(page.locator('.site-footer')).toContainText(currentYear.toString());
  });

  test('should navigate correctly to all sections', async () => {
    await gotoHome();
    // Test navigation to Skills section
    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.locator('#skills')).toBeInViewport();
    
    // Test navigation to Experience section
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page).toHaveURL(/#experience$/);
    await expect(page.locator('#experience')).toBeInViewport();
    
    // Test navigation to Highlights section
    await page.getByRole('link', { name: 'Highlights' }).click();
    await expect(page).toHaveURL(/#highlights$/);
    await expect(page.locator('#highlights')).toBeInViewport();
    
    // Test navigation to Contact section
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator('#contact')).toBeInViewport();
    
    // Test navigation back to About section
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/#about$/);
    await expect(page.locator('#about')).toBeInViewport();
  });

  test('should work correctly with direct URL navigation', async () => {
    await gotoHome();
    // Test direct navigation to skills section
    await page.goto('/#skills');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#skills').scrollIntoViewIfNeeded();
    await expect(page.locator('#skills')).toBeVisible();
    
    // Test direct navigation to experience section
    await page.goto('/#experience');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#experience').scrollIntoViewIfNeeded();
    await expect(page.locator('#experience')).toBeVisible();
    
    // Test direct navigation to contact section
    await page.goto('/#contact');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should display current role information correctly', async () => {
    await gotoHome();
    // Check current role panel
    const currentRolePanel = page.locator('.hero-panel .panel-card').first();
    await expect(currentRolePanel).toContainText('Currently');
    await expect(currentRolePanel).toContainText('Lead Software Development Engineer in Test');
    await expect(currentRolePanel).toContainText('Tinubu Square');
    await expect(currentRolePanel).toContainText('Sep 2024 – Present');
  });
});
