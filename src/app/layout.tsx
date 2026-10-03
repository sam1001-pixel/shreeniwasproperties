import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { PropertyAlertModal } from '@/components/shared/property-alert-modal';
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
    default: 'Shreeniwas Properties | Premium Real Estate in Rajasthan',
    template: `%s | Shreeniwas Properties`,
  },
  description: siteConfig?.description || 'Premium Real Estate services across Rajasthan.',
  metadataBase: new URL(siteConfig?.url || 'https://shreeniwasproperties.com'),
};

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
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <PropertyAlertModal />
      </body>
    </html>
  );
}
