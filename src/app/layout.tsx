import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ReactNode } from 'react';
import './globals.css';

import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import Providers from './providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kosuke.ai';
const ogImage = `${baseUrl}/opengraph-image.jpg`;
const ogImageSquare = `${baseUrl}/opengraph-image-square.jpg`;

// Set NEXT_PUBLIC_ENABLE_INDEXING=true in production environment only
const enableIndexing = process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true';

const title = 'Kosuke | Your Tech Partner as a Service';
const description =
  'Lean software development workforce for your startup to ship without coding. Launch, iterate, and scale quickly and affordably!';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'technical cofounder',
    'mvp development',
    'software development',
    'production-ready software',
    'ai-powered development',
    'vibe coding',
    'tech partner',
    'startup cofounder',
    'startup technical partner',
    'no-code development',
    'development outsourcing',
    'startup engineering team',
    'digital product development',
    'saas development',
    'product engineering',
    'full-stack development',
    'development for startups',
    'devops for startups',
  ],
  authors: [{ name: 'Kosuke Team' }],
  creator: 'Kosuke',
  publisher: 'Kosuke',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Kosuke',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Kosuke | Your Tech Partner as a Service',
      },
      {
        url: ogImageSquare,
        width: 500,
        height: 500,
        alt: 'Kosuke | Your Tech Partner as a Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon.svg',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.ico',
    },
  ],
  robots: {
    index: enableIndexing,
    follow: enableIndexing,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} dark antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground overflow-x-hidden font-sans">
        {process.env.NEXT_PUBLIC_COOKIEBOT_ENABLED !== 'false' && (
          <Script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="1d49650b-72ce-410d-b236-90f662688b3d"
            data-blockingmode="auto"
            strategy="beforeInteractive"
          />
        )}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_ENABLED !== 'false' && (
          <Script
            id="plausible"
            data-domain="kosuke.ai"
            data-cookiebot-accept="marketing"
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <Providers>
          <div className="flex flex-col min-h-dvh">
            <ErrorBoundary>
              <main className="flex-1">{children}</main>
            </ErrorBoundary>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
