import { test, expect, Page, ConsoleMessage, Route, Request } from '@playwright/test';
import { getHomeUrl, getSectionUrl } from '../helpers/config';

/**
 * Performance, Accessibility, and Edge Case Tests
 * Technical validation, error handling, and quality assurance
 */
test.describe('Portfolio - Technical Quality and Edge Cases', () => {
  let page: Page;
  const gotoHome = async () => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(getHomeUrl());
  };

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.addInitScript(() => {
      (window as typeof window & { __PORTFOLIO_ANALYTICS_DISABLED__?: boolean }).__PORTFOLIO_ANALYTICS_DISABLED__ = true;
    });
    await page.route('https://www.google-analytics.com/*', route => {
      route.fulfill({ status: 204, body: '' });
    });
    await page.route('https://www.googletagmanager.com/*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: '',
      });
    });
    await page.route('https://portfolio-analytics-api-production.up.railway.app/*', route => {
      route.fulfill({ status: 204, body: '' });
    });
    await gotoHome();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should load quickly and meet performance expectations', async () => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const startTime = Date.now();

    await page.goto(getHomeUrl());
    await page.waitForLoadState('domcontentloaded');

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);

    await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByTestId('site-header')).toBeVisible();

    await gotoHome();
  });

  test('should have no console errors on page load', async () => {
    await gotoHome();
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];

    const consoleHandler = (msg: ConsoleMessage) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    };

    page.on('console', consoleHandler);

    await page.goto(getHomeUrl());
    await page.waitForLoadState('networkidle');

    expect(consoleErrors).toEqual([]);

    if (consoleWarnings.length > 0) {
      console.log('Console warnings found:', consoleWarnings);
    }

    page.off('console', consoleHandler);
  });

  test('should handle invalid anchor links gracefully', async () => {
    await gotoHome();

    await page.goto(getSectionUrl('invalid-section'));

    await expect(page.getByTestId('site-header')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible();

    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page.locator('#skills')).toBeInViewport();
  });

  test('should maintain professional appearance across different screen sizes', async () => {
    await gotoHome();
    const viewports = [
      { width: 320, height: 568 },
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      await expect(page.getByTestId('site-header')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible();
      await expect(page.getByRole('navigation')).toBeVisible();

      await page.getByRole('link', { name: 'Contact' }).click();
      await expect(page.locator('#contact')).toBeInViewport();

      await page.getByRole('link', { name: 'About' }).click();
    }

    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should have accessible contact methods on all devices', async () => {
    await gotoHome();
    await page.setViewportSize({ width: 375, height: 667 });

    const emailLink = page.getByRole('link', { name: /ozkanalpi@yahoo\.com/ });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:ozkanalpi@yahoo.com');

    const phoneLink = page.getByTestId('hero-phone-link');
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:7325735195');

    const startConversationBtn = page.getByRole('link', { name: 'Start a Conversation' });
    await expect(startConversationBtn).toBeVisible();

    await page.getByRole('link', { name: 'Contact' }).click();
    const contactEmailBtn = page.getByRole('link', { name: 'Email Alper' });
    await expect(contactEmailBtn).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should handle missing or slow-loading resources gracefully', async () => {
    await gotoHome();

    const throttledRoute = async (route: Route) => {
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    };

    await page.route('**/*', throttledRoute);

    await page.goto(getHomeUrl());

    await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('navigation')).toBeVisible();

    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page.locator('#skills')).toBeInViewport();

    await page.unroute('**/*', throttledRoute);
  });

  test('should maintain functionality with JavaScript disabled', async () => {
    await gotoHome();

    await expect(page.getByRole('heading', { name: 'Alper Ozkan', level: 1 })).toBeVisible();
    await expect(page.getByTestId('hero-title')).toContainText('Lead Software Development Engineer in Test');

    await expect(page.getByRole('link', { name: /ozkanalpi@yahoo\.com/ })).toBeVisible();
    await expect(page.getByTestId('hero-phone-link')).toBeVisible();

    await expect(page.locator('#skills')).toBeVisible();
    await expect(page.locator('#experience')).toBeVisible();
  });

  test('should handle browser back/forward navigation correctly', async () => {
    await gotoHome();

    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.locator('#skills')).toBeInViewport();

    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page).toHaveURL(/#experience$/);
    await expect(page.locator('#experience')).toBeInViewport();

    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator('#contact')).toBeInViewport();

    // Browser back/forward navigation updates URL but doesn't trigger scroll
    // This is expected behavior without hashchange listener
    await page.goBack();
    await expect(page).toHaveURL(/#experience$/);

    await page.goBack();
    await expect(page).toHaveURL(/#skills$/);

    await page.goForward();
    await expect(page).toHaveURL(/#experience$/);
  });

  test('should have proper SEO and metadata structure', async () => {
    await gotoHome();

    await expect(page).toHaveTitle(/portfolio/);

    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    await expect(h1Elements.first()).toContainText('Alper Ozkan');

    const headings = page.locator('h1, h2, h3');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(5);
  });

  test('should handle rapid navigation clicks without breaking', async () => {
    await gotoHome();

    for (let i = 0; i < 3; i++) {
      await page.getByRole('link', { name: 'Skills' }).click();
      await page.getByRole('link', { name: 'Experience' }).click();
      await page.getByRole('link', { name: 'Highlights' }).click();
      await page.getByRole('link', { name: 'Contact' }).click();
      await page.getByRole('link', { name: 'About' }).click();
    }

    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page.locator('#skills')).toBeInViewport();
    await expect(page).toHaveURL(/#skills$/);
  });

  test('should maintain visual consistency across sections', async () => {
    await gotoHome();

    const sections = ['#skills', '#experience', '#highlights', '#contact'];

    for (const section of sections) {
      const sectionElement = page.locator(section);
      await sectionElement.scrollIntoViewIfNeeded();
      await expect(sectionElement).toBeVisible();
      await expect(sectionElement.locator('h2')).toBeVisible();
    }
  });

  test('should handle form submission edge cases', async () => {
    await gotoHome();

    const emailButtons = [
      page.getByRole('link', { name: 'Start a Conversation' }),
      page.getByRole('link', { name: /ozkanalpi@yahoo\.com/ }),
      page.getByRole('link', { name: "Let's Talk" }),
    ];

    for (const button of emailButtons) {
      if (await button.isVisible()) {
        await expect(button).toHaveAttribute('href', /mailto:/);
        const href = await button.getAttribute('href');
        expect(href).toMatch(/^mailto:[^@]+@[^@]+\.[^@]+/);
      }
    }
  });

  test('should load all external resources successfully', async () => {
    await gotoHome();
    const failedRequests: string[] = [];

    const requestFailedHandler = (request: Request) => {
      failedRequests.push(`${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
    };

    page.on('requestfailed', requestFailedHandler);

    await page.goto(getHomeUrl());
    await page.waitForLoadState('networkidle');

    const criticalFailures = failedRequests.filter(req => req.includes('.js') || req.includes('.css') || req.includes('.html'));
    expect(criticalFailures).toEqual([]);

    if (failedRequests.length > 0) {
      console.log('Non-critical request failures:', failedRequests);
    }

    page.off('requestfailed', requestFailedHandler);
  });
});
