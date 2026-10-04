import React from 'react';
import Link from 'next/link';
import { Scale, FileCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Shreeniwas Properties',
  description: 'Terms and conditions governing the use of Shreeniwas Properties marketplace, listings, and VIP site visit services in Rajasthan.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#C9A96E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A96E]/20 text-[#0A1628] text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-[#C9A96E]" /> User Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1628]">Terms of Service</h1>
          <p className="text-xs text-slate-400">Effective Date: October 2024 • Governing jurisdiction: Courts of Jaipur, Rajasthan</p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8 text-sm leading-relaxed text-slate-600">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#0A1628]">1. Acceptance of Terms</h2>
            <p>
              By accessing or using <strong>Shreeniwas Properties</strong> (the &quot;Platform&quot;), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#0A1628]">2. Platform Role & Zero Brokerage Policy</h2>
            <p>
              Shreeniwas Properties is an online marketplace facilitating direct connections between genuine property owners, buyers, tenants, and authorized builders across Rajasthan. 
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Direct listings tagged as &quot;0% Brokerage&quot; incur no commission fees to Shreeniwas Properties.</li>
              <li>Users are encouraged to verify legal title deeds, mutation records, and local authority approvals before entering into monetary sales or lease agreements.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#0A1628]">3. Landlord & Owner Listing Obligations</h2>
            <p>When posting a property listing on the Platform, owners and landlords warrant that:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>They hold legal ownership or authorization to sell or lease the designated property.</li>
              <li>All uploaded photos, carpet areas, pricing, and amenities accurately depict the actual premises.</li>
              <li>Any development requiring RERA registration under RERA Rajasthan complies with applicable statutory disclosures.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#0A1628]">4. VIP Site Visit Reservations</h2>
            <p>
              Our ₹499 VIP site visit service includes dedicated logistics and accompanied tour coordination. The reservation fee is <strong>100% refundable</strong> upon formal property token or booking confirmation through Shreeniwas Properties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#0A1628]">5. Intellectual Property & Brand Rights</h2>
            <p>
              All trademarks, royal emblem designs, photography, site text, search engine architecture, and software belong exclusively to Shreeniwas Properties and may not be reproduced without prior written consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#0A1628]">6. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of India. Any legal dispute or claim arising from Platform usage shall be subject exclusively to the jurisdiction of the competent courts in <strong>Jaipur, Rajasthan</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
