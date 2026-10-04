'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";

const categories = ["All", "Market Trends", "Buying Guide", "Tenant Advisory", "Commercial Real Estate"];

const DEFAULT_BLOGS = [
  {
    slug: "why-jaipur-is-the-next-big-real-estate-hub",
    title: "Why Jaipur is the Next Big Real Estate Hub in India",
    excerpt: "Discover the driving factors behind Jaipur's booming real estate market and why investors are flocking to the Pink City.",
    category: "Market Trends",
    author: "Aditi Sharma",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1599661559882-6296fc1cb475?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "first-time-homebuyer-guide",
    title: "The Ultimate Guide for First-Time Homebuyers in Rajasthan",
    excerpt: "A comprehensive step-by-step guide to help you navigate the complex process of buying your first home.",
    category: "Buying Guide",
    author: "Vikram Singh",
    date: "Oct 08, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "understanding-rera-rajasthan",
    title: "Understanding RERA Rajasthan: What Every Buyer Must Know",
    excerpt: "Learn how RERA protects property buyers in Rajasthan and how to check RERA registration of a project.",
    category: "Tenant Advisory",
    author: "Rajesh Rathore",
    date: "Sep 28, 2023",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80"
  }
];

export default function BlogListingPage() {
  const [blogsList, setBlogsList] = useState<any[]>(DEFAULT_BLOGS);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const loadLiveBlogs = () => {
    try {
      const saved = localStorage.getItem('shreeniwas_blog_posts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted = parsed.map((b: any, idx: number) => ({
            slug: b.id?.toLowerCase() || `blog-${idx}`,
            title: b.title || 'Jaipur Real Estate Insights',
            excerpt: b.excerpt || b.title,
            category: b.category || 'Market Trends',
            author: b.author || 'Aditi Sharma',
            date: b.date || 'Today',
            readTime: b.readTime || '5 min read',
            image: b.image || 'https://images.unsplash.com/photo-1599661559882-6296fc1cb475?auto=format&fit=crop&w=800&q=80'
          }));
          setBlogsList(formatted);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadLiveBlogs();
    window.addEventListener('shreeniwas_data_updated', loadLiveBlogs);
    window.addEventListener('storage', loadLiveBlogs);
    return () => {
      window.removeEventListener('shreeniwas_data_updated', loadLiveBlogs);
      window.removeEventListener('storage', loadLiveBlogs);
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-bold">Real Estate Insights</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#0A1628]">Rajasthan Real Estate News & Guides</h1>
          <p className="text-gray-600 text-lg">Market analysis, investment advice, and home buying tips for Rajasthan.</p>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 sm:flex-wrap sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                selectedCategory === cat ? 'bg-[#0A1628] text-[#C9A96E]' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {blogsList.length > 0 && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-full min-h-[300px]">
              <Image src={blogsList[0].image} alt={blogsList[0].title} fill className="object-cover" />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center space-y-4">
              <span className="bg-[#C9A96E]/20 text-[#0A1628] text-xs font-bold px-3 py-1 rounded-full w-fit">
                {blogsList[0].category}
              </span>
              <h2 className="text-3xl font-bold font-serif text-[#0A1628] hover:text-[#C9A96E] transition-colors">
                <Link href={`/blog/${blogsList[0].slug}`}>{blogsList[0].title}</Link>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{blogsList[0].excerpt}</p>
              <div className="flex items-center text-xs text-gray-500 gap-4 pt-4 border-t border-gray-100">
                <span className="flex items-center gap-1 font-medium"><User className="w-3.5 h-3.5 text-[#C9A96E]" /> {blogsList[0].author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blogsList[0].readTime}</span>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsList
            .filter(b => selectedCategory === "All" || b.category === selectedCategory)
            .map((blog, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                  <span className="absolute top-3 left-3 bg-[#0A1628] text-[#C9A96E] text-xs font-bold px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-[#0A1628] hover:text-[#C9A96E] transition-colors mb-2">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>{blog.author}</span>
                    <Link href={`/blog/${blog.slug}`} className="text-[#C9A96E] font-semibold flex items-center gap-1 hover:underline">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
