/**
 * Check if Cookiebot has loaded and user has responded to consent dialog
 */
export function isCookiebotReady(): boolean {
  if (typeof window === 'undefined') return false;
  return window.Cookiebot?.hasResponse === true;
}

/**
 * Check if user has given consent for statistics cookies
 * Used for: Sentry error tracking and session replay
 */
export function hasStatisticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  if (!window.Cookiebot?.hasResponse) return false;
  return window.Cookiebot.consent?.statistics === true;
}
