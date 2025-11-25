import { test, expect, Page } from '@playwright/test';
import { getHomeUrl } from '../helpers/config';

test.describe('Portfolio E2E Tests', () => {
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

  test('should have correct title', async () => {
    await gotoHome();
    // The actual title is "portfolio" as set in index.html
    await expect(page).toHaveTitle('portfolio');
  });

  test('should display the header with name and title', async () => {
    await gotoHome();
    const header = page.getByTestId('site-header');
    await expect(header).toBeVisible();
    
    const name = page.getByRole('heading', { name: 'Alper Ozkan', level: 1 });
    await expect(name).toBeVisible();
    
    const title = page.getByTestId('hero-title');
    await expect(title).toContainText('Lead Software Development Engineer in Test');
  });

  test('should display all navigation sections', async () => {
    await gotoHome();
    const navSections = ['About', 'Skills', 'Experience', 'Highlights', 'Contact'];
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    
    for (const section of navSections) {
      const navLink = page.getByRole('link', { name: section });
      await expect(navLink).toBeVisible();
      await expect(navLink).toHaveAttribute('href', `#${section.toLowerCase()}`);
    }
  });

  test('should navigate to sections when clicking nav links', async () => {
    await gotoHome();
    // Click on Experience link
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page.locator('#experience')).toBeInViewport();
    
    // Click on Skills link  
    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page.locator('#skills')).toBeInViewport();
  });

  test('should download resume when clicking resume button', async () => {
    await gotoHome();
    // Wait for download and click first resume button
    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('hero-download-resume-button').click();
    const download = await downloadPromise;
    
    // Verify download
    expect(download.suggestedFilename()).toBe('alper-ozkan-resume.pdf');
  });

  test('should display contact information with correct links', async () => {
    await gotoHome();
    const emailLink = page.getByRole('link', { name: /ozkanalpi@yahoo\.com/ });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', /mailto:ozkanalpi@yahoo\.com/);
    
    const linkedinLink = page.getByRole('link', { name: 'Connect' });
    await expect(linkedinLink).toBeVisible();
    
    const phoneLink = page.getByTestId('hero-phone-link');
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', /tel:7325735195/);
  });

  test('should display work experience cards', async () => {
    await gotoHome();
    const experienceSection = page.locator('#experience');
    await experienceSection.scrollIntoViewIfNeeded();
    
    // Check for experience cards (4 based on content.js)
    const experienceCards = page.locator('.experience-card');
    await expect(experienceCards).toHaveCount(4);
    
    // Check first experience card has required elements
    const firstCard = experienceCards.first();
    await expect(firstCard.locator('h3')).toBeVisible();
    await expect(firstCard.locator('.experience-company')).toBeVisible(); // Company name
    await expect(firstCard.locator('.experience-period')).toBeVisible();
  });

  test('should display skills section with categories', async () => {
    await gotoHome();
    const skillsSection = page.locator('#skills');
    await skillsSection.scrollIntoViewIfNeeded();
    
    // Check for skill categories from content.js - look for text content instead of test IDs
    const skillCategories = [
      'Languages & Scripting',
      'Test Automation & Frameworks',
      'Quality Engineering & Platforms',
      'AI & Automation Engineering',
      'DevOps & Cloud Infrastructure',
      'Backend & API Development'
    ];
    
    for (const category of skillCategories) {
      await expect(page.getByText(category)).toBeVisible();
    }
  });

  test('should display highlights section', async () => {
    await gotoHome();
    const highlightsSection = page.locator('#highlights');
    await highlightsSection.scrollIntoViewIfNeeded();
    
    // Check for feature cards
    const featureCards = page.locator('.feature-card');
    await expect(featureCards).toHaveCount(3);
    
    // Check first feature card structure
    const firstCard = featureCards.first();
    await expect(firstCard.locator('.feature-stat')).toBeVisible();
    await expect(firstCard.locator('h3')).toBeVisible();
    await expect(firstCard.locator('p')).toBeVisible();
  });

  test('should be responsive on mobile', async () => {
    await gotoHome();
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that navigation is still accessible
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    
    // Check that site header is still visible
    const header = page.getByTestId('site-header');
    await expect(header).toBeVisible();
    // Restore desktop viewport for subsequent tests
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should have proper accessibility', async () => {
    await gotoHome();
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Check for proper link text
    const links = page.locator('a');
    const linkCount = await links.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const linkText = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      expect(linkText || ariaLabel).toBeTruthy();
    }
  });

  test('should have multiple ways to contact', async () => {
    await gotoHome();
    // Header contact button
    const headerContact = page.getByRole('link', { name: "Let's Talk" });
    await expect(headerContact).toBeVisible();
    
    // Hero section contact buttons
    const heroStartConversation = page.getByRole('link', { name: 'Start a Conversation' });
    await expect(heroStartConversation).toBeVisible();
    
    // Contact section
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    
    const emailButton = page.getByRole('link', { name: 'Email Alper' });
    await expect(emailButton).toBeVisible();
    await expect(emailButton).toHaveAttribute('href', /mailto:ozkanalpi@yahoo\.com/);
  });

  test('should verify resume download buttons exist in multiple locations', async () => {
    await gotoHome();
    // Hero section download button
    const heroDownloadButton = page.getByTestId('hero-download-resume-button');
    await expect(heroDownloadButton).toBeVisible();
    await expect(heroDownloadButton).toHaveAttribute('download', '');
    
    // Contact section download button
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    
    const contactDownloadButton = page.getByTestId('contact-download-resume-button');
    await expect(contactDownloadButton).toBeVisible();
    await expect(contactDownloadButton).toHaveAttribute('download', '');
  });
});
