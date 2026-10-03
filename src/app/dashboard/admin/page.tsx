'use client';

import React from 'react';
import { Building, Users, AlertCircle, IndianRupee, CheckCircle, XCircle, Plus, Settings, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: "Total Properties", value: "1,200", icon: Building, trend: "+12% this month" },
    { label: "Active Inquiries", value: "85", icon: AlertCircle, trend: "Requires attention" },
    { label: "Registered Users", value: "450", icon: Users, trend: "+45 this week" },
    { label: "Monthly Revenue", value: "₹4.2L", icon: IndianRupee, trend: "+8% vs last month" },
  ];

  const pendingProperties = [
    { id: "PROP-091", title: "Luxury Villa in Civil Lines", owner: "Rajesh Kumar", type: "Sale", date: "Today, 10:30 AM" },
    { id: "PROP-092", title: "Commercial Space C-Scheme", owner: "Amit Sharma", type: "Rent", date: "Today, 09:15 AM" },
    { id: "PROP-093", title: "3BHK Apartment Mansarovar", owner: "Priya Singh", type: "Sale", date: "Yesterday" },
  ];

  const recentLeads = [
    { name: "Suresh Patel", inquiry: "Viewing request for PROP-045", status: "New", date: "1 hour ago" },
    { name: "Neha Gupta", inquiry: "Price negotiation on Villa", status: "In Progress", date: "3 hours ago" },
    { name: "Vikram Rathore", inquiry: "Looking for office space", status: "New", date: "5 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0A1628]">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Super Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 text-[#0A1628] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2">
            <FileText className="w-4 h-4" /> Reports
          </button>
          <button className="bg-[#0A1628] text-[#C9A96E] px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Property
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#0A1628]/5 rounded-lg text-[#0A1628]">
                <s.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{s.label}</h3>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-2xl font-bold text-[#0A1628]">{s.value}</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">{s.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Property Queue */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#0A1628]">Property Approval Queue</h2>
              <button className="text-sm text-[#C9A96E] font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-medium">Property</th>
                    <th className="p-4 font-medium">Owner</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {pendingProperties.map((prop, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="p-4">
                        <p className="font-bold text-[#0A1628]">{prop.title}</p>
                        <p className="text-xs text-gray-500">{prop.id}</p>
                      </td>
                      <td className="p-4 text-gray-700">{prop.owner}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                          {prop.type}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">{prop.date}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition" title="Approve">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition" title="Reject">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Leads */}
        <div className="space-y-8">
          {/* Quick Navigation */}
          <div className="bg-[#0A1628] rounded-xl border border-gray-800 shadow-sm overflow-hidden text-white">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-lg font-bold text-[#C9A96E]">Quick Navigation</h2>
            </div>
            <div className="p-2">
              <Link href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition text-sm">
                <Building className="w-4 h-4 text-gray-400" /> Manage Listings
              </Link>
              <Link href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition text-sm">
                <Users className="w-4 h-4 text-gray-400" /> Manage Users
              </Link>
              <Link href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition text-sm">
                <FileText className="w-4 h-4 text-gray-400" /> Add Blog Post
              </Link>
              <Link href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition text-sm">
                <Settings className="w-4 h-4 text-gray-400" /> System Settings
              </Link>
            </div>
          </div>

          {/* Recent Leads */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#0A1628]">Recent Inquiries</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {recentLeads.map((lead, i) => (
                <div key={i} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-sm text-[#0A1628]">{lead.name}</p>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${lead.status === 'New' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-1">{lead.inquiry}</p>
                  <p className="text-[10px] text-gray-400 mt-2">{lead.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
