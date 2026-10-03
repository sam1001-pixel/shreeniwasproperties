'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, MapPin, Building2, Home, Briefcase, LandPlot, Users, 
  IndianRupee, ChevronDown, Check, Sparkles, Filter 
} from 'lucide-react';

const CITIES = ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer", "Bikaner", "Bhilwara"];

const POPULAR_LOCALITIES: Record<string, string[]> = {
  "Jaipur": ["Mansarovar", "Vaishali Nagar", "C-Scheme", "Malviya Nagar", "Jagatpura", "Raja Park"],
  "Udaipur": ["Fatehpura", "Sukher", "Hiran Magri", "Shobhagpura", "Panchwati"],
  "Jodhpur": ["Ratanada", "Sardarpura", "Shastri Nagar", "Paota", "Chopasni Housing Board"],
  "Kota": ["Talwandi", "Vigyan Nagar", "R K Puram", "Kunhari"],
  "Ajmer": ["Vaishali Nagar", "Civil Lines", "Panchsheel Nagar"],
  "Bikaner": ["Jayanagar", "Vyas Colony", "Rani Bazar"]
};

const BUDGET_OPTIONS = [
  { label: "Any Budget", value: "all" },
  { label: "Under ₹30 Lakhs", min: 0, max: 3000000 },
  { label: "₹30L - ₹60 Lakhs", min: 3000000, max: 6000000 },
  { label: "₹60L - ₹1.2 Crore", min: 6000000, max: 12000000 },
  { label: "₹1.2Cr - ₹2.5 Crore", min: 12000000, max: 25000000 },
  { label: "₹2.5 Cr+ Luxury", min: 25000000, max: 100000000 },
];

export default function SearchEngine99Acres() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'commercial' | 'plots' | 'pg'>('buy');
  const [selectedCity, setSelectedCity] = useState("Jaipur");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedBhk, setSelectedBhk] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [postedBy, setPostedBy] = useState("all");

  const tabs = [
    { id: 'buy', label: 'Buy', icon: Building2 },
    { id: 'rent', label: 'Rent', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Briefcase },
    { id: 'plots', label: 'Plots / Land', icon: LandPlot },
    { id: 'pg', label: 'PG / Co-Living', icon: Users },
  ];

  const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Villa"];

  const toggleBhk = (bhk: string) => {
    setSelectedBhk(prev => 
      prev.includes(bhk) ? prev.filter(item => item !== bhk) : [...prev, bhk]
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('city', selectedCity);
    params.set('tab', activeTab);
    if (selectedLocality) params.set('locality', selectedLocality);
    if (selectedBhk.length > 0) params.set('bhk', selectedBhk.join(','));
    if (selectedBudget !== 'all') params.set('budget', selectedBudget);
    if (postedBy !== 'all') params.set('postedBy', postedBy);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-100 max-w-5xl mx-auto relative z-20">
      {/* Shreeniwas Tab Bar */}
      <div className="flex gap-1.5 sm:gap-2 border-b border-slate-200 pb-3 mb-5 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-[#0A1628] text-[#C9A96E] shadow-md border border-[#C9A96E]/30' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-[#0A1628]'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#C9A96E]' : 'text-slate-400'}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Search Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* City Dropdown */}
        <div className="md:col-span-3 relative">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select City</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#C9A96E] absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedLocality("");
              }}
              className="w-full pl-9 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#0A1628] outline-none focus:ring-2 focus:ring-[#C9A96E] appearance-none cursor-pointer"
            >
              {CITIES.map(city => (
                <option key={city} value={city}>{city}, Rajasthan</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Locality Search & Pills */}
        <div className="md:col-span-5 relative">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Locality / Landmark</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              placeholder={`Search e.g. ${POPULAR_LOCALITIES[selectedCity]?.[0] || 'Mansarovar'}...`}
              className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-[#0A1628] outline-none focus:ring-2 focus:ring-[#C9A96E] placeholder-slate-400"
            />
          </div>
        </div>

        {/* Budget Selector */}
        <div className="md:col-span-4 relative">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Budget</label>
          <div className="relative">
            <IndianRupee className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full pl-9 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#0A1628] outline-none focus:ring-2 focus:ring-[#C9A96E] appearance-none cursor-pointer"
            >
              {BUDGET_OPTIONS.map((opt, i) => (
                <option key={i} value={opt.value || opt.label}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* BHK Config Pills & Extra Filter Buttons */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        {/* BHK Selector Pills */}
        {(activeTab === 'buy' || activeTab === 'rent') && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 mr-1">BHK:</span>
            {bhkOptions.map(bhk => {
              const isSelected = selectedBhk.includes(bhk);
              return (
                <button
                  key={bhk}
                  type="button"
                  onClick={() => toggleBhk(bhk)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-[#0A1628] text-white border-[#0A1628] shadow-sm' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 inline mr-1 text-[#C9A96E]" />}
                  {bhk}
                </button>
              );
            })}
          </div>
        )}

        {/* Posted By Quick Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Posted By:</span>
          {["all", "Owner", "Agent", "Builder"].map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setPostedBy(type)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                postedBy === type ? 'bg-[#C9A96E]/20 text-[#0A1628] font-bold border border-[#C9A96E]/40' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {type === 'all' ? 'All' : type}
            </button>
          ))}
        </div>

        {/* Search Submit Button */}
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto ml-auto px-7 py-3 bg-[#0A1628] hover:bg-[#0A1628]/90 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#0A1628]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#C9A96E]/30"
        >
          <Search className="w-4 h-4 text-[#C9A96E]" />
          Search Properties
        </button>
      </div>

      {/* Popular Localities Chips Bar */}
      {POPULAR_LOCALITIES[selectedCity] && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C9A96E]" />
            Top Localities:
          </span>
          {POPULAR_LOCALITIES[selectedCity].map(loc => (
            <button
              key={loc}
              onClick={() => setSelectedLocality(loc)}
              className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
                selectedLocality === loc 
                  ? 'bg-[#C9A96E] text-white font-semibold shadow' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
