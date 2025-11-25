import { test, expect, Page } from '@playwright/test';
import { getHomeUrl } from '../helpers/config';

/**
 * Industry Peer Persona Tests
 * Professional networking, knowledge sharing, and technical collaboration focus
 */
test.describe('Portfolio - Industry Peer Persona (David Kumar)', () => {
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

  test('should facilitate professional networking and connection', async () => {
    await gotoHome();
    // LinkedIn should be prominently accessible for professional networking
    const linkedinLink = page.getByRole('link', { name: 'Connect' });
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ozkan-alpi/');
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    
    // Contact panel should also have LinkedIn
    const contactPanel = page.locator('.hero-panel .contact-card');
    await expect(contactPanel).toContainText('LinkedIn');
    
    // Professional email for collaboration
    const emailLink = page.getByRole('link', { name: 'ozkanalpi@yahoo.com' });
    await expect(emailLink).toBeVisible();
  });

  test('should showcase technical depth for peer evaluation', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Skills' }).click();
    
    // Advanced testing frameworks that peers would recognize
    await expect(page.getByText('Playwright').first()).toBeVisible();
    await expect(page.getByText('Cypress').first()).toBeVisible();
    await expect(page.getByText('Selenium WebDriver').first()).toBeVisible();
    await expect(page.getByText('REST Assured').first()).toBeVisible();
    
    // Programming depth across multiple languages
    await expect(page.getByText('TypeScript').first()).toBeVisible();
    await expect(page.getByText('JavaScript').first()).toBeVisible();
    await expect(page.getByText('Java').first()).toBeVisible();
    await expect(page.getByText('Python').first()).toBeVisible();
    await expect(page.getByText('C#').first()).toBeVisible();
    
    // Cutting-edge technologies that show innovation
    await expect(page.getByText('AI/GenAI Testing Agents').first()).toBeVisible();
    await expect(page.getByText('Kubernetes').first()).toBeVisible();
    await expect(page.getByText('Terraform').first()).toBeVisible();
  });

  test('should demonstrate thought leadership and innovation in QE', async () => {
    await gotoHome();
    // Check for advanced concepts and methodologies
    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page.getByText('Shift-left Testing')).toBeVisible();
    await expect(page.getByText('AI/GenAI Testing Agents')).toBeVisible();
    
    // Experience should show innovation
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page.getByText('LLM-driven testing agents')).toBeVisible();
    await expect(page.getByText('auto-generate scenarios')).toBeVisible();
    await expect(page.getByText('heal flaky tests')).toBeVisible();
    
    // Highlights should show industry-leading practices
    await page.getByRole('link', { name: 'Highlights' }).click();
    await expect(page.getByText('AI-Enhanced Automation')).toBeVisible();
    await expect(page.getByText('self-healing')).toBeVisible();
    await expect(page.getByText('predictive QE systems')).toBeVisible();
  });

  test('should show comprehensive experience across testing disciplines', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Experience' }).click();
    
    // Full-stack testing experience
    await expect(page.getByText('web, API, and mobile platforms')).toBeVisible();
    await expect(page.getByText('UI automations')).toBeVisible();
    await expect(page.getByText('unit tests')).toBeVisible();
    await expect(page.getByText('E2E tests')).toBeVisible();
    await expect(page.getByText('API tests')).toBeVisible();
    
    // Different testing approaches
    await expect(page.getByText('BDD frameworks')).toBeVisible();
    await expect(page.getByText('data-driven suites')).toBeVisible();
    await expect(page.getByText('component and API testing')).toBeVisible();
    
    // Industry diversity
    await expect(page.getByText('insurance, gaming, and SaaS')).toBeVisible();
  });

  test('should validate industry certifications and continuous learning', async () => {
    await gotoHome();
    // Navigate to credentials section
    await page.locator('.credentials').scrollIntoViewIfNeeded();
    
    // ISTQB - industry standard certification
    const istqbLink = page.locator('a.badge-chip').filter({ hasText: 'ISTQB Certified Tester' });
    await expect(istqbLink).toBeVisible();
    await expect(istqbLink).toHaveAttribute('href', /atsqa\.org/);
    await expect(istqbLink).toHaveAttribute('target', '_blank');
    
    // Modern cloud-native certification
    const k8sLink = page.locator('a.badge-chip').filter({ hasText: 'Kubernetes and Cloud Native Essentials' });
    await expect(k8sLink).toBeVisible();
    await expect(k8sLink).toHaveAttribute('href', /linuxfoundation\.org/);
    await expect(k8sLink).toHaveAttribute('target', '_blank');
  });

  test('should demonstrate mentorship and knowledge sharing capabilities', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Experience' }).click();
    
    // Current leadership and mentoring role
    await expect(page.getByText('Mentoring engineers on component and API testing')).toBeVisible();
    await expect(page.getByText('prevent defects earlier in the lifecycle')).toBeVisible();
    
    // Knowledge sharing through documentation and processes
    await expect(page.getByText('data-backed release decisions')).toBeVisible();
    
    // Collaboration experience
    await expect(page.getByText('Partnered with developers')).toBeVisible();
  });

  test('should show alignment with modern DevOps and cloud practices', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Skills' }).click();

    // Modern DevOps tools
    await expect(page.getByTestId('skill-category-devops---cloud-infrastructure').getByText('Azure DevOps')).toBeVisible();
    await expect(page.getByText('Jenkins').first()).toBeVisible();
    await expect(page.getByText('GitHub Actions').first()).toBeVisible();
    
    // Cloud platforms
    await expect(page.getByText('AWS (EC2, S3, Lambda)')).toBeVisible();
    
    // Container and orchestration
    await expect(page.getByText('Docker').first()).toBeVisible();
    await expect(page.getByText('Kubernetes').first()).toBeVisible();
    
    // Infrastructure as Code
    await expect(page.getByText('Terraform').first()).toBeVisible();
    
    // Experience section should show practical application
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page.getByText('Azure Pipelines and GitHub Actions')).toBeVisible();
    await expect(page.getByText('CI workflows on AWS EC2')).toBeVisible();
  });

  test('should display measurable contributions to quality engineering field', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Highlights' }).click();
    
    // Quantified improvements that peers can relate to
    await expect(page.getByText('40% less manual effort')).toBeVisible();
    await expect(page.getByText('Deployment time -50%')).toBeVisible();
    
    // Experience with specific metrics
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page.getByText('1000+ UI automations')).toBeVisible();
    await expect(page.getByText('2000+ unit tests and 500+ E2E tests')).toBeVisible();
    await expect(page.getByText('coverage from 60% to 85%')).toBeVisible();
    await expect(page.getByText('reducing production bugs by 30%')).toBeVisible();
  });

  test('should show progression and career growth in testing field', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Experience' }).click();
    
    // Career progression from individual contributor to lead
    // Current lead role
    await expect(page.getByTestId('experience-section').getByRole('heading', { name: 'Lead Software Development Engineer in Test', level: 3 })).toBeVisible();
    await expect(page.getByText('Sep 2024 – Present').first()).toBeVisible();
    
    // Previous senior role
    await expect(page.getByTestId('experience-section').getByRole('heading', { name: 'Software Development Engineer in Test II', level: 3 })).toBeVisible();
    await expect(page.getByText('Apr 2023 – Sep 2024')).toBeVisible();
    
    // Earlier individual contributor role
    await expect(page.getByText('Aug 2019 – Apr 2023')).toBeVisible();
    
    // Starting role
    await expect(page.getByRole('heading', { name: 'QA Automation Engineer', level: 3 })).toBeVisible();
    await expect(page.getByText('Jan 2018 – Aug 2020')).toBeVisible();
  });

  test('should enable technical discussions and collaboration opportunities', async () => {
    await gotoHome();
    // Professional tagline should invite technical discussion
    await expect(page.getByText('AI-powered test automation frameworks')).toBeVisible();
    await expect(page.getByText('intelligent quality gates')).toBeVisible();
    await expect(page.getByText('self-healing, predictive QE systems')).toBeVisible();
    
    // Contact information should be easily accessible
    const emailLink = page.getByRole('link', { name: 'ozkanalpi@yahoo.com' });
    await expect(emailLink).toBeVisible();
    
    // LinkedIn for professional networking
    const linkedinLink = page.getByRole('link', { name: 'Connect' });
    await expect(linkedinLink).toBeVisible();
  });

  test('should demonstrate understanding of industry challenges and solutions', async () => {
    await gotoHome();
    // Profile should show industry understanding
    await expect(page.getByText('shift-left strategies')).toBeVisible();
    await expect(page.getByText('instrumenting CI/CD pipelines')).toBeVisible();
    await expect(page.getByText('pairing AI/GenAI tooling with classic automation')).toBeVisible();
    
    // Experience should address common industry problems
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page.getByText('prevent defects earlier')).toBeVisible();
    await expect(page.getByText('accelerate root-cause resolution')).toBeVisible();
    await expect(page.getByText('keeping releases on track')).toBeVisible();
    
    // Solutions should be modern and forward-thinking
    await expect(page.getByText('self-heal scripts')).toBeVisible();
    await expect(page.getByText('data-backed release decisions')).toBeVisible();
  });
});
