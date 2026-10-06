"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  Home,
  Building2,
  Briefcase,
  IndianRupee,
  CheckCircle2,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  UserCheck,
  PhoneCall,
  Scale,
  Sparkles,
  Plus,
  LandPlot,
  Award,
  Zap,
  Building,
  Check,
  Calendar,
  KeyRound,
  FileCheck,
  Quote,
  Clock,
  BookOpen,
  X
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ShreeniwasSearchEngine from "@/components/shared/shreeniwas-search-engine";
import PropertyComparison, { PropertyCompareItem } from "@/components/shared/property-comparison";
import AmenitiesShowcase from "@/components/shared/amenities-showcase";
import OwnerReelsFeed from "@/components/shared/owner-reels-feed";
import NewProjectsSection from "@/components/shared/new-projects-section";
import PricingTariffSection from "@/components/shared/pricing-tariff-section";
import SavePropertyButton from "@/components/shared/save-property-button";
import TopLocalitiesPriceTrends from "@/components/shared/top-localities-price-trends";
import { syncPriceTrendsWithLiveProperties } from "@/lib/location-service";
import { useSiteSettings } from "@/lib/settings/site-settings-context";

// Featured Properties
const FEATURED_PROPERTIES = [
  {
    id: 1,
    slug: "royal-heritage-residency-jaipur",
    title: "The Royal Heritage Residency",
    location: "Vaishali Nagar, Jaipur",
    city: "Jaipur",
    price: "₹3.5 Cr",
    pricePerSqft: "₹10,937/sq.ft",
    sqft: 3200,
    bhk: "4 BHK",
    type: "Luxury Villa",
    category: "Luxury Villas",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop&sig=1",
    reraApproved: true,
    verified: true,
    zeroBrokerage: true
  },
  {
    id: 2,
    slug: "lakeview-palace-heights-udaipur",
    title: "Lakeview Palace Heights",
    location: "Fatehpura, Udaipur",
    city: "Udaipur",
    price: "₹1.8 Cr",
    pricePerSqft: "₹8,181/sq.ft",
    sqft: 2200,
    bhk: "3 BHK",
    type: "Penthouse Apartment",
    category: "Apartments",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop&sig=2",
    reraApproved: true,
    verified: true,
    zeroBrokerage: false
  },
  {
    id: 3,
    slug: "sun-city-heritage-haveli-jodhpur",
    title: "Sun City Heritage Haveli",
    location: "Ratanada, Jodhpur",
    city: "Jodhpur",
    price: "₹5.2 Cr",
    pricePerSqft: "₹11,555/sq.ft",
    sqft: 4500,
    bhk: "5+ BHK",
    type: "Heritage Haveli",
    category: "Havelis",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop&sig=3",
    reraApproved: true,
    verified: true,
    zeroBrokerage: true
  },
  {
    id: 4,
    slug: "shreeniwas-prime-enclave-jaipur",
    title: "Shreeniwas Prime Enclave",
    location: "Mansarovar, Jaipur",
    city: "Jaipur",
    price: "₹85 Lakh",
    pricePerSqft: "₹5,666/sq.ft",
    sqft: 1500,
    bhk: "3 BHK",
    type: "Modern Apartment",
    category: "Apartments",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop&sig=4",
    reraApproved: true,
    verified: true,
    zeroBrokerage: true
  },
  {
    id: 5,
    slug: "pink-city-commercial-plaza-jaipur",
    title: "Pink City Commercial Plaza",
    location: "C-Scheme, Jaipur",
    city: "Jaipur",
    price: "₹2.1 Cr",
    pricePerSqft: "₹14,000/sq.ft",
    sqft: 1500,
    bhk: "Office Space",
    type: "Commercial",
    category: "Commercial",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop&sig=5",
    reraApproved: true,
    verified: true,
    zeroBrokerage: false
  },
  {
    id: 6,
    slug: "lake-city-royal-residency-udaipur",
    title: "Lake City Royal Residency",
    location: "Shobhagpura, Udaipur",
    city: "Udaipur",
    price: "₹65 Lakh",
    pricePerSqft: "₹4,814/sq.ft",
    sqft: 1350,
    bhk: "2 BHK",
    type: "Apartment",
    category: "Apartments",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop&sig=6",
    reraApproved: true,
    verified: true,
    zeroBrokerage: true
  },
  {
    id: 7,
    slug: "royal-palms-luxury-villa-jodhpur",
    title: "Royal Palms Luxury Villa",
    location: "Sardarpura, Jodhpur",
    city: "Jodhpur",
    price: "₹4.1 Cr",
    pricePerSqft: "₹11,080/sq.ft",
    sqft: 3700,
    bhk: "4 BHK",
    type: "Luxury Villa",
    category: "Luxury Villas",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop&sig=7",
    reraApproved: true,
    verified: true,
    zeroBrokerage: true
  },
  {
    id: 8,
    slug: "marwar-courtyard-heritage-haveli-jodhpur",
    title: "Marwar Courtyard Heritage Haveli",
    location: "Old City, Jodhpur",
    city: "Jodhpur",
    price: "₹6.8 Cr",
    pricePerSqft: "₹13,600/sq.ft",
    sqft: 5000,
    bhk: "6 BHK",
    type: "Heritage Haveli",
    category: "Havelis",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop&sig=8",
    reraApproved: true,
    verified: true,
    zeroBrokerage: true
  }
];

// Top Rajasthan Localities Price Trends Data
const LOCALITY_PRICE_TRENDS = [
  { name: "Mansarovar", city: "Jaipur", avgPrice: "₹4,850", growth: "+14.2%", type: "High Demand", count: "340+ Properties" },
  { name: "C-Scheme", city: "Jaipur", avgPrice: "₹12,400", growth: "+9.8%", type: "Ultra Luxury", count: "115+ Properties" },
  { name: "Vaishali Nagar", city: "Jaipur", avgPrice: "₹6,900", growth: "+12.5%", type: "Premium Residential", count: "280+ Properties" },
  { name: "Fatehpura", city: "Udaipur", avgPrice: "₹7,200", growth: "+16.1%", type: "Lake View", count: "95+ Properties" },
  { name: "Ratanada", city: "Jodhpur", avgPrice: "₹5,400", growth: "+11.0%", type: "Heritage & Villas", count: "140+ Properties" },
  { name: "Panchsheel Nagar", city: "Ajmer", avgPrice: "₹3,600", growth: "+8.4%", type: "Affordable", count: "80+ Properties" },
];

// Market Insights & Blog Articles
const BLOG_POSTS = [
  {
    id: 1,
    slug: "top-10-investment-locations-jaipur-2024",
    title: "Top 10 High-Return Property Investment Hotspots in Jaipur",
    category: "Market Trends",
    date: "Oct 12, 2024",
    readTime: "5 min read",
    excerpt: "Discover why Mansarovar Extension and Jagatpura are yielding up to 14.2% annual capital appreciation.",
    image: "https://images.unsplash.com/photo-1599661559886-41b80c541b00?q=80&w=600"
  },
  {
    id: 2,
    slug: "understanding-rera-guidelines-rajasthan",
    title: "Complete Guide to RERA Guidelines & Buyer Safety in Rajasthan",
    category: "Legal & RERA",
    date: "Oct 08, 2024",
    readTime: "7 min read",
    excerpt: "Everything you need to verify before handing over down payments for under-construction flats.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600"
  },
  {
    id: 3,
    slug: "vastu-tips-for-luxury-villas",
    title: "Essential Vastu Shastra Guidelines for Buying Luxury Villas in Udaipur",
    category: "Architecture & Vastu",
    date: "Oct 02, 2024",
    readTime: "4 min read",
    excerpt: "How East-facing entrances and north-east water bodies enhance prosperity and peace.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600"
  }
];

// Home Buying Journey Steps Data
const JOURNEY_STEPS = [
  { step: "01", title: "Filter Verified Properties", desc: "Browse 1,240+ RERA verified villas, apartments & plots with transparent pricing.", icon: Search },
  { step: "02", title: "Schedule VIP Cab Visit (₹499)", desc: "Book guaranteed cab pickup with senior advisor for physical tour.", icon: Calendar },
  { step: "03", title: "Legal & RERA Audit", desc: "100% paper verification of land titles & encumbrance certificates.", icon: FileCheck },
  { step: "04", title: "Keys Handover & Move", desc: "Finalize payment at best negotiated price and receive luxury keys.", icon: KeyRound }
];

// Testimonials Data
const TESTIMONIALS = [
  {
    name: "Dr. Alok & Sunita Mehta",
    role: "Villa Buyers in Jaipur",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    quote: "Shreeniwas Properties made buying our 4 BHK villa in Vaishali Nagar effortless. The VIP site visit with guaranteed cab pickup and RERA title checks gave us 100% peace of mind."
  },
  {
    name: "Vikramaditya Singh",
    role: "Heritage Property Investor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    quote: "Their team has unmatched local authority across Udaipur & Jodhpur. I found a prime lakeview commercial plot direct from owner!"
  }
];

// EMI Calculator Component (Sleek Mobile-First Compact UI)
const EMICalculator = () => {
  const [price, setPrice] = useState(10000000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const principal = price - (price * downPayment) / 100;
  const r = interestRate / 12 / 100;
  const n = tenure * 12;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmount = emi * n;
  const totalInterest = totalAmount - principal;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-200/80 max-w-3xl mx-auto my-4 sm:my-6">
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] font-bold text-[10px] uppercase tracking-wider mb-2">
          <TrendingUp className="w-3 h-3" /> Shreeniwas Financial Tool
        </div>
        <h3 className="text-lg sm:text-xl font-serif text-[#0A1628] font-bold mb-1">Home Loan & Mortgage EMI Calculator</h3>
        <p className="text-slate-500 text-xs">Instant bank interest rate estimate & monthly payout breakdown</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-center">
        <div className="space-y-3.5 w-full md:w-1/2">
          {[
            { label: 'Property Price', val: price, set: setPrice, min: 1000000, max: 50000000, step: 100000, display: formatCurrency(price) },
            { label: 'Down Payment (%)', val: downPayment, set: setDownPayment, min: 10, max: 50, step: 1, display: `${downPayment}% (${formatCurrency((price * downPayment) / 100)})` },
            { label: 'Interest Rate', val: interestRate, set: setInterestRate, min: 7, max: 12, step: 0.1, display: `${interestRate}%` },
            { label: 'Loan Tenure', val: tenure, set: setTenure, min: 5, max: 30, step: 1, display: `${tenure} Yrs` }
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1 text-xs">
                <label className="font-semibold text-slate-700">{item.label}</label>
                <span className="font-bold text-[#0A1628]">{item.display}</span>
              </div>
              <input 
                type="range" min={item.min} max={item.max} step={item.step} 
                value={item.val} onChange={(e) => item.set(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C9A96E] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#C9A96E] [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
          ))}
        </div>

        <div className="bg-[#FDFBF7] p-4 sm:p-5 rounded-xl border border-[#C9A96E]/30 flex flex-col justify-center w-full md:w-1/2 shadow-inner">
          <div className="text-center mb-4">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Your Monthly Loan EMI</p>
            <p className="text-2xl sm:text-3xl font-serif text-[#0A1628] font-extrabold">{formatCurrency(emi)}</p>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
              <span className="text-slate-600">Principal Amount</span>
              <span className="font-bold text-slate-800">{formatCurrency(principal)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
              <span className="text-slate-600">Total Interest</span>
              <span className="font-bold text-amber-600">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-700 font-semibold">Total Payable</span>
              <span className="font-bold text-[#0A1628]">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1.5">
            <div className="w-full h-2 flex rounded-full overflow-hidden">
              <div className="bg-[#0A1628]" style={{ width: `${(principal/totalAmount)*100}%` }}></div>
              <div className="bg-[#C9A96E]" style={{ width: `${(totalInterest/totalAmount)*100}%` }}></div>
            </div>
            <div className="flex justify-between text-[10px] font-semibold mt-0.5">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#0A1628]"></span> Principal ({Math.round((principal/totalAmount)*100)}%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#C9A96E]"></span> Interest ({Math.round((totalInterest/totalAmount)*100)}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MarketingPage() {
  const [propFilter, setPropFilter] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareItems, setCompareItems] = useState<PropertyCompareItem[]>([]);

  const [propertiesList, setPropertiesList] = useState<any[]>(FEATURED_PROPERTIES);
  const [blogPostsList, setBlogPostsList] = useState<any[]>(BLOG_POSTS);
  const [testimonialsList, setTestimonialsList] = useState<any[]>(TESTIMONIALS);

  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const featuredTrackRef = useRef<HTMLDivElement>(null);
  const journeyScrollRef = useRef<HTMLDivElement>(null);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);

  const [isFeaturedPaused, setIsFeaturedPaused] = useState(false);
  const [isJourneyPaused, setIsJourneyPaused] = useState(false);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  // Filtered properties based strictly on selected Category Option
  const filteredProperties = useMemo(() => {
    return propertiesList.filter((prop) => {
      if (propFilter === 'All') return true;
      if (propFilter === 'Luxury Villas') {
        return prop.type?.toLowerCase().includes('villa') || prop.category === 'Luxury Villas';
      }
      if (propFilter === 'Apartments') {
        return prop.type?.toLowerCase().includes('apartment') || prop.type?.toLowerCase().includes('penthouse') || prop.category === 'Apartments';
      }
      if (propFilter === 'Commercial') {
        return prop.type?.toLowerCase().includes('commercial') || prop.category === 'Commercial';
      }
      if (propFilter === 'Havelis') {
        return prop.type?.toLowerCase().includes('haveli') || prop.category === 'Havelis';
      }
      return true;
    });
  }, [propertiesList, propFilter]);

  // Dynamic counts for each category option
  const categoryCounts = useMemo(() => {
    return {
      'All': propertiesList.length,
      'Luxury Villas': propertiesList.filter(p => p.type?.toLowerCase().includes('villa') || p.category === 'Luxury Villas').length,
      'Apartments': propertiesList.filter(p => p.type?.toLowerCase().includes('apartment') || p.type?.toLowerCase().includes('penthouse') || p.category === 'Apartments').length,
      'Commercial': propertiesList.filter(p => p.type?.toLowerCase().includes('commercial') || p.category === 'Commercial').length,
      'Havelis': propertiesList.filter(p => p.type?.toLowerCase().includes('haveli') || p.category === 'Havelis').length,
    };
  }, [propertiesList]);

  const scrollFeatured = (direction: 'left' | 'right') => {
    if (featuredTrackRef.current) {
      const scrollAmount = 340;
      featuredTrackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const { settings } = useSiteSettings();
  const [heroBg, setHeroBg] = useState('/hero/jodhpur-hero-royal.jpg');

  // Keep heroBg in sync with global settings context
  useEffect(() => {
    if (settings?.heroBgUrl) {
      setHeroBg(settings.heroBgUrl);
    }
  }, [settings?.heroBgUrl]);

  const loadLiveData = () => {
    try {
      const savedSettings = localStorage.getItem('shreeniwas_platform_settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        if (parsed.heroBgUrl) {
          // Auto-migrate legacy Jaipur or external unsplash link to Jodhpur Royal Palace
          if (
            parsed.heroBgUrl.includes('47145ed94245') ||
            parsed.heroBgUrl.includes('hawa-mahal') ||
            parsed.heroBgUrl.includes('unsplash.com')
          ) {
            parsed.heroBgUrl = '/hero/jodhpur-hero-royal.jpg';
            localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(parsed));
            setHeroBg('/hero/jodhpur-hero-royal.jpg');
          } else {
            setHeroBg(parsed.heroBgUrl);
          }
        }
      }

      const savedProps = localStorage.getItem('shreeniwas_admin_properties');
      if (savedProps) {
        const parsed = JSON.parse(savedProps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formattedProps = parsed.map((p: any, idx: number) => ({
            id: p.id || idx + 1,
            title: p.title || 'Luxury Property',
            location: p.location || 'Jaipur',
            city: p.location?.includes('Udaipur') ? 'Udaipur' : p.location?.includes('Jodhpur') ? 'Jodhpur' : 'Jaipur',
            price: p.price || 'Price on Request',
            pricePerSqft: '₹8,500/sq.ft',
            sqft: 2000,
            bhk: p.type?.includes('Villa') ? '4 BHK' : p.type?.includes('Penthouse') ? '3 BHK' : '2 BHK',
            type: p.type || 'Luxury Villa',
            status: p.status || 'Ready to Move',
            image: p.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800',
            reraApproved: true,
            verified: true,
            zeroBrokerage: true
          }));
          setPropertiesList(formattedProps);
          syncPriceTrendsWithLiveProperties(formattedProps);
        }
      } else {
        syncPriceTrendsWithLiveProperties(FEATURED_PROPERTIES);
      }

      const savedBlogs = localStorage.getItem('shreeniwas_blog_posts');
      if (savedBlogs) {
        const parsed = JSON.parse(savedBlogs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formattedBlogs = parsed.map((b: any, idx: number) => ({
            id: b.id || idx + 1,
            slug: b.id?.toLowerCase() || `blog-${idx}`,
            title: b.title || 'Jaipur Real Estate Insights',
            category: b.category || 'Market Trends',
            date: b.date || 'Oct 2024',
            readTime: b.readTime || '5 min read',
            excerpt: b.excerpt || b.title,
            image: b.image || 'https://images.unsplash.com/photo-1599661559886-41b80c541b00?q=80&w=600'
          }));
          setBlogPostsList(formattedBlogs);
        }
      }

      const savedReviews = localStorage.getItem('shreeniwas_testimonials_management');
      if (savedReviews) {
        const parsed = JSON.parse(savedReviews);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formattedReviews = parsed.map((r: any) => ({
            name: r.name || 'Verified Client',
            role: r.role || 'Property Buyer',
            image: r.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
            quote: r.quote || 'Excellent service from Shreeniwas Properties!'
          }));
          setTestimonialsList(formattedReviews);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadLiveData();
    try {
      const savedFavs = localStorage.getItem('shreeniwas_user_favorites');
      if (savedFavs) {
        const parsed = JSON.parse(savedFavs);
        if (Array.isArray(parsed)) {
          setFavorites(parsed.map(Number));
        }
      }
    } catch (e) {}

    const handleFavsUpdate = () => {
      try {
        const savedFavs = localStorage.getItem('shreeniwas_user_favorites');
        if (savedFavs) {
          const parsed = JSON.parse(savedFavs);
          if (Array.isArray(parsed)) setFavorites(parsed.map(Number));
        }
      } catch (e) {}
    };

    window.addEventListener('shreeniwas_data_updated', loadLiveData);
    window.addEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
    window.addEventListener('storage', loadLiveData);
    return () => {
      window.removeEventListener('shreeniwas_data_updated', loadLiveData);
      window.removeEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
      window.removeEventListener('storage', loadLiveData);
    };
  }, []);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollAmount = clientWidth * 0.75;
      ref.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll Featured Properties (Reels-style infinite continuous loop)
  useEffect(() => {
    let animId: number;
    const scroll = () => {
      if (featuredScrollRef.current && !isFeaturedPaused) {
        const { scrollLeft, scrollWidth } = featuredScrollRef.current;
        const resetPoint = scrollWidth / 3;
        if (scrollLeft >= resetPoint) {
          featuredScrollRef.current.scrollLeft = 0;
        } else {
          featuredScrollRef.current.scrollLeft += 1.0;
        }
      }
      animId = requestAnimationFrame(scroll);
    };
    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, [isFeaturedPaused]);

  // Auto-scroll Home Buying Journey (Reels-style infinite continuous loop)
  useEffect(() => {
    let animId: number;
    const scroll = () => {
      if (journeyScrollRef.current && !isJourneyPaused) {
        const { scrollLeft, scrollWidth } = journeyScrollRef.current;
        const resetPoint = scrollWidth / 3;
        if (scrollLeft >= resetPoint) {
          journeyScrollRef.current.scrollLeft = 0;
        } else {
          journeyScrollRef.current.scrollLeft += 0.95;
        }
      }
      animId = requestAnimationFrame(scroll);
    };
    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, [isJourneyPaused]);

  // Auto-scroll Buyer Testimonials (Reels-style infinite continuous loop)
  useEffect(() => {
    let animId: number;
    const scroll = () => {
      if (testimonialScrollRef.current && !isTestimonialPaused) {
        const { scrollLeft, scrollWidth } = testimonialScrollRef.current;
        const resetPoint = scrollWidth / 3;
        if (scrollLeft >= resetPoint) {
          testimonialScrollRef.current.scrollLeft = 0;
        } else {
          testimonialScrollRef.current.scrollLeft += 1.0;
        }
      }
      animId = requestAnimationFrame(scroll);
    };
    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, [isTestimonialPaused]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id];
      try {
        localStorage.setItem('shreeniwas_user_favorites', JSON.stringify(next.map(String)));
        // Also sync if logged in
        const session = localStorage.getItem('shreeniwas_user_session');
        if (session) {
          const parsed = JSON.parse(session);
          if (parsed?.email) {
            const savedProps = JSON.parse(localStorage.getItem(`shreeniwas_saved_favorites_${parsed.email}`) || '[]');
            const clickedProp = FEATURED_PROPERTIES.find(p => p.id === id);
            if (clickedProp) {
              const alreadySaved = savedProps.some((p: any) => String(p.id) === String(id));
              let updatedUserFavs;
              if (alreadySaved) {
                updatedUserFavs = savedProps.filter((p: any) => String(p.id) !== String(id));
              } else {
                updatedUserFavs = [{
                  id: String(clickedProp.id),
                  title: clickedProp.title,
                  location: clickedProp.location,
                  price: clickedProp.price,
                  bhk: clickedProp.bhk,
                  image: clickedProp.image,
                  type: clickedProp.type
                }, ...savedProps];
              }
              localStorage.setItem(`shreeniwas_saved_favorites_${parsed.email}`, JSON.stringify(updatedUserFavs));
            }
          }
        }
        window.dispatchEvent(new Event('shreeniwas_favorites_updated'));
      } catch (e) {}
      return next;
    });
  };

  const toggleCompare = (property: typeof FEATURED_PROPERTIES[0]) => {
    setCompareItems(prev => {
      const exists = prev.some(item => item.id === property.id);
      if (exists) {
        return prev.filter(item => item.id !== property.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 properties at a time.");
        return prev;
      }
      return [...prev, {
        id: property.id,
        title: property.title,
        location: property.location,
        price: property.price,
        pricePerSqft: property.pricePerSqft,
        sqft: property.sqft,
        bhk: property.bhk,
        image: property.image,
        type: property.type,
        status: property.status,
        reraApproved: property.reraApproved
      }];
    });
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#0A1628]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "RealEstateAgent",
                "@id": "https://shreeniwasproperties-pi.vercel.app/#organization",
                "name": "Shreeniwas Properties",
                "url": "https://shreeniwasproperties-pi.vercel.app",
                "logo": "https://shreeniwasproperties-pi.vercel.app/logo.png",
                "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
                "description": "Rajasthan's premier real estate marketplace for luxury villas, modern apartments, commercial properties, and land.",
                "telephone": "+91 6376117833",
                "email": "contact@shreeniwasproperties.com",
                "priceRange": "₹₹₹",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "C-Scheme, Ashok Nagar",
                  "addressLocality": "Jaipur",
                  "addressRegion": "Rajasthan",
                  "postalCode": "302001",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 26.9124,
                  "longitude": 75.7873
                },
                "areaServed": ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer", "Rajasthan"]
              },
              {
                "@type": "WebSite",
                "@id": "https://shreeniwasproperties-pi.vercel.app/#website",
                "url": "https://shreeniwasproperties-pi.vercel.app",
                "name": "Shreeniwas Properties",
                "publisher": {
                  "@id": "https://shreeniwasproperties-pi.vercel.app/#organization"
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://shreeniwasproperties-pi.vercel.app/properties?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ]
          })
        }}
      />
      {/* 1. Hero Section with Search Engine */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 sm:pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={heroBg} 
            alt="Royal Jodhpur Heritage Palace with Mehrangarh Fort View - Shreeniwas Properties" 
            fill 
            className="object-cover object-[center_20%] sm:object-center scale-[1.01] transition-transform duration-1000 ease-out"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* UI/UX Pro Max Multi-Layer Contrast Overlays (Mobile optimized contrast so royal Jodhpur palace is vividly visible) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/40 to-[#0A1628]/80 sm:bg-gradient-to-r sm:from-[#0A1628]/95 sm:via-[#0A1628]/80 sm:to-transparent"></div>
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A1628]/60 to-transparent pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/60 to-transparent pointer-events-none"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="max-w-3xl mb-6 sm:mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/30 text-[#C9A96E] font-semibold text-xs mb-4 backdrop-blur-sm"
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              Rajasthan's #1 Premium Real Estate Marketplace
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl lg:text-6xl leading-tight font-serif text-white font-bold mb-4"
            >
              Find Your Perfect <br/>Property in <span className="text-[#C9A96E]">Rajasthan</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-slate-300 font-light mb-6 max-w-xl"
            >
              Explore verified rentals, luxury villas, commercial spaces & plots in Jaipur, Jodhpur, Udaipur, Kota & more.
            </motion.p>

            {/* Mobile Visual Landmark Card: Showcases the Authentic Jodhpur Royal Palace directly on mobile screens */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="block sm:hidden mb-5"
            >
              <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[#C9A96E]/50 shadow-2xl">
                <Image
                  src={heroBg}
                  alt="Royal Jodhpur Heritage Palace with Mehrangarh Fort View"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A1628]/85 backdrop-blur-md border border-[#C9A96E]/40 text-white text-[10px] font-semibold">
                  <MapPin className="w-3 h-3 text-[#C9A96E]" />
                  <span>Jodhpur HQ • Royal Heritage Palace</span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-white drop-shadow">Mehrangarh Vista Architecture</span>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#C9A96E] text-[#0A1628] shadow">
                    RERA Verified
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ShreeniwasSearchEngine />
          </motion.div>
        </div>
      </section>

      {/* 2. Top Localities & Price Trends Section (Dynamic with GPS & Auto-Updating Data) */}
      <TopLocalitiesPriceTrends />

      {/* 3. Explore Properties by Budget Section (Compact Grid) */}
      <section className="py-8 sm:py-10 px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#0A1628]">Explore Properties by Budget</h2>
              <p className="text-slate-500 text-xs mt-0.5">Filter homes tailored to your target price</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: "Under ₹30 Lakhs", desc: "Budget flats & plots", icon: Home, bg: "from-blue-900 to-slate-900", query: "under-30l" },
              { title: "₹30L - ₹75 Lakhs", desc: "2 & 3 BHK apartments", icon: Building2, bg: "from-amber-900 to-[#0A1628]", query: "30l-75l" },
              { title: "₹75L - ₹1.5 Cr", desc: "Gated society flats", icon: Building, bg: "from-emerald-900 to-[#0A1628]", query: "75l-1.5cr" },
              { title: "₹1.5 Crore+ Luxury", desc: "Villas & Havelis", icon: Award, bg: "from-purple-950 to-[#0A1628]", query: "luxury" },
            ].map((budget, i) => (
              <Link href={`/properties?budget=${budget.query}`} key={i}>
                <div className={`relative rounded-xl p-4 text-white bg-gradient-to-br ${budget.bg} shadow-md hover:shadow-xl transition-all group overflow-hidden border border-white/10 h-full`}>
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center mb-3 text-[#C9A96E] border border-white/10">
                      <budget.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold font-serif mb-0.5 group-hover:text-[#C9A96E] transition-colors">{budget.title}</h3>
                      <p className="text-[11px] text-slate-300 font-light mb-3">{budget.desc}</p>
                      <span className="text-[11px] font-semibold text-[#C9A96E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Browse <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Rajasthan Properties Collection (Interactive Search & Category Filters) */}
      <section className="py-10 sm:py-14 px-4 bg-white border-b border-slate-100" id="featured-properties">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112A50]/5 border border-[#F09032]/30 text-[#112A50] font-bold text-[11px] uppercase tracking-wider mb-1.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F09032]" /> Handpicked Collection
                <span className="w-1.5 h-1.5 rounded-full bg-[#F09032]"></span>
                <span className="text-[#F09032] font-black">{filteredProperties.length} Properties</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A1628]">
                Featured Rajasthan Properties
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Verified luxury homes, historic havelis & premium commercial spaces across Rajasthan
              </p>
            </div>

            {/* Navigation Arrows & View All Link */}
            <div className="flex items-center gap-2.5">
              {/* Manual Left/Right Navigation Arrows */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollFeatured('left')}
                  className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-all active:scale-95 cursor-pointer"
                  aria-label="Previous properties"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollFeatured('right')}
                  className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-all active:scale-95 cursor-pointer"
                  aria-label="Next properties"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Explore All In Section Link */}
              <Link 
                href={`/properties?tab=buy${propFilter !== 'All' ? `&type=${encodeURIComponent(propFilter)}` : ''}`}
                className="inline-flex"
              >
                <button className="px-3.5 py-2 bg-[#F09032] hover:bg-[#d87c22] text-[#112A50] font-black text-xs rounded-full transition-all shadow-sm flex items-center gap-1 whitespace-nowrap cursor-pointer active:scale-95">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Category Filter Tab Buttons (Only Options) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar border-b border-slate-100">
            {['All', 'Luxury Villas', 'Apartments', 'Commercial', 'Havelis'].map(tab => {
              const count = categoryCounts[tab as keyof typeof categoryCounts] || 0;
              const isActive = propFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPropFilter(tab)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? 'bg-[#112A50] text-[#F09032] border-2 border-[#F09032] shadow-md scale-102' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                  }`}
                >
                  <span>{tab}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-[#F09032] text-[#112A50]' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cards Track or Empty State */}
          {filteredProperties.length === 0 ? (
            <div className="py-14 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#0A1628] mb-1">
                No Properties in {propFilter}
              </h3>
              <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                No featured listings are currently listed under {propFilter}. Check back soon or view all properties.
              </p>
              <button
                type="button"
                onClick={() => setPropFilter('All')}
                className="px-4 py-2 bg-[#112A50] hover:bg-[#0A1628] text-[#F09032] text-xs font-bold rounded-xl shadow transition-all cursor-pointer"
              >
                View All Categories
              </button>
            </div>
          ) : (
            <div className="overflow-hidden relative w-full">
              {/* Scroll Track with ref for arrow buttons & continuous marquee when All */}
              <div 
                ref={featuredTrackRef}
                className={`flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2 ${
                  filteredProperties.length >= 3 ? 'animate-marquee-slow pause-on-hover' : ''
                }`}
              >
                {(filteredProperties.length >= 4 
                  ? [...filteredProperties, ...filteredProperties] 
                  : [...filteredProperties, ...filteredProperties, ...filteredProperties]
                ).map((prop, idx) => {
                  const isCompared = compareItems.some(i => i.id === prop.id);
                  return (
                    <div 
                      key={`${prop.id}-${idx}`} 
                      className="w-72 sm:w-80 flex-shrink-0 bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="p-2">
                          <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                            <Image 
                              src={prop.image} 
                              alt={prop.title} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Property Badges Overlay */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                              {prop.reraApproved && (
                                <span className="bg-white/95 backdrop-blur text-[#0A1628] text-[9px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1 border border-emerald-500/20">
                                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> RERA
                                </span>
                              )}
                              {prop.zeroBrokerage && (
                                <span className="bg-[#112A50]/90 backdrop-blur text-[#F09032] text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                                  0% Brokerage
                                </span>
                              )}
                            </div>

                            {/* Compare & Heart Buttons */}
                            <div className="absolute top-2 right-2 flex items-center gap-1.5">
                              <button 
                                onClick={() => toggleCompare(prop)}
                                className={`px-2 py-0.5 rounded-full text-[9px] font-bold backdrop-blur transition-all flex items-center gap-1 ${
                                  isCompared 
                                    ? 'bg-[#C9A96E] text-[#0A1628] shadow' 
                                    : 'bg-white/90 text-slate-700 hover:bg-white'
                                }`}
                              >
                                <Scale className="w-2.5 h-2.5" />
                                {isCompared ? 'Compared' : 'Compare'}
                              </button>
                              <SavePropertyButton property={prop} />
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 pt-1">
                          <div className="flex items-center justify-between text-[10px] text-[#F09032] font-bold mb-0.5">
                            <span>{prop.type}</span>
                            <span className="text-slate-400 font-normal">{prop.city}</span>
                          </div>
                          <h3 className="text-sm font-serif font-bold text-[#0A1628] mb-1 line-clamp-1 group-hover:text-[#F09032] transition-colors">
                            {prop.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mb-2.5">
                            <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" /> {prop.location}
                          </p>

                          {/* Key Spec Matrix */}
                          <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1.5 rounded-lg text-center mb-2 text-[10px]">
                            <div>
                              <span className="text-[8px] text-slate-400 block uppercase">Area</span>
                              <span className="font-bold text-[#0A1628]">{prop.sqft} sqft</span>
                            </div>
                            <div className="border-x border-slate-200">
                              <span className="text-[8px] text-slate-400 block uppercase">BHK</span>
                              <span className="font-bold text-[#0A1628]">{prop.bhk}</span>
                            </div>
                            <div>
                              <span className="text-[8px] text-slate-400 block uppercase">Rate</span>
                              <span className="font-bold text-emerald-700">{prop.pricePerSqft}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom Price & Action */}
                      <div className="p-3.5 pt-0">
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <div>
                            <span className="text-[9px] text-slate-400 block">Total Price</span>
                            <span className="text-base font-bold text-[#0A1628]">{prop.price}</span>
                          </div>
                          <Link href={`/properties/${prop.slug || prop.id}`}>
                            <button className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#112A50] hover:bg-[#0A1628] px-3.5 py-1.5 rounded-lg transition-all shadow-sm cursor-pointer active:scale-95">
                              Details <ArrowRight className="w-3 h-3 text-[#F09032]" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Premier Builder Projects & Townships Section */}
      <NewProjectsSection />

      {/* 6. "Post Property Free" Banner */}
      <section className="py-10 px-4 bg-[#0A1628] text-white relative overflow-hidden">
        <div className="container mx-auto max-w-5xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-xl">
          <div className="max-w-lg">
            <span className="bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block">
              For Property Owners
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Are you an Owner? Post Your Property <span className="text-[#C9A96E]">FREE</span>
            </h2>
            <p className="text-slate-300 text-xs font-light mb-4">
              Connect directly with verified buyers and tenants across Rajasthan with transparent pricing.
            </p>
            <div className="flex flex-wrap gap-3 text-[11px] font-medium text-slate-300">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free Listing</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Enquiries</span>
            </div>
          </div>

          <Link href="/dashboard/landlord/properties/new" className="w-full md:w-auto">
            <button className="w-full md:w-auto px-6 py-3 bg-[#C9A96E] hover:bg-[#b59760] text-[#0A1628] font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap">
              <Plus className="w-4 h-4" /> Post Property Free
            </button>
          </Link>
        </div>
      </section>

      {/* 6. Owner's Corner & Live Auto-Scrolling Reels Feed */}
      <OwnerReelsFeed />

      {/* Transparent Brokerage Tariff & Site Visit Passes (From Posters) */}
      <PricingTariffSection />

      {/* 7. Rajasthan Market Insights & Guides (Scrollable Track) */}
      <section className="py-10 px-4 bg-white border-b border-slate-100">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-row justify-between items-center mb-6 gap-2">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C9A96E]/10 text-[#0A1628] border border-[#C9A96E]/30 text-[10px] font-bold uppercase tracking-wider mb-1">
                <BookOpen className="w-3 h-3 text-[#C9A96E]" /> Real Estate News & Guides
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#0A1628]">Rajasthan Market Insights & Guides</h2>
            </div>
            <Link href="/blog">
              <span className="text-xs font-bold text-[#C9A96E] hover:underline flex items-center gap-1 whitespace-nowrap">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* Horizontally Scrollable Track */}
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
            {blogPostsList.map((post) => (
              <article 
                key={post.id} 
                className="w-72 sm:w-80 flex-shrink-0 snap-start bg-[#FDFBF7] rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden p-1.5">
                    <div className="relative h-full w-full rounded-xl overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-2 left-2 bg-white/95 backdrop-blur text-[#0A1628] text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 pt-1">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                      <span>{post.date}</span> • <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-sm font-serif font-bold text-[#0A1628] mb-1 line-clamp-2 group-hover:text-[#C9A96E] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 line-clamp-2 font-normal leading-relaxed">{post.excerpt}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="text-[11px] font-bold text-[#0A1628] hover:text-[#C9A96E] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="w-3 h-3 text-[#C9A96E]" />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Interactive Home Buying Journey Steps (Bottom Unique Left-to-Right Scrollable Track) */}
      <section className="py-10 px-4 bg-[#0A1628] text-white border-y border-slate-800 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-row justify-between items-center mb-6 gap-2">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" /> Step-by-Step Experience
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white">Your Seamless Home Buying Journey</h2>
            </div>

          </div>

          {/* Reels-Style Continuous Marquee Auto-Scroll Track */}
          <div className="overflow-hidden relative w-full">
            <div className="flex gap-4 sm:gap-5 animate-marquee pause-on-hover py-2">
              {[...JOURNEY_STEPS, ...JOURNEY_STEPS, ...JOURNEY_STEPS, ...JOURNEY_STEPS].map((st, idx) => (
                <div key={idx} className="w-60 sm:w-72 flex-shrink-0 bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-white/10 shadow-lg relative group hover:border-[#C9A96E] hover:shadow-[0_0_20px_rgba(201,169,110,0.25)] transition-all flex flex-col justify-between min-h-[170px]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-serif font-extrabold text-[#C9A96E]">
                        {st.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E]">
                        <st.icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-xs sm:text-sm font-serif font-bold text-white mb-1 leading-snug">{st.title}</h3>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-normal font-light">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Verified Buyer & Landlord Testimonials (Bottom Unique Left-to-Right Scrollable Track) */}
      <section className="py-10 px-4 bg-white border-b border-slate-100">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-row justify-between items-center mb-6 gap-2">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Star className="w-3 h-3 fill-current text-amber-500" /> 5-Star Rating
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#0A1628]">What Our Buyers & Landlords Say</h2>
            </div>

          </div>

          {/* Reels-Style Continuous Marquee Auto-Scroll Track */}
          <div className="overflow-hidden relative w-full">
            <div className="flex gap-4 sm:gap-5 animate-marquee-slow pause-on-hover py-2">
              {[...testimonialsList, ...testimonialsList, ...testimonialsList, ...testimonialsList].map((t, idx) => (
                <div key={idx} className="w-[260px] sm:w-[320px] flex-shrink-0 bg-[#FDFBF7] p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl hover:border-[#C9A96E]/60 transition-all duration-300 relative group flex flex-col justify-between min-h-[170px]">
                  <div>
                    <Quote className="w-5 h-5 text-[#C9A96E]/30 group-hover:text-[#C9A96E]/60 transition-colors absolute top-4 right-4" />
                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-normal mb-3 italic">"{t.quote}"</p>
                  </div>
                  <div className="flex items-center gap-2.5 pt-2.5 border-t border-slate-200/60">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative border-2 border-[#C9A96E] shadow-sm flex-shrink-0">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-[#0A1628] text-xs group-hover:text-[#C9A96E] transition-colors">{t.name}</h4>
                      <p className="text-[10px] text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Interactive EMI / Mortgage Calculator */}
      <section className="py-12 sm:py-16 px-4 bg-slate-50">
        <div className="container mx-auto">
          <EMICalculator />
        </div>
      </section>

      {/* Floating Property Comparison Drawer */}
      <PropertyComparison 
        selectedItems={compareItems} 
        onRemoveItem={(id) => setCompareItems(prev => prev.filter(i => i.id !== id))}
        onClearAll={() => setCompareItems([])}
      />
    </main>
  );
}
