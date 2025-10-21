export const personalInfo = {
  name: 'Alper Ozkan',
  title: 'Lead Software Development Engineer in Test',
  tagline: 'Designing AI-augmented quality engineering programs that keep releases fast, reliable, and observable.',
  location: 'New Smyrna Beach, FL',
  email: 'ozkanalpi@yahoo.com',
  phone: '732 573 5195',
  linkedin: 'https://www.linkedin.com/in/ozkan-alpi/',
  resumeUrl: '/alper-ozkan-resume.pdf',
};

export const summary = `SDET with 8+ years building test automation for web, API, and mobile platforms across insurance, gaming, and SaaS. Experienced in shaping shift-left strategies, instrumenting CI/CD pipelines, and pairing AI/GenAI tooling with classic automation to drive coverage, reliability, and analytics.`;

export const highlights = [
  {
    label: 'AI-Enhanced Automation',
    stat: '40% less manual effort',
    description: 'Designed AI and LLM-powered testing agents that expand scenario generation, self-heal scripts, and accelerate root-cause discovery.',
  },
  {
    label: 'Scalable CI/CD Quality Gates',
    stat: 'Deployment time -50%',
    description: 'Integrated regression, API, and visual suites into Azure DevOps and Jenkins pipelines, streamlining promotion across environments.',
  },
  {
    label: 'Data-Driven Visibility',
    stat: 'KPIs in real time',
    description: 'Built Grafana dashboards and analytics workflows that surface QE trends, release risk, and coverage health for leadership.',
  },
];

export const skills = [
  {
    category: 'Languages & Scripting',
    items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'C#', 'SQL', 'HTML', 'Gherkin'],
  },
  {
    category: 'Testing & Automation',
    items: ['Cypress', 'Playwright', 'Selenium WebDriver', 'REST Assured', 'Appium', 'Cucumber BDD/TDD', 'JUnit/TestNG', 'Postman'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Azure DevOps', 'Jenkins', 'GitHub Actions', 'AWS (EC2, S3, Lambda)', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    category: 'Observability & Quality Ops',
    items: ['Grafana', 'Kibana', 'SonarQube', 'AI/GenAI Testing Agents', 'Mabl', 'Shift-left Testing'],
  },
];

export const experience = [
  {
    company: 'Tinubu Square – Insurance',
    role: 'Lead Software Development Engineer in Test',
    period: 'Sep 2024 – Present',
    bullets: [
      'Leading regression automation initiatives that boost coverage and execution velocity across critical workflows.',
      'Mentoring engineers on component and API testing to prevent defects earlier in the lifecycle.',
      'Orchestrating CI/CD quality gates and embedding suites into Azure Pipelines and GitHub Actions.',
      'Deploying LLM-driven testing agents to auto-generate scenarios, heal flaky tests, and reduce manual effort by 40%.',
      'Instrumenting Grafana dashboards for live QE KPIs, trend analysis, and data-backed release decisions.',
    ],
  },
  {
    company: 'Derivco (Betway)',
    role: 'Software Development Engineer in Test II',
    period: 'Apr 2023 – Sep 2024',
    bullets: [
      'Built and maintained 1000+ UI automations in Cypress and Playwright, cutting manual testing time by 40%.',
      'Authored 2000+ unit tests and 500+ E2E tests that raised coverage from 60% to 85% while reducing production bugs by 30%.',
      'Delivered 100+ API tests with C# HTTP Client and Postman, strengthening service reliability by 35%.',
      'Automated Azure DevOps pipelines to halve deployment time and increase release cadence by 40%.',
      'Introduced SonarQube and database optimizations that improved code quality and reduced data-related incidents.',
    ],
  },
  {
    company: 'Helioteca.com',
    role: 'Software Development Engineer in Test',
    period: 'Aug 2019 – Apr 2023',
    bullets: [
      'Implemented Java-based BDD frameworks with Selenium, REST Assured, and JDBC to support web and API testing.',
      'Crafted reusable page objects, Gherkin scenarios, and data-driven suites aligned with business requirements.',
      'Built CI workflows on AWS EC2 with Jenkins to schedule smoke and regression suites for every release.',
      'Produced rich Cucumber reporting and defect triage workflows to accelerate root-cause resolution.',
    ],
  },
  {
    company: 'Gramread.com',
    role: 'QA Automation Engineer',
    period: 'Jan 2018 – Aug 2020',
    bullets: [
      'Developed Selenium-based UI automation with TestNG and Maven to stabilize regression coverage.',
      'Modeled BDD scenarios in Cucumber and maintained locators for highly dynamic interfaces.',
      'Partnered with developers through Jira to prioritize and verify fixes, keeping releases on track.',
    ],
  },
];

export const certifications = [
  {
    name: 'ISTQB Certified Tester',
  },
  {
    name: 'Kubernetes and Cloud Native Essentials',
  },
];

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#highlights', label: 'Highlights' },
  { href: '#contact', label: 'Contact' },
];
