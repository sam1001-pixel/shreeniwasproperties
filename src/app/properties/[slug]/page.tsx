'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, MapPin, Share2, Heart, CheckCircle2, 
  BedDouble, Bath, Square, Car, Shield, Wifi, 
  Trees, Phone, MessageSquare, Calendar, Building2,
  Image as ImageIcon, Video, Home, X, Crown, CreditCard, Clock, Map
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
    { name: 'Swimming Pool', icon: Bath },
    { name: 'Gymnasium', icon: Shield },
    { name: 'Car Parking', icon: Car },
    { name: 'Power Backup', icon: Shield },
    { name: '24/7 Security', icon: Shield },
    { name: 'Landscaped Garden', icon: Trees },
    { name: 'Wi-Fi/Broadband', icon: Wifi },
  ],
  images: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80&w=800',
  ]
};

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState<'photos' | 'tour' | 'plan' | 'video'>('photos');
  const [emiAmount, setEmiAmount] = useState(150000);
  const [emiInterest, setEmiInterest] = useState(8.5);
  const [emiYears, setEmiYears] = useState(20);
  
  const [inquiryMode, setInquiryMode] = useState<'free' | 'vip'>('free');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] pb-24">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-6 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#C9A96E]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/properties" className="hover:text-[#C9A96E]">Properties</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Rajasthan</span>
          <ChevronRight className="w-4 h-4" />
          <span>Jaipur</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#0A1628] font-medium">{PROPERTY.title}</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-serif font-bold">{PROPERTY.title}</h1>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
              <span className="px-3 py-1 bg-[#C9A96E] text-white text-xs font-semibold rounded-full">
                RERA Approved
              </span>
            </div>
            <p className="text-gray-600 flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-[#C9A96E]" /> {PROPERTY.location}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#0A1628]">{PROPERTY.price}</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {PROPERTY.status}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-full hover:bg-red-50 transition-colors group">
                <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Airbnb Style Image Gallery */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden h-[400px] md:h-[500px] relative">
          <div className="md:col-span-2 h-full">
            <img src={PROPERTY.images[0]} alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <img src={PROPERTY.images[1]} alt="Interior 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            <img src={PROPERTY.images[2]} alt="Interior 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <img src={PROPERTY.images[3]} alt="Interior 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            <img src={PROPERTY.images[4]} alt="Interior 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
          </div>
          
          <button className="absolute bottom-4 right-4 px-4 py-2 bg-white text-[#0A1628] font-medium rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-50">
            <ImageIcon className="w-4 h-4" /> View All 15 Photos
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column (Details) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Media Tabs */}
          <div>
            <div className="flex gap-4 border-b border-gray-200 mb-6">
              {[
                { id: 'photos', label: 'Photos', icon: ImageIcon },
                { id: 'tour', label: '360° Tour', icon: Home },
                { id: 'plan', label: 'Floor Plan', icon: Square },
                { id: 'video', label: 'Video', icon: Video },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 font-medium flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id ? 'border-[#C9A96E] text-[#C9A96E]' : 'border-transparent text-gray-500 hover:text-[#0A1628]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </div>
            
            {activeTab === 'tour' && (
              <div className="w-full h-[400px] bg-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300">
                <Home className="w-12 h-12 mb-2 opacity-50" />
                <p>Interactive 360° Virtual Tour Container</p>
                <button className="mt-4 px-6 py-2 bg-[#0A1628] text-white rounded-lg">Start Tour</button>
              </div>
            )}
          </div>

          {/* Key Specs */}
          <section>
            <h2 className="text-2xl font-serif mb-6">Property Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Type</span>
                <p className="font-semibold text-lg">{PROPERTY.type}</p>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                <span className="text-xs text-gray-500 uppercase tracking-wider">BHK</span>
                <p className="font-semibold text-lg">{PROPERTY.bhk}</p>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Area</span>
                <p className="font-semibold text-lg">{PROPERTY.area}</p>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Furnishing</span>
                <p className="font-semibold text-lg">{PROPERTY.furnishing}</p>
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-2xl font-serif mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {PROPERTY.description}
            </p>
          </section>

          {/* Detailed Specs Grid */}
          <section>
            <h2 className="text-2xl font-serif mb-6">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {[
                { label: 'Bathrooms', value: PROPERTY.baths },
                { label: 'Balconies', value: PROPERTY.balconies },
                { label: 'Floor', value: PROPERTY.floor },
                { label: 'Parking', value: PROPERTY.parking },
                { label: 'Facing', value: PROPERTY.facing },
                { label: 'Age of Property', value: PROPERTY.age },
                { label: 'Availability', value: PROPERTY.available },
              ].map((spec, i) => (
                <div key={i} className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">{spec.label}</span>
                  <span className="font-medium text-[#0A1628]">{spec.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="text-2xl font-serif mb-6">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {PROPERTY.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-3 bg-[#C9A96E]/10 rounded-lg text-[#C9A96E]">
                    <amenity.icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium">{amenity.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* EMI Calculator */}
          <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-serif mb-6">EMI Calculator</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Loan Amount (₹)</label>
                  <span className="font-bold">₹{(emiAmount * 100000).toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range" min="10" max="500" value={emiAmount} 
                  onChange={(e) => setEmiAmount(Number(e.target.value))}
                  className="w-full accent-[#C9A96E]"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                  <input 
                    type="number" value={emiInterest} 
                    onChange={(e) => setEmiInterest(Number(e.target.value))}
                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Years)</label>
                  <input 
                    type="number" value={emiYears} 
                    onChange={(e) => setEmiYears(Number(e.target.value))}
                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>
              </div>
              <div className="p-4 bg-[#0A1628]/5 rounded-lg flex justify-between items-center">
                <span className="font-medium text-gray-700">Estimated EMI</span>
                <span className="text-2xl font-bold text-[#C9A96E]">
                  ₹{Math.round(((emiAmount * 100000) * (emiInterest/100/12) * Math.pow(1 + emiInterest/100/12, emiYears*12)) / (Math.pow(1 + emiInterest/100/12, emiYears*12) - 1)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </section>

          {/* Nearby Places */}
          <section>
            <h2 className="text-2xl font-serif mb-6">Nearby Places</h2>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <table className="w-full">
                <tbody>
                  {[
                    { place: 'Delhi Public School', type: 'School', dist: '1.2 km' },
                    { place: 'Fortis Hospital', type: 'Hospital', dist: '2.5 km' },
                    { place: 'Elements Mall', type: 'Shopping', dist: '3.0 km' },
                    { place: 'Jaipur International Airport', type: 'Airport', dist: '12.0 km' },
                    { place: 'Jaipur Railway Station', type: 'Transit', dist: '6.5 km' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.place}</td>
                      <td className="p-4 text-gray-500 text-sm">{row.type}</td>
                      <td className="p-4 text-right font-semibold text-[#0A1628]">{row.dist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            
            {/* Lead Form - Inquiry Options */}
            <div className="bg-white p-1 rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
              <div className="flex bg-gray-50 p-1 rounded-t-xl">
                <button 
                  onClick={() => setInquiryMode('free')}
                  className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${inquiryMode === 'free' ? 'bg-white shadow-sm text-[#0A1628]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Free Inquiry
                </button>
                <button 
                  onClick={() => setInquiryMode('vip')}
                  className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${inquiryMode === 'vip' ? 'bg-[#0A1628] text-[#C9A96E] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Crown className="w-4 h-4" /> VIP Visit
                </button>
              </div>

              <div className="p-5">
                {inquiryMode === 'free' ? (
                  <form className="space-y-4">
                    <h3 className="text-lg font-serif font-bold text-[#0A1628] mb-4">Request Information</h3>
                    <div>
                      <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" />
                    </div>
                    <div>
                      <input type="tel" placeholder="Phone Number" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" />
                    </div>
                    <div>
                      <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" />
                    </div>
                    <div>
                      <textarea placeholder="I am interested in this property..." rows={3} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] resize-none"></textarea>
                    </div>
                    <button type="button" className="w-full py-4 bg-[#C9A96E] text-white font-bold rounded-lg hover:bg-[#b5955a] transition-colors shadow-lg shadow-[#C9A96E]/20">
                      Request Callback
                    </button>
                    
                    <div className="my-6 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-200 after:h-px after:flex-1 after:bg-gray-200">
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">OR</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 py-3 bg-[#0A1628] text-white rounded-lg hover:bg-[#0A1628]/90 transition-colors">
                        <Phone className="w-4 h-4" /> Call Now
                      </button>
                      <button className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        <MessageSquare className="w-4 h-4" /> WhatsApp
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded-xl p-4 mb-2">
                      <h3 className="text-lg font-serif font-bold text-[#0A1628] flex items-center gap-2 mb-2">
                        <Crown className="w-5 h-5 text-[#C9A96E]" /> Premium Site Visit
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">Book a personalized property tour with our senior experts.</p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#C9A96E] mt-0.5" /> Dedicated agent escort
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#C9A96E] mt-0.5" /> Doorstep pickup & drop
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#C9A96E] mt-0.5" /> Direct owner meeting
                        </li>
                      </ul>
                      <div className="flex items-center justify-between pt-3 border-t border-[#C9A96E]/20">
                        <span className="text-sm font-medium text-gray-600">Booking Fee</span>
                        <span className="text-xl font-bold text-[#0A1628]">₹499</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setIsBookingModalOpen(true)}
                      className="w-full py-4 bg-[#0A1628] text-[#C9A96E] font-bold rounded-lg hover:bg-[#0A1628]/90 transition-colors shadow-xl flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" /> Book VIP Visit Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Agent Profile */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Agent" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="font-bold text-lg">Rajesh Kumar</p>
                <p className="text-sm text-gray-500 mb-1">Senior Property Consultant</p>
                <div className="flex text-[#C9A96E] text-sm">
                  {'★'.repeat(5)} <span className="text-gray-400 ml-1">(48 reviews)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Paid Visit Booking Modal */}
        <AnimatePresence>
          {isBookingModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg my-8 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
              >
                {/* Close button */}
                <button
                  onClick={() => !isProcessingPayment && setIsBookingModalOpen(false)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white/50 rounded-full"
                  disabled={isProcessingPayment}
                >
                  <X className="w-5 h-5" />
                </button>

                {!bookingSuccess ? (
                  <>
                    <div className="p-6 border-b border-gray-100 shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0A1628] rounded-xl flex items-center justify-center">
                          <Crown className="w-5 h-5 text-[#C9A96E]" />
                        </div>
                        <div>
                          <h2 className="text-xl font-serif font-bold text-[#0A1628]">VIP Site Visit</h2>
                          <p className="text-sm text-gray-500">Book your exclusive property tour</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1">
                      <form className="space-y-6">
                        {/* Time Slots */}
                        <div className="space-y-3">
                          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Select Time Slot
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {['Morning 10 AM', 'Afternoon 2 PM', 'Evening 5 PM'].map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedSlot(time)}
                                className={`p-3 text-sm text-center rounded-xl border transition-all ${
                                  selectedSlot === time 
                                  ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#0A1628] font-medium' 
                                  : 'border-gray-200 text-gray-600 hover:border-[#C9A96E]/50'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Personal Details */}
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" placeholder="Enter your name" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-sm font-medium text-gray-700">Phone</label>
                              <input type="tel" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" placeholder="+91" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-sm font-medium text-gray-700">Email</label>
                              <input type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" placeholder="Email address" />
                            </div>
                          </div>
                        </div>

                        {/* Pickup Location */}
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Map className="w-4 h-4" /> Pickup Address (Optional)
                          </label>
                          <textarea rows={2} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E] resize-none" placeholder="Enter your full address for pickup..."></textarea>
                        </div>
                      </form>
                    </div>

                    <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 rounded-b-2xl">
                      <button 
                        onClick={() => {
                          setIsProcessingPayment(true);
                          setTimeout(() => {
                            setIsProcessingPayment(false);
                            setBookingSuccess(true);
                          }, 2000);
                        }}
                        disabled={!selectedSlot || isProcessingPayment}
                        className={`w-full py-4 text-white font-bold rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 ${
                          !selectedSlot 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-[#0A1628] hover:bg-[#0A1628]/90 shadow-[#0A1628]/20'
                        }`}
                      >
                        {isProcessingPayment ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>Pay ₹499 & Confirm VIP Visit</>
                        )}
                      </button>
                      <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                        <Shield className="w-3 h-3" /> Secure Razorpay Payment
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="p-8 flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-[#0A1628] mb-2">Booking Confirmed!</h3>
                      <p className="text-gray-600">
                        Your VIP site visit is scheduled for <strong>{selectedSlot}</strong>.
                      </p>
                    </div>
                    
                    <div className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 text-left space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Booking ID</span>
                        <span className="font-medium">#SNP-VIP-8492</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Property</span>
                        <span className="font-medium truncate max-w-[150px]">{PROPERTY.title}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Amount Paid</span>
                        <span className="font-medium text-green-600">₹499.00</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setIsBookingModalOpen(false);
                        setTimeout(() => setBookingSuccess(false), 500); // Reset after close animation
                      }}
                      className="w-full py-4 bg-[#C9A96E] text-white font-bold rounded-xl hover:bg-[#b5955a] transition-colors"
                    >
                      View Receipt & Close
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
