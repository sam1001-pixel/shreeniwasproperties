'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Bot, User, Sparkles, Building2, 
  MapPin, Phone, ShieldCheck, ChevronRight, RefreshCw, Calendar,
  LocateFixed, Loader2, Navigation, Compass, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import SecureQrPaymentModal from './secure-qr-payment-modal';
import ScheduleVisitModal from './schedule-visit-modal';
import { useSiteSettings } from '@/lib/settings/site-settings-context';
import { 
  detectUserCityViaGPS, 
  getSavedDetectedCity, 
  saveDetectedCity,
  RAJASTHAN_CITIES_COORDS
} from '@/lib/location-service';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  options?: { label: string; action: string }[];
  propertyCard?: {
    title: string;
    location: string;
    price: string;
    image: string;
    slug: string;
  };
}

const FEATURED_PROPERTIES_BY_CITY: Record<string, {
  title: string;
  location: string;
  price: string;
  image: string;
  slug: string;
}> = {
  Jodhpur: {
    title: "Sun City Heritage Haveli",
    location: "Ratanada, Jodhpur",
    price: "₹5.2 Cr",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800&sig=3",
    slug: "sun-city-heritage-haveli-jodhpur"
  },
  Jaipur: {
    title: "The Royal Heritage Residency",
    location: "Vaishali Nagar, Jaipur",
    price: "₹3.5 Cr",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800&sig=1",
    slug: "royal-heritage-residency-jaipur"
  },
  Udaipur: {
    title: "Lakeview Palace Heights",
    location: "Fatehpura, Udaipur",
    price: "₹1.8 Cr",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800&sig=2",
    slug: "lakeview-palace-heights-udaipur"
  },
  Kota: {
    title: "Chambal Riverfront Royal Villa",
    location: "RK Puram, Kota",
    price: "₹1.4 Cr",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800&sig=7",
    slug: "chambal-riverfront-villa-kota"
  },
  Ajmer: {
    title: "Ana Sagar Heritage Heights",
    location: "Vaishali Nagar, Ajmer",
    price: "₹95 Lakh",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800&sig=8",
    slug: "ana-sagar-heritage-heights-ajmer"
  }
};

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'msg-1',
  sender: 'bot',
  text: "Khamma Ghani! 🙏 Welcome to Shreeniwas Properties. I am your AI Real Estate Concierge. I can scan your GPS location to instantly recommend verified properties near you, or help you schedule a 1st Free Site Visit!",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  options: [
    { label: "📍 Recommend Properties Near My GPS Location", action: "detect_gps" },
    { label: "🚘 Book Site Visit (1st Free Visit)", action: "vip_visit" },
    { label: "🏰 View Top Jodhpur Heritage Listings", action: "jodhpur_listings" },
    { label: "🏢 Find 3 BHK Villas in Jaipur", action: "villas_jaipur" },
    { label: "📜 RERA & 80% Home Loan Check", action: "rera_loans" }
  ]
};

export default function AiConciergeChatbot() {
  const { settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isScheduleVisitOpen, setIsScheduleVisitOpen] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [activePropertyForVisit, setActivePropertyForVisit] = useState<{
    title: string;
    location: string;
    price: string;
  }>({
    title: "Sun City Heritage Haveli",
    location: "Ratanada, Jodhpur",
    price: "₹5.2 Cr"
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handler to perform GPS Geolocation and recommend nearest properties
  const handleDetectGpsLocation = async () => {
    setIsDetectingGps(true);
    setIsTyping(true);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: "📍 Detect my GPS address and recommend nearby properties",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    const res = await detectUserCityViaGPS();
    setIsDetectingGps(false);

    setTimeout(() => {
      let botResponse: ChatMessage;
      const detectedCity = res.cityName || getSavedDetectedCity() || 'Jodhpur';
      const prop = FEATURED_PROPERTIES_BY_CITY[detectedCity] || FEATURED_PROPERTIES_BY_CITY['Jodhpur'];

      if (res.success) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `📍 GPS Detected! You are near ${detectedCity}, Rajasthan (approx. ${res.distanceKm ?? 0} km away). Here is our top verified property matching your exact area:`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          propertyCard: prop,
          options: [
            { label: `🚘 Book 1st Free Site Visit for ${prop.title}`, action: `schedule_prop_${prop.slug}` },
            { label: `🔍 Explore all properties in ${detectedCity}`, action: `view_city_${detectedCity.toLowerCase()}` },
            { label: "💳 Pay ₹499 VIP Pass via UPI QR", action: "trigger_payment" }
          ]
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `We defaulted to our flagship headquarters in Jodhpur (${res.error || 'GPS access denied'}). Here is our top featured Jodhpur property:`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          propertyCard: FEATURED_PROPERTIES_BY_CITY['Jodhpur'],
          options: [
            { label: "🚘 Book 1st Free Site Visit", action: "vip_visit" },
            { label: "🔍 View All Rajasthan Listings", action: "view_properties" },
            { label: "📞 Request Senior Advisor Callback", action: "callback" }
          ]
        };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 700);
  };

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI Response Generator
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let botResponse: ChatMessage;

      if (lower.includes('gps') || lower.includes('location') || lower.includes('near me') || lower.includes('address')) {
        handleDetectGpsLocation();
        return;
      } else if (lower.includes('free visit') || lower.includes('first visit') || lower.includes('1st free')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "✨ Great news! Your 1st Site Inspection is 100% Free (₹0) when logged into your Shreeniwas account. Subsequent visits are ₹499 with a dedicated AC cab and dedicated senior advisor.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: "🚘 Book Your 1st Free Visit Now", action: "vip_visit" },
            { label: "📍 Check Nearby Properties via GPS", action: "detect_gps" }
          ]
        };
      } else if (lower.includes('vip') || lower.includes('visit') || lower.includes('cab') || lower.includes('499')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "Our VIP Site Visit includes a dedicated AC cab pickup, personalized property tour with a senior RERA advisor, and verified legal documentation check. 1st visit is 100% FREE for logged-in users, next visits are ₹499 pass.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: "🚘 Schedule Site Visit Now", action: "vip_visit" },
            { label: "💳 Pay ₹499 via QR Code Now", action: "trigger_payment" },
            { label: "📞 Speak with Visit Coordinator", action: "callback" }
          ]
        };
      } else if (lower.includes('jodhpur') || lower.includes('haveli') || lower.includes('sun city')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "Here is our top verified luxury property in Jodhpur (Shreeniwas HQ):",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          propertyCard: FEATURED_PROPERTIES_BY_CITY['Jodhpur'],
          options: [
            { label: "🚘 Book Site Visit (1st Free)", action: "vip_visit" },
            { label: "🔍 View All Jodhpur Listings", action: "view_city_jodhpur" }
          ]
        };
      } else if (lower.includes('villa') || lower.includes('jaipur') || lower.includes('3 bhk')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "Here is our top featured luxury villa in Vaishali Nagar, Jaipur:",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          propertyCard: FEATURED_PROPERTIES_BY_CITY['Jaipur'],
          options: [
            { label: "🚘 Book VIP Site Visit (1st Free)", action: "vip_visit" },
            { label: "🔍 View All Jaipur Listings", action: "view_city_jaipur" }
          ]
        };
      } else if (lower.includes('loan') || lower.includes('rera') || lower.includes('legal')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "All Shreeniwas properties are 100% RERA Approved with clear title deeds. We partner with SBI, HDFC, and ICICI Bank for 80% home loan pre-approvals.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: "📞 Request Free Legal Advice", action: "callback" },
            { label: "🚘 Schedule Document Inspection Visit", action: "vip_visit" }
          ]
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Thank you for asking about "${userText}". Our senior real estate advisor will be happy to guide you with exact price per sq.ft details and availability.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: "📍 Find Properties Near My GPS Location", action: "detect_gps" },
            { label: "🚘 Schedule Site Visit (1st Free)", action: "vip_visit" },
            { label: "📞 Request Quick Agent Callback", action: "callback" }
          ]
        };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 700);
  };

  const handleOptionClick = (option: { label: string; action: string }) => {
    if (option.action === 'detect_gps') {
      handleDetectGpsLocation();
      return;
    }

    if (option.action === 'trigger_payment') {
      setIsPaymentModalOpen(true);
      return;
    }

    if (option.action === 'vip_visit') {
      setIsScheduleVisitOpen(true);
      return;
    }

    if (option.action.startsWith('schedule_prop_')) {
      const slug = option.action.replace('schedule_prop_', '');
      const matched = Object.values(FEATURED_PROPERTIES_BY_CITY).find(p => p.slug === slug);
      if (matched) {
        setActivePropertyForVisit(matched);
      }
      setIsScheduleVisitOpen(true);
      return;
    }

    if (option.action === 'view_properties') {
      window.location.href = '/properties';
      return;
    }

    if (option.action.startsWith('view_city_')) {
      const cityName = option.action.replace('view_city_', '');
      window.location.href = `/locations/${cityName}`;
      return;
    }

    handleSend(option.label);
  };

  return (
    <>
      {/* Floating Toggle Button — Perfectly Round, Authentic Logo Only (UI/UX Pro Max) */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[999] pointer-events-auto pb-[env(safe-area-inset-bottom,0px)]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-15 h-15 sm:w-18 sm:h-18 rounded-full bg-[#112A50] border-2 sm:border-[2.5px] border-[#F09032] shadow-[0_12px_36px_rgba(17,42,80,0.55)] flex items-center justify-center p-2 sm:p-2.5 transition-all cursor-pointer group active:scale-95"
          aria-label={isOpen ? "Close AI Concierge" : "Open Shreeniwas AI Concierge"}
          title="Shreeniwas AI Concierge (GPS & 1st Free Visit)"
        >
          {/* Ambient Glow Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#F09032]/25 blur-sm -z-10 group-hover:bg-[#F09032]/45 transition-all animate-pulse" />

          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <img 
              src="/logo/shreeniwas-logo-icon.png" 
              alt="Shreeniwas Logo" 
              className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform" 
            />
          )}

          {/* Unread / Active Status Dot Indicator */}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F09032] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#F09032] border-2 border-[#112A50] items-center justify-center text-[8px] font-black text-[#112A50]">
                1
              </span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-[999] w-[calc(100vw-1.5rem)] sm:w-[410px] max-w-[420px] h-[calc(100dvh-130px)] sm:h-[550px] max-h-[580px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(17,42,80,0.35)] border border-slate-200 flex flex-col overflow-hidden text-[#112A50]"
          >
            {/* Chat Header */}
            <div className="bg-[#112A50] text-white p-4 flex items-center justify-between border-b border-[#F09032]/30 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-[#F09032]/60 flex items-center justify-center relative shrink-0 shadow-sm overflow-hidden p-1">
                  <img 
                    src="/logo/shreeniwas-logo-icon.png" 
                    alt="Shreeniwas AI Concierge" 
                    className="w-full h-full object-contain" 
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#112A50]"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-serif font-bold text-white">Shreeniwas AI</h3>
                    <span className="px-1.5 py-0.5 bg-[#F09032]/20 text-[#F09032] text-[9px] font-bold rounded uppercase">Concierge</span>
                  </div>
                  <p className="text-[10px] text-slate-300">Online • Verified Jodhpur Advisory</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FDFBF7]">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.sender === 'user' ? (
                      <div className="w-7 h-7 rounded-full bg-[#112A50] text-[#F09032] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        <User className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#112A50] border border-[#F09032]/60 text-[#F09032] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden p-0.5">
                        <img src="/logo/shreeniwas-logo-icon.png" alt="Bot" className="w-full h-full object-contain" />
                      </div>
                    )}

                    <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#112A50] text-white rounded-tr-none shadow-md'
                        : 'bg-white text-[#112A50] border border-slate-200 rounded-tl-none shadow-sm'
                    }`}>
                      <p>{msg.text}</p>

                      {/* Attached Property Card */}
                      {msg.propertyCard && (
                        <div className="mt-3 bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-left">
                          <img src={msg.propertyCard.image} alt={msg.propertyCard.title} className="w-full h-24 object-cover rounded-lg mb-2" />
                          <h5 className="font-bold text-xs text-[#112A50]">{msg.propertyCard.title}</h5>
                          <p className="text-[10px] text-slate-500">{msg.propertyCard.location}</p>
                          <p className="text-xs font-extrabold text-[#F09032] mt-1">{msg.propertyCard.price}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[9px] text-slate-400 mt-1 px-9">{msg.time}</span>

                  {/* Interactive Prompt Option Pills */}
                  {msg.options && (
                    <div className="mt-2.5 space-y-1.5 pl-9 w-full max-w-[90%]">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(opt)}
                          className="w-full text-left px-3 py-2 bg-white hover:bg-[#112A50] text-[#112A50] hover:text-[#F09032] font-semibold text-xs rounded-xl border border-slate-200 transition-all shadow-sm flex items-center justify-between group cursor-pointer"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F09032]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <div className="w-7 h-7 rounded-full bg-[#F09032] text-[#112A50] flex items-center justify-center font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#F09032] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#F09032] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#F09032] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about properties, VIP visits..."
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#112A50] outline-none focus:ring-2 focus:ring-[#F09032] placeholder-slate-400"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#F09032] hover:bg-[#E07E20] text-[#112A50] font-bold rounded-xl shadow transition-all cursor-pointer border border-[#F09032]/40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Code Payment Modal Trigger from Chat */}
      <SecureQrPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={499}
        purpose="VIP Site Visit & Dedicated Cab Pickup"
        propertyName={activePropertyForVisit.title}
      />

      {/* Schedule Visit Modal Trigger from Chat */}
      <ScheduleVisitModal
        isOpen={isScheduleVisitOpen}
        onClose={() => setIsScheduleVisitOpen(false)}
        propertyTitle={activePropertyForVisit.title}
        propertyLocation={activePropertyForVisit.location}
        propertyPrice={activePropertyForVisit.price}
      />
    </>
  );
}
