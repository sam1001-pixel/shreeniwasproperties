import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { PropertyAlertModal } from '@/components/shared/property-alert-modal';
import AiConciergeChatbot from '@/components/shared/ai-concierge-chatbot';
import { SiteSettingsProvider } from '@/lib/settings/site-settings-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: {
    default: 'Shreeniwas Rentals Jodhpur | Verified Rentals & Properties in Rajasthan',
    template: `%s | Shreeniwas Rentals Jodhpur`,
  },
  description: siteConfig?.description || 'Verified rentals, luxury villas, havelis, flats & commercial spaces in Jodhpur and Rajasthan.',
  keywords: [
    'Rentals in Jodhpur', 'Shreeniwas Rentals', 'Properties in Jodhpur', 'Luxury Villas Jodhpur', 
    'Flats in Jodhpur', 'Heritage Haveli Jodhpur', 'RERA Approved Properties', 
    'Rent House Jodhpur', 'Commercial Property Rajasthan'
  ],
  authors: [{ name: 'Shreeniwas Rentals Jodhpur' }],
  creator: 'Shreeniwas Rentals Jodhpur',
  metadataBase: new URL('https://shreeniwasproperties-pi.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo/shreeniwas-logo-icon.png',
    shortcut: '/logo/shreeniwas-logo-icon.png',
    apple: '/logo/shreeniwas-logo-icon.png',
  },
  openGraph: {
    title: 'Shreeniwas Rentals Jodhpur | Verified Rentals & Properties',
    description: 'Find verified luxury villas, rentals, commercial spaces, and heritage properties across Jodhpur and Rajasthan.',
    url: 'https://shreeniwasproperties-pi.vercel.app',
    siteName: 'Shreeniwas Rentals Jodhpur',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Shreeniwas Properties Rajasthan Royal Architecture',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shreeniwas Properties | Rajasthan Real Estate',
    description: 'Luxury villas, penthouses, commercial spaces & heritage havelis across Rajasthan.',
    images: ['https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop'],
    creator: '@shreeniwasprop',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'IN-RJ',
    'geo.placename': 'Jaipur',
    'geo.position': '26.9124;75.7873',
    'ICBM': '26.9124, 75.7873'
  }
};

import SaveToastNotifier from '@/components/shared/save-toast-notifier';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
          inter.variable,
          playfair.variable
        )}
      >
        <SiteSettingsProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <PropertyAlertModal />
          <AiConciergeChatbot />
          <SaveToastNotifier />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
