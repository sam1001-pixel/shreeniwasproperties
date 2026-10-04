'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, MapPin, IndianRupee, ShieldCheck, Download, 
  ExternalLink, Calendar, Layers, CheckCircle2, Sparkles, 
  ArrowRight, Phone, MessageSquare, ChevronRight, Award
} from 'lucide-react';

export interface NewProjectItem {
  id: string;
  name: string;
  builder: string;
  reraNumber: string;
  city: string;
  location: string;
  priceRange: string;
  configurations: string[];
  status: 'New Launch' | 'Under Construction' | 'Ready to Move';
  possessionDate: string;
  coverImage: string;
  brochureUrl?: string;
  googleMapsUrl?: string;
  highlights: string[];
  featured?: boolean;
}

export const DEFAULT_NEW_PROJECTS: NewProjectItem[] = [
  {
    id: 'proj-mahima-florence',
    name: 'Mahima Florence & Panache',
    builder: 'Mahima Group',
    reraNumber: 'RAJ/P/2023/1842',
    city: 'Jaipur',
    location: 'Patrakar Colony, Mansarovar, Jaipur',
    priceRange: '₹65 Lakh - ₹1.85 Cr',
    configurations: ['2 BHK', '3 BHK', '4 BHK Luxury'],
    status: 'Under Construction',
    possessionDate: 'March 2026',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Patrakar+Colony+Mansarovar+Jaipur',
    highlights: ['45,000 sq.ft Clubhouse', 'Sky Walk Terrace', 'Near Metro Station', 'RERA Approved'],
    featured: true
  },
  {
    id: 'proj-manglam-grand-city',
    name: 'Manglam Grand City & Greens',
    builder: 'Manglam Group',
    reraNumber: 'RAJ/P/2022/1410',
    city: 'Jaipur',
    location: 'Ajmer Road Express Corridor, Jaipur',
    priceRange: '₹48 Lakh - ₹1.35 Cr',
    configurations: ['2 BHK', '3 BHK', 'Villas'],
    status: 'Ready to Move',
    possessionDate: 'Immediate',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ajmer+Road+Jaipur',
    highlights: ['70% Open Green Space', 'Olympic Size Pool', 'Gated Security', 'Vastu Compliant'],
    featured: true
  },
  {
    id: 'proj-ashiana-daksh',
    name: 'Ashiana Daksh Townhomes',
    builder: 'Ashiana Housing',
    reraNumber: 'RAJ/P/2023/2199',
    city: 'Jaipur',
    location: 'Jagatpura, Near Akshaya Patra, Jaipur',
    priceRange: '₹82 Lakh - ₹2.10 Cr',
    configurations: ['2 BHK', '3 BHK', 'Penthouse'],
    status: 'Under Construction',
    possessionDate: 'December 2025',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jagatpura+Jaipur',
    highlights: ['Kid-Centric Amenities', 'EV Charging Slots', 'Sports Complex', 'Zero Water Waste'],
    featured: true
  },
  {
    id: 'proj-trimurty-arabella',
    name: 'Trimurty Arabella Lake View',
    builder: 'Trimurty Builders',
    reraNumber: 'RAJ/P/2021/0987',
    city: 'Udaipur',
    location: 'Shobhagpura - 100 Feet Road, Udaipur',
    priceRange: '₹1.15 Cr - ₹3.40 Cr',
    configurations: ['3 BHK', '4 BHK', '5 BHK Sky Duplex'],
    status: 'New Launch',
    possessionDate: 'June 2027',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shobhagpura+Udaipur',
    highlights: ['Unobstructed Aravalli Views', 'Infinity Pool', 'Private Elevators', 'IGBC Gold Rated'],
    featured: true
  }
];

export default function NewProjectsSection() {
  const [projects, setProjects] = useState<NewProjectItem[]>(DEFAULT_NEW_PROJECTS);
  const [selectedCity, setSelectedCity] = useState('All');
  const [brochureModalProject, setBrochureModalProject] = useState<NewProjectItem | null>(null);
  const [leadPhone, setLeadPhone] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadSent, setLeadSent] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('shreeniwas_new_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        }
      }
    } catch (e) {}

    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem('shreeniwas_new_projects');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProjects(parsed);
          }
        }
      } catch (e) {}
    };

    window.addEventListener('shreeniwas_data_updated', handleUpdate);
    return () => window.removeEventListener('shreeniwas_data_updated', handleUpdate);
  }, []);

  const cities = ['All', ...Array.from(new Set(projects.map(p => p.city)))];

  const filteredProjects = selectedCity === 'All' 
    ? projects 
    : projects.filter(p => p.city.toLowerCase() === selectedCity.toLowerCase());

  const handleBrochureDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim() || !brochureModalProject) return;

    // Save lead to inquiries
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('shreeniwas_inquiries') || '[]');
      existingInquiries.unshift({
        id: `INQ-${Date.now()}`,
        name: leadName || 'Project Visitor',
        phone: leadPhone,
        email: '',
        propertyTitle: `[Brochure Request] ${brochureModalProject.name} (${brochureModalProject.builder})`,
        propertyPrice: brochureModalProject.priceRange,
        message: `Requested RERA brochure and price breakdown for ${brochureModalProject.name}.`,
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Hot Lead'
      });
      localStorage.setItem('shreeniwas_inquiries', JSON.stringify(existingInquiries));
    } catch (e) {}

    setLeadSent(true);

    // Redirect to WhatsApp consultation or open brochure link
    setTimeout(() => {
      const msg = encodeURIComponent(`Hello Shreeniwas Properties, I am interested in ${brochureModalProject.name} by ${brochureModalProject.builder} (RERA: ${brochureModalProject.reraNumber}). Please send me the official PDF brochure and payment plan.`);
      window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
      setBrochureModalProject(null);
      setLeadSent(false);
      setLeadPhone('');
      setLeadName('');
    }, 1200);
  };

  return (
    <section className="py-12 sm:py-16 px-4 bg-[#F8F9FB] border-b border-slate-200/80">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header (99acres Style) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1628] text-[#C9A96E] text-xs font-bold uppercase tracking-wider mb-2 border border-[#C9A96E]/30">
              <Building2 className="w-3.5 h-3.5" /> 99acres-Style Builder Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0A1628]">
              New Projects & Builder Townships
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Explore premier residential townships & high-rise societies from Rajasthan’s top builders with verified RERA certificates and zero brokerage.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
            {cities.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCity === c 
                    ? 'bg-[#0A1628] text-[#C9A96E] shadow border border-[#C9A96E]/40' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c === 'All' ? 'All Rajasthan' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Project Cover Image & Status Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={proj.coverImage}
                    alt={proj.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-black/20" />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      proj.status === 'Ready to Move' 
                        ? 'bg-emerald-600 text-white' 
                        : proj.status === 'New Launch' 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-[#0A1628] text-[#C9A96E] border border-[#C9A96E]/40'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  {/* Builder Name Watermark */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-bold text-[#C9A96E] flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> {proj.builder}
                    </span>
                    <span className="text-[10px] text-slate-300 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      Possession: {proj.possessionDate}
                    </span>
                  </div>
                </div>

                {/* Project Card Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#0A1628] group-hover:text-[#C9A96E] transition-colors line-clamp-1">
                      {proj.name}
                    </h3>
                    <p className="text-slate-500 text-xs flex items-center gap-1 mt-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                      <span>{proj.location}</span>
                    </p>
                  </div>

                  {/* Price & BHK Bracket */}
                  <div className="bg-[#FDFBF7] p-2.5 rounded-2xl border border-slate-200/60">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price Bracket</span>
                      <span className="text-sm font-bold text-[#0A1628] font-mono">{proj.priceRange}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {proj.configurations.map((c, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded-md text-slate-700 border border-slate-200">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RERA Registration */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> RERA Approved
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 truncate max-w-[120px]">{proj.reraNumber}</span>
                  </div>

                  {/* Highlights Bullet Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBrochureModalProject(proj)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#0A1628] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span>Brochure</span>
                  </button>
                  <a
                    href={proj.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${proj.name} ${proj.location}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Map Dir</span>
                  </a>
                </div>

                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello Shreeniwas Properties, I want to book a VIP Site Visit for project ${proj.name} by ${proj.builder} in ${proj.city}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm border border-[#C9A96E]/30 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Book VIP Site Visit</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brochure Instant Request Modal */}
      {brochureModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setBrochureModalProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-[#0A1628] text-[#C9A96E] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#0A1628]">Download Project Brochure</h3>
              <p className="text-xs text-slate-500 mt-1">
                Official floor plans, master layout, and pricing breakdown for <strong className="text-[#0A1628]">{brochureModalProject.name}</strong>.
              </p>
            </div>

            {leadSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-800">Brochure Link Sent Successfully!</p>
                <p className="text-[11px] text-emerald-700">Connecting you directly to Shreeniwas WhatsApp Desk...</p>
              </div>
            ) : (
              <form onSubmit={handleBrochureDownload} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#0A1628] outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">WhatsApp Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#0A1628] outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#0A1628]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#C9A96E]/30"
                >
                  <Download className="w-4 h-4 text-[#C9A96E]" />
                  <span>Receive PDF Brochure on WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
