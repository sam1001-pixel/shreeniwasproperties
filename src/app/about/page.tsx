import Image from "next/image";
import { Building2, Handshake, Shield, Sparkles, MapPin, Users, Home, TrendingUp, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import AmenitiesShowcase from "@/components/shared/amenities-showcase";

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="w-7 h-7 text-[#C9A96E]" />,
      title: "Uncompromising Trust",
      description: "We build relationships on absolute transparency, ensuring every land title and paperwork is RERA verified."
    },
    {
      icon: <Sparkles className="w-7 h-7 text-[#C9A96E]" />,
      title: "Luxury Standards",
      description: "From curated villas to bespoke penthouses, we deliver a 5-star experience across Rajasthan real estate."
    },
    {
      icon: <Handshake className="w-7 h-7 text-[#C9A96E]" />,
      title: "Client-Centric Ethos",
      description: "Your investment vision is our priority. We tailor our advisory to match your lifestyle and wealth goals."
    },
    {
      icon: <Building2 className="w-7 h-7 text-[#C9A96E]" />,
      title: "Local Rajasthan Mastery",
      description: "Deep-rooted market authority in Jaipur, Udaipur, Jodhpur, Kota & Ajmer unlocking exclusive off-market listings."
    }
  ];

  const team = [
    { name: "Vikram Rathore", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400" },
    { name: "Ananya Sharma", role: "Head of Luxury Sales", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400" },
    { name: "Rahul Desai", role: "Commercial Director", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400" },
    { name: "Priya Patel", role: "Client Experience Manager", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400" },
  ];

  const stats = [
    { icon: <Home className="w-6 h-6 text-[#C9A96E]" />, value: "1,240+", label: "Verified Properties" },
    { icon: <Users className="w-6 h-6 text-[#C9A96E]" />, value: "3,500+", label: "Happy Families & Investors" },
    { icon: <MapPin className="w-6 h-6 text-[#C9A96E]" />, value: "7 Major Hubs", label: "Across Rajasthan" },
    { icon: <TrendingUp className="w-6 h-6 text-[#C9A96E]" />, value: "₹1,400Cr+", label: "Transaction Volume" },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#0A1628]">
      {/* 1. High-Contrast Hero Banner */}
      <section className="relative h-[65vh] min-h-[480px] flex items-center justify-center pt-28 sm:pt-32">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1600"
            alt="Rajasthan Royal Architecture"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/85 to-[#0A1628]/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] font-extrabold text-xs uppercase tracking-widest mb-4 backdrop-blur-sm">
            About Shreeniwas Properties
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4 leading-tight">
            Our Legacy of <span className="text-[#C9A96E]">Luxury & Trust</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed">
            Redefining real estate experiences across Jaipur, Udaipur, Jodhpur & the royal state of Rajasthan.
          </p>
        </div>
      </section>

      {/* 2. Story Section with High-Contrast Text */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A96E]">Our Heritage</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1628] leading-tight">
              A Tradition of Excellence & Royal Hospitality
            </h2>
            <div className="w-20 h-1 bg-[#C9A96E]"></div>
            
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Founded on the principles of integrity, transparency, and royal hospitality, <strong className="text-[#0A1628]">Shreeniwas Properties</strong> has established itself as Rajasthan's premier real estate advisory.
            </p>
            
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              We bridge the gap between heritage and modern luxury living, offering a handpicked portfolio ranging from contemporary smart apartments in Mansarovar Jaipur to lakeview Havelis in Udaipur. Our dedicated team ensures every transaction is secure, seamless, and rewarding.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0A1628]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" /> 100% RERA Approved
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#0A1628]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" /> Verified Legal Titles
              </div>
            </div>
          </div>

          <div className="relative h-[420px] sm:h-[480px]">
            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image 
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800"
                alt="Modern Luxury Property"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values in High-Contrast Dark Navy Box */}
      <section className="py-20 bg-[#0A1628] text-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#C9A96E] uppercase tracking-wider block mb-2">Pillars of Integrity</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">Our Core Values</h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm">The founding principles that guide every client interaction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-[#0E1F38] p-8 rounded-3xl border border-[#C9A96E]/20 hover:border-[#C9A96E] transition-all duration-300 shadow-xl group">
                <div className="mb-6 p-4 bg-[#0A1628] rounded-2xl inline-block border border-[#C9A96E]/30 group-hover:scale-110 transition-transform shadow-md">
                  {value.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">{value.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. High-Contrast Stats Banner */}
      <section className="py-16 px-4 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FDFBF7] border border-slate-200/60">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A1628] mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Amenities & Property Features Showcase */}
      <section className="px-4 py-8">
        <AmenitiesShowcase />
      </section>

      {/* 6. Leadership Team Section */}
      <section className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-[#C9A96E] uppercase tracking-wider block mb-2">Expert Guidance</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1628] mb-3">Our Leadership Team</h2>
          <div className="w-20 h-1 bg-[#C9A96E] mx-auto mb-4"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">Meet the seasoned real estate advisors dedicated to your property goals.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm hover:shadow-xl transition-all text-center group">
              <div className="relative h-72 mb-4 overflow-hidden rounded-2xl border border-slate-100">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0A1628] mb-1">{member.name}</h3>
              <p className="text-[#C9A96E] text-xs font-bold uppercase tracking-wider">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
