"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  Home,
  Building2,
  Briefcase,
  IndianRupee,
  CheckCircle2,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  UserCheck,
  PhoneCall
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// EMI Calculator Component
const EMICalculator = () => {
  const [price, setPrice] = useState(10000000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const principal = price - (price * downPayment) / 100;
  const r = interestRate / 12 / 100;
  const n = tenure * 12;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmount = emi * n;
  const totalInterest = totalAmount - principal;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100 max-w-4xl mx-auto my-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-serif text-[#0A1628] font-semibold mb-2">EMI / Mortgage Calculator</h3>
        <p className="text-slate-500">Plan your property purchase with our interactive calculator</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-12">
        <div className="space-y-6 w-full md:w-1/2">
          {/* Sliders */}
          {[
            { label: 'Property Price', val: price, set: setPrice, min: 1000000, max: 50000000, step: 100000, display: formatCurrency(price) },
            { label: 'Down Payment (%)', val: downPayment, set: setDownPayment, min: 10, max: 50, step: 1, display: `${downPayment}% (${formatCurrency((price * downPayment) / 100)})` },
            { label: 'Interest Rate', val: interestRate, set: setInterestRate, min: 7, max: 12, step: 0.1, display: `${interestRate}%` },
            { label: 'Loan Tenure', val: tenure, set: setTenure, min: 5, max: 30, step: 1, display: `${tenure} Years` }
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">{item.label}</label>
                <span className="font-semibold text-[#0A1628]">{item.display}</span>
              </div>
              <input 
                type="range" min={item.min} max={item.max} step={item.step} 
                value={item.val} onChange={(e) => item.set(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C9A96E] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#C9A96E] [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
          ))}
        </div>

        <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-xl border border-[#C9A96E]/20 flex flex-col justify-center w-full md:w-1/2">
          <div className="text-center mb-6">
            <p className="text-sm text-slate-500 font-medium mb-1">Your Monthly EMI</p>
            <p className="text-3xl sm:text-4xl font-serif text-[#0A1628] font-bold">{formatCurrency(emi)}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-200">
              <span className="text-slate-600">Principal Amount</span>
              <span className="font-semibold">{formatCurrency(principal)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-200">
              <span className="text-slate-600">Total Interest</span>
              <span className="font-semibold">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-600 font-medium">Total Payable</span>
              <span className="font-bold text-[#0A1628]">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2">
            <div className="w-full h-4 flex rounded-full overflow-hidden">
              <div className="bg-[#0A1628]" style={{ width: `${(principal/totalAmount)*100}%` }}></div>
              <div className="bg-[#C9A96E]" style={{ width: `${(totalInterest/totalAmount)*100}%` }}></div>
            </div>
            <div className="flex justify-between text-xs mt-2 font-medium">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#0A1628]"></span> Principal</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#C9A96E]"></span> Interest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MarketingPage() {
  const [searchTab, setSearchTab] = useState<'rent' | 'buy' | 'commercial'>('buy');
  const [propFilter, setPropFilter] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#0A1628]">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1599661559886-41b80c541b00?q=80&w=2069&auto=format&fit=crop" 
            alt="Rajasthan Palace Architecture" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/70 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="max-w-3xl mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/30 text-[#C9A96E] font-medium text-sm mb-6 backdrop-blur-sm"
            >
              <Star className="w-4 h-4 fill-current" />
              Rajasthan's #1 Premium Real Estate
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-7xl leading-tight font-serif text-white font-bold mb-6"
            >
              Find Your Perfect <br/>Property in <span className="text-[#C9A96E]">Rajasthan</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-300 font-light mb-8 max-w-2xl"
            >
              Explore verified rentals, luxury villas, commercial spaces & plots in Jaipur, Jodhpur, Udaipur & more.
            </motion.p>
          </div>

          {/* Interactive Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-4 shadow-2xl max-w-5xl"
          >
            {/* Search Tabs */}
            <div className="flex gap-2 border-b border-slate-100 pb-4 mb-4 overflow-x-auto no-scrollbar">
              {[
                { id: 'rent', label: 'Rent', icon: Home },
                { id: 'buy', label: 'Buy', icon: Building2 },
                { id: 'commercial', label: 'Commercial', icon: Briefcase }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSearchTab(tab.id as any)}
                  className={`flex items-center justify-center flex-1 sm:flex-none gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all ${
                    searchTab === tab.id 
                      ? 'bg-[#0A1628] text-white shadow-md' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Vertical stacked on mobile, grid on desktop */}
            <div className="flex flex-col md:grid md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium text-slate-500">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input type="text" placeholder="e.g. Jaipur, Udaipur" className="w-full pl-10 pr-4 py-4 md:py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 text-base" />
                </div>
              </div>
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium text-slate-500">Property Type</label>
                <select className="w-full px-4 py-4 md:py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 bg-white appearance-none text-base">
                  <option>Luxury Villas</option>
                  <option>Apartments</option>
                  <option>Heritage Havelis</option>
                  <option>Plots</option>
                </select>
              </div>
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium text-slate-500">BHK / Size</label>
                <select className="w-full px-4 py-4 md:py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 bg-white appearance-none text-base">
                  <option>3 BHK</option>
                  <option>4+ BHK</option>
                  <option>2 BHK</option>
                </select>
              </div>
              <Link href="/properties" className="w-full">
                <button className="w-full bg-[#C9A96E] hover:bg-[#b5955a] text-white font-medium py-4 md:py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#C9A96E]/20 text-lg md:text-base">
                  <Search className="w-5 h-5" />
                  Search Properties
                </button>
              </Link>
            </div>
            
            <div className="mt-6">
              <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 items-center">
                <span className="text-slate-500 font-medium whitespace-nowrap">Popular:</span>
                {['Jaipur Apartments', 'Udaipur Villas', 'Jodhpur Commercial', 'Kota Plots'].map(tag => (
                  <span key={tag} className="px-4 py-2 sm:px-3 sm:py-1 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap cursor-pointer hover:bg-slate-200 transition-colors text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1628] mb-4">Featured Properties</h2>
              <p className="text-slate-500 max-w-2xl">Handpicked premium real estate offering unmatched luxury and heritage.</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
              {['All', 'Luxury Villas', 'Modern Apartments', 'Commercial', 'Heritage Havelis'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setPropFilter(tab)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    propFilter === tab 
                      ? 'bg-[#0A1628] text-white' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Double Bezel Pattern */}
                <div className="p-2 sm:p-3">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                    <Image 
                      src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop&sig=${item}`} 
                      alt="Property" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-white/90 backdrop-blur text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-600" /> RERA Approved
                      </span>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(item)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart className={`w-5 h-5 transition-colors ${favorites.includes(item) ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 pt-2 sm:pt-4">
                  <div className="text-[#C9A96E] font-medium text-sm mb-2">Luxury Villa • Jaipur</div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628] mb-3 line-clamp-1">The Royal Heritage Residency</h3>
                  
                  {/* Mobile specs bar */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-4">
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md"><Home className="w-3.5 h-3.5"/> 4 BHK</span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md"><MapPin className="w-3.5 h-3.5"/> Vaishali Nagar</span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">3,200 sq.ft</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-xs text-slate-400 block mb-0.5">Starting from</span>
                      <span className="text-xl sm:text-2xl font-bold text-[#0A1628]">₹3.5 Cr</span>
                    </div>
                    <Link href={`/properties/${item}`}>
                      <button className="flex items-center gap-2 text-sm font-medium text-[#0A1628] hover:text-[#C9A96E] transition-colors bg-slate-50 px-4 py-2 rounded-lg">
                        Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/properties">
              <button className="px-8 py-4 rounded-full border-2 border-[#0A1628] text-[#0A1628] font-medium hover:bg-[#0A1628] hover:text-white transition-colors w-full sm:w-auto">
                View All Properties
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive EMI / Mortgage Calculator */}
      <section className="py-16 sm:py-24 px-4 bg-slate-50">
        <div className="container mx-auto">
          <EMICalculator />
        </div>
      </section>
      
      {/* Footer / End */}
    </main>
  );
}
