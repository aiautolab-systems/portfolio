import { test, expect, Page } from '@playwright/test';
import { getHomeUrl } from '../helpers/config';

/**
 * Technical Lead Persona Tests
 * Deep-dive into technical skills, architecture experience, and leadership capabilities
 */
test.describe('Portfolio - Technical Lead Persona (Marcus Rodriguez)', () => {
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

  test('should demonstrate comprehensive technical stack knowledge', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Skills' }).click();
    
    // Verify modern programming languages
    await expect(page.locator('#skills')).toContainText('TypeScript');
    await expect(page.locator('#skills')).toContainText('JavaScript');
    await expect(page.locator('#skills')).toContainText('Java');
    await expect(page.locator('#skills')).toContainText('Python');
    await expect(page.locator('#skills')).toContainText('C#');
    
    // Modern testing frameworks
    await expect(page.locator('#skills')).toContainText('Playwright');
    await expect(page.locator('#skills')).toContainText('Cypress');
    await expect(page.locator('#skills')).toContainText('Selenium WebDriver');
    await expect(page.locator('#skills')).toContainText('REST Assured');
    await expect(page.locator('#skills')).toContainText('Appium');
    
    // DevOps and Cloud expertise
    await expect(page.locator('#skills')).toContainText('Azure DevOps');
    await expect(page.locator('#skills')).toContainText('Jenkins');
    await expect(page.locator('#skills')).toContainText('GitHub Actions');
    await expect(page.locator('#skills')).toContainText('AWS');
    await expect(page.locator('#skills')).toContainText('Docker');
    await expect(page.locator('#skills')).toContainText('Kubernetes');
    
    // Advanced observability and AI integration
    await expect(page.locator('#skills')).toContainText('Grafana');
    await expect(page.locator('#skills')).toContainText('AI/GenAI Testing Agents');
    await expect(page.locator('#skills')).toContainText('Shift-left Testing');
  });

  test('should show progressive technical leadership experience', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Experience' }).click();
    
    const experienceCards = page.locator('.experience-card');
    
    // Current Lead role should demonstrate leadership
    const currentRole = experienceCards.first();
    await expect(currentRole).toContainText('Lead Software Development Engineer in Test');
    await expect(currentRole).toContainText('Mentoring engineers on component and API testing');
    await expect(currentRole).toContainText('Orchestrating CI/CD quality gates');
    await expect(currentRole).toContainText('LLM-driven testing agents');
    
    // Previous roles should show technical depth
    const derivcoRole = experienceCards.nth(1);
    await expect(derivcoRole).toContainText('1000+ UI automations');
    await expect(derivcoRole).toContainText('2000+ unit tests and 500+ E2E tests');
    await expect(derivcoRole).toContainText('coverage from 60% to 85%');
    await expect(derivcoRole).toContainText('100+ API tests');
    
    // Early roles show foundational experience
    const heliotecaRole = experienceCards.nth(2);
    await expect(heliotecaRole).toContainText('Java-based BDD frameworks');
    await expect(heliotecaRole).toContainText('Selenium, REST Assured, and JDBC');
  });

  test('should validate quantified technical achievements', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Highlights' }).click();
    
    // Technical achievements should be specific and measurable
    const highlights = page.locator('#highlights');
    
    // AI and automation achievements
    await expect(highlights).toContainText('40% less manual effort');
    await expect(highlights).toContainText('AI and LLM-powered testing agents');
    await expect(highlights).toContainText('self-heal scripts');
    await expect(highlights).toContainText('accelerate root-cause discovery');
    
    // CI/CD and DevOps impact
    await expect(highlights).toContainText('Deployment time -50%');
    await expect(highlights).toContainText('Azure DevOps and Jenkins pipelines');
    await expect(highlights).toContainText('streamlining promotion across environments');
    
    // Observability and analytics
    await expect(highlights).toContainText('KPIs in real time');
    await expect(highlights).toContainText('Grafana dashboards');
    await expect(highlights).toContainText('QE trends, release risk, and coverage health');
  });

  test('should demonstrate architecture and system design thinking', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Experience' }).click();
    
    // Look for architectural and system-level contributions
    const experienceSection = page.locator('#experience');
    
    // Framework and infrastructure work
    await expect(experienceSection).toContainText('BDD frameworks');
    await expect(experienceSection).toContainText('CI/CD quality gates');
    await expect(experienceSection).toContainText('Azure Pipelines');
    
    // Scalability and efficiency improvements
    await expect(experienceSection).toContainText('regression automation');
    await expect(experienceSection).toContainText('halve deployment time');
    await expect(experienceSection).toContainText('increase release cadence by 40%');
    
    // Advanced technical implementations
    await expect(experienceSection).toContainText('SonarQube');
    await expect(experienceSection).toContainText('database optimizations');
    await expect(experienceSection).toContainText('AWS EC2 with Jenkins');
  });

  test('should show cross-platform and full-stack testing capabilities', async () => {
    await gotoHome();
    // Check skills for full-stack capabilities
    await page.getByRole('link', { name: 'Skills' }).click();
    
    // Web testing
    await expect(page.locator('#skills')).toContainText('Selenium WebDriver');
    await expect(page.locator('#skills')).toContainText('Cypress');
    await expect(page.locator('#skills')).toContainText('Playwright');
    
    // API testing
    await expect(page.locator('#skills')).toContainText('REST Assured');
    await expect(page.locator('#skills')).toContainText('Postman');
    
    // Mobile testing
    await expect(page.locator('#skills')).toContainText('Appium');
    
    // Database testing
    await expect(page.locator('#skills')).toContainText('SQL');
    
    // Check experience section for cross-platform work
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page.locator('#experience')).toContainText('web and API testing');
    await expect(page.locator('#experience')).toContainText('UI automations');
    await expect(page.locator('#experience')).toContainText('API tests');
    await expect(page.locator('#experience')).toContainText('unit tests');
    await expect(page.locator('#experience')).toContainText('E2E tests');
  });

  test('should demonstrate modern DevOps and cloud-native practices', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Skills' }).click();
    
    // Modern cloud platforms
    await expect(page.locator('#skills')).toContainText('AWS (EC2, S3, Lambda)');
    await expect(page.locator('#skills')).toContainText('Azure DevOps');
    
    // Container and orchestration
    await expect(page.locator('#skills')).toContainText('Docker');
    await expect(page.locator('#skills')).toContainText('Kubernetes');
    await expect(page.locator('#skills')).toContainText('Terraform');
    
    // CI/CD pipelines
    await expect(page.locator('#skills')).toContainText('Jenkins');
    await expect(page.locator('#skills')).toContainText('GitHub Actions');
    
    // Check experience for practical application
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page.locator('#experience')).toContainText('Azure Pipelines and GitHub Actions');
    await expect(page.locator('#experience')).toContainText('Azure DevOps pipelines');
    await expect(page.locator('#experience')).toContainText('CI workflows on AWS EC2');
  });

  test('should show quality engineering innovation and AI integration', async () => {
    await gotoHome();
    // Check for cutting-edge QE practices
    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page.locator('#skills')).toContainText('AI/GenAI Testing Agents');
    await expect(page.locator('#skills')).toContainText('Shift-left Testing');
    
    // Verify real implementation experience
    await page.getByRole('link', { name: 'Experience' }).click();
    const currentRole = page.locator('.experience-card').first();
    await expect(currentRole).toContainText('LLM-driven testing agents');
    await expect(currentRole).toContainText('auto-generate scenarios');
    await expect(currentRole).toContainText('heal flaky tests');
    
    // Check highlights for innovation impact
    await page.getByRole('link', { name: 'Highlights' }).click();
    await expect(page.locator('#highlights')).toContainText('AI-Enhanced Automation');
    await expect(page.locator('#highlights')).toContainText('expand scenario generation');
    await expect(page.locator('#highlights')).toContainText('self-heal scripts');
  });

  test('should validate professional certifications and continuous learning', async () => {
    await gotoHome();
    // Navigate to credentials
    await page.locator('.credentials').scrollIntoViewIfNeeded();
    
    // Industry-standard testing certification
    const istqbLink = page.getByRole('link', { name: /ISTQB Certified Tester/ });
    await expect(istqbLink).toBeVisible();
    
    // Modern cloud-native certification
    const k8sLink = page.getByRole('link', { name: /Kubernetes and Cloud Native/ });
    await expect(k8sLink).toBeVisible();
    
    // Verify links are functional for validation
    await expect(istqbLink).toHaveAttribute('href', /atsqa\.org/);
    await expect(k8sLink).toHaveAttribute('href', /linuxfoundation\.org/);
  });

  test('should demonstrate team leadership and mentoring capabilities', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Experience' }).click();
    
    // Current leadership role
    const currentRole = page.locator('.experience-card').first();
    await expect(currentRole).toContainText('Leading regression automation initiatives');
    await expect(currentRole).toContainText('Mentoring engineers');
    
    // Process improvement and strategic thinking
    await expect(currentRole).toContainText('prevent defects earlier in the lifecycle');
    await expect(currentRole).toContainText('data-backed release decisions');
    
    // Cross-functional collaboration
    const gramreadRole = page.locator('.experience-card').nth(3);
    await expect(gramreadRole).toContainText('Partnered with developers through Jira');
    
    // Team process improvements
    await expect(gramreadRole).toContainText('keeping releases on track');
  });
});
