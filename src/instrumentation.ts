import * as Sentry from '@sentry/nextjs';

export async function register() {
  console.log('📊 Instrumentation register() called');

  // Initialize Sentry in production if DSN is available
  if (process.env.SENTRY_DSN && process.env.NODE_ENV === 'production') {
    console.log('📊 Initializing Sentry...');
    try {
      if (process.env.NEXT_RUNTIME === 'nodejs') {
        await import('../sentry.server.config');
      } else if (process.env.NEXT_RUNTIME === 'edge') {
        await import('../sentry.edge.config');
      }
      console.log('✅ Sentry ready');
    } catch (error) {
      console.error('❌ Sentry init failed:', error);
    }
  }
}

export const onRequestError = Sentry.captureRequestError;
