import Image from "next/image";
import Link from "next/link";
import { User, Clock, Calendar, ArrowLeft, Share2, MessageCircle } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = {
    title: "Why Jaipur is the Next Big Real Estate Hub in India",
    category: "Market Trends",
    author: "Aditi Sharma",
    role: "Senior Market Analyst",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1599661559882-6296fc1cb475?auto=format&fit=crop&w=1200&q=80",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  };

  return (
    <article className="min-h-screen bg-[#FDFBF7] pb-20">
      {/* Header */}
      <div className="container mx-auto max-w-4xl px-4 pt-16 pb-8">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#C9A96E] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all articles
        </Link>
        
        <div className="space-y-6">
          <span className="inline-block bg-[#C9A96E] text-white px-3 py-1 text-sm font-semibold rounded-full">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-[#0A1628] leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src={article.authorImage} alt={article.author} fill className="object-cover" />
              </div>
              <div>
                <p className="font-semibold text-[#0A1628]">{article.author}</p>
                <p className="text-sm text-gray-500">{article.role}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />{article.date}</div>
              <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />{article.readTime}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="container mx-auto max-w-5xl px-4 mb-16">
        <div className="relative h-[280px] sm:h-[450px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-lg">
          <Image src={article.image} alt={article.title} fill className="object-cover" priority />
        </div>
      </div>

      {/* Content Layout */}
      <div className="container mx-auto max-w-4xl px-4 flex flex-col lg:flex-row gap-12">
        {/* Social Share Sidebar */}
        <div className="lg:w-16 flex flex-row lg:flex-col gap-3 justify-center items-center shrink-0 my-6 lg:my-0">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider lg:-rotate-90 lg:my-8">Share</span>
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0A1628] hover:border-[#0A1628] transition-colors"><Share2 className="w-4 h-4" /></button>
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-green-600 hover:border-green-600 transition-colors"><MessageCircle className="w-4 h-4" /></button>
        </div>

        {/* Article Body */}
        <div className="flex-1 prose prose-lg prose-headings:font-serif prose-headings:text-[#0A1628] prose-a:text-[#C9A96E] max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Jaipur, historically known for its vibrant culture and majestic architecture, is rapidly transforming into one of India's most promising real estate destinations. With infrastructure developments and growing IT sectors, the Pink City is attracting both residential buyers and commercial investors.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">1. Infrastructure and Connectivity</h2>
          <p>
            The expansion of the Jaipur Metro and the development of the Ring Road have significantly reduced travel time across the city. The upcoming Delhi-Mumbai Expressway passing near Jaipur will further enhance its logistical appeal, making it a prime spot for warehousing and commercial ventures.
          </p>

          <blockquote className="border-l-4 border-[#C9A96E] pl-6 italic my-10 bg-white p-6 rounded-r-lg shadow-sm">
            "The real estate landscape in Jaipur is witnessing a paradigm shift. It's no longer just a tourist destination; it's a thriving economic hub." 
            <footer className="text-sm font-semibold not-italic mt-4">— Rajesh Verma, Urban Planning Expert</footer>
          </blockquote>

          <h2 className="text-3xl font-bold mt-12 mb-6">2. Booming IT and Industrial Sectors</h2>
          <p>
            Areas like Mahindra SEZ and Sitapura Industrial Area are seeing massive investments. Multinational companies are setting up offices, leading to an influx of working professionals. This demographic shift has created a high demand for premium residential apartments and rental properties.
          </p>

          <div className="bg-[#0A1628] text-white p-8 rounded-xl my-12">
            <h3 className="text-2xl font-serif mb-4 text-[#C9A96E] mt-0">Key Takeaways for Investors</h3>
            <ul className="space-y-3 mb-0">
              <li className="flex items-start"><span className="text-[#C9A96E] mr-2">✓</span> High rental yields in areas close to IT parks.</li>
              <li className="flex items-start"><span className="text-[#C9A96E] mr-2">✓</span> Rapid appreciation in property values along the Ring Road corridor.</li>
              <li className="flex items-start"><span className="text-[#C9A96E] mr-2">✓</span> Growing demand for luxury villas and gated communities.</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Conclusion</h2>
          <p>
            For those looking to invest in real estate, Jaipur offers a balanced mix of affordability and high growth potential compared to saturated Tier-1 cities. Whether you're looking for a dream home or a lucrative commercial space, the Pink City has something to offer.
          </p>
        </div>
      </div>
      
      {/* Author Bio Box */}
      <div className="container mx-auto max-w-4xl px-4 mt-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
          <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
            <Image src={article.authorImage} alt={article.author} fill className="object-cover" />
          </div>
          <div>
            <h4 className="text-xl font-bold font-serif text-[#0A1628] mb-2">Written by {article.author}</h4>
            <p className="text-gray-600 mb-4">Aditi is a Senior Market Analyst at Shreeniwas Properties with over 10 years of experience in the Rajasthan real estate market. She specializes in emerging market trends and investment strategies.</p>
            <Link href="/blog" className="text-[#C9A96E] font-medium hover:underline">View all posts by Aditi →</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
