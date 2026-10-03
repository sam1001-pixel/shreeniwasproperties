"use client";

import { useState } from "react";
import { Building2, Users, FileText, TrendingUp, Search, Bell, Check, X, MoreVertical } from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const metrics = [
    { label: "Total Listings", value: "1,248", trend: "+12%", trendUp: true, icon: <Building2 className="w-5 h-5" /> },
    { label: "Active Users", value: "8,542", trend: "+24%", trendUp: true, icon: <Users className="w-5 h-5" /> },
    { label: "Pending Approvals", value: "34", trend: "-5%", trendUp: false, icon: <FileText className="w-5 h-5" /> },
    { label: "Revenue (MTD)", value: "₹4.2Cr", trend: "+18%", trendUp: true, icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const properties = [
    { id: "PROP-001", title: "Royal Heritage Villa", location: "Bani Park, Jaipur", price: "₹4.5 Cr", owner: "Vikram S.", status: "Pending" },
    { id: "PROP-002", title: "Modern Sky Penthouse", location: "C-Scheme, Jaipur", price: "₹2.8 Cr", owner: "Anita D.", status: "Pending" },
    { id: "PROP-003", title: "Lakeview Apartment", location: "Fateh Sagar, Udaipur", price: "₹1.9 Cr", owner: "Rahul M.", status: "Approved" },
    { id: "PROP-004", title: "Commercial Plaza Space", location: "Vaishali Nagar, Jaipur", price: "₹5.2 Cr", owner: "Sanjay K.", status: "Rejected" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0A1628] text-white p-6 shrink-0">
        <div className="flex items-center space-x-2 mb-10">
          <Building2 className="w-8 h-8 text-[#C9A96E]" />
          <span className="text-xl font-serif font-bold">Admin Panel</span>
        </div>
        <nav className="space-y-2">
          {["overview", "listings", "users", "inquiries"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-md transition ${activeTab === tab ? "bg-[#C9A96E] text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-gray-900 capitalize">{activeTab}</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]" />
            </div>
            <button className="p-2 bg-white border border-gray-200 rounded-md text-gray-600 hover:text-[#0A1628]">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0A1628] to-[#C9A96E]"></div>
          </div>
        </header>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-[#FDFBF7] rounded-lg text-[#C9A96E]">{metric.icon}</div>
                    <span className={`text-sm font-medium ${metric.trendUp ? 'text-green-600' : 'text-red-500'}`}>{metric.trend}</span>
                  </div>
                  <div className="text-gray-500 text-sm mb-1">{metric.label}</div>
                  <div className="text-3xl font-semibold text-gray-900">{metric.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Property Approval Queue</h2>
                <button className="text-sm text-[#C9A96E] font-medium hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm">
                      <th className="px-6 py-4 font-medium">Property ID</th>
                      <th className="px-6 py-4 font-medium">Title & Location</th>
                      <th className="px-6 py-4 font-medium">Price</th>
                      <th className="px-6 py-4 font-medium">Owner</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {properties.map((prop, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">{prop.id}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{prop.title}</div>
                          <div className="text-gray-500 text-xs mt-1">{prop.location}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{prop.price}</td>
                        <td className="px-6 py-4 text-gray-500">{prop.owner}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium
                            ${prop.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                              prop.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                              'bg-red-100 text-red-700'}`}>
                            {prop.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {prop.status === 'Pending' ? (
                            <div className="flex justify-end space-x-2">
                              <button className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition" title="Approve">
                                <Check className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition" title="Reject">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 transition">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Placeholders for other tabs */}
        {activeTab !== "overview" && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
            <h3 className="text-xl font-medium text-gray-400">Content for {activeTab} coming soon.</h3>
          </div>
        )}
      </main>
    </div>
  );
}
