'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { User, Clock, Calendar, ArrowLeft, Share2, MessageCircle, Check } from "lucide-react";

interface BlogPostData {
  slug: string;
  title: string;
  category: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  image: string;
  authorImage: string;
  summary: string;
  content: {
    heading: string;
    text: string;
  }[];
  quote?: {
    text: string;
    author: string;
  };
  takeaways?: string[];
  conclusion: string;
}

const DEFAULT_ARTICLES: Record<string, BlogPostData> = {
  'why-jaipur-is-the-next-big-real-estate-hub': {
    slug: 'why-jaipur-is-the-next-big-real-estate-hub',
    title: 'Why Jaipur is the Next Big Real Estate Hub in India',
    category: 'Market Trends',
    author: 'Aditi Sharma',
    role: 'Senior Market Analyst',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1599661559882-6296fc1cb475?auto=format&fit=crop&w=1200&q=80',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    summary: "Jaipur, historically known for its vibrant culture and majestic architecture, is rapidly transforming into one of India's most promising real estate destinations. With infrastructure developments and growing IT sectors, the Pink City is attracting both residential buyers and commercial investors.",
    content: [
      {
        heading: '1. Infrastructure and Connectivity',
        text: 'The expansion of the Jaipur Metro and the development of the Ring Road have significantly reduced travel time across the city. The upcoming Delhi-Mumbai Expressway passing near Jaipur will further enhance its logistical appeal, making it a prime spot for warehousing and commercial ventures.'
      },
      {
        heading: '2. Booming IT and Industrial Sectors',
        text: 'Areas like Mahindra SEZ and Sitapura Industrial Area are seeing massive investments. Multinational companies are setting up offices, leading to an influx of working professionals. This demographic shift has created a high demand for premium residential apartments and rental properties.'
      }
    ],
    quote: {
      text: "The real estate landscape in Jaipur is witnessing a paradigm shift. It's no longer just a tourist destination; it's a thriving economic hub.",
      author: 'Rajesh Verma, Urban Planning Expert'
    },
    takeaways: [
      'High rental yields in areas close to IT parks and educational hubs.',
      'Rapid appreciation in property values along the Ring Road corridor.',
      'Growing demand for luxury villas, penthouses, and gated communities.'
    ],
    conclusion: "For those looking to invest in real estate, Jaipur offers a balanced mix of affordability and high growth potential compared to saturated Tier-1 cities. Whether you're looking for a dream home or a lucrative commercial space, the Pink City has something to offer."
  },
  'first-time-homebuyer-guide': {
    slug: 'first-time-homebuyer-guide',
    title: 'The Ultimate Guide for First-Time Homebuyers in Rajasthan',
    category: 'Buying Guide',
    author: 'Vikram Singh',
    role: 'Senior Real Estate Consultant',
    date: 'Oct 08, 2023',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    summary: 'Navigating the property market for your first home can be exhilarating yet daunting. Understanding Rajasthan registry norms, legal title verification, and zero brokerage options can save lakhs.',
    content: [
      {
        heading: '1. Budgeting and Credit Eligibility',
        text: 'Before shortlisting properties in Jaipur or Jodhpur, evaluate your debt-to-income ratio. Pre-approved home loans from leading banks give you price negotiation leverage with developers and individual landlords.'
      },
      {
        heading: '2. Verifying RERA Approvals and Clear Titles',
        text: 'Ensure the property has a valid Raj-RERA registration number. Verify title deeds for the past 30 years and confirm no encumbrance exists on the municipal records.'
      }
    ],
    quote: {
      text: 'A smart buyer looks not just at the layout plan, but at the legal legitimacy and water infrastructure of the locality.',
      author: 'Vikram Singh, Advisory Head'
    },
    takeaways: [
      'Always cross-check the Raj-RERA portal before paying token amounts.',
      'Factor in stamp duty and registration fees (typically 6-8% in Rajasthan).',
      'Choose direct seller or zero-brokerage platforms like Shreeniwas Properties.'
    ],
    conclusion: 'Your first home is both an emotional milestone and your biggest financial asset. Due diligence at every step guarantees complete peace of mind.'
  },
  'understanding-rera-rajasthan': {
    slug: 'understanding-rera-rajasthan',
    title: 'Understanding RERA Rajasthan: What Every Buyer Must Know',
    category: 'Tenant Advisory',
    author: 'Rajesh Rathore',
    role: 'Legal & Compliance Advisor',
    date: 'Sep 28, 2023',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    summary: 'The Real Estate (Regulation and Development) Act has transformed home-buying security in Rajasthan. Here is how RERA safeguards your funds and guarantees timely possession.',
    content: [
      {
        heading: '1. Escrow Account Protections',
        text: 'Developers in Rajasthan are legally mandated to keep 70% of collections in a dedicated escrow account, preventing fund diversion to other construction projects.'
      },
      {
        heading: '2. Standard Carpet Area Disclosures',
        text: 'Under RERA, properties cannot be sold purely on super built-up area claims. Pricing must accurately reflect usable carpet area with defined balconies and common areas.'
      }
    ],
    quote: {
      text: 'Transparency is the cornerstone of trust. RERA has eliminated dubious practices across the state.',
      author: 'Rajesh Rathore, Legal Counsel'
    },
    takeaways: [
      'Developers must upload quarterly project progress photos on the RERA website.',
      'Defects within 5 years of possession must be rectified by the builder for free.',
      'Heavy penalties apply if possession deadlines are missed without approved force majeure.'
    ],
    conclusion: 'When investing in any residential project across Jaipur, Kota, or Udaipur, always insist on the RERA registration certificate.'
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'why-jaipur-is-the-next-big-real-estate-hub';
  const [copied, setCopied] = useState(false);

  const [article, setArticle] = useState<BlogPostData>(
    DEFAULT_ARTICLES[slug] || DEFAULT_ARTICLES['why-jaipur-is-the-next-big-real-estate-hub']
  );

  useEffect(() => {
    // 1. Direct match in default articles
    if (DEFAULT_ARTICLES[slug]) {
      setArticle(DEFAULT_ARTICLES[slug]);
      return;
    }

    // 2. Check localStorage posts
    try {
      const saved = localStorage.getItem('shreeniwas_blog_posts');
      if (saved) {
        const posts = JSON.parse(saved);
        const match = posts.find((p: any) => 
          p.id?.toLowerCase() === slug.toLowerCase() ||
          p.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(slug.toLowerCase())
        );

        if (match) {
          setArticle({
            slug: slug,
            title: match.title,
            category: match.category || 'Market Trends',
            author: match.author || 'Aditi Sharma',
            role: 'Property Insights Team',
            date: match.date || 'Recently Published',
            readTime: match.readTime || '4 min read',
            image: match.image || 'https://images.unsplash.com/photo-1599661559882-6296fc1cb475?auto=format&fit=crop&w=1200&q=80',
            authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
            summary: match.excerpt || match.title,
            content: [
              {
                heading: 'Market Overview & Highlights',
                text: match.content || match.excerpt || 'Jaipur continues to see steady demand for residential and commercial spaces.'
              }
            ],
            takeaways: [
              'Verified property documentation saves long-term legal hurdles.',
              'Prime connectivity routes show highest capital value growth.'
            ],
            conclusion: 'Stay connected with Shreeniwas Properties for real-time Rajasthan property trends.'
          });
          return;
        }
      }
    } catch (e) {}

    // Fallback default
    setArticle(DEFAULT_ARTICLES['why-jaipur-is-the-next-big-real-estate-hub']);
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const text = encodeURIComponent(`Read "${article.title}" on Shreeniwas Properties: ${window.location.href}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
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
          <button 
            onClick={handleCopyLink} 
            title={copied ? "Copied!" : "Copy Link"}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0A1628] hover:border-[#0A1628] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={shareOnWhatsApp} 
            title="Share via WhatsApp"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-green-600 hover:border-green-600 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Article Body */}
        <div className="flex-1 prose prose-lg prose-headings:font-serif prose-headings:text-[#0A1628] prose-a:text-[#C9A96E] max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {article.summary}
          </p>

          {article.content.map((sec, i) => (
            <div key={i} className="mb-8">
              <h2 className="text-3xl font-bold mt-12 mb-6">{sec.heading}</h2>
              <p className="text-gray-700 leading-relaxed">{sec.text}</p>
            </div>
          ))}

          {article.quote && (
            <blockquote className="border-l-4 border-[#C9A96E] pl-6 italic my-10 bg-white p-6 rounded-r-lg shadow-sm">
              "{article.quote.text}"
              <footer className="text-sm font-semibold not-italic mt-4">— {article.quote.author}</footer>
            </blockquote>
          )}

          {article.takeaways && article.takeaways.length > 0 && (
            <div className="bg-[#0A1628] text-white p-8 rounded-xl my-12">
              <h3 className="text-2xl font-serif mb-4 text-[#C9A96E] mt-0">Key Takeaways for Investors & Buyers</h3>
              <ul className="space-y-3 mb-0">
                {article.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#C9A96E] mr-2">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h2 className="text-3xl font-bold mt-12 mb-6">Conclusion</h2>
          <p className="text-gray-700 leading-relaxed">
            {article.conclusion}
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
            <p className="text-gray-600 mb-4">{article.author} is a {article.role} at Shreeniwas Properties with years of advisory expertise across Jaipur, Jodhpur, Udaipur, and Rajasthan real estate.</p>
            <Link href="/blog" className="text-[#C9A96E] font-medium hover:underline">View all articles →</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
