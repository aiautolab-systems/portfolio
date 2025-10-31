import { useEffect, useCallback } from 'react';
import { analytics } from '../services/analytics';

export function useAnalytics() {
  // Track page view on mount
  useEffect(() => {
    analytics.trackPageView();
  }, []);

  // Section intersection observer for tracking section views
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id;
            if (sectionId) {
              analytics.trackSectionView(sectionId);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections with IDs
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Tracking functions
  const trackClick = useCallback((element, label) => {
    analytics.trackClick(element, label);
  }, []);

  const trackEmailClick = useCallback(() => {
    analytics.trackEmailClick();
  }, []);

  const trackPhoneClick = useCallback(() => {
    analytics.trackPhoneClick();
  }, []);

  const trackResumeDownload = useCallback(() => {
    analytics.trackResumeDownload();
  }, []);

  const trackLinkedInClick = useCallback(() => {
    analytics.trackLinkedInClick();
  }, []);

  const trackCustomEvent = useCallback((eventType, eventData) => {
    analytics.track(eventType, eventData);
  }, []);

  return {
    trackClick,
    trackEmailClick,
    trackPhoneClick,
    trackResumeDownload,
    trackLinkedInClick,
    trackCustomEvent,
  };
}

export default useAnalytics;