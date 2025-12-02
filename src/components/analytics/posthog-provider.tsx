'use client';

import { hasAnalyticsConsent, initPostHog, posthog } from '@/lib/analytics/posthog';
import { usePathname, useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import { Suspense, useEffect, useState } from 'react';

interface PostHogProviderProps {
  children: ReactNode;
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !hasAnalyticsConsent()) return;

    let url = window.origin + pathname;
    if (searchParams && searchParams.toString()) {
      url = url + `?${searchParams.toString()}`;
    }

    // Track pageview only if consent given
    // Wait for posthog to be initialized before capturing
    if (posthog?.__loaded) {
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  const [, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if consent already given
    if (hasAnalyticsConsent()) {
      initPostHog();
      setConsentGiven(true);
    }

    // Listen for Cookiebot consent acceptance
    const handleCookiebotAccept = () => {
      if (hasAnalyticsConsent()) {
        initPostHog();
        setConsentGiven(true);
      }
    };

    // Listen for Cookiebot consent decline/withdrawal
    const handleCookiebotDecline = () => {
      if (posthog?.__loaded) {
        posthog.opt_out_capturing();
        setConsentGiven(false);
      }
    };

    window.addEventListener('CookiebotOnAccept', handleCookiebotAccept);
    window.addEventListener('CookiebotOnDecline', handleCookiebotDecline);

    return () => {
      window.removeEventListener('CookiebotOnAccept', handleCookiebotAccept);
      window.removeEventListener('CookiebotOnDecline', handleCookiebotDecline);
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  );
}
