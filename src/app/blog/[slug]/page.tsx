'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { User, Clock, Calendar, ArrowLeft, Share2, MessageCircle, Check } from "lucide-react";
import { syncFromServerToLocal } from '@/lib/sync/admin-sync';

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

const DEFAULT_ARTICLES: Record<string, BlogPostData> = {};

export default function BlogPostPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  const [copied, setCopied] = useState(false);

  const [article, setArticle] = useState<BlogPostData | null>(null);

  useEffect(() => {
    const resolveBlogArticle = () => {
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

      // Fallback
      setArticle(null);
    };

    resolveBlogArticle();
    syncFromServerToLocal('shreeniwas_blog_posts').then(() => {
      resolveBlogArticle();
    }).catch(() => {});

    window.addEventListener('shreeniwas_data_updated', resolveBlogArticle);
    window.addEventListener('storage', resolveBlogArticle);
    return () => {
      window.removeEventListener('shreeniwas_data_updated', resolveBlogArticle);
      window.removeEventListener('storage', resolveBlogArticle);
    };
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnWhatsApp = () => {
    if (typeof window !== 'undefined' && article) {
      const text = encodeURIComponent(`Read "${article.title}" on Shreeniwas Properties: ${window.location.href}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-2xl font-serif font-bold text-[#0A1628]">Article Not Found</h2>
          <p className="text-slate-500 text-sm">The article you are looking for does not exist or has been removed.</p>
          <Link href="/blog" className="inline-block px-6 py-3 bg-[#0A1628] text-[#C9A96E] font-bold text-xs rounded-xl shadow-md cursor-pointer hover:bg-[#0A1628]/90 transition-all">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#FDFBF7] pb-20">
      {/* Header */}
      <div className="container mx-auto max-w-4xl px-4 pt-28 sm:pt-32 pb-8">
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
