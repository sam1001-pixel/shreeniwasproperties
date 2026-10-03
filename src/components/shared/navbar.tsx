'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle, Heart, User, Building2, PlusCircle, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNav } from '@/config/nav';
import { siteConfig } from '@/config/site';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 dark:bg-[#0A1628]/90 backdrop-blur-md shadow-md border-b border-border/40 py-3'
            : 'bg-white/70 dark:bg-[#0A1628]/70 backdrop-blur-sm py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center border border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors">
                <Building2 className="w-5 h-5 text-[#C9A96E]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-serif font-bold text-[#C9A96E]">
                    Shreeniwas
                  </span>
                  <span className="text-xl font-bold text-[#0A1628] dark:text-white">
                    Properties
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium -mt-1">Rajasthan Real Estate</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {mainNav?.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors relative py-1",
                      isActive ? "text-[#C9A96E] font-semibold" : "text-[#0A1628]/80 dark:text-white/80 hover:text-[#C9A96E]"
                    )}
                  >
                    {item.title}
                    {isActive && (
                      <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A96E] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/portal/saved"
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-[#C9A96E] p-2 rounded-full hover:bg-slate-100 transition-colors"
                title="Saved Properties"
              >
                <Heart className="w-5 h-5 text-rose-500" />
              </Link>

              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#0A1628] hover:text-[#C9A96E] px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>

              <Link
                href="/dashboard/admin"
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold bg-[#0A1628] text-white px-3 py-2 rounded-lg hover:bg-[#0A1628]/90 transition-colors border border-white/10"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#C9A96E]" />
                Admin
              </Link>

              <Link
                href="/dashboard/landlord/properties/new"
                className="inline-flex items-center gap-2 rounded-full bg-[#C9A96E] px-5 py-2.5 text-sm font-semibold text-[#0A1628] shadow-md shadow-[#C9A96E]/20 transition-all hover:bg-[#b59760] hover:scale-105 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden xs:inline">List Property</span>
              </Link>
              
              <button
                className="lg:hidden p-2 text-slate-800 dark:text-white rounded-lg hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#0A1628] text-white flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-serif font-bold text-[#C9A96E]">Shreeniwas</span>
                  <span className="text-xl font-bold">Properties</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 mt-8">
                {mainNav?.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-white/90 hover:text-[#C9A96E] transition-colors py-2 border-b border-white/5"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3 mt-8">
                <Link
                  href="/dashboard/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 rounded-xl text-white font-medium hover:bg-white/20 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#C9A96E]" />
                  Admin Panel
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 rounded-xl text-white font-medium hover:bg-white/20 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Sign In / Register
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <Link
                href="/dashboard/landlord/properties/new"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#C9A96E] text-[#0A1628] font-bold rounded-xl shadow-lg"
              >
                <PlusCircle className="w-5 h-5" />
                List Your Property
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <a
        href={siteConfig?.links?.whatsapp || 'https://wa.me/919999999999'}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition-all hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </>
  );
}
