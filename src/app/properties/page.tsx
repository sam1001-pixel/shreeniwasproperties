'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, BedDouble, Bath, Square, Heart, SlidersHorizontal, ChevronDown } from 'lucide-react';

// Mock data
const mockProperties = [
  { id: 1, title: 'Luxury 3 BHK Apartment', location: 'C-Scheme, Jaipur', price: '₹45,000 /month', type: 'Rent', beds: 3, baths: 3, area: '1800 sq.ft', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Premium Royal Villa', location: 'Umaid Heritage, Jodhpur', price: '₹3.5 Cr', type: 'Buy', beds: 4, baths: 5, area: '4500 sq.ft', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Lake View Apartment', location: 'Fateh Sagar, Udaipur', price: '₹1.85 Cr', type: 'Buy', beds: 3, baths: 2, area: '1600 sq.ft', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Commercial Office Space', location: 'Vaishali Nagar, Jaipur', price: '₹65,000 /month', type: 'Commercial', beds: 0, baths: 2, area: '1200 sq.ft', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Heritage Style Kothi', location: 'Civil Lines, Bikaner', price: '₹2.2 Cr', type: 'Buy', beds: 5, baths: 4, area: '3200 sq.ft', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Modern Studio Apartment', location: 'Jagatpura, Jaipur', price: '₹18,000 /month', type: 'Rent', beds: 1, baths: 1, area: '600 sq.ft', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800' },
];

export default function PropertiesPage() {
  const [filterPurpose, setFilterPurpose] = useState('All');

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] font-sans pb-20">
      {/* Header Banner */}
      <div className="bg-[#0A1628] text-[#FDFBF7] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-[#C9A96E]">Explore Properties Across Rajasthan</h1>
          <p className="text-lg opacity-90">Showing 12 Properties in Jaipur, Jodhpur, Udaipur & more</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {['All', 'Rent', 'Buy', 'Commercial'].map(purpose => (
                <button 
                  key={purpose}
                  onClick={() => setFilterPurpose(purpose)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${filterPurpose === purpose ? 'bg-[#0A1628] text-[#C9A96E]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {purpose}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center text-sm text-gray-500 gap-2 cursor-pointer hover:text-[#0A1628]">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Advanced Filters</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:border-[#C9A96E]">
                <option>All Cities</option>
                <option>Jaipur</option>
                <option>Jodhpur</option>
                <option>Udaipur</option>
                <option>Kota</option>
                <option>Ajmer</option>
                <option>Bikaner</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:border-[#C9A96E]">
                <option>All Types</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Plot</option>
                <option>Commercial</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:border-[#C9A96E]">
                <option>All BHK</option>
                <option>1 BHK</option>
                <option>2 BHK</option>
                <option>3 BHK</option>
                <option>4+ BHK</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="flex relative">
              <input 
                type="text" 
                placeholder="Search keyword..." 
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 pl-4 pr-12 rounded-lg focus:outline-none focus:border-[#C9A96E]"
              />
              <button className="absolute right-2 top-2 bg-[#0A1628] text-[#C9A96E] p-1.5 rounded-md hover:bg-opacity-90 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sort and Results Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold font-serif">Featured Listings</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort by:</span>
            <select className="bg-transparent border-none text-[#0A1628] font-medium focus:outline-none cursor-pointer">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProperties.map((property, idx) => (
            <motion.div 
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Double bezel image container */}
              <div className="p-2">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#0A1628] text-[#C9A96E] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {property.type}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-sm">
                    <Heart className="w-5 h-5" />
                  </button>
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                    <p className="text-white font-bold text-xl">{property.price}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <Link href={`/properties/${property.id}`} className="block group-hover:text-[#C9A96E] transition-colors">
                  <h3 className="text-xl font-bold font-serif mb-2 line-clamp-1">{property.title}</h3>
                </Link>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1 text-[#C9A96E]" />
                  {property.location}
                </div>
                
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100 mt-auto">
                  {property.beds > 0 && (
                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded p-2 text-center">
                      <BedDouble className="w-5 h-5 text-[#0A1628] mb-1" />
                      <span className="text-xs text-gray-600 font-medium">{property.beds} Beds</span>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded p-2 text-center">
                      <Bath className="w-5 h-5 text-[#0A1628] mb-1" />
                      <span className="text-xs text-gray-600 font-medium">{property.baths} Baths</span>
                    </div>
                  )}
                  <div className="flex flex-col items-center justify-center bg-gray-50 rounded p-2 text-center">
                    <Square className="w-5 h-5 text-[#0A1628] mb-1" />
                    <span className="text-xs text-gray-600 font-medium">{property.area}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="bg-transparent border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-[#C9A96E] px-8 py-3 rounded-full font-medium transition-colors">
            Load More Properties
          </button>
        </div>
      </div>
    </div>
  );
}
