'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Heart, 
  User, 
  Building2, 
  PlusCircle, 
  ShieldCheck, 
  Phone, 
  ChevronDown, 
  MapPin, 
  KeyRound, 
  Home, 
  Briefcase, 
  Sparkles, 
  ArrowRight,
  LogOut,
  LayoutDashboard,
  CheckCircle2,
  Calendar,
  Compass
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSiteSettings } from '@/lib/settings/site-settings-context';
import { getSavedCount } from '@/lib/saved-properties';
import { siteConfig } from '@/config/site';

// Structured Navigation Categories for Elite UX
const EXPLORE_LOCATIONS = [
  { name: 'Jaipur', desc: 'Pink City luxury villas & flats', href: '/locations/jaipur', tag: 'Hot' },
  { name: 'Jodhpur', desc: 'Heritage havelis & modern colonies', href: '/locations/jodhpur', tag: 'HQ' },
  { name: 'Udaipur', desc: 'Lakeview apartments & royal plots', href: '/locations/udaipur', tag: 'Trending' },
  { name: 'Kota', desc: 'Riverfront villas & rental hotspots', href: '/locations/kota', tag: null },
  { name: 'Ajmer', desc: 'Scenic valley & urban residences', href: '/locations/ajmer', tag: null },
];

const PROPERTY_CATEGORIES = [
  { title: 'All Properties', href: '/properties', icon: Home, desc: '1,240+ verified RERA listings' },
  { title: 'Luxury Buy', href: '/properties?purpose=sale', icon: Sparkles, desc: 'Villas, bungalows & penthouses' },
  { title: 'Verified Rentals', href: '/properties?purpose=rent', icon: KeyRound, desc: '0% brokerage family flats' },
  { title: 'Commercial & Plots', href: '/properties?purpose=commercial_lease', icon: Briefcase, desc: 'High ROI retail & office hubs' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [savedCount, setSavedCount] = useState(0);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { settings } = useSiteSettings();

  // Scroll detection & storage synchronization
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial saved count & reactive listener
    setSavedCount(getSavedCount());
    const handleFavsUpdate = () => {
      setSavedCount(getSavedCount());
    };
    window.addEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
    window.addEventListener('storage', handleFavsUpdate);

    // Check user session
    const checkSession = () => {
      const session = localStorage.getItem('shreeniwas_user_session') || sessionStorage.getItem('shreeniwas_user_session');
      if (session) {
        try {
          const parsed = JSON.parse(session);
          if (parsed?.loggedIn) {
            setIsLoggedIn(true);
            setUserName(parsed.name || 'User');
            setUserEmail(parsed.email || '');
          } else {
            setIsLoggedIn(false);
          }
        } catch (e) {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkSession();

    // Prevent body scroll when mobile drawer is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
      window.removeEventListener('storage', handleFavsUpdate);
      document.body.style.overflow = '';
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, [pathname, mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard/admin')) {
    return null;
  }

  const titleParts = (settings.siteTitle || 'Shreeniwas Properties').split(' ');
  const titleFirst = titleParts[0] || 'Shreeniwas';
  const titleRest = titleParts.slice(1).join(' ') || 'Properties';
  const displayPhone = settings.supportPhone || siteConfig.contact.phone || '+91 6376117833';

  const handleDropdownEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleLogout = () => {
    localStorage.removeItem('shreeniwas_user_session');
    sessionStorage.removeItem('shreeniwas_user_session');
    setIsLoggedIn(false);
    setActiveDropdown(null);
    window.location.href = '/';
  };

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(10,22,40,0.08)] border-b border-slate-200/80 py-1 sm:py-1.5'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-100/80 py-1.5 sm:py-2.5'
        )}
      >
        {/* Main Navbar Bar */}
        <div className="h-14 sm:h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* 1. Brand Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-xl"
            aria-label={`${settings.siteTitle || 'Shreeniwas Properties'} Home`}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0A1628] to-[#162744] flex items-center justify-center border border-[#C9A96E]/50 group-hover:border-[#C9A96E] transition-all shrink-0 shadow-md p-1 group-hover:scale-105">
              {settings.logoUrl ? (
                <img 
                  src={settings.logoUrl} 
                  alt={settings.siteTitle || 'Shreeniwas Properties'} 
                  className="w-full h-full object-contain rounded-lg" 
                />
              ) : (
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A96E]" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-lg sm:text-xl font-serif font-bold text-[#C9A96E] tracking-tight">
                  {titleFirst}
                </span>
                <span className="text-lg sm:text-xl font-bold text-[#0A1628] tracking-tight">
                  {titleRest}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-semibold -mt-1 flex items-center gap-1">
                <span>Rajasthan Real Estate</span>
                <span className="w-1 h-1 rounded-full bg-[#C9A96E] inline-block" />
                <span className="text-[#C9A96E] font-bold">Verified</span>
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links (with Micro-Drop-down Menus) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2" aria-label="Main Navigation">
            {/* Home */}
            <Link
              href="/"
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-semibold transition-all relative",
                pathname === '/' 
                  ? "text-[#C9A96E] bg-[#C9A96E]/10 font-bold" 
                  : "text-[#0A1628] hover:text-[#C9A96E] hover:bg-slate-50"
              )}
            >
              Home
            </Link>

            {/* Properties Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('properties')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'properties' ? null : 'properties')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-1 cursor-pointer",
                  pathname.startsWith('/properties')
                    ? "text-[#C9A96E] bg-[#C9A96E]/10 font-bold"
                    : "text-[#0A1628] hover:text-[#C9A96E] hover:bg-slate-50"
                )}
                aria-expanded={activeDropdown === 'properties'}
              >
                <span>Properties</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === 'properties' ? "rotate-180 text-[#C9A96E]" : "text-slate-400")} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'properties' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 overflow-hidden"
                  >
                    <div className="space-y-1">
                      {PROPERTY_CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isCatActive = pathname === cat.href;
                        return (
                          <Link
                            key={cat.title}
                            href={cat.href}
                            className={cn(
                              "flex items-start gap-3 p-2.5 rounded-xl transition-all group",
                              isCatActive ? "bg-[#C9A96E]/15 text-[#0A1628]" : "hover:bg-slate-50 text-slate-700"
                            )}
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#0A1628]/5 group-hover:bg-[#0A1628] flex items-center justify-center shrink-0 transition-colors">
                              <Icon className="w-4 h-4 text-[#C9A96E] group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-[#0A1628] group-hover:text-[#C9A96E] transition-colors">{cat.title}</p>
                              <p className="text-[11px] text-slate-500 leading-tight truncate">{cat.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-[11px]">
                      <span className="text-slate-500 font-medium">Browse by Budget</span>
                      <Link href="/properties?purpose=sale" className="text-[#C9A96E] font-bold hover:underline flex items-center gap-0.5">
                        <span>Explore All</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cities / Locations Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('cities')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'cities' ? null : 'cities')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-1 cursor-pointer",
                  pathname.startsWith('/locations')
                    ? "text-[#C9A96E] bg-[#C9A96E]/10 font-bold"
                    : "text-[#0A1628] hover:text-[#C9A96E] hover:bg-slate-50"
                )}
                aria-expanded={activeDropdown === 'cities'}
              >
                <span>Cities</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === 'cities' ? "rotate-180 text-[#C9A96E]" : "text-slate-400")} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'cities' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-1.5 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50"
                  >
                    <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-100">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C9A96E]" /> Major Hubs in Rajasthan
                      </span>
                      <Link href="/properties" className="text-[11px] font-bold text-[#C9A96E] hover:underline">
                        All Cities
                      </Link>
                    </div>
                    <div className="space-y-1">
                      {EXPLORE_LOCATIONS.map((loc) => (
                        <Link
                          key={loc.name}
                          href={loc.href}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-[#0A1628] group-hover:text-[#C9A96E] transition-colors">{loc.name}</span>
                              {loc.tag && (
                                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#C9A96E]/15 text-[#C9A96E]">
                                  {loc.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400">{loc.desc}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#C9A96E] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tariff & Visits */}
            <Link
              href="/tariff"
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-semibold transition-all relative",
                pathname === '/tariff'
                  ? "text-[#C9A96E] bg-[#C9A96E]/10 font-bold"
                  : "text-[#0A1628] hover:text-[#C9A96E] hover:bg-slate-50"
              )}
            >
              Tariff & Visits
            </Link>

            {/* About */}
            <Link
              href="/about"
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-semibold transition-all relative",
                pathname === '/about'
                  ? "text-[#C9A96E] bg-[#C9A96E]/10 font-bold"
                  : "text-[#0A1628] hover:text-[#C9A96E] hover:bg-slate-50"
              )}
            >
              About
            </Link>

            {/* Blog */}
            <Link
              href="/blog"
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-semibold transition-all relative",
                pathname === '/blog'
                  ? "text-[#C9A96E] bg-[#C9A96E]/10 font-bold"
                  : "text-[#0A1628] hover:text-[#C9A96E] hover:bg-slate-50"
              )}
            >
              Blog
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-semibold transition-all relative",
                pathname === '/contact'
                  ? "text-[#C9A96E] bg-[#C9A96E]/10 font-bold"
                  : "text-[#0A1628] hover:text-[#C9A96E] hover:bg-slate-50"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* 3. Action Buttons & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Shortlist Heart Button */}
            <Link
              href="/dashboard/portal/saved"
              className="p-2 sm:p-2.5 text-slate-700 hover:text-rose-600 rounded-xl hover:bg-rose-50/60 transition-all relative flex items-center justify-center group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              aria-label={`View Saved Shortlist, ${savedCount} properties`}
              title="View Shortlisted Properties"
            >
              <Heart className={cn("w-5 h-5 transition-transform group-hover:scale-110", savedCount > 0 ? "text-rose-500 fill-rose-500" : "text-slate-700")} />
              <AnimatePresence>
                {savedCount > 0 && (
                  <motion.span
                    key={savedCount}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0.8, 1.25, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-extrabold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-md border-2 border-white pointer-events-none"
                  >
                    {savedCount > 9 ? '9+' : savedCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* User Account Button (Logged In or Sign In) */}
            {isLoggedIn ? (
              <div 
                className="relative"
                onMouseEnter={() => handleDropdownEnter('user')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#C9A96E]/40 bg-[#0A1628] hover:bg-[#14233c] px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                  aria-expanded={activeDropdown === 'user'}
                >
                  <div className="w-5 h-5 rounded-full bg-[#C9A96E] text-[#0A1628] flex items-center justify-center font-extrabold text-[10px]">
                    {userName.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden md:inline font-semibold max-w-[90px] truncate">{userName.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-[#C9A96E]" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'user' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50"
                    >
                      <div className="p-2.5 border-b border-slate-100 bg-slate-50/70 rounded-xl mb-1">
                        <p className="text-xs font-bold text-[#0A1628] truncate">{userName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{userEmail || 'Client Account'}</p>
                      </div>
                      <div className="space-y-0.5">
                        <Link
                          href="/dashboard/portal"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#C9A96E]" />
                          <span>Client Portal</span>
                        </Link>
                        <Link
                          href="/dashboard/portal/saved"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-rose-500" />
                          <span>My Shortlist ({savedCount})</span>
                        </Link>
                        <Link
                          href="/dashboard/landlord"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <span>Landlord Dashboard</span>
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-xs font-bold text-[#0A1628] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
              >
                <User className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Login</span>
              </Link>
            )}

            {/* Post Property CTA Button */}
            <Link
              href="/dashboard/landlord/properties/new"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C9A96E] to-[#b59760] hover:brightness-105 active:scale-95 px-3.5 py-2 text-xs font-extrabold text-[#0A1628] shadow-sm transition-all hover:shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Listing</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="lg:hidden p-2 text-[#0A1628] rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (UI/UX Pro Max Slide-Down Modal with Backdrop Blur) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Scrim Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              aria-hidden="true"
            />

            {/* Drawer Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#0A1628] text-white shadow-2xl flex flex-col h-full overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0A1628]/95 backdrop-blur-md z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-[#C9A96E]" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-[#C9A96E] text-base">{titleFirst}</span>
                    <span className="font-bold text-white text-base ml-1">{titleRest}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-5 space-y-6 flex-1">
                
                {/* Verified Trust Strip in Drawer */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#C9A96E] shrink-0" />
                  <div className="text-slate-300">
                    <p className="font-bold text-white">RERA Approved Properties</p>
                    <p className="text-[11px] text-slate-400">Zero Brokerage Deals across Rajasthan</p>
                  </div>
                </div>

                {/* Primary Nav Links */}
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2">Explore</p>
                  <nav className="space-y-1">
                    {[
                      { title: 'Home', href: '/' },
                      { title: 'All Properties', href: '/properties' },
                      { title: 'Buy Luxury Villas', href: '/properties?purpose=sale' },
                      { title: 'Rental Homes', href: '/properties?purpose=rent' },
                      { title: 'Commercial & Plots', href: '/properties?purpose=commercial_lease' },
                      { title: 'Tariff & Site Visit Passes', href: '/tariff' },
                      { title: 'About Shreeniwas', href: '/about' },
                      { title: 'Real Estate Blog', href: '/blog' },
                      { title: 'Contact VIP Desk', href: '/contact' },
                    ].map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                            isActive
                              ? "bg-[#C9A96E] text-[#0A1628] font-bold shadow-sm"
                              : "text-slate-300 hover:bg-white/10 hover:text-white"
                          )}
                        >
                          <span>{item.title}</span>
                          <ArrowRight className={cn("w-4 h-4", isActive ? "text-[#0A1628]" : "text-slate-500")} />
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* City Hub Shortcuts */}
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2">Top Cities</p>
                  <div className="grid grid-cols-2 gap-2">
                    {EXPLORE_LOCATIONS.map((loc) => (
                      <Link
                        key={loc.name}
                        href={loc.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-left"
                      >
                        <p className="text-xs font-bold text-white flex items-center justify-between">
                          <span>{loc.name}</span>
                          {loc.tag && <span className="text-[9px] text-[#C9A96E] font-bold">{loc.tag}</span>}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">{loc.desc.split(' ')[0]} options</p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <Link
                    href="/dashboard/portal/saved"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl flex items-center justify-between px-4 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Heart className={cn("w-4 h-4", savedCount > 0 ? "text-rose-500 fill-rose-500" : "text-[#C9A96E]")} />
                      <span>Saved Shortlist</span>
                    </div>
                    {savedCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-xs font-extrabold">
                        {savedCount}
                      </span>
                    )}
                  </Link>

                  {isLoggedIn ? (
                    <Link
                      href="/dashboard/portal"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 bg-white/10 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4 text-[#C9A96E]" /> Client Portal ({userName.split(' ')[0]})
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4 text-[#C9A96E]" /> Sign In / Register
                    </Link>
                  )}

                  <Link
                    href="/dashboard/landlord/properties/new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 bg-gradient-to-r from-[#C9A96E] to-[#b59760] text-[#0A1628] font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg"
                  >
                    <PlusCircle className="w-4 h-4" /> Post Free Property Listing
                  </Link>
                  
                  <a
                    href={`tel:${displayPhone.replace(/\s+/g, '')}`}
                    className="w-full py-2.5 rounded-xl border border-white/20 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span>Call Head Office: {displayPhone}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
