import { test, expect, Page } from '@playwright/test';
import { getHomeUrl } from '../helpers/config';

/**
 * Hiring Manager Persona Tests
 * Tests focused on quick assessment, contact methods, and professional verification
 */
test.describe('Portfolio - Hiring Manager Persona (Sarah Chen)', () => {
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

  test('should quickly find key professional information', async () => {
    await gotoHome();
    await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible();
    await expect(page.getByTestId('hero-title')).toContainText('Lead Software Development Engineer in Test');
    await expect(page.getByText('New Smyrna Beach, FL')).toBeVisible();
    await expect(page.getByText('Tinubu Square – Insurance').first()).toBeVisible();
    await expect(page.getByText('Sep 2024 – Present').first()).toBeVisible();
  });

  test('should have multiple working contact methods', async () => {
    await gotoHome();
    const startConversationBtn = page.getByRole('link', { name: 'Start a Conversation' });
    await expect(startConversationBtn).toBeVisible();
    await expect(startConversationBtn).toHaveAttribute('href', /mailto:ozkanalpi@yahoo\.com/);
    await expect(startConversationBtn).toHaveAttribute('href', /subject=Hi%20Alper/);

    const emailLink = page.getByRole('link', { name: 'ozkanalpi@yahoo.com' });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:ozkanalpi@yahoo.com');

    const phoneLink = page.getByTestId('hero-phone-link');
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:7325735195');

    const linkedinLink = page.getByRole('link', { name: 'Connect' });
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ozkan-alpi/');
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  test('should provide easy resume access', async () => {
    await gotoHome();
    const heroResumeBtn = page.getByRole('link', { name: 'Download Resume' }).first();
    if (await heroResumeBtn.isVisible()) {
      await expect(heroResumeBtn).toHaveAttribute('href', /alper-ozkan-resume\.pdf$/);
      await expect(heroResumeBtn).toContainText('Download Resume');
    }

    await page.getByRole('link', { name: 'Contact' }).click();
    const contactResumeBtn = page.getByRole('link', { name: 'Download Resume' }).last();
    if (await contactResumeBtn.isVisible()) {
      await expect(contactResumeBtn).toHaveAttribute('href', /alper-ozkan-resume\.pdf$/);
    }
  });

  test('should highlight relevant experience and skills quickly', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page.getByText('Playwright').first()).toBeVisible();
    await expect(page.getByText('Cypress').first()).toBeVisible();
    await expect(page.getByText('Selenium WebDriver').first()).toBeVisible();
    await expect(page.getByText('JavaScript').first()).toBeVisible();
    await expect(page.getByText('TypeScript').first()).toBeVisible();
    await expect(page.getByText('AI/GenAI Testing Agents').first()).toBeVisible();
  });

  test('should verify experience timeline and progression', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page.getByTestId('experience-section').getByText('Tinubu Square – Insurance')).toBeVisible();
    await expect(page.getByTestId('experience-section').getByRole('heading', { name: 'Lead Software Development Engineer in Test', level: 3 })).toBeVisible();
    await expect(page.getByText('Sep 2024 – Present').first()).toBeVisible();
    await expect(page.getByText('Derivco (Betway)').first()).toBeVisible();
    await expect(page.getByTestId('experience-section').getByRole('heading', { name: 'Software Development Engineer in Test II', level: 3 })).toBeVisible();
    await expect(page.getByText('Mentoring engineers')).toBeVisible();
    await expect(page.getByText('40%', { exact: false }).first()).toBeVisible();
  });

  test('should display credible achievements and metrics', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Highlights' }).click();
    await expect(page.getByText('40% less manual effort')).toBeVisible();
    await expect(page.getByText('Deployment time -50%')).toBeVisible();
    await expect(page.getByText('KPIs in real time')).toBeVisible();
    await expect(page.getByText('AI and LLM-powered')).toBeVisible();
    await expect(page.getByText('Grafana dashboards').first()).toBeVisible();
  });

  test('should validate professional credentials', async () => {
    await gotoHome();
    await page.locator('.credentials').scrollIntoViewIfNeeded();

    const istqbLink = page.locator('a.badge-chip').filter({ hasText: 'ISTQB Certified Tester' });
    await expect(istqbLink).toBeVisible();
    await expect(istqbLink).toHaveAttribute('href', /atsqa\.org/);
    await expect(istqbLink).toHaveAttribute('target', '_blank');

    const k8sLink = page.locator('a.badge-chip').filter({ hasText: 'Kubernetes and Cloud Native Essentials' });
    await expect(k8sLink).toBeVisible();
    await expect(k8sLink).toHaveAttribute('href', /linuxfoundation\.org/);
  });

  test('should work efficiently on mobile for busy recruiters', async () => {
    await gotoHome();
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible();
    await expect(page.getByTestId('hero-title')).toContainText('Lead Software Development Engineer in Test');

    const emailButton = page.getByRole('link', { name: 'Start a Conversation' });
    await expect(emailButton).toBeVisible();

    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page.getByText("Let's build confident releases together")).toBeVisible();

    const contactEmailBtn = page.getByRole('link', { name: 'Email Alper' });
    await expect(contactEmailBtn).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 720 });
  });
});
