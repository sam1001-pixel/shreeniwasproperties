'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Filter, Grid, List, 
  Heart, CheckCircle2, MessageSquare, X, BedDouble, Bath, Square,
  ShieldCheck, Zap, Scale, ArrowRight, IndianRupee, Compass, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyComparison, { PropertyCompareItem } from '@/components/shared/property-comparison';
import AmenitiesShowcase from '@/components/shared/amenities-showcase';

const MOCK_PROPERTIES = [
  {
    id: "1",
    slug: "royal-heritage-residency-jaipur",
    title: "The Royal Heritage Residency",
    location: "Vaishali Nagar, Jaipur",
    city: "Jaipur",
    price: "₹3.5 Cr",
    pricePerSqft: "₹10,937/sq.ft",
    purpose: "Buy",
    type: "Luxury Villa",
    bhk: "4 BHK",
    area: "3,200 sq.ft",
    carpetArea: "2,850 sq.ft",
    facing: "East (Vastu)",
    baths: 4,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800&sig=1",
  },
  {
    id: "2",
    slug: "lakeview-palace-heights-udaipur",
    title: "Lakeview Palace Heights",
    location: "Fatehpura, Udaipur",
    city: "Udaipur",
    price: "₹1.8 Cr",
    pricePerSqft: "₹8,181/sq.ft",
    purpose: "Buy",
    type: "Penthouse Apartment",
    bhk: "3 BHK",
    area: "2,200 sq.ft",
    carpetArea: "1,950 sq.ft",
    facing: "North-East",
    baths: 3,
    status: "Under Construction",
    verified: true,
    reraApproved: true,
    zeroBrokerage: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800&sig=2",
  },
  {
    id: "3",
    slug: "sun-city-heritage-haveli-jodhpur",
    title: "Sun City Heritage Haveli",
    location: "Ratanada, Jodhpur",
    city: "Jodhpur",
    price: "₹5.2 Cr",
    pricePerSqft: "₹11,555/sq.ft",
    purpose: "Buy",
    type: "Heritage Haveli",
    bhk: "5+ BHK",
    area: "4,500 sq.ft",
    carpetArea: "4,100 sq.ft",
    facing: "East",
    baths: 6,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800&sig=3",
  },
  {
    id: "4",
    slug: "shreeniwas-prime-enclave-jaipur",
    title: "Shreeniwas Prime Enclave",
    location: "Mansarovar, Jaipur",
    city: "Jaipur",
    price: "₹85 Lakh",
    pricePerSqft: "₹5,666/sq.ft",
    purpose: "Buy",
    type: "Apartment",
    bhk: "3 BHK",
    area: "1,500 sq.ft",
    carpetArea: "1,320 sq.ft",
    facing: "North",
    baths: 3,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&sig=4",
  },
  {
    id: "5",
    slug: "pink-city-commercial-plaza-jaipur",
    title: "Pink City Commercial Plaza",
    location: "C-Scheme, Jaipur",
    city: "Jaipur",
    price: "₹2.1 Cr",
    pricePerSqft: "₹14,000/sq.ft",
    purpose: "Buy",
    type: "Commercial Office",
    bhk: "Office Space",
    area: "1,500 sq.ft",
    carpetArea: "1,400 sq.ft",
    facing: "East",
    baths: 2,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: false,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800&sig=5",
  },
  {
    id: "6",
    slug: "lake-city-royal-residency-udaipur",
    title: "Lake City Royal Residency",
    location: "Shobhagpura, Udaipur",
    city: "Udaipur",
    price: "₹65 Lakh",
    pricePerSqft: "₹4,814/sq.ft",
    purpose: "Rent",
    type: "Apartment",
    bhk: "2 BHK",
    area: "1,350 sq.ft",
    carpetArea: "1,180 sq.ft",
    facing: "East",
    baths: 2,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800&sig=6",
  }
];

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'All' | 'Buy' | 'Rent' | 'Commercial'>('All');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [compareItems, setCompareItems] = useState<PropertyCompareItem[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompare = (prop: typeof MOCK_PROPERTIES[0]) => {
    setCompareItems(prev => {
      const exists = prev.some(item => item.id === prop.id);
      if (exists) {
        return prev.filter(item => item.id !== prop.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 properties at a time.");
        return prev;
      }
      return [...prev, {
        id: prop.id,
        title: prop.title,
        location: prop.location,
        price: prop.price,
        pricePerSqft: prop.pricePerSqft,
        sqft: prop.area,
        bhk: prop.bhk,
        image: prop.image,
        type: prop.type,
        status: prop.status,
        reraApproved: prop.reraApproved
      }];
    });
  };

  const filteredProperties = MOCK_PROPERTIES.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'All' || 
                       (selectedTab === 'Buy' && p.purpose === 'Buy') ||
                       (selectedTab === 'Rent' && p.purpose === 'Rent') ||
                       (selectedTab === 'Commercial' && p.type.includes('Commercial'));
    return matchesSearch && matchesTab;
  });

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
        <h3 className="text-lg font-bold text-[#0A1628] flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#C9A96E]" /> Property Filters
        </h3>
        <button onClick={() => setSearchQuery('')} className="text-xs font-semibold text-rose-500 hover:underline">Reset All</button>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">City in Rajasthan</label>
        <select className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]">
          <option>All Cities</option>
          <option>Jaipur</option>
          <option>Udaipur</option>
          <option>Jodhpur</option>
          <option>Kota</option>
          <option>Ajmer</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Property Type</label>
        <div className="space-y-2 text-sm text-slate-700 font-medium">
          {["Luxury Villas", "Apartments", "Heritage Havelis", "Commercial Offices", "Plots / Land"].map((type, i) => (
            <label key={i} className="flex items-center gap-2.5 cursor-pointer hover:text-[#0A1628]">
              <input type="checkbox" defaultChecked className="rounded accent-[#C9A96E] w-4 h-4" />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">BHK Configuration</label>
        <div className="flex flex-wrap gap-2">
          {["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Villa"].map((bhk, i) => (
            <button key={i} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#C9A96E] hover:bg-slate-50">
              {bhk}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Verification & Badges</label>
        <div className="space-y-2 text-sm text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded accent-emerald-600 w-4 h-4" />
            <span className="font-semibold text-emerald-800">RERA Approved Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded accent-[#C9A96E] w-4 h-4" />
            <span>0% Brokerage Direct</span>
          </label>
        </div>
      </div>

      <button className="w-full py-3.5 bg-[#0A1628] text-white rounded-xl font-bold text-sm shadow-md lg:hidden" onClick={() => setIsFilterDrawerOpen(false)}>
        Apply Filters ({filteredProperties.length})
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] pb-24 md:pb-12">
      {/* Header Banner */}
      <div className="bg-[#0A1628] text-white pt-24 pb-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#C9A96E]/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl mb-6">
            <span className="bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
              Shreeniwas Verified Listings
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              Browse Properties in <span className="text-[#C9A96E]">Rajasthan</span>
            </h1>
          </div>

          {/* Search Header Bar */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by city, locality, property name..." 
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] text-slate-900 text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {(['All', 'Buy', 'Rent', 'Commercial'] as const).map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setSelectedTab(tab)}
                  className={`px-5 py-3 rounded-xl whitespace-nowrap font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    selectedTab === tab 
                      ? 'bg-[#0A1628] text-[#C9A96E] shadow' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 sticky top-24">
            <FiltersContent />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {isFilterDrawerOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)} />
              <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="relative w-4/5 max-w-sm h-full bg-white p-6 shadow-2xl z-10 overflow-y-auto">
                <button onClick={() => setIsFilterDrawerOpen(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full"><X className="w-5 h-5"/></button>
                <FiltersContent />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Properties Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1628]">
              Showing <span className="text-[#C9A96E]">{filteredProperties.length}</span> Verified Listings
            </h2>
            
            <div className="hidden sm:flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#0A1628] text-white' : 'text-slate-400'}`}><Grid className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#0A1628] text-white' : 'text-slate-400'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>

          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {filteredProperties.map((property) => {
              const isCompared = compareItems.some(i => i.id === property.id);
              return (
                <motion.div 
                  key={property.id} 
                  className={`bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${viewMode === 'list' ? 'sm:flex-row' : ''}`}
                >
                  <div className="p-3">
                    <div className={`relative rounded-2xl overflow-hidden ${viewMode === 'list' ? 'sm:w-64 h-full min-h-[200px]' : 'aspect-[16/10]'}`}>
                      <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                      
                      {/* Property Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                        {property.reraApproved && (
                          <span className="bg-white/95 backdrop-blur text-[#0A1628] text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1 border border-emerald-500/20">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> RERA Approved
                          </span>
                        )}
                        {property.zeroBrokerage && (
                          <span className="bg-[#0A1628]/90 backdrop-blur text-[#C9A96E] text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                            <Zap className="w-3 h-3 text-[#C9A96E]" /> 0% Brokerage
                          </span>
                        )}
                      </div>

                      {/* Compare & Heart Buttons */}
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button 
                          onClick={() => toggleCompare(property)} 
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur transition-all flex items-center gap-1 ${
                            isCompared ? 'bg-[#C9A96E] text-[#0A1628]' : 'bg-white/90 text-slate-700 hover:bg-white'
                          }`}
                        >
                          <Scale className="w-3 h-3" />
                          {isCompared ? 'Compared' : 'Compare'}
                        </button>
                        <button 
                          onClick={() => toggleFavorite(property.id)} 
                          className="w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white"
                        >
                          <Heart className={`w-3.5 h-3.5 ${favorites[property.id] ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-1 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#C9A96E] font-bold mb-1">
                        <span>{property.type}</span>
                        <span className="text-slate-400 font-normal">{property.city}</span>
                      </div>

                      <Link href={`/properties/${property.slug}`}>
                        <h3 className="text-lg font-serif font-bold text-[#0A1628] mb-1 line-clamp-1 hover:text-[#C9A96E] transition-colors">
                          {property.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" /> {property.location}
                      </p>

                      {/* Spec Matrix Grid */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center mb-4 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Area</span>
                          <span className="font-bold text-[#0A1628]">{property.area}</span>
                        </div>
                        <div className="border-x border-slate-200">
                          <span className="text-[10px] text-slate-400 block uppercase">Carpet</span>
                          <span className="font-bold text-[#0A1628]">{property.carpetArea}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Rate</span>
                          <span className="font-bold text-emerald-700">{property.pricePerSqft}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Total Price</span>
                        <span className="text-xl font-bold text-[#0A1628]">{property.price}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/properties/${property.slug}`}>
                          <button className="px-4 py-2.5 bg-[#0A1628] text-white text-xs font-bold rounded-xl hover:bg-[#0A1628]/90 transition-all shadow-md shadow-[#0A1628]/10 flex items-center gap-1">
                            Details <ArrowRight className="w-3.5 h-3.5 text-[#C9A96E]" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Amenities Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AmenitiesShowcase />
      </div>

      {/* Floating Property Comparison Drawer */}
      <PropertyComparison 
        selectedItems={compareItems} 
        onRemoveItem={(id) => setCompareItems(prev => prev.filter(i => i.id !== id))}
        onClearAll={() => setCompareItems([])}
      />

      {/* Sticky Mobile Bottom Action Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden bg-[#0A1628] text-white rounded-2xl px-5 py-3 shadow-2xl flex items-center justify-between border border-[#C9A96E]/30">
        <button onClick={() => setIsFilterDrawerOpen(true)} className="flex items-center gap-2 font-bold text-xs text-[#C9A96E]">
          <Filter className="w-4 h-4" /> Filter Listings
        </button>
        <div className="w-px h-5 bg-white/20"></div>
        <span className="font-medium text-xs text-slate-300">{filteredProperties.length} Properties</span>
      </div>
    </div>
  );
}
