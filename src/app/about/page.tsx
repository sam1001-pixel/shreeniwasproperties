import Image from "next/image";
import { Building2, Handshake, Shield, Sparkles, MapPin, Users, Home, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="w-8 h-8 text-[#C9A96E]" />,
      title: "Uncompromising Trust",
      description: "We build relationships on transparency, ensuring every transaction is secure and straightforward."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#C9A96E]" />,
      title: "Luxury Standard",
      description: "From curated listings to bespoke client services, we deliver a premium experience at every step."
    },
    {
      icon: <Handshake className="w-8 h-8 text-[#C9A96E]" />,
      title: "Client-Centric",
      description: "Your vision is our priority. We tailor our approach to match your unique real estate aspirations."
    },
    {
      icon: <Building2 className="w-8 h-8 text-[#C9A96E]" />,
      title: "Local Mastery",
      description: "Deep-rooted knowledge of Rajasthan's property landscape, unlocking exclusive opportunities."
    }
  ];

  const team = [
    { name: "Vikram Singh", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400" },
    { name: "Ananya Sharma", role: "Head of Luxury Sales", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400" },
    { name: "Rahul Desai", role: "Commercial Director", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400" },
    { name: "Priya Patel", role: "Client Relations", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400" },
  ];

  const stats = [
    { icon: <Home className="w-6 h-6" />, value: "500+", label: "Premium Properties" },
    { icon: <Users className="w-6 h-6" />, value: "2,500+", label: "Happy Families" },
    { icon: <MapPin className="w-6 h-6" />, value: "12", label: "Cities in Rajasthan" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "₹1,000Cr+", label: "Sales Volume" },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1600"
            alt="Rajasthan Architecture"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Our Legacy of Luxury</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            Redefining real estate experiences across the royal state of Rajasthan.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif text-[#0A1628]">A Tradition of Excellence</h2>
            <div className="w-20 h-1 bg-[#C9A96E]"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded on the principles of integrity and royal hospitality, Shreeniwas Properties has grown into Rajasthan's most trusted luxury real estate advisory. 
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We bridge the gap between heritage and modernity, offering a curated portfolio that ranges from modern smart homes in Jaipur to heritage Havelis in Udaipur. Our dedicated team ensures that finding your dream property is as majestic as the home itself.
            </p>
          </div>
          <div className="relative h-[500px]">
            <Image 
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800"
              alt="Modern Interior"
              fill
              className="object-cover rounded-sm shadow-2xl absolute inset-0 z-10 w-3/4 h-3/4 top-0 right-0"
            />
            <Image 
              src="https://images.unsplash.com/photo-1596423735880-5f2a689b903e?auto=format&fit=crop&q=80&w=800"
              alt="Classic Architecture"
              fill
              className="object-cover rounded-sm shadow-xl absolute z-0 w-2/3 h-2/3 bottom-0 left-0 border-4 border-white"
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0A1628] text-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Our Core Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The pillars that uphold our commitment to excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-[#112240] p-8 rounded-lg border border-transparent hover:border-[#C9A96E] transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="mb-6 p-4 bg-[#0A1628] rounded-full inline-block group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-center text-[#C9A96E]">{stat.icon}</div>
                <div className="text-4xl font-serif font-bold text-[#0A1628]">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#0A1628] mb-4">Leadership Team</h2>
          <div className="w-20 h-1 bg-[#C9A96E] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Meet the visionaries dedicated to elevating your real estate journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="group">
              <div className="relative h-80 mb-4 overflow-hidden rounded-sm">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <Link href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#C9A96E] transition-colors">
                    in
                  </Link>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1628] text-center">{member.name}</h3>
              <p className="text-[#C9A96E] text-center text-sm uppercase tracking-wide">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
