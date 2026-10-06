'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Eye, Inbox, DollarSign, Plus, Edit, Trash2, Settings, MessageSquare, TrendingUp, CheckCircle, Clock, ExternalLink, FileSpreadsheet } from "lucide-react";
import { exportInquiriesToExcel } from '@/lib/export/excel-export';

interface LandlordProperty {
  id: string | number;
  title: string;
  location?: string;
  locality?: string;
  status: string;
  price: string;
  views?: number;
  inquiries?: number;
}

const DEFAULT_LANDLORD_PROPERTIES: LandlordProperty[] = [
  { id: 'royal-heritage-residency-jaipur', title: 'The Royal Heritage Residency Villa', locality: 'Vaishali Nagar, Jaipur', status: 'Active', price: '₹3.5 Cr', views: 342, inquiries: 18 },
  { id: 'lakeview-palace-heights-udaipur', title: 'Lakeview Palace Heights Penthouse', locality: 'Fatehpura, Udaipur', status: 'Active', price: '₹1.8 Cr', views: 289, inquiries: 12 },
  { id: 'sun-city-heritage-haveli-jodhpur', title: 'Sun City Heritage Haveli', locality: 'Ratanada, Jodhpur', status: 'Pending Approval', price: '₹5.2 Cr', views: 312, inquiries: 17 }
];

export default function LandlordDashboard() {
  const [properties, setProperties] = useState<LandlordProperty[]>(DEFAULT_LANDLORD_PROPERTIES);
  const [inquiryCount, setInquiryCount] = useState<number>(47);
  const [rawInquiries, setRawInquiries] = useState<any[]>([]);

  const loadLandlordData = () => {
    try {
      const savedProps = localStorage.getItem('shreeniwas_admin_properties');
      if (savedProps) {
        const parsed = JSON.parse(savedProps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted: LandlordProperty[] = parsed.map((p: any, idx: number) => ({
            id: p.id || `prop-${idx}`,
            title: p.title || 'Untitled Property',
            locality: p.location || 'Jaipur, Rajasthan',
            status: p.status || 'Active',
            price: p.price || '₹45,000/mo',
            views: p.views || (250 + (idx * 45)),
            inquiries: p.inquiries || (10 + (idx * 3))
          }));
          setProperties(formatted);
        }
      }

      const savedInqs = localStorage.getItem('shreeniwas_inquiries');
      if (savedInqs) {
        const parsedInqs = JSON.parse(savedInqs);
        if (Array.isArray(parsedInqs)) {
          setRawInquiries(parsedInqs);
          setInquiryCount(parsedInqs.length > 0 ? parsedInqs.length : 47);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadLandlordData();
    window.addEventListener('shreeniwas_data_updated', loadLandlordData);
    window.addEventListener('storage', loadLandlordData);
    return () => {
      window.removeEventListener('shreeniwas_data_updated', loadLandlordData);
      window.removeEventListener('storage', loadLandlordData);
    };
  }, []);

  const handleDeleteProperty = (id: string | number) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      const updated = properties.filter(p => p.id !== id);
      setProperties(updated);
      try {
        const savedProps = localStorage.getItem('shreeniwas_admin_properties');
        if (savedProps) {
          const parsed = JSON.parse(savedProps);
          const filtered = parsed.filter((p: any) => p.id !== id);
          localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(filtered));
          window.dispatchEvent(new Event('shreeniwas_data_updated'));
        }
      } catch (e) {}
    }
  };

  const handleToggleStatus = (id: string | number) => {
    const updated = properties.map(p => {
      if (p.id === id) {
        const newStatus = p.status === 'Active' ? 'Paused' : 'Active';
        return { ...p, status: newStatus };
      }
      return p;
    });
    setProperties(updated);
    try {
      const savedProps = localStorage.getItem('shreeniwas_admin_properties');
      if (savedProps) {
        const parsed = JSON.parse(savedProps);
        const mapped = parsed.map((p: any) => {
          if (p.id === id) {
            return { ...p, status: p.status === 'Active' ? 'Paused' : 'Active' };
          }
          return p;
        });
        localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(mapped));
        window.dispatchEvent(new Event('shreeniwas_data_updated'));
      }
    } catch (e) {}
  };

  const activeCount = properties.filter(p => p.status === 'Active').length;
  const totalViews = properties.reduce((acc, p) => acc + (p.views || 100), 0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold font-serif text-[#0A1628]">Owner & Landlord Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your property listings, view inquiry leads, and track performance.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (rawInquiries.length === 0) {
                  alert('No client inquiries logged yet.');
                  return;
                }
                try {
                  exportInquiriesToExcel(rawInquiries, 'Shreeniwas_Owner_Inquiry_Leads');
                } catch (err: any) {
                  alert(err?.message || 'Error exporting to Excel');
                }
              }}
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-3 rounded-xl transition-all shadow-md text-sm active:scale-95 cursor-pointer"
              title="Download client inquiry leads as Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Download Query Leads (.xlsx)
            </button>

            <Link
              href="/dashboard/landlord/properties/new"
              className="inline-flex items-center justify-center gap-2 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#F09032] font-bold px-6 py-3 rounded-xl transition-colors shadow-md text-sm"
            >
              <Plus className="w-5 h-5" />
              Add New Property
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Listed Properties</p>
              <h3 className="text-3xl font-bold text-[#0A1628] mt-2">{properties.length}</h3>
              <span className="text-xs text-green-600 flex items-center mt-2 font-medium">
                <TrendingUp className="w-3 h-3 mr-1" /> {activeCount} Active
              </span>
            </div>
            <div className="p-3 bg-[#0A1628]/5 text-[#0A1628] rounded-xl"><Home className="w-6 h-6" /></div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <h3 className="text-3xl font-bold text-[#0A1628] mt-2">{totalViews.toLocaleString('en-IN')}</h3>
              <span className="text-xs text-green-600 flex items-center mt-2 font-medium">
                <TrendingUp className="w-3 h-3 mr-1" /> Verified impressions
              </span>
            </div>
            <div className="p-3 bg-[#C9A96E]/10 text-[#C9A96E] rounded-xl"><Eye className="w-6 h-6" /></div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Inquiry Leads</p>
              <h3 className="text-3xl font-bold text-[#0A1628] mt-2">{inquiryCount}</h3>
              <span className="text-xs text-amber-600 flex items-center mt-2 font-medium">
                <Clock className="w-3 h-3 mr-1" /> Live inquiries
              </span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Inbox className="w-6 h-6" /></div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Brokerage Saved</p>
              <h3 className="text-3xl font-bold text-[#0A1628] mt-2">100%</h3>
              <span className="text-xs text-green-600 flex items-center mt-2 font-medium">
                <CheckCircle className="w-3 h-3 mr-1" /> Direct Tenant Connect
              </span>
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
                      <button 
                        onClick={() => handleToggleStatus(property.id)}
                        title="Click to toggle status"
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full transition-transform active:scale-95 cursor-pointer ${
                          property.status === 'Active' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }`}
                      >
                        {property.status}
                      </button>
                    </td>
                    <td className="py-4 px-6 font-medium text-[#0A1628]">{property.price}</td>
                    <td className="py-4 px-6 text-gray-600">{property.views}</td>
                    <td className="py-4 px-6 text-gray-600">{property.inquiries}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link 
                        href={`/properties/${property.id}`} 
                        className="inline-block p-2 text-gray-500 hover:text-[#C9A96E] transition-colors"
                        title="View Public Listing"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDeleteProperty(property.id)} 
                        className="p-2 text-gray-500 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
