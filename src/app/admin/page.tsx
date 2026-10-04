'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Building2, FileText, Users, CreditCard, Settings, 
  Search, Bell, MoreVertical, Plus, CheckCircle2, XCircle, Edit, Trash2, 
  MapPin, Phone, Mail, Globe, Crown, Shield, Eye, Lock, EyeOff, LogOut, KeyRound,
  Clock, CalendarCheck, MessageSquare, Send, Check, AlertCircle, ShieldAlert, Sparkles, UserCheck
} from 'lucide-react';
import Link from 'next/link';

// Business Stats
const OVERVIEW_STATS = [
  { title: "Total Properties", value: "1,240", change: "+12% this month", icon: Building2 },
  { title: "Total Revenue", value: "₹14.8 Lakh", change: "+8% this month", icon: CreditCard },
  { title: "Paid Site Visits (₹499)", value: "142", change: "+24% this month", icon: MapPin },
  { title: "Active Staff Admins", value: "8 Active", change: "100% Present Today", icon: Users },
];

const PROPERTIES = [
  { id: "PROP-001", title: "Luxury Villa in Mansarovar", location: "Jaipur", price: "₹2.5 Cr", status: "Active", type: "Sale" },
  { id: "PROP-002", title: "3BHK Apartment C-Scheme", location: "Jaipur", price: "₹45,000/mo", status: "Pending", type: "Rent" },
  { id: "PROP-003", title: "Commercial Space", location: "Udaipur", price: "₹1.2 Cr", status: "Sold", type: "Sale" },
  { id: "PROP-004", title: "Heritage Haveli", location: "Jodhpur", price: "₹5.5 Cr", status: "Active", type: "Sale" },
  { id: "PROP-005", title: "2BHK Flat Vaishali Nagar", location: "Jaipur", price: "₹18,000/mo", status: "Rented", type: "Rent" },
];

const USERS = [
  { id: 1, name: "Rahul Sharma", role: "Agent", email: "rahul@shreeniwasproperties.com", status: "Verified" },
  { id: 2, name: "Priya Singh", role: "Landlord", email: "priya@shreeniwasproperties.com", status: "Pending" },
  { id: 3, name: "Amit Kumar", role: "Seeker", email: "amit@shreeniwasproperties.com", status: "Verified" },
  { id: 4, name: "Neha Verma", role: "Agent", email: "neha@shreeniwasproperties.com", status: "Verified" },
];

// Inquiries & Query Desk Data
const INITIAL_INQUIRIES = [
  { id: "INQ-101", user: "Vikram Rathore", phone: "+91 9876543210", email: "vikram@gmail.com", property: "The Royal Heritage Residency", type: "Paid Visit (₹499)", status: "Paid", query: "Need cab pickup at 11 AM from Jaipur Airport.", reply: "Cab assigned with Driver Rajesh (+91 98765 11111)." },
  { id: "INQ-102", user: "Suresh Saini", phone: "+91 8765432109", email: "suresh@gmail.com", property: "3BHK Apartment C-Scheme", type: "General Inquiry", status: "Pending", query: "What is the monthly maintenance fee?", reply: "" },
  { id: "INQ-103", user: "Kiran Meena", phone: "+91 7654321098", email: "kiran@gmail.com", property: "Heritage Haveli Jodhpur", type: "Paid Visit (₹499)", status: "Pending", query: "Want to schedule a Sunday afternoon visit.", reply: "" },
];

// Admin Staff Attendance Data
const INITIAL_ATTENDANCE = [
  { id: "ATT-01", staffName: "Rajesh Rathore", role: "Senior Visit Coordinator", date: "Today", clockIn: "09:15 AM", clockOut: "In Shift", status: "Present (On Time)", hours: "6.5 hrs" },
  { id: "ATT-02", staffName: "Ananya Sharma", role: "Client Query Admin", date: "Today", clockIn: "09:28 AM", clockOut: "In Shift", status: "Present (On Time)", hours: "6.2 hrs" },
  { id: "ATT-03", staffName: "Vikram Singh", role: "Lead Verification Officer", date: "Today", clockIn: "10:05 AM", clockOut: "In Shift", status: "Late Entry", hours: "5.5 hrs" },
  { id: "ATT-04", staffName: "Pooja Gupta", role: "Documentation Specialist", date: "Today", clockIn: "--:--", clockOut: "--:--", status: "On Approved Leave", hours: "0 hrs" },
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

  // Inquiry Reply States
  const [inquiriesList, setInquiriesList] = useState(INITIAL_INQUIRIES);
  const [selectedInquiry, setSelectedInquiry] = useState<typeof INITIAL_INQUIRIES[0] | null>(null);
  const [replyText, setReplyText] = useState('');

  // Attendance Clock-in State
  const [attendanceList, setAttendanceList] = useState(INITIAL_ATTENDANCE);
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [clockInTime, setClockInTime] = useState('09:15 AM');

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
    setIsLoaded(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

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

    setLoginError('Invalid credentials. Use admin@shreeniwasproperties.com / admin123');
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

    setInquiriesList(prev => prev.map(item => 
      item.id === selectedInquiry.id ? { ...item, reply: replyText.trim(), status: 'Responded & Sent' } : item
    ));

    setSelectedInquiry(null);
    setReplyText('');
  };

  const toggleClockIn = () => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (!isClockedIn) {
      setIsClockedIn(true);
      setClockInTime(nowTime);
      setAttendanceList(prev => [
        {
          id: `ATT-${Date.now()}`,
          staffName: adminRole === 'super' ? "Super Admin" : "Ananya Sharma (Staff)",
          role: adminRole === 'super' ? "Super Administrator" : "Query Coordinator",
          date: "Today",
          clockIn: nowTime,
          clockOut: "In Shift",
          status: "Present (On Time)",
          hours: "0.1 hrs"
        },
        ...prev
      ]);
    } else {
      setIsClockedIn(false);
      setAttendanceList(prev => prev.map((item, idx) => idx === 0 ? { ...item, clockOut: nowTime } : item));
    }
  };

  const navItems = adminRole === 'super' ? [
    { id: 'overview', label: 'Business Overview', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties Inventory', icon: Building2 },
    { id: 'inquiries', label: 'Query & Lead Desk', icon: MessageSquare },
    { id: 'attendance', label: 'Staff Attendance System', icon: Clock },
    { id: 'users', label: 'Users & Verification', icon: Users },
    { id: 'blogs', label: 'Blog & Content', icon: FileText },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ] : [
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
            <p className="text-slate-300 text-xs">Real Estate Business Management System</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#C9A96E]/30 text-[#0A1628]">
            {/* Role Switcher */}
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
                    placeholder={selectedRoleType === 'super' ? "superadmin@shreeniwasproperties.com" : "admin@shreeniwasproperties.com"}
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
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
            <div className="w-9 h-9 rounded-xl bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E]">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-white">Shreeniwas Admin</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  adminRole === 'super' ? 'bg-[#C9A96E] text-[#0A1628]' : 'bg-blue-500 text-white'
                }`}>
                  {adminRole === 'super' ? 'SUPER ADMIN' : 'STAFF ADMIN'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Clock-In Quick Bar */}
            <button
              onClick={toggleClockIn}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isClockedIn ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {isClockedIn ? `Shift Active (${clockInTime})` : 'Clock In Now'}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
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
          {activeTab === 'overview' && adminRole === 'super' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {OVERVIEW_STATS.map((stat, i) => (
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
                  <button onClick={() => setActiveTab('attendance')} className="text-xs font-bold text-[#C9A96E] hover:underline">
                    View Full Attendance Logs →
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                    <p className="text-2xl font-extrabold text-emerald-800">7</p>
                    <p className="text-xs font-bold text-emerald-600">Present On Time</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                    <p className="text-2xl font-extrabold text-amber-800">1</p>
                    <p className="text-xs font-bold text-amber-600">Late Entry</p>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
                    <p className="text-2xl font-extrabold text-slate-700">1</p>
                    <p className="text-xs font-bold text-slate-500">On Approved Leave</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Attendance Management */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Admin Attendance Management</h3>
                  <p className="text-xs text-slate-500">Track daily shift clock-in times, staff hours, and leave approvals.</p>
                </div>

                <button
                  onClick={toggleClockIn}
                  className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                    isClockedIn ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  {isClockedIn ? 'Clock Out My Shift' : 'Clock In My Shift Now'}
                </button>
              </div>

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
                              att.status.includes('On Time') ? 'bg-emerald-100 text-emerald-800' :
                              att.status.includes('Late') ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
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
            </div>
          )}

          {/* Tab: Inquiries & Query Desk */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Query & Lead Desk</h3>
                  <p className="text-xs text-slate-500">Respond directly to visitor property inquiries and VIP visit bookings.</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                        <th className="p-4 pl-6">Client Details</th>
                        <th className="p-4">Property</th>
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
                            <p className="text-[10px] text-slate-400">{inq.phone}</p>
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
                              inq.status.includes('Paid') || inq.status.includes('Responded') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
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
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-serif font-bold text-[#0A1628]">Properties Inventory</h3>
                <Link href="/dashboard/landlord/properties/new">
                  <button className="px-4 py-2 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow">
                    <Plus className="w-4 h-4" /> Add Listing
                  </button>
                </Link>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[650px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                        <th className="p-4 pl-6">ID</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Type</th>
                        <th className="p-4 text-right pr-6">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {PROPERTIES.map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 pl-6 font-mono font-bold text-slate-500">{prop.id}</td>
                          <td className="p-4 font-bold text-[#0A1628]">{prop.title}</td>
                          <td className="p-4 text-slate-600">{prop.location}</td>
                          <td className="p-4 font-bold text-emerald-700">{prop.price}</td>
                          <td className="p-4 font-medium text-slate-600">{prop.type}</td>
                          <td className="p-4 text-right pr-6">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {prop.status}
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
        </main>
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl text-[#0A1628] space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-lg">Reply to Query ({selectedInquiry.user})</h4>
                <button onClick={() => setSelectedInquiry(null)} className="p-1 text-slate-400 hover:text-slate-700"><XCircle className="w-5 h-5" /></button>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <p><strong>Property:</strong> {selectedInquiry.property}</p>
                <p><strong>Customer Query:</strong> {selectedInquiry.query || "Callback requested"}</p>
              </div>

              <form onSubmit={handleSendReply} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Your Response Message</label>
                  <textarea
                    required
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type official response or driver assignment details..."
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setSelectedInquiry(null)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl shadow">Send Response</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
