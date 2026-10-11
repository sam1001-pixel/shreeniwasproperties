'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Building2, FileText, Users, CreditCard, Settings, 
  Search, MoreVertical, Plus, CheckCircle2, XCircle, Edit, Trash2, 
  MapPin, Phone, Mail, Globe, Crown, Shield, Eye, Lock, EyeOff, LogOut, KeyRound,
  Clock, CalendarCheck, MessageSquare, Send, Check, AlertCircle, ShieldAlert, Sparkles, UserCheck, UserPlus,
  Video, Star, Share2, Camera, ThumbsUp, IndianRupee, Layers, ExternalLink, Download, ShieldCheck,
  QrCode, Smartphone, RefreshCw, FileSpreadsheet, Image as ImageIcon, Copy, Filter, TrendingUp,
  ClipboardList, CheckSquare, CalendarX, PlusCircle
} from 'lucide-react';
import Link from 'next/link';
import { DEFAULT_NEW_PROJECTS, NewProjectItem } from '@/components/shared/new-projects-section';
import { DEFAULT_PAYMENT_SETTINGS, PaymentSettings } from '@/lib/settings/site-settings-context';
import { exportInquiriesToExcel, exportVisitRecordsToExcel, exportAttendanceToExcel, PropertyVisitRecordItem } from '@/lib/export/excel-export';
import { 
  RAJASTHAN_LOCALITIES_TRENDS, 
  LocalityPriceTrend, 
  syncPriceTrendsWithLiveProperties, 
  STORAGE_KEY_CUSTOM_PRICE_TRENDS 
} from '@/lib/location-service';
import { syncAdminDataToDatabase, fetchAdminDataFromDatabase } from '@/lib/sync/admin-sync';

// Initial Seed Data (Fallbacks if localStorage is empty)
// Initial Seed Data (Fallbacks if localStorage is empty)
const DEFAULT_SITE_PROPERTIES = [
  { id: "PROP-001", title: "The Royal Heritage Residency", location: "Vaishali Nagar, Jaipur", price: "₹3.5 Cr", status: "Active", type: "Luxury Villa", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" },
  { id: "PROP-002", title: "Lakeview Palace Heights", location: "Fatehpura, Udaipur", price: "₹1.8 Cr", status: "Active", type: "Penthouse", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" },
  { id: "PROP-003", title: "Commercial Business Hub", location: "C-Scheme, Jaipur", price: "₹2.2 Cr", status: "Active", type: "Commercial", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
  { id: "PROP-004", title: "Heritage Haveli Jodhpur", location: "Ratanada, Jodhpur", price: "₹5.5 Cr", status: "Active", type: "Heritage", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800" },
  { id: "PROP-005", title: "Modern 3BHK Apartment", location: "Vaishali Nagar, Jaipur", price: "₹45,000/mo", status: "Active", type: "Rent", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800" },
  { id: "PROP-006", title: "Luxury Penthouse", location: "Mansarovar, Jaipur", price: "₹1.25 Cr", status: "Active", type: "Sale", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" },
  { id: "PROP-007", title: "Exclusive Villa", location: "Jagatpura, Jaipur", price: "₹2.1 Cr", status: "Active", type: "Sale", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" },
  { id: "PROP-008", title: "Studio Apartment", location: "Malviya Nagar, Jaipur", price: "₹18,000/mo", status: "Active", type: "Rent", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" },
];

const DEFAULT_BLOGS = [
  { id: "BLOG-1", title: "Why Jaipur is the Next Big Real Estate Hub in India", category: "Market Trends", author: "Aditi Sharma", readTime: "5 min read", status: "Published", image: "https://images.unsplash.com/photo-1599661559882-6296fc1cb475?auto=format&fit=crop&w=800&q=80" },
  { id: "BLOG-2", title: "The Ultimate Guide for First-Time Homebuyers in Rajasthan", category: "Buying Guide", author: "Vikram Singh", readTime: "7 min read", status: "Published", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" },
  { id: "BLOG-3", title: "Understanding RERA Rajasthan: What Every Buyer Must Know", category: "Tenant Advisory", author: "Rajesh Rathore", readTime: "4 min read", status: "Published", image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80" },
];

const DEFAULT_ADMIN_ACCOUNTS = [
  { id: "ADM-01", name: "Super Administrator", email: "superadmin@shreeniwasproperties.com", role: "Super Admin", level: "super", status: "Active" },
  { id: "ADM-02", name: "Ananya Sharma", email: "admin@shreeniwasproperties.com", role: "Client Query Admin", level: "staff", status: "Active" },
];

const DEFAULT_REELS = [
  { id: "REEL-01", title: "4 BHK Royal Villa 360° Walkthrough", property: "The Royal Heritage Residency", instaUrl: "https://www.instagram.com/reel/C8XYZ12345/", embedUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", views: "14.2K", status: "Active" },
  { id: "REEL-02", title: "Lakeview Penthouse Sunset Tour Udaipur", property: "Lakeview Palace Heights", instaUrl: "https://www.instagram.com/reel/C9ABC67890/", embedUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", views: "9.8K", status: "Active" },
  { id: "REEL-03", title: "Heritage Haveli Jodhpur Royal Courtyard", property: "Heritage Haveli Jodhpur", instaUrl: "https://www.instagram.com/reel/C7DEF11223/", embedUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800", views: "22.5K", status: "Active" },
];

const DEFAULT_REVIEWS = [
  { id: "REV-01", name: "Dr. Alok & Sunita Mehta", role: "Villa Buyers in Jaipur", rating: 5, quote: "Shreeniwas Properties made buying our 4 BHK villa in Vaishali Nagar effortless. The VIP site visit with guaranteed cab pickup gave us 100% peace of mind.", status: "Featured", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" },
  { id: "REV-02", name: "Vikramaditya Singh", role: "Heritage Property Investor", rating: 5, quote: "Their team has unmatched local authority across Udaipur & Jodhpur. I found a prime lakeview commercial plot direct from owner with zero hassle.", status: "Featured", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { id: "REV-03", name: "Radhika Khandelwal", role: "Apartment Landlord", rating: 5, quote: "Listed my C-Scheme apartment on Shreeniwas Properties and got verified corporate tenants within 48 hours. Excellent service!", status: "Featured", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" }
];

const DEFAULT_MEDIA_GALLERY = [
  { id: "MED-01", title: "Royal Villa Exterior & Pool", category: "Properties", type: "image", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" },
  { id: "MED-02", title: "Lakeview Penthouse Sunset", category: "Properties", type: "image", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" },
  { id: "MED-03", title: "Heritage Haveli Courtyard", category: "Properties", type: "image", url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800" },
  { id: "MED-04", title: "Luxury Living Room Interior", category: "Properties", type: "image", url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" },
  { id: "MED-05", title: "Modern Modular Kitchen", category: "Properties", type: "image", url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800" },
  { id: "MED-06", title: "Master Bedroom Suite", category: "Properties", type: "image", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" },
  { id: "MED-07", title: "Commercial Business Tower", category: "Properties", type: "image", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
  { id: "MED-08", title: "Executive Villa Lawn", category: "Properties", type: "image", url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" },
  { id: "MED-09", title: "High-rise Terrace View", category: "Properties", type: "image", url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800" },
  { id: "MED-10", title: "Green Residential Plot", category: "Properties", type: "image", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800" },
  { id: "MED-11", title: "4 BHK Villa 360° Walkthrough", category: "Reels & Videos", type: "video", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", instaUrl: "https://www.instagram.com/reel/C8XYZ12345/" },
  { id: "MED-12", title: "Lakeview Penthouse Sunset Tour", category: "Reels & Videos", type: "video", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", instaUrl: "https://www.instagram.com/reel/C9ABC67890/" },
  { id: "MED-13", title: "Heritage Haveli Royal Courtyard", category: "Reels & Videos", type: "video", url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800", instaUrl: "https://www.instagram.com/reel/C7DEF11223/" },
  { id: "MED-14", title: "Infinity Pool Walkaround Reel", category: "Reels & Videos", type: "video", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", instaUrl: "https://www.instagram.com/reel/C6JKL55667/" },
  { id: "MED-15", title: "Shreeniwas Gold Crest Emblem", category: "Logos & Avatars", type: "image", url: "https://images.unsplash.com/photo-1599661559886-41b80c541b00?auto=format&fit=crop&q=80&w=400" },
  { id: "MED-16", title: "Executive Director Avatar", category: "Logos & Avatars", type: "image", url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
  { id: "MED-17", title: "Luxury Consultant Avatar", category: "Logos & Avatars", type: "image", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
  { id: "MED-18", title: "Client Reviewer Avatar 1", category: "Logos & Avatars", type: "image", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" },
  { id: "MED-19", title: "Client Reviewer Avatar 2", category: "Logos & Avatars", type: "image", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { id: "MED-20", title: "Jaipur Real Estate Growth Cover", category: "Blogs", type: "image", url: "https://images.unsplash.com/photo-1599661559882-6296fc1cb475?auto=format&fit=crop&w=800&q=80" },
  { id: "MED-21", title: "First-Time Buyer Keys Cover", category: "Blogs", type: "image", url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" },
  { id: "MED-22", title: "RERA Law & Advisory Cover", category: "Blogs", type: "image", url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80" }
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [adminRole, setAdminRole] = useState<'super' | 'staff'>('super');

  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRoleType, setSelectedRoleType] = useState<'super' | 'staff'>('super');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dynamic Management States
  const [propertiesList, setPropertiesList] = useState<any[]>(DEFAULT_SITE_PROPERTIES);
  const [inquiriesList, setInquiriesList] = useState<any[]>([]);
  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [blogsList, setBlogsList] = useState<any[]>(DEFAULT_BLOGS);
  const [adminAccountsList, setAdminAccountsList] = useState<any[]>(DEFAULT_ADMIN_ACCOUNTS);
  const [reelsList, setReelsList] = useState<any[]>(DEFAULT_REELS);
  const [reviewsList, setReviewsList] = useState<any[]>(DEFAULT_REVIEWS);

  // Shift & Clock-In States
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState('');

  // 13-Point Google Form Property Visit Records (Super Admin & Admin)
  const [visitRecordsList, setVisitRecordsList] = useState<PropertyVisitRecordItem[]>([]);
  const [showVisitRecordModal, setShowVisitRecordModal] = useState(false);
  const [editingVisitRecord, setEditingVisitRecord] = useState<PropertyVisitRecordItem | null>(null);
  const [visitRecordSearch, setVisitRecordSearch] = useState('');
  const [visitRecordStaffFilter, setVisitRecordStaffFilter] = useState('All');
  const [visitRecordForm, setVisitRecordForm] = useState<PropertyVisitRecordItem>({
    clientName: '',
    clientMobile: '',
    propertyOwnerName: '',
    ownerMobile: '',
    propertyLocation: '',
    visitDate: new Date().toISOString().split('T')[0],
    visitTime: '11:00 AM',
    coordinatorName: 'Priyanka',
    visitCharge: '₹500',
    paymentStatus: 'Paid',
    feedback: '❤️ पसंद आई',
    followUpRemark: '',
    visitNumber: '1',
  });

  // Blocked / Blackout Visit Dates State (Super Admin)
  const [blockedDatesList, setBlockedDatesList] = useState<{ date: string; reason: string }[]>([]);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [newBlockedReason, setNewBlockedReason] = useState('Weekly Off / Holiday');

  // Inquiry Modal State
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [replyText, setReplyText] = useState('');

  // Media Gallery States
  const [mediaGallery, setMediaGallery] = useState<any[]>(DEFAULT_MEDIA_GALLERY);
  const [showGalleryPicker, setShowGalleryPicker] = useState(false);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('All');
  const [gallerySearchQuery, setGallerySearchQuery] = useState('');
  const [galleryTargetCallback, setGalleryTargetCallback] = useState<((url: string, item?: any) => void) | null>(null);
  const [newMediaForm, setNewMediaForm] = useState({ title: '', category: 'Properties', type: 'image', url: '', instaUrl: '' });
  const [showEditMediaModal, setShowEditMediaModal] = useState(false);
  const [editingMedia, setEditingMedia] = useState<any | null>(null);
  const [mediaForm, setMediaForm] = useState({ title: '', category: 'Properties', type: 'image', url: '', instaUrl: '' });
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [copiedMediaUrl, setCopiedMediaUrl] = useState('');

  // Localities & Price Trends State (Super Admin)
  const [trendsCity, setTrendsCity] = useState('Jodhpur');
  const [allTrends, setAllTrends] = useState<Record<string, LocalityPriceTrend[]>>(RAJASTHAN_LOCALITIES_TRENDS);
  const [showTrendModal, setShowTrendModal] = useState(false);
  const [editingTrend, setEditingTrend] = useState<LocalityPriceTrend | null>(null);
  const [trendForm, setTrendForm] = useState({
    name: '',
    city: 'Jodhpur',
    avgPrice: '₹5,400',
    avgPriceNum: 5400,
    growth: '+11.0%',
    growthNum: 11.0,
    type: 'Heritage & Villas',
    count: '140+ Properties',
    rentalYield: '4.8% Yield'
  });

  // Advanced Super Admin Filtering States
  const [propertyFilter, setPropertyFilter] = useState<'all' | 'active' | 'ready' | 'construction' | 'landlord' | 'verified'>('all');
  const [propertySearch, setPropertySearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'visits' | 'payments' | 'alerts' | 'messages'>('all');

  // Tariff & Visits Management State (Super Admin)
  const [tariffSettings, setTariffSettings] = useState({
    vipSiteVisitFee: 499,
    standardPassFee: 500,
    premiumPassFee: 999,
    firstVisitFree: true,
    residentialRentBrokerage: '15 Days',
    commercialRentBrokerage: '1 Month',
    buySellUnder50L: '2%',
    buySellAbove50L: '1%',
    allowDirectOwnerContact: true,
    escrowDepositPercent: 10,
    // Customizable ₹999 Premium Pass copy
    premiumPassTitle: 'Premium Pass',
    premiumPassBadge: 'VIP Priority',
    premiumPassDuration: '6 Months Active Support',
    premiumPassValidity: '6 months priority search across Rajasthan',
    premiumPassFeatures: 'Multiple visits matched to criteria\nVIP hunting & priority early access\nActive validity for 6 full months\nDirect owner negotiation support\n100% adjusted against brokerage',
    premiumPassNote: '100% adjustable against final brokerage fee.'
  });

  // Property Modal - Comprehensive Upload Suite
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);
  const [propForm, setPropForm] = useState({ 
    title: '', 
    location: '', 
    city: 'Jaipur',
    price: '', 
    pricePerSqft: '',
    type: 'Sale', 
    purpose: 'Buy',
    status: 'Ready to Move', 
    bhk: '3 BHK',
    bedrooms: 3,
    bathrooms: 2,
    sqft: '2,100',
    carpetArea: '1,800 sq.ft',
    furnishing: 'Semi-Furnished',
    floor: '3rd of 8 Floors',
    facing: 'East (Vastu Compliant)',
    reraApproved: true,
    reraNumber: '',
    zeroBrokerage: true,
    image: '',
    images: [] as string[],
    googleMapsUrl: '',
    description: '',
    amenities: ['24x7 Security', 'Power Backup', 'Car Parking'] as string[]
  });

  // Builder Projects Management States
  const [newProjectsList, setNewProjectsList] = useState<NewProjectItem[]>(DEFAULT_NEW_PROJECTS);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<NewProjectItem | null>(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    builder: '',
    reraNumber: '',
    city: 'Jaipur',
    location: '',
    priceRange: '',
    configurations: '2 BHK, 3 BHK',
    status: 'Under Construction' as 'New Launch' | 'Under Construction' | 'Ready to Move',
    possessionDate: '',
    coverImage: '',
    googleMapsUrl: '',
    highlights: 'RERA Approved, Modern Clubhouse, Gated Security'
  });

  // Super Admin Brokerage & Financial Settings
  const [brokerageSettings, setBrokerageSettings] = useState({
    model: 'zero' as 'zero' | 'percentage' | 'fixed',
    commissionRate: 1.0,
    minCommission: 25000,
    vipSiteVisitFee: 499,
    vipCabPickupFee: 999,
    allowDirectOwnerContact: true,
    platformConvenienceFee: 0,
    escrowDepositPercent: 10
  });

  // Blog Modal
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [blogForm, setBlogForm] = useState({ title: '', category: 'Market Trends', author: 'Admin Team', readTime: '5 min read', image: '' });

  // Reel Modal
  const [showReelModal, setShowReelModal] = useState(false);
  const [editingReel, setEditingReel] = useState<any | null>(null);
  const [reelForm, setReelForm] = useState({ title: '', property: '', instaUrl: '', embedUrl: '', views: '1.2K', status: 'Active' });

  // Review Modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState<any | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: '', role: '', rating: 5, quote: '', status: 'Featured', avatar: '' });

  const notifyDataUpdated = (key?: string, data?: any) => {
    if (typeof window !== 'undefined') {
      // 1. Dispatch in current window for instant reactive UI updates
      window.dispatchEvent(new Event('shreeniwas_data_updated'));
      // 2. Trigger storage event across other open tabs/windows
      try {
        localStorage.setItem('shreeniwas_last_sync_timestamp', Date.now().toString());
      } catch (e) {}

      // 3. Persist directly to Supabase Database & Server Backup
      if (key && data !== undefined) {
        syncAdminDataToDatabase(key, data);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (dataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        callback(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Make Admin Modal
  const [showMakeAdminModal, setShowMakeAdminModal] = useState(false);
  const [adminForm, setAdminForm] = useState({ name: '', email: '', role: 'Query Coordinator', password: '', level: 'staff' });

  // Expanded Platform & Social Settings State
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: 'Shreeniwas Rentals',
    tagline: 'Exclusive Real Estate & Rental Network in Rajasthan',
    logoUrl: '/logo/shreeniwas-logo-dark.png',
    heroBgUrl: '/hero/jodhpur-hero-royal.jpg',
    contactEmail: 'contact@shreeniwasproperties.com',
    supportPhone: '+91 6376117833',
    headOffice: '15 Royal Avenue, C-Scheme, Jaipur, Rajasthan 302001',
    whatsappLink: 'https://wa.me/916376117833',
    instagramLink: 'https://instagram.com/shreeniwasproperties',
    facebookLink: 'https://facebook.com/shreeniwasproperties',
    youtubeLink: 'https://youtube.com/@shreeniwasproperties',
    linkedinLink: 'https://linkedin.com/company/shreeniwasproperties',
    twitterLink: 'https://x.com/shreeniwasprop',
    maintenanceMode: false
  });

  // Super Admin Payment Gateway & UPI Settings State
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(DEFAULT_PAYMENT_SETTINGS);

  useEffect(() => {
    const authSession = sessionStorage.getItem('shreeniwas_admin_auth');
    const storedRole = sessionStorage.getItem('shreeniwas_admin_role');
    if (authSession === 'true') {
      setIsAuthenticated(true);
      if (storedRole === 'staff') {
        setAdminRole('staff');
        setActiveTab('inquiries');
      } else {
        setAdminRole('super');
      }
    }

    // Load Properties
    const savedProps = localStorage.getItem('shreeniwas_admin_properties');
    if (savedProps) { try { setPropertiesList(JSON.parse(savedProps)); } catch (e) {} }

    // Load Visitor Inquiries
    const savedInquiries = localStorage.getItem('shreeniwas_inquiries');
    if (savedInquiries) { try { setInquiriesList(JSON.parse(savedInquiries)); } catch (e) {} }

    // Load Registered Users
    const savedUsers = localStorage.getItem('shreeniwas_registered_users');
    if (savedUsers) { try { setUsersList(JSON.parse(savedUsers)); } catch (e) {} }

    // Load Shift Attendance
    const savedAttendance = localStorage.getItem('shreeniwas_admin_attendance');
    if (savedAttendance) {
      try {
        const parsed = JSON.parse(savedAttendance);
        setAttendanceList(parsed);
        if (parsed.length > 0 && parsed[0].clockOut === 'In Shift') {
          setIsClockedIn(true);
          setClockInTime(parsed[0].clockIn);
        }
      } catch (e) {}
    }

    // Load Blogs
    const savedBlogs = localStorage.getItem('shreeniwas_blog_posts');
    if (savedBlogs) { try { setBlogsList(JSON.parse(savedBlogs)); } catch (e) {} }

    // Load Admin Accounts
    const savedAdmins = localStorage.getItem('shreeniwas_admin_accounts');
    if (savedAdmins) { try { setAdminAccountsList(JSON.parse(savedAdmins)); } catch (e) {} }

    // Load Reels
    const savedReels = localStorage.getItem('shreeniwas_admin_reels');
    if (savedReels) { try { setReelsList(JSON.parse(savedReels)); } catch (e) {} }

    // Load Reviews
    const savedReviews = localStorage.getItem('shreeniwas_testimonials_management');
    if (savedReviews) { try { setReviewsList(JSON.parse(savedReviews)); } catch (e) {} }

    // Load 13-Point Property Visit Records (Google Form Engine)
    const savedVisitRecords = localStorage.getItem('shreeniwas_property_visit_records');
    if (savedVisitRecords) {
      try { setVisitRecordsList(JSON.parse(savedVisitRecords)); } catch (e) {}
    } else {
      // Seed initial samples so the table has demonstration data from day 1
      const initialSeedVisitRecords: PropertyVisitRecordItem[] = [
        {
          id: 'VR-101',
          clientName: 'Rahul Choudhary',
          clientMobile: '+91 98290 12345',
          propertyOwnerName: 'Narpat Singh Rathore',
          ownerMobile: '+91 98291 99887',
          propertyLocation: 'Vaishali Nagar, Jaipur (The Royal Heritage Residency)',
          visitDate: new Date().toISOString().split('T')[0],
          visitTime: '11:30 AM',
          coordinatorName: 'Priyanka',
          visitCharge: '₹500',
          paymentStatus: 'Paid',
          feedback: '❤️ पसंद आई',
          followUpRemark: 'Price negotiation meeting scheduled with owner this Friday.',
          visitNumber: '1',
          recordedBy: 'Super Admin',
          createdAt: new Date().toLocaleString()
        },
        {
          id: 'VR-102',
          clientName: 'Sunita Meena',
          clientMobile: '+91 94140 88765',
          propertyOwnerName: 'Dinesh Bhati',
          ownerMobile: '+91 94142 33445',
          propertyLocation: 'Ratanada, Jodhpur (Heritage Haveli)',
          visitDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          visitTime: '04:00 PM',
          coordinatorName: 'Suman',
          visitCharge: '₹1,000',
          paymentStatus: 'Paid',
          feedback: '🤔 सोचकर बताएगा',
          followUpRemark: 'Family wants to check Vastu direction again on Sunday.',
          visitNumber: '2',
          recordedBy: 'Suman (Staff)',
          createdAt: new Date(Date.now() - 86400000).toLocaleString()
        }
      ];
      setVisitRecordsList(initialSeedVisitRecords);
      try { localStorage.setItem('shreeniwas_property_visit_records', JSON.stringify(initialSeedVisitRecords)); } catch (e) {}
    }

    // Load Blocked / Blackout Visit Dates
    const savedBlockedDates = localStorage.getItem('shreeniwas_blocked_visit_dates');
    if (savedBlockedDates) {
      try { setBlockedDatesList(JSON.parse(savedBlockedDates)); } catch (e) {}
    }

    // Load Platform Settings
    const savedSettings = localStorage.getItem('shreeniwas_platform_settings');
    if (savedSettings) { 
      try { 
        const parsed = JSON.parse(savedSettings); 
        if (!parsed.logoUrl) {
          parsed.logoUrl = '/logo/shreeniwas-logo-dark.png';
        }
        setSiteSettings(parsed); 
      } catch (e) {} 
    }

    // Load Media Gallery
    const savedGallery = localStorage.getItem('shreeniwas_media_gallery');
    if (savedGallery) { try { setMediaGallery(JSON.parse(savedGallery)); } catch (e) {} }

    // Load Builder Projects
    const savedProjects = localStorage.getItem('shreeniwas_new_projects');
    if (savedProjects) { try { setNewProjectsList(JSON.parse(savedProjects)); } catch (e) {} }

    // Load Brokerage Commission Settings (Super Admin Only)
    const savedBrokerage = localStorage.getItem('shreeniwas_brokerage_settings');
    if (savedBrokerage) { try { setBrokerageSettings(JSON.parse(savedBrokerage)); } catch (e) {} }

    // Load Tariff & Visits Settings (Super Admin Only)
    const savedTariffs = localStorage.getItem('shreeniwas_tariff_settings');
    if (savedTariffs) { 
      try { 
        setTariffSettings(prev => ({ ...prev, ...JSON.parse(savedTariffs) })); 
      } catch (e) {} 
    }

    // Load Payment Gateway & UPI Settings (Super Admin Only)
    const savedPayment = localStorage.getItem('shreeniwas_payment_settings');
    if (savedPayment) { 
      try { 
        setPaymentSettings(prev => ({ ...prev, ...JSON.parse(savedPayment) })); 
      } catch (e) {} 
    } else if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.payment) {
          setPaymentSettings(prev => ({ ...prev, ...parsed.payment }));
        }
      } catch (e) {}
    }

    // Load Custom Real Estate Price Trends Overrides
    const savedTrends = localStorage.getItem(STORAGE_KEY_CUSTOM_PRICE_TRENDS);
    if (savedTrends) {
      try {
        const parsed = JSON.parse(savedTrends);
        if (parsed && typeof parsed === 'object') {
          setAllTrends({ ...RAJASTHAN_LOCALITIES_TRENDS, ...parsed });
        }
      } catch (e) {}
    }

    // -------------------------------------------------------------------------
    // PERMANENT DATABASE RESTORATION ENGINE
    // Pulls from Supabase Database & Server Backup to ensure data is NEVER lost
    // -------------------------------------------------------------------------
    loadAdminDataFromServer();

    setIsLoaded(true);
  }, []);

  const loadAdminDataFromServer = () => {
    fetchAdminDataFromDatabase().then((dbData) => {
      if (dbData && typeof dbData === 'object' && Object.keys(dbData).length > 0) {
        if (dbData.shreeniwas_admin_properties && Array.isArray(dbData.shreeniwas_admin_properties)) {
          setPropertiesList(dbData.shreeniwas_admin_properties);
          try { localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(dbData.shreeniwas_admin_properties)); } catch (e) {}
        }
        if (dbData.shreeniwas_property_visit_records && Array.isArray(dbData.shreeniwas_property_visit_records)) {
          setVisitRecordsList(dbData.shreeniwas_property_visit_records);
          try { localStorage.setItem('shreeniwas_property_visit_records', JSON.stringify(dbData.shreeniwas_property_visit_records)); } catch (e) {}
        }
        if (dbData.shreeniwas_blocked_visit_dates && Array.isArray(dbData.shreeniwas_blocked_visit_dates)) {
          setBlockedDatesList(dbData.shreeniwas_blocked_visit_dates);
          try { localStorage.setItem('shreeniwas_blocked_visit_dates', JSON.stringify(dbData.shreeniwas_blocked_visit_dates)); } catch (e) {}
        }
        if (dbData.shreeniwas_admin_reels && Array.isArray(dbData.shreeniwas_admin_reels)) {
          setReelsList(dbData.shreeniwas_admin_reels);
          try { localStorage.setItem('shreeniwas_admin_reels', JSON.stringify(dbData.shreeniwas_admin_reels)); } catch (e) {}
        }
        if (dbData.shreeniwas_tariff_settings && typeof dbData.shreeniwas_tariff_settings === 'object') {
          setTariffSettings(prev => ({ ...prev, ...dbData.shreeniwas_tariff_settings }));
          try { localStorage.setItem('shreeniwas_tariff_settings', JSON.stringify(dbData.shreeniwas_tariff_settings)); } catch (e) {}
        }
        if (dbData.shreeniwas_payment_settings && typeof dbData.shreeniwas_payment_settings === 'object') {
          setPaymentSettings(prev => ({ ...prev, ...dbData.shreeniwas_payment_settings }));
          try { localStorage.setItem('shreeniwas_payment_settings', JSON.stringify(dbData.shreeniwas_payment_settings)); } catch (e) {}
        }
        if (dbData.shreeniwas_platform_settings && typeof dbData.shreeniwas_platform_settings === 'object') {
          setSiteSettings(prev => ({ ...prev, ...dbData.shreeniwas_platform_settings }));
          try { localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(dbData.shreeniwas_platform_settings)); } catch (e) {}
        }
        if (dbData.shreeniwas_inquiries && Array.isArray(dbData.shreeniwas_inquiries)) {
          setInquiriesList(dbData.shreeniwas_inquiries);
          try { localStorage.setItem('shreeniwas_inquiries', JSON.stringify(dbData.shreeniwas_inquiries)); } catch (e) {}
        }
        if (dbData.shreeniwas_blog_posts && Array.isArray(dbData.shreeniwas_blog_posts)) {
          setBlogsList(dbData.shreeniwas_blog_posts);
          try { localStorage.setItem('shreeniwas_blog_posts', JSON.stringify(dbData.shreeniwas_blog_posts)); } catch (e) {}
        }
        if (dbData.shreeniwas_testimonials_management && Array.isArray(dbData.shreeniwas_testimonials_management)) {
          setReviewsList(dbData.shreeniwas_testimonials_management);
          try { localStorage.setItem('shreeniwas_testimonials_management', JSON.stringify(dbData.shreeniwas_testimonials_management)); } catch (e) {}
        }
        if (dbData.shreeniwas_admin_attendance && Array.isArray(dbData.shreeniwas_admin_attendance)) {
          setAttendanceList(dbData.shreeniwas_admin_attendance);
          try { localStorage.setItem('shreeniwas_admin_attendance', JSON.stringify(dbData.shreeniwas_admin_attendance)); } catch (e) {}
        }
        if (dbData.shreeniwas_new_projects && Array.isArray(dbData.shreeniwas_new_projects)) {
          setNewProjectsList(dbData.shreeniwas_new_projects);
          try { localStorage.setItem('shreeniwas_new_projects', JSON.stringify(dbData.shreeniwas_new_projects)); } catch (e) {}
        }
      }
    }).catch(() => {});
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedEmail || !trimmedPass) {
      setLoginError('Please enter both administrator email and password.');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPass,
          role: selectedRoleType === 'super' ? 'admin' : 'agent',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success && (result.user?.role === 'SUPER_ADMIN' || result.user?.role === 'STAFF_ADMIN')) {
        const resolvedLevel = result.user.level === 'super' ? 'super' : 'staff';
        sessionStorage.setItem('shreeniwas_admin_auth', 'true');
        sessionStorage.setItem('shreeniwas_admin_role', resolvedLevel);
        setAdminRole(resolvedLevel);
        setIsAuthenticated(true);
        setActiveTab(resolvedLevel === 'super' ? 'overview' : 'inquiries');
        // Refresh full administrative dataset now that HttpOnly session cookie is active
        loadAdminDataFromServer();
        return;
      }

      setLoginError(result.error || 'Invalid administrator email or password.');
    } catch (err) {
      setLoginError('Authentication service error. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('shreeniwas_admin_auth');
    sessionStorage.removeItem('shreeniwas_admin_role');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !replyText.trim()) return;

    setInquiriesList(prev => {
      const updated = prev.map(item => 
        item.id === selectedInquiry.id ? { ...item, reply: replyText.trim(), status: 'Responded & Sent' } : item
      );
      localStorage.setItem('shreeniwas_inquiries', JSON.stringify(updated));
      notifyDataUpdated('shreeniwas_inquiries', updated);
      return updated;
    });

    setSelectedInquiry(null);
    setReplyText('');
  };

  const toggleClockIn = () => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (!isClockedIn) {
      setIsClockedIn(true);
      setClockInTime(nowTime);
      setAttendanceList(prev => {
        const updated = [
          {
            id: `ATT-${Date.now()}`,
            staffName: adminRole === 'super' ? "Super Administrator" : "Staff Admin",
            role: adminRole === 'super' ? "Super Administrator" : "Query Coordinator",
            date: "Today",
            clockIn: nowTime,
            clockOut: "In Shift",
            status: "Present (On Time)",
            hours: "0.1 hrs"
          },
          ...prev
        ];
        localStorage.setItem('shreeniwas_admin_attendance', JSON.stringify(updated));
        notifyDataUpdated('shreeniwas_admin_attendance', updated);
        return updated;
      });
    } else {
      setIsClockedIn(false);
      setAttendanceList(prev => {
        const updated = prev.map((item, idx) => idx === 0 ? { ...item, clockOut: nowTime } : item);
        localStorage.setItem('shreeniwas_admin_attendance', JSON.stringify(updated));
        notifyDataUpdated('shreeniwas_admin_attendance', updated);
        return updated;
      });
    }
  };

  // Property Handlers - Full Feature Suite
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propForm.title || !propForm.location || !propForm.price) return;

    const payload = {
      ...propForm,
      // Provide fallback image if not supplied
      image: propForm.image || propForm.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      images: propForm.images.length > 0 ? propForm.images : [propForm.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'],
      googleMapsUrl: propForm.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${propForm.title} ${propForm.location}`)}`
    };

    const generatedSlug = (editingProperty?.slug || propForm.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (editingProperty) {
      const updated = propertiesList.map(p => p.id === editingProperty.id ? { ...p, ...payload, slug: p.slug || generatedSlug } : p);
      setPropertiesList(updated);
      localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(updated));
      notifyDataUpdated('shreeniwas_admin_properties', updated);
    } else {
      const newId = `PROP-${Date.now().toString().slice(-4)}`;
      const newProp = { 
        id: newId, 
        slug: generatedSlug ? `${generatedSlug}-${newId.toLowerCase()}` : `property-${newId.toLowerCase()}`,
        ...payload 
      };
      const updated = [newProp, ...propertiesList];
      setPropertiesList(updated);
      localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(updated));
      notifyDataUpdated('shreeniwas_admin_properties', updated);
    }

    setShowPropertyModal(false);
    setEditingProperty(null);
    setPropForm({ 
      title: '', 
      location: '', 
      city: 'Jaipur',
      price: '', 
      pricePerSqft: '',
      type: 'Sale', 
      purpose: 'Buy',
      status: 'Ready to Move', 
      bhk: '3 BHK',
      bedrooms: 3,
      bathrooms: 2,
      sqft: '2,100',
      carpetArea: '1,800 sq.ft',
      furnishing: 'Semi-Furnished',
      floor: '3rd of 8 Floors',
      facing: 'East (Vastu Compliant)',
      reraApproved: true,
      reraNumber: '',
      zeroBrokerage: true,
      image: '',
      images: [],
      googleMapsUrl: '',
      description: '',
      amenities: ['24x7 Security', 'Power Backup', 'Car Parking']
    });
  };

  // Super Admin Tariff & Site Visits Save Handler
  const handleSaveTariffs = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminRole !== 'super') {
      alert('Access Denied: Only Super Admin can modify tariff structures and visit fees.');
      return;
    }
    localStorage.setItem('shreeniwas_tariff_settings', JSON.stringify(tariffSettings));
    
    // Also sync payment & brokerage settings for cross-compatibility
    const existingPayment = localStorage.getItem('shreeniwas_payment_settings');
    const payObj = existingPayment ? JSON.parse(existingPayment) : {};
    payObj.vipSiteVisitFee = tariffSettings.vipSiteVisitFee;
    payObj.standardPassFee = tariffSettings.standardPassFee;
    payObj.premiumPassFee = tariffSettings.premiumPassFee;
    localStorage.setItem('shreeniwas_payment_settings', JSON.stringify(payObj));

    const existingBrok = localStorage.getItem('shreeniwas_brokerage_settings');
    const brokObj = existingBrok ? JSON.parse(existingBrok) : {};
    brokObj.residentialRentBrokerage = tariffSettings.residentialRentBrokerage;
    brokObj.commercialRentBrokerage = tariffSettings.commercialRentBrokerage;
    brokObj.buySellUnder50L = tariffSettings.buySellUnder50L;
    brokObj.buySellAbove50L = tariffSettings.buySellAbove50L;
    brokObj.vipSiteVisitFee = tariffSettings.vipSiteVisitFee;
    brokObj.allowDirectOwnerContact = tariffSettings.allowDirectOwnerContact;
    brokObj.escrowDepositPercent = tariffSettings.escrowDepositPercent;
    localStorage.setItem('shreeniwas_brokerage_settings', JSON.stringify(brokObj));

    notifyDataUpdated('shreeniwas_tariff_settings', tariffSettings);
    syncAdminDataToDatabase('shreeniwas_payment_settings', payObj);
    syncAdminDataToDatabase('shreeniwas_brokerage_settings', brokObj);
    alert('Tariff, Visit Passes & Brokerage Rates Saved Live with Zero Delay & Persisted in Database!');
  };

  const handleDeleteProperty = (id: string) => {
    const updated = propertiesList.filter(p => p.id !== id);
    setPropertiesList(updated);
    localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(updated));
    notifyDataUpdated('shreeniwas_admin_properties', updated);
  };

  // Builder Projects Handlers
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.builder || !projectForm.priceRange) return;

    const configsArray = projectForm.configurations.split(',').map(s => s.trim()).filter(Boolean);
    const highlightsArray = projectForm.highlights.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProject) {
      const updated = newProjectsList.map(p => p.id === editingProject.id ? {
        ...p,
        ...projectForm,
        configurations: configsArray.length > 0 ? configsArray : ['2 BHK', '3 BHK'],
        highlights: highlightsArray.length > 0 ? highlightsArray : ['RERA Approved']
      } : p);
      setNewProjectsList(updated);
      localStorage.setItem('shreeniwas_new_projects', JSON.stringify(updated));
      notifyDataUpdated('shreeniwas_new_projects', updated);
    } else {
      const newProj: NewProjectItem = {
        id: `proj-${Date.now()}`,
        name: projectForm.name,
        builder: projectForm.builder,
        reraNumber: projectForm.reraNumber || 'RAJ/P/APPLIED',
        city: projectForm.city,
        location: projectForm.location || `${projectForm.city}, Rajasthan`,
        priceRange: projectForm.priceRange,
        configurations: configsArray.length > 0 ? configsArray : ['2 BHK', '3 BHK'],
        status: projectForm.status,
        possessionDate: projectForm.possessionDate || '2026',
        coverImage: projectForm.coverImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000',
        googleMapsUrl: projectForm.googleMapsUrl,
        highlights: highlightsArray.length > 0 ? highlightsArray : ['RERA Approved', 'Gated Community']
      };
      const updated = [newProj, ...newProjectsList];
      setNewProjectsList(updated);
      localStorage.setItem('shreeniwas_new_projects', JSON.stringify(updated));
      notifyDataUpdated('shreeniwas_new_projects', updated);
    }

    setShowProjectModal(false);
    setEditingProject(null);
    setProjectForm({
      name: '',
      builder: '',
      reraNumber: '',
      city: 'Jaipur',
      location: '',
      priceRange: '',
      configurations: '2 BHK, 3 BHK',
      status: 'Under Construction',
      possessionDate: '',
      coverImage: '',
      googleMapsUrl: '',
      highlights: 'RERA Approved, Modern Clubhouse, Gated Security'
    });
  };

  const handleDeleteProject = (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const updated = newProjectsList.filter(p => p.id !== id);
    setNewProjectsList(updated);
    localStorage.setItem('shreeniwas_new_projects', JSON.stringify(updated));
    notifyDataUpdated('shreeniwas_new_projects', updated);
  };

  // Super Admin Brokerage Save Handler
  const handleSaveBrokerage = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminRole !== 'super') {
      alert('Access Denied: Only Super Admin can modify brokerage and platform fees.');
      return;
    }
    localStorage.setItem('shreeniwas_brokerage_settings', JSON.stringify(brokerageSettings));
    notifyDataUpdated('shreeniwas_brokerage_settings', brokerageSettings);
    alert('Super Admin Brokerage & Platform Financial Controls Saved Live & Persisted in Database!');
  };

  // Super Admin Payment Gateway & UPI Save Handler
  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminRole !== 'super') {
      alert('Access Denied: Only Super Admin can modify payment gateways and UPI configurations.');
      return;
    }
    localStorage.setItem('shreeniwas_payment_settings', JSON.stringify(paymentSettings));
    const updatedPlatformSettings = {
      ...siteSettings,
      payment: paymentSettings,
    };
    setSiteSettings(updatedPlatformSettings);
    localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(updatedPlatformSettings));
    notifyDataUpdated('shreeniwas_payment_settings', paymentSettings);
    syncAdminDataToDatabase('shreeniwas_platform_settings', updatedPlatformSettings);
    alert('Super Admin: Payment Gateway, UPI ID & QR Code Settings Saved Live & Persisted in Database!');
  };

  // Blog Handlers
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title) return;

    let updated: any[];
    if (editingBlog) {
      updated = blogsList.map(b => b.id === editingBlog.id ? { ...b, ...blogForm } : b);
      setBlogsList(updated);
      localStorage.setItem('shreeniwas_blog_posts', JSON.stringify(updated));
    } else {
      const newBlog = { id: `BLOG-${Date.now().toString().slice(-4)}`, ...blogForm, date: "Today", status: "Published" };
      updated = [newBlog, ...blogsList];
      setBlogsList(updated);
      localStorage.setItem('shreeniwas_blog_posts', JSON.stringify(updated));
    }
    notifyDataUpdated('shreeniwas_blog_posts', updated);

    setShowBlogModal(false);
    setEditingBlog(null);
    setBlogForm({ title: '', category: 'Market Trends', author: 'Admin Team', readTime: '5 min read', image: '' });
  };

  const handleDeleteBlog = (id: string) => {
    const updated = blogsList.filter(b => b.id !== id);
    setBlogsList(updated);
    localStorage.setItem('shreeniwas_blog_posts', JSON.stringify(updated));
    notifyDataUpdated('shreeniwas_blog_posts', updated);
  };

  // Reel Handlers (Reels Management Power)
  const handleSaveReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelForm.title) return;

    let formattedInstaUrl = reelForm.instaUrl.trim();
    if (formattedInstaUrl && !formattedInstaUrl.startsWith('http://') && !formattedInstaUrl.startsWith('https://')) {
      formattedInstaUrl = `https://${formattedInstaUrl}`;
    }

    const payload = {
      ...reelForm,
      instaUrl: formattedInstaUrl
    };

    let updated: any[];
    if (editingReel) {
      updated = reelsList.map(r => r.id === editingReel.id ? { ...r, ...payload } : r);
      setReelsList(updated);
      localStorage.setItem('shreeniwas_admin_reels', JSON.stringify(updated));
    } else {
      const newReel = { id: `REEL-0${reelsList.length + 1}`, ...payload };
      updated = [newReel, ...reelsList];
      setReelsList(updated);
      localStorage.setItem('shreeniwas_admin_reels', JSON.stringify(updated));
    }
    notifyDataUpdated('shreeniwas_admin_reels', updated);

    setShowReelModal(false);
    setEditingReel(null);
    setReelForm({ title: '', property: '', instaUrl: '', embedUrl: '', views: '1.2K', status: 'Active' });
  };

  const handleDeleteReel = (id: string) => {
    const updated = reelsList.filter(r => r.id !== id);
    setReelsList(updated);
    localStorage.setItem('shreeniwas_admin_reels', JSON.stringify(updated));
    notifyDataUpdated('shreeniwas_admin_reels', updated);
  };

  // Review Handlers (Reviews Management Power)
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.quote) return;

    let updated: any[];
    if (editingReview) {
      updated = reviewsList.map(r => r.id === editingReview.id ? { ...r, ...reviewForm } : r);
      setReviewsList(updated);
      localStorage.setItem('shreeniwas_testimonials_management', JSON.stringify(updated));
    } else {
      const newReview = { id: `REV-0${reviewsList.length + 1}`, ...reviewForm };
      updated = [newReview, ...reviewsList];
      setReviewsList(updated);
      localStorage.setItem('shreeniwas_testimonials_management', JSON.stringify(updated));
    }
    notifyDataUpdated('shreeniwas_testimonials_management', updated);

    setShowReviewModal(false);
    setEditingReview(null);
    setReviewForm({ name: '', role: '', rating: 5, quote: '', status: 'Featured', avatar: '' });
  };

  const handleDeleteReview = (id: string) => {
    const updated = reviewsList.filter(r => r.id !== id);
    setReviewsList(updated);
    localStorage.setItem('shreeniwas_testimonials_management', JSON.stringify(updated));
    notifyDataUpdated('shreeniwas_testimonials_management', updated);
  };

  // Make Admin Handler
  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email) return;

    const newAdmin = {
      id: `ADM-0${adminAccountsList.length + 1}`,
      name: adminForm.name,
      email: adminForm.email,
      role: adminForm.role,
      level: adminForm.level,
      status: "Active"
    };

    const updated = [newAdmin, ...adminAccountsList];
    setAdminAccountsList(updated);
    localStorage.setItem('shreeniwas_admin_accounts', JSON.stringify(updated));

    setShowMakeAdminModal(false);
    setAdminForm({ name: '', email: '', role: 'Query Coordinator', password: '', level: 'staff' });
  };

  const handlePromoteUserToAdmin = (user: any) => {
    const newAdmin = {
      id: `ADM-0${adminAccountsList.length + 1}`,
      name: user.name || user.email?.split('@')[0] || "Staff Admin",
      email: user.email,
      role: "Staff Coordinator",
      level: "staff",
      status: "Active"
    };
    const updated = [newAdmin, ...adminAccountsList];
    setAdminAccountsList(updated);
    localStorage.setItem('shreeniwas_admin_accounts', JSON.stringify(updated));
    alert(`${user.email} has been promoted to Staff Admin!`);
  };

  // Media Gallery Handlers
  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaForm.title || !newMediaForm.url) return;

    let formattedInstaUrl = newMediaForm.instaUrl.trim();
    if (formattedInstaUrl && !formattedInstaUrl.startsWith('http://') && !formattedInstaUrl.startsWith('https://')) {
      formattedInstaUrl = `https://${formattedInstaUrl}`;
    }

    const newItem = {
      id: `MED-0${mediaGallery.length + 1}`,
      title: newMediaForm.title,
      category: newMediaForm.category,
      type: newMediaForm.type,
      url: newMediaForm.url.trim(),
      instaUrl: formattedInstaUrl
    };

    const updated = [newItem, ...mediaGallery];
    setMediaGallery(updated);
    localStorage.setItem('shreeniwas_media_gallery', JSON.stringify(updated));
    notifyDataUpdated();
    setNewMediaForm({ title: '', category: 'Properties', type: 'image', url: '', instaUrl: '' });
  };

  const handleSaveEditMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMedia || !mediaForm.title || !mediaForm.url) return;

    let formattedInstaUrl = mediaForm.instaUrl.trim();
    if (formattedInstaUrl && !formattedInstaUrl.startsWith('http://') && !formattedInstaUrl.startsWith('https://')) {
      formattedInstaUrl = `https://${formattedInstaUrl}`;
    }

    const payload = {
      ...mediaForm,
      url: mediaForm.url.trim(),
      instaUrl: formattedInstaUrl
    };

    const updated = mediaGallery.map(m => m.id === editingMedia.id ? { ...m, ...payload } : m);
    setMediaGallery(updated);
    localStorage.setItem('shreeniwas_media_gallery', JSON.stringify(updated));
    notifyDataUpdated();

    setShowEditMediaModal(false);
    setEditingMedia(null);
    setMediaForm({ title: '', category: 'Properties', type: 'image', url: '', instaUrl: '' });
  };

  const handleDeleteMedia = (id: string) => {
    const updated = mediaGallery.filter(m => m.id !== id);
    setMediaGallery(updated);
    localStorage.setItem('shreeniwas_media_gallery', JSON.stringify(updated));
    notifyDataUpdated();
  };

  // Global Site Settings Confirmation Modal State
  const [showSettingsConfirmModal, setShowSettingsConfirmModal] = useState(false);
  const [settingsSaveSuccess, setSettingsSaveSuccess] = useState(false);

  // Save Platform & Social Settings with Confirmation
  const executeSaveSettings = () => {
    localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(siteSettings));
    window.dispatchEvent(new Event('shreeniwas_data_updated'));
    notifyDataUpdated('shreeniwas_platform_settings', siteSettings);
    setShowSettingsConfirmModal(false);
    setSettingsSaveSuccess(true);
    setTimeout(() => setSettingsSaveSuccess(false), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSettingsConfirmModal(true);
  };

  // Super Admin Localities & Real Estate Price Trends Handlers
  const handleSaveTrend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trendForm.name) return;

    const currentCityTrends = allTrends[trendForm.city] ? [...allTrends[trendForm.city]] : [];
    let updatedCityTrends: LocalityPriceTrend[];

    const trendPayload: LocalityPriceTrend = {
      name: trendForm.name.trim(),
      city: trendForm.city,
      avgPrice: trendForm.avgPrice.startsWith('₹') ? trendForm.avgPrice : `₹${trendForm.avgPrice}`,
      avgPriceNum: Number(trendForm.avgPriceNum) || parseInt(trendForm.avgPrice.replace(/[^0-9]/g, '')) || 4500,
      growth: trendForm.growth.startsWith('+') || trendForm.growth.startsWith('-') ? trendForm.growth : `+${trendForm.growth}`,
      growthNum: Number(trendForm.growthNum) || parseFloat(trendForm.growth.replace(/[^0-9.-]/g, '')) || 10,
      type: trendForm.type || 'Residential',
      count: trendForm.count || '100+ Properties',
      rentalYield: trendForm.rentalYield || '4.8% Yield',
      slug: trendForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };

    if (editingTrend) {
      updatedCityTrends = currentCityTrends.map(t => t.name === editingTrend.name ? trendPayload : t);
    } else {
      updatedCityTrends = [trendPayload, ...currentCityTrends];
    }

    const updatedAll = {
      ...allTrends,
      [trendForm.city]: updatedCityTrends
    };

    setAllTrends(updatedAll);
    localStorage.setItem(STORAGE_KEY_CUSTOM_PRICE_TRENDS, JSON.stringify(updatedAll));
    window.dispatchEvent(new Event('shreeniwas_price_trends_updated'));
    notifyDataUpdated();

    setShowTrendModal(false);
    setEditingTrend(null);
  };

  const handleDeleteTrend = (cityName: string, localityName: string) => {
    if (!confirm(`Are you sure you want to delete locality "${localityName}" from ${cityName}?`)) return;
    const currentCityTrends = allTrends[cityName] ? [...allTrends[cityName]] : [];
    const updatedCityTrends = currentCityTrends.filter(t => t.name !== localityName);
    const updatedAll = {
      ...allTrends,
      [cityName]: updatedCityTrends
    };
    setAllTrends(updatedAll);
    localStorage.setItem(STORAGE_KEY_CUSTOM_PRICE_TRENDS, JSON.stringify(updatedAll));
    window.dispatchEvent(new Event('shreeniwas_price_trends_updated'));
    notifyDataUpdated();
  };

  const handleSyncPriceTrends = () => {
    syncPriceTrendsWithLiveProperties(propertiesList);
    const savedTrends = localStorage.getItem(STORAGE_KEY_CUSTOM_PRICE_TRENDS);
    if (savedTrends) {
      try {
        setAllTrends({ ...RAJASTHAN_LOCALITIES_TRENDS, ...JSON.parse(savedTrends) });
      } catch (e) {}
    }
    notifyDataUpdated();
    alert('Price trends automatically synchronized with active property listings across Rajasthan!');
  };

  // Property Moderation Toggles (Super Admin)
  const handleTogglePropertyVerified = (propId: string) => {
    const updated = propertiesList.map(p => p.id === propId ? { ...p, verified: !p.verified } : p);
    setPropertiesList(updated);
    localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(updated));
    notifyDataUpdated('shreeniwas_admin_properties', updated);
  };

  const handleTogglePropertyFeatured = (propId: string) => {
    const updated = propertiesList.map(p => p.id === propId ? { ...p, featured: !p.featured } : p);
    setPropertiesList(updated);
    localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(updated));
    notifyDataUpdated('shreeniwas_admin_properties', updated);
  };

  const handleTogglePropertyStatus = (propId: string) => {
    const updated = propertiesList.map(p => {
      if (p.id === propId) {
        const nextStatus = p.status === 'Active' ? 'Paused' : 'Active';
        return { ...p, status: nextStatus };
      }
      return p;
    });
    setPropertiesList(updated);
    localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(updated));
    notifyDataUpdated('shreeniwas_admin_properties', updated);
  };

  // Payment Verification Handler (Super Admin)
  const handleVerifyInquiryPayment = (inquiryId: string) => {
    let verifiedInq: any = null;
    const updated = inquiriesList.map(inq => {
      if (inq.id === inquiryId) {
        verifiedInq = {
          ...inq,
          status: 'Payment Verified & Confirmed',
          reply: 'Payment confirmed & verified by Super Admin. VIP Site Visit Pass is active.'
        };
        return verifiedInq;
      }
      return inq;
    });
    setInquiriesList(updated);
    localStorage.setItem('shreeniwas_inquiries', JSON.stringify(updated));

    // When super admin confirms payment, sync pass directly to the client's account visit section
    if (verifiedInq) {
      try {
        const clientEmail = verifiedInq.email || '';
        const clientPhone = verifiedInq.phone || '';
        const userVisitsKey = clientEmail ? `shreeniwas_vip_visits_${clientEmail}` : null;

        const newVisitEntry = {
          id: `VISIT-${verifiedInq.utrNumber ? verifiedInq.utrNumber.slice(-4) : verifiedInq.id?.slice(-4) || Date.now().toString().slice(-4)}`,
          property: verifiedInq.property || 'VIP Rajasthan Property Pass',
          location: verifiedInq.location || 'Rajasthan, India',
          date: verifiedInq.visitDate ? `${verifiedInq.visitDate} (${verifiedInq.slotLabel || verifiedInq.visitTimeSlot || 'Confirmed'})` : 'Valid for 30 Days (On-Demand)',
          agent: 'Shreeniwas Senior Executive (+91 6376117833)',
          fee: verifiedInq.amount ? `₹${verifiedInq.amount} Verified` : 'Paid & Confirmed',
          status: 'Confirmed & Scheduled',
          utrNumber: verifiedInq.utrNumber || '',
          txnId: verifiedInq.id || '',
          confirmedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        };

        // 1. If we have client's email, save to their dedicated visits key
        if (userVisitsKey) {
          const userVisitsRaw = localStorage.getItem(userVisitsKey);
          const currentVisits = userVisitsRaw ? JSON.parse(userVisitsRaw) : [];
          // Avoid duplicate entry if already present
          const filteredVisits = currentVisits.filter((v: any) => v.utrNumber !== verifiedInq.utrNumber && v.txnId !== verifiedInq.id);
          localStorage.setItem(userVisitsKey, JSON.stringify([newVisitEntry, ...filteredVisits]));
        }

        // 2. Also append to global confirmed VIP visits ledger
        const globalVisitsRaw = localStorage.getItem('shreeniwas_all_vip_visits');
        const globalVisits = globalVisitsRaw ? JSON.parse(globalVisitsRaw) : [];
        const filteredGlobal = globalVisits.filter((v: any) => v.utrNumber !== verifiedInq.utrNumber && v.txnId !== verifiedInq.id);
        localStorage.setItem('shreeniwas_all_vip_visits', JSON.stringify([
          { ...newVisitEntry, userEmail: clientEmail, userPhone: clientPhone, userName: verifiedInq.user },
          ...filteredGlobal
        ]));
        syncAdminDataToDatabase('shreeniwas_all_vip_visits', [
          { ...newVisitEntry, userEmail: clientEmail, userPhone: clientPhone, userName: verifiedInq.user },
          ...filteredGlobal
        ]);
      } catch (err) {
        console.warn('Failed to sync verified visit to user account:', err);
      }
    }

    notifyDataUpdated('shreeniwas_inquiries', updated);
    alert('Payment Confirmed! VIP Site Visit pass has been sent directly to the client account visit section & synced to database.');
  };

  // ==========================================
  // GOOGLE FORM 13-POINT VISIT RECORDS HANDLERS
  // ==========================================
  const handleSaveVisitRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitRecordForm.clientName.trim() || !visitRecordForm.clientMobile.trim()) {
      alert('Please provide at least Client Name and Client Mobile Number.');
      return;
    }

    let updatedRecords: PropertyVisitRecordItem[];
    if (editingVisitRecord) {
      updatedRecords = visitRecordsList.map(r => 
        r.id === editingVisitRecord.id 
          ? { ...visitRecordForm, id: r.id, createdAt: r.createdAt }
          : r
      );
    } else {
      const newRec: PropertyVisitRecordItem = {
        ...visitRecordForm,
        id: `VR-${Date.now().toString().slice(-5)}`,
        recordedBy: adminRole === 'super' ? 'Super Administrator' : 'Staff Admin',
        createdAt: new Date().toLocaleString()
      };
      updatedRecords = [newRec, ...visitRecordsList];
    }

    setVisitRecordsList(updatedRecords);
    localStorage.setItem('shreeniwas_property_visit_records', JSON.stringify(updatedRecords));
    notifyDataUpdated('shreeniwas_property_visit_records', updatedRecords);
    setShowVisitRecordModal(false);
    setEditingVisitRecord(null);
    setVisitRecordForm({
      clientName: '',
      clientMobile: '',
      propertyOwnerName: '',
      ownerMobile: '',
      propertyLocation: '',
      visitDate: new Date().toISOString().split('T')[0],
      visitTime: '11:00 AM',
      coordinatorName: 'Priyanka',
      visitCharge: '₹500',
      paymentStatus: 'Paid',
      feedback: '❤️ पसंद आई',
      followUpRemark: '',
      visitNumber: '1',
    });
  };

  const handleDeleteVisitRecord = (id: string) => {
    if (!confirm('Are you sure you want to delete this property visit record?')) return;
    const updated = visitRecordsList.filter(r => r.id !== id);
    setVisitRecordsList(updated);
    localStorage.setItem('shreeniwas_property_visit_records', JSON.stringify(updated));
    notifyDataUpdated('shreeniwas_property_visit_records', updated);
  };

  const handleExportVisitRecords = () => {
    try {
      exportVisitRecordsToExcel(visitRecordsList);
    } catch (err: any) {
      alert(err.message || 'Error exporting visit records to Excel');
    }
  };

  const handleExportAttendance = () => {
    try {
      exportAttendanceToExcel(attendanceList);
    } catch (err: any) {
      alert(err.message || 'Error exporting attendance to Excel');
    }
  };

  // ==========================================
  // SUPER ADMIN BLOCKED VISIT DATES HANDLERS
  // ==========================================
  const handleAddBlockedDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockedDate) return;
    if (blockedDatesList.some(b => b.date === newBlockedDate)) {
      alert('This date is already blocked.');
      return;
    }

    const updated = [...blockedDatesList, { date: newBlockedDate, reason: newBlockedReason.trim() || 'Visits Not Available' }].sort((a, b) => a.date.localeCompare(b.date));
    setBlockedDatesList(updated);
    localStorage.setItem('shreeniwas_blocked_visit_dates', JSON.stringify(updated));
    setNewBlockedDate('');
    notifyDataUpdated('shreeniwas_blocked_visit_dates', updated);
  };

  const handleRemoveBlockedDate = (dateStr: string) => {
    const updated = blockedDatesList.filter(b => b.date !== dateStr);
    setBlockedDatesList(updated);
    localStorage.setItem('shreeniwas_blocked_visit_dates', JSON.stringify(updated));
    notifyDataUpdated('shreeniwas_blocked_visit_dates', updated);
  };

  // Universal Media Gallery Asset Picker Helper
  const openMediaPicker = (callback: (url: string) => void) => {
    setGalleryTargetCallback(() => (url: string) => {
      callback(url);
      setShowGalleryPicker(false);
    });
    setShowGalleryPicker(true);
  };

  const navItems = adminRole === 'super' ? [
    { id: 'overview', label: 'Business Overview', icon: LayoutDashboard },
    { id: 'visit-records', label: 'Property Visit Records (13-Point)', icon: ClipboardList },
    { id: 'properties', label: 'Properties Inventory', icon: Building2 },
    { id: 'projects', label: 'Builder Projects & Townships', icon: Layers },
    { id: 'trends', label: 'Localities & Price Trends', icon: TrendingUp },
    { id: 'gallery', label: 'Media Gallery Assets', icon: ImageIcon },
    { id: 'tariffs', label: 'Tariff & Visits Management', icon: IndianRupee },
    { id: 'payments', label: 'Payment Gateway & UPI Setup', icon: QrCode },
    { id: 'reels', label: 'Property Video Reels', icon: Video },
    { id: 'blogs', label: 'Blog & Content', icon: FileText },
    { id: 'reviews', label: 'Buyer & Landlord Reviews', icon: Star },
    { id: 'inquiries', label: 'Query, Bookings & Leads Desk', icon: MessageSquare },
    { id: 'attendance', label: 'Staff Attendance System', icon: Clock },
    { id: 'users', label: 'Users & Admin Management', icon: Users },
    { id: 'settings', label: 'Platform & Social Settings', icon: Settings },
  ] : [
    { id: 'visit-records', label: 'Submit & View Visit Records', icon: ClipboardList },
    { id: 'inquiries', label: 'Query & Lead Desk', icon: MessageSquare },
    { id: 'attendance', label: 'My Shift Attendance', icon: Clock },
    { id: 'properties', label: 'View Properties', icon: Building2 },
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Admin Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4 relative overflow-hidden py-16">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C9A96E]/15 blur-[150px] rounded-full pointer-events-none"></div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto relative z-10">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0A1628] flex items-center justify-center border-2 border-[#C9A96E] shadow-xl mx-auto mb-3">
              <Crown className="w-8 h-8 text-[#C9A96E]" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-white mb-1">Shreeniwas Admin</h1>
            <p className="text-slate-300 text-xs">Real Estate Management Portal</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#C9A96E]/30 text-[#0A1628]">
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-6 border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedRoleType('super')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedRoleType === 'super' ? 'bg-[#0A1628] text-[#C9A96E] shadow' : 'text-slate-600'
                }`}
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => setSelectedRoleType('staff')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedRoleType === 'staff' ? 'bg-[#0A1628] text-[#C9A96E] shadow' : 'text-slate-600'
                }`}
              >
                Admin Staff
              </button>
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Admin Email ID</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter registered email address"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] font-semibold text-sm outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] font-semibold text-sm outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-extrabold text-sm rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-[#C9A96E]/30"
              >
                <KeyRound className="w-4 h-4 text-[#C9A96E]" />
                Access Management Portal
              </button>
            </form>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Admin Header */}
      <header className="bg-[#0A1628] text-white border-b border-[#C9A96E]/20 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {siteSettings.logoUrl ? (
              <img src={siteSettings.logoUrl} alt="Logo" className="h-11 sm:h-12 w-auto rounded-lg object-contain" />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E]">
                <Crown className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-white">{siteSettings.siteTitle || "Shreeniwas Admin"}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  adminRole === 'super' ? 'bg-[#C9A96E] text-[#0A1628]' : 'bg-blue-500 text-white'
                }`}>
                  {adminRole === 'super' ? 'SUPER ADMIN' : 'STAFF ADMIN'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleClockIn}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isClockedIn ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {isClockedIn ? `Shift Active (${clockInTime})` : 'Clock In Shift'}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white rounded-3xl p-4 border border-slate-200 shadow-sm shrink-0 self-start">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#0A1628] text-[#C9A96E] shadow-md border border-[#C9A96E]/30'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-[#C9A96E]' : 'text-slate-400'}`} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Dynamic Tab Body */}
        <main className="flex-1 space-y-6">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && adminRole === 'super' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Total Properties", value: `${propertiesList.length} Active`, change: "Managed Inventory", icon: Building2 },
                  { title: "Property Reels", value: `${reelsList.length} Active`, change: "Video Walkthroughs", icon: Video },
                  { title: "Buyer Reviews", value: `${reviewsList.length} Reviews`, change: "5-Star Rating Track", icon: Star },
                  { title: "Visitor Inquiries", value: `${inquiriesList.length}`, change: `${inquiriesList.filter(i => i.status === 'Pending').length} Pending Response`, icon: MessageSquare },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">{stat.title}</p>
                      <h3 className="text-2xl font-serif font-bold text-[#0A1628] mt-1">{stat.value}</h3>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">{stat.change}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#0A1628] text-[#C9A96E] flex items-center justify-center border border-[#C9A96E]/30">
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Attendance Summary */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-serif font-bold text-[#0A1628] flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#C9A96E]" /> Today's Staff Attendance Summary
                  </h3>
                  <button onClick={() => setActiveTab('attendance')} className="text-xs font-bold text-[#C9A96E] hover:underline cursor-pointer">
                    View Full Attendance Logs →
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                    <p className="text-2xl font-extrabold text-emerald-800">
                      {attendanceList.filter(a => a.status?.includes('On Time') || a.status?.includes('Present')).length || (isClockedIn ? 1 : 0)}
                    </p>
                    <p className="text-xs font-bold text-emerald-600">Present On Time</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                    <p className="text-2xl font-extrabold text-amber-800">
                      {attendanceList.filter(a => a.status?.includes('Late')).length}
                    </p>
                    <p className="text-xs font-bold text-amber-600">Late Entry</p>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
                    <p className="text-2xl font-extrabold text-slate-700">
                      {attendanceList.filter(a => a.status?.includes('Leave')).length}
                    </p>
                    <p className="text-xs font-bold text-slate-500">On Approved Leave</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GOOGLE FORM 13-POINT PROPERTY VISIT RECORDS TAB (SUPER ADMIN & STAFF ADMIN) */}
          {activeTab === 'visit-records' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] text-xs font-bold uppercase tracking-wider mb-1 border border-[#C9A96E]/30">
                    <ClipboardList className="w-3.5 h-3.5 text-[#C9A96E]" /> Google Form Integration • Shree Niwas Visit Record
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Property Visit Records & Field Verification</h3>
                  <p className="text-xs text-slate-500">
                    All 13 standard Google Form field records stored centrally. Filter by coordinator, track payments, feedback, and download formatted Excel.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={handleExportVisitRecords}
                    disabled={visitRecordsList.length === 0}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer border border-slate-300"
                    title="Export all 13-point visit records to Excel"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Download Excel (.xlsx)</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingVisitRecord(null);
                      setVisitRecordForm({
                        clientName: '',
                        clientMobile: '',
                        propertyOwnerName: '',
                        ownerMobile: '',
                        propertyLocation: '',
                        visitDate: new Date().toISOString().split('T')[0],
                        visitTime: '11:00 AM',
                        coordinatorName: 'Priyanka',
                        visitCharge: '₹500',
                        paymentStatus: 'Paid',
                        feedback: '❤️ पसंद आई',
                        followUpRemark: '',
                        visitNumber: '1',
                      });
                      setShowVisitRecordModal(true);
                    }}
                    className="px-5 py-2.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-extrabold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer shadow-md border border-[#C9A96E]/30"
                  >
                    <Plus className="w-4 h-4" />
                    Record New Property Visit
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Total Field Visits</p>
                  <p className="text-2xl font-serif font-bold text-[#0A1628] mt-0.5">{visitRecordsList.length}</p>
                  <p className="text-[10px] text-slate-500 font-medium">Logged in system</p>
                </div>
                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 shadow-sm">
                  <p className="text-[11px] font-bold text-emerald-700 uppercase">Paid Visits</p>
                  <p className="text-2xl font-serif font-bold text-emerald-900 mt-0.5">
                    {visitRecordsList.filter(r => r.paymentStatus === 'Paid').length}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-medium">Full charge collected</p>
                </div>
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 shadow-sm">
                  <p className="text-[11px] font-bold text-amber-700 uppercase">Liked Properties</p>
                  <p className="text-2xl font-serif font-bold text-amber-900 mt-0.5">
                    {visitRecordsList.filter(r => r.feedback?.includes('पसंद आई')).length}
                  </p>
                  <p className="text-[10px] text-amber-700 font-medium">❤️ Client Approved</p>
                </div>
                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 shadow-sm">
                  <p className="text-[11px] font-bold text-blue-700 uppercase">Pending / Thinking</p>
                  <p className="text-2xl font-serif font-bold text-blue-900 mt-0.5">
                    {visitRecordsList.filter(r => r.feedback?.includes('सोचकर बताएगा')).length}
                  </p>
                  <p className="text-[10px] text-blue-700 font-medium">🤔 Active follow-up</p>
                </div>
              </div>

              {/* Search & Coordinator Filters */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={visitRecordSearch}
                    onChange={(e) => setVisitRecordSearch(e.target.value)}
                    placeholder="Search by client name, mobile, location, or owner name..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] text-[#0A1628]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Staff:</span>
                  <select
                    value={visitRecordStaffFilter}
                    onChange={(e) => setVisitRecordStaffFilter(e.target.value)}
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] text-[#0A1628]"
                  >
                    <option value="All">All Staff Coordinators</option>
                    <option value="Priyanka">Priyanka</option>
                    <option value="Suman">Suman</option>
                    <option value="Tammana">Tammana</option>
                  </select>
                </div>
              </div>

              {/* Records Table */}
              {visitRecordsList.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <ClipboardList className="w-10 h-10 text-[#C9A96E] mx-auto mb-3" />
                  <h4 className="text-base font-bold text-[#0A1628]">No Property Visit Records Yet</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Click &quot;Record New Property Visit&quot; to log the first accompanied property visit.</p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[950px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                          <th className="p-3.5 pl-6">Client / Mobile</th>
                          <th className="p-3.5">Property & Owner</th>
                          <th className="p-3.5">Schedule</th>
                          <th className="p-3.5">Coordinator</th>
                          <th className="p-3.5">Fee & Payment</th>
                          <th className="p-3.5">Feedback & Remarks</th>
                          <th className="p-3.5 text-right pr-6">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {visitRecordsList
                          .filter((rec) => {
                            const query = visitRecordSearch.toLowerCase();
                            const matchesQuery = 
                              !query ||
                              rec.clientName?.toLowerCase().includes(query) ||
                              rec.clientMobile?.includes(query) ||
                              rec.propertyOwnerName?.toLowerCase().includes(query) ||
                              rec.propertyLocation?.toLowerCase().includes(query) ||
                              rec.ownerMobile?.includes(query);

                            const matchesStaff = 
                              visitRecordStaffFilter === 'All' ||
                              rec.coordinatorName === visitRecordStaffFilter;

                            return matchesQuery && matchesStaff;
                          })
                          .map((rec) => (
                            <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-3.5 pl-6">
                                <div className="font-bold text-[#0A1628] flex items-center gap-1.5">
                                  <span>{rec.clientName}</span>
                                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono font-normal">
                                    Visit #{rec.visitNumber || '1'}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>{rec.clientMobile}</span>
                                </div>
                              </td>

                              <td className="p-3.5">
                                <div className="font-semibold text-slate-800 line-clamp-1 max-w-[200px]" title={rec.propertyLocation}>
                                  {rec.propertyLocation}
                                </div>
                                <div className="text-[11px] text-slate-500 mt-0.5">
                                  Owner: <strong className="text-[#0A1628]">{rec.propertyOwnerName}</strong>
                                  {rec.ownerMobile && <span className="font-mono text-slate-400 ml-1">({rec.ownerMobile})</span>}
                                </div>
                              </td>

                              <td className="p-3.5">
                                <div className="font-bold text-slate-800">{rec.visitDate}</div>
                                <div className="text-[11px] text-[#C9A96E] font-semibold">{rec.visitTime}</div>
                              </td>

                              <td className="p-3.5">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0A1628] text-[#C9A96E] border border-[#C9A96E]/30 inline-flex items-center gap-1">
                                  <span>{rec.coordinatorName}</span>
                                </span>
                              </td>

                              <td className="p-3.5">
                                <div className="font-extrabold text-slate-900">{rec.visitCharge}</div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block mt-0.5 ${
                                  rec.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                                  rec.paymentStatus === 'Partial' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {rec.paymentStatus}
                                </span>
                              </td>

                              <td className="p-3.5 max-w-[220px]">
                                <div className="font-semibold text-[#0A1628] flex items-center gap-1">
                                  <span>{rec.feedback}</span>
                                </div>
                                {rec.followUpRemark && (
                                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2" title={rec.followUpRemark}>
                                    {rec.followUpRemark}
                                  </p>
                                )}
                              </td>

                              <td className="p-3.5 text-right pr-6">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      setEditingVisitRecord(rec);
                                      setVisitRecordForm({ ...rec });
                                      setShowVisitRecordModal(true);
                                    }}
                                    className="p-1.5 text-slate-600 hover:text-[#C9A96E] hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                    title="Edit record"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  {adminRole === 'super' && (
                                    <button
                                      onClick={() => handleDeleteVisitRecord(rec.id || '')}
                                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                      title="Delete record"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROPERTIES TAB */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Properties Inventory Manager</h3>
                  <p className="text-xs text-slate-500">Super Admin Power: Moderate listings, toggle verification, feature properties, update prices, or remove.</p>
                </div>

                {adminRole === 'super' && (
                  <button
                    onClick={() => {
                      setEditingProperty(null);
                      setPropForm({ 
                        title: '', 
                        location: '', 
                        city: 'Jaipur',
                        price: '', 
                        pricePerSqft: '',
                        type: 'Luxury Villa', 
                        purpose: 'Buy',
                        status: 'Ready to Move', 
                        bhk: '3 BHK',
                        bedrooms: 3,
                        bathrooms: 2,
                        sqft: '2,100',
                        carpetArea: '1,800 sq.ft',
                        furnishing: 'Semi-Furnished',
                        floor: '3rd of 8 Floors',
                        facing: 'East (Vastu Compliant)',
                        reraApproved: true,
                        reraNumber: '',
                        zeroBrokerage: true,
                        image: '',
                        images: [],
                        googleMapsUrl: '',
                        description: '',
                        amenities: ['24x7 Security', 'Power Backup', 'Car Parking']
                      });
                      setShowPropertyModal(true);
                    }}
                    className="px-4 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow cursor-pointer hover:bg-[#0A1628]/90"
                  >
                    <Plus className="w-4 h-4" /> Add New Property Listing
                  </button>
                )}
              </div>

              {/* Filters & Search Toolbar */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  {[
                    { id: 'all', label: `All (${propertiesList.length})` },
                    { id: 'active', label: `Active (${propertiesList.filter(p => p.status === 'Active' || p.status === 'Ready to Move').length})` },
                    { id: 'ready', label: `Ready to Move (${propertiesList.filter(p => p.status === 'Ready to Move').length})` },
                    { id: 'construction', label: `Under Construction (${propertiesList.filter(p => p.status === 'Under Construction').length})` },
                    { id: 'landlord', label: `Landlord Submissions (${propertiesList.filter(p => typeof p.id === 'number' || String(p.id).startsWith('landlord') || !String(p.id).startsWith('PROP-')).length})` },
                    { id: 'verified', label: `Verified (${propertiesList.filter(p => p.verified).length})` },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setPropertyFilter(filter.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        propertyFilter === filter.id
                          ? 'bg-[#0A1628] text-[#C9A96E] shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[240px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={propertySearch}
                    onChange={(e) => setPropertySearch(e.target.value)}
                    placeholder="Search title, location or city..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[850px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                        <th className="p-4 pl-6">ID & Source</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Moderation Badges</th>
                        {adminRole === 'super' && <th className="p-4 text-right pr-6">Super Admin Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {propertiesList
                        .filter(prop => {
                          if (propertySearch) {
                            const q = propertySearch.toLowerCase();
                            const matchTitle = prop.title?.toLowerCase().includes(q);
                            const matchLoc = prop.location?.toLowerCase().includes(q);
                            if (!matchTitle && !matchLoc) return false;
                          }
                          if (propertyFilter === 'active') return prop.status === 'Active' || prop.status === 'Ready to Move';
                          if (propertyFilter === 'ready') return prop.status === 'Ready to Move';
                          if (propertyFilter === 'construction') return prop.status === 'Under Construction';
                          if (propertyFilter === 'landlord') return typeof prop.id === 'number' || String(prop.id).startsWith('landlord') || !String(prop.id).startsWith('PROP-');
                          if (propertyFilter === 'verified') return !!prop.verified;
                          return true;
                        })
                        .map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 pl-6">
                            <span className="font-mono font-bold text-slate-500 block">{String(prop.id).slice(0, 10)}</span>
                            {typeof prop.id === 'number' || String(prop.id).startsWith('landlord') || !String(prop.id).startsWith('PROP-') ? (
                              <span className="inline-block text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 mt-0.5">
                                Landlord Post
                              </span>
                            ) : (
                              <span className="inline-block text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 mt-0.5">
                                Admin Inventory
                              </span>
                            )}
                          </td>
                          <td className="p-4 font-bold text-[#0A1628] max-w-[200px]">
                            <p className="truncate">{prop.title}</p>
                            <p className="text-[10px] text-slate-400 font-normal">{prop.type || 'Residential'}</p>
                          </td>
                          <td className="p-4 text-slate-600 max-w-[180px]">
                            <p className="truncate">{prop.location}</p>
                            {prop.googleMapsUrl && (
                              <a
                                href={prop.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 hover:underline mt-0.5"
                              >
                                <MapPin className="w-2.5 h-2.5" /> Map Pin
                              </a>
                            )}
                          </td>
                          <td className="p-4 font-bold text-emerald-700">{prop.price}</td>
                          <td className="p-4">
                            <button
                              onClick={() => handleTogglePropertyStatus(prop.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                                prop.status === 'Active' || prop.status === 'Ready to Move'
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              }`}
                              title="Click to toggle Active / Paused status"
                            >
                              {prop.status}
                            </button>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {/* Verified Toggle */}
                              <button
                                onClick={() => handleTogglePropertyVerified(prop.id)}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                  prop.verified
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                                }`}
                                title="Click to toggle Verified badge"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                {prop.verified ? 'Verified' : 'Unverified'}
                              </button>

                              {/* Featured Toggle */}
                              <button
                                onClick={() => handleTogglePropertyFeatured(prop.id)}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                  prop.featured
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                                }`}
                                title="Click to toggle Featured on Homepage"
                              >
                                <Star className="w-3 h-3" />
                                {prop.featured ? 'Featured' : 'Standard'}
                              </button>
                            </div>
                          </td>
                          {adminRole === 'super' && (
                            <td className="p-4 text-right pr-6 space-x-2">
                              <button
                                onClick={() => {
                                  setEditingProperty(prop);
                                  setPropForm({ 
                                    title: prop.title || '', 
                                    location: prop.location || '', 
                                    city: prop.city || 'Jaipur',
                                    price: prop.price || '', 
                                    pricePerSqft: prop.pricePerSqft || '',
                                    type: prop.type || 'Luxury Villa', 
                                    purpose: prop.purpose || 'Buy',
                                    status: prop.status || 'Ready to Move', 
                                    bhk: prop.bhk || '3 BHK',
                                    bedrooms: prop.bedrooms || 3,
                                    bathrooms: prop.bathrooms || 2,
                                    sqft: prop.sqft || '2,100',
                                    carpetArea: prop.carpetArea || '1,800 sq.ft',
                                    furnishing: prop.furnishing || 'Semi-Furnished',
                                    floor: prop.floor || '3rd of 8 Floors',
                                    facing: prop.facing || 'East (Vastu Compliant)',
                                    reraApproved: prop.reraApproved ?? true,
                                    reraNumber: prop.reraNumber || '',
                                    zeroBrokerage: prop.zeroBrokerage ?? true,
                                    image: prop.image || '',
                                    images: prop.images || (prop.image ? [prop.image] : []),
                                    googleMapsUrl: prop.googleMapsUrl || '',
                                    description: prop.description || '',
                                    amenities: prop.amenities || ['24x7 Security', 'Power Backup', 'Car Parking']
                                  });
                                  setShowPropertyModal(true);
                                }}
                                className="p-1.5 bg-slate-100 text-slate-700 hover:bg-[#0A1628] hover:text-[#C9A96E] rounded-lg transition cursor-pointer"
                                title="Edit Listing"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProperty(prop.id)}
                                className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition cursor-pointer"
                                title="Delete Listing"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* BUILDER PROJECTS & TOWNSHIPS TAB */}
          {activeTab === 'projects' && adminRole === 'super' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1628] text-[#C9A96E] text-xs font-bold uppercase tracking-wider mb-1 border border-[#C9A96E]/30">
                    <Layers className="w-3.5 h-3.5" /> Builder Townships Showcase
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">New Projects & Builder Townships</h3>
                  <p className="text-xs text-slate-500">Super Admin Power: Manage builder societies, RERA approvals, pricing brackets, and brochure leads.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingProject(null);
                    setProjectForm({
                      name: '',
                      builder: '',
                      reraNumber: '',
                      city: 'Jaipur',
                      location: '',
                      priceRange: '',
                      configurations: '2 BHK, 3 BHK',
                      status: 'Under Construction',
                      possessionDate: '',
                      coverImage: '',
                      googleMapsUrl: '',
                      highlights: 'RERA Approved, Modern Clubhouse, Gated Security'
                    });
                    setShowProjectModal(true);
                  }}
                  className="px-4 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow cursor-pointer hover:bg-[#0A1628]/90"
                >
                  <Plus className="w-4 h-4" /> Add New Builder Project
                </button>
              </div>

              {/* Projects Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[760px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                        <th className="p-4 pl-6">Project & Builder</th>
                        <th className="p-4">RERA Number</th>
                        <th className="p-4">City & Location</th>
                        <th className="p-4">Price Bracket</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Maps Pin</th>
                        <th className="p-4 text-right pr-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {newProjectsList.map((proj) => (
                        <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 pl-6">
                            <p className="font-bold text-[#0A1628]">{proj.name}</p>
                            <p className="text-[11px] text-[#C9A96E] font-semibold">{proj.builder}</p>
                          </td>
                          <td className="p-4 font-mono text-slate-600 font-semibold">{proj.reraNumber}</td>
                          <td className="p-4 text-slate-600">
                            <span className="font-bold text-[#0A1628]">{proj.city}</span> - {proj.location}
                          </td>
                          <td className="p-4 font-bold text-emerald-700">{proj.priceRange}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              proj.status === 'Ready to Move' ? 'bg-emerald-100 text-emerald-800' :
                              proj.status === 'New Launch' ? 'bg-amber-100 text-amber-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {proj.status}
                            </span>
                          </td>
                          <td className="p-4">
                            {proj.googleMapsUrl ? (
                              <a
                                href={proj.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline"
                              >
                                <MapPin className="w-3.5 h-3.5" /> Direct Pin
                              </a>
                            ) : (
                              <span className="text-[10px] text-slate-400 italic">None</span>
                            )}
                          </td>
                          <td className="p-4 text-right pr-6 space-x-2">
                            <button
                              onClick={() => {
                                setEditingProject(proj);
                                setProjectForm({
                                  name: proj.name,
                                  builder: proj.builder,
                                  reraNumber: proj.reraNumber,
                                  city: proj.city,
                                  location: proj.location,
                                  priceRange: proj.priceRange,
                                  configurations: proj.configurations.join(', '),
                                  status: proj.status,
                                  possessionDate: proj.possessionDate,
                                  coverImage: proj.coverImage,
                                  googleMapsUrl: proj.googleMapsUrl || '',
                                  highlights: proj.highlights.join(', ')
                                });
                                setShowProjectModal(true);
                              }}
                              className="p-1.5 bg-slate-100 text-slate-700 hover:bg-[#0A1628] hover:text-[#C9A96E] rounded-lg transition cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* LOCALITIES & REAL ESTATE PRICE TRENDS TAB */}
          {activeTab === 'trends' && adminRole === 'super' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1628] text-[#C9A96E] text-xs font-bold uppercase tracking-wider mb-1 border border-[#C9A96E]/30">
                    <TrendingUp className="w-3.5 h-3.5" /> Market Intelligence & Valuation
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Localities & Real Estate Price Trends</h3>
                  <p className="text-xs text-slate-500">Super Admin Power: Control average price per sq.ft, YoY capital appreciation, property classifications, and sync with live listings.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleSyncPriceTrends}
                    className="px-3.5 py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-emerald-100 transition cursor-pointer"
                    title="Automatically recalculate average price per sq.ft and counts based on all listed properties in inventory"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-700" /> Auto-Sync with Inventory
                  </button>

                  <button
                    onClick={() => {
                      setEditingTrend(null);
                      setTrendForm({
                        name: '',
                        city: trendsCity,
                        avgPrice: '₹5,500',
                        avgPriceNum: 5500,
                        growth: '+10.0%',
                        growthNum: 10.0,
                        type: 'Luxury Residential',
                        count: '50+ Properties',
                        rentalYield: '4.5% Yield'
                      });
                      setShowTrendModal(true);
                    }}
                    className="px-4 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow cursor-pointer hover:bg-[#0A1628]/90"
                  >
                    <Plus className="w-4 h-4" /> Add Locality Trend
                  </button>
                </div>
              </div>

              {/* City Selector Bar */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {['Jodhpur', 'Jaipur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Bhilwara', 'Alwar'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setTrendsCity(city)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                      trendsCity === city
                        ? 'bg-[#0A1628] text-[#C9A96E] border-[#C9A96E]/50 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {city} ({allTrends[city]?.length || 0})
                  </button>
                ))}
              </div>

              {/* Trends Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[760px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                        <th className="p-4 pl-6">Locality Name</th>
                        <th className="p-4">City</th>
                        <th className="p-4">Avg Price / sq.ft</th>
                        <th className="p-4">YoY Growth</th>
                        <th className="p-4">Locality Profile</th>
                        <th className="p-4">Inventory Size</th>
                        <th className="p-4">Rental Yield</th>
                        <th className="p-4 text-right pr-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {(!allTrends[trendsCity] || allTrends[trendsCity].length === 0) ? (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-slate-400">
                            No locality trends registered for {trendsCity}. Click &quot;Add Locality Trend&quot; to configure.
                          </td>
                        </tr>
                      ) : (
                        allTrends[trendsCity].map((t) => (
                          <tr key={t.name} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 pl-6 font-bold text-[#0A1628]">
                              {t.name}
                            </td>
                            <td className="p-4 text-slate-600 font-semibold">{t.city}</td>
                            <td className="p-4 font-mono font-bold text-[#A27B36]">{t.avgPrice}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                (t.growthNum ?? 0) >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {t.growth}
                              </span>
                            </td>
                            <td className="p-4 text-slate-600">{t.type}</td>
                            <td className="p-4 text-slate-500">{t.count}</td>
                            <td className="p-4 font-semibold text-slate-700">{t.rentalYield || '4.0% Yield'}</td>
                            <td className="p-4 text-right pr-6 space-x-2">
                              <button
                                onClick={() => {
                                  setEditingTrend(t);
                                  setTrendForm({
                                    name: t.name,
                                    city: t.city,
                                    avgPrice: t.avgPrice,
                                    avgPriceNum: t.avgPriceNum,
                                    growth: t.growth,
                                    growthNum: t.growthNum,
                                    type: t.type,
                                    count: t.count,
                                    rentalYield: t.rentalYield || '4.0% Yield'
                                  });
                                  setShowTrendModal(true);
                                }}
                                className="p-1.5 bg-slate-100 text-slate-700 hover:bg-[#0A1628] hover:text-[#C9A96E] rounded-lg transition cursor-pointer"
                                title="Edit Locality"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteTrend(trendsCity, t.name)}
                                className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition cursor-pointer"
                                title="Delete Locality"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MEDIA GALLERY ASSETS TAB */}
          {activeTab === 'gallery' && adminRole === 'super' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1628] text-[#C9A96E] text-xs font-bold uppercase tracking-wider mb-1 border border-[#C9A96E]/30">
                    <ImageIcon className="w-3.5 h-3.5" /> Universal Digital Asset Hub
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Media Gallery Assets</h3>
                  <p className="text-xs text-slate-500">Super Admin Power: Manage centralized images, brand logos, hero graphics, and property photography with 1-click URL copying.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setNewMediaForm({ title: '', category: 'Properties', type: 'image', url: '', instaUrl: '' });
                      setShowAddMediaModal(true);
                    }}
                    className="px-4 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow cursor-pointer hover:bg-[#0A1628]/90"
                  >
                    <Plus className="w-4 h-4" /> Add Asset to Gallery
                  </button>
                </div>
              </div>

              {/* Gallery Filter & Search Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
                  {['All', 'Properties', 'Reels & Videos', 'Logos & Avatars', 'Blogs', 'Townships'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        galleryCategoryFilter === cat
                          ? 'bg-[#0A1628] text-[#C9A96E] shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={gallerySearchQuery}
                    onChange={(e) => setGallerySearchQuery(e.target.value)}
                    placeholder="Search media by title..."
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-1 focus:ring-[#C9A96E]"
                  />
                </div>
              </div>

              {/* Media Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaGallery
                  .filter((item) => {
                    const matchesCategory = galleryCategoryFilter === 'All' || item.category === galleryCategoryFilter;
                    const matchesSearch = !gallerySearchQuery || item.title?.toLowerCase().includes(gallerySearchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                  })
                  .map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
                      <div className="relative h-44 bg-slate-100 overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600');
                          }}
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0A1628]/80 text-[#C9A96E] backdrop-blur-sm border border-[#C9A96E]/20">
                          {item.category}
                        </span>
                        {item.type === 'video' && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white flex items-center gap-1 shadow">
                            <Video className="w-2.5 h-2.5" /> Video
                          </span>
                        )}
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <p className="font-bold text-xs text-[#0A1628] line-clamp-1">{item.title}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.id}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.url);
                              setCopiedMediaUrl(item.id);
                              setTimeout(() => setCopiedMediaUrl(''), 2000);
                            }}
                            className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                              copiedMediaUrl === item.id
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-[#0A1628] hover:text-[#C9A96E]'
                            }`}
                            title="Copy Direct URL"
                          >
                            {copiedMediaUrl === item.id ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-white" /> Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copy URL
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              setEditingMedia(item);
                              setMediaForm({
                                title: item.title,
                                category: item.category,
                                type: item.type || 'image',
                                url: item.url,
                                instaUrl: item.instaUrl || ''
                              });
                              setShowEditMediaModal(true);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-700 hover:bg-[#0A1628] hover:text-[#C9A96E] rounded-lg transition cursor-pointer"
                            title="Edit Media"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteMedia(item.id)}
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition cursor-pointer"
                            title="Delete Media"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SUPER ADMIN TARIFF & VISITS MANAGEMENT TAB */}
          {activeTab === 'tariffs' && adminRole === 'super' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] text-xs font-bold uppercase tracking-wider mb-1 border border-[#C9A96E]/30">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#C9A96E]" /> Super Admin Live Control • 0ms Sync
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Tariff, Site Visits & Brokerage Engine</h3>
                  <p className="text-xs text-slate-500">
                    Live control for site visit fees, visitor free-visit policies, pass bundles, rental brokerage, and buy/sell transaction percentages.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveTariffs} className="space-y-6 max-w-4xl">
                {/* 1. Site Visit Policies & Pass Pricing */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#C9A96E]" /> Site Visit Policies & Verified Visitor Passes
                  </h4>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-sm text-[#0A1628]">1st Site Visit Complimentary (Free)</p>
                      <p className="text-slate-500 text-xs">When enabled, first-time logged-in visitors can book 1 property tour completely free of charge.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tariffSettings.firstVisitFree}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, firstVisitFree: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      <span className="ml-3 text-xs font-bold text-slate-700">
                        {tariffSettings.firstVisitFree ? 'Active (Free 1st Visit)' : 'Disabled (All Visits Paid)'}
                      </span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">VIP Single Visit Fee (₹)</label>
                      <input
                        type="number"
                        min="0"
                        value={tariffSettings.vipSiteVisitFee}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, vipSiteVisitFee: parseInt(e.target.value) || 0 })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Paid on 2nd visit onwards (or 1st if free visit is disabled).</p>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Standard Pass Fee (₹)</label>
                      <input
                        type="number"
                        min="0"
                        value={tariffSettings.standardPassFee}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, standardPassFee: parseInt(e.target.value) || 0 })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Includes 3 verified property visits + coordinator.</p>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Premium VIP Pass Fee (₹)</label>
                      <input
                        type="number"
                        min="0"
                        value={tariffSettings.premiumPassFee}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, premiumPassFee: parseInt(e.target.value) || 0 })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Unlimited visits for 6 months + legal verification support.</p>
                    </div>
                  </div>

                  {/* 1.1 Customization of ₹999 Premium Plan Text */}
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 bg-[#FAF8F5] p-4 rounded-2xl border">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                      <h5 className="font-bold text-xs uppercase tracking-wider text-[#0A1628]">
                        ₹{tariffSettings.premiumPassFee} Premium Pass — Card Text &amp; Bullet Points Customization
                      </h5>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Customize the exact text, headline, duration, and feature bullet points shown on the public ₹{tariffSettings.premiumPassFee} plan card.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">Plan Title / Name</label>
                        <input
                          type="text"
                          value={tariffSettings.premiumPassTitle || 'Premium Pass'}
                          onChange={(e) => setTariffSettings({ ...tariffSettings, premiumPassTitle: e.target.value })}
                          placeholder="e.g. Premium Pass / VIP Pass"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                      </div>

                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">Badge Tag</label>
                        <input
                          type="text"
                          value={tariffSettings.premiumPassBadge || 'VIP Priority'}
                          onChange={(e) => setTariffSettings({ ...tariffSettings, premiumPassBadge: e.target.value })}
                          placeholder="e.g. VIP Priority / Best Value"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                      </div>

                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">Duration Text (Per Plan)</label>
                        <input
                          type="text"
                          value={tariffSettings.premiumPassDuration || '6 Months Active Support'}
                          onChange={(e) => setTariffSettings({ ...tariffSettings, premiumPassDuration: e.target.value })}
                          placeholder="e.g. 6 Months Active Support"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                      </div>

                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">Validity Subtitle Text</label>
                        <input
                          type="text"
                          value={tariffSettings.premiumPassValidity || '6 months priority search across Rajasthan'}
                          onChange={(e) => setTariffSettings({ ...tariffSettings, premiumPassValidity: e.target.value })}
                          placeholder="e.g. 6 months priority search across Rajasthan"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">
                        Plan Features &amp; Benefits (Enter one feature per line)
                      </label>
                      <textarea
                        rows={4}
                        value={tariffSettings.premiumPassFeatures || ''}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, premiumPassFeatures: e.target.value })}
                        placeholder="Multiple visits matched to criteria&#10;VIP hunting & priority early access&#10;Active validity for 6 full months&#10;Direct owner negotiation support&#10;100% adjusted against brokerage"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium outline-none focus:ring-2 focus:ring-[#C9A96E] text-xs font-mono"
                      />
                      <p className="text-[10px] text-slate-400 mt-0.5">Each line becomes an individual checked bullet point on the public website card.</p>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Footer Note / Guarantee</label>
                      <input
                        type="text"
                        value={tariffSettings.premiumPassNote || '100% adjustable against final brokerage fee.'}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, premiumPassNote: e.target.value })}
                        placeholder="e.g. 100% adjustable against final brokerage fee."
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Transaction Brokerage & Commission Structure */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-[#C9A96E]" /> Brokerage Rates Displayed on Site
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Residential Rent Brokerage</label>
                      <input
                        type="text"
                        value={tariffSettings.residentialRentBrokerage}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, residentialRentBrokerage: e.target.value })}
                        placeholder="e.g. 15 Days Rent"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Displayed on pricing tariff table for residential rentals.</p>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Commercial Rent Brokerage</label>
                      <input
                        type="text"
                        value={tariffSettings.commercialRentBrokerage}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, commercialRentBrokerage: e.target.value })}
                        placeholder="e.g. 1 Month Rent"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Displayed on pricing tariff table for commercial spaces.</p>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Sale & Purchase Commission (Under ₹50 Lacs)</label>
                      <input
                        type="text"
                        value={tariffSettings.buySellUnder50L}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, buySellUnder50L: e.target.value })}
                        placeholder="e.g. 2%"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Commission rate for properties below ₹50 Lakhs.</p>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Sale & Purchase Commission (Above ₹50 Lacs)</label>
                      <input
                        type="text"
                        value={tariffSettings.buySellAbove50L}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, buySellAbove50L: e.target.value })}
                        placeholder="e.g. 1%"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Discounted brokerage tier for high-value properties.</p>
                    </div>
                  </div>
                </div>

                {/* 3. Escrow & Security Rules */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Legal Title Escrow & Direct Owner Directives
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Legal Title Escrow Deposit (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={tariffSettings.escrowDepositPercent}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, escrowDepositPercent: parseInt(e.target.value) || 0 })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Required security token held during title search and registry verification.</p>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <input
                        type="checkbox"
                        id="allowDirectOwnerTariff"
                        checked={tariffSettings.allowDirectOwnerContact}
                        onChange={(e) => setTariffSettings({ ...tariffSettings, allowDirectOwnerContact: e.target.checked })}
                        className="w-5 h-5 accent-[#0A1628] cursor-pointer rounded"
                      />
                      <label htmlFor="allowDirectOwnerTariff" className="font-bold text-slate-700 cursor-pointer text-xs">
                        Allow Direct Buyer-Owner WhatsApp Calls (Bypass Admin Desk)
                      </label>
                    </div>
                  </div>
                </div>

                {/* 4. Super Admin Blocked & Unavailable Visit Days Calendar (Blackout Dates) */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] flex items-center gap-2">
                        <CalendarX className="w-4 h-4 text-rose-600" /> Blocked & Unavailable Site Visit Days (Blackout Dates)
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Choose specific dates when visits should NOT be available for users (holidays, staff off, maintenance). Users will be blocked from booking these dates.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full font-bold text-[11px] border border-rose-200 shrink-0">
                      {blockedDatesList.length} Dates Blocked
                    </span>
                  </div>

                  {/* Add Blocked Date Form */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Pick Date to Block</label>
                        <input
                          type="date"
                          value={newBlockedDate}
                          onChange={(e) => setNewBlockedDate(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-rose-500 text-[#0A1628]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Reason / Notice for Clients</label>
                        <input
                          type="text"
                          value={newBlockedReason}
                          onChange={(e) => setNewBlockedReason(e.target.value)}
                          placeholder="e.g. Festival Holiday / Private Inspection Day"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-rose-500 text-[#0A1628]"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={handleAddBlockedDate}
                          disabled={!newBlockedDate}
                          className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4" />
                          Block This Date
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Blocked Dates List */}
                  {blockedDatesList.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                      All dates are currently open for site inspections. No blackout dates configured.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                      {blockedDatesList.map((item) => (
                        <div key={item.date} className="p-3 bg-rose-50/60 border border-rose-200/80 rounded-2xl flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <CalendarX className="w-3.5 h-3.5 text-rose-600" />
                              <span className="font-mono font-bold text-xs text-rose-900">{item.date}</span>
                            </div>
                            <p className="text-[10px] text-rose-700 mt-0.5 line-clamp-1">{item.reason}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveBlockedDate(item.date)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                            title="Unblock this date"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#0A1628] text-[#C9A96E] font-extrabold text-xs rounded-2xl shadow-xl hover:bg-[#0A1628]/90 transition cursor-pointer border border-[#C9A96E]/30 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                  Save Tariffs & Site Visit Settings (Instant Live Sync)
                </button>
              </form>
            </div>
          )}

          {/* SUPER ADMIN PAYMENT GATEWAY & UPI ALL SETUP TAB */}
          {activeTab === 'payments' && adminRole === 'super' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1 border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Super Admin Financial Engine
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Payment Gateway, UPI & QR Code All Setup</h3>
                  <p className="text-xs text-slate-500">
                    Super Admin Power: Manage primary UPI IDs, QR code graphics, direct-to-pay apps (GPay, PhonePe, Paytm, BHIM), download/share buttons, and bank transfer credentials.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Form Settings (8 Columns) */}
                <form onSubmit={handleSavePayment} className="lg:col-span-7 space-y-6">
                  {/* 1. UPI Merchant Credentials */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-[#C9A96E]" /> Merchant UPI Identity
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">
                          Primary UPI ID <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentSettings.upiId}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, upiId: e.target.value.trim() })}
                          placeholder="e.g. 6376117833@okbizaxis or shreeniwas@upi"
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Accepts payments from GPay, PhonePe, Paytm, BHIM, and bank UPI apps.</p>
                      </div>

                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">
                          Merchant / Payee Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentSettings.merchantName}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, merchantName: e.target.value })}
                          placeholder="e.g. Shreeniwas Properties Pvt Ltd"
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Displays on customer UPI checkout screens & receipts.</p>
                      </div>
                    </div>
                  </div>

                  {/* 2. QR Code Graphics & Upload */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#C9A96E]" /> QR Code Graphic & Branding
                      </h4>
                      <div className="flex items-center gap-2 text-xs">
                        <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                          <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Custom QR
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (dataUrl) => setPaymentSettings(prev => ({ ...prev, customQrUrl: dataUrl })))}
                          />
                        </label>
                        {paymentSettings.customQrUrl && (
                          <>
                            <span className="text-slate-300">|</span>
                            <button
                              type="button"
                              onClick={() => setPaymentSettings(prev => ({ ...prev, customQrUrl: '' }))}
                              className="text-rose-600 hover:underline font-bold text-[10px] cursor-pointer"
                            >
                              Reset to Auto QR
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="text-xs space-y-2">
                      <label className="font-bold uppercase text-slate-700 block">Custom QR Code Image URL</label>
                      <input
                        type="text"
                        value={paymentSettings.customQrUrl}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, customQrUrl: e.target.value })}
                        placeholder="Leave empty to auto-generate dynamic QR from UPI ID"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400">
                        When empty, the platform auto-generates a high-resolution NPCI QR code containing your UPI ID and dynamic amount.
                      </p>
                    </div>
                  </div>

                  {/* 3. Direct App Pay & Feature Buttons */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#C9A96E]" /> Direct App Pay & Modal Action Buttons
                    </h4>

                    <div className="space-y-3 text-xs">
                      <label className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200 cursor-pointer transition">
                        <input
                          type="checkbox"
                          checked={paymentSettings.enableDirectUpiPay}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, enableDirectUpiPay: e.target.checked })}
                          className="w-4 h-4 accent-[#0A1628] cursor-pointer rounded"
                        />
                        <div>
                          <span className="font-bold text-[#0A1628] block">Enable Direct App Pay Intents (GPay, PhonePe, Paytm, BHIM)</span>
                          <span className="text-[11px] text-slate-500">
                            Allows customers on mobile devices to tap a button to directly open their installed UPI app with amount and merchant pre-filled.
                          </span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200 cursor-pointer transition">
                        <input
                          type="checkbox"
                          checked={paymentSettings.enableDownloadQr}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, enableDownloadQr: e.target.checked })}
                          className="w-4 h-4 accent-[#0A1628] cursor-pointer rounded"
                        />
                        <div>
                          <span className="font-bold text-[#0A1628] block">Provide 'Download QR Image' Button</span>
                          <span className="text-[11px] text-slate-500">
                            Enables users to download the high-resolution QR graphic directly to their gallery/files to scan in secondary apps.
                          </span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200 cursor-pointer transition">
                        <input
                          type="checkbox"
                          checked={paymentSettings.enableShareQr}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, enableShareQr: e.target.checked })}
                          className="w-4 h-4 accent-[#0A1628] cursor-pointer rounded"
                        />
                        <div>
                          <span className="font-bold text-[#0A1628] block">Provide 'Share QR Code' Button</span>
                          <span className="text-[11px] text-slate-500">
                            Allows customers to share the QR code and payment link directly to family, partners, or other devices via WhatsApp/Telegram/Share Sheet.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* 4. Tariffs & Pass Fees */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-[#C9A96E]" /> Platform Visit Pass Tariffs & Fees
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">VIP Cab & Site Visit (₹)</label>
                        <input
                          type="number"
                          min="0"
                          value={paymentSettings.vipSiteVisitFee}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, vipSiteVisitFee: parseInt(e.target.value) || 0 })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Default: ₹499 (Refundable on booking)</p>
                      </div>

                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">Standard Pass (3 Visits) (₹)</label>
                        <input
                          type="number"
                          min="0"
                          value={paymentSettings.standardPassFee}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, standardPassFee: parseInt(e.target.value) || 0 })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Default: ₹500 (No expiry)</p>
                      </div>

                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">Premium Pass (6 Mo VIP) (₹)</label>
                        <input
                          type="number"
                          min="0"
                          value={paymentSettings.premiumPassFee}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, premiumPassFee: parseInt(e.target.value) || 0 })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Default: ₹999 (Unlimited walkthroughs)</p>
                      </div>
                    </div>
                  </div>

                  {/* 5. Direct Bank Transfer Credentials */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#C9A96E]" /> Direct Bank Wire / NEFT / RTGS Details
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">Bank Name</label>
                        <input
                          type="text"
                          value={paymentSettings.bankName}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, bankName: e.target.value })}
                          placeholder="e.g. HDFC Bank Ltd"
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                      </div>

                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">Account Holder / Beneficiary</label>
                        <input
                          type="text"
                          value={paymentSettings.accountHolder}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, accountHolder: e.target.value })}
                          placeholder="e.g. Shreeniwas Properties Pvt Ltd"
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                      </div>

                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">Account Number</label>
                        <input
                          type="text"
                          value={paymentSettings.accountNumber}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, accountNumber: e.target.value })}
                          placeholder="e.g. 50200089123456"
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                      </div>

                      <div>
                        <label className="font-bold uppercase text-slate-700 block mb-1">IFSC Code</label>
                        <input
                          type="text"
                          value={paymentSettings.ifscCode}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, ifscCode: e.target.value.toUpperCase() })}
                          placeholder="e.g. HDFC0001234"
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 6. Custom Instructions */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2">
                      Customer Payment Instructions
                    </h4>
                    <textarea
                      rows={3}
                      value={paymentSettings.paymentInstructions}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, paymentInstructions: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#0A1628] text-[#C9A96E] font-extrabold text-sm rounded-2xl shadow-xl hover:bg-[#132238] transition cursor-pointer border border-[#C9A96E]/40 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5 text-[#C9A96E]" />
                    <span>Save Super Admin Payment Setup Live</span>
                  </button>
                </form>

                {/* Right Column: Live Interactive Customer Checkout Preview (5 Columns) */}
                <div className="lg:col-span-5 sticky top-24 space-y-4">
                  <div className="bg-[#0A1628] text-white p-4 rounded-3xl border-2 border-[#C9A96E]/40 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#C9A96E]">
                          Live Customer Checkout Preview
                        </span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40 font-mono">
                        Active
                      </span>
                    </div>

                    {/* Miniature Modal Card Mockup */}
                    <div className="bg-white text-[#0A1628] rounded-2xl p-4 space-y-4 shadow-lg">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                        <div>
                          <p className="text-[10px] text-slate-500 font-medium">VIP Site Visit Pass</p>
                          <p className="font-bold text-[#0A1628] text-xs">Vaishali Nagar Luxury Villa</p>
                        </div>
                        <span className="text-lg font-black text-emerald-700">₹{paymentSettings.vipSiteVisitFee || 499}</span>
                      </div>

                      {/* Live Generated QR */}
                      <div className="text-center space-y-2">
                        <div className="inline-block p-2.5 bg-white rounded-2xl border-2 border-[#C9A96E]/40 shadow-md">
                          <img
                            src={paymentSettings.customQrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=${encodeURIComponent(paymentSettings.upiId)}%26pn=${encodeURIComponent(paymentSettings.merchantName)}%26am=${paymentSettings.vipSiteVisitFee || 499}%26cu=INR`}
                            alt="Preview QR"
                            className="w-36 h-36 object-contain rounded-lg mx-auto"
                          />
                        </div>
                        <div className="text-[10px] text-slate-600 font-bold flex items-center justify-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Payee: {paymentSettings.merchantName || 'Shreeniwas Properties'}</span>
                        </div>
                      </div>

                      {/* Preview Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                        <div className="p-2 bg-slate-100 rounded-lg text-center border border-slate-200 text-slate-700 flex items-center justify-center gap-1">
                          <Download className="w-3 h-3" /> Download QR
                        </div>
                        <div className="p-2 bg-slate-100 rounded-lg text-center border border-slate-200 text-slate-700 flex items-center justify-center gap-1">
                          <Share2 className="w-3 h-3" /> Share QR
                        </div>
                      </div>

                      {/* Direct App Pay Preview */}
                      {paymentSettings.enableDirectUpiPay && (
                        <div className="space-y-1.5 pt-1">
                          <div className="p-2 bg-[#0A1628] text-[#C9A96E] rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5" /> Direct Pay via Any UPI App
                          </div>
                          <div className="grid grid-cols-4 gap-1 text-[9px] font-extrabold text-center">
                            <span className="p-1.5 bg-slate-100 rounded-lg text-[#4285F4] border border-slate-200">GPay</span>
                            <span className="p-1.5 bg-slate-100 rounded-lg text-[#5F259F] border border-slate-200">PhonePe</span>
                            <span className="p-1.5 bg-slate-100 rounded-lg text-[#00BAF2] border border-slate-200">Paytm</span>
                            <span className="p-1.5 bg-slate-100 rounded-lg text-[#00897B] border border-slate-200">BHIM</span>
                          </div>
                        </div>
                      )}

                      {/* UPI ID Strip */}
                      <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-[10px] flex justify-between items-center">
                        <span className="text-slate-500 font-mono truncate max-w-[170px]">{paymentSettings.upiId}</span>
                        <span className="text-[#C9A96E] font-bold">Verified UPI</span>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-white/5 rounded-2xl text-[11px] text-slate-300 space-y-1 border border-white/5">
                      <p className="font-bold text-white flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Instant Customer Sync
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Any updates saved here immediately apply to all visit pass checkouts, chatbots, and tariff bookings across the entire site.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REELS MANAGEMENT TAB */}
          {activeTab === 'reels' && adminRole === 'super' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Property Video Reels Management</h3>
                  <p className="text-xs text-slate-500">Super Admin Power: Publish 360° virtual tours, property video reels, and views.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingReel(null);
                    setReelForm({ title: '', property: '', instaUrl: '', embedUrl: '', views: '1.2K', status: 'Active' });
                    setShowReelModal(true);
                  }}
                  className="px-4 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow cursor-pointer hover:bg-[#0A1628]/90"
                >
                  <Plus className="w-4 h-4" /> Add Video Reel
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                      <th className="p-4 pl-6">Reel Title</th>
                      <th className="p-4">Property Reference</th>
                      <th className="p-4">Instagram Reel Link</th>
                      <th className="p-4">Views</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {reelsList.map((reel) => (
                      <tr key={reel.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 pl-6 font-bold text-[#0A1628] flex items-center gap-2">
                          <Video className="w-4 h-4 text-[#C9A96E]" /> {reel.title}
                        </td>
                        <td className="p-4 text-slate-600 font-medium">{reel.property}</td>
                        <td className="p-4">
                          {reel.instaUrl ? (
                            <a
                              href={reel.instaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg text-[10px] shadow hover:opacity-90 transition-all"
                            >
                              <Share2 className="w-3 h-3" /> Insta Reel ↗
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-medium italic">No Insta Link</span>
                          )}
                        </td>
                        <td className="p-4 font-mono text-emerald-700 font-bold">{reel.views}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {reel.status}
                          </span>
                        </td>
                        <td className="p-4 text-right pr-6 space-x-2">
                          <button
                            onClick={() => {
                              setEditingReel(reel);
                              setReelForm({ title: reel.title, property: reel.property, instaUrl: reel.instaUrl || '', embedUrl: reel.embedUrl || '', views: reel.views, status: reel.status });
                              setShowReelModal(true);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-700 hover:bg-[#0A1628] hover:text-[#C9A96E] rounded-lg transition cursor-pointer"
                            title="Edit Reel"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteReel(reel.id)}
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition cursor-pointer"
                            title="Delete Reel"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REVIEWS & TESTIMONIALS TAB */}
          {activeTab === 'reviews' && adminRole === 'super' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Buyer & Landlord Reviews Manager</h3>
                  <p className="text-xs text-slate-500">Super Admin Power: Manage buyer ratings, feature testimonials, and review approvals.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingReview(null);
                    setReviewForm({ name: '', role: '', rating: 5, quote: '', status: 'Featured', avatar: '' });
                    setShowReviewModal(true);
                  }}
                  className="px-4 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow cursor-pointer hover:bg-[#0A1628]/90"
                >
                  <Plus className="w-4 h-4" /> Add Review / Testimonial
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                      <th className="p-4 pl-6">Reviewer Name</th>
                      <th className="p-4">Role / Locality</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Testimonial Quote</th>
                      <th className="p-4 text-right pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {reviewsList.map((rev) => (
                      <tr key={rev.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 pl-6 font-bold text-[#0A1628]">{rev.name}</td>
                        <td className="p-4 text-slate-600 font-medium">{rev.role}</td>
                        <td className="p-4 text-amber-500 font-bold flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-current" /> {rev.rating} / 5
                        </td>
                        <td className="p-4 text-slate-600 max-w-[250px] truncate italic">"{rev.quote}"</td>
                        <td className="p-4 text-right pr-6 space-x-2">
                          <button
                            onClick={() => {
                              setEditingReview(rev);
                              setReviewForm({ name: rev.name, role: rev.role, rating: rev.rating, quote: rev.quote, status: rev.status, avatar: rev.avatar || '' });
                              setShowReviewModal(true);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-700 hover:bg-[#0A1628] hover:text-[#C9A96E] rounded-lg transition cursor-pointer"
                            title="Edit Review"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteReview(rev.id)}
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition cursor-pointer"
                            title="Delete Review"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}



          {/* ATTENDANCE TAB */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Admin Attendance System</h3>
                  <p className="text-xs text-slate-500">Track daily shift clock-in times, staff hours, and shift logs.</p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={handleExportAttendance}
                    disabled={attendanceList.length === 0}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer border border-slate-300"
                    title="Download staff shift logs in Excel spreadsheet"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Download Attendance (.xlsx)</span>
                  </button>

                  <button
                    onClick={toggleClockIn}
                    className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                      isClockedIn ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    {isClockedIn ? 'Clock Out Shift' : 'Clock In My Shift Now'}
                  </button>
                </div>
              </div>

              {attendanceList.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <Clock className="w-10 h-10 text-[#C9A96E] mx-auto mb-3" />
                  <h4 className="text-base font-bold text-[#0A1628]">No Shift Attendance Logs Recorded Today</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Clock in your shift using the button above to record staff attendance logs.</p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[650px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                          <th className="p-4 pl-6">Staff Admin</th>
                          <th className="p-4">Designated Role</th>
                          <th className="p-4">Clock In</th>
                          <th className="p-4">Clock Out</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right pr-6">Hours</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {attendanceList.map((att) => (
                          <tr key={att.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 pl-6 font-bold text-[#0A1628]">{att.staffName}</td>
                            <td className="p-4 text-slate-600">{att.role}</td>
                            <td className="p-4 font-mono text-slate-700">{att.clockIn}</td>
                            <td className="p-4 font-mono text-slate-700">{att.clockOut}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                att.status?.includes('On Time') ? 'bg-emerald-100 text-emerald-800' :
                                att.status?.includes('Late') ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {att.status}
                              </span>
                            </td>
                            <td className="p-4 text-right pr-6 font-mono font-bold text-slate-800">{att.hours}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* INQUIRIES, VIP BOOKINGS & UPI TRANSACTIONS TAB */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Query, Bookings & UPI Transactions Desk</h3>
                  <p className="text-xs text-slate-500">Respond directly to visitor inquiries, VIP visit bookings, confirm UPI passes with UTR numbers, and export full records.</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (inquiriesList.length === 0) {
                        alert('No query data available to download.');
                        return;
                      }
                      try {
                        exportInquiriesToExcel(inquiriesList, 'Shreeniwas_Client_Queries');
                      } catch (err: any) {
                        alert(err?.message || 'Error exporting to Excel');
                      }
                    }}
                    disabled={inquiriesList.length === 0}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      inquiriesList.length === 0
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 active:scale-95 cursor-pointer border border-emerald-500'
                    }`}
                    title="Download all query and lead data into a formatted Excel (.xlsx) spreadsheet"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Download Queries (.xlsx)</span>
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-800/40 text-emerald-100">
                      {inquiriesList.length}
                    </span>
                  </button>
                </div>
              </div>

              {/* Inquiry Category Filter Bar */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {[
                  { id: 'all', label: 'All Queries & Transactions', count: inquiriesList.length },
                  { id: 'visits', label: 'VIP Site Visits', count: inquiriesList.filter(i => i.type?.toLowerCase().includes('visit') || i.slotLabel || i.visitTimeSlot).length },
                  { id: 'payments', label: 'UPI Payments & Passes (UTR)', count: inquiriesList.filter(i => i.utrNumber || i.txnId || i.status?.toLowerCase().includes('paid') || i.type?.toLowerCase().includes('payment') || i.type?.toLowerCase().includes('pass')).length },
                  { id: 'alerts', label: 'Alert Subscribers', count: inquiriesList.filter(i => i.type?.toLowerCase().includes('alert') || i.property?.toLowerCase().includes('subscriber')).length },
                  { id: 'messages', label: 'General Inquiries', count: inquiriesList.filter(i => !i.utrNumber && !i.slotLabel && !i.type?.toLowerCase().includes('alert')).length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setInquiryFilter(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border flex items-center gap-1.5 ${
                      inquiryFilter === tab.id
                        ? 'bg-[#0A1628] text-[#C9A96E] border-[#C9A96E]/50 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      inquiryFilter === tab.id ? 'bg-[#C9A96E]/20 text-[#C9A96E]' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {inquiriesList.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <MessageSquare className="w-10 h-10 text-[#C9A96E] mx-auto mb-3" />
                  <h4 className="text-base font-bold text-[#0A1628]">No Visitor Queries Yet</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Real visitor inquiries and property visit requests submitted on the site will automatically appear here.</p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[760px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                          <th className="p-4 pl-6">Client Details</th>
                          <th className="p-4">Property / Lead Source</th>
                          <th className="p-4">Type</th>
                          <th className="p-4">Query / Transaction Details</th>
                          <th className="p-4">Status & Verification</th>
                          <th className="p-4 text-right pr-6">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {inquiriesList
                          .filter((inq) => {
                            if (inquiryFilter === 'visits') {
                              return inq.type?.toLowerCase().includes('visit') || inq.slotLabel || inq.visitTimeSlot;
                            }
                            if (inquiryFilter === 'payments') {
                              return inq.utrNumber || inq.txnId || inq.status?.toLowerCase().includes('paid') || inq.type?.toLowerCase().includes('payment') || inq.type?.toLowerCase().includes('pass');
                            }
                            if (inquiryFilter === 'alerts') {
                              return inq.type?.toLowerCase().includes('alert') || inq.property?.toLowerCase().includes('subscriber');
                            }
                            if (inquiryFilter === 'messages') {
                              return !inq.utrNumber && !inq.slotLabel && !inq.type?.toLowerCase().includes('alert');
                            }
                            return true;
                          })
                          .map((inq) => (
                          <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 pl-6">
                              <p className="font-bold text-[#0A1628]">{inq.user}</p>
                              <p className="text-[10px] text-slate-400">{inq.phone} | {inq.email}</p>
                              {inq.timestamp && (
                                <p className="text-[9px] text-slate-400 font-mono mt-0.5">{inq.timestamp}</p>
                              )}
                            </td>
                            <td className="p-4 font-medium text-slate-700">
                              <span className="font-semibold text-[#0A1628]">{inq.property}</span>
                              {inq.amount && (
                                <span className="block text-[11px] font-bold text-emerald-700">
                                  ₹{inq.amount}
                                </span>
                              )}
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                inq.utrNumber ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                                inq.type?.toLowerCase().includes('visit') ? 'bg-blue-100 text-blue-800' :
                                inq.type?.toLowerCase().includes('alert') ? 'bg-amber-100 text-amber-800' :
                                'bg-[#C9A96E]/20 text-[#0A1628]'
                              }`}>
                                {inq.type}
                              </span>
                            </td>
                            <td className="p-4 text-slate-600 max-w-[260px]">
                              <p className="font-medium text-slate-800 line-clamp-2">{inq.query || "No notes"}</p>
                              {(inq.visitTimeSlot || inq.slotLabel) && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#A27B36] bg-[#C9A96E]/15 px-2 py-0.5 rounded-full mt-1 border border-[#C9A96E]/30">
                                  <Clock className="w-2.5 h-2.5" /> Slot: {inq.slotLabel || inq.visitTimeSlot}
                                </span>
                              )}
                              {inq.utrNumber && (
                                <div className="mt-1 flex items-center gap-1.5 p-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                                  <span className="text-[9px] font-bold text-emerald-900 uppercase">UTR:</span>
                                  <span className="font-mono text-[10px] font-bold text-emerald-700">{inq.utrNumber}</span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(inq.utrNumber);
                                      alert(`Copied UTR: ${inq.utrNumber}`);
                                    }}
                                    className="p-1 hover:bg-emerald-200 rounded text-emerald-800 transition cursor-pointer ml-auto"
                                    title="Copy UTR"
                                  >
                                    <Copy className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="space-y-1">
                                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  inq.status?.includes('Verified') || inq.status?.includes('Paid') || inq.status?.includes('Responded')
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {inq.status}
                                </span>

                                {inq.utrNumber && !inq.status?.includes('Verified') && (
                                  <div>
                                    <button
                                      onClick={() => handleVerifyInquiryPayment(inq.id)}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow-sm transition cursor-pointer"
                                    >
                                      <CheckCircle2 className="w-2.5 h-2.5" /> Confirm Payment
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-4 text-right pr-6">
                              <button
                                onClick={() => setSelectedInquiry(inq)}
                                className="px-3.5 py-1.5 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl text-[11px] shadow hover:bg-[#0A1628]/90 transition-all cursor-pointer"
                              >
                                Reply & Update
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* USERS & ADMIN MANAGEMENT TAB */}
          {activeTab === 'users' && adminRole === 'super' && (
            <div className="space-y-8">
              {/* Staff Admins Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#0A1628]">Admin Staff & Super Admin Accounts</h3>
                    <p className="text-xs text-slate-500">Super Admin Power: Create and manage admin accounts for team members.</p>
                  </div>

                  <button
                    onClick={() => setShowMakeAdminModal(true)}
                    className="px-4 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow cursor-pointer hover:bg-[#0A1628]/90"
                  >
                    <UserPlus className="w-4 h-4" /> Make New Staff Admin
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse min-w-[650px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                        <th className="p-4 pl-6">Admin Name</th>
                        <th className="p-4">Email ID</th>
                        <th className="p-4">Designated Role</th>
                        <th className="p-4">Level</th>
                        <th className="p-4 text-right pr-6">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {adminAccountsList.map((adm) => (
                        <tr key={adm.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 pl-6 font-bold text-[#0A1628] flex items-center gap-2">
                            <Crown className="w-4 h-4 text-[#C9A96E]" /> {adm.name}
                          </td>
                          <td className="p-4 text-slate-600 font-mono">{adm.email}</td>
                          <td className="p-4 text-slate-700 font-medium">{adm.role}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              adm.level === 'super' ? 'bg-[#C9A96E]/20 text-[#0A1628]' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {adm.level === 'super' ? 'SUPER ADMIN' : 'STAFF ADMIN'}
                            </span>
                          </td>
                          <td className="p-4 text-right pr-6">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {adm.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Registered Users Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-serif font-bold text-[#0A1628]">Registered Platform Users</h4>

                {usersList.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                    <Users className="w-8 h-8 text-[#C9A96E] mx-auto mb-2" />
                    <p className="text-sm font-bold text-[#0A1628]">No Registered Users Yet</p>
                    <p className="text-xs text-slate-500">When new users register on the website, their details appear here.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse min-w-[650px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                          <th className="p-4 pl-6">Name</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Account Type</th>
                          <th className="p-4 text-right pr-6">Promote Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {usersList.map((u: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 pl-6 font-bold text-[#0A1628]">{u.name || u.email?.split('@')[0]}</td>
                            <td className="p-4 text-slate-600">{u.email}</td>
                            <td className="p-4 font-medium text-slate-700">{u.role || "User"}</td>
                            <td className="p-4 text-right pr-6">
                              <button
                                onClick={() => handlePromoteUserToAdmin(u)}
                                className="px-3 py-1 bg-[#0A1628] text-[#C9A96E] font-bold text-[11px] rounded-lg shadow hover:bg-[#0A1628]/90 transition cursor-pointer"
                              >
                                Make Admin
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BLOG TAB */}
          {activeTab === 'blogs' && adminRole === 'super' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Blog & Real Estate News Manager</h3>
                  <p className="text-xs text-slate-500">Super Admin Power: Publish, edit, or delete articles on the site blog.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingBlog(null);
                    setBlogForm({ title: '', category: 'Market Trends', author: 'Admin Team', readTime: '5 min read', image: '' });
                    setShowBlogModal(true);
                  }}
                  className="px-4 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow cursor-pointer hover:bg-[#0A1628]/90"
                >
                  <Plus className="w-4 h-4" /> Create Blog Article
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                      <th className="p-4 pl-6">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Read Time</th>
                      <th className="p-4 text-right pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {blogsList.map((blog) => (
                      <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 pl-6 font-bold text-[#0A1628] max-w-[250px] truncate">{blog.title}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C9A96E]/20 text-[#0A1628]">
                            {blog.category}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">{blog.author}</td>
                        <td className="p-4 text-slate-500 font-mono">{blog.readTime}</td>
                        <td className="p-4 text-right pr-6 space-x-2">
                          <button
                            onClick={() => {
                              setEditingBlog(blog);
                              setBlogForm({ title: blog.title, category: blog.category, author: blog.author, readTime: blog.readTime, image: blog.image || '' });
                              setShowBlogModal(true);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-700 hover:bg-[#0A1628] hover:text-[#C9A96E] rounded-lg transition cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EXPANDED PLATFORM & SOCIAL MEDIA SETTINGS TAB */}
          {activeTab === 'settings' && adminRole === 'super' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#0A1628]">Platform, Logo & Social Media Settings</h3>
                <p className="text-xs text-slate-500">Super Admin Power: Change brand logo, site name, office contacts, and social media handles.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl">
                {/* 0. Live Public Maintenance Mode Control */}
                <div className={`p-6 rounded-3xl border transition-all ${
                  siteSettings.maintenanceMode
                    ? 'bg-rose-50/80 border-rose-300 shadow-sm'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        siteSettings.maintenanceMode ? 'bg-rose-600 text-white' : 'bg-[#0A1628] text-[#C9A96E]'
                      }`}>
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#0A1628]">Public Maintenance Mode Guard</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            siteSettings.maintenanceMode ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {siteSettings.maintenanceMode ? 'UNDER MAINTENANCE' : 'PORTAL IS LIVE'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          When active, all public visitors will see the official Royal Maintenance screen with emergency phone & WhatsApp buttons. Admins can continue operating normally.
                        </p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={siteSettings.maintenanceMode}
                        onChange={(e) => setSiteSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                    </label>
                  </div>
                </div>

                {/* 1. Branding & Logo Settings */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#C9A96E]" /> Brand Logo & Identity
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-bold uppercase text-slate-700">Custom Logo Image</label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openMediaPicker((url) => setSiteSettings(prev => ({ ...prev, logoUrl: url })))}
                            className="text-[#A27B36] hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                          >
                            <ImageIcon className="w-3 h-3 text-[#C9A96E]" /> From Gallery
                          </button>
                          <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                            <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (dataUrl) => setSiteSettings(prev => ({ ...prev, logoUrl: dataUrl })))}
                            />
                          </label>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={siteSettings.logoUrl}
                        onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })}
                        placeholder="https://example.com/logo.png or uploaded image"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Pick from Gallery, upload device file, or paste custom URL.</p>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Platform Brand Title</label>
                      <input
                        type="text"
                        value={siteSettings.siteTitle}
                        onChange={(e) => setSiteSettings({ ...siteSettings, siteTitle: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>
                  </div>

                  {/* Hero Background Image */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-bold uppercase text-slate-700 text-xs">Landing Page Hero Background Image</label>
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => openMediaPicker((url) => setSiteSettings(prev => ({ ...prev, heroBgUrl: url })))}
                          className="text-[#A27B36] hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                        >
                          <ImageIcon className="w-3 h-3 text-[#C9A96E]" /> From Gallery
                        </button>
                        <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                          <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (dataUrl) => setSiteSettings(prev => ({ ...prev, heroBgUrl: dataUrl })))}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 flex-shrink-0 shadow-inner">
                        {siteSettings.heroBgUrl ? (
                          <img 
                            src={siteSettings.heroBgUrl} 
                            alt="Hero preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-bold">No Img</div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={siteSettings.heroBgUrl || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, heroBgUrl: e.target.value })}
                        placeholder="https://... or /hero/... image path"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>
                    {/* Quick Jodhpur Presets */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Jodhpur Presets:</span>
                      <button
                        type="button"
                        onClick={() => setSiteSettings(prev => ({ ...prev, heroBgUrl: '/hero/jodhpur-hero-royal.jpg' }))}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all ${
                          siteSettings.heroBgUrl === '/hero/jodhpur-hero-royal.jpg'
                            ? 'bg-[#0A1628] text-[#C9A96E] border-[#C9A96E]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        🏰 Royal Heritage Palace (Active)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSiteSettings(prev => ({ ...prev, heroBgUrl: '/hero/jodhpur-hero-villa.jpg' }))}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all ${
                          siteSettings.heroBgUrl === '/hero/jodhpur-hero-villa.jpg'
                            ? 'bg-[#0A1628] text-[#C9A96E] border-[#C9A96E]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        🏊 Modern Luxury Villa
                      </button>
                      <button
                        type="button"
                        onClick={() => setSiteSettings(prev => ({ ...prev, heroBgUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070' }))}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all ${
                          siteSettings.heroBgUrl?.includes('photo-1542314831-068cd1dbfeeb')
                            ? 'bg-[#0A1628] text-[#C9A96E] border-[#C9A96E]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        🌄 Mehrangarh Vista (Unsplash)
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Rajasthan heritage fort/palace background image displayed on main landing page hero.</p>
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1 text-xs">Brand Tagline</label>
                    <input
                      type="text"
                      value={siteSettings.tagline}
                      onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>
                </div>

                {/* 2. Office Contact Info */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C9A96E]" /> Official Contact & Head Office Details
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Support Contact Phone</label>
                      <input
                        type="text"
                        value={siteSettings.supportPhone}
                        onChange={(e) => setSiteSettings({ ...siteSettings, supportPhone: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Official Contact Email</label>
                      <input
                        type="email"
                        value={siteSettings.contactEmail}
                        onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="font-bold uppercase text-slate-700 block mb-1">Head Office Address</label>
                    <input
                      type="text"
                      value={siteSettings.headOffice}
                      onChange={(e) => setSiteSettings({ ...siteSettings, headOffice: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>
                </div>

                {/* 3. Social Media Handling */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#C9A96E]" /> Social Media & WhatsApp Links
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">WhatsApp Direct Link</label>
                      <input
                        type="url"
                        value={siteSettings.whatsappLink}
                        onChange={(e) => setSiteSettings({ ...siteSettings, whatsappLink: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Instagram Profile</label>
                      <input
                        type="url"
                        value={siteSettings.instagramLink}
                        onChange={(e) => setSiteSettings({ ...siteSettings, instagramLink: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Facebook Page</label>
                      <input
                        type="url"
                        value={siteSettings.facebookLink}
                        onChange={(e) => setSiteSettings({ ...siteSettings, facebookLink: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">YouTube Channel</label>
                      <input
                        type="url"
                        value={siteSettings.youtubeLink}
                        onChange={(e) => setSiteSettings({ ...siteSettings, youtubeLink: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>
                  </div>
                </div>

                {settingsSaveSuccess && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Global site settings saved and propagated immediately across all headers, footers, and contact pages!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#0A1628] text-[#C9A96E] font-extrabold text-xs rounded-2xl shadow-xl hover:bg-[#0A1628]/90 transition cursor-pointer border border-[#C9A96E]/30 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                  Save All Platform & Social Settings Live
                </button>
              </form>
            </div>
          )}

          {/* Site Settings Global Confirmation Modal */}
          <AnimatePresence>
            {showSettingsConfirmModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-[#0A1628] space-y-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#0A1628]">Confirm Global Site Update</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      You are about to update global site information ({siteSettings.siteTitle}). These changes will instantly propagate across all visitor sessions, headers, footers, and chatbots.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <div><strong>Title:</strong> {siteSettings.siteTitle}</div>
                    <div><strong>Phone:</strong> {siteSettings.supportPhone}</div>
                    <div><strong>Email:</strong> {siteSettings.contactEmail}</div>
                    <div><strong>Head Office:</strong> {siteSettings.headOffice}</div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowSettingsConfirmModal(false)}
                      className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs cursor-pointer hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={executeSaveSettings}
                      className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl text-xs shadow cursor-pointer hover:bg-[#14233c]"
                    >
                      Yes, Publish Live
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Reply Query Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl text-[#0A1628] space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-lg">Reply to Query ({selectedInquiry.user})</h4>
                <button onClick={() => setSelectedInquiry(null)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><XCircle className="w-5 h-5" /></button>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <p><strong>Property:</strong> {selectedInquiry.property}</p>
                <p><strong>Customer Query:</strong> {selectedInquiry.query || "Callback requested"}</p>
              </div>

              <form onSubmit={handleSendReply} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Response Message</label>
                  <textarea
                    required
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type response message..."
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setSelectedInquiry(null)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl shadow cursor-pointer">Send Response</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Property Modal - Full Comprehensive Super Admin Upload Suite */}
      <AnimatePresence>
        {showPropertyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 sm:p-7 max-w-3xl w-full shadow-2xl text-[#0A1628] space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar border border-slate-100">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Crown className="w-3 h-3 text-[#C9A96E]" /> Super Admin Complete Listing Suite
                  </div>
                  <h4 className="font-serif font-bold text-xl text-[#0A1628]">
                    {editingProperty ? "Edit Property Listing" : "Upload New Property Listing"}
                  </h4>
                </div>
                <button onClick={() => setShowPropertyModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer rounded-xl hover:bg-slate-100 transition">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveProperty} className="space-y-4 text-xs">
                {/* 1. Basic Details & Categorization */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h5 className="font-bold text-[11px] uppercase tracking-wider text-[#0A1628] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Core Identity & Location
                  </h5>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="font-bold uppercase text-slate-700 block mb-1">Property Title *</label>
                      <input
                        type="text"
                        required
                        value={propForm.title}
                        onChange={(e) => setPropForm({ ...propForm, title: e.target.value })}
                        placeholder="e.g. Royal Heritage Villa with Private Pool"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">City in Rajasthan *</label>
                      <select
                        value={propForm.city}
                        onChange={(e) => setPropForm({ ...propForm, city: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      >
                        <option value="Jaipur">Jaipur</option>
                        <option value="Jodhpur">Jodhpur</option>
                        <option value="Udaipur">Udaipur</option>
                        <option value="Kota">Kota</option>
                        <option value="Ajmer">Ajmer</option>
                        <option value="Bikaner">Bikaner</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Locality / Address *</label>
                      <input
                        type="text"
                        required
                        value={propForm.location}
                        onChange={(e) => setPropForm({ ...propForm, location: e.target.value })}
                        placeholder="e.g. C-Scheme, Near Central Park"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Listing Purpose *</label>
                      <select
                        value={propForm.purpose}
                        onChange={(e) => setPropForm({ ...propForm, purpose: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      >
                        <option value="Buy">For Sale / Buy</option>
                        <option value="Rent">For Rent</option>
                        <option value="Commercial">Commercial Lease / Sale</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Property Type *</label>
                      <select
                        value={propForm.type}
                        onChange={(e) => setPropForm({ ...propForm, type: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      >
                        <option value="Luxury Villa">Luxury Villa</option>
                        <option value="Apartment">Apartment / Flat</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Heritage Haveli">Heritage Haveli</option>
                        <option value="Commercial Office">Commercial Office</option>
                        <option value="Retail Showroom">Retail Showroom</option>
                        <option value="Plot / Land">Plot / Land</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. Pricing & Financials */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h5 className="font-bold text-[11px] uppercase tracking-wider text-[#0A1628] flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-[#C9A96E]" /> Pricing & Financial Badges
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Display Price *</label>
                      <input
                        type="text"
                        required
                        value={propForm.price}
                        onChange={(e) => setPropForm({ ...propForm, price: e.target.value })}
                        placeholder="e.g. ₹2.85 Cr or ₹45,000/mo"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Price Per Sq.Ft</label>
                      <input
                        type="text"
                        value={propForm.pricePerSqft}
                        onChange={(e) => setPropForm({ ...propForm, pricePerSqft: e.target.value })}
                        placeholder="e.g. ₹9,500/sq.ft"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Construction Status</label>
                      <select
                        value={propForm.status}
                        onChange={(e) => setPropForm({ ...propForm, status: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      >
                        <option value="Ready to Move">Ready to Move</option>
                        <option value="Under Construction">Under Construction</option>
                        <option value="New Launch">New Launch</option>
                        <option value="Resale Verified">Resale Verified</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={propForm.zeroBrokerage}
                        onChange={(e) => setPropForm({ ...propForm, zeroBrokerage: e.target.checked })}
                        className="w-4 h-4 accent-[#0A1628] rounded cursor-pointer"
                      />
                      <span className="font-bold text-slate-700">🏷️ 0% Brokerage Badge (Direct Deal)</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={propForm.reraApproved}
                        onChange={(e) => setPropForm({ ...propForm, reraApproved: e.target.checked })}
                        className="w-4 h-4 accent-[#0A1628] rounded cursor-pointer"
                      />
                      <span className="font-bold text-slate-700">🛡️ RERA Approved & Verified</span>
                    </label>
                  </div>

                  {propForm.reraApproved && (
                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">RERA Registration Number</label>
                      <input
                        type="text"
                        value={propForm.reraNumber}
                        onChange={(e) => setPropForm({ ...propForm, reraNumber: e.target.value })}
                        placeholder="e.g. RAJ/P/2023/1842"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>
                  )}
                </div>

                {/* 3. Specifications & Area Details */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h5 className="font-bold text-[11px] uppercase tracking-wider text-[#0A1628] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Architectural Specifications
                  </h5>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">BHK Configuration</label>
                      <select
                        value={propForm.bhk}
                        onChange={(e) => setPropForm({ ...propForm, bhk: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      >
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                        <option value="5+ BHK">5+ BHK / Haveli</option>
                        <option value="Studio">Studio</option>
                        <option value="Commercial Space">Commercial Space</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Super Area (Sq.Ft)</label>
                      <input
                        type="text"
                        value={propForm.sqft}
                        onChange={(e) => setPropForm({ ...propForm, sqft: e.target.value })}
                        placeholder="e.g. 2,450"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Carpet Area</label>
                      <input
                        type="text"
                        value={propForm.carpetArea}
                        onChange={(e) => setPropForm({ ...propForm, carpetArea: e.target.value })}
                        placeholder="e.g. 1,980 sq.ft"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Furnishing</label>
                      <select
                        value={propForm.furnishing}
                        onChange={(e) => setPropForm({ ...propForm, furnishing: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      >
                        <option value="Fully Furnished">Fully Furnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Unfurnished">Unfurnished</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Bedrooms</label>
                      <input
                        type="number"
                        min="0"
                        value={propForm.bedrooms}
                        onChange={(e) => setPropForm({ ...propForm, bedrooms: parseInt(e.target.value) || 0 })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Bathrooms</label>
                      <input
                        type="number"
                        min="0"
                        value={propForm.bathrooms}
                        onChange={(e) => setPropForm({ ...propForm, bathrooms: parseInt(e.target.value) || 0 })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Floor Level</label>
                      <input
                        type="text"
                        value={propForm.floor}
                        onChange={(e) => setPropForm({ ...propForm, floor: e.target.value })}
                        placeholder="e.g. 4th of 12"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Facing / Vastu</label>
                      <input
                        type="text"
                        value={propForm.facing}
                        onChange={(e) => setPropForm({ ...propForm, facing: e.target.value })}
                        placeholder="e.g. East (Vastu)"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Google Maps GPS Redirection Link */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <label className="font-bold uppercase text-slate-700 block flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Google Maps Direct GPS Pin URL
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      📍 Verified Redirection Link
                    </span>
                  </label>
                  <input
                    type="url"
                    value={propForm.googleMapsUrl || ''}
                    onChange={(e) => setPropForm({ ...propForm, googleMapsUrl: e.target.value })}
                    placeholder="https://maps.app.goo.gl/... or https://www.google.com/maps/search/?api=1&query=..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                  <p className="text-[10px] text-slate-400">
                    Direct redirection link for site visitors to open Google Maps directly on mobile or desktop navigation.
                  </p>
                </div>

                {/* 5. Description & Overview */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <label className="font-bold uppercase text-slate-700 block">Property Description & Highlights</label>
                  <textarea
                    rows={3}
                    value={propForm.description}
                    onChange={(e) => setPropForm({ ...propForm, description: e.target.value })}
                    placeholder="Detailed property description, neighbourhood landmarks, connectivity, and special architectural features..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                {/* 6. Amenities Selection */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <label className="font-bold uppercase text-slate-700 block">Key Property Amenities (Click to toggle)</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '24x7 Security',
                      'Power Backup',
                      'Car Parking',
                      'Swimming Pool',
                      'Gymnasium',
                      'Clubhouse',
                      'Private Garden',
                      'Lift Access',
                      'Vastu Compliant',
                      'CCTV Surveillance',
                      'Gated Community',
                      'Kids Play Area',
                      'Wi-Fi Connectivity',
                      'Modular Kitchen'
                    ].map((amenity) => {
                      const isSelected = propForm.amenities.includes(amenity);
                      return (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setPropForm({ ...propForm, amenities: propForm.amenities.filter(a => a !== amenity) });
                            } else {
                              setPropForm({ ...propForm, amenities: [...propForm.amenities, amenity] });
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0A1628] text-[#C9A96E] shadow-sm ring-1 ring-[#C9A96E]'
                              : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '} {amenity}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 7. Multi-Image Property Upload Suite */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <h5 className="font-bold text-[11px] uppercase tracking-wider text-[#0A1628] flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-[#C9A96E]" /> Property Photo Gallery & Cover
                      </h5>
                      <p className="text-[10px] text-slate-500">Pick from central Media Gallery, upload from device, or paste URLs.</p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => openMediaPicker((url) => {
                          setPropForm(prev => ({
                            ...prev,
                            image: prev.image || url,
                            images: [...prev.images, url]
                          }));
                        })}
                        className="px-3.5 py-1.5 bg-[#C9A96E]/20 text-[#A27B36] border border-[#C9A96E]/40 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 hover:bg-[#C9A96E]/30 transition"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-[#A27B36]" /> Choose from Gallery
                      </button>

                      <label className="px-3.5 py-1.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 shadow hover:bg-[#15233c] transition">
                        <Camera className="w-3.5 h-3.5" /> Upload Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => {
                            setPropForm(prev => ({
                              ...prev,
                              image: prev.image || dataUrl,
                              images: [...prev.images, dataUrl]
                            }));
                          })}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Primary Cover Image URL */}
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Primary Cover Photo URL</label>
                    <input
                      type="text"
                      value={propForm.image}
                      onChange={(e) => setPropForm({ ...propForm, image: e.target.value })}
                      placeholder="https://images.unsplash.com/... or choose from gallery above"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  {/* Multi-Image List & Previews */}
                  {propForm.images.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <p className="text-[10px] font-bold text-slate-600 uppercase">Gallery Photo Previews ({propForm.images.length})</p>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {propForm.images.map((imgUrl, idx) => (
                          <div key={idx} className="relative group aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-200">
                            <img src={imgUrl} alt={`Property upload ${idx + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={() => setPropForm({ ...propForm, image: imgUrl })}
                                title="Set as Cover"
                                className="p-1 bg-[#C9A96E] text-[#0A1628] rounded-md text-[9px] font-bold cursor-pointer"
                              >
                                Cover
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedImgs = propForm.images.filter((_, i) => i !== idx);
                                  setPropForm({
                                    ...propForm,
                                    images: updatedImgs,
                                    image: propForm.image === imgUrl ? (updatedImgs[0] || '') : propForm.image
                                  });
                                }}
                                title="Remove Image"
                                className="p-1 bg-rose-600 text-white rounded-md text-[9px] font-bold cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button 
                    type="button" 
                    onClick={() => setShowPropertyModal(false)} 
                    className="px-5 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl shadow-lg hover:bg-[#15233c] transition cursor-pointer flex items-center gap-2 border border-[#C9A96E]/30"
                  >
                    <Crown className="w-4 h-4 text-[#C9A96E]" />
                    {editingProperty ? "Save Changes Live (0ms Sync)" : "Publish Property Listing Live (0ms Sync)"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Builder Project Modal */}
      <AnimatePresence>
        {showProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl text-[#0A1628] space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-lg">
                  {editingProject ? 'Edit Builder Project' : 'Add New Builder Project'}
                </h4>
                <button onClick={() => setShowProjectModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Project Name</label>
                    <input
                      type="text"
                      required
                      value={projectForm.name}
                      onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                      placeholder="e.g. Mahima Florence"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Builder / Developer</label>
                    <input
                      type="text"
                      required
                      value={projectForm.builder}
                      onChange={(e) => setProjectForm({ ...projectForm, builder: e.target.value })}
                      placeholder="e.g. Mahima Group"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">RERA Number</label>
                    <input
                      type="text"
                      required
                      value={projectForm.reraNumber}
                      onChange={(e) => setProjectForm({ ...projectForm, reraNumber: e.target.value })}
                      placeholder="e.g. RAJ/P/2023/1842"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">City</label>
                    <select
                      value={projectForm.city}
                      onChange={(e) => setProjectForm({ ...projectForm, city: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      {['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Ajmer', 'Bikaner', 'Bhilwara', 'Alwar'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Locality & Full Address</label>
                  <input
                    type="text"
                    required
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="e.g. Patrakar Colony, Mansarovar, Jaipur"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Price Range</label>
                    <input
                      type="text"
                      required
                      value={projectForm.priceRange}
                      onChange={(e) => setProjectForm({ ...projectForm, priceRange: e.target.value })}
                      placeholder="e.g. ₹65 Lakh - ₹1.85 Cr"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Construction Status</label>
                    <select
                      value={projectForm.status}
                      onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value="New Launch">New Launch</option>
                      <option value="Under Construction">Under Construction</option>
                      <option value="Ready to Move">Ready to Move</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Configurations (comma-separated)</label>
                    <input
                      type="text"
                      value={projectForm.configurations}
                      onChange={(e) => setProjectForm({ ...projectForm, configurations: e.target.value })}
                      placeholder="2 BHK, 3 BHK, 4 BHK"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Possession Date</label>
                    <input
                      type="text"
                      value={projectForm.possessionDate}
                      onChange={(e) => setProjectForm({ ...projectForm, possessionDate: e.target.value })}
                      placeholder="e.g. March 2026 or Ready"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold uppercase text-slate-700">Project Cover Image</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openMediaPicker((url) => setProjectForm(prev => ({ ...prev, coverImage: url })))}
                        className="text-[#A27B36] hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="w-3 h-3 text-[#C9A96E]" /> From Gallery
                      </button>
                      <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                        <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setProjectForm(prev => ({ ...prev, coverImage: dataUrl })))}
                        />
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={projectForm.coverImage}
                    onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/... or uploaded photo"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Google Maps Direct Redirection Link</label>
                  <input
                    type="url"
                    value={projectForm.googleMapsUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, googleMapsUrl: e.target.value })}
                    placeholder="https://maps.app.goo.gl/... or https://google.com/maps/..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Amenities & Highlights (comma-separated)</label>
                  <input
                    type="text"
                    value={projectForm.highlights}
                    onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })}
                    placeholder="e.g. Sky Lounge, Infinity Pool, 24x7 Security"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowProjectModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl shadow cursor-pointer">Save Project</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Reel Modal */}
      <AnimatePresence>
        {showReelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-[#0A1628] space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-lg">{editingReel ? "Edit Property Video Reel" : "Add Property Video Reel"}</h4>
                <button onClick={() => setShowReelModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><XCircle className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSaveReel} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Reel Title</label>
                  <input
                    type="text"
                    required
                    value={reelForm.title}
                    onChange={(e) => setReelForm({ ...reelForm, title: e.target.value })}
                    placeholder="e.g. 4 BHK Villa 360° Walkthrough"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Property Reference Name</label>
                  <input
                    type="text"
                    required
                    value={reelForm.property}
                    onChange={(e) => setReelForm({ ...reelForm, property: e.target.value })}
                    placeholder="e.g. The Royal Heritage Residency"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Instagram Reel Link (URL)</label>
                  <input
                    type="url"
                    value={reelForm.instaUrl}
                    onChange={(e) => setReelForm({ ...reelForm, instaUrl: e.target.value })}
                    placeholder="https://www.instagram.com/reel/..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold uppercase text-slate-700">Video Reel / Thumbnail Asset</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openMediaPicker((url) => setReelForm(prev => ({ ...prev, embedUrl: url })))}
                        className="text-[#A27B36] hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="w-3 h-3 text-[#C9A96E]" /> From Gallery
                      </button>
                      <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                        <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                        <input
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setReelForm(prev => ({ ...prev, embedUrl: dataUrl })))}
                        />
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    value={reelForm.embedUrl}
                    onChange={(e) => setReelForm({ ...reelForm, embedUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/... or upload photo/video from device"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Views Count</label>
                    <input
                      type="text"
                      value={reelForm.views}
                      onChange={(e) => setReelForm({ ...reelForm, views: e.target.value })}
                      placeholder="e.g. 14.2K"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Status</label>
                    <select
                      value={reelForm.status}
                      onChange={(e) => setReelForm({ ...reelForm, status: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value="Active">Active</option>
                      <option value="Hidden">Hidden</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowReelModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl shadow cursor-pointer">Save Reel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-[#0A1628] space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-lg">{editingReview ? "Edit Customer Review" : "Add Customer Review"}</h4>
                <button onClick={() => setShowReviewModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><XCircle className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSaveReview} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Reviewer Full Name</label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    placeholder="e.g. Dr. Alok & Sunita Mehta"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Role / Locality</label>
                    <input
                      type="text"
                      required
                      value={reviewForm.role}
                      onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                      placeholder="e.g. Villa Buyers in Jaipur"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Rating (Out of 5)</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                      <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                      <option value={3}>3 Stars ⭐⭐⭐</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Testimonial Quote</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewForm.quote}
                    onChange={(e) => setReviewForm({ ...reviewForm, quote: e.target.value })}
                    placeholder="Enter buyer or landlord quote text..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold uppercase text-slate-700">Reviewer Avatar Image</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openMediaPicker((url) => setReviewForm(prev => ({ ...prev, avatar: url })))}
                        className="text-[#A27B36] hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="w-3 h-3 text-[#C9A96E]" /> From Gallery
                      </button>
                      <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                        <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setReviewForm(prev => ({ ...prev, avatar: dataUrl })))}
                        />
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={reviewForm.avatar}
                    onChange={(e) => setReviewForm({ ...reviewForm, avatar: e.target.value })}
                    placeholder="https://images.unsplash.com/... or upload photo from device"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowReviewModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl shadow cursor-pointer">Save Review</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Blog Modal */}
      <AnimatePresence>
        {showBlogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-[#0A1628] space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-lg">{editingBlog ? "Edit Blog Article" : "Create New Blog Article"}</h4>
                <button onClick={() => setShowBlogModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><XCircle className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSaveBlog} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="e.g. Why Jaipur is the Next Real Estate Hub"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold uppercase text-slate-700">Article Cover Image</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openMediaPicker((url) => setBlogForm(prev => ({ ...prev, image: url })))}
                        className="text-[#A27B36] hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="w-3 h-3 text-[#C9A96E]" /> From Gallery
                      </button>
                      <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                        <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setBlogForm(prev => ({ ...prev, image: dataUrl })))}
                        />
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/... or upload photo from device"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Category</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value="Market Trends">Market Trends</option>
                      <option value="Buying Guide">Buying Guide</option>
                      <option value="Tenant Advisory">Tenant Advisory</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Author</label>
                    <input
                      type="text"
                      required
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      placeholder="e.g. Aditi Sharma"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowBlogModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl shadow cursor-pointer">Publish Article</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Make Admin Modal */}
      <AnimatePresence>
        {showMakeAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-[#0A1628] space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-lg">Make New Admin Account</h4>
                <button onClick={() => setShowMakeAdminModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><XCircle className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleCreateAdmin} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Staff Admin Name</label>
                  <input
                    type="text"
                    required
                    value={adminForm.name}
                    onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                    placeholder="e.g. Rajesh Saini"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Admin Email Address</label>
                  <input
                    type="email"
                    required
                    value={adminForm.email}
                    onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                    placeholder="e.g. rajesh@domain.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Designated Role</label>
                    <input
                      type="text"
                      required
                      value={adminForm.role}
                      onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value })}
                      placeholder="e.g. Query Admin"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Admin Level</label>
                    <select
                      value={adminForm.level}
                      onChange={(e) => setAdminForm({ ...adminForm, level: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value="staff">Staff Admin</option>
                      <option value="super">Super Admin</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowMakeAdminModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl shadow cursor-pointer">Create Admin</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Trend Modal (Add / Edit Locality Trend) */}
      <AnimatePresence>
        {showTrendModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl text-[#0A1628] space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#C9A96E]" />
                  <h4 className="font-serif font-bold text-lg">{editingTrend ? `Edit Locality Trend (${trendForm.city})` : `Add Locality Trend (${trendForm.city})`}</h4>
                </div>
                <button onClick={() => setShowTrendModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><XCircle className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSaveTrend} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Locality Name</label>
                    <input
                      type="text"
                      required
                      value={trendForm.name}
                      onChange={(e) => setTrendForm({ ...trendForm, name: e.target.value })}
                      placeholder="e.g. Shastri Nagar"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">City</label>
                    <select
                      value={trendForm.city}
                      onChange={(e) => setTrendForm({ ...trendForm, city: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      {['Jodhpur', 'Jaipur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Bhilwara', 'Alwar'].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Avg Price / sq.ft</label>
                    <input
                      type="text"
                      required
                      value={trendForm.avgPrice}
                      onChange={(e) => {
                        const val = e.target.value;
                        const num = parseInt(val.replace(/[^0-9]/g, '')) || 0;
                        setTrendForm({ ...trendForm, avgPrice: val, avgPriceNum: num });
                      }}
                      placeholder="e.g. ₹5,800"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">YoY Appreciation Rate</label>
                    <input
                      type="text"
                      required
                      value={trendForm.growth}
                      onChange={(e) => {
                        const val = e.target.value;
                        const num = parseFloat(val.replace(/[^0-9.-]/g, '')) || 0;
                        setTrendForm({ ...trendForm, growth: val, growthNum: num });
                      }}
                      placeholder="e.g. +12.5%"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Locality Profile</label>
                    <input
                      type="text"
                      required
                      value={trendForm.type}
                      onChange={(e) => setTrendForm({ ...trendForm, type: e.target.value })}
                      placeholder="e.g. Premium Hub"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Live Inventory Label</label>
                    <input
                      type="text"
                      required
                      value={trendForm.count}
                      onChange={(e) => setTrendForm({ ...trendForm, count: e.target.value })}
                      placeholder="e.g. 80+ Properties"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Rental Yield</label>
                    <input
                      type="text"
                      value={trendForm.rentalYield}
                      onChange={(e) => setTrendForm({ ...trendForm, rentalYield: e.target.value })}
                      placeholder="e.g. 4.5% Yield"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setShowTrendModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl shadow cursor-pointer">Save Locality Trend</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Media Modal */}
      <AnimatePresence>
        {showAddMediaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-[#0A1628] space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#C9A96E]" />
                  <h4 className="font-serif font-bold text-lg">Add Asset to Media Gallery</h4>
                </div>
                <button onClick={() => setShowAddMediaModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><XCircle className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleAddMedia} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Asset Title</label>
                  <input
                    type="text"
                    required
                    value={newMediaForm.title}
                    onChange={(e) => setNewMediaForm({ ...newMediaForm, title: e.target.value })}
                    placeholder="e.g. Luxury Penthouse Living Room"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Category</label>
                    <select
                      value={newMediaForm.category}
                      onChange={(e) => setNewMediaForm({ ...newMediaForm, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value="Properties">Properties</option>
                      <option value="Townships">Townships</option>
                      <option value="Reels & Videos">Reels & Videos</option>
                      <option value="Logos & Avatars">Logos & Avatars</option>
                      <option value="Blogs">Blogs</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Asset Type</label>
                    <select
                      value={newMediaForm.type}
                      onChange={(e) => setNewMediaForm({ ...newMediaForm, type: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value="image">Image (Photo / JPG / PNG)</option>
                      <option value="video">Video (MP4 / Stream)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold uppercase text-slate-700">Direct Media URL / Upload</label>
                    <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                      <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (dataUrl) => setNewMediaForm(prev => ({ ...prev, url: dataUrl })))}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={newMediaForm.url}
                    onChange={(e) => setNewMediaForm({ ...newMediaForm, url: e.target.value })}
                    placeholder="https://... image or video URL or upload from device"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                {newMediaForm.url && (
                  <div className="h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                    <img src={newMediaForm.url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => setShowAddMediaModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl shadow cursor-pointer">Save Asset</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Media Modal */}
      <AnimatePresence>
        {showEditMediaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-[#0A1628] space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#C9A96E]" />
                  <h4 className="font-serif font-bold text-lg">Edit Media Asset</h4>
                </div>
                <button onClick={() => setShowEditMediaModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><XCircle className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSaveEditMedia} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Asset Title</label>
                  <input
                    type="text"
                    required
                    value={mediaForm.title}
                    onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Category</label>
                    <select
                      value={mediaForm.category}
                      onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value="Properties">Properties</option>
                      <option value="Townships">Townships</option>
                      <option value="Reels & Videos">Reels & Videos</option>
                      <option value="Logos & Avatars">Logos & Avatars</option>
                      <option value="Blogs">Blogs</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Asset Type</label>
                    <select
                      value={mediaForm.type}
                      onChange={(e) => setMediaForm({ ...mediaForm, type: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold uppercase text-slate-700">Direct Media URL</label>
                    <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                      <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (dataUrl) => setMediaForm(prev => ({ ...prev, url: dataUrl })))}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={mediaForm.url}
                    onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                {mediaForm.url && (
                  <div className="h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                    <img src={mediaForm.url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => setShowEditMediaModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl shadow cursor-pointer">Update Asset</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Universal Media Gallery Asset Picker Modal */}
      <AnimatePresence>
        {showGalleryPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-4xl w-full shadow-2xl text-[#0A1628] space-y-4 max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#0A1628] text-[#C9A96E] flex items-center justify-center">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg">Universal Media Gallery Picker</h4>
                    <p className="text-xs text-slate-500">Select any pre-configured image or photo to insert instantly.</p>
                  </div>
                </div>
                <button onClick={() => setShowGalleryPicker(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><XCircle className="w-6 h-6" /></button>
              </div>

              {/* Gallery Filter & Search in Picker */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
                  {['All', 'Properties', 'Reels & Videos', 'Logos & Avatars', 'Blogs', 'Townships'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        galleryCategoryFilter === cat
                          ? 'bg-[#0A1628] text-[#C9A96E] shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-60">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={gallerySearchQuery}
                    onChange={(e) => setGallerySearchQuery(e.target.value)}
                    placeholder="Search asset..."
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-1 focus:ring-[#C9A96E]"
                  />
                </div>
              </div>

              {/* Scrollable Asset Cards */}
              <div className="flex-1 overflow-y-auto pr-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {mediaGallery
                    .filter((item) => {
                      const matchesCategory = galleryCategoryFilter === 'All' || item.category === galleryCategoryFilter;
                      const matchesSearch = !gallerySearchQuery || item.title?.toLowerCase().includes(gallerySearchQuery.toLowerCase());
                      return matchesCategory && matchesSearch;
                    })
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (galleryTargetCallback) {
                            galleryTargetCallback(item.url, item);
                          }
                        }}
                        className="group relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:border-[#C9A96E] hover:shadow-lg transition-all flex flex-col"
                      >
                        <div className="relative h-32 bg-slate-100 overflow-hidden">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400');
                            }}
                          />
                          <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#0A1628]/80 text-[#C9A96E]">
                            {item.category}
                          </span>
                        </div>
                        <div className="p-2.5 bg-white">
                          <p className="font-bold text-xs text-[#0A1628] truncate">{item.title}</p>
                          <p className="text-[10px] text-[#A27B36] font-semibold mt-0.5 flex items-center justify-between">
                            <span>Click to Select</span>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowGalleryPicker(false)}
                  className="px-5 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 13-POINT GOOGLE FORM PROPERTY VISIT RECORD MODAL */}
      <AnimatePresence>
        {showVisitRecordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-[#0A1628] space-y-5 my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] text-[10px] font-bold uppercase tracking-wider mb-1">
                    <ClipboardList className="w-3 h-3 text-[#C9A96E]" /> Google Form Standard
                  </div>
                  <h4 className="font-serif font-bold text-xl text-[#0A1628]">
                    {editingVisitRecord ? 'Edit Property Visit Record' : 'Record Property Visit (Google Form)'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Shree Niwas Properties & Rentals Official 13-Point Field Inspection Record
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVisitRecordModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer rounded-lg hover:bg-slate-100"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveVisitRecord} className="space-y-4 text-xs">
                {/* 1 & 2. Client Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">
                      1. Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={visitRecordForm.clientName}
                      onChange={(e) => setVisitRecordForm({ ...visitRecordForm, clientName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar Sharma"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] text-[#0A1628]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">
                      2. Client Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={visitRecordForm.clientMobile}
                      onChange={(e) => setVisitRecordForm({ ...visitRecordForm, clientMobile: e.target.value })}
                      placeholder="e.g. +91 98290 12345"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] text-[#0A1628]"
                    />
                  </div>
                </div>

                {/* 3 & 13. Owner Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">
                      3. Property Owner Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={visitRecordForm.propertyOwnerName}
                      onChange={(e) => setVisitRecordForm({ ...visitRecordForm, propertyOwnerName: e.target.value })}
                      placeholder="e.g. Bhanwar Singh Rathore"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] text-[#0A1628]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">
                      13. Property Owner Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={visitRecordForm.ownerMobile || ''}
                      onChange={(e) => setVisitRecordForm({ ...visitRecordForm, ownerMobile: e.target.value })}
                      placeholder="e.g. +91 94140 99887"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] text-[#0A1628]"
                    />
                  </div>
                </div>

                {/* 4. Property / Location */}
                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">
                    4. Property / Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={visitRecordForm.propertyLocation}
                    onChange={(e) => setVisitRecordForm({ ...visitRecordForm, propertyLocation: e.target.value })}
                    placeholder="e.g. 4 BHK Villa, Vaishali Nagar, Jaipur"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] text-[#0A1628]"
                  />
                </div>

                {/* 5, 6 & 12. Date, Time & Visit Number */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">
                      5. Visit Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={visitRecordForm.visitDate}
                      onChange={(e) => setVisitRecordForm({ ...visitRecordForm, visitDate: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] text-[#0A1628]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">
                      6. Visit Time *
                    </label>
                    <input
                      type="text"
                      required
                      value={visitRecordForm.visitTime}
                      onChange={(e) => setVisitRecordForm({ ...visitRecordForm, visitTime: e.target.value })}
                      placeholder="e.g. 11:30 AM or 4:00 PM"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] text-[#0A1628]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">
                      12. Visit Number
                    </label>
                    <select
                      value={visitRecordForm.visitNumber}
                      onChange={(e) => setVisitRecordForm({ ...visitRecordForm, visitNumber: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] text-[#0A1628]"
                    >
                      <option value="1">1st Visit</option>
                      <option value="2">2nd Visit</option>
                      <option value="3">3rd Visit</option>
                      <option value="4">4th Visit</option>
                      <option value="5">5th Visit</option>
                    </select>
                  </div>
                </div>

                {/* 7. Visit किसने करवाई? (Staff Coordinator) */}
                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1.5">
                    7. Visit किसने करवाई? (Coordinator) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Priyanka', 'Suman', 'Tammana', 'Self / Other'].map((name) => (
                      <button
                        type="button"
                        key={name}
                        onClick={() => setVisitRecordForm({ ...visitRecordForm, coordinatorName: name })}
                        className={`p-2.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                          visitRecordForm.coordinatorName === name
                            ? 'bg-[#0A1628] text-[#C9A96E] border-[#C9A96E]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 8 & 9. Visit Charge & Payment Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1.5">
                      8. Visit Charge *
                    </label>
                    <div className="flex gap-2">
                      {['₹500', '₹1,000', 'FREE (₹0)'].map((ch) => (
                        <button
                          type="button"
                          key={ch}
                          onClick={() => setVisitRecordForm({ ...visitRecordForm, visitCharge: ch })}
                          className={`flex-1 p-2 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                            visitRecordForm.visitCharge === ch
                              ? 'bg-[#0A1628] text-[#C9A96E] border-[#C9A96E]'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {ch}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1.5">
                      9. Payment Status *
                    </label>
                    <div className="flex gap-2">
                      {['Paid', 'Not paid', 'Partial'].map((st) => (
                        <button
                          type="button"
                          key={st}
                          onClick={() => setVisitRecordForm({ ...visitRecordForm, paymentStatus: st })}
                          className={`flex-1 p-2 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                            visitRecordForm.paymentStatus === st
                              ? st === 'Paid' ? 'bg-emerald-600 text-white border-emerald-600' :
                                st === 'Partial' ? 'bg-amber-600 text-white border-amber-600' :
                                'bg-rose-600 text-white border-rose-600'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 10. Property कैसी लगी? (Client Feedback) */}
                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1.5">
                    10. Property कैसी लगी? (Feedback) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { key: '❤️ पसंद आई', label: '❤️ पसंद आई (Liked)' },
                      { key: '🤔 सोचकर बताएगा', label: '🤔 सोचकर बताएगा (Thinking)' },
                      { key: '❌ पसंद नहीं आई', label: '❌ पसंद नहीं आई (Disliked)' }
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.key}
                        onClick={() => setVisitRecordForm({ ...visitRecordForm, feedback: item.key })}
                        className={`p-2.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                          visitRecordForm.feedback === item.key
                            ? 'bg-[#0A1628] text-[#C9A96E] border-[#C9A96E] shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 11. Follow-up / Remark Short Answer */}
                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">
                    11. Follow-up / Remark Short Answer
                  </label>
                  <textarea
                    rows={2}
                    value={visitRecordForm.followUpRemark || ''}
                    onChange={(e) => setVisitRecordForm({ ...visitRecordForm, followUpRemark: e.target.value })}
                    placeholder="Client feedback notes, negotiation points, second visit timing, or owner remarks..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] text-[#0A1628]"
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowVisitRecordModal(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-extrabold rounded-xl shadow-lg cursor-pointer border border-[#C9A96E]/30 flex items-center gap-1.5"
                  >
                    <CheckSquare className="w-4 h-4 text-[#C9A96E]" />
                    {editingVisitRecord ? 'Update Visit Record' : 'Save Property Visit Record'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
