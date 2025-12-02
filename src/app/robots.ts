import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kosuke.ai';

export default function robots(): MetadataRoute.Robots {
  // Set NEXT_PUBLIC_ENABLE_INDEXING=true in production environment only
  const enableIndexing = process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true';

  if (!enableIndexing) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
