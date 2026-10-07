'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, Heart, Send, Calendar, ArrowRight, Building2, MapPin, 
  Phone, Mail, ShieldCheck, LogOut, Trash2, Eye, Bell, Settings, 
  Crown, Sparkles, CheckCircle2, Clock, Lock, KeyRound, AlertCircle, Camera, Check
} from 'lucide-react';
import Image from 'next/image';
import { ProfileUpdateSchema, PasswordChangeSchema } from '@/lib/auth/validation';
import { comparePassword, hashPassword } from '@/lib/auth/security';
import { getSavedProperties, removeSavedProperty } from '@/lib/saved-properties';

const MOCK_VIP_VISITS = [
  {
    id: "VISIT-901",
    property: "The Royal Heritage Residency",
    location: "Vaishali Nagar, Jaipur",
    date: "Oct 15, 2024 (11:00 AM)",
    agent: "Shreeniwas Advisor (+91 6376117833)",
    fee: "₹499 Paid",
    status: "Confirmed & Scheduled"
  },
  {
    id: "VISIT-804",
    property: "Lakeview Palace Heights",
    location: "Fatehpura, Udaipur",
    date: "Oct 18, 2024 (3:30 PM)",
    agent: "Shreeniwas Senior Executive (+91 6376117833)",
    fee: "₹499 Paid",
    status: "Cab Pickup Assigned"
  }
];

export default function UserProfileDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'favorites' | 'visits' | 'profile' | 'security' | 'notifications'>('favorites');
  const [savedList, setSavedList] = useState<any[]>([]);
  const [vipVisits, setVipVisits] = useState<any[]>([]);
  const [userSession, setUserSession] = useState<{
    name: string;
    email: string;
    role: string;
    phone: string;
    city: string;
    avatar?: string;
    memberSince: string;
    loggedIn?: boolean;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  // Profile Form States
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileCity, setProfileCity] = useState('Jaipur');
  const [profileAvatar, setProfileAvatar] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  // Password Change Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('shreeniwas_user_session') || sessionStorage.getItem('shreeniwas_user_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed && parsed.loggedIn) {
          setUserSession(parsed);
          setProfileName(parsed.name || '');
          setProfilePhone(parsed.phone || '');
          setProfileCity(parsed.city?.split(',')[0]?.trim() || 'Jaipur');
          setProfileAvatar(parsed.avatar || '');

          // Load from unified saved properties manager
          setSavedList(getSavedProperties());

          const loadUserVisits = () => {
            try {
              // 1. Check user dedicated visits key
              const userVisitsKey = `shreeniwas_vip_visits_${parsed.email}`;
              const storedVisits = localStorage.getItem(userVisitsKey);
              let combined: any[] = storedVisits ? JSON.parse(storedVisits) : [];

              // 2. Also check confirmed inquiries where email matches or user name matches
              const inqsRaw = localStorage.getItem('shreeniwas_inquiries');
              if (inqsRaw) {
                const inqs = JSON.parse(inqsRaw);
                if (Array.isArray(inqs)) {
                  inqs.forEach((inq: any) => {
                    const isUserMatch = (inq.email && inq.email.toLowerCase() === parsed.email.toLowerCase()) ||
                                        (inq.phone && parsed.phone && inq.phone === parsed.phone);
                    const isConfirmed = inq.status?.includes('Verified') || inq.status?.includes('Confirmed');
                    if (isUserMatch && isConfirmed) {
                      const alreadyIn = combined.some((v: any) => v.id === inq.id || v.utrNumber === inq.utrNumber);
                      if (!alreadyIn) {
                        combined.push({
                          id: inq.id || `VISIT-${Math.floor(100 + Math.random() * 900)}`,
                          property: inq.property || 'VIP Rajasthan Property Pass',
                          location: inq.location || 'Rajasthan, India',
                          date: inq.visitDate ? `${inq.visitDate} (${inq.slotLabel || inq.visitTimeSlot || 'Confirmed'})` : `${inq.date || 'Active Pass'}`,
                          agent: 'Shreeniwas Senior Executive (+91 6376117833)',
                          fee: inq.amount ? `₹${inq.amount} Verified` : 'Verified & Confirmed',
                          status: 'Confirmed & Scheduled',
                          utrNumber: inq.utrNumber || '',
                          receiptAvailable: true
                        });
                      }
                    }
                  });
                }
              }

              // 3. Check global confirmed visits list as additional source
              const allVisitsRaw = localStorage.getItem('shreeniwas_all_vip_visits');
              if (allVisitsRaw) {
                const allVisits = JSON.parse(allVisitsRaw);
                if (Array.isArray(allVisits)) {
                  allVisits.forEach((v: any) => {
                    if (v.userEmail?.toLowerCase() === parsed.email.toLowerCase()) {
                      const exists = combined.some((existing: any) => existing.id === v.id || (v.utrNumber && existing.utrNumber === v.utrNumber));
                      if (!exists) combined.push(v);
                    }
                  });
                }
              }

              setVipVisits(combined.length > 0 ? combined : MOCK_VIP_VISITS);
            } catch (e) {
              setVipVisits(MOCK_VIP_VISITS);
            }
          };

          loadUserVisits();
          window.addEventListener('shreeniwas_data_updated', loadUserVisits);
          window.addEventListener('storage', loadUserVisits);

          setLoading(false);
          return () => {
            window.removeEventListener('shreeniwas_data_updated', loadUserVisits);
            window.removeEventListener('storage', loadUserVisits);
          };
        }
      } catch (e) {}
    }
    
    router.push('/login?redirect=/dashboard/portal');
  }, [router]);

  useEffect(() => {
    const handleFavsUpdate = () => {
      setSavedList(getSavedProperties());
    };
    window.addEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
    return () => window.removeEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('shreeniwas_user_session');
    sessionStorage.removeItem('shreeniwas_user_session');
    router.push('/login');
  };

  const handleRevokeAllSessions = () => {
    if (confirm("Are you sure you want to sign out of all active devices?")) {
      handleLogout();
    }
  };

  const removeFavorite = (id: string) => {
    removeSavedProperty(id);
    setSavedList(getSavedProperties());
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    const validation = ProfileUpdateSchema.safeParse({
      name: profileName,
      phone: profilePhone,
      preferredCity: profileCity,
      avatar: profileAvatar,
    });

    if (!validation.success) {
      setProfileError(validation.error.errors[0]?.message || 'Please verify form fields');
      return;
    }

    if (!userSession) return;

    const updatedSession = {
      ...userSession,
      name: validation.data.name,
      phone: validation.data.phone,
      city: `${validation.data.preferredCity}, Rajasthan`,
      avatar: validation.data.avatar || '',
    };

    setUserSession(updatedSession);
    localStorage.setItem('shreeniwas_user_session', JSON.stringify(updatedSession));
    sessionStorage.setItem('shreeniwas_user_session', JSON.stringify(updatedSession));

    // Update in registered users repository
    try {
      const rawRegistered = localStorage.getItem('shreeniwas_registered_users');
      if (rawRegistered) {
        const registered = JSON.parse(rawRegistered);
        const updatedList = registered.map((u: any) => {
          if (u.email.toLowerCase() === userSession.email.toLowerCase()) {
            return {
              ...u,
              name: validation.data.name,
              phone: validation.data.phone,
              preferredCity: validation.data.preferredCity,
              avatar: validation.data.avatar || '',
            };
          }
          return u;
        });
        localStorage.setItem('shreeniwas_registered_users', JSON.stringify(updatedList));
      }
    } catch (e) {}

    setProfileSuccess('Profile information updated successfully!');
    setTimeout(() => setProfileSuccess(''), 4000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    setPasswordLoading(true);

    const validation = PasswordChangeSchema.safeParse({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    if (!validation.success) {
      setPasswordError(validation.error.errors[0]?.message || 'Please fix the errors below');
      setPasswordLoading(false);
      return;
    }

    try {
      const rawRegistered = localStorage.getItem('shreeniwas_registered_users');
      let registered = rawRegistered ? JSON.parse(rawRegistered) : [];
      const userIndex = registered.findIndex((u: any) => u.email.toLowerCase() === userSession?.email.toLowerCase());

      if (userIndex !== -1) {
        const storedPass = registered[userIndex].password;
        const matches = await comparePassword(currentPassword, storedPass);
        if (!matches) {
          setPasswordError('Current password entered is incorrect.');
          setPasswordLoading(false);
          return;
        }

        // Hash new password using bcrypt
        const hashedNew = await hashPassword(newPassword);
        registered[userIndex].password = hashedNew;
        localStorage.setItem('shreeniwas_registered_users', JSON.stringify(registered));
      }

      setPasswordSuccess('Password successfully updated with bcrypt encryption!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setPasswordSuccess(''), 4000);

    } catch (err: any) {
      setPasswordError('Failed to change password. Please try again.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfileAvatar(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading || !userSession) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin mx-auto"></div>
          <p className="text-[#C9A96E] font-serif text-lg font-bold">Verifying Access...</p>
          <p className="text-slate-400 text-xs">Redirecting to secure login if unauthenticated.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* User Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0A1628] flex items-center justify-center text-[#C9A96E] font-serif font-bold text-2xl border-2 border-[#C9A96E] shrink-0 shadow-lg overflow-hidden relative">
              {profileAvatar ? (
                <img src={profileAvatar} alt={userSession.name} className="w-full h-full object-cover" />
              ) : (
                userSession?.name?.charAt(0) || "U"
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1628]">{userSession?.name || "User Profile"}</h1>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified User
                </span>
              </div>
              <p className="text-slate-500 text-sm mt-1 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#C9A96E]" /> {userSession?.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#C9A96E]" /> {userSession?.phone}</span>
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-[#0A1628] text-[#C9A96E] text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                  {userSession?.role || "Property Seeker"}
                </span>
                <span className="text-xs text-slate-400 font-medium">• Member since {userSession?.memberSince || "Oct 2024"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link href="/properties" className="flex-1 md:flex-none">
              <button className="w-full px-5 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl hover:bg-[#0A1628]/90 transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer">
                <Building2 className="w-4 h-4" /> Browse Properties
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-3">
          {[
            { id: 'favorites', label: `Saved Favorites (${savedList.length})`, icon: Heart },
            { id: 'visits', label: `Scheduled VIP Visits (${vipVisits.length})`, icon: Calendar },
            { id: 'profile', label: 'My Account Settings', icon: User },
            { id: 'security', label: 'Security & Password', icon: Lock },
            { id: 'notifications', label: 'Property Alerts & SMS', icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0A1628] text-[#C9A96E] shadow-md border border-[#C9A96E]/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#C9A96E]' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Saved Favorites */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#0A1628]">Your Shortlisted & Saved Properties</h3>
                <p className="text-xs text-slate-500">Easily compare and book site visits for your favorited homes</p>
              </div>
            </div>

            {savedList.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto my-8">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-lg font-serif font-bold text-[#0A1628]">No Saved Properties Yet</h4>
                <p className="text-xs text-slate-500 mt-1 mb-6">Browse listings and click the heart icon on any property to save it here.</p>
                <Link href="/properties">
                  <button className="px-6 py-3 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl shadow-md cursor-pointer">
                    Explore Properties
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedList.map((prop) => (
                  <div key={prop.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden p-2">
                        <div className="relative h-full w-full rounded-2xl overflow-hidden">
                          <Image src={prop.image} alt={prop.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <button
                            onClick={() => removeFavorite(prop.id)}
                            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-rose-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif font-bold text-[#0A1628] text-base group-hover:text-[#C9A96E] transition-colors">{prop.title}</h4>
                          <span className="text-sm font-bold text-[#C9A96E] whitespace-nowrap">{prop.price}</span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" /> {prop.location}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 flex gap-2">
                      <Link href={`/properties/${prop.slug}`} className="flex-1">
                        <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0A1628] font-bold text-xs rounded-xl transition-colors cursor-pointer">
                          View Details
                        </button>
                      </Link>
                      <a
                        href={`https://wa.me/916376117833?text=Namaste%20Shree%20Niwas%2C%20I%20want%20to%20visit%20${encodeURIComponent(prop.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Scheduled VIP Visits */}
        {activeTab === 'visits' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#0A1628]">Scheduled Property Walkthroughs</h3>
                <p className="text-xs text-slate-500">Track and manage your scheduled on-site inspections</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                      <th className="p-4 pl-6">Visit ID</th>
                      <th className="p-4">Property</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Assigned Agent</th>
                      <th className="p-4">Fee Status</th>
                      <th className="p-4 text-right pr-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {vipVisits.map((visit) => (
                      <tr key={visit.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 pl-6 font-mono font-bold text-slate-500">
                          <span>{visit.id}</span>
                          {visit.utrNumber && (
                            <span className="block text-[9px] text-emerald-700 font-mono font-semibold">
                              UTR: {visit.utrNumber}
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-[#0A1628]">{visit.property}</p>
                          <p className="text-[10px] text-slate-400">{visit.location}</p>
                        </td>
                        <td className="p-4 font-semibold text-slate-700">{visit.date}</td>
                        <td className="p-4 font-medium text-slate-800">{visit.agent}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#C9A96E]/15 text-[#0A1628] border border-[#C9A96E]/30">
                            {visit.fee}
                          </span>
                        </td>
                        <td className="p-4 text-right pr-6">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {visit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Account Profile Settings */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#0A1628] pb-3 border-b border-slate-100">Update Profile Details</h3>

            {profileError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{profileError}</span>
              </div>
            )}

            {profileSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{profileSuccess}</span>
              </div>
            )}
            
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Profile Photo / Avatar</label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0A1628] text-[#C9A96E] font-bold flex items-center justify-center border border-slate-200 overflow-hidden shrink-0">
                    {profileAvatar ? <img src={profileAvatar} alt="Avatar" className="w-full h-full object-cover" /> : <User className="w-6 h-6" />}
                  </div>
                  <div className="space-y-1">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#0A1628] rounded-xl text-xs font-bold cursor-pointer transition-colors">
                      <Camera className="w-3.5 h-3.5 text-[#C9A96E]" /> Upload Photo
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                    </label>
                    <p className="text-[11px] text-slate-400">JPG, PNG or GIF up to 2MB.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address (Read-Only)</label>
                <input 
                  type="email" 
                  disabled
                  value={userSession?.email || ""}
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-500 cursor-not-allowed" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred City in Rajasthan</label>
                <select 
                  value={profileCity} 
                  onChange={(e) => setProfileCity(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                >
                  <option value="Jaipur">Jaipur</option>
                  <option value="Udaipur">Udaipur</option>
                  <option value="Jodhpur">Jodhpur</option>
                  <option value="Kota">Kota</option>
                  <option value="Ajmer">Ajmer</option>
                  <option value="Bikaner">Bikaner</option>
                </select>
              </div>

              <button type="submit" className="px-6 py-3 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl shadow-md hover:bg-[#14233c] cursor-pointer">
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Security & Password Management */}
        {activeTab === 'security' && (
          <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#0A1628]">Password & Account Security</h3>
              <p className="text-xs text-slate-500">Update your account password and manage authorized login sessions</p>
            </div>

            {passwordError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Current Password</label>
                <input 
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">New Password</label>
                <input 
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 characters, 1 uppercase, 1 digit"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Confirm New Password</label>
                <input 
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-0.5">
                <span className="font-bold text-slate-700 block">Password Guidelines:</span>
                <div>• Minimum 8 characters</div>
                <div>• At least 1 uppercase character & 1 number</div>
              </div>

              <button 
                type="submit" 
                disabled={passwordLoading}
                className="px-6 py-3 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl shadow-md hover:bg-[#14233c] cursor-pointer flex items-center gap-2"
              >
                {passwordLoading ? (
                  <div className="w-4 h-4 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-3.5 h-3.5" />
                    Update Password
                  </>
                )}
              </button>
            </form>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h4 className="text-sm font-bold text-[#0A1628]">Session Management</h4>
              <p className="text-xs text-slate-500">Sign out of all sessions across mobile, desktop, and other devices.</p>
              <button
                type="button"
                onClick={handleRevokeAllSessions}
                className="px-4 py-2.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
              >
                Sign Out of All Devices
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Notifications & Alerts Settings */}
        {activeTab === 'notifications' && (
          <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#0A1628] pb-3 border-b border-slate-100">Notification & Listing Alerts</h3>
            
            <div className="space-y-4 text-sm text-slate-700">
              <label className="flex items-start justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                <div>
                  <p className="font-bold text-[#0A1628]">WhatsApp Instant Listing Alerts</p>
                  <p className="text-xs text-slate-500 mt-0.5">Receive immediate WhatsApp updates when new properties match your budget in Jaipur/Udaipur.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-[#C9A96E]" />
              </label>

              <label className="flex items-start justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                <div>
                  <p className="font-bold text-[#0A1628]">SMS Price Drop Notifications</p>
                  <p className="text-xs text-slate-500 mt-0.5">Get notified if any of your saved favorite properties drop in price.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-[#C9A96E]" />
              </label>

              <label className="flex items-start justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                <div>
                  <p className="font-bold text-[#0A1628]">Weekly Rajasthan Market Report</p>
                  <p className="text-xs text-slate-500 mt-0.5">Receive weekly insights on ₹/sq.ft price trends and RERA policy updates.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-[#C9A96E]" />
              </label>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
