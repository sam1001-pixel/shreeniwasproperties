'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Building2, 
  Home, 
  Briefcase, 
  Scale, 
  PhoneCall, 
  MessageSquare, 
  Check, 
  AlertCircle,
  FileCheck,
  Percent,
  BadgeCheck
} from 'lucide-react';

export default function PricingTariffSection({ showHeader = true }: { showHeader?: boolean }) {
  const [activeTab, setActiveTab] = useState<'visits' | 'brokerage'>('visits');

  const phoneNumber = '+91 6376117833';
  const whatsappBase = 'https://wa.me/916376117833';

  const visitPackages = [
    {
      id: 'free',
      name: 'Discovery Visit',
      badge: 'First Look',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      price: 'FREE',
      duration: 'Single Visit',
      highlight: false,
      features: [
        'Detailed requirements analysis',
        '1 dedicated property site visit',
        'Location & connectivity insights',
        'Direct meeting with property owner'
      ],
      note: 'Note: If more than 1 property is visited on day 1, it transitions to Standard Pass.',
      ctaText: 'Book Free Discovery Visit',
      ctaWhatsapp: `${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20book%20a%20FREE%20Discovery%20Visit%20(₹0)`
    },
    {
      id: 'standard',
      name: 'Standard Pass',
      badge: 'Popular for Tenants',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      price: '₹500',
      duration: 'No Time Limit',
      validityText: 'No expiry — take your time finding the right home or office',
      highlight: false,
      features: [
        'Dedicated site visits for up to 3 properties',
        'No time limit validity (zero rush)',
        'Preliminary document verification',
        '100% adjusted against final brokerage fee'
      ],
      note: '100% Adjustable: Deducted entirely from your final brokerage on deal closure.',
      ctaText: 'Get Standard Pass (₹500)',
      ctaWhatsapp: `${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20book%20the%20Standard%20Pass%20(₹500%20for%203%20Visits)`
    },
    {
      id: 'premium',
      name: 'Premium Pass',
      badge: 'Best Value • Priority',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
      price: '₹999',
      duration: '6 Months Validity',
      validityText: 'Continuous 6 months personalized property hunting across Rajasthan',
      highlight: true,
      features: [
        'Multiple guided visits matched to requirements',
        'VIP priority hunting & early access to listings',
        'Active validity for 6 full months',
        'Direct transparent owner negotiation support',
        '100% adjusted against final brokerage fee'
      ],
      note: '100% Adjustable: Deducted entirely from your final brokerage on deal closure.',
      ctaText: 'Get Premium Pass (₹999)',
      ctaWhatsapp: `${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20activate%20the%20Premium%20Pass%20(₹999%20VIP%20Visits)`
    }
  ];

  return (
    <section className="py-8 sm:py-10 px-4 bg-gradient-to-b from-white via-[#FDFBF7] to-white relative overflow-hidden" id="tariff-section">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0A1628]/5 rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {showHeader && (
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0A1628] text-[#C9A96E] text-[11px] font-bold uppercase tracking-wider mb-2 shadow-sm border border-[#C9A96E]/30">
              <ShieldCheck className="w-3 h-3 text-[#C9A96E]" />
              100% Transparent Real Estate
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A1628] leading-tight">
              Transparent Pricing & Site Visit Packages
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 font-light">
              Zero hidden charges. 100% transparent and fair deals — your trust is our greatest asset.
            </p>
          </div>
        )}

        {/* Tab Switcher: Compact Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200/80 shadow-inner">
            <button
              onClick={() => setActiveTab('visits')}
              className={`flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'visits'
                  ? 'bg-[#0A1628] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Site Visit Passes</span>
            </button>
            <button
              onClick={() => setActiveTab('brokerage')}
              className={`flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'brokerage'
                  ? 'bg-[#0A1628] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Percent className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Brokerage Tariffs</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SITE VISIT PASSES & WHY VISIT CHARGES */}
        {activeTab === 'visits' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Why Visit Charge Philosophy Card - Compact */}
            <div className="bg-[#0A1628] text-white rounded-xl p-4 sm:p-5 border border-white/10 shadow-md relative overflow-hidden">
              <div className="relative z-10 max-w-4xl">
                <div className="flex items-center gap-1.5 text-[#C9A96E] font-bold text-[11px] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Shreeniwas Properties & Rentals
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-1">
                  Why Site Visit Charges?
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed font-light mb-3">
                  Our goal is not just touring properties, but matching you with the <strong className="text-white font-medium">right property</strong> suited to your exact needs and budget. To ensure our dedicated advisors invest focused time on genuine buyers and tenants, we offer transparent site visit passes.
                </p>

                {/* 100% Adjustable Guarantee Callout - Compact */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2.5 sm:p-3 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-emerald-300 text-xs font-bold">
                      100% Adjustable Guarantee (Zero Extra Cost)
                    </h4>
                    <p className="text-slate-300 text-[11px] font-light">
                      Upon deal finalization, the entire pass amount is deducted directly from your final brokerage fee.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The 3 Pricing Cards - Compact & Small */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visitPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 relative ${
                    pkg.highlight
                      ? 'bg-gradient-to-b from-white to-[#FDFBF7] border-2 border-[#C9A96E] shadow-md md:-translate-y-1'
                      : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Top Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pkg.badgeColor}`}>
                        {pkg.badge}
                      </span>
                      {pkg.highlight && (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#C9A96E] bg-[#0A1628] px-2 py-0.5 rounded">
                          Best Value
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#0A1628] mb-0.5">
                      {pkg.name}
                    </h3>
                    
                    <div className="flex items-baseline gap-1.5 mb-1.5">
                      <span className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A1628]">
                        {pkg.price}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        / {pkg.duration}
                      </span>
                    </div>

                    {pkg.validityText && (
                      <p className="text-[11px] text-[#C9A96E] font-medium bg-[#0A1628]/5 px-2 py-1 rounded mb-3 leading-snug">
                        *Validity: {pkg.validityText}
                      </p>
                    )}

                    {/* Features List */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 mb-4">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Note & Actions */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-100">
                    <p className="text-[10px] text-slate-500 leading-tight italic">
                      {pkg.note}
                    </p>

                    <a
                      href={pkg.ctaWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                        pkg.highlight
                          ? 'bg-[#0A1628] text-[#C9A96E] hover:bg-[#14233c]'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{pkg.ctaText}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Terms & Conditions Accordion / Highlight (Important Guidelines) - Compact */}
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-1.5 mb-3.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-serif font-bold text-[#0A1628]">
                  Important Guidelines & Policies
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1 mb-0.5">
                    <span className="text-emerald-600">💰</span> 100% Adjustable Amount
                  </div>
                  <p className="text-slate-600 font-light leading-relaxed text-[11px]">
                    This is zero extra expense. Upon deal completion, 100% of the pass fee is deducted directly from your final brokerage fee.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1 mb-0.5">
                    <span className="text-blue-600">📸</span> Photo & Video Policy
                  </div>
                  <p className="text-slate-600 font-light leading-relaxed text-[11px]">
                    We provide high-resolution photos/videos whenever permitted by the owner. If an owner restricts photography, media cannot be shared.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1 mb-0.5">
                    <span className="text-amber-600">⏰</span> Prior Appointment (2-4 Hours)
                  </div>
                  <p className="text-slate-600 font-light leading-relaxed text-[11px]">
                    To ensure our dedicated property manager gives you undivided attention, please schedule site visits 2 to 4 hours in advance.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1 mb-0.5">
                    <span className="text-purple-600">🤝</span> Transparent In-Office Deals
                  </div>
                  <p className="text-slate-600 font-light leading-relaxed text-[11px]">
                    Price negotiations, documentation, and agreement sign-offs are conducted face-to-face with complete transparency at our Jodhpur Head Office.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRANSPARENT BROKERAGE TARIFF */}
        {activeTab === 'brokerage' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Tariff Header Box - Compact */}
            <div className="bg-[#0A1628] text-white rounded-xl p-4 sm:p-5 border border-white/10 shadow-md">
              <div className="max-w-2xl">
                <span className="text-[#C9A96E] text-[11px] font-bold uppercase tracking-wider block mb-0.5">
                  Transparent Brokerage Tariffs
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-1">
                  Zero Hidden Charges. 100% Transparent & Fair Deals
                </h3>
                <p className="text-slate-300 text-xs font-light">
                  Because your trust is our ultimate reward. Our fee schedule is completely clear, standardized, and public.
                </p>
              </div>
            </div>

            {/* Brokerage Grid: Rental & Buy/Sell - Compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rental Brokerage Card */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#0A1628] text-[#C9A96E] flex items-center justify-center shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#C9A96E] uppercase tracking-wider">
                      Rental Brokerage
                    </span>
                    <h4 className="text-sm sm:text-base font-serif font-bold text-[#0A1628]">
                      Rental Properties Tariff
                    </h4>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1 font-bold text-[#0A1628] text-xs sm:text-sm">
                        <span>🏡</span> Residential Properties
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Flats, villas, and independent houses
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm sm:text-base font-serif font-extrabold text-[#0A1628]">
                        15 Days
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">Rent Amount</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1 font-bold text-[#0A1628] text-xs sm:text-sm">
                        <span>🏢</span> Commercial Properties
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Office spaces, retail shops, and showrooms
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm sm:text-base font-serif font-extrabold text-[#0A1628]">
                        1 Month
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">Rent Amount</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>* Payable upon final deal closure</span>
                  <a 
                    href={`${whatsappBase}?text=Namaste%20Shree%20Niwas%2C%20I%20have%20a%20rental%20brokerage%20query`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#C9A96E] font-bold hover:underline"
                  >
                    Enquire on WhatsApp &rarr;
                  </a>
                </div>
              </div>

              {/* Buy & Sell Brokerage Card */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#0A1628] text-[#C9A96E] flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#C9A96E] uppercase tracking-wider">
                      Buy & Sell Brokerage
                    </span>
                    <h4 className="text-sm sm:text-base font-serif font-bold text-[#0A1628]">
                      Sale & Purchase Commission
                    </h4>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1 font-bold text-[#0A1628] text-xs sm:text-sm">
                        <span>📉</span> Up to ₹50 Lakhs
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Budget & mid-range plots, flats, and homes
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm sm:text-base font-serif font-extrabold text-emerald-700">
                        2%
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">(Of Deal Value)</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1 font-bold text-[#0A1628] text-xs sm:text-sm">
                        <span>📈</span> Above ₹50 Lakhs
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Luxury villas, estates, large plots & commercial land
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm sm:text-base font-serif font-extrabold text-emerald-700">
                        1%
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">(Of Deal Value)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>* Complete agreement & registry guidance included</span>
                  <a 
                    href={`${whatsappBase}?text=Namaste%20Shree%20Niwas%2C%20I%20have%20a%20buy%2Fsell%20property%20query`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#C9A96E] font-bold hover:underline"
                  >
                    Enquire on WhatsApp &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Our Commitment: 3 Pillars Card - Compact */}
            <div className="bg-gradient-to-br from-[#0A1628] to-[#15253e] text-white rounded-xl p-4 sm:p-5 border border-white/10 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <BadgeCheck className="w-5 h-5 text-[#C9A96E]" />
                <h3 className="text-sm sm:text-base font-serif font-bold text-white">
                  Our Core Commitments
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-md bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center font-bold mb-2">
                    <Scale className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">
                    100% Fair Dealing
                  </h4>
                  <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                    Buyer and seller meet face-to-face in our office for fully transparent pricing discussions.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">
                    Zero Hidden Costs
                  </h4>
                  <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                    No hidden extras or unexpected fees beyond the published and agreed tariff rates.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-2">
                    <FileCheck className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">
                    Legal & Paperwork Guidance
                  </h4>
                  <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                    Our team provides thorough guidance through rental agreements, deeds, and registration paperwork.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Office Contact Bar - Compact */}
        <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-[#0A1628] text-[#C9A96E] flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Shree Niwas Properties & Rentals • Jodhpur Head Office
              </div>
              <div className="text-[11px] text-slate-500 font-light">
                103, Jodhana Arcade, Bombay Motor Circle, Jodhpur, Rajasthan
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <a
              href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#C9A96E]" />
              <span>{phoneNumber}</span>
            </a>
            <a
              href={`${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20discuss%20a%20property`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
