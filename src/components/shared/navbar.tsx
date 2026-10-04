'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, User, Building2, PlusCircle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNav } from '@/config/nav';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const pathname = usePathname();

  const [customLogo, setCustomLogo] = useState<string>('');

  const loadNavbarSettings = () => {
    try {
      const saved = localStorage.getItem('shreeniwas_platform_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.logoUrl) setCustomLogo(parsed.logoUrl);
      }
    } catch (e) {}
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    loadNavbarSettings();
    window.addEventListener('shreeniwas_data_updated', loadNavbarSettings);
    window.addEventListener('storage', loadNavbarSettings);

    // Check user session
    const session = localStorage.getItem('shreeniwas_user_session') || sessionStorage.getItem('shreeniwas_user_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed?.loggedIn) {
          setIsLoggedIn(true);
          setUserName(parsed.name || 'User');
        }
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('shreeniwas_data_updated', loadNavbarSettings);
      window.removeEventListener('storage', loadNavbarSettings);
    };
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 shadow-md border-b border-slate-200/80 py-2 sm:py-3'
            : 'bg-white/90 backdrop-blur-md py-3 sm:py-4 border-b border-slate-100'
        )}
      >
        <div className="h-16 sm:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group whitespace-nowrap">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#0A1628] flex items-center justify-center border border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors shrink-0 shadow-sm overflow-hidden p-1">
              {customLogo ? (
                <img src={customLogo} alt="Shreeniwas Logo" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <Building2 className="w-5 h-5 text-[#C9A96E]" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-lg sm:text-xl font-serif font-bold text-[#C9A96E]">
                  Shreeniwas
                </span>
                <span className="text-lg sm:text-xl font-bold text-[#0A1628]">
                  Properties
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-medium -mt-1">Rajasthan Real Estate</span>
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
                    "text-sm font-semibold transition-colors relative py-1",
                    isActive ? "text-[#C9A96E]" : "text-[#0A1628] hover:text-[#C9A96E]"
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
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard/portal"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#0A1628] hover:text-[#C9A96E] p-2 rounded-xl hover:bg-slate-100 transition-colors"
              title="View Saved Favorites"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Saved</span>
            </Link>

            {isLoggedIn ? (
              <Link
                href="/dashboard/portal"
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0A1628] text-[#C9A96E] font-bold text-xs shadow-md"
              >
                <div className="w-5 h-5 rounded-full bg-[#C9A96E] text-[#0A1628] flex items-center justify-center font-bold text-[10px]">
                  {userName.charAt(0)}
                </div>
                <span>{userName}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#0A1628] bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-all border border-slate-200"
              >
                <User className="w-4 h-4 text-[#C9A96E]" />
                Sign In
              </Link>
            )}

            <Link
              href="/dashboard/landlord/properties/new"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-[#C9A96E] hover:bg-[#b59760] px-4 py-2.5 text-xs font-extrabold text-[#0A1628] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Free Listing</span>
            </Link>

            <button
              className="lg:hidden p-2 text-[#0A1628] rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#0A1628] text-white flex flex-col p-6 h-[100dvh] overflow-y-auto"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-xl font-serif font-bold text-[#C9A96E]">Shreeniwas</span>
                  <span className="text-xl font-bold">Properties</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white shrink-0"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-2 mt-6">
                {mainNav?.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "py-3 px-4 rounded-xl text-base font-medium transition-colors flex items-center justify-between",
                        isActive ? "bg-[#C9A96E]/20 text-[#C9A96E] font-bold border border-[#C9A96E]/30" : "text-slate-300 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-8 space-y-3 pt-6 border-t border-white/10">
                <Link
                  href="/dashboard/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-white/10 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-[#C9A96E]" /> My Profile & Saved Favorites
                </Link>

                <Link
                  href="/dashboard/landlord/properties/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-[#C9A96E] text-[#0A1628] font-extrabold text-sm rounded-xl flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" /> Post Free Property Listing
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
