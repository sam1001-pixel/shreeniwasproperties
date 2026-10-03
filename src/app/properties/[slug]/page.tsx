'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MapPin, CheckCircle2, ShieldCheck, Share2, Heart, BedDouble, Bath, Square, Armchair, Building, Car, Compass, Phone, MessageCircle } from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] font-sans pb-20">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-[#C9A96E]">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-[#C9A96E]">Properties</Link>
          <span>/</span>
          <span className="text-gray-400">Rajasthan</span>
          <span>/</span>
          <span className="text-gray-400">Jaipur</span>
          <span>/</span>
          <span className="text-[#0A1628] font-medium">Luxury 3 BHK Apartment</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="bg-[#0A1628] text-[#C9A96E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                For Rent
              </span>
              <span className="flex items-center text-green-700 text-xs font-semibold bg-green-100 px-2 py-1 rounded">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
              </span>
              <span className="flex items-center text-blue-700 text-xs font-semibold bg-blue-100 px-2 py-1 rounded">
                <ShieldCheck className="w-3 h-3 mr-1" /> RERA Approved
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">Luxury 3 BHK Apartment</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1 text-[#C9A96E]" />
              C-Scheme, Jaipur, Rajasthan
            </div>
          </div>
          <div className="flex flex-col md:items-end">
            <div className="text-3xl font-bold text-[#0A1628] mb-1">₹45,000 <span className="text-lg text-gray-500 font-normal">/month</span></div>
            <span className="text-sm bg-[#C9A96E]/20 text-[#0A1628] px-3 py-1 rounded-full font-medium">Price Negotiable</span>
            <div className="flex gap-2 mt-4">
              <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 transition-colors"><Share2 className="w-5 h-5" /></button>
              <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 transition-colors"><Heart className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[50vh] min-h-[400px] mb-10 rounded-2xl overflow-hidden relative">
          <div className="md:col-span-2 h-full">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200" alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden md:grid grid-cols-1 gap-2 h-full">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" alt="Room 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600" alt="Room 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden md:grid grid-cols-1 gap-2 h-full">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" alt="Room 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            <div className="relative w-full h-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" alt="Room 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                <span className="text-white font-medium flex flex-col items-center">
                  <span className="text-2xl mb-1">+8</span>
                  View All Photos
                </span>
              </div>
            </div>
          </div>
          <button className="md:hidden absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium">
            View All Photos (12)
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - Main Content */}
          <div className="lg:w-[65%]">
            {/* Specs Bar */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
              <div className="flex flex-col items-center text-center">
                <BedDouble className="w-6 h-6 text-[#C9A96E] mb-2" />
                <span className="text-lg font-bold">3</span>
                <span className="text-xs text-gray-500 uppercase">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Bath className="w-6 h-6 text-[#C9A96E] mb-2" />
                <span className="text-lg font-bold">3</span>
                <span className="text-xs text-gray-500 uppercase">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Square className="w-6 h-6 text-[#C9A96E] mb-2" />
                <span className="text-lg font-bold">1800</span>
                <span className="text-xs text-gray-500 uppercase">Sq.Ft</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Armchair className="w-6 h-6 text-[#C9A96E] mb-2" />
                <span className="text-sm font-bold mt-1">Semi</span>
                <span className="text-xs text-gray-500 uppercase">Furnishing</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Building className="w-6 h-6 text-[#C9A96E] mb-2" />
                <span className="text-sm font-bold mt-1">4th</span>
                <span className="text-xs text-gray-500 uppercase">Floor</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Car className="w-6 h-6 text-[#C9A96E] mb-2" />
                <span className="text-lg font-bold">2</span>
                <span className="text-xs text-gray-500 uppercase">Parking</span>
              </div>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold mb-4">About This Property</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Experience luxury living in the heart of Jaipur with this stunning 3 BHK apartment located in the prestigious C-Scheme area. Spanning 1800 sq.ft, this east-facing property offers breathtaking city views and abundant natural light throughout the day.</p>
                <p>The apartment features premium vitrified flooring, a modular kitchen with a chimney, and built-in wardrobes in all bedrooms. The society amenities are top-notch, ensuring a comfortable and secure lifestyle for your family.</p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold mb-4">Key Highlights & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                {[
                  { icon: ShieldCheck, label: '24/7 Security' },
                  { icon: Building, label: 'High-speed Lift' },
                  { icon: Car, label: 'Covered Parking' },
                  { icon: Square, label: 'Swimming Pool' },
                  { icon: Heart, label: 'Gymnasium' },
                  { icon: Compass, label: 'East Facing' }
                ].map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-[#0A1628] p-2 rounded-full text-[#C9A96E]">
                      <amenity.icon className="w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-medium">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold mb-4">Location & Nearby Places</h2>
              <div className="bg-gray-100 rounded-xl h-64 mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
                <div className="z-10 bg-white/90 backdrop-blur px-6 py-3 rounded-lg shadow-sm font-medium flex items-center gap-2 cursor-pointer hover:bg-white transition-colors">
                  <MapPin className="text-[#C9A96E]" /> Open in Maps
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold mb-3 text-[#0A1628]">Education</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex justify-between items-center"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></div> St. Xavier's School</span> <span className="text-gray-400 font-medium">1.2 km</span></li>
                    <li className="flex justify-between items-center"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></div> Maharani College</span> <span className="text-gray-400 font-medium">2.5 km</span></li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold mb-3 text-[#0A1628]">Hospitals & Transit</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex justify-between items-center"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></div> SMS Hospital</span> <span className="text-gray-400 font-medium">1.8 km</span></li>
                    <li className="flex justify-between items-center"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></div> Jaipur Railway Station</span> <span className="text-gray-400 font-medium">3.0 km</span></li>
                    <li className="flex justify-between items-center"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></div> International Airport</span> <span className="text-gray-400 font-medium">11.5 km</span></li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="mb-10">
              <div className="bg-[#0A1628] rounded-xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent"></div>
                <h3 className="text-[#FDFBF7] text-2xl font-serif font-bold mb-2">360° Virtual Tour</h3>
                <p className="text-gray-300 mb-6">Explore the property from the comfort of your home</p>
                <button className="bg-[#C9A96E] text-[#0A1628] px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
                  Start Virtual Tour
                </button>
              </div>
            </section>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:w-[35%]">
            <div className="sticky top-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
                <h3 className="text-xl font-bold font-serif mb-4">Interested in this property?</h3>
                
                <form className="space-y-4 mb-6">
                  <div>
                    <input type="text" placeholder="Your Name" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#C9A96E] transition-colors" />
                  </div>
                  <div>
                    <input type="tel" placeholder="Phone Number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#C9A96E] transition-colors" />
                  </div>
                  <div>
                    <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#C9A96E] transition-colors" />
                  </div>
                  <div className="relative">
                    <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#C9A96E] text-gray-500 transition-colors" />
                  </div>
                  <div>
                    <textarea placeholder="I am interested in this property..." rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#C9A96E] transition-colors"></textarea>
                  </div>
                  <button type="button" className="w-full bg-[#0A1628] text-[#C9A96E] py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors">
                    Schedule Visit
                  </button>
                </form>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 border-2 border-[#0A1628] text-[#0A1628] py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    <Phone className="w-4 h-4" /> Call
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                </div>
              </div>

              {/* Agent Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden border-2 border-[#C9A96E]">
                  <img src="https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0A1628&color=C9A96E" alt="Agent" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0A1628]">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-500">Senior Property Consultant</p>
                  <p className="text-xs text-gray-400 mt-1">RERA: RAJ/A/2021/1542</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <section className="mt-16 pt-10 border-t border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold">Similar Properties</h2>
            <Link href="/properties" className="text-[#C9A96E] font-medium hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm p-2 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <img src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600&random=${item}`} alt="Similar" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-[#0A1628] text-[#C9A96E] text-xs font-bold px-3 py-1 rounded-full">RENT</div>
                </div>
                <div className="px-3 pb-3">
                  <h3 className="font-bold font-serif text-lg mb-1 line-clamp-1">Premium 3 BHK in Vaishali</h3>
                  <div className="text-gray-500 text-sm mb-3 flex items-center"><MapPin className="w-4 h-4 mr-1 text-[#C9A96E]" /> Vaishali Nagar, Jaipur</div>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                    <div className="text-[#0A1628] font-bold">₹38,000 <span className="text-xs text-gray-500 font-normal">/month</span></div>
                    <div className="flex gap-2 text-gray-500 text-xs font-medium">
                      <span className="flex items-center gap-1"><BedDouble className="w-3 h-3" /> 3</span>
                      <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> 3</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
