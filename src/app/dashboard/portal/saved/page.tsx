'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Building2, 
  Home, 
  Crown, 
  MessageSquare, 
  Trash2, 
  Share2, 
  Check, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  ExternalLink,
  Filter
} from 'lucide-react';
import { getSavedProperties, removeSavedProperty, SavedProperty } from '@/lib/saved-properties';
import ScheduleVisitModal from '@/components/shared/schedule-visit-modal';

export default function SavedPropertiesPage() {
  const [savedList, setSavedList] = useState<SavedProperty[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = useState<SavedProperty | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    const items = getSavedProperties();
    setSavedList(items);

    const sessionRaw = localStorage.getItem('shreeniwas_user_session') || sessionStorage.getItem('shreeniwas_user_session');
    if (sessionRaw) {
      try {
        const session = JSON.parse(sessionRaw);
        if (session?.loggedIn) setIsLoggedIn(true);
      } catch (e) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('shreeniwas_favorites_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('shreeniwas_favorites_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleRemove = (e: React.MouseEvent, prop: SavedProperty) => {
    e.preventDefault();
    e.stopPropagation();
    removeSavedProperty(prop.id || prop.slug);
    setSavedList(prev => prev.filter(item => item.id !== prop.id && item.slug !== prop.slug));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your saved shortlist?')) {
      savedList.forEach(prop => removeSavedProperty(prop.id || prop.slug));
      setSavedList([]);
    }
  };

  const handleShareShortlist = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const openVisitModal = (prop: SavedProperty) => {
    setSelectedPropertyForVisit(prop);
    setIsScheduleOpen(true);
  };

  // Filter properties by city
  const filteredList = selectedCity === 'All'
    ? savedList
    : savedList.filter(p => p.city?.toLowerCase() === selectedCity.toLowerCase() || p.location?.toLowerCase().includes(selectedCity.toLowerCase()));

  const cities = ['All', ...Array.from(new Set(savedList.map(p => p.city).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-6">
          <Link href="/" className="hover:text-[#C9A96E] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/properties" className="hover:text-[#C9A96E] transition-colors">
            Properties
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0A1628] font-bold">Saved Shortlist</span>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-600 text-xs font-bold mb-3">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Personal Property Shortlist</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#0A1628]">
                Saved Favorites <span className="text-[#C9A96E]">({savedList.length})</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 max-w-2xl">
                Track and compare your shortlisted villas, luxury apartments, and commercial investments across Rajasthan. Book VIP visits and chat directly with verified owners.
              </p>
            </div>

            {/* Action Bar */}
            {savedList.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleShareShortlist}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-[#0A1628] text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  {copiedShare ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-slate-500" />
                      <span>Share Shortlist</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleClearAll}
                  className="px-3.5 py-2.5 rounded-xl border border-rose-100 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>

          {/* Guest Sync Callout */}
          {!isLoggedIn && savedList.length > 0 && (
            <div className="mt-6 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2.5 text-amber-900">
                <Sparkles className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                <span>
                  <strong>Browsing as Guest:</strong> Your shortlist is saved on this browser. Sign in to synchronize your favorites across all your devices.
                </span>
              </div>
              <Link
                href="/login?redirect=/dashboard/portal/saved"
                className="px-3 py-1.5 rounded-xl bg-[#0A1628] text-[#C9A96E] font-bold hover:bg-slate-800 transition-all flex-shrink-0 shadow-sm"
              >
                Sign In & Sync
              </Link>
            </div>
          )}

          {/* City Filter Pills */}
          {cities.length > 2 && (
            <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1 flex-shrink-0">
                <Filter className="w-3.5 h-3.5" /> Filter by City:
              </span>
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                    selectedCity === city
                      ? 'bg-[#0A1628] text-[#C9A96E] shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {city} {city !== 'All' && `(${savedList.filter(p => p.city === city).length})`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Saved Properties Grid or Empty State */}
        {savedList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-2xl mx-auto my-8">
            <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-5">
              <Heart className="w-10 h-10 text-rose-400 fill-rose-100" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0A1628] mb-2">
              Your Shortlist is Empty
            </h3>
            <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
              You haven't saved any properties yet. Tap the heart icon on any villa, apartment, or plot across Rajasthan to easily compare and review later.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/properties"
                className="px-6 py-3 rounded-xl bg-[#0A1628] text-[#C9A96E] font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md"
              >
                <span>Browse All Properties</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
              >
                Explore Jodhpur & Jaipur
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredList.map((property) => (
                <motion.div
                  key={property.id || property.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Property Image & Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {property.reraApproved && (
                        <span className="bg-white/95 backdrop-blur text-[#0A1628] text-[10px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1 border border-emerald-500/20">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> RERA
                        </span>
                      )}
                      {property.zeroBrokerage && (
                        <span className="bg-[#0A1628]/90 backdrop-blur text-[#C9A96E] text-[10px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1 border border-[#C9A96E]/30">
                          <Zap className="w-3 h-3 text-[#C9A96E]" /> 0% Brokerage
                        </span>
                      )}
                    </div>

                    {/* Remove Action Button */}
                    <button
                      onClick={(e) => handleRemove(e, property)}
                      title="Remove from shortlist"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-rose-50 text-rose-500 hover:text-rose-600 shadow-md flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[11px] font-medium text-amber-200 uppercase tracking-wider block">
                          {property.type || 'Property'}
                        </span>
                        <span className="text-xl font-bold font-serif text-white leading-tight">
                          {property.price}
                        </span>
                      </div>
                      <span className="text-xs bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md font-semibold text-white">
                        {property.city || property.location?.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#0A1628] mb-1.5 group-hover:text-[#C9A96E] transition-colors line-clamp-1">
                        {property.title}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-center mb-4 text-xs font-semibold text-slate-700">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-normal">Configuration</span>
                          <span>{property.bhk || '3 BHK'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-normal">Super Area</span>
                          <span>{property.sqft ? `${property.sqft} sq.ft` : 'Spacious'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openVisitModal(property)}
                          className="flex-1 py-2.5 rounded-xl bg-[#0A1628] hover:bg-slate-800 text-[#C9A96E] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <Crown className="w-3.5 h-3.5" />
                          <span>Book VIP Visit ₹499</span>
                        </button>
                        <a
                          href={`https://wa.me/916376117833?text=Hi%20Shreeniwas%20Properties,%20I%20have%20shortlisted%20${encodeURIComponent(property.title)}%20(${encodeURIComponent(property.price)})%20in%20${encodeURIComponent(property.location)}.%20Please%20share%20verified%20documents.`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                          title="WhatsApp Inquiry"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <Link
                        href={`/properties/${property.slug || property.id}`}
                        className="w-full py-2 rounded-xl text-center text-xs font-bold text-slate-600 hover:text-[#0A1628] hover:bg-slate-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>View Full Property Details</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* VIP Schedule Visit Modal */}
      {selectedPropertyForVisit && (
        <ScheduleVisitModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          propertyTitle={selectedPropertyForVisit.title}
          propertyLocation={selectedPropertyForVisit.location}
          propertyPrice={selectedPropertyForVisit.price}
        />
      )}
    </div>
  );
}
