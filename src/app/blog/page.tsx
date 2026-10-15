'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import { syncFromServerToLocal } from '@/lib/sync/admin-sync';

const categories = ["All", "Market Trends", "Buying Guide", "Tenant Advisory", "Commercial Real Estate"];

const DEFAULT_BLOGS: any[] = [];

export default function BlogListingPage() {
  const [blogsList, setBlogsList] = useState<any[]>([]);
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
          return;
        }
      }
      setBlogsList([]);
    } catch (e) {
      setBlogsList([]);
    }
  };

  useEffect(() => {
    loadLiveBlogs();
    syncFromServerToLocal('shreeniwas_blog_posts').then(() => {
      loadLiveBlogs();
    }).catch(() => {});

    window.addEventListener('shreeniwas_data_updated', loadLiveBlogs);
    window.addEventListener('storage', loadLiveBlogs);
    return () => {
      window.removeEventListener('shreeniwas_data_updated', loadLiveBlogs);
      window.removeEventListener('storage', loadLiveBlogs);
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
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

        {blogsList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto">
            <h4 className="text-xl font-serif font-bold text-[#0A1628]">No Articles Published Yet</h4>
            <p className="text-slate-500 text-sm mt-2 mb-6">Our property analysts and editorial team will publish market reports and guides soon.</p>
            <Link href="/properties">
              <button className="px-6 py-3 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl shadow-md cursor-pointer hover:bg-[#0A1628]/90 transition-all">
                Explore Properties
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Featured Post */}
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
          </>
        )}
      </div>
    </div>
  );
}
