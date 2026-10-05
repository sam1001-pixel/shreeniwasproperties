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
  BadgeCheck,
  Info,
  Clock
} from 'lucide-react';
import ScheduleVisitModal from './schedule-visit-modal';

export default function PricingTariffSection({ showHeader = true }: { showHeader?: boolean }) {
  const [activeTab, setActiveTab] = useState<'visits' | 'brokerage'>('visits');
  const [selectedPackageForSchedule, setSelectedPackageForSchedule] = useState<any>(null);

  const phoneNumber = '+91 6376117833';
  const whatsappBase = 'https://wa.me/916376117833';

  const visitPackages = [
    {
      id: 'free',
      name: 'Discovery Visit',
      badge: 'Single Inspection',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      price: 'FREE',
      duration: '1 Site Visit',
      highlight: false,
      features: [
        'Detailed requirements analysis',
        '1 dedicated property visit',
        'Location & connectivity review',
        'Direct meeting with owner'
      ],
      note: 'Transitions to Standard Pass if >1 property visited on day 1.',
      ctaText: 'Book Free Visit',
      ctaWhatsapp: `${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20book%20a%20FREE%20Discovery%20Visit%20(₹0)`
    },
    {
      id: 'standard',
      name: 'Standard Pass',
      badge: 'Most Popular',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      price: '₹500',
      duration: 'Up to 3 Properties',
      validityText: 'No time limit or expiry',
      highlight: false,
      features: [
        'Dedicated visits for up to 3 properties',
        'No time limit validity (zero rush)',
        'Preliminary document verification',
        '100% adjusted against brokerage'
      ],
      note: '100% adjustable against final brokerage fee.',
      ctaText: 'Get Standard Pass (₹500)',
      ctaWhatsapp: `${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20book%20the%20Standard%20Pass%20(₹500%20for%203%20Visits)`
    },
    {
      id: 'premium',
      name: 'Premium Pass',
      badge: 'VIP Priority',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
      price: '₹999',
      duration: '6 Months Active Support',
      validityText: '6 months priority search across Rajasthan',
      highlight: true,
      features: [
        'Multiple visits matched to criteria',
        'VIP hunting & priority early access',
        'Active validity for 6 full months',
        'Direct owner negotiation support',
        '100% adjusted against brokerage'
      ],
      note: '100% adjustable against final brokerage fee.',
      ctaText: 'Get Premium Pass (₹999)',
      ctaWhatsapp: `${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20activate%20the%20Premium%20Pass%20(₹999%20VIP%20Visits)`
    }
  ];

  return (
    <section className="py-6 sm:py-8 px-4 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden" id="tariff-section">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-[#C9A96E]/5 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#0A1628]/5 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {showHeader && (
          <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A1628] text-[#C9A96E] text-[10px] font-bold uppercase tracking-wider mb-1.5 shadow-xs border border-[#C9A96E]/30">
              <ShieldCheck className="w-3 h-3 text-[#C9A96E]" />
              100% Transparent
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#0A1628] leading-tight">
              Transparent Pricing & Site Visit Packages
            </h2>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Zero hidden charges. Standardized rates & 100% adjustable site visit passes.
            </p>
          </div>
        )}

        {/* Tab Switcher - Ultra Compact Pill */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setActiveTab('visits')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'visits'
                  ? 'bg-[#0A1628] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Site Visit Passes</span>
            </button>
            <button
              onClick={() => setActiveTab('brokerage')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'brokerage'
                  ? 'bg-[#0A1628] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Percent className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Brokerage Tariffs</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SITE VISIT PASSES */}
        {activeTab === 'visits' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Why Visit Charges Banner - Streamlined Single-Row Notice */}
            <div className="bg-[#0A1628] text-white rounded-xl px-4 py-3 border border-white/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <span>Why Site Visit Charges?</span>
                    <span className="text-[10px] text-[#C9A96E] font-medium bg-[#C9A96E]/10 px-1.5 py-0.2 rounded border border-[#C9A96E]/20">Quality Guarantee</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-light mt-0.5 line-clamp-2 md:line-clamp-1">
                    Pass fees ensure dedicated, unhurried attention from licensed property advisors.
                  </p>
                </div>
              </div>

              {/* 100% Adjustable Tag */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Adjusted against final brokerage</span>
              </div>
            </div>

            {/* The 3 Pricing Cards - Compact Pro Max Bento Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-stretch">
              {visitPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-150 relative ${
                    pkg.highlight
                      ? 'bg-gradient-to-b from-white to-[#FDFBF7] border-2 border-[#C9A96E] shadow-sm'
                      : 'bg-white border border-slate-200/80 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Header: Name + Badge */}
                    <div className="flex items-center justify-between gap-1.5 mb-2">
                      <h3 className="text-sm font-serif font-bold text-[#0A1628]">
                        {pkg.name}
                      </h3>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${pkg.badgeColor}`}>
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Price & Duration */}
                    <div className="flex items-baseline gap-1.5 mb-1.5 pb-2 border-b border-slate-100">
                      <span className="text-xl sm:text-2xl font-serif font-extrabold text-[#0A1628] tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        / {pkg.duration}
                      </span>
                    </div>

                    {pkg.validityText && (
                      <p className="text-[10px] text-[#A27B36] font-medium mb-2.5 leading-tight flex items-center gap-1">
                        <Info className="w-3 h-3 shrink-0" /> {pkg.validityText}
                      </p>
                    )}

                    {/* Features List - Compact Bulleted */}
                    <ul className="space-y-1.5 mb-3 text-[11px] text-slate-600">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom: Note + Compact Button */}
                  <div className="space-y-2 pt-2.5 border-t border-slate-100">
                    <p className="text-[10px] text-slate-500 leading-tight italic truncate" title={pkg.note}>
                      {pkg.note}
                    </p>

                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedPackageForSchedule(pkg)}
                        className="w-full py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 hover:border-[#C9A96E] text-[#0A1628] hover:text-[#C9A96E] bg-slate-50 hover:bg-white transition-all cursor-pointer shadow-xs"
                      >
                        <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>Schedule Time Slot (Online)</span>
                      </button>

                      <a
                        href={pkg.ctaWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
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
                </div>
              ))}
            </div>

            {/* Terms & Guidelines - Ultra Clean 4-Item Compact Grid */}
            <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-1.5 mb-2.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <h3 className="text-xs font-bold text-[#0A1628] uppercase tracking-wider">
                  Important Guidelines & Policy
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px]">
                <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1 mb-0.5">
                    <span className="text-xs">💰</span> 100% Adjustable
                  </div>
                  <p className="text-slate-500 font-normal leading-relaxed">
                    Zero extra expense. Pass fee is fully deducted from your final brokerage invoice.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1 mb-0.5">
                    <span className="text-xs">📸</span> Photo/Video Policy
                  </div>
                  <p className="text-slate-500 font-normal leading-relaxed">
                    High-res media provided whenever owner permissions allow recording.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1 mb-0.5">
                    <span className="text-xs">⏰</span> Prior Appointment
                  </div>
                  <p className="text-slate-500 font-normal leading-relaxed">
                    Please schedule 2-4 hours in advance so our advisor can coordinate entry keys.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1 mb-0.5">
                    <span className="text-xs">🤝</span> In-Office Deals
                  </div>
                  <p className="text-slate-500 font-normal leading-relaxed">
                    Owner meetings, price negotiations, and agreements occur face-to-face in our office.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRANSPARENT BROKERAGE TARIFF */}
        {activeTab === 'brokerage' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Tariff Header Notice - Compact */}
            <div className="bg-[#0A1628] text-white rounded-xl px-4 py-3 border border-white/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-[#C9A96E] text-[10px] font-bold uppercase tracking-wider block">
                  Public Fee Schedule
                </span>
                <h3 className="text-xs sm:text-sm font-serif font-bold text-white">
                  Zero Hidden Charges • Fair Market Standards
                </h3>
              </div>
              <p className="text-slate-300 text-[11px] font-light">
                Standardized across Rajasthan with direct buyer-owner negotiations.
              </p>
            </div>

            {/* Brokerage Grid: Rental & Buy/Sell - Compact Modern Bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Rental Brokerage Card */}
              <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#0A1628] text-[#C9A96E] flex items-center justify-center shrink-0">
                      <Home className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C9A96E] uppercase tracking-wider block leading-none">
                        Rentals
                      </span>
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-[#0A1628]">
                        Rental Properties Tariff
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-[#0A1628] text-xs flex items-center gap-1">
                          <span>🏡</span> Residential Properties
                        </div>
                        <p className="text-[10px] text-slate-500">Flats, villas & independent houses</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-[#0A1628]">15 Days</span>
                        <span className="block text-[9px] text-slate-400">Rent amount</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-[#0A1628] text-xs flex items-center gap-1">
                          <span>🏢</span> Commercial Properties
                        </div>
                        <p className="text-[10px] text-slate-500">Offices, retail shops & showrooms</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-[#0A1628]">1 Month</span>
                        <span className="block text-[9px] text-slate-400">Rent amount</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>* Payable upon deal closure</span>
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
              <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#0A1628] text-[#C9A96E] flex items-center justify-center shrink-0">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C9A96E] uppercase tracking-wider block leading-none">
                        Sales & Purchases
                      </span>
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-[#0A1628]">
                        Sale & Purchase Commission
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-[#0A1628] text-xs flex items-center gap-1">
                          <span>📉</span> Up to ₹50 Lakhs
                        </div>
                        <p className="text-[10px] text-slate-500">Budget plots, apartments & houses</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-emerald-700">2%</span>
                        <span className="block text-[9px] text-slate-400">Deal value</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-[#0A1628] text-xs flex items-center gap-1">
                          <span>📈</span> Above ₹50 Lakhs
                        </div>
                        <p className="text-[10px] text-slate-500">Luxury villas, commercial land & estates</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-emerald-700">1%</span>
                        <span className="block text-[9px] text-slate-400">Deal value</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>* Agreement & paperwork included</span>
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

            {/* Core Commitments - 3 Compact Pillars */}
            <div className="bg-gradient-to-br from-[#0A1628] to-[#15253e] text-white rounded-xl p-3.5 sm:p-4 border border-white/10 shadow-xs">
              <div className="flex items-center gap-1.5 mb-3">
                <BadgeCheck className="w-4 h-4 text-[#C9A96E]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Our Core Commitments
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-md bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center font-bold mb-1.5">
                    <Scale className="w-3 h-3" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">100% Fair Dealing</h4>
                  <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                    Buyer and seller meet face-to-face for completely open rate discussions.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-1.5">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">Zero Hidden Costs</h4>
                  <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                    No unexpected fees or charges beyond the published and agreed rates.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-1.5">
                    <FileCheck className="w-3 h-3" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">Legal Guidance</h4>
                  <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                    Comprehensive assistance through rent agreements and registration deeds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Office Contact Bar - Slimline Bar */}
        <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <div className="w-7 h-7 rounded-lg bg-[#0A1628] text-[#C9A96E] flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-none">
                Shree Niwas Properties & Rentals • Jodhpur Head Office
              </div>
              <div className="text-[10px] text-slate-500 font-light mt-0.5">
                103, Jodhana Arcade, Bombay Motor Circle, Jodhpur, Rajasthan
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <a
              href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#C9A96E]" />
              <span>{phoneNumber}</span>
            </a>
            <a
              href={`${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20discuss%20a%20property`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-xs"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Schedule Visit Modal with 3 Time Variations */}
      <ScheduleVisitModal
        isOpen={!!selectedPackageForSchedule}
        onClose={() => setSelectedPackageForSchedule(null)}
        propertyTitle={selectedPackageForSchedule ? `${selectedPackageForSchedule.name} (${selectedPackageForSchedule.price})` : "Site Visit"}
        propertyLocation="Rajasthan Premier Properties"
        propertyPrice={selectedPackageForSchedule?.price}
      />
    </section>
  );
}
