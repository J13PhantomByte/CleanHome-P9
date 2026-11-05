import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures that page transitions scroll to the top,
 * or smoothly scrolls to the anchor element if an anchor hash (e.g. #layanan) is specified.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element && typeof element.scrollIntoView === 'function') {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      // If element is not rendered yet, retry once after render
      const timer = setTimeout(() => {
        const retryEl = document.getElementById(elementId);
        if (retryEl && typeof retryEl.scrollIntoView === 'function') {
          retryEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        try {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch {
          // fallback for environments with basic scrollTo(x, y)
          window.scrollTo(0, 0);
        }
      }
    }
  }, [pathname, hash]);

  return null;
};
