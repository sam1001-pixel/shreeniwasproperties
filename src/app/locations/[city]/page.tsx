'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  MapPin, Building2, ShieldCheck, Zap, BedDouble, Bath, Square, 
  ArrowRight, MessageSquare, ChevronRight, Crown, Phone, Sparkles,
  TrendingUp, CheckCircle2, Search, ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import SavePropertyButton from '@/components/shared/save-property-button';

interface CityInfo {
  name: string;
  tagline: string;
  description: string;
  avgPrice: string;
  growth: string;
  image: string;
  popularLocalities: string[];
}

const CITY_DATABASE: Record<string, CityInfo> = {
  jaipur: {
    name: 'Jaipur',
    tagline: 'The Pink City & Rajasthan’s Premier Investment Hub',
    description: 'Capital city combining majestic royal architecture with rapid infrastructure growth, Metro expansion, and the Delhi-Mumbai Expressway corridor.',
    avgPrice: '₹6,450/sq.ft',
    growth: '+14.2% YoY',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1600',
    popularLocalities: ['Vaishali Nagar', 'C-Scheme', 'Mansarovar', 'Jagatpura', 'Malviya Nagar', 'Tonk Road']
  },
  jodhpur: {
    name: 'Jodhpur',
    tagline: 'The Sun City & Heritage Real Estate Hub',
    description: 'Home to majestic Mehrangarh Fort, iconic blue-hued vistas, and premium heritage havelis and modern residential colonies in Ratanada and Shastri Nagar.',
    avgPrice: '₹5,200/sq.ft',
    growth: '+11.0% YoY',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1600',
    popularLocalities: ['Ratanada', 'Shastri Nagar', 'Sardarpura', 'Paota', 'Pal Road']
  },
  udaipur: {
    name: 'Udaipur',
    tagline: 'The City of Lakes & Mewar Royalty',
    description: 'World-renowned destination offering serene lake-facing luxury penthouses, boutique havelis, and gated residential townships overlooking the Aravallis.',
    avgPrice: '₹7,100/sq.ft',
    growth: '+16.1% YoY',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600',
    popularLocalities: ['Fatehpura', 'Shobhagpura', 'Lake Pichola', 'Sukher', 'Hiran Magri']
  },
  kota: {
    name: 'Kota',
    tagline: 'The Education Capital & Riverfront Metropolis',
    description: 'Thriving educational powerhouse with high student rental demand, modern apartments, and scenic Chambal Riverfront luxury villas.',
    avgPrice: '₹4,100/sq.ft',
    growth: '+9.5% YoY',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
    popularLocalities: ['RK Puram', 'Vigyan Nagar', 'Talwandi', 'Kunhari', 'Chambal Garden']
  },
  ajmer: {
    name: 'Ajmer',
    tagline: 'Spiritual Center & Ana Sagar Lakefront Oasis',
    description: 'Sacred heritage city and smart-city hub featuring peaceful lake-facing apartments, heritage homes, and emerging suburban residential sectors.',
    avgPrice: '₹3,800/sq.ft',
    growth: '+8.4% YoY',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600',
    popularLocalities: ['Vaishali Nagar', 'Panchsheel Nagar', 'Ana Sagar Circular Road', 'Civil Lines']
  },
  bikaner: {
    name: 'Bikaner',
    tagline: 'The Desert City of Grand Havelis & Palaces',
    description: 'Famed for red sandstone palaces, authentic carved jharokha havelis, and expansive residential and commercial land opportunities.',
    avgPrice: '₹3,400/sq.ft',
    growth: '+7.9% YoY',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600',
    popularLocalities: ['Sadul Ganj', 'Kanta Khaturia Colony', 'Jai Narayan Vyas Colony', 'Pawan Puri']
  },
  bhilwara: {
    name: 'Bhilwara',
    tagline: 'The Textile Capital of North India',
    description: 'Industrial powerhouse with high-demand commercial showrooms, warehouses, and contemporary residential layouts.',
    avgPrice: '₹3,200/sq.ft',
    growth: '+8.0% YoY',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600',
    popularLocalities: ['Subhash Nagar', 'Shastri Nagar', 'Bhopal Ganj', 'Patel Nagar']
  },
  alwar: {
    name: 'Alwar',
    tagline: 'Gateway to Rajasthan & Delhi-NCR Corridor',
    description: 'Strategically located along the Delhi-Mumbai Expressway and NCR industrial belt with rapid capital value appreciation.',
    avgPrice: '₹3,600/sq.ft',
    growth: '+10.2% YoY',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600',
    popularLocalities: ['Moti Doongri', 'Kala Kuan', 'Scheme 2', 'Neemrana Corridor']
  }
};

const BASE_MOCK_PROPERTIES = [
  {
    id: "1",
    slug: "royal-heritage-residency-jaipur",
    title: "The Royal Heritage Residency Villa",
    location: "Vaishali Nagar, Jaipur",
    city: "Jaipur",
    price: "₹3.5 Cr",
    purpose: "Buy",
    type: "Luxury Villa",
    bhk: "4 BHK",
    area: "3,200 sq.ft",
    baths: 4,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    slug: "lakeview-palace-heights-udaipur",
    title: "Lakeview Palace Heights Penthouse",
    location: "Fatehpura, Udaipur",
    city: "Udaipur",
    price: "₹1.8 Cr",
    purpose: "Buy",
    type: "Penthouse",
    bhk: "3 BHK",
    area: "2,200 sq.ft",
    baths: 3,
    status: "Under Construction",
    verified: true,
    reraApproved: true,
    zeroBrokerage: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    slug: "sun-city-heritage-haveli-jodhpur",
    title: "Sun City Heritage Haveli",
    location: "Ratanada, Jodhpur",
    city: "Jodhpur",
    price: "₹5.2 Cr",
    purpose: "Buy",
    type: "Heritage Haveli",
    bhk: "5+ BHK",
    area: "4,500 sq.ft",
    baths: 6,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    slug: "shreeniwas-prime-enclave-jaipur",
    title: "Shreeniwas Prime Enclave",
    location: "Mansarovar, Jaipur",
    city: "Jaipur",
    price: "₹85 Lakh",
    purpose: "Buy",
    type: "Apartment",
    bhk: "3 BHK",
    area: "1,500 sq.ft",
    baths: 3,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    slug: "pink-city-commercial-plaza-jaipur",
    title: "Pink City Commercial Plaza",
    location: "C-Scheme, Jaipur",
    city: "Jaipur",
    price: "₹2.1 Cr",
    purpose: "Commercial",
    type: "Commercial Office",
    bhk: "Commercial",
    area: "1,500 sq.ft",
    baths: 2,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: false,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    slug: "lake-city-royal-residency-udaipur",
    title: "Lake City Royal Residency",
    location: "Shobhagpura, Udaipur",
    city: "Udaipur",
    price: "₹65 Lakh",
    purpose: "Rent",
    type: "Apartment",
    bhk: "2 BHK",
    area: "1,350 sq.ft",
    baths: 2,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "7",
    slug: "chambal-riverfront-villa-kota",
    title: "Chambal Riverfront Royal Villa",
    location: "RK Puram, Kota",
    city: "Kota",
    price: "₹1.4 Cr",
    purpose: "Buy",
    type: "Luxury Villa",
    bhk: "3 BHK",
    area: "2,100 sq.ft",
    baths: 3,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "8",
    slug: "ana-sagar-lake-enclave-ajmer",
    title: "Ana Sagar Lakefront Residency",
    location: "Vaishali Nagar, Ajmer",
    city: "Ajmer",
    price: "₹75 Lakh",
    purpose: "Buy",
    type: "Apartment",
    bhk: "2 BHK",
    area: "1,250 sq.ft",
    baths: 2,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  }
];

export default function CityLocationPage() {
  const params = useParams();
  const rawCitySlug = (params?.city as string) || 'jaipur';
  const cityKey = rawCitySlug.toLowerCase().trim();

  const cityData: CityInfo = CITY_DATABASE[cityKey] || {
    name: cityKey.charAt(0).toUpperCase() + cityKey.slice(1),
    tagline: `Verified Properties in ${cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}, Rajasthan`,
    description: `Explore premium residential villas, apartments, commercial offices and land across ${cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}.`,
    avgPrice: '₹4,500/sq.ft',
    growth: '+9.0% YoY',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1600',
    popularLocalities: ['City Center', 'Main Road Corridor', 'Civil Lines', 'Industrial Area']
  };

  const [properties, setProperties] = useState<any[]>([]);
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('All');

  const loadProperties = () => {
    let allProps = [...BASE_MOCK_PROPERTIES];

    try {
      const saved = localStorage.getItem('shreeniwas_admin_properties');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted = parsed.map((p: any, idx: number) => ({
            id: p.id || String(idx + 100),
            slug: p.id?.toString().toLowerCase() || `prop-${idx}`,
            title: p.title || 'Luxury Property',
            location: p.location || `${cityData.name}, Rajasthan`,
            city: p.location?.toLowerCase().includes('udaipur') ? 'Udaipur' :
                  p.location?.toLowerCase().includes('jodhpur') ? 'Jodhpur' :
                  p.location?.toLowerCase().includes('kota') ? 'Kota' :
                  p.location?.toLowerCase().includes('ajmer') ? 'Ajmer' : 'Jaipur',
            price: p.price || 'Price on Request',
            purpose: p.purpose === 'rent' ? 'Rent' : p.type?.includes('Commercial') ? 'Commercial' : 'Buy',
            type: p.type || 'Luxury Villa',
            bhk: p.bedrooms ? `${p.bedrooms} BHK` : '3 BHK',
            area: p.sqft ? `${p.sqft} sq.ft` : '2,200 sq.ft',
            baths: p.bathrooms || 3,
            status: p.status || 'Ready to Move',
            verified: true,
            reraApproved: true,
            zeroBrokerage: true,
            image: p.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'
          }));
          allProps = [...formatted, ...allProps];
        }
      }
    } catch (e) {}

    // Filter by this city
    const cityProps = allProps.filter(p => 
      p.city.toLowerCase() === cityKey || 
      p.location.toLowerCase().includes(cityKey)
    );

    // If city has few properties, keep cityProps or show at least general Rajasthan luxury options
    setProperties(cityProps.length > 0 ? cityProps : allProps.slice(0, 4));
  };

  useEffect(() => {
    loadProperties();
    window.addEventListener('shreeniwas_data_updated', loadProperties);
    window.addEventListener('storage', loadProperties);
    return () => {
      window.removeEventListener('shreeniwas_data_updated', loadProperties);
      window.removeEventListener('storage', loadProperties);
    };
  }, [cityKey]);

  const filteredProperties = properties.filter(p => {
    const matchesLocality = selectedLocality === 'All' || p.location.toLowerCase().includes(selectedLocality.toLowerCase());
    const matchesPurpose = selectedPurpose === 'All' || p.purpose.toLowerCase() === selectedPurpose.toLowerCase();
    return matchesLocality && matchesPurpose;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628]">
      {/* 1. Hero Banner for City */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center pt-28 sm:pt-32 pb-16 px-4 overflow-hidden bg-[#0A1628] text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src={cityData.image} 
            alt={`Real Estate in ${cityData.name}`} 
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/80 to-[#0A1628]/60" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-2">
            <Link href="/" className="hover:text-[#C9A96E]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/locations" className="hover:text-[#C9A96E]">Locations</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#C9A96E]">{cityData.name}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
            Properties in <span className="text-[#C9A96E]">{cityData.name}</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {cityData.tagline}
          </p>

          {/* Quick Metrics Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Avg Capital Value</span>
              <span className="text-base sm:text-lg font-bold text-[#C9A96E]">{cityData.avgPrice}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Annual Appreciation</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400">{cityData.growth}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Documentation</span>
              <span className="text-base sm:text-lg font-bold text-white">100% Legal RERA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Localities Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Controls: Localities and Purpose */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#0A1628]">Explore {cityData.name} Neighborhoods</h2>
              <p className="text-xs text-slate-500">Filter verified listings by prime localities</p>
            </div>

            {/* Purpose Tabs */}
            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
              {['All', 'Buy', 'Rent', 'Commercial'].map((purpose) => (
                <button
                  key={purpose}
                  onClick={() => setSelectedPurpose(purpose)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedPurpose === purpose 
                      ? 'bg-[#0A1628] text-[#C9A96E] shadow-sm' 
                      : 'text-slate-600 hover:text-[#0A1628]'
                  }`}
                >
                  {purpose}
                </button>
              ))}
            </div>
          </div>

          {/* Locality Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setSelectedLocality('All')}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                selectedLocality === 'All' 
                  ? 'bg-[#C9A96E] text-[#0A1628]' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Localities ({properties.length})
            </button>
            {cityData.popularLocalities.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocality(loc)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                  selectedLocality === loc 
                    ? 'bg-[#C9A96E] text-[#0A1628] font-bold' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Properties Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-serif font-bold text-[#0A1628]">
              Available Listings in {cityData.name} <span className="text-[#C9A96E]">({filteredProperties.length})</span>
            </h3>
            <Link 
              href={`/properties?city=${encodeURIComponent(cityData.name)}`}
              className="text-xs font-bold text-[#C9A96E] hover:underline flex items-center gap-1"
            >
              Advanced Search <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
              <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-lg font-bold text-[#0A1628]">No properties match selected filters in {cityData.name}</h4>
              <p className="text-xs text-slate-500">Try resetting the locality or purpose filter to see all properties.</p>
              <button
                onClick={() => { setSelectedLocality('All'); setSelectedPurpose('All'); }}
                className="px-5 py-2.5 bg-[#0A1628] text-[#C9A96E] rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div 
                  key={property.id} 
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="p-3">
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                      <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                      
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                        {property.reraApproved && (
                          <span className="bg-white/95 backdrop-blur text-[#0A1628] text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1 border border-emerald-500/20">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> RERA Approved
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <SavePropertyButton property={property} />
                      </div>

                      <div className="absolute bottom-3 left-3 bg-[#0A1628]/90 backdrop-blur text-white text-xs font-extrabold px-3 py-1 rounded-lg">
                        {property.price}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-1 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[11px] font-bold text-[#C9A96E] uppercase tracking-wider">{property.type}</span>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{property.status}</span>
                      </div>
                      
                      <h4 className="font-serif font-bold text-lg text-[#0A1628] line-clamp-1 hover:text-[#C9A96E] transition-colors">
                        <Link href={`/properties/${property.slug}`}>
                          {property.title}
                        </Link>
                      </h4>
                      
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" /> {property.location}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 font-medium my-2">
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-slate-400" />
                        <span>{property.bhk}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-slate-400" />
                        <span>{property.baths} Bath</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Square className="w-4 h-4 text-slate-400" />
                        <span>{property.area}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <a 
                        href={`https://wa.me/916376117833?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(property.title)}%20in%20${encodeURIComponent(cityData.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                      </a>

                      <Link 
                        href={`/properties/${property.slug}`}
                        className="px-4 py-2 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1"
                      >
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. City Overview & Investment Appeal */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C9A96E]" />
            <h3 className="text-2xl font-serif font-bold text-[#0A1628]">About Real Estate in {cityData.name}</h3>
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {cityData.description} Whether seeking high-yield residential rentals, peaceful retirement estates, or strategic commercial showrooms, {cityData.name} delivers strong capital appreciation and solid legal registry protections under Rajasthan RERA.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-[#0A1628]">100% RERA Verified Titles</h5>
                <p className="text-[11px] text-slate-500">Every land deed and municipal registration cross-checked.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-[#0A1628]">Zero Middlemen & Brokerage</h5>
                <p className="text-[11px] text-slate-500">Connect directly with builders and verified owners.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-[#0A1628]">Senior Advisor Accompaniment</h5>
                <p className="text-[11px] text-slate-500">Personal car pickup and site inspection support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Explore Other Rajasthan Cities */}
        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-xl font-serif font-bold text-[#0A1628] mb-4">Explore More Cities Across Rajasthan</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {Object.keys(CITY_DATABASE).filter(c => c !== cityKey).slice(0, 6).map((otherKey) => {
              const other = CITY_DATABASE[otherKey];
              return (
                <Link
                  key={otherKey}
                  href={`/locations/${otherKey}`}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#C9A96E] hover:shadow-md transition-all text-center group"
                >
                  <MapPin className="w-4 h-4 text-[#C9A96E] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs text-[#0A1628] block">{other.name}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{other.avgPrice}</span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
