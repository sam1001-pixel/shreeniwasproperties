'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, MapPin, Share2, Heart, CheckCircle2, 
  BedDouble, Bath, Square, Car, Shield, Wifi, 
  Trees, Phone, MessageSquare, Building2, ImageIcon, Video, Home, Crown, CreditCard, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROPERTY = {
  title: 'Royal Heritage Villa',
  location: 'Vaishali Nagar, Jaipur',
  price: '₹2.5 Cr',
  status: 'Negotiable',
  type: 'Villa',
  bhk: '4 BHK',
  area: '3,200 sq.ft',
  baths: 4,
  balconies: 2,
  furnishing: 'Fully Furnished',
  floor: 'G+2',
  parking: '2 Covered',
  facing: 'East',
  age: '0-1 Years',
  available: 'Immediate',
  description: 'Experience unparalleled luxury in this exquisite 4 BHK villa located in the heart of Vaishali Nagar. Featuring premium Italian marble flooring, state-of-the-art modular kitchen, and double-height ceilings that exude grandeur.',
  amenities: [
    { name: 'Lift', icon: Building2 },
    { name: 'Pool', icon: Bath },
    { name: 'Gym', icon: Shield },
    { name: 'Parking', icon: Car },
    { name: 'Backup', icon: Shield },
    { name: 'Security', icon: Shield },
    { name: 'Garden', icon: Trees },
    { name: 'Wi-Fi', icon: Wifi },
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
  const [activeTab, setActiveTab] = useState<'photos' | 'tour'>('photos');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Swipe handlers for mobile carousel
  const nextImage = () => setCurrentImageIndex(p => (p + 1) % PROPERTY.images.length);
  const prevImage = () => setCurrentImageIndex(p => (p - 1 + PROPERTY.images.length) % PROPERTY.images.length);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] pb-32 lg:pb-24">
      {/* Mobile Back Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <Link href="/properties" className="p-2 bg-white rounded-full shadow-sm"><ChevronLeft className="w-5 h-5"/></Link>
        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-full shadow-sm"><Share2 className="w-5 h-5"/></button>
          <button className="p-2 bg-white rounded-full shadow-sm"><Heart className="w-5 h-5"/></button>
        </div>
      </div>

      {/* Breadcrumbs (Desktop) */}
      <div className="hidden md:block bg-white border-b border-gray-200 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-6 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#C9A96E]">Home</Link> <ChevronRight className="w-4 h-4" />
          <Link href="/properties" className="hover:text-[#C9A96E]">Properties</Link> <ChevronRight className="w-4 h-4" />
          <span className="text-[#0A1628] font-medium">{PROPERTY.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:px-6 md:py-8 pt-16 md:pt-8">
        
        {/* Mobile Swipeable Carousel */}
        <div className="block md:hidden relative w-full h-[350px] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img 
              key={currentImageIndex}
              src={PROPERTY.images[currentImageIndex]}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -50 || velocity.x < -500) nextImage();
                else if (offset.x > 50 || velocity.x > 500) prevImage();
              }}
            />
          </AnimatePresence>
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium tracking-widest backdrop-blur-sm">
            {currentImageIndex + 1} / {PROPERTY.images.length}
          </div>
        </div>

        {/* Desktop 5-Photo Collage */}
        <div className="hidden md:grid grid-cols-4 gap-2 rounded-2xl overflow-hidden h-[400px] lg:h-[500px] mb-8 relative">
          <div className="col-span-2 h-full">
            <img src={PROPERTY.images[0]} alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
          </div>
          <div className="grid grid-rows-2 gap-2 h-full">
            <img src={PROPERTY.images[1]} alt="1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            <img src={PROPERTY.images[2]} alt="2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
          </div>
          <div className="grid grid-rows-2 gap-2 h-full">
            <img src={PROPERTY.images[3]} alt="3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            <img src={PROPERTY.images[4]} alt="4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
          </div>
          <button className="absolute bottom-4 right-4 px-4 py-2 bg-white text-[#0A1628] font-medium rounded-lg shadow-lg flex items-center gap-2">
            View All Photos
          </button>
        </div>

        {/* Header Content */}
        <div className="px-4 md:px-0 py-6 md:py-0 mb-6 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-4xl font-serif font-bold">{PROPERTY.title}</h1>
              <span className="px-2 py-0.5 bg-[#C9A96E] text-white text-[10px] md:text-xs font-semibold rounded-full">RERA</span>
            </div>
            <p className="text-gray-600 flex items-center gap-1.5 text-sm md:text-lg">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#C9A96E]" /> {PROPERTY.location}
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-3">
            <span className="text-3xl font-bold text-[#0A1628]">{PROPERTY.price}</span>
            <div className="flex gap-2">
              <button className="p-2 border rounded-full"><Share2 className="w-5 h-5" /></button>
              <button className="p-2 border rounded-full"><Heart className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 px-4 md:px-0">
          
          <div className="lg:col-span-2 space-y-10">
            {/* Key Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { l: 'Type', v: PROPERTY.type },
                { l: 'BHK', v: PROPERTY.bhk },
                { l: 'Area', v: PROPERTY.area },
                { l: 'Furnishing', v: PROPERTY.furnishing }
              ].map((s, i) => (
                <div key={i} className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                  <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">{s.l}</span>
                  <p className="font-semibold text-sm md:text-lg">{s.v}</p>
                </div>
              ))}
            </div>

            <section>
              <h2 className="text-xl md:text-2xl font-serif mb-3">Description</h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{PROPERTY.description}</p>
            </section>

            {/* Amenities Mobile Grid 2/3 cols */}
            <section>
              <h2 className="text-xl md:text-2xl font-serif mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {PROPERTY.amenities.map((am, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl text-center md:text-left">
                    <div className="p-2 bg-[#C9A96E]/10 rounded-lg text-[#C9A96E]">
                      <am.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-xs md:text-sm">{am.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#C9A96E]/30 shadow-xl">
                <h3 className="text-xl font-serif font-bold flex items-center gap-2 mb-4"><Crown className="w-5 h-5 text-[#C9A96E]"/> VIP Site Visit</h3>
                <p className="text-sm text-gray-600 mb-6">Book a personalized property tour with our senior experts.</p>
                <button className="w-full py-4 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#0A1628]/90">
                  <CreditCard className="w-5 h-5" /> Book VIP Visit (₹499)
                </button>
              </div>
              
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Agent" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold">Rajesh Kumar</p>
                  <p className="text-xs text-gray-500">Senior Consultant</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Mobile Bottom Contact Bar */}
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-3 pb-safe shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase font-semibold">Price</span>
            <span className="text-lg font-bold text-[#0A1628] leading-none">{PROPERTY.price}</span>
          </div>
          <div className="flex gap-2 flex-1 justify-end">
            <button className="flex-1 max-w-[140px] py-2.5 md:py-3 bg-green-500 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-1.5">
              <MessageSquare className="w-4 h-4"/> WhatsApp
            </button>
            <button className="flex-1 max-w-[160px] py-2.5 md:py-3 bg-[#0A1628] text-[#C9A96E] rounded-xl font-medium text-sm flex items-center justify-center gap-1.5">
              <Crown className="w-4 h-4"/> Book Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
