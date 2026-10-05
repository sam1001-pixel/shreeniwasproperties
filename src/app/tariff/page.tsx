import { Metadata } from 'next';
import PricingTariffSection from '@/components/shared/pricing-tariff-section';
import Link from 'next/link';
import { ShieldCheck, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transparent Brokerage Tariff & Site Visit Passes | Shree Niwas Properties',
  description: '100% transparent brokerage rates in Jodhpur and Rajasthan. ₹0 Discovery Visit, ₹500 Standard Pass, ₹999 Premium Pass. 100% adjustable against final brokerage fee. Zero hidden charges.',
};

export default function TariffPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-24 sm:pt-28 pb-16">
      {/* Hero Header */}
      <div className="bg-[#0A1628] text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Shree Niwas Transparency Guarantee
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-3">
            Transparent Brokerage Tariff & Site Visit Passes
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Zero hidden fees. 100% transparent and fair property deals. Complete integrity backed directly by our Jodhpur Head Office.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-xs text-slate-300">
            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> 100% Adjustable Visit Passes</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Direct Buyer-Seller Meetings</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Complete Legal Agreement Support</span>
          </div>
        </div>
      </div>

      {/* Main Component */}
      <PricingTariffSection showHeader={false} />

      {/* Trust & FAQ Section */}
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1628] text-center mb-6">
          Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-3.5">
          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
            <h3 className="text-xs sm:text-sm font-bold text-[#0A1628] mb-1">
              Q1: Will the site visit pass fee be adjusted against my brokerage?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              <strong>Yes, absolutely 100%!</strong> This is zero extra cost. As soon as your property transaction is finalized, the full amount paid for your pass (₹500 or ₹999) is deducted directly from your final brokerage invoice.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
            <h3 className="text-xs sm:text-sm font-bold text-[#0A1628] mb-1">
              Q2: Why do you charge for site visits?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Our service goes beyond merely driving between sites — our team filters and inspects properties tailored to your exact budget and lifestyle needs. This modest token pass ensures our property advisors dedicate dedicated, quality time to serious homebuyers and tenants.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
            <h3 className="text-xs sm:text-sm font-bold text-[#0A1628] mb-1">
              Q3: Where do meetings and negotiations with the property owner take place?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Once you select a property, direct owner meetings, rate negotiations, and agreement terms are held with total transparency at our Jodhpur Head Office (103, Jodhana Arcade, Bombay Motor Circle, Jodhpur).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
            <h3 className="text-xs sm:text-sm font-bold text-[#0A1628] mb-1">
              Q4: How early should I schedule a site visit?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              To allow our advisors sufficient time to coordinate keys and timing with property owners, please book your site visit at least 2 to 4 hours in advance.
            </p>
          </div>
        </div>

        {/* Final CTA card */}
        <div className="mt-8 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-[#0A1628] to-[#162744] text-white text-center shadow-lg">
          <h3 className="text-lg sm:text-xl font-serif font-bold mb-1.5">
            Ready to Discover Your Dream Property?
          </h3>
          <p className="text-slate-300 text-xs max-w-xl mx-auto mb-4 font-light">
            Book a Free Discovery Visit or Standard Pass today to inspect premier properties across Jodhpur and Rajasthan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/916376117833?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20book%20a%20site%20visit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-[#C9A96E] hover:bg-[#b59760] text-[#0A1628] font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat on WhatsApp
            </a>
            <Link
              href="/properties"
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/20 flex items-center gap-1.5"
            >
              Browse Properties <ArrowRight className="w-3.5 h-3.5 text-[#C9A96E]" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
