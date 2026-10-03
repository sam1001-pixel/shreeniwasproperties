"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { propertyTypes } from "@/constants/amenities";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Search, 
  ChevronRight, 
  Shield, 
  Users, 
  Clock, 
  Star,
  Plus
} from "lucide-react";

// Mock Data
const featuredProperties = [
  {
    id: 1,
    title: "Luxury 3 BHK Apartment",
    location: "Vaishali Nagar, Jaipur",
    price: "₹45,000 /mo",
    type: "Rent",
    beds: 3,
    baths: 3,
    area: "1,800 sq.ft",
    tag: "Premium",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: 2,
    title: "Modern Independent Villa",
    location: "Shastri Nagar, Jodhpur",
    price: "₹1.85 Cr",
    type: "Buy",
    beds: 4,
    baths: 4,
    area: "3,200 sq.ft",
    tag: "New",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 3,
    title: "Lake View Penthouse",
    location: "Fateh Sagar, Udaipur",
    price: "₹3.50 Cr",
    type: "Buy",
    beds: 5,
    baths: 5,
    area: "4,500 sq.ft",
    tag: "Exclusive",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 4,
    title: "Commercial Retail Space",
    location: "C-Scheme, Jaipur",
    price: "₹1.2 L /mo",
    type: "Rent",
    beds: 0,
    baths: 2,
    area: "2,500 sq.ft",
    tag: "Hot Deal",
    color: "from-amber-500/20 to-yellow-500/20",
  },
  {
    id: 5,
    title: "Spacious Family Home",
    location: "Civil Lines, Kota",
    price: "₹95 L",
    type: "Buy",
    beds: 3,
    baths: 2,
    area: "2,100 sq.ft",
    tag: "Trending",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: 6,
    title: "Heritage Style Haveli",
    location: "Pushkar Road, Ajmer",
    price: "₹4.20 Cr",
    type: "Buy",
    beds: 8,
    baths: 8,
    area: "6,000 sq.ft",
    tag: "Heritage",
    color: "from-indigo-500/20 to-cyan-500/20",
  }
];

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "Homeowner in Jaipur",
    quote: "Shreeniwas Properties made finding our dream home in Vaishali Nagar incredibly easy. Their professionalism and knowledge of the local market is unmatched."
  },
  {
    id: 2,
    name: "Meera Singh",
    role: "Investor in Udaipur",
    quote: "I've worked with many real estate agents, but the team here truly understands premium properties. They helped me find the perfect lake-view property."
  },
  {
    id: 3,
    name: "Vikram Rathore",
    role: "Business Owner in Jodhpur",
    quote: "Securing a commercial space for my new restaurant was seamless. They negotiated a great lease term and handled all the paperwork efficiently."
  }
];

const faqs = [
  {
    question: "Which cities in Rajasthan do you operate in?",
    answer: "We have a strong presence in Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bikaner, and over 10 other growing cities across Rajasthan."
  },
  {
    question: "Do you help with property loans and financing?",
    answer: "Yes, we have tie-ups with major national banks and financial institutions to help our clients secure home loans at the best interest rates."
  },
  {
    question: "What is the process for listing my property with you?",
    answer: "Simply contact us through our website or call our helpline. One of our property experts will visit your site, do an evaluation, and list it on our premium network."
  },
  {
    question: "Are the properties listed on your website verified?",
    answer: "Absolutely. Every property listed on Shreeniwas Properties goes through a strict 15-point verification process regarding ownership and legal clearances."
  }
];

const cities = [
  { name: "Jaipur", count: "450+", gradient: "from-pink-500 to-rose-500" },
  { name: "Jodhpur", count: "210+", gradient: "from-blue-500 to-indigo-500" },
  { name: "Udaipur", count: "180+", gradient: "from-emerald-500 to-teal-500" },
  { name: "Kota", count: "120+", gradient: "from-amber-500 to-orange-500" },
  { name: "Ajmer", count: "90+", gradient: "from-purple-500 to-fuchsia-500" },
  { name: "Bikaner", count: "85+", gradient: "from-yellow-400 to-amber-500" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<"rent" | "buy" | "commercial">("rent");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden bg-[#0A1628]">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)" }}></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight text-white font-serif leading-tight">
              Find Your Perfect <br />
              <span className="text-[#C9A96E]">Property in Rajasthan</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              Premium real estate services across Jaipur, Jodhpur, Udaipur and 15+ cities in Rajasthan.
            </motion.p>
            
            {/* Search Box */}
            <motion.div variants={fadeInUp} className="mt-10 max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-3xl border border-white/20 shadow-2xl">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-inner">
                {/* Tabs */}
                <div className="flex space-x-1 border-b border-slate-200 mb-6">
                  {(["rent", "buy", "commercial"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "px-6 py-3 text-sm font-medium capitalize transition-colors relative",
                        activeTab === tab ? "text-[#0A1628]" : "text-slate-500 hover:text-slate-700"
                      )}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A96E]" />
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Inputs */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Location, City, or Neighborhood" 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] transition-all text-slate-800"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] appearance-none transition-all text-slate-800">
                      <option value="">Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa / Independent House</option>
                      <option value="plot">Plot / Land</option>
                      <option value="commercial">Commercial Space</option>
                    </select>
                  </div>
                  <button className="bg-[#C9A96E] hover:bg-[#b59760] text-[#0A1628] font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Stats Row */}
            <motion.div variants={fadeInUp} className="pt-8 flex flex-wrap justify-center gap-6 sm:gap-12 text-white/80">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">1,200+</span>
                <span className="text-sm">Properties</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">450+</span>
                <span className="text-sm">Happy Clients</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">15+</span>
                <span className="text-sm">Cities</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">10+</span>
                <span className="text-sm">Years</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURED PROPERTIES */}
      <section className="py-20 sm:py-28 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] font-serif inline-block relative">
              Featured Properties
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#C9A96E] rounded-full"></span>
            </h2>
            <p className="mt-6 text-slate-600">Hand-picked premium properties across Rajasthan</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                key={property.id} 
                className="group p-1 rounded-2xl bg-black/5 hover:bg-black/10 transition-colors"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                  {/* Image Placeholder */}
                  <div className={cn("relative aspect-[4/3] bg-gradient-to-br flex items-center justify-center p-6", property.color)}>
                    <div className="absolute top-4 left-4">
                      <span className={cn(
                        "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider text-white shadow-sm",
                        property.type === "Rent" ? "bg-emerald-500" : "bg-blue-500"
                      )}>
                        {property.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xl font-serif font-medium text-slate-800/50 mix-blend-overlay">Property Image</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-2xl font-bold text-[#0A1628] mb-2">{property.price}</div>
                    <h3 className="font-semibold text-lg text-slate-800 line-clamp-1 mb-2">{property.title}</h3>
                    <div className="flex items-center text-slate-500 text-sm mb-6">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                      {property.beds > 0 && (
                        <div className="flex items-center text-slate-600 text-sm">
                          <Bed className="w-4 h-4 mr-1 text-[#C9A96E]" />
                          <span>{property.beds}</span>
                        </div>
                      )}
                      {property.baths > 0 && (
                        <div className="flex items-center text-slate-600 text-sm">
                          <Bath className="w-4 h-4 mr-1 text-[#C9A96E]" />
                          <span>{property.baths}</span>
                        </div>
                      )}
                      <div className="flex items-center text-slate-600 text-sm">
                        <Square className="w-4 h-4 mr-1 text-[#C9A96E]" />
                        <span>{property.area}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/properties" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0A1628] text-[#0A1628] font-semibold rounded-xl hover:bg-[#0A1628] hover:text-white transition-colors">
              View All Properties
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: CATEGORIES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0A1628] font-serif">Explore by Property Type</h2>
              <p className="mt-4 text-slate-600">Find exactly what you're looking for</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {propertyTypes.slice(0, 5).map((type, i) => (
              <Link key={type.id} href={`/properties?type=${type.id}`}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-[#0A1628] transition-colors duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {/* Placeholder for Dynamic Icon */}
                    <span className="text-[#C9A96E] text-2xl font-serif">{type.label.charAt(0)}</span>
                  </div>
                  <h3 className="font-medium text-slate-800 group-hover:text-white transition-colors text-center">{type.label}</h3>
                  <p className="text-xs text-slate-500 mt-1 group-hover:text-white/70 transition-colors">100+ Properties</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="py-20 sm:py-28 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] font-serif">Why Choose Shreeniwas Properties?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Verified Properties", desc: "Every property goes through strict legal and physical verification." },
              { icon: Users, title: "Trusted by Families", desc: "Over 450+ families have found their dream homes with us." },
              { icon: MapPin, title: "All Over Rajasthan", desc: "Deep local network across 15+ major cities in the state." },
              { icon: Clock, title: "24/7 Support", desc: "Dedicated relationship managers available for your assistance." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mb-6 text-[#C9A96E]">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#0A1628] mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: RAJASTHAN CITIES */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] font-serif">Properties Across Rajasthan</h2>
            <p className="mt-4 text-slate-600">Discover premium real estate in key cities</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city, i) => (
              <motion.div 
                key={city.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity duration-500", city.gradient)}></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold font-serif mb-1 group-hover:scale-105 origin-left transition-transform">{city.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-white/80 text-sm">{city.count} Properties</p>
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white group-hover:text-[#0A1628] transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: STATS */}
      <section className="py-20 bg-[#0A1628] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#C9A96E] mb-2 font-serif">1,200+</div>
              <div className="text-slate-400 text-sm md:text-base">Properties Listed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#C9A96E] mb-2 font-serif">450+</div>
              <div className="text-slate-400 text-sm md:text-base">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#C9A96E] mb-2 font-serif">15+</div>
              <div className="text-slate-400 text-sm md:text-base">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#C9A96E] mb-2 font-serif">10+</div>
              <div className="text-slate-400 text-sm md:text-base">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section className="py-20 sm:py-28 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] font-serif">What Our Clients Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <motion.div 
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="flex gap-1 mb-6 text-[#C9A96E]">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-600 mb-8 italic">"{test.quote}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-[#0A1628] flex items-center justify-center text-[#C9A96E] font-bold text-lg">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A1628]">{test.name}</h4>
                    <p className="text-xs text-slate-500">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CTA */}
      <section className="py-20 bg-gradient-to-r from-[#C9A96E] to-[#b59760]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">Ready to Find Your Dream Property?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">List your property with us or start searching for your next home today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/properties" className="w-full sm:w-auto px-8 py-4 bg-white text-[#0A1628] font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              Browse Properties
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-[#0A1628] text-white font-bold rounded-xl shadow-lg hover:bg-[#112441] transition-all">
              List Your Property
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] font-serif">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 text-left transition-colors"
                >
                  <span className="font-semibold text-[#0A1628] pr-4">{faq.question}</span>
                  <div className={cn("w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-transform", openFaq === i ? "bg-[#0A1628] text-white rotate-45" : "bg-slate-200 text-slate-500")}>
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
                <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", openFaq === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="p-6 pt-0 text-slate-600 bg-slate-50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
