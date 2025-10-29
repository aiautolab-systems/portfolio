/**
 * Test configuration helpers
 */

/**
 * Get the base URL for tests based on environment
 */
export function getBaseUrl(): string {
  if (process.env.CI) {
    // In CI, we serve the built app at /portfolio/ path
    return 'http://localhost:5173/portfolio/';
  } else {
    // Local development uses dev server at root
    return 'http://localhost:5173';
  }
}

/**
 * Navigate to the home page
 */
export function getHomeUrl(): string {
  return getBaseUrl();
}

/**
 * Navigate to a specific section (e.g., #skills, #experience)
 */
export function getSectionUrl(section: string): string {
  return `${getBaseUrl()}#${section}`;
}