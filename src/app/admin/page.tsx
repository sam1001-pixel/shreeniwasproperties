'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Building2, FileText, Users, CreditCard, Settings, 
  Search, Bell, MoreVertical, Plus, CheckCircle2, XCircle, Edit, Trash2, 
  MapPin, Phone, Mail, Globe, Crown, Shield, Eye
} from 'lucide-react';
import Link from 'next/link';

// Mock Data
const OVERVIEW_STATS = [
  { title: "Total Properties", value: "1,240", change: "+12% this month", icon: Building2 },
  { title: "Total Revenue", value: "₹14.8 Lakh", change: "+8% this month", icon: CreditCard },
  { title: "Paid Site Visits", value: "142", change: "+24% this month", icon: MapPin },
  { title: "Active Subscribers", value: "3,450", change: "+18% this month", icon: Users },
];

const PROPERTIES = [
  { id: "PROP-001", title: "Luxury Villa in Mansarovar", location: "Jaipur", price: "₹2.5 Cr", status: "Active", type: "Sale" },
  { id: "PROP-002", title: "3BHK Apartment C-Scheme", location: "Jaipur", price: "₹45,000/mo", status: "Pending", type: "Rent" },
  { id: "PROP-003", title: "Commercial Space", location: "Udaipur", price: "₹1.2 Cr", status: "Sold", type: "Sale" },
  { id: "PROP-004", title: "Heritage Haveli", location: "Jodhpur", price: "₹5.5 Cr", status: "Active", type: "Sale" },
  { id: "PROP-005", title: "2BHK Flat Vaishali Nagar", location: "Jaipur", price: "₹18,000/mo", status: "Rented", type: "Rent" },
];

const USERS = [
  { id: 1, name: "Rahul Sharma", role: "Agent", email: "rahul@example.com", status: "Verified" },
  { id: 2, name: "Priya Singh", role: "Landlord", email: "priya@example.com", status: "Pending" },
  { id: 3, name: "Amit Kumar", role: "Seeker", email: "amit@example.com", status: "Verified" },
  { id: 4, name: "Neha Verma", role: "Agent", email: "neha@example.com", status: "Verified" },
];

const INQUIRIES = [
  { id: "INQ-101", user: "Vikram Rathore", phone: "+91 9876543210", property: "PROP-001", type: "Paid Visit (₹499)", status: "Paid" },
  { id: "INQ-102", user: "Suresh Saini", phone: "+91 8765432109", property: "PROP-002", type: "General Inquiry", status: "Contacted" },
  { id: "INQ-103", user: "Kiran Meena", phone: "+91 7654321098", property: "PROP-004", type: "Paid Visit (₹499)", status: "Pending" },
];

const BLOGS = [
  { id: 1, title: "Top 10 Investment Locations in Jaipur 2024", category: "Investment", status: "Published", date: "Oct 12, 2023" },
  { id: 2, title: "Understanding RERA Guidelines", category: "Legal", status: "Draft", date: "Oct 15, 2023" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'properties', label: 'Manage Properties', icon: Building2 },
    { id: 'blogs', label: 'Blog & Content', icon: FileText },
    { id: 'users', label: 'Users & Verification', icon: Users },
    { id: 'inquiries', label: 'Leads & Visits', icon: CreditCard },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#0A1628] text-white flex-shrink-0 relative md:fixed h-auto md:h-full z-10">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 group mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center border border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors">
              <Building2 className="w-5 h-5 text-[#C9A96E]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold text-[#C9A96E] leading-tight">Shreeniwas</span>
              <span className="text-sm font-bold text-white uppercase tracking-wider">Master Admin</span>
            </div>
          </Link>

          <nav className="flex overflow-x-auto no-scrollbar gap-2 border-b border-white/10 pb-2 md:space-y-2 md:flex-col md:overflow-visible md:border-none md:pb-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-[#C9A96E]/10 text-[#C9A96E] font-medium border border-[#C9A96E]/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-[#C9A96E]' : ''}`} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-auto py-4 px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#0A1628]">
              {navItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-sm text-slate-500">Master Admin Panel - Shreeniwas Properties</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-base sm:text-sm w-full sm:w-64 focus:ring-2 focus:ring-[#C9A96E] outline-none"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-[#0A1628] transition-colors rounded-full hover:bg-slate-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 rounded-full bg-[#0A1628] flex items-center justify-center border border-[#C9A96E]">
                <Crown className="w-5 h-5 text-[#C9A96E]" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-[#0A1628]">Super Admin</p>
                <p className="text-xs text-slate-500">admin@shreeniwas.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'properties' && <PropertiesTab />}
              {activeTab === 'blogs' && <BlogsTab />}
              {activeTab === 'users' && <UsersTab />}
              {activeTab === 'inquiries' && <InquiriesTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Sub-components for Tabs

function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {OVERVIEW_STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0A1628]/5 flex items-center justify-center text-[#0A1628]">
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-[#0A1628] mt-1">{stat.value}</h3>
              <p className="text-xs font-medium text-emerald-600 mt-1">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Feed Placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-[#0A1628] mb-6">Recent Platform Activity</h3>
        <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-slate-200">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4 relative">
              <div className="w-10 h-10 rounded-full bg-slate-100 border-4 border-white flex flex-shrink-0 items-center justify-center z-10">
                <Bell className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0A1628]">New property listed in Jaipur</p>
                <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertiesTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <input type="text" placeholder="Search properties..." className="px-4 py-2 border border-slate-200 rounded-lg text-base sm:text-sm w-full sm:w-64 focus:ring-2 focus:ring-[#C9A96E] outline-none" />
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-base sm:text-sm bg-white outline-none focus:ring-2 focus:ring-[#C9A96E]">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Sold/Rented</option>
          </select>
        </div>
        <button className="flex items-center gap-2 bg-[#0A1628] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0A1628]/90 transition-colors shadow-md shadow-[#0A1628]/20">
          <Plus className="w-4 h-4" />
          Create New Property
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
              <th className="px-6 py-4 font-medium">Property</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {PROPERTIES.map((prop) => (
              <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-200 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-[#0A1628]">{prop.title}</p>
                      <p className="text-xs text-slate-500">{prop.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{prop.location}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#0A1628]">{prop.price}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    {prop.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    prop.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                    prop.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {prop.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded bg-slate-50 hover:bg-emerald-50 transition-colors" title="Approve/Feature">
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-[#0A1628] rounded bg-slate-50 hover:bg-slate-100 transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-600 rounded bg-slate-50 hover:bg-rose-50 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BlogsTab() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-[#0A1628] mb-6">Create New Post</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Post Title</label>
              <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#C9A96E]" placeholder="Enter title..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#C9A96E] bg-white">
                  <option>Investment</option>
                  <option>Legal</option>
                  <option>Architecture</option>
                  <option>Market Trends</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image URL</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#C9A96E]" placeholder="https://..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
              <textarea className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#C9A96E] resize-none h-20" placeholder="Short description..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
              <textarea className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#C9A96E] resize-none h-64 font-mono text-sm" placeholder="Write markdown content here..."></textarea>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button type="button" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Save as Draft</button>
              <button type="button" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#C9A96E] hover:bg-[#b59760] transition-colors shadow-md shadow-[#C9A96E]/20">Publish Post</button>
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-[#0A1628]">Recent Posts</h3>
        <div className="space-y-4">
          {BLOGS.map((blog) => (
            <div key={blog.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3">
              <div>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${
                  blog.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {blog.status}
                </span>
                <h4 className="font-semibold text-[#0A1628] leading-snug">{blog.title}</h4>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                  <span>{blog.date}</span> • <span>{blog.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button className="flex-1 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded transition-colors">Edit</button>
                <button className="flex-1 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <input type="text" placeholder="Search users by name, email..." className="px-4 py-2 border border-slate-200 rounded-lg text-sm w-72 focus:ring-2 focus:ring-[#C9A96E] outline-none" />
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-base sm:text-sm bg-white outline-none focus:ring-2 focus:ring-[#C9A96E]">
            <option>All Roles</option>
            <option>Seeker</option>
            <option>Landlord</option>
            <option>Agent</option>
            <option>Admin</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Verification</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {USERS.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0A1628]">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select className="text-sm bg-transparent border border-slate-200 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-[#C9A96E]" defaultValue={user.role}>
                    <option>Seeker</option>
                    <option>Landlord</option>
                    <option>Agent</option>
                    <option>Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                      user.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {user.status === 'Verified' && <Shield className="w-3 h-3" />}
                      {user.status}
                    </span>
                    {user.status !== 'Verified' && (
                      <button className="text-[10px] uppercase font-bold text-[#C9A96E] hover:underline">Verify Now</button>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm text-slate-500 hover:text-[#0A1628] font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InquiriesTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-[#0A1628]">All Inquiries & Visits</h3>
        <select className="px-4 py-2 border border-slate-200 rounded-lg text-base sm:text-sm bg-white outline-none focus:ring-2 focus:ring-[#C9A96E]">
          <option>All Types</option>
          <option>Paid Visits</option>
          <option>General</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
              <th className="px-6 py-4 font-medium">Inquiry ID</th>
              <th className="px-6 py-4 font-medium">User Details</th>
              <th className="px-6 py-4 font-medium">Property</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {INQUIRIES.map((inq) => (
              <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-mono text-slate-500">{inq.id}</td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-[#0A1628] text-sm">{inq.user}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3"/>{inq.phone}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#C9A96E] font-medium hover:underline cursor-pointer flex items-center gap-1">
                    {inq.property} <Eye className="w-3 h-3"/>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    inq.type.includes('Paid') ? 'bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {inq.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    inq.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                    inq.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {inq.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-medium text-[#0A1628] bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded transition-colors">
                    Mark Done
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="max-w-4xl bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
        <Settings className="w-6 h-6 text-[#C9A96E]" />
        <h2 className="text-xl font-bold text-[#0A1628]">Platform Settings</h2>
      </div>

      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">General Information</h4>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Brand Name</label>
              <input type="text" defaultValue="Shreeniwas Properties" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#C9A96E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">RERA Registration Number</label>
              <input type="text" defaultValue="RAJ/P/2024/XXXX" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#C9A96E]" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">Contact Details</h4>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
              <input type="email" defaultValue="support@shreeniwas.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#C9A96E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Primary Phone</label>
              <input type="text" defaultValue="+91 99999 99999" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#C9A96E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label>
              <input type="text" defaultValue="+91 99999 99999" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#C9A96E]" />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">Monetization</h4>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Paid Visit Fee (₹)</label>
            <input type="number" defaultValue="499" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#C9A96E]" />
            <p className="text-xs text-slate-500 mt-1">Amount charged to users for scheduling a priority site visit.</p>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
          <button type="button" className="px-6 py-2.5 rounded-lg text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Discard Changes</button>
          <button type="button" className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0A1628] hover:bg-[#0A1628]/90 transition-colors shadow-lg shadow-[#0A1628]/20">Save Settings</button>
        </div>
      </form>
    </div>
  );
}
