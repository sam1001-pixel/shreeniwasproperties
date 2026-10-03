'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Filter, Grid, List, Map as MapIcon, 
  Heart, Share2, CheckCircle2, Phone, MessageSquare, 
  ChevronDown, X, Building, Home, Building2, Store,
  BedDouble, Bath, Square
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const MOCK_PROPERTIES = [
  {
    id: '1',
    slug: 'luxury-villa-jaipur',
    title: 'Royal Heritage Villa',
    location: 'Vaishali Nagar, Jaipur',
    city: 'Jaipur',
    price: '₹2.5 Cr',
    purpose: 'Buy',
    type: 'Villa',
    bhk: '4 BHK',
    area: '3,200 sq.ft',
    baths: 4,
    furnishing: 'Fully Furnished',
    verified: true,
    rera: true,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    slug: 'premium-apartment-jodhpur',
    title: 'Sunset View Heights',
    location: 'Sardarpura, Jodhpur',
    city: 'Jodhpur',
    price: '₹85 L',
    purpose: 'Buy',
    type: 'Apartment',
    bhk: '3 BHK',
    area: '1,800 sq.ft',
    baths: 3,
    furnishing: 'Semi-Furnished',
    verified: true,
    rera: true,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    slug: 'lake-view-apartment-udaipur',
    title: 'Fateh Sagar Residences',
    location: 'Fatehpura, Udaipur',
    city: 'Udaipur',
    price: '₹45,000/mo',
    purpose: 'Rent',
    type: 'Apartment',
    bhk: '2 BHK',
    area: '1,200 sq.ft',
    baths: 2,
    furnishing: 'Fully Furnished',
    verified: true,
    rera: false,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    slug: 'commercial-office-kota',
    title: 'Vibrant Business Park',
    location: 'Rajeev Gandhi Nagar, Kota',
    city: 'Kota',
    price: '₹1.2 Cr',
    purpose: 'Commercial',
    type: 'Commercial Office',
    bhk: 'N/A',
    area: '1,500 sq.ft',
    baths: 2,
    furnishing: 'Unfurnished',
    verified: true,
    rera: true,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '5',
    slug: 'independent-house-ajmer',
    title: 'Aravali View Homes',
    location: 'Pushkar Road, Ajmer',
    city: 'Ajmer',
    price: '₹95 L',
    purpose: 'Buy',
    type: 'Independent House',
    bhk: '3 BHK',
    area: '2,100 sq.ft',
    baths: 3,
    furnishing: 'Semi-Furnished',
    verified: false,
    rera: false,
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '6',
    slug: 'retail-shop-bikaner',
    title: 'City Center Plaza Shop',
    location: 'KEM Road, Bikaner',
    city: 'Bikaner',
    price: '₹25,000/mo',
    purpose: 'Commercial',
    type: 'Retail Shop',
    bhk: 'N/A',
    area: '400 sq.ft',
    baths: 1,
    furnishing: 'Unfurnished',
    verified: true,
    rera: false,
    image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=800',
  }
];

const CITIES = ['All Cities', 'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'];
const PROPERTY_TYPES = ['All Types', 'Apartment', 'Villa', 'Independent House', 'Penthouse', 'Commercial Office', 'Retail Shop', 'Plot'];
const BHK_OPTIONS = ['All', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'];
const FURNISHING_OPTIONS = ['All', 'Unfurnished', 'Semi-Furnished', 'Fully Furnished'];
const AMENITIES = ['Lift', 'Swimming Pool', 'Gym', 'Car Parking', 'Power Backup', '24/7 Security', 'CCTV', 'Vastu Compliant'];

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [purpose, setPurpose] = useState('All');
  const [city, setCity] = useState('All Cities');
  const [type, setType] = useState('All Types');
  const [bhk, setBhk] = useState('All');
  const [furnishing, setFurnishing] = useState('All');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPurpose('All');
    setCity('All Cities');
    setType('All Types');
    setBhk('All');
    setFurnishing('All');
  };

  const hasActiveFilters = purpose !== 'All' || city !== 'All Cities' || type !== 'All Types' || bhk !== 'All' || furnishing !== 'All' || searchQuery !== '';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628]">
      {/* Header / Search Area */}
      <div className="bg-[#0A1628] text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Discover Premium Properties</h1>
          
          <div className="bg-white rounded-xl p-4 shadow-xl flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by location, builder, or project..." 
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {['All', 'Rent', 'Buy', 'Commercial'].map(p => (
                <button 
                  key={p}
                  onClick={() => setPurpose(p)}
                  className={`px-6 py-3 rounded-lg whitespace-nowrap font-medium transition-colors ${
                    purpose === p ? 'bg-[#C9A96E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Filter className="w-5 h-5" /> Filters
              </h2>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-sm text-red-500 hover:underline">
                  Clear All
                </button>
              )}
            </div>

            {/* City */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
              >
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Property Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
              >
                {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* BHK */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">BHK</label>
              <div className="flex flex-wrap gap-2">
                {BHK_OPTIONS.map(b => (
                  <button 
                    key={b}
                    onClick={() => setBhk(b)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      bhk === b ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnishing */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
              <div className="flex flex-wrap gap-2">
                {FURNISHING_OPTIONS.map(f => (
                  <button 
                    key={f}
                    onClick={() => setFurnishing(f)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      furnishing === f ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
              <div className="space-y-2">
                {AMENITIES.map(amenity => (
                  <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#C9A96E] focus:ring-[#C9A96E]" />
                    <span className="text-sm text-gray-600">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-serif">Showing {MOCK_PROPERTIES.length} Properties</h2>
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {purpose !== 'All' && <span className="px-3 py-1 bg-[#0A1628]/5 text-sm rounded-full">{purpose}</span>}
                  {city !== 'All Cities' && <span className="px-3 py-1 bg-[#0A1628]/5 text-sm rounded-full">{city}</span>}
                  {type !== 'All Types' && <span className="px-3 py-1 bg-[#0A1628]/5 text-sm rounded-full">{type}</span>}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#0A1628] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#0A1628] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`p-2 rounded ${viewMode === 'map' ? 'bg-[#0A1628] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <MapIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Properties Grid/List */}
          {viewMode === 'map' ? (
            <div className="w-full h-[600px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
              <MapIcon className="w-12 h-12 mb-2" />
              <p>Map View Placeholder</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2' : 'grid-cols-1'}`}>
              <AnimatePresence>
                {MOCK_PROPERTIES.map((property, index) => (
                  <motion.div 
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      viewMode === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'
                    }`}
                  >
                    {/* Double Bezel / Image Area */}
                    <div className={`relative p-2 ${viewMode === 'list' ? 'sm:w-2/5' : 'w-full'}`}>
                      <div className={`relative rounded-lg overflow-hidden ${viewMode === 'list' ? 'h-full min-h-[200px]' : 'aspect-[4/3]'}`}>
                        <img 
                          src={property.image} 
                          alt={property.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur text-[#0A1628] text-xs font-semibold rounded-full uppercase tracking-wider">
                            {property.purpose}
                          </span>
                          {property.rera && (
                            <span className="px-3 py-1 bg-[#C9A96E]/90 backdrop-blur text-white text-xs font-semibold rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> RERA
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
                          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
                        >
                          <Heart className={`w-5 h-5 ${favorites[property.id] ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                        </button>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className={`p-5 flex flex-col flex-1 ${viewMode === 'list' ? 'justify-between' : ''}`}>
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link href={`/properties/${property.slug}`} className="hover:text-[#C9A96E] transition-colors">
                              <h3 className="text-xl font-serif font-semibold">{property.title}</h3>
                            </Link>
                            <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                              <MapPin className="w-4 h-4" /> {property.location}
                            </p>
                          </div>
                          <p className="text-[#0A1628] font-bold text-xl">{property.price}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100 my-4">
                          <div className="flex flex-col items-center justify-center text-center">
                            <BedDouble className="w-5 h-5 text-[#C9A96E] mb-1" />
                            <span className="text-xs text-gray-500">{property.bhk}</span>
                          </div>
                          <div className="flex flex-col items-center justify-center text-center border-x border-gray-100">
                            <Bath className="w-5 h-5 text-[#C9A96E] mb-1" />
                            <span className="text-xs text-gray-500">{property.baths} Baths</span>
                          </div>
                          <div className="flex flex-col items-center justify-center text-center">
                            <Square className="w-5 h-5 text-[#C9A96E] mb-1" />
                            <span className="text-xs text-gray-500">{property.area}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {property.type}
                        </span>
                        <div className="flex gap-2">
                          <button className="p-2 text-green-600 bg-green-50 rounded-full hover:bg-green-100 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <Link 
                            href={`/properties/${property.slug}`}
                            className="px-4 py-2 bg-[#0A1628] text-white text-sm font-medium rounded-lg hover:bg-[#0A1628]/90 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 border border-[#0A1628] text-[#0A1628] font-medium rounded-lg hover:bg-[#0A1628] hover:text-white transition-colors">
              Load More Properties
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
