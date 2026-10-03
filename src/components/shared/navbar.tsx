'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNav } from '@/config/nav';
import { siteConfig } from '@/config/site';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
          scrolled
            ? 'bg-white/80 dark:bg-[#0A1628]/80 backdrop-blur-xl border-border/50 shadow-sm'
            : 'bg-transparent border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-1.5">
              <span className="text-2xl font-serif font-bold text-[#C9A96E]">
                Shreeniwas
              </span>
              <span className="text-2xl font-semibold text-[#0A1628] dark:text-white">
                Properties
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {mainNav?.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-[#C9A96E] text-foreground/80"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <Link
                href="/list-property"
                className="hidden md:inline-flex h-10 items-center justify-center rounded-full bg-[#C9A96E] px-6 text-sm font-medium text-[#0A1628] transition-colors hover:bg-[#C9A96E]/90 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
              >
                List Property
              </Link>
              
              <button
                className="md:hidden p-2 text-foreground"
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
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-[#0A1628]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 sm:px-6 h-20 border-b border-border/50">
                <Link href="/" className="flex items-center gap-1.5" onClick={() => setMobileMenuOpen(false)}>
                  <span className="text-2xl font-serif font-bold text-[#C9A96E]">Shreeniwas</span>
                  <span className="text-2xl font-semibold text-[#0A1628] dark:text-white">Properties</span>
                </Link>
                <button
                  className="p-2 text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-6 overflow-y-auto">
                {mainNav?.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-foreground/80 hover:text-[#C9A96E] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="mt-4 pt-6 border-t border-border/50">
                  <Link
                    href="/list-property"
                    className="inline-flex w-full h-12 items-center justify-center rounded-full bg-[#C9A96E] px-6 text-base font-medium text-[#0A1628] transition-colors hover:bg-[#C9A96E]/90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    List Property
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <a
        href={siteConfig?.links?.whatsapp || 'https://wa.me/919999999999'}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </>
  );
}
