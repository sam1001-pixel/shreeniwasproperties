'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Share2, Copy, Check, MessageSquare, Send, 
  Mail, QrCode, MapPin, IndianRupee, ExternalLink, Sparkles, Smartphone
} from 'lucide-react';

const XTwitterIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export interface ShareableProperty {
  id?: string | number;
  slug?: string;
  title: string;
  price?: string;
  location?: string;
  type?: string;
  bhk?: string | number;
  image?: string;
}

interface PropertyShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: ShareableProperty | null;
}

export default function PropertyShareModal({
  isOpen,
  onClose,
  property
}: PropertyShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentOrigin = window.location.origin;
      if (property?.slug) {
        setShareUrl(`${currentOrigin}/properties/${property.slug}`);
      } else {
        setShareUrl(window.location.href);
      }
      setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
    }
  }, [property, isOpen]);

  if (!isOpen || !property) return null;

  const shareTitle = property.title || 'Premier Rajasthan Property';
  const sharePrice = property.price ? ` (${property.price})` : '';
  const shareLocation = property.location ? ` in ${property.location}` : '';
  
  const textMessage = `Namaste! Explore this verified Rajasthan property listing: "${shareTitle}"${sharePrice}${shareLocation}. Verified by Shree Niwas Properties.`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${textMessage}\n\n${shareUrl}`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: textMessage,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled share or unsupported
        console.debug('Native share dismissed or failed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const shareChannels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageSquare,
      bg: 'bg-emerald-500 hover:bg-emerald-600',
      textColor: 'text-white',
      badge: 'Most Popular',
      url: `https://api.whatsapp.com/send?text=${encodedText}`,
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: Send,
      bg: 'bg-[#229ED9] hover:bg-[#1E88E5]',
      textColor: 'text-white',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(textMessage)}`,
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: XTwitterIcon,
      bg: 'bg-black hover:bg-zinc-800',
      textColor: 'text-white',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(textMessage)}&url=${encodedUrl}`,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: FacebookIcon,
      bg: 'bg-[#1877F2] hover:bg-[#166FE5]',
      textColor: 'text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: LinkedInIcon,
      bg: 'bg-[#0A66C2] hover:bg-[#004182]',
      textColor: 'text-white',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      id: 'email',
      name: 'Email / Gmail',
      icon: Mail,
      bg: 'bg-slate-700 hover:bg-slate-800',
      textColor: 'text-white',
      url: `mailto:?subject=${encodeURIComponent(`Verified Property: ${shareTitle}`)}&body=${encodedText}`,
    },
  ];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A1628]/80 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-property-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-[#0A1628] my-6"
        >
          {/* Header */}
          <div className="bg-[#0A1628] text-white p-5 sm:p-6 relative border-b-2 border-[#C9A96E]/40">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/20 flex items-center justify-center border border-[#C9A96E]/40 text-[#C9A96E]">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A96E] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Direct App Sharing
                </span>
                <h2 id="share-property-modal-title" className="text-lg sm:text-xl font-serif font-bold text-white mt-0.5">
                  Share Property Info
                </h2>
              </div>
            </div>

            {/* Property Summary Card */}
            <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center gap-3">
              {property.image && (
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-14 h-14 rounded-xl object-cover border border-[#C9A96E]/30 shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white text-sm truncate">{property.title}</p>
                <p className="text-[11px] text-slate-300 flex items-center gap-1 truncate mt-0.5">
                  <MapPin className="w-3 h-3 text-[#C9A96E] shrink-0" /> {property.location || 'Rajasthan, India'}
                </p>
                {property.price && (
                  <p className="text-xs font-black text-[#C9A96E] mt-0.5">
                    {property.price}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 space-y-6">
            {/* Native Mobile Share Button (if available) */}
            {canNativeShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0A1628] to-[#1E293B] text-[#C9A96E] font-bold text-xs rounded-2xl flex items-center justify-center gap-2 border border-[#C9A96E]/40 shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#C9A96E]" />
                <span>Share via Phone Apps (Messages, Instagram, Nearby)</span>
              </button>
            )}

            {/* Direct App Channels Grid */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Share Directly to Messaging & Social Apps
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {shareChannels.map((ch) => {
                  const Icon = ch.icon;
                  return (
                    <a
                      key={ch.id}
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative p-3 rounded-2xl ${ch.bg} ${ch.textColor} flex flex-col items-center justify-center gap-1.5 text-center transition-all hover:scale-[1.03] active:scale-[0.97] shadow-sm font-semibold text-xs`}
                    >
                      {ch.badge && (
                        <span className="absolute -top-2 right-2 px-1.5 py-0.2 bg-[#C9A96E] text-[#0A1628] text-[9px] font-black rounded-full shadow-xs">
                          {ch.badge}
                        </span>
                      )}
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="truncate">{ch.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Link Copy Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Direct Listing URL
              </label>
              <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-transparent px-3 py-2 text-xs font-mono text-slate-700 outline-none truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0 shadow-sm transition-all cursor-pointer border border-[#C9A96E]/30"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* QR Code Quick Toggle for in-person sharing */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowQr(!showQr)}
                className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-[#0A1628] p-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-[#C9A96E]" />
                  {showQr ? 'Hide In-Person Scan QR' : 'Show In-Person QR Code for Quick Mobile Camera Scan'}
                </span>
                <span className="text-[11px] font-bold text-[#C9A96E]">
                  {showQr ? 'Hide' : 'Show'}
                </span>
              </button>

              {showQr && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center flex flex-col items-center"
                >
                  <p className="text-[11px] text-slate-500 font-medium mb-3">
                    Scan with any phone camera to view this listing instantly:
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm inline-block">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareUrl)}`}
                      alt="Property Listing QR"
                      className="w-36 h-36 object-contain"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
