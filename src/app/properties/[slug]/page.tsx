'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, MapPin, Share2, Heart, CheckCircle2, 
  BedDouble, Bath, Square, Car, Shield, Wifi, 
  Trees, Phone, MessageSquare, Building2, ImageIcon, Video, Home, Crown, CreditCard, ChevronLeft,
  Clock, ShieldCheck, Zap, Compass, Navigation, School, Stethoscope, Plane, Train, Sparkles, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROPERTY = {
  title: 'The Royal Heritage Residency Villa',
  location: 'Vaishali Nagar, Jaipur',
  city: 'Jaipur',
  price: '₹3.5 Cr',
  pricePerSqft: '₹10,937/sq.ft',
  status: 'Ready to Move',
  type: 'Luxury Villa',
  bhk: '4 BHK',
  area: '3,200 sq.ft',
  carpetArea: '2,850 sq.ft',
  baths: 4,
  balconies: 3,
  furnishing: 'Fully Furnished',
  floor: 'G+2 Villa',
  parking: '2 Covered Slots',
  facing: 'East (Vastu Compliant)',
  age: '0-1 Years',
  available: 'Immediate',
  reraApproved: true,
  zeroBrokerage: true,
  description: 'Experience unparalleled luxury in this exquisite 4 BHK villa located in the heart of Vaishali Nagar, Jaipur. Featuring premium Italian marble flooring, state-of-the-art modular kitchen, double-height ceilings, and private terrace lounge overlooking the Pink City landscape.',
  amenities: [
    { name: 'Private Elevator', icon: Building2 },
    { name: 'Infinity Pool', icon: Bath },
    { name: 'Fitness Gym', icon: Shield },
    { name: 'Covered Parking', icon: Car },
    { name: '100% Power Backup', icon: Zap },
    { name: '24x7 Smart Security', icon: ShieldCheck },
    { name: 'Landscaped Garden', icon: Trees },
    { name: 'High-Speed Wi-Fi', icon: Wifi },
  ],
  nearbyHighlights: [
    { name: 'Jaipur International Airport', distance: '12.5 km', icon: Plane },
    { name: 'Jaipur Junction Railway Station', distance: '5.2 km', icon: Train },
    { name: 'DPS & Tagored Public School', distance: '1.2 km', icon: School },
    { name: 'Fortis & Eternal Hospital', distance: '2.4 km', icon: Stethoscope },
    { name: 'Mansarovar Metro Station', distance: '1.8 km', icon: Navigation },
  ],
  images: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80&w=800',
  ]
};

export default function PropertyDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const nextImage = () => setCurrentImageIndex(p => (p + 1) % PROPERTY.images.length);
  const prevImage = () => setCurrentImageIndex(p => (p - 1 + PROPERTY.images.length) % PROPERTY.images.length);

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'photos', label: 'Photos' },
    { id: 'locality', label: 'Locality & Distance' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'agent', label: 'Agent & Visit' },
  ];

  const handleVIPVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookModalOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] pb-32 lg:pb-24">
      {/* Mobile Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200">
        <Link href="/properties" className="p-2 bg-slate-100 rounded-full shadow-sm"><ChevronLeft className="w-5 h-5"/></Link>
        <div className="flex gap-2">
          <button className="p-2 bg-slate-100 rounded-full shadow-sm"><Share2 className="w-4 h-4"/></button>
          <button onClick={() => setIsSaved(!isSaved)} className="p-2 bg-slate-100 rounded-full shadow-sm">
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`}/>
          </button>
        </div>
      </div>

      {/* Desktop Breadcrumbs */}
      <div className="hidden md:block bg-white border-b border-slate-200 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-6 text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#C9A96E]">Home</Link> <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/properties" className="hover:text-[#C9A96E]">Properties</Link> <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0A1628]">{PROPERTY.title}</span>
        </div>
      </div>

      {/* 99acres Sticky Section Navbar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 md:top-16 z-30 shadow-sm hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-6 overflow-x-auto no-scrollbar py-3 text-xs font-bold uppercase tracking-wider">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setActiveSection(s.id);
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`whitespace-nowrap transition-all cursor-pointer ${
                activeSection === s.id ? 'text-[#C9A96E] border-b-2 border-[#C9A96E] pb-1' : 'text-slate-500 hover:text-[#0A1628]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:px-6 md:py-8 pt-16 md:pt-8">
        
        {/* Mobile Photo Carousel */}
        <div className="block md:hidden relative w-full h-[320px] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img 
              key={currentImageIndex}
              src={PROPERTY.images[currentImageIndex]}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest backdrop-blur-sm">
            {currentImageIndex + 1} / {PROPERTY.images.length}
          </div>
        </div>

        {/* Desktop 5-Photo Grid */}
        <div id="photos" className="hidden md:grid grid-cols-4 gap-2 rounded-3xl overflow-hidden h-[420px] lg:h-[480px] mb-8 relative border border-slate-200 shadow-md">
          <div className="col-span-2 h-full relative group">
            <img src={PROPERTY.images[0]} alt="Main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer" />
            <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> RERA Approved Listing
            </span>
          </div>
          <div className="grid grid-rows-2 gap-2 h-full">
            <img src={PROPERTY.images[1]} alt="1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            <img src={PROPERTY.images[2]} alt="2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
          </div>
          <div className="grid grid-rows-2 gap-2 h-full">
            <img src={PROPERTY.images[3]} alt="3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            <img src={PROPERTY.images[4]} alt="4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
          </div>
        </div>

        {/* Property Header Banner */}
        <div id="overview" className="px-4 md:px-0 py-6 md:py-0 mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Listing
              </span>
              {PROPERTY.zeroBrokerage && (
                <span className="px-3 py-1 bg-[#0A1628] text-[#C9A96E] text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> 0% Brokerage
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#0A1628] mb-2">{PROPERTY.title}</h1>
            <p className="text-slate-600 flex items-center gap-1.5 text-sm md:text-base">
              <MapPin className="w-4 h-4 text-[#C9A96E]" /> {PROPERTY.location} • <span className="text-emerald-700 font-semibold">{PROPERTY.status}</span>
            </p>
          </div>

          <div className="flex md:flex-col items-baseline md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t border-slate-200 md:border-none">
            <span className="text-xs text-slate-400 block font-semibold uppercase">Asking Price</span>
            <span className="text-3xl font-serif font-bold text-[#0A1628]">{PROPERTY.price}</span>
            <span className="text-xs font-mono text-emerald-700 mt-0.5">{PROPERTY.pricePerSqft}</span>
          </div>
        </div>

        {/* 99acres Key Spec Cards */}
        <div className="px-4 md:px-0 mb-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { l: 'Property Type', v: PROPERTY.type },
            { l: 'BHK Unit', v: PROPERTY.bhk },
            { l: 'Super Area', v: PROPERTY.area },
            { l: 'Carpet Area', v: PROPERTY.carpetArea },
            { l: 'Facing', v: PROPERTY.facing },
            { l: 'Furnishing', v: PROPERTY.furnishing }
          ].map((s, i) => (
            <div key={i} className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{s.l}</span>
              <p className="font-bold text-sm text-[#0A1628]">{s.v}</p>
            </div>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 px-4 md:px-0">
          
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#0A1628] mb-3">About Property</h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">{PROPERTY.description}</p>
            </section>

            {/* Locality & Distance Matrix (99acres Signature Feature) */}
            <section id="locality" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Navigation className="w-5 h-5 text-[#C9A96E]" />
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#0A1628]">Locality & Nearby Highlights</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROPERTY.nearbyHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-[#FDFBF7] rounded-2xl border border-slate-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0A1628]/5 flex items-center justify-center text-[#0A1628]">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-[#C9A96E] bg-[#C9A96E]/10 px-2.5 py-1 rounded-full">{item.distance}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities Grid */}
            <section id="amenities" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#0A1628] mb-6">Property Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {PROPERTY.amenities.map((am, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <div className="p-2 bg-[#C9A96E]/10 rounded-xl text-[#C9A96E]">
                      <am.icon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-xs text-slate-800">{am.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Desktop Sidebar */}
          <div id="agent" className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* VIP Visit Card */}
              <div className="bg-[#0A1628] text-white p-6 sm:p-8 rounded-3xl border border-[#C9A96E]/40 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#C9A96E]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-5 h-5 text-[#C9A96E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C9A96E]">Guaranteed VIP Site Visit</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Book Priority Visit (₹499)</h3>
                <p className="text-xs text-slate-300 font-light mb-6">
                  Guaranteed dedicated agent cab pick-up, physical walkthrough & legal paperwork verification.
                </p>

                <button 
                  onClick={() => setIsBookModalOpen(true)}
                  className="w-full py-4 bg-[#C9A96E] hover:bg-[#b59760] text-[#0A1628] font-extrabold text-sm rounded-2xl transition-all shadow-xl shadow-[#C9A96E]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" /> Schedule Visit (₹499)
                </button>
              </div>
              
              {/* Verified Agent Badge Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden relative border-2 border-[#C9A96E]">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Agent" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-[#0A1628]">Rajesh Rathore</p>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-slate-500">Shreeniwas Senior Advisor</p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                      <Clock className="w-3 h-3" /> Responds in 15 mins
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a href="tel:+919876543210" className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-[#0A1628] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Phone className="w-4 h-4" /> Call Agent
                  </a>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <MessageSquare className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* VIP Site Visit Booking Modal */}
      <AnimatePresence>
        {isBookModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative"
            >
              <button 
                onClick={() => setIsBookModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0A1628] flex items-center justify-center mx-auto mb-3 border border-[#C9A96E]/40 text-[#C9A96E]">
                  <Crown className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0A1628]">Schedule VIP Site Visit</h3>
                <p className="text-xs text-slate-500 mt-1">₹499 Priority Walkthrough Fee (Fully Refundable on Booking)</p>
              </div>

              {bookingSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-emerald-800 space-y-2">
                  <Check className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base">Site Visit Requested!</h4>
                  <p className="text-xs text-emerald-700">Our Senior Agent will call you within 15 minutes to confirm cab timing.</p>
                </div>
              ) : (
                <form onSubmit={handleVIPVisitSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Your Full Name</label>
                    <input type="text" required placeholder="Enter full name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#C9A96E]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone Number (WhatsApp)</label>
                    <input type="tel" required placeholder="+91 9876543210" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#C9A96E]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Preferred Date</label>
                    <input type="date" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#C9A96E]" />
                  </div>

                  <button type="submit" className="w-full py-4 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                    <CreditCard className="w-4 h-4" /> Pay ₹499 & Confirm Visit
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile Bottom Contact Bar */}
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Price</span>
            <span className="text-lg font-bold text-[#0A1628] leading-none">{PROPERTY.price}</span>
          </div>
          <div className="flex gap-2 flex-1 justify-end">
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex-1 max-w-[130px] py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5"/> WhatsApp
            </a>
            <button onClick={() => setIsBookModalOpen(true)} className="flex-1 max-w-[150px] py-2.5 bg-[#0A1628] text-[#C9A96E] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-[#C9A96E]/30">
              <Crown className="w-3.5 h-3.5"/> Visit ₹499
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
