'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, Heart, Send, Calendar, ArrowRight, Building2, MapPin, 
  Phone, Mail, ShieldCheck, LogOut, Trash2, Eye, Bell, Settings, 
  Crown, Sparkles, CheckCircle2, Clock
} from 'lucide-react';
import Image from 'next/image';

const MOCK_SAVED_PROPERTIES = [
  {
    id: "1",
    slug: "royal-heritage-residency-jaipur",
    title: "The Royal Heritage Residency",
    location: "Vaishali Nagar, Jaipur",
    price: "₹3.5 Cr",
    sqft: "3,200 sq.ft",
    bhk: "4 BHK",
    type: "Luxury Villa",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600",
    reraApproved: true
  },
  {
    id: "2",
    slug: "lakeview-palace-heights-udaipur",
    title: "Lakeview Palace Heights",
    location: "Fatehpura, Udaipur",
    price: "₹1.8 Cr",
    sqft: "2,200 sq.ft",
    bhk: "3 BHK",
    type: "Penthouse Apartment",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
    reraApproved: true
  },
  {
    id: "4",
    slug: "shreeniwas-prime-enclave-jaipur",
    title: "Shreeniwas Prime Enclave",
    location: "Mansarovar, Jaipur",
    price: "₹85 Lakh",
    sqft: "1,500 sq.ft",
    bhk: "3 BHK",
    type: "Modern Apartment",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600",
    reraApproved: true
  }
];

const MOCK_VIP_VISITS = [
  {
    id: "VISIT-901",
    property: "The Royal Heritage Residency",
    location: "Vaishali Nagar, Jaipur",
    date: "Oct 15, 2024 (11:00 AM)",
    agent: "Rajesh Rathore (+91 9876543210)",
    fee: "₹499 Paid",
    status: "Confirmed & Scheduled"
  },
  {
    id: "VISIT-804",
    property: "Lakeview Palace Heights",
    location: "Fatehpura, Udaipur",
    date: "Oct 18, 2024 (3:30 PM)",
    agent: "Ananya Sharma (+91 8765432109)",
    fee: "₹499 Paid",
    status: "Cab Pickup Assigned"
  }
];

export default function UserProfileDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'favorites' | 'visits' | 'profile' | 'notifications'>('favorites');
  const [savedList, setSavedList] = useState(MOCK_SAVED_PROPERTIES);
  const [userSession, setUserSession] = useState<{
    name: string;
    email: string;
    role: string;
    phone: string;
    city: string;
    memberSince: string;
  } | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('shreeniwas_user_session') || sessionStorage.getItem('shreeniwas_user_session');
    if (session) {
      try {
        setUserSession(JSON.parse(session));
      } catch (e) {
        // Fallback default
        setUserSession({
          name: "Vikram Sharma",
          email: "vikram@shreeniwasproperties.com",
          role: "Property Seeker",
          phone: "+91 98765 43210",
          city: "Jaipur, Rajasthan",
          memberSince: "Oct 2024"
        });
      }
    } else {
      // Default session if directly visiting page
      setUserSession({
        name: "Rahul Verma",
        email: "rahul@shreeniwasproperties.com",
        role: "Property Seeker",
        phone: "+91 98765 43210",
        city: "Jaipur, Rajasthan",
        memberSince: "Oct 2024"
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('shreeniwas_user_session');
    sessionStorage.removeItem('shreeniwas_user_session');
    router.push('/login');
  };

  const removeFavorite = (id: string) => {
    setSavedList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* User Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0A1628] flex items-center justify-center text-[#C9A96E] font-serif font-bold text-2xl border-2 border-[#C9A96E] flex-shrink-0 shadow-lg">
              {userSession?.name?.charAt(0) || "U"}
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
              <button className="w-full px-5 py-2.5 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl hover:bg-[#0A1628]/90 transition-all shadow-md flex items-center justify-center gap-1.5">
                <Building2 className="w-4 h-4" /> Browse Properties
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-3">
          {[
            { id: 'favorites', label: `Saved Favorites (${savedList.length})`, icon: Heart },
            { id: 'visits', label: `Scheduled VIP Visits (${MOCK_VIP_VISITS.length})`, icon: Calendar },
            { id: 'profile', label: 'My Account Settings', icon: User },
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
                  <button className="px-6 py-3 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl shadow-md">
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
                            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-rose-500 hover:bg-white shadow transition-colors"
                            title="Remove from Saved"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-5 pt-2">
                        <span className="text-[10px] font-bold text-[#C9A96E] uppercase tracking-wider">{prop.type}</span>
                        <h4 className="text-base font-serif font-bold text-[#0A1628] line-clamp-1 mt-0.5">{prop.title}</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" /> {prop.location}
                        </p>

                        <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl text-slate-700 font-semibold mb-4">
                          <span>{prop.bhk}</span>
                          <span>{prop.sqft}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <span className="text-lg font-bold text-[#0A1628]">{prop.price}</span>
                      <Link href={`/properties/${prop.slug}`}>
                        <button className="px-4 py-2 bg-[#0A1628] text-white text-xs font-bold rounded-xl flex items-center gap-1">
                          View Details <ArrowRight className="w-3.5 h-3.5 text-[#C9A96E]" />
                        </button>
                      </Link>
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
            <div>
              <h3 className="text-xl font-serif font-bold text-[#0A1628]">Your Scheduled VIP Site Visits</h3>
              <p className="text-xs text-slate-500">Guaranteed dedicated cab walkthroughs and paperwork verification</p>
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
                    {MOCK_VIP_VISITS.map((visit) => (
                      <tr key={visit.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 pl-6 font-mono font-bold text-slate-500">{visit.id}</td>
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
            
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={userSession?.name || "Rahul Verma"}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={userSession?.email || "rahul@example.com"}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                <input 
                  type="text" 
                  defaultValue={userSession?.phone || "+91 9876543210"}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred City in Rajasthan</label>
                <select defaultValue="Jaipur" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]">
                  <option>Jaipur</option>
                  <option>Udaipur</option>
                  <option>Jodhpur</option>
                  <option>Kota</option>
                  <option>Ajmer</option>
                </select>
              </div>

              <button type="button" className="px-6 py-3 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl shadow-md">
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Notifications & Alerts Settings */}
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
