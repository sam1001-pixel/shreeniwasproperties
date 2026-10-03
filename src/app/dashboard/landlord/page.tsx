'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Eye, Inbox, DollarSign, Plus, Edit, Trash2, Settings, MessageSquare, TrendingUp, CheckCircle, Clock } from "lucide-react";

export default function LandlordDashboard() {
  const [properties, setProperties] = useState([
    { id: 1, title: 'Luxury 3 BHK Apartment', locality: 'Vaishali Nagar, Jaipur', status: 'Active', price: '₹45,000/mo', views: 342, inquiries: 18 },
    { id: 2, title: 'Independent Villa', locality: 'Shastri Nagar, Jodhpur', status: 'Pending Approval', price: '₹1.85 Cr', views: 89, inquiries: 5 },
    { id: 3, title: 'Commercial Office Space', locality: 'C-Scheme, Jaipur', status: 'Active', price: '₹1.2 L/mo', views: 512, inquiries: 24 }
  ]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold font-serif text-[#0A1628]">Owner & Landlord Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your property listings, view inquiry leads, and track performance.</p>
          </div>
          <Link
            href="/dashboard/landlord/properties/new"
            className="inline-flex items-center justify-center gap-2 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-semibold px-6 py-3 rounded-xl transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add New Property
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Listed Properties</p>
              <h3 className="text-3xl font-bold text-[#0A1628] mt-2">3</h3>
              <span className="text-xs text-green-600 flex items-center mt-2 font-medium"><TrendingUp className="w-3 h-3 mr-1" /> 2 Active</span>
            </div>
            <div className="p-3 bg-[#0A1628]/5 text-[#0A1628] rounded-xl"><Home className="w-6 h-6" /></div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <h3 className="text-3xl font-bold text-[#0A1628] mt-2">943</h3>
              <span className="text-xs text-green-600 flex items-center mt-2 font-medium"><TrendingUp className="w-3 h-3 mr-1" /> +24% this week</span>
            </div>
            <div className="p-3 bg-[#C9A96E]/10 text-[#C9A96E] rounded-xl"><Eye className="w-6 h-6" /></div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Inquiry Leads</p>
              <h3 className="text-3xl font-bold text-[#0A1628] mt-2">47</h3>
              <span className="text-xs text-amber-600 flex items-center mt-2 font-medium"><Clock className="w-3 h-3 mr-1" /> 8 New today</span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Inbox className="w-6 h-6" /></div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Est. Rental Earnings</p>
              <h3 className="text-3xl font-bold text-[#0A1628] mt-2">₹1.65 L</h3>
              <span className="text-xs text-green-600 flex items-center mt-2 font-medium"><CheckCircle className="w-3 h-3 mr-1" /> On Track</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
          </div>
        </div>

        {/* Property Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-serif text-[#0A1628]">My Property Listings</h3>
              <p className="text-sm text-gray-500">Manage and update your active properties across Rajasthan.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                  <th className="py-4 px-6">Property</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Views</th>
                  <th className="py-4 px-6">Inquiries</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-[#0A1628]">{property.title}</p>
                      <p className="text-xs text-gray-500">{property.locality}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        property.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-[#0A1628]">{property.price}</td>
                    <td className="py-4 px-6 text-gray-600">{property.views}</td>
                    <td className="py-4 px-6 text-gray-600">{property.inquiries}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button className="p-2 text-gray-500 hover:text-[#0A1628] transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-500 hover:text-rose-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
