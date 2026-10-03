"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Bed, Bath, Square, CheckCircle2, Share2, Heart, Phone, Mail, Calendar, MessageSquare, ChevronRight, X, Play } from "lucide-react";

export default function PropertyDetailsPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState("Photos");
  const [showGallery, setShowGallery] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const images = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", // Main
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800", // Bedroom
    "https://images.unsplash.com/photo-1600607688142-0f1ba5506048?auto=format&fit=crop&q=80&w=800", // Kitchen
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800", // Balcony
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"  // Bathroom
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] font-sans pb-20 pt-24">
      
      {/* Lightbox Gallery */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col p-4 md:p-10 overflow-y-auto"
          >
            <button onClick={() => setShowGallery(false)} className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20">
              <X size={24} />
            </button>
            <div className="max-w-5xl mx-auto w-full space-y-6 py-10">
              {images.map((img, i) => (
                <div key={i} className="relative h-[400px] md:h-[700px] w-full rounded-xl overflow-hidden">
                  <Image src={img} alt={`Gallery image ${i+1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Title & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#0A1628] text-[#C9A96E] text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">For Sale</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-sm flex items-center gap-1 border border-green-200">
                <CheckCircle2 size={12} /> RERA Verified
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold text-[#0A1628] mb-2">Heritage Luxury Villa</h1>
            <p className="text-gray-600 flex items-center gap-2 text-sm md:text-base">
              <MapPin size={18} className="text-[#C9A96E]" /> Vaishali Nagar, Jaipur, Rajasthan
            </p>
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-[#C9A96E] mr-4">₹4.5 Cr</h2>
            <button className="p-2 border border-gray-300 rounded-full hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"><Share2 size={20} /></button>
            <button onClick={() => setIsFavorite(!isFavorite)} className={`p-2 border border-gray-300 rounded-full transition-colors ${isFavorite ? 'border-red-500 text-red-500 bg-red-50' : 'hover:border-[#C9A96E] hover:text-[#C9A96E]'}`}>
              <Heart size={20} className={isFavorite ? 'fill-red-500' : ''} />
            </button>
          </div>
        </div>

        {/* Media Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {['Photos', '360° Virtual Tour', 'Floor Plan', 'Video Walkthrough'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-t-lg text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'bg-[#0A1628] text-[#C9A96E] border-[#C9A96E]' : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Media Display Area */}
        <div className="mb-12">
          {activeTab === 'Photos' && (
            <div className="relative rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px]">
              <div className="md:col-span-2 md:row-span-2 relative h-full">
                <Image src={images[0]} alt="Main" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="hidden md:block relative h-full">
                <Image src={images[1]} alt="Bedroom" fill sizes="25vw" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="hidden md:block relative h-full">
                <Image src={images[2]} alt="Kitchen" fill sizes="25vw" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="hidden md:block relative h-full">
                <Image src={images[3]} alt="Balcony" fill sizes="25vw" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="hidden md:block relative h-full">
                <Image src={images[4]} alt="Bathroom" fill sizes="25vw" className="object-cover hover:scale-105 transition-transform duration-500" />
                <div 
                  onClick={() => setShowGallery(true)}
                  className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors flex items-center justify-center cursor-pointer backdrop-blur-[2px]"
                >
                  <span className="text-white font-medium flex items-center gap-2 border border-white/50 px-4 py-2 rounded-lg bg-black/20">
                    View All 15 Photos <ChevronRight size={16} />
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowGallery(true)}
                className="md:hidden absolute bottom-4 right-4 bg-white/90 text-sm font-medium px-4 py-2 rounded-lg shadow-lg border border-gray-200"
              >
                View All Photos
              </button>
            </div>
          )}

          {activeTab === '360° Virtual Tour' && (
            <div className="relative rounded-2xl overflow-hidden h-[500px] bg-gray-900 flex items-center justify-center">
              <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600" alt="360 Panorama" fill className="object-cover opacity-60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <button className="bg-[#C9A96E]/90 hover:bg-[#C9A96E] text-[#0A1628] w-20 h-20 rounded-full flex items-center justify-center pl-2 shadow-2xl backdrop-blur-sm transition-transform hover:scale-110">
                  <Play size={32} />
                </button>
                <p className="text-white mt-6 text-lg font-medium tracking-wide drop-shadow-md">Click to explore 360° Tour</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Specs Bar */}
            <div className="flex flex-wrap gap-6 md:gap-12 py-6 border-y border-gray-200">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm flex items-center gap-2"><Bed size={16} className="text-[#C9A96E]"/> Bedrooms</span>
                <span className="font-semibold text-xl">5 Beds</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm flex items-center gap-2"><Bath size={16} className="text-[#C9A96E]"/> Bathrooms</span>
                <span className="font-semibold text-xl">6 Baths</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm flex items-center gap-2"><Square size={16} className="text-[#C9A96E]"/> Area</span>
                <span className="font-semibold text-xl">4,500 sqft</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm">Property Type</span>
                <span className="font-semibold text-xl">Luxury Villa</span>
              </div>
            </div>

            {/* Description */}
            <section>
              <h3 className="text-2xl font-serif font-semibold mb-4 text-[#0A1628]">About this Property</h3>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Experience the epitome of luxury living in this exquisite heritage villa nestled in the prestigious Vaishali Nagar area of Jaipur. 
                  Combining traditional Rajasthani architecture with state-of-the-art modern amenities, this property offers a rare sanctuary in the bustling Pink City.
                </p>
                <p className="mt-4">
                  The ground floor features an expansive grand parlor with double-height ceilings, a chef-grade gourmet kitchen, and a private dining room overlooking the landscaped courtyard. 
                  Upstairs, the master suite includes a private terrace, walk-in closets, and a spa-like bathroom adorned with imported marble.
                </p>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Lead Form */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-28">
              <h3 className="text-xl font-serif font-semibold mb-6">Schedule a Tour</h3>
              
              {formStatus === "success" ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
                  <CheckCircle2 size={40} className="text-green-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-lg mb-2">Request Sent!</h4>
                  <p className="text-sm">Our premium property consultant will contact you shortly.</p>
                  <button onClick={() => setFormStatus("idle")} className="mt-6 text-sm text-[#0A1628] underline">Send another inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input required type="text" className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-[#C9A96E] outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input required type="tel" className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-[#C9A96E] outline-none transition-colors" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input required type="email" className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-[#C9A96E] outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      <input type="date" className="w-full pl-10 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-[#C9A96E] outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows={3} className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-[#C9A96E] outline-none transition-colors" placeholder="I'm interested in this property..."></textarea>
                  </div>
                  <button 
                    disabled={formStatus === "submitting"}
                    className="w-full bg-[#0A1628] text-[#C9A96E] py-4 rounded-lg font-semibold hover:bg-[#0A1628]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Request Details"}
                  </button>
                  <a 
                    href={`https://wa.me/919876543210?text=I'm%20interested%20in%20Heritage%20Luxury%20Villa`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold hover:bg-[#20b958] transition-colors flex items-center justify-center gap-2 mt-3"
                  >
                    <MessageSquare size={18} /> WhatsApp Inquiry
                  </a>
                </form>
              )}
            </div>

            {/* Agent Profile */}
            <div className="bg-[#0A1628] p-6 rounded-2xl shadow-xl text-white">
              <h3 className="text-lg font-semibold text-[#C9A96E] mb-6 border-b border-gray-700 pb-3">Listed by Premium Agent</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9A96E]">
                  <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Agent" width={64} height={64} className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Rajesh Sharma</p>
                  <p className="text-sm text-gray-400">Senior Luxury Consultant</p>
                  <div className="mt-1 flex items-center gap-1 text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300 w-fit border border-gray-700">
                    <CheckCircle2 size={10} className="text-[#C9A96E]" /> RERA: RAJ/A/2021/193
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <a href="tel:+919876543210" className="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                  <Phone size={18} className="text-[#C9A96E]" /> +91 98765 43210
                </a>
                <a href="mailto:rajesh@shreeniwas.com" className="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                  <Mail size={18} className="text-[#C9A96E]" /> rajesh@shreeniwas.com
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Similar Properties Carousel */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <h3 className="text-3xl font-serif font-semibold mb-8 text-[#0A1628]">Similar Luxury Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <Image src={`https://images.unsplash.com/photo-${1600596542815 + item}-ffad4c1539a9?auto=format&fit=crop&q=80&w=800`} alt="Similar" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-[#0A1628] text-[#C9A96E] text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-md">
                    Buy
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-serif font-semibold text-[#0A1628]">Royal Palace Villa</h4>
                    <span className="text-base font-bold text-[#C9A96E]">₹5.2 Cr</span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} /> C-Scheme, Jaipur
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
