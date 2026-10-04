'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, Bath, Shield, Car, Trees, Wifi, Zap, ShieldCheck, 
  Compass, Sparkles, Dumbbell, Flame, Tv, Lock, Tv2, UtensilsCrossed, Check,
  ChevronLeft, ChevronRight
} from 'lucide-react';

export const AMENITIES_CATALOG = [
  { id: 'all', label: 'All Amenities' },
  { id: 'luxury', label: 'Luxury & Living' },
  { id: 'wellness', label: 'Wellness & Leisure' },
  { id: 'security', label: 'Security & Vastu' },
  { id: 'utilities', label: 'Utilities & Parking' },
];

export const ALL_AMENITIES = [
  { name: 'Private Elevator', category: 'luxury', icon: Building2, desc: 'Direct in-apartment high-speed elevator access' },
  { name: 'Italian Marble Flooring', category: 'luxury', icon: Sparkles, desc: 'Imported Statuario marble in living areas' },
  { name: 'Modular German Kitchen', category: 'luxury', icon: UtensilsCrossed, desc: 'Bosch appliances & granite countertops' },
  { name: 'Private Terrace Lounge', category: 'luxury', icon: Tv2, desc: 'Sky deck with panoramic Rajasthan views' },
  
  { name: 'Infinity Swimming Pool', category: 'wellness', icon: Bath, desc: 'Temperature-controlled rooftop pool' },
  { name: 'State-of-Art Fitness Gym', category: 'wellness', icon: Dumbbell, desc: 'Full cardiovascular & strength equipment' },
  { name: 'Landscaped Royal Garden', category: 'wellness', icon: Trees, desc: 'Manicured lawns & fountain courtyards' },
  { name: 'Clubhouse & Party Hall', category: 'wellness', icon: Flame, desc: 'Private banquet room for community events' },
  
  { name: '24/7 Smart CCTV Security', category: 'security', icon: ShieldCheck, desc: '3-tier security with video door phone' },
  { name: 'Vastu Compliant Layout', category: 'security', icon: Compass, desc: '100% East/North facing auspicious entry' },
  { name: 'Biometric Access Locks', category: 'security', icon: Lock, desc: 'Keyless digital door lock system' },

  { name: '100% Power Backup', category: 'utilities', icon: Zap, desc: 'Heavy-duty silent DG generator backup' },
  { name: 'Covered Car Parking', category: 'utilities', icon: Car, desc: 'Reserved basement parking slots' },
  { name: 'EV Charging Station', category: 'utilities', icon: Zap, desc: 'Fast EV charging points installed' },
  { name: 'High-Speed Fiber Wi-Fi', category: 'utilities', icon: Wifi, desc: 'Gigabit optical fiber connection ready' },
];

export default function AmenitiesShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const filtered = activeCategory === 'all' 
    ? ALL_AMENITIES 
    : ALL_AMENITIES.filter(a => a.category === activeCategory);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scroll = () => {
      if (!isPaused && container) {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 0.8;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const scrollManual = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0A1628] via-[#0D1E36] to-[#0A1628] text-white rounded-3xl p-6 sm:p-8 border border-[#C9A96E]/30 shadow-2xl max-w-7xl mx-auto my-10 relative overflow-hidden">
      {/* Background Gold Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header with Navigation Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-1.5">
            World-Class Property Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Luxury Amenities & <span className="text-[#C9A96E]">Features</span>
          </h2>
        </div>

        {/* Scroll Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => scrollManual('left')}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C9A96E] hover:text-[#0A1628] transition-colors flex items-center justify-center border border-white/10 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollManual('right')}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C9A96E] hover:text-[#0A1628] transition-colors flex items-center justify-center border border-white/10 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
        {AMENITIES_CATALOG.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === tab.id 
                ? 'bg-[#C9A96E] text-[#0A1628] shadow-md font-extrabold' 
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Fancy Horizontal Scrolling Marquee Track */}
      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth"
      >
        {filtered.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div 
              key={idx} 
              className="flex-shrink-0 w-64 sm:w-72 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-[#C9A96E]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C9A96E]/10 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/15 border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#C9A96E] bg-[#C9A96E]/10 px-2 py-0.5 rounded-md border border-[#C9A96E]/20">
                  {item.category}
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5 group-hover:text-[#C9A96E] transition-colors">
                {item.name}
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
