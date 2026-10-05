'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, User, Building2, PlusCircle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNav } from '@/config/nav';
import { useSiteSettings } from '@/lib/settings/site-settings-context';
import { getSavedCount } from '@/lib/saved-properties';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [savedCount, setSavedCount] = useState(0);
  const pathname = usePathname();

  const { settings } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial saved count & event listener
    setSavedCount(getSavedCount());
    const handleFavsUpdate = () => {
      setSavedCount(getSavedCount());
    };
    window.addEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
    window.addEventListener('storage', handleFavsUpdate);

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
      window.removeEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
      window.removeEventListener('storage', handleFavsUpdate);
    };
  }, [pathname]);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard/admin')) {
    return null;
  }

  const titleParts = (settings.siteTitle || 'Shreeniwas Properties').split(' ');
  const titleFirst = titleParts[0] || 'Shreeniwas';
  const titleRest = titleParts.slice(1).join(' ') || 'Properties';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 shadow-md border-b border-slate-200/80 py-1 sm:py-1.5'
            : 'bg-white/90 backdrop-blur-md py-1.5 sm:py-2 border-b border-slate-100'
        )}
      >
        <div className="h-14 sm:h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Title dynamically synced */}
          <Link href="/" className="flex items-center gap-2 group whitespace-nowrap">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#0A1628] flex items-center justify-center border border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors shrink-0 shadow-sm overflow-hidden p-1">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt={settings.siteTitle} className="w-full h-full object-contain rounded-lg" />
              ) : (
                <Building2 className="w-5 h-5 text-[#C9A96E]" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-lg sm:text-xl font-serif font-bold text-[#C9A96E]">
                  {titleFirst}
                </span>
                <span className="text-lg sm:text-xl font-bold text-[#0A1628]">
                  {titleRest}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-medium -mt-1">
                Rajasthan Real Estate
              </span>
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

          {/* User Account & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {isLoggedIn ? (
              <Link
                href="/dashboard/portal"
                className="inline-flex items-center gap-2 rounded-xl border border-[#C9A96E]/50 bg-[#0A1628] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:border-[#C9A96E] transition-all cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#C9A96E] text-[#0A1628] flex items-center justify-center font-bold text-[10px]">
                  {userName.charAt(0) || 'U'}
                </div>
                <span className="hidden sm:inline font-semibold">{userName.split(' ')[0]}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#0A1628] hover:bg-slate-50 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}

            <Link
              href="/dashboard/portal/saved"
              className="p-2 text-slate-700 hover:text-rose-600 rounded-xl hover:bg-rose-50/50 transition-colors relative flex items-center justify-center group cursor-pointer"
              aria-label="Saved properties"
              title="View Shortlisted Properties"
            >
              <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${savedCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`} />
              <AnimatePresence>
                {savedCount > 0 && (
                  <motion.span
                    key={savedCount}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0.8, 1.25, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-extrabold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center shadow-md border-2 border-white pointer-events-none"
                  >
                    {savedCount > 9 ? '9+' : savedCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

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
                  <span className="text-xl font-serif font-bold text-[#C9A96E]">{titleFirst}</span>
                  <span className="text-xl font-bold">{titleRest}</span>
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
                  href="/dashboard/portal/saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-xl flex items-center justify-between px-4 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Heart className={`w-4 h-4 ${savedCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-[#C9A96E]'}`} />
                    <span>Saved Shortlist</span>
                  </div>
                  {savedCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-xs font-extrabold">
                      {savedCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/dashboard/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-white/10 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-[#C9A96E]" /> My Profile Center
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
