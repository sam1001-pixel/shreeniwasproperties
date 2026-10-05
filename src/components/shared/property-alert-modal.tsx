'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BellRing, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PropertyAlertModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    // Show modal if not previously dismissed or subscribed
    const hasSeenAlert = localStorage.getItem('shreeniwas_alert_seen');
    if (!hasSeenAlert) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // Wait 3 seconds before showing
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('shreeniwas_alert_seen', 'true');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !type || !contact) return;
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      localStorage.setItem('shreeniwas_alert_seen', 'true');
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed z-50 w-[92%] max-w-md mx-auto left-0 right-0 bottom-4 sm:bottom-6 sm:right-6 sm:left-auto flex items-end sm:items-end justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, transition: { duration: 0.2 } }}
            className="relative w-full overflow-hidden bg-white rounded-2xl shadow-2xl border border-gray-100 pointer-events-auto"
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-3 -m-1 text-gray-400 hover:text-gray-600 transition-colors z-10 rounded-full hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner Header */}
            <div className="bg-[#0A1628] p-5 sm:p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[#C9A96E]/10" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-[#C9A96E]/20 rounded-full flex items-center justify-center mb-3">
                  <BellRing className="w-6 h-6 text-[#C9A96E]" />
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-2">
                  Get Instant Property Alerts!
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Be the first to know when new properties are listed in Rajasthan.
                </p>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-5 sm:p-6">
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Preferred City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full p-4 sm:p-3 text-base sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] transition-all"
                    >
                      <option value="">Select City</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Jodhpur">Jodhpur</option>
                      <option value="Udaipur">Udaipur</option>
                      <option value="Kota">Kota</option>
                      <option value="Ajmer">Ajmer</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Property Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                      className="w-full p-4 sm:p-3 text-base sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] transition-all"
                    >
                      <option value="">Select Type</option>
                      <option value="Buy">Buy</option>
                      <option value="Rent">Rent</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Contact (Email or Phone)</label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                      placeholder="Enter your mobile number or email"
                      className="w-full p-4 sm:p-3 text-base sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 sm:py-3.5 px-4 mt-3 bg-[#C9A96E] text-[#0A1628] font-bold rounded-lg hover:bg-[#b5955a] transition-all active:scale-[0.98] shadow-md shadow-[#C9A96E]/20"
                  >
                    Subscribe for Free Alerts
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Subscribed!</h4>
                    <p className="text-gray-500 text-sm">
                      You will receive instant alerts for new properties in {city}.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
