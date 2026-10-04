'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Heart, Eye, Share2, Camera, Video, Globe, 
  MessageCircle, ExternalLink, Sparkles, X, Check
} from 'lucide-react';

interface ReelItem {
  id: string;
  title: string;
  location: string;
  thumbnail: string;
  videoUrl?: string;
  views: string;
  likes: string;
  duration: string;
  tag: string;
}

const REELS_DATA: ReelItem[] = [
  {
    id: "reel-1",
    title: "4 BHK Royal Villa Inside Tour (Vaishali Nagar)",
    location: "Jaipur, Rajasthan",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600",
    views: "24.5K",
    likes: "3.2K",
    duration: "0:45",
    tag: "Exclusive Walkthrough"
  },
  {
    id: "reel-2",
    title: "Lakeview Penthouse Sunset Views",
    location: "Udaipur, Rajasthan",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
    views: "18.9K",
    likes: "2.8K",
    duration: "0:30",
    tag: "Luxury Penthouse"
  },
  {
    id: "reel-3",
    title: "Heritage Haveli Renovation Story",
    location: "Jodhpur, Rajasthan",
    thumbnail: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=600",
    views: "42.1K",
    likes: "5.6K",
    duration: "0:58",
    tag: "Heritage Property"
  },
  {
    id: "reel-4",
    title: "How to Spot RERA Approved Land in Rajasthan",
    location: "Founder's Desk",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600",
    views: "31.0K",
    likes: "4.1K",
    duration: "0:40",
    tag: "Owner Advice"
  }
];

export default function OwnerReelsFeed() {
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = (reel: ReelItem) => {
    navigator.clipboard.writeText(`https://shreeniwasproperties-pi.vercel.app/reels/${reel.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="py-20 px-4 bg-[#0A1628] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A96E]/10 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 text-xs font-bold uppercase tracking-wider mb-3">
              <Camera className="w-4 h-4 text-[#C9A96E]" />
              Owner's Corner & Live Reels
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
              Watch Real Site Tours & <span className="text-[#C9A96E]">Owner Insights</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Explore 60-second video walkthroughs, site inspection shorts, and market tips straight from our property owners and team.
            </p>
          </div>

          {/* Social Media Links Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="px-4 py-2.5 bg-white/10 hover:bg-[#C9A96E] hover:text-[#0A1628] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-white/10"
            >
              <Camera className="w-4 h-4" /> Instagram Reels
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="px-4 py-2.5 bg-white/10 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-white/10"
            >
              <Video className="w-4 h-4" /> YouTube Shorts
            </a>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer" 
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Channel
            </a>
          </div>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REELS_DATA.map((reel) => (
            <motion.div
              key={reel.id}
              whileHover={{ y: -6 }}
              className="bg-slate-900/90 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer flex flex-col justify-between"
              onClick={() => setSelectedReel(reel)}
            >
              {/* Aspect Ratio 9:16 Vertical Reel Box */}
              <div className="relative aspect-[9/14] overflow-hidden">
                <img 
                  src={reel.thumbnail} 
                  alt={reel.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-black/30"></div>

                {/* Top Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#0A1628]/80 backdrop-blur-md text-[#C9A96E] text-[10px] font-bold rounded-lg uppercase tracking-wider border border-[#C9A96E]/30">
                  {reel.tag}
                </span>

                {/* Duration Badge */}
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono rounded">
                  {reel.duration}
                </span>

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#C9A96E]/90 text-[#0A1628] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-[#0A1628] ml-1" />
                  </div>
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-serif font-bold text-sm leading-snug line-clamp-2 text-white">{reel.title}</h4>
                  <p className="text-[11px] text-slate-300 mt-1 flex items-center justify-between">
                    <span>{reel.location}</span>
                    <span className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-[#C9A96E]" /> {reel.views}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> {reel.likes}</span>
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Reel Preview Modal */}
      <AnimatePresence>
        {selectedReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20 text-white"
            >
              <button
                onClick={() => setSelectedReel(null)}
                className="absolute top-4 right-4 z-20 p-2 text-white bg-black/50 hover:bg-black rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                <img src={selectedReel.thumbnail} alt={selectedReel.title} className="w-full h-full object-cover opacity-80" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#C9A96E] text-[#0A1628] flex items-center justify-center shadow-2xl animate-pulse">
                    <Play className="w-8 h-8 fill-[#0A1628] ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C9A96E] uppercase tracking-wider">{selectedReel.tag}</span>
                    <span className="text-xs text-slate-300 font-mono">{selectedReel.views} Views</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white">{selectedReel.title}</h3>
                  <p className="text-xs text-slate-300">{selectedReel.location}</p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => handleShare(selectedReel)}
                      className="flex-1 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                      {copiedLink ? "Link Copied!" : "Share Reel"}
                    </button>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-3 bg-[#C9A96E] text-[#0A1628] font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow"
                    >
                      Instagram <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
