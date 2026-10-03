import React from 'react';
import { Building2, Shield, Users, Award, MapPin } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: Shield, title: "Trust", desc: "Building lasting relationships through honesty and integrity." },
    { icon: Users, title: "Customer First", desc: "Your needs and satisfaction are at the core of everything we do." },
    { icon: Award, title: "Excellence", desc: "Delivering the highest quality service and premium properties." },
    { icon: Building2, title: "Transparency", desc: "Clear communication and processes from start to finish." },
  ];

  const cities = ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628]">
      {/* Hero Section */}
      <section className="bg-[#0A1628] text-white py-24 px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 text-[#C9A96E]">
          About Shreeniwas Properties
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto font-light">
          Rajasthan's Most Trusted Real Estate Partner
        </p>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-200 aspect-video rounded-xl shadow-lg flex items-center justify-center text-gray-500 italic">
            [Company Office / Team Image Placeholder]
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6 text-[#0A1628]">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded with a vision to redefine luxury real estate in Rajasthan, Shreeniwas Properties has grown from a humble beginning into a leading name in the industry. For over a decade, we have been matching families with their dream homes and investors with prime commercial spaces.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our deep-rooted understanding of the local market, combined with a modern approach to real estate, ensures that our clients receive unparalleled service and value. We take pride in our heritage while embracing the future of living.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#0A1628] text-[#FDFBF7] py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-8 border border-[#C9A96E]/30 rounded-xl bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-serif font-bold mb-4 text-[#C9A96E]">Our Mission</h3>
            <p className="font-light leading-relaxed">
              To provide exceptional real estate services that exceed our clients' expectations, fostering trust and long-term relationships through transparency, expertise, and a commitment to excellence.
            </p>
          </div>
          <div className="p-8 border border-[#C9A96E]/30 rounded-xl bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-serif font-bold mb-4 text-[#C9A96E]">Our Vision</h3>
            <p className="font-light leading-relaxed">
              To be the premier real estate agency in Rajasthan, recognized for our ethical practices, innovative solutions, and unwavering dedication to enhancing the communities we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-12 text-[#0A1628]">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
              <v.icon className="w-12 h-12 text-[#C9A96E] mb-4" />
              <h4 className="text-xl font-bold mb-2">{v.title}</h4>
              <p className="text-sm text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-gray-50 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-12 text-[#0A1628]">Our Leadership</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="bg-gray-200 aspect-square flex items-center justify-center text-gray-400">
                  [Photo Placeholder]
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold">Executive Name {i}</h4>
                  <p className="text-[#C9A96E] text-sm font-medium mt-1">Founder & CEO</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rajasthan Presence */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-12 text-[#0A1628]">Our Presence in Rajasthan</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {cities.map((city, i) => (
            <div key={i} className="flex items-center gap-2 px-6 py-3 bg-[#0A1628] text-white rounded-full">
              <MapPin className="w-4 h-4 text-[#C9A96E]" />
              <span className="font-medium">{city}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
