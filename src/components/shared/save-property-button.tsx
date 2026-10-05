'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { isPropertySaved, toggleSaveProperty, SavedProperty } from '@/lib/saved-properties';

interface SavePropertyButtonProps {
  property: {
    id: string | number;
    title: string;
    slug?: string;
    location?: string;
    city?: string;
    price?: string;
    bhk?: string;
    sqft?: number | string;
    type?: string;
    image?: string;
    reraApproved?: boolean;
    zeroBrokerage?: boolean;
  };
  variant?: 'floating' | 'pill' | 'minimal' | 'detail';
  className?: string;
  showText?: boolean;
}

export default function SavePropertyButton({
  property,
  variant = 'floating',
  className = '',
  showText = false
}: SavePropertyButtonProps) {
  const [saved, setSaved] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  // Sync state on mount and on global update event
  useEffect(() => {
    setSaved(isPropertySaved(property.id || property.slug));

    const handleUpdate = () => {
      setSaved(isPropertySaved(property.id || property.slug));
    };

    window.addEventListener('shreeniwas_favorites_updated', handleUpdate);
    return () => window.removeEventListener('shreeniwas_favorites_updated', handleUpdate);
  }, [property.id, property.slug]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAnimating(true);
    const result = toggleSaveProperty({
      id: String(property.id),
      title: property.title,
      slug: property.slug || String(property.id),
      location: property.location,
      city: property.city,
      price: property.price,
      bhk: property.bhk,
      sqft: property.sqft,
      type: property.type,
      image: property.image,
      reraApproved: property.reraApproved,
      zeroBrokerage: property.zeroBrokerage
    });

    setSaved(result.saved);

    if (result.saved) {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 900);
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  // Base Heart Icon with UI/UX Pro Max micro-animation
  const heartIcon = (
    <div className="relative flex items-center justify-center">
      {/* Expanding Ripple Ring upon Save */}
      <AnimatePresence>
        {isAnimating && saved && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-rose-500/30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Floating Sparkle Particles */}
      <AnimatePresence>
        {showSparkles && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{ scale: 1, opacity: 0, x: -14, y: -14 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute pointer-events-none text-[#C9A96E]"
            >
              <Sparkles className="w-2.5 h-2.5 fill-current" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{ scale: 1, opacity: 0, x: 14, y: -12 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="absolute pointer-events-none text-rose-500"
            >
              <Sparkles className="w-2.5 h-2.5 fill-current" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{ scale: 0.8, opacity: 0, x: 12, y: 12 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="absolute pointer-events-none text-[#C9A96E]"
            >
              <Sparkles className="w-2 h-2 fill-current" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Heart with Elastic Bounce */}
      <motion.div
        animate={isAnimating ? {
          scale: saved ? [1, 1.45, 0.85, 1.15, 1] : [1, 0.8, 1.1, 1]
        } : { scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
      >
        <Heart
          className={`transition-colors duration-200 ${
            variant === 'detail' ? 'w-4 h-4' : 'w-3.5 h-3.5'
          } ${
            saved
              ? 'fill-rose-500 text-rose-500 drop-shadow-[0_2px_8px_rgba(244,63,94,0.4)]'
              : 'text-slate-600 hover:text-rose-500'
          }`}
        />
      </motion.div>
    </div>
  );

  if (variant === 'detail') {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        aria-label={saved ? 'Remove from Saved' : 'Save Property'}
        title={saved ? 'Saved in Shortlist' : 'Save to Shortlist'}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer select-none ${
          saved
            ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
            : 'bg-white border-slate-200 text-slate-700 hover:border-[#C9A96E] hover:text-[#0A1628] hover:bg-slate-50'
        } ${className}`}
      >
        {heartIcon}
        <span>{saved ? 'Saved in Shortlist' : 'Save Property'}</span>
      </motion.button>
    );
  }

  if (variant === 'pill') {
    return (
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={handleClick}
        aria-label={saved ? 'Remove from Saved' : 'Save Property'}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md transition-all cursor-pointer ${
          saved
            ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-sm'
            : 'bg-white/90 text-slate-700 hover:bg-white border border-slate-200/50 shadow-sm'
        } ${className}`}
      >
        {heartIcon}
        {showText && <span>{saved ? 'Saved' : 'Save'}</span>}
      </motion.button>
    );
  }

  // Default: Floating circular card action button
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={handleClick}
      aria-label={saved ? 'Remove from Saved' : 'Save Property'}
      title={saved ? 'Saved to Shortlist' : 'Save Property'}
      className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer border border-white/60 backdrop-blur-md hover:scale-105 active:scale-90 ${className}`}
    >
      {heartIcon}
    </motion.button>
  );
}
