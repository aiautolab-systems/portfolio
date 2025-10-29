import { test, expect, Page } from '@playwright/test';
import { getHomeUrl } from '../helpers/config';

/**
 * Freelance Client Persona Tests
 * Focused on consulting services, quick engagement, and proven results
 */
test.describe('Portfolio - Freelance Client Persona (Jennifer Walsh)', () => {
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

  test('should clearly communicate consulting availability and services', async () => {
    await gotoHome();
    // Navigate to contact section for engagement information
    await page.getByRole('link', { name: 'Contact' }).click();
    
    // Check for consulting availability messaging
    await expect(page.getByTestId('contact-section')).toContainText("I'm available for");
    await expect(page.getByTestId('contact-section')).toContainText('full-time or consulting engagements');
    await expect(page.getByTestId('contact-section')).toContainText('remote or hybrid');
    
    // Services should be clearly outlined
    await expect(page.getByTestId('contact-section')).toContainText('scale automation, observability, and AI-assisted quality programs');
  });

  test('should provide quick and easy contact methods for fast engagement', async () => {
    await gotoHome();
    // Primary contact should be prominent and professional
    const startConversationBtn = page.getByTestId('hero-start-conversation-button');
    await expect(startConversationBtn).toBeVisible();
    await expect(startConversationBtn).toHaveAttribute('href', /mailto:ozkanalpi@yahoo\.com/);
    
    // Header contact for quick access
    const headerContactLink = page.getByTestId('header-contact-link');
    await expect(headerContactLink).toBeVisible();
    await expect(headerContactLink).toHaveAttribute('href', 'mailto:ozkanalpi@yahoo.com');
    
    // Contact section should have multiple engagement options
    await page.getByTestId('nav-link-contact').click();
    const emailButton = page.getByTestId('contact-email-button');
    await expect(emailButton).toBeVisible();
    
    // Phone for urgent consultations
    const callButton = page.getByRole('link', { name: 'Call 732 573 5195' });
    await expect(callButton).toBeVisible();
  });

  test('should showcase relevant industry experience and ROI', async () => {
    await gotoHome();
    // Check for recent, relevant experience
    await page.getByTestId('nav-link-experience').click();
    
    // Current role shows relevant industry (Insurance)
    const currentRole = page.getByTestId('experience-card').first();
    await expect(currentRole).toContainText('Tinubu Square – Insurance');
    await expect(currentRole).toContainText('Sep 2024 – Present'); // Recent
    
    // Previous experience shows diverse industries
    const derivcoRole = page.getByTestId('experience-card').nth(1);
    await expect(derivcoRole).toContainText('Derivco (Betway)'); // Gaming industry
    
    // Check for cross-industry experience in profile section
    await page.getByTestId('nav-link-about').click();
    const profileSection = page.locator('.profile-summary');
    await expect(profileSection).toContainText('insurance, gaming, and SaaS');
  });

  test('should highlight quick wins and proven results with metrics', async () => {
    await gotoHome();
    await page.getByTestId('nav-link-highlights').click();
    
    // Results should be quantified and business-focused
    const highlights = page.getByTestId('highlights-section');
    
    // Efficiency improvements
    await expect(highlights).toContainText('40% less manual effort');
    await expect(highlights).toContainText('Deployment time -50%');
    
    // Real-time visibility for decision making
    await expect(highlights).toContainText('KPIs in real time');
    await expect(highlights).toContainText('release risk');
    await expect(highlights).toContainText('coverage health for leadership');
    
    // Modern technology implementation
    await expect(highlights).toContainText('AI-Enhanced Automation');
    await expect(highlights).toContainText('Data-Driven Visibility');
  });

  test('should demonstrate cost-effective automation solutions', async () => {
    await gotoHome();
    await page.getByTestId('nav-link-experience').click();
    
    // Look for efficiency and cost-saving achievements
    const experienceCards = page.getByTestId('experience-card');
    
    // Manual testing reduction
    const derivcoRole = experienceCards.nth(1);
    await expect(derivcoRole).toContainText('cutting manual testing time by 40%');
    await expect(derivcoRole).toContainText('halve deployment time');
    await expect(derivcoRole).toContainText('increase release cadence by 40%');
    
    // Quality improvements that reduce costs
    await expect(derivcoRole).toContainText('reducing production bugs by 30%');
    await expect(derivcoRole).toContainText('reduced data-related incidents');
    
    // Process optimizations
    const currentRole = experienceCards.first();
    await expect(currentRole).toContainText('reduce manual effort by 40%');
    await expect(currentRole).toContainText('boost coverage and execution velocity');
  });

  test('should show startup and SMB-relevant technology stack', async () => {
    await gotoHome();
    await page.getByTestId('nav-link-skills').click();
    
    // Modern, cost-effective testing tools
    await expect(page.getByTestId('skills-section')).toContainText('Cypress'); // Popular for startups
    await expect(page.getByTestId('skills-section')).toContainText('Playwright'); // Modern and efficient
    await expect(page.getByTestId('skills-section')).toContainText('JavaScript'); // Widely used
    await expect(page.getByTestId('skills-section')).toContainText('TypeScript'); // Modern JS
    
    // Cloud-native and scalable solutions
    await expect(page.getByTestId('skills-section')).toContainText('GitHub Actions'); // Free for open source
    await expect(page.getByTestId('skills-section')).toContainText('AWS'); // Scalable cloud
    await expect(page.getByTestId('skills-section')).toContainText('Docker'); // DevOps standard
    
    // API testing for microservices
    await expect(page.getByTestId('skills-section')).toContainText('REST Assured');
    await expect(page.getByTestId('skills-section')).toContainText('Postman');
  });

  test('should emphasize quick setup and immediate value delivery', async () => {
    await gotoHome();
    // Check professional summary for value proposition
    const profileSection = page.locator('.profile-summary');
    await expect(profileSection).toContainText('shift-left strategies');
    await expect(profileSection).toContainText('CI/CD pipelines');
    await expect(profileSection).toContainText('coverage, reliability, and analytics');
    
    // Recent achievements show immediate impact potential
    await page.getByRole('link', { name: 'Highlights' }).click();
    await expect(page.locator('#highlights')).toContainText('streamlining promotion across environments');
    await expect(page.locator('#highlights')).toContainText('surface QE trends');
  });

  test('should show flexible engagement and remote work capability', async () => {
    await gotoHome();
    // Location information
    await expect(page.locator('.hero-meta')).toContainText('New Smyrna Beach, FL');
    
    // Contact section mentions flexible arrangements
    await page.getByTestId('nav-link-contact').click();
    await expect(page.getByTestId('contact-section')).toContainText('remote or hybrid');
    
    // Experience shows remote-friendly tools and processes
    await page.getByTestId('nav-link-experience').click();
    await expect(page.getByTestId('experience-section')).toContainText('Azure DevOps');
    await expect(page.getByTestId('experience-section')).toContainText('GitHub Actions');
    await expect(page.getByTestId('experience-section')).toContainText('Jenkins');
  });

  test('should provide credible third-party validation', async () => {
    await gotoHome();
    // Professional certifications add credibility
    await page.locator('.credentials').scrollIntoViewIfNeeded();
    
    const istqbLink = page.getByRole('link', { name: /ISTQB Certified Tester/ });
    await expect(istqbLink).toBeVisible();
    await expect(istqbLink).toHaveAttribute('target', '_blank'); // Verifiable
    
    const k8sLink = page.getByRole('link', { name: /Kubernetes and Cloud Native/ });
    await expect(k8sLink).toBeVisible();
    await expect(k8sLink).toHaveAttribute('target', '_blank'); // Verifiable
    
    // LinkedIn for professional network validation
    const linkedinLink = page.getByRole('link', { name: 'View LinkedIn' });
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ozkan-alpi/');
  });

  test('should work well for mobile consultations and quick reviews', async () => {
    await gotoHome();
    // Set mobile viewport for on-the-go access
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Key information should be immediately visible
    await expect(page.getByTestId('hero-name')).toBeVisible();
    await expect(page.getByTestId('hero-title')).toContainText('Lead Software Development Engineer in Test');
    
    // Contact should be one tap away
    const startConversationBtn = page.getByTestId('hero-start-conversation-button');
    await expect(startConversationBtn).toBeVisible();
    
    // Phone contact for urgent discussions
    const phoneLink = page.getByTestId('hero-phone-link');
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:7325735195');
    
    // Navigation should work smoothly on mobile
    await page.getByTestId('nav-link-highlights').click();
    await expect(page.getByTestId('highlights-section')).toBeInViewport();
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should demonstrate understanding of startup challenges and solutions', async () => {
    await gotoHome();
    // Experience section should show relevant startup-like challenges
    await page.getByTestId('nav-link-experience').click();
    
    // Speed and efficiency focus
    await expect(page.getByTestId('experience-section')).toContainText('boost coverage and execution velocity');
    await expect(page.getByTestId('experience-section')).toContainText('prevent defects earlier');
    await expect(page.getByTestId('experience-section')).toContainText('accelerate root-cause resolution');
    
    // Resource optimization
    await expect(page.getByTestId('experience-section')).toContainText('cutting manual testing time');
    await expect(page.getByTestId('experience-section')).toContainText('halve deployment time');
    await expect(page.getByTestId('experience-section')).toContainText('reduce manual effort');
    
    // Quality at scale
    await expect(page.getByTestId('experience-section')).toContainText('coverage from 60% to 85%');
    await expect(page.getByTestId('experience-section')).toContainText('reducing production bugs');
  });
});
