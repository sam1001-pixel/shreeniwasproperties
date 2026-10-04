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
  const [isPaused, setIsPaused] = useState(false);

  const handleShare = (reel: ReelItem) => {
    navigator.clipboard.writeText(`https://shreeniwasproperties-pi.vercel.app/reels/${reel.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Duplicate reels array to ensure smooth continuous marquee looping
  const loopedReels = [...REELS_DATA, ...REELS_DATA, ...REELS_DATA];

  return (
    <section className="py-10 sm:py-12 px-4 bg-[#0A1628] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A96E]/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 text-[11px] font-bold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5 text-[#C9A96E]" />
              Owner's Corner & Live Reels
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white">
              Watch Real Site Tours & <span className="text-[#C9A96E]">Owner Insights</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 font-light">
              60-second site inspection shorts & walkthroughs straight from our property owners.
            </p>
          </div>

          {/* Compact Social Links */}
          <div className="flex items-center gap-2 flex-wrap">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="px-3 py-1.5 bg-white/10 hover:bg-[#C9A96E] hover:text-[#0A1628] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border border-white/10"
            >
              <Camera className="w-3.5 h-3.5" /> Instagram
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="px-3 py-1.5 bg-white/10 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border border-white/10"
            >
              <Video className="w-3.5 h-3.5" /> Shorts
            </a>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer" 
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Auto-Scrollable Horizontal Reels Track */}
        <div 
          className="relative overflow-hidden py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-4 w-max"
            animate={isPaused ? {} : { x: ["0%", "-33.333%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {loopedReels.map((reel, idx) => (
              <div
                key={`${reel.id}-${idx}`}
                className="w-44 sm:w-52 flex-shrink-0 bg-slate-900/90 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative group cursor-pointer"
                onClick={() => setSelectedReel(reel)}
              >
                {/* Aspect Ratio 9:14 Vertical Compact Card */}
                <div className="relative aspect-[9/13] overflow-hidden">
                  <img 
                    src={reel.thumbnail} 
                    alt={reel.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-black/20"></div>

                  {/* Top Tag Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#0A1628]/80 backdrop-blur-md text-[#C9A96E] text-[9px] font-bold rounded uppercase tracking-wider border border-[#C9A96E]/30">
                    {reel.tag}
                  </span>

                  {/* Duration Badge */}
                  <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-mono rounded">
                    {reel.duration}
                  </span>

                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#C9A96E]/90 text-[#0A1628] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-[#0A1628] ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-serif font-bold text-xs leading-snug line-clamp-2 text-white">{reel.title}</h4>
                    <div className="text-[10px] text-slate-300 mt-1 flex items-center justify-between">
                      <span className="truncate max-w-[90px]">{reel.location}</span>
                      <span className="flex items-center gap-1 font-mono text-[9px] text-slate-400">
                        <Eye className="w-2.5 h-2.5 text-[#C9A96E]" /> {reel.views}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
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
