'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Building2, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';

const CITIES_DETAILS = [
  { slug: 'jaipur', name: 'Jaipur', desc: 'The Pink City — Luxury villas in Vaishali Nagar, penthouses in C-Scheme & Mansarovar.', count: '450+ Properties', price: '₹6,450/sq.ft', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800' },
  { slug: 'jodhpur', name: 'Jodhpur', desc: 'The Sun City — Regal havelis in Ratanada, Shastri Nagar estates & modern plots.', count: '210+ Properties', price: '₹5,200/sq.ft', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800' },
  { slug: 'udaipur', name: 'Udaipur', desc: 'The City of Lakes — Waterfront penthouses, boutique havelis in Fatehpura & Shobhagpura.', count: '185+ Properties', price: '₹7,100/sq.ft', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
  { slug: 'kota', name: 'Kota', desc: 'Education & Riverfront Hub — Chambal riverfront villas, student flats & commercial space.', count: '120+ Properties', price: '₹4,100/sq.ft', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
  { slug: 'ajmer', name: 'Ajmer', desc: 'Spiritual Heritage — Ana Sagar lakefront residences, peaceful retirement bungalows.', count: '95+ Properties', price: '₹3,800/sq.ft', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
  { slug: 'bikaner', name: 'Bikaner', desc: 'Palatial Heritage — Carved sandstone havelis, residential plots & commercial hubs.', count: '75+ Properties', price: '₹3,400/sq.ft', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800' },
  { slug: 'bhilwara', name: 'Bhilwara', desc: 'Textile Hub — Commercial showrooms, industrial warehouses & modern gated communities.', count: '60+ Properties', price: '₹3,200/sq.ft', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800' },
  { slug: 'alwar', name: 'Alwar', desc: 'Delhi-NCR & Highway Corridor — High-growth industrial and luxury housing developments.', count: '85+ Properties', price: '₹3,600/sq.ft', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
];

export default function LocationsDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628]">
      {/* Hero Header */}
      <section className="bg-[#0A1628] text-white pt-28 sm:pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#C9A96E]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <span className="bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
            Rajasthan City Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            Explore Properties Across <span className="text-[#C9A96E]">Rajasthan</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Direct owner listings, verified RERA certificates, and zero-brokerage advisory across all major districts of Rajasthan.
          </p>
        </div>
      </section>

      {/* Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CITIES_DETAILS.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-serif font-bold text-xl">{city.name}</h3>
                  <span className="text-xs text-[#C9A96E] font-medium">{city.count}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">{city.desc}</p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">{city.price}</span>
                  <span className="text-[#C9A96E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View City <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All Other Districts */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#C9A96E]" />
            <h3 className="text-xl font-serif font-bold text-[#0A1628]">All Rajasthan Districts Covered</h3>
          </div>
          <p className="text-xs text-slate-500">
            Click any district to view verified real estate opportunities and site visit bookings.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {siteConfig.rajasthanCities.map((c) => (
              <Link
                key={c}
                href={`/locations/${c.toLowerCase()}`}
                className="px-4 py-2 bg-slate-50 border border-slate-200 hover:border-[#C9A96E] hover:bg-[#0A1628] hover:text-[#C9A96E] rounded-xl text-xs font-semibold text-slate-700 transition-colors"
              >
                📍 {c}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
