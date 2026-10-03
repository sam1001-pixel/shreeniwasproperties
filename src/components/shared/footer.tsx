import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  const cities = siteConfig?.rajasthanCities?.slice(0, 6) || ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'];
  
  return (
    <footer className="bg-[#0A1628] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-1.5 py-1">
              <span className="text-2xl font-serif font-bold text-[#C9A96E]">
                Shreeniwas
              </span>
              <span className="text-2xl font-semibold text-white">
                Properties
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              {siteConfig?.description || 'Premium real estate services across Rajasthan. Find your dream home or commercial property with us.'}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href={siteConfig?.links?.instagram || '#'} aria-label="Instagram" className="p-2 -ml-2 text-white/70 hover:text-[#C9A96E] transition-colors">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={siteConfig?.links?.facebook || '#'} aria-label="Facebook" className="p-2 text-white/70 hover:text-[#C9A96E] transition-colors">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a href={siteConfig?.links?.youtube || '#'} aria-label="YouTube" className="p-2 text-white/70 hover:text-[#C9A96E] transition-colors">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-1">
              {['Properties', 'Rentals', 'Buy', 'Commercial', 'Blog'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="block py-2 text-base text-white/70 hover:text-[#C9A96E] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Rajasthan Cities */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-white">Locations</h3>
            <ul className="space-y-1">
              {cities.map((city) => (
                <li key={city}>
                  <Link href={`/locations/${city.toLowerCase()}`} className="block py-2 text-base text-white/70 hover:text-[#C9A96E] transition-colors">
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 py-2 text-base text-white/70">
                <Phone className="h-5 w-5 text-[#C9A96E] shrink-0 mt-0.5" />
                <span>{siteConfig?.contact?.phone || '+91 99999 99999'}</span>
              </li>
              <li className="flex items-start gap-3 py-2 text-base text-white/70 break-all">
                <Mail className="h-5 w-5 text-[#C9A96E] shrink-0 mt-0.5" />
                <span>{siteConfig?.contact?.email || 'contact@shreeniwasproperties.com'}</span>
              </li>
              <li className="flex items-start gap-3 py-2 text-base text-white/70">
                <MapPin className="h-5 w-5 text-[#C9A96E] shrink-0 mt-0.5" />
                <span>{siteConfig?.contact?.address || 'Jaipur, Rajasthan, India'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-white/50 text-sm">
            Copyright © {new Date().getFullYear()} Shreeniwas Properties. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            <Link href="/privacy" className="py-2 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="py-2 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
