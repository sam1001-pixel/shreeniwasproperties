import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Shreeniwas Properties',
  description: 'Our commitment to protecting your personal data, property listings, and privacy under Indian IT Act and RERA regulations.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] py-16 px-4 sm:px-6 lg:px-8">
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
            <ShieldCheck className="w-4 h-4 text-[#C9A96E]" /> Legal & Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1628]">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last updated: October 2024 • Governed by Information Technology Act, 2000 & RERA Rajasthan</p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8 text-sm leading-relaxed text-slate-600">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#0A1628]">1. Introduction</h2>
            <p>
              Welcome to <strong>Shreeniwas Properties</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting the personal data of all visitors, buyers, sellers, landlords, and tenants who use our real estate marketplace in Rajasthan.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#0A1628]">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Contact Information:</strong> Name, phone number, email address when you submit property inquiries, schedule VIP site visits, or contact owners.</li>
              <li><strong>Listing Data:</strong> Property title, address, photographs, price, carpet area, and RERA registration documents submitted by landlords.</li>
              <li><strong>Transaction & Booking Details:</strong> UPI transaction reference (UTR) numbers for refundable VIP site visit scheduling.</li>
              <li><strong>Technical Data:</strong> IP address, device type, browser information, and locality search preferences to personalize your property discovery.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#0A1628]">3. How We Use Your Data</h2>
            <p>We use your information strictly for legitimate real estate operations, including:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Connecting prospective buyers with verified property owners and RERA consultants.</li>
              <li>Arranging accompanied VIP site visits and cab pickup coordinators.</li>
              <li>Sending property alerts, price trend updates, and legal notices when requested.</li>
              <li>Preventing unauthorized fraudulent property listings and ensuring platform integrity.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#0A1628]">4. Data Protection & Zero Broker Spam</h2>
            <p>
              We enforce strict data isolation. We <strong>never sell or rent</strong> your personal contact details to unverified third-party telemarketers. When you submit an inquiry, only the designated property owner or verified Shreeniwas advisor receives your contact details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#0A1628]">5. Your Rights & Grievance Officer</h2>
            <p>
              Under Indian digital data privacy regulations, you have the right to inspect, update, or request the deletion of your account and saved properties at any time.
            </p>
            <p className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <strong>Grievance Contact:</strong><br />
              Email: <code>compliance@shreeniwasproperties.com</code><br />
              Office: 15 Royal Avenue, C-Scheme, Jaipur, Rajasthan 302001
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
