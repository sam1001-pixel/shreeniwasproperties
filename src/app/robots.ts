import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shreeniwasproperties.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/dashboard/admin',
          '/api/*',
        ],
      },
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/dashboard/admin',
          '/api/*',
        ],
      },
      {
        userAgent: [
          'GPTBot',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Bytespider',
          'Applebot-Extended'
        ],
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/dashboard/admin',
          '/api/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
