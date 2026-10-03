'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, MapPin, Share2, Heart, CheckCircle2, 
  BedDouble, Bath, Square, Car, Shield, Wifi, 
  Trees, Phone, MessageSquare, Calendar, Building2,
  Image as ImageIcon, Video, Home
} from 'lucide-react';

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
            
            {/* Lead Form */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
              <h3 className="text-xl font-serif font-bold mb-4">Interested in this property?</h3>
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" />
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" />
                </div>
                <div>
                  <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]" />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input type="date" className="w-full pl-10 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] text-gray-600" />
                </div>
                <div>
                  <textarea placeholder="I am interested in this property..." rows={3} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] resize-none"></textarea>
                </div>
                <button type="button" className="w-full py-4 bg-[#C9A96E] text-white font-bold rounded-lg hover:bg-[#b5955a] transition-colors shadow-lg shadow-[#C9A96E]/20">
                  Request Callback
                </button>
              </form>

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

      </div>
    </div>
  );
}
