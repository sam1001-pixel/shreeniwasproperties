'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, MapPin, LocateFixed, Loader2, ArrowRight, 
  Sparkles, ShieldCheck, ChevronRight, RefreshCw, Building2,
  Percent, ArrowUpRight
} from 'lucide-react';
import { 
  detectUserCityViaGPS, 
  getSavedDetectedCity, 
  saveDetectedCity, 
  getLocalityPriceTrends,
  LocalityPriceTrend,
  RAJASTHAN_CITIES_COORDS,
  EVENT_NAME_LOCATION_DETECTED,
  EVENT_NAME_PRICE_TRENDS_UPDATED
} from '@/lib/location-service';

interface TopLocalitiesPriceTrendsProps {
  initialCity?: string;
}

export default function TopLocalitiesPriceTrends({
  initialCity
}: TopLocalitiesPriceTrendsProps) {
  const [currentCity, setCurrentCity] = useState<string>('Jodhpur');
  const [localities, setLocalities] = useState<LocalityPriceTrend[]>([]);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('');

  // Update locality trends based on city
  const refreshCityTrends = (cityName: string) => {
    const trends = getLocalityPriceTrends(cityName);
    setLocalities(trends);
    setCurrentCity(cityName);
    setLastRefreshedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  // Initial load: check GPS or saved city
  useEffect(() => {
    const saved = initialCity || getSavedDetectedCity() || 'Jodhpur';
    refreshCityTrends(saved);

    // Auto-detect GPS once if not yet detected in session
    if (typeof window !== 'undefined') {
      const autoChecked = sessionStorage.getItem('shreeniwas_localities_gps_checked');
      if (!autoChecked && !initialCity) {
        sessionStorage.setItem('shreeniwas_localities_gps_checked', 'true');
        detectUserCityViaGPS().then((res) => {
          if (res.success && res.cityName) {
            refreshCityTrends(res.cityName);
            if (typeof res.distanceKm === 'number') {
              setDistanceKm(res.distanceKm);
            }
          }
        });
      }
    }

    // Listen for global location detection events
    const handleGlobalLocation = (e: any) => {
      const detected = e?.detail;
      if (detected) {
        refreshCityTrends(detected);
      }
    };

    const handlePriceTrendsUpdate = () => {
      refreshCityTrends(currentCity);
    };

    window.addEventListener(EVENT_NAME_LOCATION_DETECTED, handleGlobalLocation);
    window.addEventListener(EVENT_NAME_PRICE_TRENDS_UPDATED, handlePriceTrendsUpdate);

    return () => {
      window.removeEventListener(EVENT_NAME_LOCATION_DETECTED, handleGlobalLocation);
      window.removeEventListener(EVENT_NAME_PRICE_TRENDS_UPDATED, handlePriceTrendsUpdate);
    };
  }, [initialCity]);

  // Handle explicit manual GPS detection click
  const handleGPSDetect = async () => {
    setIsDetectingGps(true);
    try {
      const res = await detectUserCityViaGPS();
      if (res.success && res.cityName) {
        refreshCityTrends(res.cityName);
        setDistanceKm(res.distanceKm ?? 0);
      }
    } catch (err) {
      console.warn('GPS location detection error:', err);
    } finally {
      setIsDetectingGps(false);
    }
  };

  // City Tab Switcher Options
  const majorCities = ["Jodhpur", "Jaipur", "Udaipur", "Kota", "Ajmer", "Bikaner"];

  return (
    <section className="py-8 sm:py-12 px-4 bg-white border-b border-slate-100">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header with GPS Status and City Pills */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2 border border-emerald-200/60 shadow-xs">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live Market Valuation & Real-Time Capital Growth</span>
            </div>
            
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A1628]">
                Top Localities & Price Trends in Rajasthan
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#112A50] text-[#F09032] text-xs font-bold font-sans">
                {currentCity}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Real-time capital appreciation rates and sq.ft index automatically synced with live property listings and your GPS location.
            </p>
          </div>

          {/* GPS Quick Action & Navigation Controls */}
          <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={handleGPSDetect}
              disabled={isDetectingGps}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-[#112A50] text-slate-700 hover:text-white border border-slate-200 hover:border-[#F09032] text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer disabled:opacity-60"
              title="Detect closest Rajasthan city based on your physical location"
            >
              {isDetectingGps ? (
                <>
                  <Loader2 className="w-4 h-4 text-[#F09032] animate-spin" />
                  <span>Locating via GPS...</span>
                </>
              ) : (
                <>
                  <LocateFixed className="w-4 h-4 text-[#F09032]" />
                  <span>
                    {distanceKm !== null ? `Near GPS: ${currentCity} (${distanceKm} km)` : 'Auto-Sync via GPS'}
                  </span>
                </>
              )}
            </button>

            <Link href={`/locations/${currentCity.toLowerCase()}`}>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A1628] hover:bg-[#112A50] text-[#F09032] text-xs font-bold transition-all shadow-xs cursor-pointer border border-[#F09032]/30">
                Explore {currentCity} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* City Filter Pills (Quick Switcher with GPS Highlight) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Hubs:
          </span>
          {majorCities.map((city) => {
            const isActive = currentCity.toLowerCase() === city.toLowerCase();
            return (
              <button
                key={city}
                onClick={() => {
                  refreshCityTrends(city);
                  saveDetectedCity(city);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#112A50] text-[#F09032] border border-[#F09032] shadow-sm scale-[1.02]'
                    : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <MapPin className={`w-3 h-3 ${isActive ? 'text-[#F09032]' : 'text-slate-400'}`} />
                <span>{city}</span>
              </button>
            );
          })}
        </div>

        {/* Smooth Auto-Scroll Track (Left to Right Marquee with Compact Widgets) */}
        <div className="relative w-full overflow-hidden py-1">
          {/* Subtle Side Fade Gradients for Premium Finish */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-ltr pause-on-hover gap-3 sm:gap-3.5 py-1">
            {/* Render 4 sets of localities for seamless continuous infinite loop */}
            {[...localities, ...localities, ...localities, ...localities].map((loc, idx) => (
              <div
                key={`${loc.name}-${loc.city}-${idx}`}
                className="w-[190px] sm:w-[210px] shrink-0 bg-[#FDFBF7] p-3 sm:p-3.5 rounded-xl border border-slate-200/90 hover:border-[#F09032] transition-all hover:shadow-md group flex flex-col justify-between select-none"
              >
                <div>
                  {/* Locality Header */}
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <h3 className="text-xs sm:text-[13px] font-bold text-[#0A1628] group-hover:text-[#112A50] transition-colors truncate">
                      {loc.name}
                    </h3>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 shrink-0 flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" />
                      {loc.growth}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 font-medium mb-1.5 flex items-center gap-1 truncate">
                    <MapPin className="w-2.5 h-2.5 text-[#F09032] shrink-0" />
                    <span>{loc.city} • {loc.type}</span>
                  </p>
                </div>

                {/* Pricing & Metric Body */}
                <div className="border-t border-slate-200/70 pt-2 mt-1">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-400 block leading-none mb-0.5">
                        Avg Index
                      </span>
                      <span className="font-serif font-extrabold text-[#0A1628] text-xs sm:text-sm">
                        {loc.avgPrice}
                      </span>
                      <span className="text-[9px] text-slate-500 font-sans ml-0.5">/sq.ft</span>
                    </div>

                    {loc.rentalYield && (
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1 py-0.5 rounded border border-blue-200/60 shrink-0">
                        {loc.rentalYield}
                      </span>
                    )}
                  </div>

                  {/* Property Count & Deep link */}
                  <div className="mt-1.5 pt-1.5 border-t border-slate-200/50 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 text-[9px] font-medium truncate">{loc.count}</span>
                    <Link
                      href={`/properties?city=${encodeURIComponent(loc.city)}&locality=${encodeURIComponent(loc.name)}`}
                      className="text-[#112A50] text-[10px] font-bold hover:text-[#F09032] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0"
                    >
                      <span>Listings</span>
                      <ChevronRight className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
