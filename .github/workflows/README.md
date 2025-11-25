# GitHub Actions Workflows

## Scheduled Production Tests

The `scheduled-production-tests.yml` workflow automatically tests your live portfolio every morning.

### Schedule
- **Default:** Every day at 8:00 AM UTC
- **Timezone Conversion Examples:**
  - 8:00 AM UTC = 3:00 AM EST (New York)
  - 8:00 AM UTC = 12:00 AM PST (Los Angeles)

### Customizing the Schedule

Edit the cron expression in `.github/workflows/scheduled-production-tests.yml`:

```yaml
schedule:
  - cron: '0 8 * * *'  # Format: minute hour day month weekday
```

**Common Schedule Examples:**
```yaml
# Every morning at 6 AM UTC
- cron: '0 6 * * *'

# Every morning at 9 AM UTC, Monday-Friday only
- cron: '0 9 * * 1-5'

# Twice daily: 8 AM and 8 PM UTC
- cron: '0 8,20 * * *'

# Every 6 hours
- cron: '0 */6 * * *'
```

### Manual Testing

You can manually trigger the production tests:
1. Go to **Actions** tab in GitHub
2. Select **Scheduled Production Tests**
3. Click **Run workflow**

### What Happens When Tests Fail

When production tests fail, the workflow automatically:
1. ✅ Uploads test reports and screenshots as artifacts
2. ✅ Creates a GitHub Issue with failure details
3. ✅ Labels the issue as `production-tests`, `automated`, `bug`

### Test Environment

- **Production URL:** https://aiautolab-systems.github.io/portfolio/
- **Tests Run:** All E2E tests (89 tests)
- **Browser:** Chromium
- **Retention:** Test artifacts kept for 30 days

### Local Testing Against Production

To run tests locally against production:

```bash
PRODUCTION=true npm run test:e2e
```
