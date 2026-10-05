'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { SavedProperty } from '@/lib/saved-properties';

interface ToastData {
  id: string;
  action: 'added' | 'removed';
  item: SavedProperty;
}

export default function SaveToastNotifier() {
  const [toast, setToast] = useState<ToastData | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleToastEvent = (e: any) => {
      const detail = e.detail;
      if (!detail || !detail.item) return;

      setToast({
        id: String(Date.now()),
        action: detail.action,
        item: detail.item
      });

      clearTimeout(timer);
      timer = setTimeout(() => {
        setToast(null);
      }, 3500);
    };

    window.addEventListener('shreeniwas_save_toast', handleToastEvent);
    return () => {
      window.removeEventListener('shreeniwas_save_toast', handleToastEvent);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="pointer-events-auto bg-[#0A1628]/95 backdrop-blur-md text-white rounded-2xl p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-[#C9A96E]/40 flex items-center gap-3.5"
          >
            {/* Thumbnail or Icon */}
            <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-white/20 bg-slate-800">
              {toast.item.image ? (
                <img
                  src={toast.item.image}
                  alt={toast.item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-rose-500/20">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                </div>
              )}
              <div className={`absolute bottom-0 inset-x-0 h-1.5 ${toast.action === 'added' ? 'bg-[#C9A96E]' : 'bg-rose-500'}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                {toast.action === 'added' ? (
                  <>
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-[#C9A96E] uppercase tracking-wider">Added to Shortlist</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Removed from Shortlist</span>
                  </>
                )}
              </div>
              <p className="text-xs font-semibold text-white truncate">
                {toast.item.title}
              </p>
              <p className="text-[10px] text-slate-400">
                {toast.item.price} • {toast.item.location || toast.item.city}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1">
              {toast.action === 'added' && (
                <Link
                  href="/dashboard/portal/saved"
                  onClick={() => setToast(null)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#C9A96E] hover:bg-[#b59760] text-[#0A1628] font-bold text-[10px] flex items-center gap-1 transition-all shadow-sm flex-shrink-0"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
              <button
                onClick={() => setToast(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
