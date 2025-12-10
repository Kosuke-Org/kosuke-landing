// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { setupSentryWithConsent } from '@/lib/analytics';
import * as Sentry from '@sentry/nextjs';

// Setup Sentry with Cookiebot consent integration
setupSentryWithConsent();

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
