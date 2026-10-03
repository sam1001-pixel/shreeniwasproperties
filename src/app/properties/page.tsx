"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MapPin, Bed, Bath, Square, Search, SlidersHorizontal, ChevronDown, CheckCircle2 } from "lucide-react";

// Mock Data
const allProperties = [
  {
    id: "p1",
    slug: "luxury-villa-jaipur",
    title: "Heritage Luxury Villa",
    locality: "Vaishali Nagar",
    city: "Jaipur",
    price: "₹4.5 Cr",
    priceValue: 45000000,
    type: "Villa",
    purpose: "Buy",
    bhk: "4+ BHK",
    bhkNum: 4,
    beds: 5,
    baths: 6,
    area: "4,500 sqft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    rera: true,
    new: true,
  },
  {
    id: "p2",
    slug: "premium-apartment-udaipur",
    title: "Lakeview Premium Apartment",
    locality: "Fateh Sagar",
    city: "Udaipur",
    price: "₹1.2 Lakh/mo",
    priceValue: 120000,
    type: "Apartment",
    purpose: "Rent",
    bhk: "3 BHK",
    bhkNum: 3,
    beds: 3,
    baths: 3,
    area: "2,200 sqft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    rera: true,
    new: false,
  },
  {
    id: "p3",
    slug: "modern-penthouse-jodhpur",
    title: "Desert View Penthouse",
    locality: "Umaid Heritage",
    city: "Jodhpur",
    price: "₹6.8 Cr",
    priceValue: 68000000,
    type: "Penthouse",
    purpose: "Buy",
    bhk: "4+ BHK",
    bhkNum: 4,
    beds: 4,
    baths: 5,
    area: "5,100 sqft",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
    rera: false,
    new: true,
  },
  {
    id: "p4",
    slug: "commercial-space-kota",
    title: "Prime Retail Space",
    locality: "Rajeev Gandhi Nagar",
    city: "Kota",
    price: "₹2.5 Lakh/mo",
    priceValue: 250000,
    type: "Commercial",
    purpose: "Commercial",
    bhk: "All",
    bhkNum: 0,
    beds: 0,
    baths: 2,
    area: "3,000 sqft",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    rera: true,
    new: false,
  }
];

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [purpose, setPurpose] = useState("All");
  const [city, setCity] = useState("All Cities");
  const [type, setType] = useState("All Types");
  const [bhk, setBhk] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredProperties = useMemo(() => {
    return allProperties.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.locality.toLowerCase().includes(search.toLowerCase());
      const matchPurpose = purpose === "All" || p.purpose === purpose;
      const matchCity = city === "All Cities" || p.city === city;
      const matchType = type === "All Types" || p.type === type;
      const matchBhk = bhk === "All" || p.bhk === bhk;
      return matchSearch && matchPurpose && matchCity && matchType && matchBhk;
    }).sort((a, b) => {
      if (sort === "Price: Low to High") return a.priceValue - b.priceValue;
      if (sort === "Price: High to Low") return b.priceValue - a.priceValue;
      return 0; // Newest logic would be here
    });
  }, [search, purpose, city, type, bhk, sort]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] font-sans pb-20">
      {/* Header section */}
      <div className="bg-[#0A1628] text-white pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-[#C9A96E] mb-6">Discover Your Signature Space</h1>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg p-2 flex items-center shadow-lg max-w-4xl">
            <Search className="text-gray-400 ml-3 mr-2" size={20} />
            <input 
              type="text" 
              placeholder="Search by title, locality..." 
              className="flex-1 bg-transparent text-gray-800 outline-none p-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-[#C9A96E] text-[#0A1628] px-6 py-2 rounded-md font-medium hover:bg-[#b0925d] transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4 space-y-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
                <SlidersHorizontal size={18} /> Filters
              </h3>
              
              <div className="space-y-6">
                {/* Purpose */}
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">Purpose</label>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Rent", "Buy", "Commercial"].map(p => (
                      <button 
                        key={p} 
                        onClick={() => setPurpose(p)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${purpose === p ? 'bg-[#0A1628] text-[#C9A96E]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">City</label>
                  <select 
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white outline-none focus:border-[#C9A96E]"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    {["All Cities", "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">Property Type</label>
                  <select 
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white outline-none focus:border-[#C9A96E]"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {["All Types", "Apartment", "Villa", "Penthouse", "Commercial", "Plot"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* BHK */}
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">Bedrooms</label>
                  <div className="flex flex-wrap gap-2">
                    {["All", "1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map(b => (
                      <button 
                        key={b} 
                        onClick={() => setBhk(b)}
                        className={`px-3 py-1.5 border rounded-md text-sm transition-colors ${bhk === b ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#0A1628]' : 'border-gray-200 hover:border-[#C9A96E]'}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 font-medium">
                Showing <span className="text-[#0A1628] font-bold">{filteredProperties.length}</span> properties
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select 
                  className="p-2 border border-gray-300 rounded-md bg-white outline-none text-sm font-medium focus:border-[#C9A96E]"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                <button onClick={() => { setSearch(""); setPurpose("All"); setCity("All Cities"); setType("All Types"); setBhk("All"); }} className="mt-4 text-[#C9A96E] hover:underline">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.slice(0, visibleCount).map((property) => (
                  <Link href={`/properties/${property.slug}`} key={property.id}>
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      {/* Double Bezel Inner Border effect */}
                      <div className="absolute inset-1 border border-white/40 pointer-events-none z-10 rounded-lg"></div>
                      
                      <div className="relative h-64 overflow-hidden">
                        <Image src={property.image} alt={property.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                          <span className="bg-[#0A1628] text-[#C9A96E] text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-md">
                            {property.purpose}
                          </span>
                          {property.rera && (
                            <span className="bg-green-600/90 text-white text-xs font-bold px-3 py-1 rounded-sm flex items-center gap-1 shadow-md">
                              <CheckCircle2 size={12} /> RERA Verified
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => toggleFavorite(property.id, e)}
                          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                        >
                          <Heart size={20} className={favorites.includes(property.id) ? "fill-red-500 text-red-500" : ""} />
                        </button>
                      </div>

                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-serif font-semibold text-[#0A1628] line-clamp-1">{property.title}</h3>
                          <span className="text-lg font-bold text-[#C9A96E] whitespace-nowrap ml-3">{property.price}</span>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                          <MapPin size={14} /> {property.locality}, {property.city}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t border-gray-100">
                          {property.beds > 0 && <span className="flex items-center gap-1.5"><Bed size={16} className="text-[#C9A96E]" /> {property.beds} Beds</span>}
                          {property.baths > 0 && <span className="flex items-center gap-1.5"><Bath size={16} className="text-[#C9A96E]" /> {property.baths} Baths</span>}
                          <span className="flex items-center gap-1.5"><Square size={16} className="text-[#C9A96E]" /> {property.area}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}

            {visibleCount < filteredProperties.length && (
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 4)}
                  className="border border-[#0A1628] text-[#0A1628] px-8 py-3 rounded-md font-medium hover:bg-[#0A1628] hover:text-[#C9A96E] transition-colors"
                >
                  Load More Properties
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
