import { test, expect, Page } from '@playwright/test';
import { getHomeUrl } from './helpers/config';

/**
 * Portfolio Seed Tests
 * Quick validation of core functionality and setup verification
 */
test.describe('Portfolio Seed Tests', () => {
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

  test('should load portfolio page and verify core elements', async () => {
    await gotoHome();

    await expect(page).toHaveTitle(/portfolio/);
    await expect(page.getByTestId('site-header')).toBeVisible();
    await expect(page.getByTestId('hero-name')).toHaveText('Alper Ozkan');
    await expect(page.getByTestId('hero-title')).toHaveText('Lead Software Development Engineer in Test');
    await expect(page.getByTestId('primary-nav')).toBeVisible();

    await page.getByTestId('nav-link-skills').click();
    await expect(page.getByTestId('skills-section')).toBeInViewport();

    await expect(page.getByTestId('hero-email-link')).toHaveText('ozkanalpi@yahoo.com');
    await expect(page.getByTestId('hero-phone-link')).toHaveText('732 573 5195');

    console.log('✅ Portfolio page loaded successfully with all core elements');
  });

  test('should verify all sections are accessible and content is present', async () => {
    await gotoHome();

    const sections = [
      { navLink: 'nav-link-about', testId: undefined, content: 'Alper Ozkan' },
      { navLink: 'nav-link-skills', testId: 'skills-section', content: 'Playwright' },
      { navLink: 'nav-link-experience', testId: 'experience-section', content: 'Tinubu Square' },
      { navLink: 'nav-link-highlights', testId: 'highlights-section', content: '40% less manual effort' },
      { navLink: 'nav-link-contact', testId: 'contact-section', content: 'Email Alper' },
    ] as const;

    for (const section of sections) {
      await page.getByTestId(section.navLink).click();

      if (section.testId) {
        await expect(page.getByTestId(section.testId)).toBeInViewport();
      }

      await expect(page.locator('body')).toContainText(section.content);
    }

    console.log('✅ All sections are accessible and contain expected content');
  });

  test('should verify contact methods are functional', async () => {
    await gotoHome();

    const startConversationBtn = page.getByTestId('hero-start-conversation-button');
    await expect(startConversationBtn).toHaveAttribute('href', /mailto:ozkanalpi@yahoo\.com/);

    const emailLink = page.getByTestId('hero-email-link');
    await expect(emailLink).toHaveAttribute('href', 'mailto:ozkanalpi@yahoo.com');

    const phoneLink = page.getByTestId('hero-phone-link');
    await expect(phoneLink).toHaveAttribute('href', 'tel:7325735195');

    const linkedinLink = page.getByTestId('hero-linkedin-link');
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ozkan-alpi/');

    console.log('✅ All contact methods are properly configured');
  });

  test('should work on mobile viewport', async () => {
    await gotoHome();
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.getByTestId('hero-name')).toBeVisible();
    await expect(page.getByTestId('primary-nav')).toBeVisible();

    await page.getByTestId('nav-link-contact').click();
    await expect(page.getByTestId('contact-section')).toBeInViewport();

    const contactEmailBtn = page.getByTestId('contact-email-button');
    await expect(contactEmailBtn).toBeVisible();

    console.log('✅ Portfolio is mobile-responsive and functional');
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should display key professional information correctly', async () => {
    await gotoHome();

    await expect(page.getByTestId('brand-name')).toHaveText('Alper Ozkan');
    await expect(page.getByTestId('brand-role')).toHaveText('Lead Software Development Engineer in Test');

    await expect(page.locator('.hero-panel')).toContainText('Tinubu Square');
    await expect(page.locator('.hero-panel')).toContainText('Sep 2024 – Present');
    await expect(page.locator('.hero-meta')).toContainText('New Smyrna Beach, FL');

    await page.getByTestId('nav-link-skills').click();
    await expect(page.locator('.skills')).toContainText('Cypress');
    await expect(page.locator('.skills')).toContainText('AI/GenAI Testing Agents');

    console.log('✅ Professional information is accurate and up-to-date');
  });
});
