import { test, expect, Page } from '@playwright/test';

/**
 * Portfolio Page - Corrected Tests Based on Actual HTML Structure
 */
test.describe('Portfolio Page - Core Functionality (Corrected)', () => {
  let page: Page;
  const gotoHome = async () => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
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
    await expect(page).toHaveTitle(/portfolio/);
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByText('Alper Ozkan').first()).toBeVisible();
    await expect(page.getByTestId('hero-title')).toContainText('Lead Software Development Engineer in Test');
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible();
    const currentYear = new Date().getFullYear();
    await expect(page.getByRole('contentinfo')).toContainText(currentYear.toString());
  });

  test('should navigate correctly to all sections', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.getByText('Tools and platforms I orchestrate')).toBeVisible();

    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page).toHaveURL(/#experience$/);
    await expect(page.getByText('Experience shipping confident releases')).toBeVisible();

    await page.getByRole('link', { name: 'Highlights' }).click();
    await expect(page).toHaveURL(/#highlights$/);
    await expect(page.getByText("Recent outcomes I'm proud to share")).toBeVisible();

    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByText("Let's build confident releases together")).toBeVisible();

    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/#about$/);
    await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible();
  });

  test('should have functional contact methods in hero section', async () => {
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

    const linkedinConnectLink = page.getByRole('link', { name: 'Connect' });
    await expect(linkedinConnectLink).toBeVisible();
    await expect(linkedinConnectLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ozkan-alpi/');
    await expect(linkedinConnectLink).toHaveAttribute('target', '_blank');
  });

  test('should display current role information correctly', async () => {
    await gotoHome();
    await expect(page.getByText('Currently')).toBeVisible();
    await expect(page.getByLabel('Snapshot').getByRole('heading', { name: 'Lead Software Development Engineer in Test', level: 3 })).toBeVisible();
    await expect(page.getByText('Tinubu Square – Insurance').first()).toBeVisible();
    await expect(page.getByText('Sep 2024 – Present').first()).toBeVisible();
  });

  test('should have working header contact link', async () => {
    await gotoHome();
    const headerContactLink = page.getByRole('link', { name: "Let's Talk" });
    await expect(headerContactLink).toBeVisible();
    await expect(headerContactLink).toHaveAttribute('href', 'mailto:ozkanalpi@yahoo.com');
  });

  test('should display skills categories correctly', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page.getByRole('heading', { name: 'Languages & Scripting', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Testing & Automation', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'DevOps & Cloud', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Observability & Quality Ops', level: 3 })).toBeVisible();
    await expect(page.getByText('TypeScript').first()).toBeVisible();
    await expect(page.getByText('Playwright').first()).toBeVisible();
    await expect(page.getByText('Cypress').first()).toBeVisible();
    await expect(page.getByText('AWS (EC2, S3, Lambda)')).toBeVisible();
    await expect(page.getByText('AI/GenAI Testing Agents').first()).toBeVisible();
  });

  test('should display experience timeline with current role first', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page.getByTestId('experience-section').getByText('Tinubu Square – Insurance')).toBeVisible();
    await expect(page.getByTestId('experience-section').getByRole('heading', { name: 'Lead Software Development Engineer in Test', level: 3 })).toBeVisible();
    await expect(page.getByText('Sep 2024 – Present').first()).toBeVisible();
    await expect(page.getByText('Derivco (Betway)').first()).toBeVisible();
    await expect(page.getByTestId('experience-section').getByRole('heading', { name: 'Software Development Engineer in Test II', level: 3 })).toBeVisible();
  });

  test('should display highlights with impact metrics', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Highlights' }).click();
    await expect(page.getByText('40% less manual effort')).toBeVisible();
    await expect(page.getByText('Deployment time -50%')).toBeVisible();
    await expect(page.getByText('KPIs in real time')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI-Enhanced Automation', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Scalable CI/CD Quality Gates', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data-Driven Visibility', level: 3 })).toBeVisible();
  });

  test('should have functional contact section', async () => {
    await gotoHome();
    await page.getByRole('link', { name: 'Contact' }).click();
    const emailButton = page.getByRole('link', { name: 'Email Alper' });
    await expect(emailButton).toBeVisible();
    await expect(emailButton).toHaveAttribute('href', 'mailto:ozkanalpi@yahoo.com');

    const callButton = page.getByRole('link', { name: 'Call 732 573 5195' });
    await expect(callButton).toBeVisible();
    await expect(callButton).toHaveAttribute('href', 'tel:7325735195');
  });

  test('should handle resume download links', async () => {
    await gotoHome();
    const heroResumeBtn = page.getByRole('link', { name: 'Download Resume' }).first();
    await expect(heroResumeBtn).toBeVisible();
    await expect(heroResumeBtn).toHaveAttribute('href', /alper-ozkan-resume\.pdf$/);

    await page.getByRole('link', { name: 'Contact' }).click();
    const contactResumeBtn = page.getByRole('link', { name: 'Download Resume' }).last();
    await expect(contactResumeBtn).toBeVisible();
    await expect(contactResumeBtn).toHaveAttribute('href', /alper-ozkan-resume\.pdf$/);
  });

  test('should display certifications with valid links', async () => {
    await gotoHome();
    await page.getByText('Certifications & training').scrollIntoViewIfNeeded();

    const istqbLink = page.getByRole('link', { name: 'ISTQB Certified Tester' });
    await expect(istqbLink).toBeVisible();
    await expect(istqbLink).toHaveAttribute('href', /atsqa\.org/);
    await expect(istqbLink).toHaveAttribute('target', '_blank');

    const k8sLink = page.getByRole('link', { name: 'Kubernetes and Cloud Native Essentials' });
    await expect(k8sLink).toBeVisible();
    await expect(k8sLink).toHaveAttribute('href', /linuxfoundation\.org/);
    await expect(k8sLink).toHaveAttribute('target', '_blank');
  });

  test('should work correctly with direct URL navigation', async () => {
    await page.goto('/#skills');
    await expect(page.getByText('Tools and platforms I orchestrate')).toBeVisible();

    await page.goto('/#experience');
    await expect(page.getByText('Experience shipping confident releases')).toBeVisible();

    await page.goto('/#contact');
    await expect(page.getByText("Let's build confident releases together")).toBeVisible();
  });

  test('should be responsive on mobile viewport', async () => {
    await gotoHome();
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible();

    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page.getByText("Let's build confident releases together")).toBeVisible();

    const emailButton = page.getByRole('link', { name: 'Email Alper' });
    await expect(emailButton).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 720 });
  });
});

test.describe('Portfolio Page - Hiring Manager Persona (Corrected)', () => {
  let page: Page;
  const gotoHome = async () => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
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
    await expect(heroResumeBtn).toBeVisible();
    await expect(heroResumeBtn).toHaveAttribute('href', /alper-ozkan-resume\.pdf$/);

    await page.getByRole('link', { name: 'Contact' }).click();
    const contactResumeBtn = page.getByRole('link', { name: 'Download Resume' }).last();
    await expect(contactResumeBtn).toBeVisible();
    await expect(contactResumeBtn).toHaveAttribute('href', /alper-ozkan-resume\.pdf$/);
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
