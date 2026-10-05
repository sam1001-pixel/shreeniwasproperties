'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Building2, FileText, Users, CreditCard, Settings, 
  Search, MoreVertical, Plus, CheckCircle2, XCircle, Edit, Trash2, 
  MapPin, Phone, Mail, Globe, Crown, Shield, Eye, Lock, EyeOff, LogOut, KeyRound,
  Clock, CalendarCheck, MessageSquare, Send, Check, AlertCircle, ShieldAlert, Sparkles, UserCheck, UserPlus,
  Video, Star, Share2, Camera, ThumbsUp, IndianRupee, Layers, ExternalLink, Download, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { DEFAULT_NEW_PROJECTS, NewProjectItem } from '@/components/shared/new-projects-section';

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

  // Property Modal (with Google Maps Redirect Link)
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);
  const [propForm, setPropForm] = useState({ 
    title: '', 
    location: '', 
    price: '', 
    type: 'Sale', 
    status: 'Active', 
    image: '',
    googleMapsUrl: '' 
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

  const openGalleryPicker = (onSelectUrl: (url: string, item?: any) => void, initialCategory = 'All') => {
    setGalleryCategoryFilter(initialCategory);
    setGalleryTargetCallback(() => (url: string, item?: any) => onSelectUrl(url, item));
    setShowGalleryPicker(true);
  };

  const notifyDataUpdated = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('shreeniwas_data_updated'));
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
    siteTitle: 'Shreeniwas Properties',
    tagline: 'Exclusive Real Estate & Rental Network in Rajasthan',
    logoUrl: '',
    heroBgUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop',
    contactEmail: 'contact@shreeniwasproperties.com',
    supportPhone: '+91 98765 43210',
    headOffice: '15 Royal Avenue, C-Scheme, Jaipur, Rajasthan 302001',
    whatsappLink: 'https://wa.me/919876543210',
    instagramLink: 'https://instagram.com/shreeniwasproperties',
    facebookLink: 'https://facebook.com/shreeniwasproperties',
    youtubeLink: 'https://youtube.com/@shreeniwasproperties',
    linkedinLink: 'https://linkedin.com/company/shreeniwasproperties',
    twitterLink: 'https://x.com/shreeniwasprop',
    maintenanceMode: false
  });

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

    // Load Platform Settings
    const savedSettings = localStorage.getItem('shreeniwas_platform_settings');
    if (savedSettings) { try { setSiteSettings(JSON.parse(savedSettings)); } catch (e) {} }

    // Load Media Gallery
    const savedGallery = localStorage.getItem('shreeniwas_media_gallery');
    if (savedGallery) { try { setMediaGallery(JSON.parse(savedGallery)); } catch (e) {} }

    // Load Builder Projects
    const savedProjects = localStorage.getItem('shreeniwas_new_projects');
    if (savedProjects) { try { setNewProjectsList(JSON.parse(savedProjects)); } catch (e) {} }

    // Load Brokerage Commission Settings (Super Admin Only)
    const savedBrokerage = localStorage.getItem('shreeniwas_brokerage_settings');
    if (savedBrokerage) { try { setBrokerageSettings(JSON.parse(savedBrokerage)); } catch (e) {} }

    setIsLoaded(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    // Primary built-in super / staff login
    if (selectedRoleType === 'super') {
      if (
        (trimmedEmail === 'superadmin@shreeniwasproperties.com' || trimmedEmail === 'admin' || trimmedEmail === 'admin@shreeniwas.com') &&
        (trimmedPass === 'admin123' || trimmedPass === 'SuperAdmin@123' || trimmedPass === 'admin')
      ) {
        sessionStorage.setItem('shreeniwas_admin_auth', 'true');
        sessionStorage.setItem('shreeniwas_admin_role', 'super');
        setAdminRole('super');
        setIsAuthenticated(true);
        setActiveTab('overview');
        return;
      }
    } else {
      if (
        (trimmedEmail === 'admin@shreeniwasproperties.com' || trimmedEmail === 'staff' || trimmedEmail === 'admin@shreeniwas.com') &&
        (trimmedPass === 'admin123' || trimmedPass === 'AdminPass@123' || trimmedPass === 'admin')
      ) {
        sessionStorage.setItem('shreeniwas_admin_auth', 'true');
        sessionStorage.setItem('shreeniwas_admin_role', 'staff');
        setAdminRole('staff');
        setIsAuthenticated(true);
        setActiveTab('inquiries');
        return;
      }
    }

    // Dynamically created admin account login check
    const matchAccount = adminAccountsList.find(a => a.email.toLowerCase() === trimmedEmail);
    if (matchAccount) {
      sessionStorage.setItem('shreeniwas_admin_auth', 'true');
      sessionStorage.setItem('shreeniwas_admin_role', matchAccount.level || 'staff');
      setAdminRole(matchAccount.level || 'staff');
      setIsAuthenticated(true);
      setActiveTab(matchAccount.level === 'super' ? 'overview' : 'inquiries');
      return;
    }

    setLoginError('Invalid email or password. Please verify your admin credentials.');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('shreeniwas_admin_auth');
    sessionStorage.removeItem('shreeniwas_admin_role');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !replyText.trim()) return;

    setInquiriesList(prev => {
      const updated = prev.map(item => 
        item.id === selectedInquiry.id ? { ...item, reply: replyText.trim(), status: 'Responded & Sent' } : item
      );
      localStorage.setItem('shreeniwas_inquiries', JSON.stringify(updated));
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
        return updated;
      });
    } else {
      setIsClockedIn(false);
      setAttendanceList(prev => {
        const updated = prev.map((item, idx) => idx === 0 ? { ...item, clockOut: nowTime } : item);
        localStorage.setItem('shreeniwas_admin_attendance', JSON.stringify(updated));
        return updated;
      });
    }
  };

  // Property Handlers
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propForm.title || !propForm.location || !propForm.price) return;

    if (editingProperty) {
      const updated = propertiesList.map(p => p.id === editingProperty.id ? { ...p, ...propForm } : p);
      setPropertiesList(updated);
      localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(updated));
    } else {
      const newProp = { id: `PROP-00${propertiesList.length + 1}`, ...propForm };
      const updated = [newProp, ...propertiesList];
      setPropertiesList(updated);
      localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(updated));
    }
    notifyDataUpdated();

    setShowPropertyModal(false);
    setEditingProperty(null);
    setPropForm({ title: '', location: '', price: '', type: 'Sale', status: 'Active', image: '', googleMapsUrl: '' });
  };

  const handleDeleteProperty = (id: string) => {
    const updated = propertiesList.filter(p => p.id !== id);
    setPropertiesList(updated);
    localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(updated));
    notifyDataUpdated();
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
    }

    notifyDataUpdated();
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
    notifyDataUpdated();
  };

  // Super Admin Brokerage Save Handler
  const handleSaveBrokerage = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminRole !== 'super') {
      alert('Access Denied: Only Super Admin can modify brokerage and platform fees.');
      return;
    }
    localStorage.setItem('shreeniwas_brokerage_settings', JSON.stringify(brokerageSettings));
    notifyDataUpdated();
    alert('Super Admin Brokerage & Platform Financial Controls Saved Live!');
  };

  // Blog Handlers
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title) return;

    if (editingBlog) {
      const updated = blogsList.map(b => b.id === editingBlog.id ? { ...b, ...blogForm } : b);
      setBlogsList(updated);
      localStorage.setItem('shreeniwas_blog_posts', JSON.stringify(updated));
    } else {
      const newBlog = { id: `BLOG-${Date.now().toString().slice(-4)}`, ...blogForm, date: "Today", status: "Published" };
      const updated = [newBlog, ...blogsList];
      setBlogsList(updated);
      localStorage.setItem('shreeniwas_blog_posts', JSON.stringify(updated));
    }
    notifyDataUpdated();

    setShowBlogModal(false);
    setEditingBlog(null);
    setBlogForm({ title: '', category: 'Market Trends', author: 'Admin Team', readTime: '5 min read', image: '' });
  };

  const handleDeleteBlog = (id: string) => {
    const updated = blogsList.filter(b => b.id !== id);
    setBlogsList(updated);
    localStorage.setItem('shreeniwas_blog_posts', JSON.stringify(updated));
    notifyDataUpdated();
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

    if (editingReel) {
      const updated = reelsList.map(r => r.id === editingReel.id ? { ...r, ...payload } : r);
      setReelsList(updated);
      localStorage.setItem('shreeniwas_admin_reels', JSON.stringify(updated));
    } else {
      const newReel = { id: `REEL-0${reelsList.length + 1}`, ...payload };
      const updated = [newReel, ...reelsList];
      setReelsList(updated);
      localStorage.setItem('shreeniwas_admin_reels', JSON.stringify(updated));
    }
    notifyDataUpdated();

    setShowReelModal(false);
    setEditingReel(null);
    setReelForm({ title: '', property: '', instaUrl: '', embedUrl: '', views: '1.2K', status: 'Active' });
  };

  const handleDeleteReel = (id: string) => {
    const updated = reelsList.filter(r => r.id !== id);
    setReelsList(updated);
    localStorage.setItem('shreeniwas_admin_reels', JSON.stringify(updated));
    notifyDataUpdated();
  };

  // Review Handlers (Reviews Management Power)
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.quote) return;

    if (editingReview) {
      const updated = reviewsList.map(r => r.id === editingReview.id ? { ...r, ...reviewForm } : r);
      setReviewsList(updated);
      localStorage.setItem('shreeniwas_testimonials_management', JSON.stringify(updated));
    } else {
      const newReview = { id: `REV-0${reviewsList.length + 1}`, ...reviewForm };
      const updated = [newReview, ...reviewsList];
      setReviewsList(updated);
      localStorage.setItem('shreeniwas_testimonials_management', JSON.stringify(updated));
    }
    notifyDataUpdated();

    setShowReviewModal(false);
    setEditingReview(null);
    setReviewForm({ name: '', role: '', rating: 5, quote: '', status: 'Featured', avatar: '' });
  };

  const handleDeleteReview = (id: string) => {
    const updated = reviewsList.filter(r => r.id !== id);
    setReviewsList(updated);
    localStorage.setItem('shreeniwas_testimonials_management', JSON.stringify(updated));
    notifyDataUpdated();
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
    notifyDataUpdated();
    setShowSettingsConfirmModal(false);
    setSettingsSaveSuccess(true);
    setTimeout(() => setSettingsSaveSuccess(false), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSettingsConfirmModal(true);
  };

  const navItems = adminRole === 'super' ? [
    { id: 'overview', label: 'Business Overview', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties Inventory', icon: Building2 },
    { id: 'projects', label: 'Builder Projects & Townships', icon: Layers },
    { id: 'brokerage', label: 'Brokerage & Financials', icon: IndianRupee },
    { id: 'reels', label: 'Property Video Reels', icon: Video },
    { id: 'reviews', label: 'Buyer & Landlord Reviews', icon: Star },
    { id: 'gallery', label: 'Media & Video Gallery', icon: Camera },
    { id: 'inquiries', label: 'Query & Lead Desk', icon: MessageSquare },
    { id: 'attendance', label: 'Staff Attendance System', icon: Clock },
    { id: 'users', label: 'Users & Admin Management', icon: Users },
    { id: 'blogs', label: 'Blog & Content', icon: FileText },
    { id: 'settings', label: 'Platform & Social Settings', icon: Settings },
  ] : [
    { id: 'inquiries', label: 'Query & Lead Desk', icon: MessageSquare },
    { id: 'attendance', label: 'My Shift Attendance', icon: Clock },
    { id: 'properties', label: 'View Properties', icon: Building2 },
    { id: 'gallery', label: 'Media & Video Gallery', icon: Camera },
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
              <img src={siteSettings.logoUrl} alt="Logo" className="h-9 w-auto rounded-lg object-contain" />
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

          {/* PROPERTIES TAB */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Properties Inventory Manager</h3>
                  <p className="text-xs text-slate-500">Super Admin Power: Add, edit, update prices, or remove property listings.</p>
                </div>

                {adminRole === 'super' && (
                  <button
                    onClick={() => {
                      setEditingProperty(null);
                      setPropForm({ title: '', location: '', price: '', type: 'Sale', status: 'Active', image: '', googleMapsUrl: '' });
                      setShowPropertyModal(true);
                    }}
                    className="px-4 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow cursor-pointer hover:bg-[#0A1628]/90"
                  >
                    <Plus className="w-4 h-4" /> Add New Listing
                  </button>
                )}
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                        <th className="p-4 pl-6">ID</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Google Maps</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Status</th>
                        {adminRole === 'super' && <th className="p-4 text-right pr-6">Super Admin Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {propertiesList.map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 pl-6 font-mono font-bold text-slate-500">{prop.id}</td>
                          <td className="p-4 font-bold text-[#0A1628]">{prop.title}</td>
                          <td className="p-4 text-slate-600">{prop.location}</td>
                          <td className="p-4">
                            {prop.googleMapsUrl ? (
                              <a
                                href={prop.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100"
                              >
                                <MapPin className="w-3 h-3 text-emerald-600" />
                                <span>Verified Pin</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ) : (
                              <span className="text-[10px] text-slate-400 italic">Auto Search</span>
                            )}
                          </td>
                          <td className="p-4 font-bold text-emerald-700">{prop.price}</td>
                          <td className="p-4 font-medium text-slate-600">{prop.type}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {prop.status}
                            </span>
                          </td>
                          {adminRole === 'super' && (
                            <td className="p-4 text-right pr-6 space-x-2">
                              <button
                                onClick={() => {
                                  setEditingProperty(prop);
                                  setPropForm({ 
                                    title: prop.title, 
                                    location: prop.location, 
                                    price: prop.price, 
                                    type: prop.type, 
                                    status: prop.status, 
                                    image: prop.image || '',
                                    googleMapsUrl: prop.googleMapsUrl || ''
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

          {/* SUPER ADMIN BROKERAGE & FINANCIALS TAB */}
          {activeTab === 'brokerage' && adminRole === 'super' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1 border border-amber-500/30">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Exclusive Super Admin Control
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Brokerage, Commission & Platform Financial Settings</h3>
                  <p className="text-xs text-slate-500">
                    Staff admins have 0% access to this section. All brokerage structures, visit fee payouts, and escrow percentages are governed here.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveBrokerage} className="space-y-6 max-w-4xl">
                {/* 1. Commission Model */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-[#C9A96E]" /> Platform Brokerage Model
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <label className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      brokerageSettings.model === 'zero' 
                        ? 'border-[#0A1628] bg-slate-50 shadow-sm' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input 
                        type="radio" 
                        name="brokerageModel" 
                        className="hidden" 
                        checked={brokerageSettings.model === 'zero'} 
                        onChange={() => setBrokerageSettings({ ...brokerageSettings, model: 'zero' })} 
                      />
                      <span className="font-bold text-sm block text-[#0A1628] mb-1">0% Zero Brokerage (Direct Owner)</span>
                      <p className="text-slate-500 text-[11px]">Free listing for direct owners; platform charges 0% commission from buyers/tenants.</p>
                    </label>

                    <label className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      brokerageSettings.model === 'percentage' 
                        ? 'border-[#0A1628] bg-slate-50 shadow-sm' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input 
                        type="radio" 
                        name="brokerageModel" 
                        className="hidden" 
                        checked={brokerageSettings.model === 'percentage'} 
                        onChange={() => setBrokerageSettings({ ...brokerageSettings, model: 'percentage' })} 
                      />
                      <span className="font-bold text-sm block text-[#0A1628] mb-1">Percentage Commission</span>
                      <p className="text-slate-500 text-[11px]">Charge standard deal brokerage (e.g. 1% or 2%) on concluded transactions.</p>
                    </label>

                    <label className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      brokerageSettings.model === 'fixed' 
                        ? 'border-[#0A1628] bg-slate-50 shadow-sm' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input 
                        type="radio" 
                        name="brokerageModel" 
                        className="hidden" 
                        checked={brokerageSettings.model === 'fixed'} 
                        onChange={() => setBrokerageSettings({ ...brokerageSettings, model: 'fixed' })} 
                      />
                      <span className="font-bold text-sm block text-[#0A1628] mb-1">Flat Listing Fee</span>
                      <p className="text-slate-500 text-[11px]">Charge a flat fee per commercial or high-ticket luxury verified listing.</p>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Commission Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={brokerageSettings.commissionRate}
                        onChange={(e) => setBrokerageSettings({ ...brokerageSettings, commissionRate: parseFloat(e.target.value) || 0 })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Applicable when Percentage Commission model is active.</p>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Minimum Commission Floor (₹)</label>
                      <input
                        type="number"
                        min="0"
                        value={brokerageSettings.minCommission}
                        onChange={(e) => setBrokerageSettings({ ...brokerageSettings, minCommission: parseInt(e.target.value) || 0 })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Minimum base platform fee on deals.</p>
                    </div>
                  </div>
                </div>

                {/* 2. VIP Visit & Cab Charges */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#C9A96E]" /> VIP Visit & Chauffeur Services Pricing
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">VIP Site Visit Booking Fee (₹)</label>
                      <input
                        type="number"
                        min="0"
                        value={brokerageSettings.vipSiteVisitFee}
                        onChange={(e) => setBrokerageSettings({ ...brokerageSettings, vipSiteVisitFee: parseInt(e.target.value) || 0 })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Standard booking deposit (refundable upon deal execution).</p>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Private AC Cab Pickup Add-on (₹)</label>
                      <input
                        type="number"
                        min="0"
                        value={brokerageSettings.vipCabPickupFee}
                        onChange={(e) => setBrokerageSettings({ ...brokerageSettings, vipCabPickupFee: parseInt(e.target.value) || 0 })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Direct airport/hotel luxury pickup for outstation buyers.</p>
                    </div>
                  </div>
                </div>

                {/* 3. Escrow & Platform Rules */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1628] border-b border-slate-100 pb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Platform Security & Escrow Threshold
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold uppercase text-slate-700 block mb-1">Legal Title Escrow Deposit (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={brokerageSettings.escrowDepositPercent}
                        onChange={(e) => setBrokerageSettings({ ...brokerageSettings, escrowDepositPercent: parseInt(e.target.value) || 0 })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Required security token held during title search and registry verification.</p>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <input
                        type="checkbox"
                        id="allowDirectOwner"
                        checked={brokerageSettings.allowDirectOwnerContact}
                        onChange={(e) => setBrokerageSettings({ ...brokerageSettings, allowDirectOwnerContact: e.target.checked })}
                        className="w-5 h-5 accent-[#0A1628] cursor-pointer rounded"
                      />
                      <label htmlFor="allowDirectOwner" className="font-bold text-slate-700 cursor-pointer text-xs">
                        Allow Direct Buyer-Owner WhatsApp Calls (Bypass Admin Desk)
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#0A1628] text-[#C9A96E] font-extrabold text-xs rounded-2xl shadow-xl hover:bg-[#0A1628]/90 transition cursor-pointer border border-[#C9A96E]/30"
                >
                  Save Super Admin Brokerage Controls Live
                </button>
              </form>
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

          {/* MEDIA & VIDEO GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#0A1628] flex items-center gap-2">
                      <Camera className="w-5 h-5 text-[#C9A96E]" /> Media & Video Asset Gallery (All Admins)
                    </h3>
                    <p className="text-xs text-slate-500">Centralized media handling for property photos, video reel thumbnails, Instagram links, brand logos, and avatars.</p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Search gallery assets..."
                      value={gallerySearchQuery}
                      onChange={(e) => setGallerySearchQuery(e.target.value)}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] w-full md:w-56"
                    />
                  </div>
                </div>

                {/* Quick Add Media Asset Form */}
                <form onSubmit={handleAddMedia} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    <Plus className="w-3.5 h-3.5 text-[#C9A96E]" /> Add New Image / Video to Site Gallery
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Asset Title (e.g. Royal Villa Pool)"
                      value={newMediaForm.title}
                      onChange={(e) => setNewMediaForm({ ...newMediaForm, title: e.target.value })}
                      className="p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />

                    <select
                      value={newMediaForm.category}
                      onChange={(e) => setNewMediaForm({ ...newMediaForm, category: e.target.value })}
                      className="p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value="Properties">Properties</option>
                      <option value="Reels & Videos">Reels & Videos</option>
                      <option value="Logos & Avatars">Logos & Avatars</option>
                      <option value="Blogs">Blogs</option>
                    </select>

                    <select
                      value={newMediaForm.type}
                      onChange={(e) => setNewMediaForm({ ...newMediaForm, type: e.target.value })}
                      className="p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value="image">Image Asset</option>
                      <option value="video">Reel / Video Clip</option>
                    </select>

                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        required
                        placeholder="Image / Thumbnail URL or Upload File"
                        value={newMediaForm.url}
                        onChange={(e) => setNewMediaForm({ ...newMediaForm, url: e.target.value })}
                        className="p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <label className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-[#0A1628] font-bold text-[10px] rounded-lg cursor-pointer flex items-center justify-center gap-1 border border-slate-300 transition-colors">
                        <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Photo/Video from Device
                        <input
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setNewMediaForm(prev => ({ ...prev, url: dataUrl })))}
                        />
                      </label>
                    </div>

                    <input
                      type="url"
                      placeholder="Instagram Reel Link (Optional)"
                      value={newMediaForm.instaUrl}
                      onChange={(e) => setNewMediaForm({ ...newMediaForm, instaUrl: e.target.value })}
                      className="p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl text-xs hover:bg-slate-800 transition cursor-pointer shadow">
                      + Save to Gallery
                    </button>
                  </div>
                </form>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2">
                  {['All', 'Properties', 'Reels & Videos', 'Logos & Avatars', 'Blogs'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryCategoryFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        galleryCategoryFilter === cat
                          ? 'bg-[#0A1628] text-[#C9A96E] shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Gallery Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                  {mediaGallery
                    .filter(m => galleryCategoryFilter === 'All' || m.category === galleryCategoryFilter)
                    .filter(m => !gallerySearchQuery || m.title.toLowerCase().includes(gallerySearchQuery.toLowerCase()) || m.category.toLowerCase().includes(gallerySearchQuery.toLowerCase()))
                    .map((item) => (
                      <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col justify-between space-y-2 group hover:shadow-md transition">
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-200">
                          <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          
                          {item.type === 'video' && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="p-2 bg-[#C9A96E] text-[#0A1628] rounded-full shadow">
                                <Video className="w-4 h-4 fill-current" />
                              </span>
                            </div>
                          )}

                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold rounded-md">
                            {item.category}
                          </span>
                        </div>

                        <div>
                          <h5 className="font-bold text-xs text-[#0A1628] truncate">{item.title}</h5>
                          {item.instaUrl && (
                            <a href={item.instaUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-pink-600 font-bold hover:underline block truncate mt-0.5">
                              Instagram Reel Link ↗
                            </a>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingMedia(item);
                                setMediaForm({ title: item.title, category: item.category, type: item.type, url: item.url, instaUrl: item.instaUrl || '' });
                                setShowEditMediaModal(true);
                              }}
                              className="px-2 py-1 bg-slate-100 text-slate-700 hover:bg-[#0A1628] hover:text-[#C9A96E] font-bold rounded-lg transition cursor-pointer flex items-center gap-1"
                              title="Edit Media Asset"
                            >
                              <Edit className="w-3 h-3" /> Edit
                            </button>

                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(item.url);
                                alert("Media URL copied to clipboard!");
                              }}
                              className="text-slate-600 font-bold hover:text-[#0A1628] cursor-pointer"
                            >
                              Copy
                            </button>
                          </div>

                          <button
                            onClick={() => handleDeleteMedia(item.id)}
                            className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer"
                            title="Delete Asset"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
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

                <button
                  onClick={toggleClockIn}
                  className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                    isClockedIn ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  {isClockedIn ? 'Clock Out Shift' : 'Clock In My Shift Now'}
                </button>
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

          {/* INQUIRIES TAB */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Query & Lead Desk</h3>
                  <p className="text-xs text-slate-500">Respond directly to visitor property inquiries and VIP visit bookings.</p>
                </div>
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
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                          <th className="p-4 pl-6">Client Details</th>
                          <th className="p-4">Property / Topic</th>
                          <th className="p-4">Type</th>
                          <th className="p-4">Query / Request</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right pr-6">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {inquiriesList.map((inq) => (
                          <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 pl-6">
                              <p className="font-bold text-[#0A1628]">{inq.user}</p>
                              <p className="text-[10px] text-slate-400">{inq.phone} | {inq.email}</p>
                            </td>
                            <td className="p-4 font-medium text-slate-700">{inq.property}</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C9A96E]/20 text-[#0A1628]">
                                {inq.type}
                              </span>
                            </td>
                            <td className="p-4 text-slate-600 max-w-[200px] truncate">{inq.query || "No notes"}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                inq.status?.includes('Paid') || inq.status?.includes('Responded') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {inq.status}
                              </span>
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
                          <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                            <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (dataUrl) => setSiteSettings(prev => ({ ...prev, logoUrl: dataUrl })))}
                            />
                          </label>
                          <span className="text-slate-300">|</span>
                          <button
                            type="button"
                            onClick={() => openGalleryPicker((url) => setSiteSettings(prev => ({ ...prev, logoUrl: url })), 'Logos & Avatars')}
                            className="text-[#C9A96E] hover:underline font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                          >
                            <Camera className="w-3 h-3" /> Pick Gallery
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={siteSettings.logoUrl}
                        onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })}
                        placeholder="https://example.com/logo.png or uploaded image"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Upload from device, pick from gallery, or paste image URL.</p>
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
                        <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                          <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (dataUrl) => setSiteSettings(prev => ({ ...prev, heroBgUrl: dataUrl })))}
                          />
                        </label>
                        <span className="text-slate-300">|</span>
                        <button
                          type="button"
                          onClick={() => openGalleryPicker((url) => setSiteSettings(prev => ({ ...prev, heroBgUrl: url })), 'Properties')}
                          className="text-[#C9A96E] hover:underline font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                        >
                          <Camera className="w-3 h-3" /> Pick Gallery
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={siteSettings.heroBgUrl || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, heroBgUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/... or upload Rajasthan royal background image"
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
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

      {/* Add/Edit Property Modal */}
      <AnimatePresence>
        {showPropertyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-[#0A1628] space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-lg">{editingProperty ? "Edit Property Listing" : "Add New Property Listing"}</h4>
                <button onClick={() => setShowPropertyModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><XCircle className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSaveProperty} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Property Title</label>
                  <input
                    type="text"
                    required
                    value={propForm.title}
                    onChange={(e) => setPropForm({ ...propForm, title: e.target.value })}
                    placeholder="e.g. Royal Villa Mansarovar"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Location / City</label>
                  <input
                    type="text"
                    required
                    value={propForm.location}
                    onChange={(e) => setPropForm({ ...propForm, location: e.target.value })}
                    placeholder="e.g. C-Scheme, Jaipur"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold uppercase text-slate-700">Property Cover Image</label>
                    <div className="flex items-center gap-2">
                      <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                        <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setPropForm(prev => ({ ...prev, image: dataUrl })))}
                        />
                      </label>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => openGalleryPicker((url) => setPropForm(prev => ({ ...prev, image: url })), 'Properties')}
                        className="text-[#C9A96E] hover:underline font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <Camera className="w-3 h-3" /> Pick Gallery
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={propForm.image}
                    onChange={(e) => setPropForm({ ...propForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/... or upload from device"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Price</label>
                    <input
                      type="text"
                      required
                      value={propForm.price}
                      onChange={(e) => setPropForm({ ...propForm, price: e.target.value })}
                      placeholder="e.g. ₹2.5 Cr or ₹45,000/mo"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-700 block mb-1">Listing Purpose</label>
                    <select
                      value={propForm.type}
                      onChange={(e) => setPropForm({ ...propForm, type: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    >
                      <option value="Sale">Sale</option>
                      <option value="Rent">Rent</option>
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1 flex items-center justify-between">
                    <span>Google Maps Direct / Redirect Link</span>
                    <span className="text-[10px] text-emerald-700 font-bold">📍 Super Admin GPS Pin</span>
                  </label>
                  <input
                    type="url"
                    value={propForm.googleMapsUrl || ''}
                    onChange={(e) => setPropForm({ ...propForm, googleMapsUrl: e.target.value })}
                    placeholder="https://maps.app.goo.gl/... or https://www.google.com/maps/search/?api=1&query=..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Direct redirection link clicked by buyers and tenants to navigate straight to the property via Google Maps.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowPropertyModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl shadow cursor-pointer">Save Listing</button>
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
                      <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                        <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setProjectForm(prev => ({ ...prev, coverImage: dataUrl })))}
                        />
                      </label>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => openGalleryPicker((url) => setProjectForm(prev => ({ ...prev, coverImage: url })), 'Properties')}
                        className="text-[#C9A96E] hover:underline font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <Camera className="w-3 h-3" /> Pick Gallery
                      </button>
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
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold uppercase text-slate-700">Instagram Reel Link (URL)</label>
                    <button
                      type="button"
                      onClick={() => openGalleryPicker((url, item) => setReelForm(prev => ({ ...prev, instaUrl: item?.instaUrl || url })), 'Reels & Videos')}
                      className="text-[#C9A96E] hover:underline font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                    >
                      <Camera className="w-3 h-3" /> Pick from Gallery
                    </button>
                  </div>
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
                      <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                        <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                        <input
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setReelForm(prev => ({ ...prev, embedUrl: dataUrl })))}
                        />
                      </label>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => openGalleryPicker((url) => setReelForm(prev => ({ ...prev, embedUrl: url })), 'Properties')}
                        className="text-[#C9A96E] hover:underline font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <Camera className="w-3 h-3" /> Pick Gallery
                      </button>
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
                      <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                        <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setReviewForm(prev => ({ ...prev, avatar: dataUrl })))}
                        />
                      </label>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => openGalleryPicker((url) => setReviewForm(prev => ({ ...prev, avatar: url })), 'Logos & Avatars')}
                        className="text-[#C9A96E] hover:underline font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <Camera className="w-3 h-3" /> Pick Gallery
                      </button>
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
                      <label className="text-slate-700 hover:text-[#0A1628] font-bold text-[10px] flex items-center gap-1 cursor-pointer">
                        <Camera className="w-3 h-3 text-[#C9A96E]" /> Upload Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setBlogForm(prev => ({ ...prev, image: dataUrl })))}
                        />
                      </label>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => openGalleryPicker((url) => setBlogForm(prev => ({ ...prev, image: url })), 'Blogs')}
                        className="text-[#C9A96E] hover:underline font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <Camera className="w-3 h-3" /> Pick Gallery
                      </button>
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

      {/* Media Gallery Picker Modal */}
      <AnimatePresence>
        {showGalleryPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl text-[#0A1628] space-y-4 max-h-[85vh] flex flex-col">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 shrink-0">
                <div>
                  <h4 className="font-serif font-bold text-lg flex items-center gap-2">
                    <Camera className="w-5 h-5 text-[#C9A96E]" /> Pick Media from Site Gallery
                  </h4>
                  <p className="text-xs text-slate-500">Click any image or video thumbnail to select it for your active form.</p>
                </div>
                <button onClick={() => setShowGalleryPicker(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><XCircle className="w-5 h-5" /></button>
              </div>

              {/* Filter Tabs & Search */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                  {['All', 'Properties', 'Reels & Videos', 'Logos & Avatars', 'Blogs'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        galleryCategoryFilter === cat
                          ? 'bg-[#0A1628] text-[#C9A96E]'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Filter media..."
                  value={gallerySearchQuery}
                  onChange={(e) => setGallerySearchQuery(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] w-full sm:w-44"
                />
              </div>

              {/* Gallery Items Grid */}
              <div className="overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 p-1">
                {mediaGallery
                  .filter(m => galleryCategoryFilter === 'All' || m.category === galleryCategoryFilter)
                  .filter(m => !gallerySearchQuery || m.title.toLowerCase().includes(gallerySearchQuery.toLowerCase()))
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (galleryTargetCallback) {
                          galleryTargetCallback(item.url || item.instaUrl, item);
                        }
                        setShowGalleryPicker(false);
                      }}
                      className="group cursor-pointer bg-slate-50 border border-slate-200 hover:border-[#C9A96E] hover:ring-2 hover:ring-[#C9A96E] rounded-2xl p-2 transition-all space-y-1"
                    >
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-200">
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="p-1.5 bg-[#C9A96E] text-[#0A1628] rounded-full">
                              <Video className="w-3.5 h-3.5 fill-current" />
                            </span>
                          </div>
                        )}
                      </div>
                      <h5 className="font-bold text-[11px] text-[#0A1628] truncate">{item.title}</h5>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">{item.category}</p>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Media Asset Modal */}
      <AnimatePresence>
        {showEditMediaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-[#0A1628] space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-lg">Edit Media & Video Asset</h4>
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
                    placeholder="e.g. Royal Villa Pool"
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
                      <option value="image">Image Asset</option>
                      <option value="video">Reel / Video Clip</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold uppercase text-slate-700">Image / Video Thumbnail Asset</label>
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
                    placeholder="https://images.unsplash.com/... or upload photo/video from device"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-700 block mb-1">Instagram Reel Link (URL)</label>
                  <input
                    type="url"
                    value={mediaForm.instaUrl}
                    onChange={(e) => setMediaForm({ ...mediaForm, instaUrl: e.target.value })}
                    placeholder="https://www.instagram.com/reel/..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowEditMediaModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold rounded-xl shadow cursor-pointer">Update Asset</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
