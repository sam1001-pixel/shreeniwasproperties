'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Calendar, 
  Building2, 
  Home, 
  Briefcase, 
  Scale, 
  HelpCircle, 
  PhoneCall, 
  MessageSquare, 
  ArrowRight, 
  Check, 
  AlertCircle,
  FileCheck,
  Percent,
  Search,
  BadgeCheck,
  ChevronDown
} from 'lucide-react';

export default function PricingTariffSection({ showHeader = true }: { showHeader?: boolean }) {
  const [activeTab, setActiveTab] = useState<'visits' | 'brokerage'>('visits');
  const [selectedPass, setSelectedPass] = useState<'free' | 'standard' | 'premium'>('premium');

  const phoneNumber = '+91 6376117833';
  const whatsappBase = 'https://wa.me/916376117833';

  const visitPackages = [
    {
      id: 'free',
      name: 'Discovery Visit',
      badge: 'First Look',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      price: 'FREE',
      priceNumeric: '₹0',
      duration: 'Single Visit',
      highlight: false,
      features: [
        'आपकी रिक्वायरमेंट की डिटेल एनालिसिस',
        '1 प्रॉपर्टी की डेडिकेटेड साइट विजिट',
        'लोकेशन व कनेक्टिविटी इनसाइट्स',
        'प्रॉपर्टी ओनर से डायरेक्ट मीटिंग'
      ],
      note: 'शर्त: यदि पहली विजिट में ही 1 से अधिक प्रॉपर्टी देखी जाती हैं, तो यह विजिट (Standard Pass) में बदल जाएगी।',
      ctaText: 'Book Free Discovery Visit',
      ctaWhatsapp: `${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20book%20a%20FREE%20Discovery%20Visit%20(₹0)`
    },
    {
      id: 'standard',
      name: 'Standard Pass',
      badge: 'Popular for Tenants',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      price: '₹500',
      duration: 'No Time Limit',
      validityHindi: 'कोई एक्सपायरी नहीं, हम तसल्ली से आपके लिए बेस्ट प्रॉपर्टी खोजेंगे',
      highlight: false,
      features: [
        'अगली 3 प्रॉपर्टीज की डेडिकेटेड साइट विजिट',
        'No Time Limit वैलिडिटी (कोई जल्दबाजी नहीं)',
        'प्रॉपर्टी डॉक्यूमेंट्स प्रारंभिक जांच',
        'डील होने पर 100% ब्रोकरेज में एडजस्ट'
      ],
      note: '100% Adjustable: डील फाइनल होने पर यह पूरा ₹500 आपकी ब्रोकरेज फीस से माइनस कर दिया जाएगा।',
      ctaText: 'Get Standard Pass (₹500)',
      ctaWhatsapp: `${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20book%20the%20Standard%20Pass%20(₹500%20for%203%20Visits)`
    },
    {
      id: 'premium',
      name: 'Premium Pass',
      badge: 'Best Value • Most Popular',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      price: '₹999',
      duration: '6 Months Validity',
      validityHindi: 'अगले 6 महीनों तक हम आपके लिए सही प्रॉपर्टी की तलाश जारी रखेंगे',
      highlight: true,
      features: [
        'आपकी जरूरत के हिसाब से मल्टीपल प्रॉपर्टी विजिट्स',
        'प्रीमियम प्रॉपर्टी हंटिंग सर्विस व प्रायोरिटी अलॉटमेंट',
        '6 Months तक एक्टिव वैलिडिटी',
        'ओनर के साथ ट्रांसपेरेंट नेगोशिएशन सपोर्ट',
        'डील होने पर 100% ब्रोकरेज फीस में एडजस्ट'
      ],
      note: 'डील होने पर यह पूरा ₹999 आपकी फाइनल ब्रोकरेज फीस में से माइनस (Adjust) हो जाएगा।',
      ctaText: 'Get Premium Pass (₹999)',
      ctaWhatsapp: `${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20activate%20the%20Premium%20Pass%20(₹999%20VIP%20Visits)`
    }
  ];

  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-white via-[#FDFBF7] to-white relative overflow-hidden" id="tariff-section">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A1628]/5 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1628] text-[#C9A96E] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-[#C9A96E]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
              100% Transparent Real Estate
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0A1628] leading-tight">
              पारदर्शी दरें एवं साइट विजिट पैकेजेस
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-light">
              नो हिडन चार्जेस। 100% ट्रांसपेरेंट और फेयर डील — क्योंकि आपका भरोसा ही हमारी असली कमाई है।
            </p>
          </div>
        )}

        {/* Tab Switcher: UI/UX Pro Max Toggle */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-inner">
            <button
              onClick={() => setActiveTab('visits')}
              className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'visits'
                  ? 'bg-[#0A1628] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#C9A96E]" />
              <span>'विजिट चार्ज क्यों?' & Passes</span>
            </button>
            <button
              onClick={() => setActiveTab('brokerage')}
              className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'brokerage'
                  ? 'bg-[#0A1628] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Percent className="w-4 h-4 text-[#C9A96E]" />
              <span>ब्रोकरेज टैरिफ (Tariff)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SITE VISIT PASSES & WHY VISIT CHARGES */}
        {activeTab === 'visits' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Why Visit Charge Philosophy Card */}
            <div className="bg-[#0A1628] text-white rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-4xl">
                <div className="flex items-center gap-2 text-[#C9A96E] font-bold text-xs uppercase tracking-widest mb-2">
                  <Sparkles className="w-4 h-4" />
                  श्री Niwas Properties & Rentals
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                  'विजिट चार्ज क्यों?'
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                  हमारा फोकस सिर्फ आपको प्रॉपर्टी घुमाना नहीं, बल्कि आपकी जरूरत के हिसाब से आपके लिए <strong className="text-white font-medium">'सही प्रॉपर्टी'</strong> ढूंढना है। हमारी डेडिकेटेड टीम के समय और मेहनत को केवल सीरियस बायर्स एवं किरायेदारों तक सीमित रखने के लिए हमने ये पारदर्शी (Transparent) पैकेजेस बनाए हैं।
                </p>

                {/* 100% Adjustable Guarantee Callout */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-emerald-300 text-sm font-bold">
                      100% Adjustable Guarantee (यह कोई अतिरिक्त खर्चा नहीं है!)
                    </h4>
                    <p className="text-slate-300 text-xs mt-0.5 font-light">
                      प्रॉपर्टी की डील फाइनल होने पर यह पूरा अमाउंट आपकी फाइनल ब्रोकरेज फीस से माइनस (Adjust) कर दिया जाएगा।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The 3 Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {visitPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.highlight
                      ? 'bg-gradient-to-b from-white to-[#FDFBF7] border-2 border-[#C9A96E] shadow-2xl scale-[1.02] md:-translate-y-2'
                      : 'bg-white border border-slate-200/90 shadow-md hover:shadow-xl'
                  }`}
                >
                  {/* Top Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border ${pkg.badgeColor}`}>
                        {pkg.badge}
                      </span>
                      {pkg.highlight && (
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A96E] bg-[#0A1628] px-2.5 py-0.5 rounded-md">
                          Best Value
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A1628] mb-1">
                      {pkg.name}
                    </h3>
                    
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A1628]">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        / {pkg.duration}
                      </span>
                    </div>

                    {pkg.validityHindi && (
                      <p className="text-xs text-[#C9A96E] font-medium bg-[#0A1628]/5 p-2 rounded-lg mb-4">
                        *वैलिडिटी: {pkg.validityHindi}
                      </p>
                    )}

                    {/* Features List */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100 mb-6">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Note & Actions */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <p className="text-[11px] text-slate-500 leading-tight italic">
                      {pkg.note}
                    </p>

                    <a
                      href={pkg.ctaWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                        pkg.highlight
                          ? 'bg-[#0A1628] text-[#C9A96E] hover:bg-[#14233c] hover:shadow-lg'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{pkg.ctaText}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Terms & Conditions Accordion / Highlight (नियम एवं शर्तें) */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#0A1628]">
                  नियम एवं शर्तें (Important Guidelines)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1.5 mb-1">
                    <span className="text-emerald-600">💰</span> 100% Adjustable Amount
                  </div>
                  <p className="text-slate-600 font-light leading-relaxed">
                    यह फीस कोई अतिरिक्त खर्चा नहीं है! प्रॉपर्टी की डील फाइनल होने पर यह पूरा अमाउंट आपकी ब्रोकरेज फीस से माइनस (Adjust) कर दिया जाएगा।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1.5 mb-1">
                    <span className="text-blue-600">📸</span> फोटो / वीडियो पॉलिसी
                  </div>
                  <p className="text-slate-600 font-light leading-relaxed">
                    हम आपको हर प्रॉपर्टी के फोटो/वीडियो देने की पूरी कोशिश करेंगे। हालांकि, यदि किसी प्रॉपर्टी का ओनर फोटो या वीडियो लेने की अनुमति नहीं देता है, तो हम मीडिया प्रोवाइड करने में असमर्थ होंगे।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1.5 mb-1">
                    <span className="text-amber-600">⏰</span> प्रायर अपॉइंटमेंट (2-4 घंटे पहले)
                  </div>
                  <p className="text-slate-600 font-light leading-relaxed">
                    हमारी टीम आपको अपना 100% समय दे सके, इसके लिए कृपया साइट विजिट का प्लान कम से कम 2-4 घंटे पहले बुक करें।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-[#0A1628] flex items-center gap-1.5 mb-1">
                    <span className="text-purple-600">🤝</span> ट्रांसपेरेंट इन-ऑफिस डील
                  </div>
                  <p className="text-slate-600 font-light leading-relaxed">
                    प्रॉपर्टी पसंद आने पर ओनर के साथ नेगोशिएशन (भाव-ताव) और मीटिंग पूरी पारदर्शिता के साथ हमारे जोधपुर ऑफिस में ही की जाएगी।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRANSPARENT BROKERAGE TARIFF */}
        {activeTab === 'brokerage' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Tariff Header Box */}
            <div className="bg-[#0A1628] text-white rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl">
              <div className="max-w-3xl">
                <span className="text-[#C9A96E] text-xs font-bold uppercase tracking-wider block mb-1">
                  Transparent Brokerage Tariff
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                  नो हिडन चार्जेस। 100% ट्रांसपेरेंट और फेयर डील
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light">
                  क्योंकि आपका भरोसा ही हमारी असली कमाई है। हमारा शुल्क ढांचा पूरी तरह स्पष्ट और सार्वजनिक है।
                </p>
              </div>
            </div>

            {/* Brokerage Grid: Rental & Buy/Sell */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Rental Brokerage Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-md hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0A1628] text-[#C9A96E] flex items-center justify-center shrink-0">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C9A96E] uppercase tracking-wider">
                      Rental Brokerage
                    </span>
                    <h4 className="text-lg sm:text-xl font-serif font-bold text-[#0A1628]">
                      किराये की संपत्तियों के लिए शुल्क
                    </h4>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-[#0A1628] text-sm sm:text-base">
                        <span>🏡</span> रेजिडेंशियल (Residential)
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        फ्लैट्स, विला, और इंडिपेंडेंट हाउस के लिए
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base sm:text-lg font-serif font-extrabold text-[#0A1628]">
                        15 दिन
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">का किराया</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-[#0A1628] text-sm sm:text-base">
                        <span>🏢</span> कमर्शियल (Commercial)
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        ऑफिस स्पेस, शॉप्स, और बड़े शोरूम्स के लिए
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base sm:text-lg font-serif font-extrabold text-[#0A1628]">
                        1 महीना
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">का किराया</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>* डील फाइनल होने पर देय</span>
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
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-md hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0A1628] text-[#C9A96E] flex items-center justify-center shrink-0">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C9A96E] uppercase tracking-wider">
                      Buy & Sell Brokerage
                    </span>
                    <h4 className="text-lg sm:text-xl font-serif font-bold text-[#0A1628]">
                      खरीद और बिक्री के लिए कमीशन
                    </h4>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-[#0A1628] text-sm sm:text-base">
                        <span>📉</span> ₹50 लाख तक की प्रॉपर्टी पर
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        बजट व मिडरेंज प्लॉट्स, फ्लैट्स एवं मकान
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base sm:text-lg font-serif font-extrabold text-emerald-700">
                        2%
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">(Deal Value का)</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-[#0A1628] text-sm sm:text-base">
                        <span>📈</span> ₹50 लाख से ऊपर की प्रॉपर्टी पर
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        लग्जरी विला, हवेली, बड़े प्लॉट्स व कमर्शियल जमीन
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base sm:text-lg font-serif font-extrabold text-emerald-700">
                        1%
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">(Deal Value का)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>* एग्रीमेंट व रजिस्ट्री प्रक्रिया में पूर्ण सहयोग</span>
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

            {/* Our Commitment: 3 Pillars Card */}
            <div className="bg-gradient-to-br from-[#0A1628] to-[#15253e] text-white rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <BadgeCheck className="w-6 h-6 text-[#C9A96E]" />
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                  हमारी कमिटमेंट (Our Core Commitment)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center font-bold mb-3">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    100% पारदर्शिता (Fair Deal)
                  </h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    हम दोनों पार्टियों (बायर और सेलर) को आमने-सामने बिठाकर एकदम ट्रांसपेरेंट डील करवाते हैं।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    नो हिडन चार्जेस (Zero Hidden Cost)
                  </h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    ऊपर दिए गए स्लैब के अलावा कोई भी छिपा हुआ खर्च या एक्स्ट्रा चार्ज नहीं लिया जाएगा।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-3">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    लीगल सपोर्ट (Legal Support)
                  </h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    डील फाइनल होने पर एग्रीमेंट और बेसिक पेपरवर्क में हमारी टीम आपकी पूरी सहायता करेगी।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Office Contact Bar (From Poster Footer) */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#0A1628] text-[#C9A96E] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Shree Niwas Properties & Rentals • जोधपुर ऑफिस
              </div>
              <div className="text-xs text-slate-500 font-light">
                103, Jodhana Arcade, Bombay Motor Circle, Jodhpur
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <a
              href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>{phoneNumber}</span>
            </a>
            <a
              href={`${whatsappBase}?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20discuss%20a%20property`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
