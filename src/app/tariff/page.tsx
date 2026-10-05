import { Metadata } from 'next';
import PricingTariffSection from '@/components/shared/pricing-tariff-section';
import Link from 'next/link';
import { ShieldCheck, PhoneCall, MessageSquare, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transparent Brokerage Tariff & Site Visit Passes | Shree Niwas Properties',
  description: '100% transparent brokerage rates in Jodhpur and Rajasthan. ₹0 Discovery Visit, ₹500 Standard Pass, ₹999 Premium Pass. 100% adjustable against final brokerage fee. Zero hidden charges.',
};

export default function TariffPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-24 sm:pt-28 pb-16">
      {/* Hero Header */}
      <div className="bg-[#0A1628] text-white py-14 px-4 border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Shree Niwas Transparency Guarantee
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Transparent Brokerage Tariff & Site Visit Passes
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            नो हिडन चार्जेस। 100% पारदर्शी और फेयर डील। आपकी मेहनत की कमाई की पूरी कद्र, सीधे जोधपुर हेड ऑफिस से।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-300">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-400" /> 100% Adjustable Visit Passes</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-400" /> Direct Buyer-Seller Meetings</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-400" /> Complete Legal Agreement Support</span>
          </div>
        </div>
      </div>

      {/* Main Component */}
      <PricingTariffSection showHeader={false} />

      {/* Trust & FAQ Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-serif font-bold text-[#0A1628] text-center mb-8">
          अक्सर पूछे जाने वाले सवाल (Frequently Asked Questions)
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <h3 className="text-sm sm:text-base font-bold text-[#0A1628] mb-1.5">
              Q1: क्या साइट विजिट पास की फीस मेरी ब्रोकरेज में से कम (Adjust) होगी?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              <strong>हाँ, बिल्कुल 100%!</strong> यह फीस कोई अतिरिक्त खर्च नहीं है। जैसे ही आपकी प्रॉपर्टी की डील फाइनल होती है, आपने विजिट पास के लिए जो भी राशि दी है (₹500 या ₹999), वह पूरी की पूरी आपकी फाइनल ब्रोकरेज फीस से माइनस कर दी जाएगी।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <h3 className="text-sm sm:text-base font-bold text-[#0A1628] mb-1.5">
              Q2: 'विजिट चार्ज क्यों?' रखा गया है?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              हमारा उद्देश्य केवल प्रॉपर्टीज घुमाना नहीं, बल्कि आपके बजट और पसंद के अनुसार सही प्रॉपर्टी खोजना है। हमारी टीम के समय और मेहनत को वास्तविक और गंभीर बायर्स व किरायेदारों तक समर्पित रखने के लिए यह न्यूनतम पारदर्शी टोकन पैकेज बनाया गया है।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <h3 className="text-sm sm:text-base font-bold text-[#0A1628] mb-1.5">
              Q3: प्रॉपर्टी ओनर के साथ बातचीत और नेगोशिएशन कहाँ होगी?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              प्रॉपर्टी पसंद आने पर दोनों पक्षों (खरीदार और मालिक) की आमने-सामने बैठक और रेट नेगोशिएशन पूरी पारदर्शिता के साथ हमारे जोधपुर ऑफिस (103, Jodhana Arcade, Bombay Motor Circle) में ही कराई जाती है।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <h3 className="text-sm sm:text-base font-bold text-[#0A1628] mb-1.5">
              Q4: साइट विजिट कितने समय पहले बुक करनी चाहिए?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              ताकि हमारी टीम प्रॉपर्टी ओनर से समय ले सके और आपको समर्पित अनुभव दे सके, कृपया साइट विजिट कम से कम 2 से 4 घंटे पहले शेड्यूल करें।
            </p>
          </div>
        </div>

        {/* Final CTA card */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0A1628] to-[#162744] text-white text-center shadow-xl">
          <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2">
            तैयार हैं अपने सपनों का आशियाना खोजने के लिए?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-6 font-light">
            आज ही फ्री डिस्कवरी विजिट या स्टैंडर्ड पास बुक करें और जोधपुर व राजस्थान की चुनिंदा प्रॉपर्टीज देखें।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/916376117833?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20want%20to%20book%20a%20site%20visit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#C9A96E] hover:bg-[#b59760] text-[#0A1628] font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp पर बात करें
            </a>
            <Link
              href="/properties"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-1.5"
            >
              Browse Properties <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
