'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Clock, Sunrise, Sun, Sunset, 
  Crown, Check, CheckCircle2, Phone, User, 
  MessageSquare, ShieldCheck, MapPin, Sparkles, ArrowRight
} from 'lucide-react';

export type TimeSlotId = '9am-12' | '12-3pm' | '5-7pm';

export interface TimeSlotOption {
  id: TimeSlotId;
  label: string;
  timeRange: string;
  period: string;
  popular?: boolean;
}

export const VISIT_TIME_SLOTS: TimeSlotOption[] = [
  {
    id: '9am-12',
    label: '9am - 12pm',
    timeRange: '9:00 AM – 12:00 PM',
    period: 'Morning Slot',
    popular: true,
  },
  {
    id: '12-3pm',
    label: '12 - 3pm',
    timeRange: '12:00 PM – 3:00 PM',
    period: 'Afternoon Slot',
  },
  {
    id: '5-7pm',
    label: '5 - 7pm',
    timeRange: '5:00 PM – 7:00 PM',
    period: 'Evening Slot',
  },
];

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
  propertyLocation?: string;
  propertyPrice?: string;
  propertyImage?: string;
  onBookingComplete?: (bookingData: {
    visitorName: string;
    visitorPhone: string;
    visitDate: string;
    timeSlot: TimeSlotOption;
  }) => void;
}

export default function ScheduleVisitModal({
  isOpen,
  onClose,
  propertyTitle = "Premier Rajasthan Property",
  propertyLocation = "Jaipur, Rajasthan",
  propertyPrice = "₹3.5 Cr",
  propertyImage,
  onBookingComplete
}: ScheduleVisitModalProps) {
  // Form state
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  // Default to tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = new Date().toISOString().split('T')[0];
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [visitDate, setVisitDate] = useState(defaultDateStr);
  
  // 3 Time Slot Variations: 9am-12, 12-3pm, 5-7pm
  const [selectedSlotId, setSelectedSlotId] = useState<TimeSlotId>('9am-12');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedSlot = VISIT_TIME_SLOTS.find(s => s.id === selectedSlotId) || VISIT_TIME_SLOTS[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorPhone.trim() || !visitDate) return;

    setIsSubmitting(true);

    const bookingPayload = {
      id: `VISIT-${Date.now().toString().slice(-4)}`,
      user: visitorName.trim(),
      phone: visitorPhone.trim(),
      email: "vip.visit@shreeniwas.com",
      property: propertyTitle,
      type: "VIP Site Visit Booking",
      status: "Confirmed & Scheduled",
      query: `Scheduled VIP Site Visit on ${visitDate} during ${selectedSlot.label} (${selectedSlot.timeRange}). ₹499 fee refundable.`,
      visitDate,
      visitTimeSlot: selectedSlot.timeRange,
      slotLabel: selectedSlot.label,
      reply: ""
    };

    // Save to local inquiries store
    try {
      const existingRaw = localStorage.getItem('shreeniwas_inquiries');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem('shreeniwas_inquiries', JSON.stringify([bookingPayload, ...existing]));
      window.dispatchEvent(new Event('shreeniwas_data_updated'));
    } catch (err) {
      console.warn('Could not save booking locally:', err);
    }

    if (onBookingComplete) {
      onBookingComplete({
        visitorName: visitorName.trim(),
        visitorPhone: visitorPhone.trim(),
        visitDate,
        timeSlot: selectedSlot
      });
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setVisitorName('');
    setVisitorPhone('');
    setSelectedSlotId('9am-12');
    onClose();
  };

  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    `Namaste Shree Niwas Properties, I want to confirm my VIP Site Visit for "${propertyTitle}" on ${visitDate} during the ${selectedSlot.label} (${selectedSlot.timeRange}) slot.`
  );

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A1628]/80 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-[#0A1628] my-6"
        >
          {/* Header Bar */}
          <div className="bg-[#0A1628] text-white p-5 sm:p-6 relative border-b-2 border-[#C9A96E]/40">
            <button
              onClick={handleReset}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C9A96E]/20 flex items-center justify-center border border-[#C9A96E]/40 text-[#C9A96E] shrink-0">
                <Crown className="w-5 h-5" />
              </div>
              <div className="pr-8">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A96E]">
                    VIP Site Inspection
                  </span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                    100% Refundable
                  </span>
                </div>
                <h2 id="schedule-modal-title" className="text-lg sm:text-xl font-serif font-bold text-white mt-0.5 leading-snug">
                  Book Visit Schedule
                </h2>
              </div>
            </div>

            {/* Property Quick Summary */}
            <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-200">
              <div className="truncate pr-3">
                <p className="font-semibold text-white truncate">{propertyTitle}</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#C9A96E] shrink-0" /> {propertyLocation}
                </p>
              </div>
              {propertyPrice && (
                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Price</span>
                  <span className="font-serif font-bold text-[#C9A96E] text-sm">{propertyPrice}</span>
                </div>
              )}
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-5 sm:p-7">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 py-2"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A1628]">Site Visit Scheduled!</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                    Namaste <span className="font-bold text-[#0A1628]">{visitorName}</span>, your accompanied walkthrough is confirmed.
                  </p>
                </div>

                {/* Booking Receipt Summary Card */}
                <div className="bg-[#FDFBF7] border border-[#C9A96E]/30 rounded-2xl p-4 text-left space-y-2 text-xs">
                  <div className="flex justify-between pb-2 border-b border-slate-200/80">
                    <span className="text-slate-500 font-medium">Selected Date:</span>
                    <span className="font-bold text-[#0A1628]">{visitDate}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-200/80">
                    <span className="text-slate-500 font-medium">Time Window:</span>
                    <span className="font-bold text-[#C9A96E] bg-[#0A1628] px-2 py-0.5 rounded text-[11px]">
                      {selectedSlot.label} ({selectedSlot.timeRange})
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-200/80">
                    <span className="text-slate-500 font-medium">Contact WhatsApp:</span>
                    <span className="font-bold text-[#0A1628]">{visitorPhone}</span>
                  </div>
                  <div className="flex justify-between pt-0.5 text-[11px] text-emerald-700">
                    <span className="flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Advisor Accompaniment
                    </span>
                    <span className="font-bold">Dedicated AC Cab</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <a
                    href={`https://wa.me/916376117833?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Notify Senior Advisor on WhatsApp
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                {/* Name & Phone in 2 Columns on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] focus:bg-white transition-all text-[#0A1628]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={visitorPhone}
                        onChange={(e) => setVisitorPhone(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] focus:bg-white transition-all text-[#0A1628]"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Visit Date *
                    </label>
                    <span className="text-[10px] text-slate-500 font-medium">Advance booking guaranteed</span>
                  </div>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      required
                      min={minDateStr}
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] focus:bg-white transition-all text-[#0A1628] cursor-pointer"
                    />
                  </div>
                </div>

                {/* 3 TIME VARIATIONS - UI/UX PRO MAX CHIP SELECTOR */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                      Preferred Time Window *
                    </label>
                    <span className="text-[10px] text-[#A27B36] font-semibold bg-[#C9A96E]/15 px-2 py-0.5 rounded-full">
                      3 Daily Slots
                    </span>
                  </div>

                  <div 
                    className="grid grid-cols-3 gap-2"
                    role="radiogroup"
                    aria-label="Preferred visit time slot"
                  >
                    {VISIT_TIME_SLOTS.map((slot) => {
                      const isSelected = selectedSlotId === slot.id;
                      const IconComponent = 
                        slot.id === '9am-12' ? Sunrise : 
                        slot.id === '12-3pm' ? Sun : Sunset;

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setSelectedSlotId(slot.id)}
                          className={`relative p-3 rounded-2xl border text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-between gap-1 min-h-[76px] sm:min-h-[82px] outline-none ${
                            isSelected
                              ? 'bg-[#0A1628] border-[#C9A96E] text-white shadow-md shadow-[#0A1628]/25 ring-2 ring-[#C9A96E]/40 scale-[1.02]'
                              : 'bg-slate-50/90 border-slate-200/90 hover:border-slate-300 text-slate-700 hover:bg-slate-100/70'
                          }`}
                        >
                          {/* Active Indicator Checkmark */}
                          {isSelected && (
                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C9A96E] text-[#0A1628] flex items-center justify-center shadow-xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}

                          <IconComponent 
                            className={`w-4 h-4 ${isSelected ? 'text-[#C9A96E]' : 'text-slate-500'}`} 
                          />

                          <div>
                            <span className={`block text-xs font-black tracking-tight ${isSelected ? 'text-white' : 'text-[#0A1628]'}`}>
                              {slot.label}
                            </span>
                            <span className={`block text-[9px] font-medium leading-tight mt-0.5 ${isSelected ? 'text-[#C9A96E]' : 'text-slate-500'}`}>
                              {slot.period}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Slot Details Banner */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                      Selected Time: <strong className="text-[#0A1628] font-semibold">{selectedSlot.timeRange}</strong>
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                      Advisor Assigned
                    </span>
                  </div>
                </div>

                {/* VIP Perks Micro Banner */}
                <div className="p-3 rounded-xl bg-[#0A1628]/5 border border-[#C9A96E]/20 text-[11px] text-slate-600 space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#0A1628]">
                    <span>VIP Service Package Included</span>
                    <span className="text-[#C9A96E] bg-[#0A1628] px-2 py-0.5 rounded text-[10px]">₹499 Deposit</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Includes dedicated AC cab pickup, RERA property document audit, and 1-on-1 walkthrough. 100% refundable against booking.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-[#0A1628]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#C9A96E]/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" />
                  ) : (
                    <>
                      <Crown className="w-4 h-4 text-[#C9A96E]" />
                      <span>Confirm {selectedSlot.label} Visit</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
