'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Filter, Grid, List, Map as MapIcon, 
  Heart, CheckCircle2, MessageSquare, X, BedDouble, Bath, Square
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const MOCK_PROPERTIES = Array(6).fill(null).map((_, i) => ({
  id: String(i + 1),
  slug: `property-${i + 1}`,
  title: 'Royal Heritage Villa ' + (i + 1),
  location: 'Vaishali Nagar, Jaipur',
  price: '₹2.5 Cr',
  purpose: 'Buy',
  type: 'Villa',
  bhk: '4 BHK',
  area: '3,200 sq.ft',
  baths: 4,
  verified: true,
  rera: i % 2 === 0,
  image: `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800&sig=${i}`,
}));

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" /> Filters
        </h2>
        <button className="text-sm text-red-500 hover:underline">Clear All</button>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
        <select className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]">
          <option>All Cities</option>
          <option>Jaipur</option>
        </select>
      </div>
      <button className="w-full py-4 bg-[#0A1628] text-white rounded-xl font-medium mt-4 lg:hidden" onClick={() => setIsFilterDrawerOpen(false)}>
        Apply Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-[#0A1628] text-white pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif mb-6">Discover Premium Properties</h1>
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-xl flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search location..." 
                className="w-full pl-10 pr-10 py-3 sm:py-3 rounded-lg border border-gray-200 focus:outline-none text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {['All', 'Rent', 'Buy'].map(p => (
                <button key={p} className="px-6 py-3 rounded-lg whitespace-nowrap font-medium bg-gray-100 text-gray-700">{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 sm:gap-8 relative">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-80 flex-shrink-0 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <FiltersContent />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {isFilterDrawerOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50" onClick={() => setIsFilterDrawerOpen(false)} />
              <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="relative w-4/5 max-w-sm h-full bg-white p-6 shadow-2xl z-10 overflow-y-auto">
                <button onClick={() => setIsFilterDrawerOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full"><X className="w-5 h-5"/></button>
                <FiltersContent />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-serif">Showing {MOCK_PROPERTIES.length} Properties</h2>
            
            <div className="hidden sm:flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#0A1628] text-white' : 'text-gray-500'}`}><Grid className="w-5 h-5" /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#0A1628] text-white' : 'text-gray-500'}`}><List className="w-5 h-5" /></button>
            </div>
          </div>

          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {MOCK_PROPERTIES.map((property) => (
              <motion.div key={property.id} className={`bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex ${viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col'}`}>
                <div className={`relative p-2 ${viewMode === 'list' ? 'sm:w-2/5' : 'w-full'}`}>
                  <div className={`relative rounded-lg overflow-hidden ${viewMode === 'list' ? 'h-full min-h-[200px]' : 'aspect-[16/10]'}`}>
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-[#0A1628] text-xs font-semibold rounded-full uppercase">{property.purpose}</span>
                    </div>
                    <button onClick={() => toggleFavorite(property.id)} className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white">
                      <Heart className={`w-5 h-5 ${favorites[property.id] ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div>
                      <Link href={`/properties/${property.slug}`}><h3 className="text-lg sm:text-xl font-serif font-semibold line-clamp-1">{property.title}</h3></Link>
                      <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" /> {property.location}</p>
                    </div>
                    <p className="text-[#0A1628] font-bold text-lg sm:text-xl whitespace-nowrap">{property.price}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 my-3">
                    <div className="flex flex-col items-center justify-center text-center"><BedDouble className="w-4 h-4 text-[#C9A96E] mb-1" /><span className="text-[10px] sm:text-xs text-gray-500">{property.bhk}</span></div>
                    <div className="flex flex-col items-center justify-center text-center border-x border-gray-100"><Bath className="w-4 h-4 text-[#C9A96E] mb-1" /><span className="text-[10px] sm:text-xs text-gray-500">{property.baths} Baths</span></div>
                    <div className="flex flex-col items-center justify-center text-center"><Square className="w-4 h-4 text-[#C9A96E] mb-1" /><span className="text-[10px] sm:text-xs text-gray-500">{property.area}</span></div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{property.type}</span>
                    <div className="flex gap-2">
                      <button className="p-2 sm:px-3 sm:py-2 text-green-600 bg-green-50 rounded-lg"><MessageSquare className="w-4 h-4" /></button>
                      <Link href={`/properties/${property.slug}`} className="px-4 py-2 bg-[#0A1628] text-white text-xs sm:text-sm font-medium rounded-lg">View</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Action Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden bg-[#0A1628] text-white rounded-full px-6 py-3 shadow-2xl flex items-center justify-between">
        <button onClick={() => setIsFilterDrawerOpen(true)} className="flex items-center gap-2 font-medium">
          <Filter className="w-5 h-5" /> Filter Properties
        </button>
        <div className="w-px h-5 bg-white/20"></div>
        <span className="font-medium">{MOCK_PROPERTIES.length} Results</span>
      </div>
    </div>
  );
}
