'use client';

import React, { useState } from 'react';
import { 
  Building2, Bath, Shield, Car, Trees, Wifi, Zap, ShieldCheck, 
  Compass, Sparkles, Dumbbell, Flame, Tv, Lock, Tv2, UtensilsCrossed, Check
} from 'lucide-react';

export const AMENITIES_CATALOG = [
  { id: 'all', category: 'All Features', label: 'All Amenities' },
  { id: 'luxury', category: 'Luxury & Living', label: 'Luxury & Living' },
  { id: 'wellness', category: 'Wellness & Leisure', label: 'Wellness & Leisure' },
  { id: 'security', category: 'Security & Vastu', label: 'Security & Vastu' },
  { id: 'utilities', category: 'Utilities & Parking', label: 'Utilities & Parking' },
];

export const ALL_AMENITIES = [
  { name: 'Private Elevator', category: 'luxury', icon: Building2, desc: 'Direct in-apartment high-speed elevator access' },
  { name: 'Italian Marble Flooring', category: 'luxury', icon: Sparkles, desc: 'Imported Statuario marble in living areas' },
  { name: 'Modular German Kitchen', category: 'luxury', icon: UtensilsCrossed, desc: 'Bosch appliances & granite countertops' },
  { name: 'Private Terrace Lounge', category: 'luxury', icon: Tv2, desc: 'Sky deck with panoramic Rajasthan city views' },
  
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

  const filtered = activeCategory === 'all' 
    ? ALL_AMENITIES 
    : ALL_AMENITIES.filter(a => a.category === activeCategory);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl max-w-7xl mx-auto my-12">
      <div className="text-center mb-8">
        <span className="bg-[#C9A96E]/20 text-[#0A1628] border border-[#C9A96E]/40 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
          World-Class Standards
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1628]">Luxury Property Amenities & Features</h2>
        <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">
          Every Shreeniwas listing is equipped with royal comfort, state-of-the-art security, and modern utility standards.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar justify-start sm:justify-center mb-8 pb-2">
        {AMENITIES_CATALOG.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === tab.id 
                ? 'bg-[#0A1628] text-[#C9A96E] shadow-md border border-[#C9A96E]/30' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Amenities Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-[#FDFBF7] p-5 rounded-2xl border border-slate-200/70 hover:border-[#C9A96E] transition-all hover:shadow-md group">
            <div className="w-12 h-12 rounded-2xl bg-[#0A1628] flex items-center justify-center text-[#C9A96E] mb-4 group-hover:scale-110 transition-transform shadow-md">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#0A1628] text-base mb-1 flex items-center gap-1.5">
              {item.name}
              <Check className="w-4 h-4 text-emerald-600" />
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
