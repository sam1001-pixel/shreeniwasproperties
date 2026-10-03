'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export interface PropertyCompareItem {
  id: number | string;
  title: string;
  location: string;
  price: string;
  pricePerSqft?: string;
  sqft: number | string;
  bhk?: string;
  image: string;
  type: string;
  status: string;
  reraApproved?: boolean;
}

interface PropertyComparisonProps {
  selectedItems: PropertyCompareItem[];
  onRemoveItem: (id: number | string) => void;
  onClearAll: () => void;
}

export default function PropertyComparison({ selectedItems, onRemoveItem, onClearAll }: PropertyComparisonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (selectedItems.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Comparison Drawer Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#0A1628] border border-[#C9A96E]/40 text-white rounded-2xl shadow-2xl p-3 sm:p-4 max-w-2xl w-[92%] flex items-center justify-between gap-4 backdrop-blur-lg"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/20 flex items-center justify-center flex-shrink-0 text-[#C9A96E] border border-[#C9A96E]/30">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Property Comparison</span>
              <span className="bg-[#C9A96E] text-[#0A1628] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {selectedItems.length} / 3
              </span>
            </div>
            <p className="text-xs text-slate-300 truncate hidden sm:block">
              {selectedItems.map(i => i.title).join(" • ")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-[#C9A96E] hover:bg-[#b59760] text-[#0A1628] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            Compare Now <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClearAll}
            className="p-2 text-slate-400 hover:text-rose-400 transition-colors rounded-lg hover:bg-white/5"
            title="Clear Comparison"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Full Comparison Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-100"
            >
              {/* Modal Header */}
              <div className="bg-[#0A1628] text-white p-6 flex justify-between items-center border-b border-[#C9A96E]/30">
                <div className="flex items-center gap-3">
                  <Scale className="w-6 h-6 text-[#C9A96E]" />
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Shreeniwas Side-by-Side Property Comparison</h3>
                    <p className="text-xs text-slate-300">Comparing {selectedItems.length} selected listings</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Comparison Table */}
              <div className="p-6 overflow-x-auto no-scrollbar flex-1">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="w-1/4 p-4 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 rounded-tl-xl">Feature</th>
                      {selectedItems.map((item) => (
                        <th key={item.id} className="p-4 bg-slate-50 relative border-l border-slate-200">
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 rounded-full hover:bg-white transition-colors"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="relative h-28 w-full rounded-lg overflow-hidden mb-3">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                          </div>
                          <h4 className="font-semibold text-sm text-[#0A1628] line-clamp-1">{item.title}</h4>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3 text-[#C9A96E]"/>{item.location}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    <tr>
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Price</td>
                      {selectedItems.map(item => (
                        <td key={item.id} className="p-4 font-bold text-[#0A1628] border-l border-slate-100 text-base">{item.price}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Price / Sq.Ft</td>
                      {selectedItems.map(item => (
                        <td key={item.id} className="p-4 text-slate-600 border-l border-slate-100 font-mono text-xs">{item.pricePerSqft || '₹4,500/sq.ft'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Property Type</td>
                      {selectedItems.map(item => (
                        <td key={item.id} className="p-4 text-slate-600 border-l border-slate-100">{item.type}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Built-Up Area</td>
                      {selectedItems.map(item => (
                        <td key={item.id} className="p-4 text-slate-600 border-l border-slate-100">{item.sqft} sq.ft</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Status</td>
                      {selectedItems.map(item => (
                        <td key={item.id} className="p-4 border-l border-slate-100">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                            {item.status}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">RERA Approved</td>
                      {selectedItems.map(item => (
                        <td key={item.id} className="p-4 border-l border-slate-100 text-emerald-700 font-medium">
                          <ShieldCheck className="w-4 h-4 inline mr-1 text-emerald-600" /> RERA Verified
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Paid VIP Visit</td>
                      {selectedItems.map(item => (
                        <td key={item.id} className="p-4 border-l border-slate-100">
                          <span className="text-xs font-bold text-[#C9A96E] bg-[#C9A96E]/10 px-2 py-1 rounded border border-[#C9A96E]/20">
                            ₹499 Guaranteed
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-[#0A1628] text-white font-semibold text-sm rounded-xl hover:bg-[#0A1628]/90 transition-colors"
                >
                  Close Comparison
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
