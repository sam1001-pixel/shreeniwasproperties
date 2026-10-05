'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, MapPin, Filter, Grid, List, 
  Heart, CheckCircle2, MessageSquare, X, BedDouble, Bath, Square,
  ShieldCheck, Zap, Scale, ArrowRight, IndianRupee, Compass, Building2, ChevronDown, Sparkles, RefreshCw, LocateFixed, Loader2, Calendar, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyComparison, { PropertyCompareItem } from '@/components/shared/property-comparison';
import AmenitiesShowcase from '@/components/shared/amenities-showcase';
import ScheduleVisitModal from '@/components/shared/schedule-visit-modal';
import SavePropertyButton from '@/components/shared/save-property-button';
import PropertyShareModal, { ShareableProperty } from '@/components/shared/property-share-modal';
import { 
  detectUserCityViaGPS, 
  getSavedDetectedCity, 
  saveDetectedCity, 
  EVENT_NAME_LOCATION_DETECTED 
} from '@/lib/location-service';

const CITIES = ["All Cities", "Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer", "Bikaner", "Bhilwara", "Alwar"];
const PROPERTY_TYPES = ["All Types", "Luxury Villa", "Apartment", "Penthouse", "Heritage Haveli", "Commercial Office", "Plot / Land"];
const BHK_OPTIONS = ["All BHK", "1 BHK", "2 BHK", "3 BHK", "4+ BHK"];

const MOCK_PROPERTIES = [
  {
    id: "1",
    slug: "royal-heritage-residency-jaipur",
    title: "The Royal Heritage Residency",
    location: "Vaishali Nagar, Jaipur",
    city: "Jaipur",
    price: "₹3.5 Cr",
    rawPrice: 35000000,
    purpose: "Buy",
    type: "Luxury Villa",
    bhk: "4+ BHK",
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
    rawPrice: 18000000,
    purpose: "Buy",
    type: "Penthouse",
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
    rawPrice: 52000000,
    purpose: "Buy",
    type: "Heritage Haveli",
    bhk: "4+ BHK",
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
    rawPrice: 8500000,
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
    rawPrice: 21000000,
    purpose: "Buy",
    type: "Commercial Office",
    bhk: "Commercial",
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
    rawPrice: 6500000,
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
  },
  {
    id: "7",
    slug: "chambal-riverfront-villa-kota",
    title: "Chambal Riverfront Royal Villa",
    location: "RK Puram, Kota",
    city: "Kota",
    price: "₹1.4 Cr",
    rawPrice: 14000000,
    purpose: "Buy",
    type: "Luxury Villa",
    bhk: "3 BHK",
    area: "2,100 sq.ft",
    carpetArea: "1,850 sq.ft",
    facing: "North",
    baths: 3,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800&sig=7",
  },
  {
    id: "8",
    slug: "ana-sagar-lake-enclave-ajmer",
    title: "Ana Sagar Lakefront Residency",
    location: "Vaishali Nagar, Ajmer",
    city: "Ajmer",
    price: "₹75 Lakh",
    rawPrice: 7500000,
    purpose: "Buy",
    type: "Apartment",
    bhk: "2 BHK",
    area: "1,250 sq.ft",
    carpetArea: "1,100 sq.ft",
    facing: "East",
    baths: 2,
    status: "Ready to Move",
    verified: true,
    reraApproved: true,
    zeroBrokerage: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800&sig=8",
  }
];

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Search filter states
  const [selectedCity, setSelectedCity] = useState<string>("All Cities");
  const [selectedType, setSelectedType] = useState<string>("All Types");
  const [selectedBhk, setSelectedBhk] = useState<string>("All BHK");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<'All' | 'Buy' | 'Rent' | 'Commercial'>('All');

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [compareItems, setCompareItems] = useState<PropertyCompareItem[]>([]);
  const [propertiesList, setPropertiesList] = useState<any[]>(MOCK_PROPERTIES);
  const [isLocating, setIsLocating] = useState(false);
  const [detectedNote, setDetectedNote] = useState<string | null>(null);
  const [bookingProperty, setBookingProperty] = useState<any>(null);
  const [sharingProperty, setSharingProperty] = useState<ShareableProperty | null>(null);

  // Initialize filters from URL search params or detected GPS
  useEffect(() => {
    const cityParam = searchParams.get('city');
    if (cityParam && CITIES.includes(cityParam)) {
      setSelectedCity(cityParam);
    } else {
      // Default from saved GPS detection if no param in URL
      const saved = getSavedDetectedCity();
      if (saved && CITIES.includes(saved)) {
        setSelectedCity(saved);
        setDetectedNote(`Filtered by your detected city: ${saved}`);
      }
    }

    const localityParam = searchParams.get('locality') || searchParams.get('q');
    if (localityParam) {
      setSearchQuery(localityParam);
    }

    const tabParam = searchParams.get('tab');
    const purposeParam = searchParams.get('purpose');
    const targetPurpose = (purposeParam || tabParam || '').toLowerCase();
    if (targetPurpose) {
      if (targetPurpose.includes('sale') || targetPurpose === 'buy') setSelectedTab('Buy');
      else if (targetPurpose.includes('rent')) setSelectedTab('Rent');
      else if (targetPurpose.includes('commercial')) setSelectedTab('Commercial');
    }

    const bhkParam = searchParams.get('bhk');
    if (bhkParam) {
      if (bhkParam.includes('1')) setSelectedBhk('1 BHK');
      else if (bhkParam.includes('2')) setSelectedBhk('2 BHK');
      else if (bhkParam.includes('3')) setSelectedBhk('3 BHK');
      else if (bhkParam.includes('4')) setSelectedBhk('4+ BHK');
    }

    const handleLocationUpdate = (e: any) => {
      if (e.detail && CITIES.includes(e.detail)) {
        setSelectedCity(e.detail);
        setDetectedNote(`Switched to: ${e.detail}`);
      }
    };

    window.addEventListener(EVENT_NAME_LOCATION_DETECTED, handleLocationUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME_LOCATION_DETECTED, handleLocationUpdate);
    };
  }, [searchParams]);

  const handleDetectGPS = async () => {
    setIsLocating(true);
    try {
      const res = await detectUserCityViaGPS();
      if (res.success && res.cityName && CITIES.includes(res.cityName)) {
        setSelectedCity(res.cityName);
        setDetectedNote(`📍 GPS: ${res.cityName} (${res.distanceKm || 0} km away)`);
      }
    } finally {
      setIsLocating(false);
    }
  };

  const loadLiveProperties = () => {
    try {
      const savedProps = localStorage.getItem('shreeniwas_admin_properties');
      if (savedProps) {
        const parsed = JSON.parse(savedProps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formattedProps = parsed.map((p: any, idx: number) => {
            const locStr = p.location || 'Jaipur';
            const detectedCity = CITIES.find(c => c !== 'All Cities' && locStr.toLowerCase().includes(c.toLowerCase())) || 'Jaipur';
            return {
              id: p.id || String(idx + 100),
              slug: p.id?.toLowerCase() || `property-${idx}`,
              title: p.title || 'Luxury Property',
              location: locStr,
              city: detectedCity,
              price: p.price || 'Price on Request',
              rawPrice: Number(String(p.price).replace(/[^0-9]/g, '')) || 10000000,
              purpose: p.purpose === 'rent' ? 'Rent' : p.type?.includes('Commercial') ? 'Commercial' : 'Buy',
              type: p.type || 'Luxury Villa',
              bhk: p.bedrooms ? `${p.bedrooms} BHK` : p.type?.includes('Villa') ? '4+ BHK' : '3 BHK',
              area: p.sqft ? `${p.sqft} sq.ft` : '2,400 sq.ft',
              carpetArea: '2,100 sq.ft',
              facing: 'East (Vastu)',
              baths: p.bathrooms || 3,
              status: p.status || 'Ready to Move',
              verified: true,
              reraApproved: true,
              zeroBrokerage: true,
              image: p.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
            };
          });
          
          // Combine admin properties with default listings
          setPropertiesList([...formattedProps, ...MOCK_PROPERTIES]);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadLiveProperties();
    window.addEventListener('shreeniwas_data_updated', loadLiveProperties);
    window.addEventListener('storage', loadLiveProperties);
    return () => {
      window.removeEventListener('shreeniwas_data_updated', loadLiveProperties);
      window.removeEventListener('storage', loadLiveProperties);
    };
  }, []);

  // Load saved favorites on mount and keep synced
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shreeniwas_user_favorites');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const favMap: Record<string, boolean> = {};
          parsed.forEach((id: string) => { favMap[id] = true; });
          setFavorites(favMap);
        }
      }
    } catch (e) {}

    const handleFavsUpdate = () => {
      try {
        const stored = localStorage.getItem('shreeniwas_user_favorites');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const favMap: Record<string, boolean> = {};
            parsed.forEach((id: string) => { favMap[id] = true; });
            setFavorites(favMap);
          }
        }
      } catch (e) {}
    };

    window.addEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
    return () => window.removeEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const willBeSaved = !prev[id];
      const next = { ...prev, [id]: willBeSaved };
      try {
        const activeIds = Object.keys(next).filter(k => next[k]);
        localStorage.setItem('shreeniwas_user_favorites', JSON.stringify(activeIds));

        // Sync with user's portal saved properties if logged in
        const session = localStorage.getItem('shreeniwas_user_session');
        if (session) {
          const parsed = JSON.parse(session);
          if (parsed?.email) {
            const userFavsKey = `shreeniwas_saved_favorites_${parsed.email}`;
            const existingList = JSON.parse(localStorage.getItem(userFavsKey) || '[]');
            const currentProp = propertiesList.find(p => String(p.id) === String(id));
            if (currentProp) {
              let updatedList;
              if (willBeSaved) {
                const item = {
                  id: String(currentProp.id),
                  title: currentProp.title,
                  location: currentProp.location,
                  price: currentProp.price,
                  bhk: currentProp.bhk,
                  image: currentProp.image,
                  type: currentProp.type
                };
                updatedList = [item, ...existingList.filter((x: any) => String(x.id) !== String(id))];
              } else {
                updatedList = existingList.filter((x: any) => String(x.id) !== String(id));
              }
              localStorage.setItem(userFavsKey, JSON.stringify(updatedList));
            }
          }
        }

        window.dispatchEvent(new Event('shreeniwas_favorites_updated'));
      } catch (e) {}
      return next;
    });
  };

  const toggleCompare = (prop: any) => {
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
        pricePerSqft: prop.pricePerSqft || '₹8,500/sq.ft',
        sqft: prop.area,
        bhk: prop.bhk,
        image: prop.image,
        type: prop.type,
        status: prop.status,
        reraApproved: prop.reraApproved
      }];
    });
  };

  const handleClearFilters = () => {
    setSelectedCity("All Cities");
    setSelectedType("All Types");
    setSelectedBhk("All BHK");
    setSearchQuery("");
    setSelectedTab("All");
  };

  // Execute Filter Search
  const filteredProperties = propertiesList.filter(p => {
    // City filter
    const matchesCity = selectedCity === 'All Cities' || 
                        p.city.toLowerCase() === selectedCity.toLowerCase() ||
                        p.location.toLowerCase().includes(selectedCity.toLowerCase());

    // Type filter
    const matchesType = selectedType === 'All Types' ||
                        p.type.toLowerCase().includes(selectedType.toLowerCase());

    // BHK filter
    const matchesBhk = selectedBhk === 'All BHK' ||
                       p.bhk.toLowerCase().includes(selectedBhk.toLowerCase());

    // Tab filter (Buy, Rent, Commercial)
    const matchesTab = selectedTab === 'All' || 
                       (selectedTab === 'Buy' && p.purpose === 'Buy') ||
                       (selectedTab === 'Rent' && p.purpose === 'Rent') ||
                       (selectedTab === 'Commercial' && (p.purpose === 'Commercial' || p.type.includes('Commercial')));

    // Text Search (Title, Location)
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || 
                          p.title.toLowerCase().includes(q) || 
                          p.location.toLowerCase().includes(q) ||
                          p.city.toLowerCase().includes(q);

    return matchesCity && matchesType && matchesBhk && matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] pb-24 md:pb-12">
      {/* Header Banner & Interactive Search Section */}
      <div className="bg-[#0A1628] text-white pt-28 sm:pt-32 pb-10 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#C9A96E]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mb-6">
            <span className="bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
              Rajasthan Real Estate Search Engine
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              Search Properties in <span className="text-[#C9A96E]">Rajasthan</span>
            </h1>
            <p className="text-slate-300 text-sm mt-2">Filter verified villas, havelis, apartments & land across Jaipur, Udaipur, Jodhpur & more.</p>
          </div>

          {/* Interactive Multi-Control Search Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 border border-slate-100">
            {/* Top Purpose Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-100 pb-3">
              {(['All', 'Buy', 'Rent', 'Commercial'] as const).map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setSelectedTab(tab)}
                  className={`px-5 py-2.5 rounded-xl whitespace-nowrap font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    selectedTab === tab 
                      ? 'bg-[#0A1628] text-[#C9A96E] shadow border border-[#C9A96E]/30' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* City, Type, BHK & Search Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-center">
              {/* City Dropdown Selector */}
              <div className="md:col-span-3 relative">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select City</label>
                  {detectedNote && (
                    <span className="text-[10px] text-emerald-700 font-semibold truncate max-w-[140px]">
                      {detectedNote}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#C9A96E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      if (e.target.value !== 'All Cities') {
                        saveDetectedCity(e.target.value);
                      }
                    }}
                    className="w-full pl-9 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#0A1628] outline-none focus:ring-2 focus:ring-[#C9A96E] appearance-none cursor-pointer"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {detectedNote && (
                  <p className="text-[10px] text-emerald-700 font-medium mt-1 truncate">
                    {detectedNote}
                  </p>
                )}
              </div>

              {/* Property Type Dropdown */}
              <div className="md:col-span-3 relative">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Property Type</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#C9A96E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full pl-9 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#0A1628] outline-none focus:ring-2 focus:ring-[#C9A96E] appearance-none cursor-pointer"
                  >
                    {PROPERTY_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* BHK Dropdown */}
              <div className="md:col-span-2 relative">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">BHK Config</label>
                <div className="relative">
                  <BedDouble className="w-4 h-4 text-[#C9A96E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedBhk}
                    onChange={(e) => setSelectedBhk(e.target.value)}
                    className="w-full pl-9 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#0A1628] outline-none focus:ring-2 focus:ring-[#C9A96E] appearance-none cursor-pointer"
                  >
                    {BHK_OPTIONS.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Text Search Input */}
              <div className="md:col-span-4 relative">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Search Keyword / Locality</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="e.g. Vaishali Nagar, Fatehpura..." 
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#0A1628] outline-none focus:ring-2 focus:ring-[#C9A96E] placeholder-slate-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Results Bar & Active Filter Badges */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1628] flex items-center gap-2">
              Showing <span className="text-[#C9A96E] font-extrabold">{filteredProperties.length}</span> Properties
              {selectedCity !== 'All Cities' && (
                <span className="text-sm font-sans font-medium text-slate-500">in {selectedCity}</span>
              )}
            </h2>

            {/* Active Filters Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {selectedCity !== 'All Cities' && (
                <span className="bg-[#0A1628] text-[#C9A96E] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  📍 {selectedCity}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedCity('All Cities')} />
                </span>
              )}
              {selectedType !== 'All Types' && (
                <span className="bg-[#0A1628] text-[#C9A96E] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  🏢 {selectedType}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedType('All Types')} />
                </span>
              )}
              {selectedBhk !== 'All BHK' && (
                <span className="bg-[#0A1628] text-[#C9A96E] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  🛏️ {selectedBhk}
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedBhk('All BHK')} />
                </span>
              )}
              {searchQuery && (
                <span className="bg-[#0A1628] text-[#C9A96E] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  🔍 "{searchQuery}"
                  <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSearchQuery('')} />
                </span>
              )}

              {(selectedCity !== 'All Cities' || selectedType !== 'All Types' || selectedBhk !== 'All BHK' || searchQuery) && (
                <button 
                  onClick={handleClearFilters}
                  className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1 ml-2"
                >
                  <RefreshCw className="w-3 h-3" /> Clear All Filters
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#0A1628]"
            >
              <Filter className="w-4 h-4 text-[#C9A96E]" /> Filters
            </button>

            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#0A1628] text-[#C9A96E]' : 'text-slate-400'}`}><Grid className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#0A1628] text-[#C9A96E]' : 'text-slate-400'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Empty Search Results Notice */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-xl mx-auto my-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0A1628]">No Properties Found</h3>
            <p className="text-sm text-slate-500">We couldn't find any properties matching your search criteria in <strong>{selectedCity}</strong>.</p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl shadow hover:bg-[#0A1628]/90 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Show All Properties in Rajasthan
            </button>
          </div>
        ) : (
          /* Grid of Properties */
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProperties.map((property) => {
              const isCompared = compareItems.some(i => i.id === property.id);
              return (
                <motion.div 
                  key={property.id} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
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
                        <SavePropertyButton property={property} />
                      </div>

                      <div className="absolute bottom-3 left-3 bg-[#0A1628]/90 backdrop-blur text-white text-xs font-extrabold px-3 py-1 rounded-lg">
                        {property.price}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 pt-1 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[11px] font-bold text-[#C9A96E] uppercase tracking-wider">{property.type}</span>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{property.status}</span>
                      </div>
                      
                      <h3 className="font-serif font-bold text-lg text-[#0A1628] line-clamp-1 hover:text-[#C9A96E] transition-colors">
                        <Link href={`/properties/${property.slug}`}>
                          {property.title}
                        </Link>
                      </h3>
                      
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

                    <div className="flex items-center justify-between pt-1 gap-2">
                      <button 
                        type="button"
                        onClick={() => setBookingProperty(property)}
                        className="px-3 py-2 bg-[#0A1628]/5 hover:bg-[#0A1628] text-[#0A1628] hover:text-[#C9A96E] text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer border border-[#C9A96E]/30"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>Book Visit</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSharingProperty({
                            id: property.id,
                            slug: property.slug,
                            title: property.title,
                            price: property.price,
                            location: property.location,
                            type: property.type,
                            bhk: property.bhk,
                            image: property.image,
                          })}
                          className="p-2 text-slate-500 hover:text-[#0A1628] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Share Property on Apps"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>

                        <a 
                          href={`https://wa.me/916376117833?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}%20in%20${encodeURIComponent(property.location)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="WhatsApp Advisor"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>

                        <Link 
                          href={`/properties/${property.slug}`}
                          className="px-3.5 py-2 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1"
                        >
                          Details <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Floating Property Comparison Drawer */}
        <PropertyComparison 
          selectedItems={compareItems} 
          onRemoveItem={(id) => setCompareItems(prev => prev.filter(i => i.id !== id))} 
          onClearAll={() => setCompareItems([])} 
        />

        {/* Amenities & Standards Section */}
        <div className="mt-16">
          <AmenitiesShowcase />
        </div>

        {/* Schedule Visit Modal with 3 Time Variations */}
        <ScheduleVisitModal
          isOpen={!!bookingProperty}
          onClose={() => setBookingProperty(null)}
          propertyTitle={bookingProperty?.title}
          propertyLocation={bookingProperty?.location}
          propertyPrice={bookingProperty?.price}
          propertyImage={bookingProperty?.image}
        />

        {/* Multi-App Direct Property Share Modal */}
        <PropertyShareModal
          isOpen={!!sharingProperty}
          onClose={() => setSharingProperty(null)}
          property={sharingProperty}
        />
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#C9A96E] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-serif font-bold">Loading Rajasthan Properties...</p>
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
