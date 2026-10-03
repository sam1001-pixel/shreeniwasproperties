"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Home, 
  Building2, 
  Heart, 
  ChevronDown, 
  Bed, 
  Bath, 
  Maximize, 
  ArrowRight
} from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Luxury 3 BHK Apartment",
    location: "Malviya Nagar, Jaipur",
    price: "₹85 L",
    type: "Buy",
    beds: 3,
    baths: 3,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Heritage Style Villa",
    location: "Ratanada, Jodhpur",
    price: "₹1.2 Cr",
    type: "Buy",
    beds: 4,
    baths: 4,
    sqft: 3200,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Lakeview Penthouse",
    location: "Fateh Sagar, Udaipur",
    price: "₹2.5 Cr",
    type: "Buy",
    beds: 4,
    baths: 5,
    sqft: 4500,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Premium Retail Space",
    location: "C-Scheme, Jaipur",
    price: "₹1.5 L / month",
    type: "Commercial",
    beds: 0,
    baths: 2,
    sqft: 1200,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Spacious Family Home",
    location: "Talwandi, Kota",
    price: "₹95 L",
    type: "Buy",
    beds: 3,
    baths: 3,
    sqft: 2200,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Restored Heritage Haveli",
    location: "Pushkar Road, Ajmer",
    price: "₹3.8 Cr",
    type: "Buy",
    beds: 6,
    baths: 6,
    sqft: 6500,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  },
];

const cities = [
  { name: "Jaipur", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=600", properties: 124 },
  { name: "Jodhpur", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=80&w=600", properties: 86 },
  { name: "Udaipur", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=600", properties: 92 },
  { name: "Kota", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600", properties: 45 },
  { name: "Ajmer", image: "https://images.unsplash.com/photo-1627894006746-e26843fc6824?auto=format&fit=crop&q=80&w=600", properties: 38 },
  { name: "Bikaner", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=600", properties: 29 },
];

const faqs = [
  {
    question: "How do I start searching for a property in Rajasthan?",
    answer: "You can start by using our search tool above. Select your preferred transaction type (Rent, Buy, Commercial), enter your desired location, and browse through our curated list of premium properties across Rajasthan."
  },
  {
    question: "What makes Shreeniwas Properties different?",
    answer: "We specialize in premium and luxury real estate across Rajasthan, offering an exclusive selection of properties from modern penthouses in Udaipur to heritage havelis in Ajmer, ensuring quality and authenticity."
  },
  {
    question: "Are there additional fees when buying a property?",
    answer: "Yes, standard government charges like stamp duty, registration fees, and legal charges apply. Our experts will provide a transparent breakdown of all costs before you finalize any property."
  },
  {
    question: "Can you help with commercial real estate leasing?",
    answer: "Absolutely. We have a dedicated team for commercial properties helping businesses find the perfect retail spaces, offices, and industrial properties in prime locations across major cities."
  }
];

export default function MarketingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Buy");
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (activeTab) query.set("intent", activeTab.toLowerCase());
    if (searchLocation) query.set("location", searchLocation);
    if (propertyType) query.set("type", propertyType);
    
    router.push(`/properties?${query.toString()}`);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#0A1628] mb-6 leading-tight">
              Discover <span className="text-[#C9A96E] italic">Luxury</span> Living in Rajasthan
            </h1>
            <p className="text-lg md:text-xl text-[#0A1628]/70">
              Exclusive properties, heritage homes, and premium commercial spaces across the royal state.
            </p>
          </div>

          {/* Search Component */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-[#0A1628]/5 p-2 sm:p-4 border border-[#0A1628]/10">
            {/* Tabs */}
            <div className="flex space-x-2 mb-4 p-1 bg-[#FDFBF7] rounded-2xl w-fit">
              {["Rent", "Buy", "Commercial"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab 
                      ? "bg-[#0A1628] text-white shadow-md" 
                      : "text-[#0A1628]/70 hover:text-[#0A1628] hover:bg-[#0A1628]/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center bg-[#FDFBF7] rounded-2xl px-4 py-3 border border-[#0A1628]/10 focus-within:border-[#C9A96E] transition-colors">
                <MapPin className="w-5 h-5 text-[#C9A96E] mr-3" />
                <input
                  type="text"
                  placeholder="City, neighborhood, or address"
                  className="w-full bg-transparent border-none outline-none text-[#0A1628] placeholder:text-[#0A1628]/40"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center bg-[#FDFBF7] rounded-2xl px-4 py-3 border border-[#0A1628]/10 focus-within:border-[#C9A96E] transition-colors">
                <Home className="w-5 h-5 text-[#C9A96E] mr-3" />
                <select 
                  className="w-full bg-transparent border-none outline-none text-[#0A1628] appearance-none"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa / Independent House</option>
                  <option value="plot">Plot / Land</option>
                  <option value="commercial">Commercial Space</option>
                </select>
              </div>
              <button 
                type="submit"
                className="bg-[#C9A96E] hover:bg-[#b5955c] text-white px-8 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center min-w-[140px]"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </button>
            </form>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#C9A96E]/10 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[#0A1628]/5 blur-3xl" />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#0A1628] mb-4">Featured Properties</h2>
              <p className="text-[#0A1628]/70 max-w-2xl">Explore our handpicked selection of premium properties across Rajasthan, offering the perfect blend of modern luxury and traditional charm.</p>
            </div>
            <Link href="/properties" className="hidden md:flex items-center text-[#C9A96E] font-medium hover:text-[#0A1628] transition-colors">
              View all properties <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <motion.div 
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#0A1628]">
                      {property.type}
                    </div>
                    <button 
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-[#0A1628] hover:text-[#C9A96E] transition-colors z-10"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(property.id) ? "fill-[#C9A96E] text-[#C9A96E]" : ""}`} />
                    </button>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-2xl font-serif text-[#0A1628] mb-1">{property.price}</div>
                    <h3 className="text-lg font-medium text-[#0A1628] mb-2">{property.title}</h3>
                    <div className="flex items-center text-[#0A1628]/60 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-[#0A1628]/10 flex items-center justify-between text-[#0A1628]/70 text-sm">
                      {property.beds > 0 && (
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.beds} Beds
                        </div>
                      )}
                      {property.baths > 0 && (
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          {property.baths} Baths
                        </div>
                      )}
                      <div className="flex items-center">
                        <Maximize className="w-4 h-4 mr-1" />
                        {property.sqft} sqft
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/properties" className="inline-flex items-center text-[#C9A96E] font-medium hover:text-[#0A1628] transition-colors">
              View all properties <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Cities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#0A1628] mb-4">Explore Rajasthan</h2>
            <p className="text-[#0A1628]/70 max-w-2xl mx-auto">Discover premium real estate opportunities in the most sought-after cities of the state.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {cities.map((city, index) => (
              <Link href={`/properties?location=${city.name.toLowerCase()}`} key={city.name}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative h-48 lg:h-64 rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-serif text-xl">{city.name}</h3>
                    <p className="text-white/80 text-sm">{city.properties} Properties</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#0A1628] mb-4">Frequently Asked Questions</h2>
            <p className="text-[#0A1628]/70">Everything you need to know about finding your dream property.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-[#0A1628]/10 rounded-2xl overflow-hidden bg-[#FDFBF7]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-medium text-[#0A1628] pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#C9A96E] transition-transform duration-300 flex-shrink-0 ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-[#0A1628]/70">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A1628] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#C9A96E] blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Ready to find your dream property?</h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect home or investment with Shreeniwas Properties.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center bg-[#C9A96E] hover:bg-[#b5955c] text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300"
          >
            Contact Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
