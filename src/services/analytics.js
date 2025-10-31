const API_BASE_URL = 'https://portfolio-analytics-api-production.up.railway.app/api/analytics';

class AnalyticsService {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getUserId() {
    let userId = localStorage.getItem('portfolio_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('portfolio_user_id', userId);
    }
    return userId;
  }

  async track(eventType, eventData = {}) {
    try {
      const payload = {
        eventType,
        page: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
        userId: this.userId,
        ...eventData
      };

      const response = await fetch(`${API_BASE_URL}/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.warn('Analytics tracking failed:', response.statusText);
      }
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  }

  async getStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Failed to fetch analytics stats:', error);
    }
    return null;
  }

  // Convenience methods for common events
  trackPageView(page = window.location.pathname) {
    this.track('page_view', { page });
  }

  trackClick(element, label) {
    this.track('click', { element, label });
  }

  trackEmailClick() {
    this.track('email_click');
  }

  trackPhoneClick() {
    this.track('phone_click');
  }

  trackResumeDownload() {
    this.track('resume_download');
  }

  trackLinkedInClick() {
    this.track('linkedin_click');
  }

  trackSectionView(section) {
    this.track('section_view', { section });
  }
}

export const analytics = new AnalyticsService();
export default AnalyticsService;