import Link from "next/link";
import { Heart, Send, Calendar, User, ArrowRight, Building } from "lucide-react";

export default function TenantPortalDashboard() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold font-serif text-[#0A1628]">Tenant & Buyer Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your saved properties, active inquiries, and tour visits across Rajasthan.</p>
          </div>
          <Link href="/properties" className="bg-[#0A1628] text-[#C9A96E] px-6 py-3 rounded-xl font-semibold hover:bg-[#0A1628]/90 transition-colors">
            Browse Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0A1628] text-white p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-300">Saved Properties</span>
              <Heart className="w-5 h-5 text-[#C9A96E]" />
            </div>
            <h3 className="text-4xl font-bold">12</h3>
            <Link href="/dashboard/portal/saved" className="inline-flex items-center text-sm text-[#C9A96E] hover:underline font-medium pt-2">
              View all saved <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Sent Inquiries</span>
              <Send className="w-5 h-5 text-[#C9A96E]" />
            </div>
            <h3 className="text-4xl font-bold text-[#0A1628]">5</h3>
            <p className="text-xs text-green-600 font-medium">3 Replied by Owner</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Scheduled Visits</span>
              <Calendar className="w-5 h-5 text-[#C9A96E]" />
            </div>
            <h3 className="text-4xl font-bold text-[#0A1628]">2</h3>
            <p className="text-xs text-blue-600 font-medium">Next: Jaipur Apartment (Tomorrow, 11 AM)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
