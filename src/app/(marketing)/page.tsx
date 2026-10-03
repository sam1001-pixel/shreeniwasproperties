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
  const [price, setPrice] = useState(10000000); // 1 Crore default
  const [downPayment, setDownPayment] = useState(20); // 20%
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
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 max-w-4xl mx-auto my-16">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-serif text-[#0A1628] font-semibold mb-2">EMI / Mortgage Calculator</h3>
        <p className="text-slate-500">Plan your property purchase with our interactive calculator</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          {/* Property Price */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Property Price</label>
              <span className="font-semibold text-[#0A1628]">{formatCurrency(price)}</span>
            </div>
            <input 
              type="range" min="1000000" max="50000000" step="100000" 
              value={price} onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>₹10L</span><span>₹5Cr+</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Down Payment ({downPayment}%)</label>
              <span className="font-semibold text-[#0A1628]">{formatCurrency((price * downPayment) / 100)}</span>
            </div>
            <input 
              type="range" min="10" max="50" step="1" 
              value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Interest Rate</label>
              <span className="font-semibold text-[#0A1628]">{interestRate}%</span>
            </div>
            <input 
              type="range" min="7" max="12" step="0.1" 
              value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
            />
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Loan Tenure</label>
              <span className="font-semibold text-[#0A1628]">{tenure} Years</span>
            </div>
            <input 
              type="range" min="5" max="30" step="1" 
              value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
            />
          </div>
        </div>

        <div className="bg-[#FDFBF7] p-8 rounded-xl border border-[#C9A96E]/20 flex flex-col justify-center">
          <div className="text-center mb-6">
            <p className="text-sm text-slate-500 font-medium mb-1">Your Monthly EMI</p>
            <p className="text-4xl font-serif text-[#0A1628] font-bold">{formatCurrency(emi)}</p>
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
              <span className="text-slate-600 font-medium">Total Amount Payable</span>
              <span className="font-bold text-[#0A1628]">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <div className="mt-8">
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
    // In a real app, you'd show a toast here
    alert("Saved to favorites!");
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
              Rajasthan's #1 Premium Real Estate Network
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-6"
            >
              Find Your Perfect <br/>Property in <span className="text-[#C9A96E]">Rajasthan</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 font-light mb-8 max-w-2xl"
            >
              Explore 1,200+ verified rentals, luxury villas, commercial spaces & plots in Jaipur, Jodhpur, Udaipur, Kota, Ajmer & Bikaner.
            </motion.p>
          </div>

          {/* Interactive Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-4 shadow-2xl max-w-5xl"
          >
            <div className="flex gap-2 border-b border-slate-100 pb-4 mb-4">
              {[
                { id: 'rent', label: 'Rent', icon: Home },
                { id: 'buy', label: 'Buy', icon: Building2 },
                { id: 'commercial', label: 'Commercial', icon: Briefcase }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSearchTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input type="text" placeholder="e.g. Jaipur, Udaipur" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500">Property Type</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 bg-white appearance-none">
                  <option>Luxury Villas</option>
                  <option>Apartments</option>
                  <option>Heritage Havelis</option>
                  <option>Plots</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500">BHK / Size</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 bg-white appearance-none">
                  <option>3 BHK</option>
                  <option>4+ BHK</option>
                  <option>2 BHK</option>
                </select>
              </div>
              <Link href="/properties" className="w-full">
                <button className="w-full bg-[#C9A96E] hover:bg-[#b5955a] text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#C9A96E]/20">
                  <Search className="w-5 h-5" />
                  Search Properties
                </button>
              </Link>
            </div>
            
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-slate-500 font-medium">Popular:</span>
              {['Jaipur Apartments', 'Udaipur Lake Villas', 'Jodhpur Commercial'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Explore Rajasthan Cities Interactive Bento Grid */}
      <section className="py-24 px-4 container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-[#0A1628] mb-4">Explore Real Estate by City</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Discover premium properties across the majestic cities of Rajasthan, each offering a unique lifestyle and investment opportunity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
          {/* Jaipur */}
          <Link href="/properties?city=jaipur" className="group relative overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 shadow-lg block">
            <Image src="https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop" alt="Jaipur" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-3xl font-serif text-white font-bold mb-2">Jaipur</h3>
              <p className="text-[#C9A96E] font-medium flex items-center gap-2">
                Pink City <span className="text-white/60">• 450+ Properties</span>
              </p>
            </div>
          </Link>
          
          {/* Udaipur */}
          <Link href="/properties?city=udaipur" className="group relative overflow-hidden rounded-2xl md:col-span-1 md:row-span-1 shadow-lg block h-[250px] md:h-auto">
            <Image src="https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=2000&auto=format&fit=crop" alt="Udaipur" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-serif text-white font-bold">Udaipur</h3>
              <p className="text-[#C9A96E] text-sm">City of Lakes • 180+ Props</p>
            </div>
          </Link>

          {/* Jodhpur */}
          <Link href="/properties?city=jodhpur" className="group relative overflow-hidden rounded-2xl md:col-span-1 md:row-span-1 shadow-lg block h-[250px] md:h-auto">
            <Image src="https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=2000&auto=format&fit=crop" alt="Jodhpur" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-serif text-white font-bold">Jodhpur</h3>
              <p className="text-[#C9A96E] text-sm">Blue City • 210+ Props</p>
            </div>
          </Link>

          {/* Kota */}
          <Link href="/properties?city=kota" className="group relative overflow-hidden rounded-2xl md:col-span-2 md:row-span-1 shadow-lg block h-[250px] md:h-auto">
            <Image src="https://images.unsplash.com/photo-1629813580520-20f5c15ab8b1?q=80&w=2000&auto=format&fit=crop" alt="Kota" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-serif text-white font-bold">Kota</h3>
              <p className="text-[#C9A96E] text-sm">Educational Hub • 120+ Props</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Featured Rajasthan Properties Carousel */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#0A1628] mb-4">Featured Properties</h2>
              <p className="text-slate-500 max-w-2xl">Handpicked premium real estate offering unmatched luxury and heritage.</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Double Bezel Pattern */}
                <div className="p-2">
                  <div className="relative h-64 rounded-xl overflow-hidden">
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
                
                <div className="p-6 pt-4">
                  <div className="text-[#C9A96E] font-medium text-sm mb-2">Luxury Villa • Jaipur</div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628] mb-2 line-clamp-1">The Royal Heritage Residency</h3>
                  <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
                    <span className="flex items-center gap-1"><Home className="w-4 h-4"/> 4 BHK</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> Vaishali Nagar</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Starting from</span>
                      <span className="text-2xl font-bold text-[#0A1628]">₹3.5 Cr</span>
                    </div>
                    <Link href={`/properties/${item}`}>
                      <button className="flex items-center gap-2 text-sm font-medium text-[#0A1628] hover:text-[#C9A96E] transition-colors">
                        View Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/properties">
              <button className="px-8 py-4 rounded-full border-2 border-[#0A1628] text-[#0A1628] font-medium hover:bg-[#0A1628] hover:text-white transition-colors">
                View All Properties
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Interactive EMI / Mortgage Calculator */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto">
          <EMICalculator />
        </div>
      </section>

      {/* 5. "Why Choose Shreeniwas Properties" */}
      <section className="py-24 px-4 bg-[#0A1628] text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">Why Choose Shreeniwas Properties</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Setting the gold standard for real estate across Rajasthan with transparency, trust, and luxury.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "100% Verified Listings", desc: "Every property undergoes a rigorous 50-point physical verification process." },
              { icon: CheckCircle2, title: "RERA Legal Clearance", desc: "Complete transparency with RERA approved projects and title checks." },
              { icon: UserCheck, title: "Dedicated Manager", desc: "Your personal property expert guiding you from search to registry." },
              { icon: PhoneCall, title: "Direct Owner Connect", desc: "Zero hidden brokerage on premium direct-to-owner properties." }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-[#C9A96E]/20 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#C9A96E]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Client Testimonials */}
      <section className="py-24 px-4 bg-[#FDFBF7]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#0A1628] mb-4">What Our Clients Say</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Trusted by thousands of families and businesses across Rajasthan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rajendra Singh", city: "Jaipur", role: "Property Buyer", text: "Shreeniwas Properties made finding our dream home in Vaishali Nagar so effortless. Their transparent process and RERA approved listings gave us complete peace of mind." },
              { name: "Ananya Sharma", city: "Udaipur", role: "Villa Owner", text: "The dedicated property manager was a game changer. They handled everything from site visits to the final registry. Truly a premium service." },
              { name: "Vikram Rathore", city: "Jodhpur", role: "Commercial Investor", text: "Best real estate network in Rajasthan. Their insights into commercial properties in Jodhpur helped me make a highly profitable investment." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-[#C9A96E] text-[#C9A96E]" />)}
                </div>
                <p className="text-slate-600 mb-8 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                    <Image src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop&sig=${i}`} alt={testimonial.name} width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1628]">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role} • {testimonial.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Real Estate Insights / Blog */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#0A1628] mb-4">Real Estate Insights</h2>
              <p className="text-slate-500">Stay updated with the latest trends in Rajasthan's property market.</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-[#0A1628] font-medium hover:text-[#C9A96E] transition-colors">
              View All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Top 5 Up-and-Coming Neighborhoods in Jaipur for 2024", category: "Market Trends", read: "5 min read" },
              { title: "A Complete Guide to Buying Heritage Properties in Udaipur", category: "Buying Guide", read: "8 min read" },
              { title: "Commercial Real Estate Boom in Jodhpur: What You Need to Know", category: "Investment", read: "6 min read" }
            ].map((blog, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-60 rounded-2xl overflow-hidden mb-6">
                  <Image src={`https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=800&auto=format&fit=crop&sig=${i+10}`} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span>Oct 12, 2024</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{blog.read}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] mb-3 group-hover:text-[#C9A96E] transition-colors">{blog.title}</h3>
                <Link href="#" className="text-sm font-medium text-[#C9A96E] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Interactive FAQ Accordion */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-[#0A1628] mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know about buying or renting in Rajasthan.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "What documents are required to buy property in Rajasthan?", a: "Standard documents include Pan Card, Aadhaar Card, Address Proof, Passport size photos, and Bank Statements. NRIs require additional FEMA compliance documents." },
              { q: "Are all listed properties RERA approved?", a: "Yes, we exclusively list properties that are either RERA approved or legally vetted pre-RERA constructions to ensure 100% secure investments." },
              { q: "Do you provide assistance with home loans?", a: "Absolutely! We have tie-ups with major national banks (SBI, HDFC, ICICI) to provide seamless, pre-approved loan processing for our clients." },
              { q: "What cities do you currently operate in?", a: "We have a strong presence across Jaipur, Jodhpur, Udaipur, Kota, Ajmer, and Bikaner, covering major residential and commercial hubs." }
            ].map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                >
                  <span className="font-semibold text-lg text-[#0A1628]">{faq.q}</span>
                  {faqOpen === index ? <ChevronUp className="text-[#C9A96E]" /> : <ChevronDown className="text-slate-400" />}
                </button>
                <AnimatePresence>
                  {faqOpen === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-white px-6"
                    >
                      <p className="py-6 text-slate-600 leading-relaxed border-t border-slate-100">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
