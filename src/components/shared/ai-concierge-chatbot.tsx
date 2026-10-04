'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Bot, User, Sparkles, Building2, 
  MapPin, Phone, ShieldCheck, ChevronRight, RefreshCw, Calendar
} from 'lucide-react';
import SecureQrPaymentModal from './secure-qr-payment-modal';

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

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'msg-1',
  sender: 'bot',
  text: "Khamma Ghani! 🙏 Welcome to Shreeniwas Properties. I am your AI Real Estate Assistant. How can I assist you today?",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  options: [
    { label: "🏢 Find 3 BHK Villas in Jaipur", action: "villas_jaipur" },
    { label: "🚘 Book ₹499 VIP Site Visit", action: "vip_visit" },
    { label: "📜 RERA & Home Loan Help", action: "rera_loans" },
    { label: "📞 Request Instant Agent Callback", action: "callback" }
  ]
};

export default function AiConciergeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [botPfp, setBotPfp] = useState('https://images.unsplash.com/photo-1599661559886-41b80c541b00?auto=format&fit=crop&q=80&w=400');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('shreeniwas_platform_settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        if (parsed.logoUrl) {
          setBotPfp(parsed.logoUrl);
        }
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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

      if (lower.includes('vip') || lower.includes('visit') || lower.includes('cab') || lower.includes('499')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "Our ₹499 VIP Site Visit includes a dedicated AC cab pickup, personalized property tour with a senior RERA advisor, and verified legal documentation check.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: "💳 Pay ₹499 via QR Code Now", action: "trigger_payment" },
            { label: "📞 Speak with Visit Coordinator", action: "callback" }
          ]
        };
      } else if (lower.includes('villa') || lower.includes('jaipur') || lower.includes('3 bhk')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "Here is our top featured luxury villa in Vaishali Nagar, Jaipur:",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          propertyCard: {
            title: "The Royal Heritage Residency",
            location: "Vaishali Nagar, Jaipur",
            price: "₹3.5 Cr",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600",
            slug: "royal-heritage-residency-jaipur"
          },
          options: [
            { label: "🚘 Book VIP Site Visit (₹499)", action: "vip_visit" },
            { label: "🔍 View All Jaipur Listings", action: "view_properties" }
          ]
        };
      } else if (lower.includes('loan') || lower.includes('rera') || lower.includes('legal')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "All Shreeniwas properties are 100% RERA Approved with clear title deeds. We partner with SBI, HDFC, and ICICI Bank for 80% home loan pre-approvals.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: "📞 Request Free Legal Advice", action: "callback" }
          ]
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Thank you for asking about "${userText}". Our senior real estate advisor will be happy to guide you with exact price per sq.ft details and availability.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: "📞 Request Quick Agent Callback", action: "callback" },
            { label: "🚘 Schedule Site Visit", action: "vip_visit" }
          ]
        };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleOptionClick = (option: { label: string; action: string }) => {
    if (option.action === 'trigger_payment') {
      setIsPaymentModalOpen(true);
      return;
    }

    if (option.action === 'vip_visit') {
      setIsPaymentModalOpen(true);
      return;
    }

    if (option.action === 'view_properties') {
      window.location.href = '/properties';
      return;
    }

    handleSend(option.label);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0A1628] text-[#C9A96E] flex items-center justify-center shadow-2xl border-2 border-[#C9A96E] cursor-pointer group"
          aria-label="Toggle AI Real Estate Assistant"
        >
          {/* Outer Pulse Glow */}
          <span className="absolute -inset-1 rounded-full bg-[#C9A96E]/20 animate-ping pointer-events-none"></span>

          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          ) : (
            <div className="relative flex items-center justify-center">
              <img
                src={botPfp}
                alt="Shreeniwas AI"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#C9A96E] shadow"
              />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-[#0A1628] animate-bounce"></span>
              )}
            </div>
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
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-[#0A1628]"
          >
            {/* Chat Header */}
            <div className="bg-[#0A1628] text-white p-4 flex items-center justify-between border-b border-[#C9A96E]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#C9A96E]/20 border border-[#C9A96E]/40 overflow-hidden relative shrink-0">
                  <img src={botPfp} alt="Shreeniwas AI Concierge" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0A1628]"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-serif font-bold text-white">Shreeniwas AI</h3>
                    <span className="px-1.5 py-0.5 bg-[#C9A96E]/20 text-[#C9A96E] text-[9px] font-bold rounded uppercase">Concierge</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Online • Answering Rajasthan Property Queries</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
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
                      <div className="w-7 h-7 rounded-full bg-[#0A1628] text-[#C9A96E] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        <User className="w-4 h-4" />
                      </div>
                    ) : (
                      <img
                        src={botPfp}
                        alt="Shreeniwas AI"
                        className="w-7 h-7 rounded-full object-cover border border-[#C9A96E] flex-shrink-0 shadow-sm"
                      />
                    )}

                    <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0A1628] text-white rounded-tr-none shadow-md'
                        : 'bg-white text-[#0A1628] border border-slate-200 rounded-tl-none shadow-sm'
                    }`}>
                      <p>{msg.text}</p>

                      {/* Attached Property Card */}
                      {msg.propertyCard && (
                        <div className="mt-3 bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-left">
                          <img src={msg.propertyCard.image} alt={msg.propertyCard.title} className="w-full h-24 object-cover rounded-lg mb-2" />
                          <h5 className="font-bold text-xs text-[#0A1628]">{msg.propertyCard.title}</h5>
                          <p className="text-[10px] text-slate-500">{msg.propertyCard.location}</p>
                          <p className="text-xs font-extrabold text-[#C9A96E] mt-1">{msg.propertyCard.price}</p>
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
                          className="w-full text-left px-3 py-2 bg-white hover:bg-[#0A1628] text-[#0A1628] hover:text-[#C9A96E] font-semibold text-xs rounded-xl border border-slate-200 transition-all shadow-sm flex items-center justify-between group cursor-pointer"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C9A96E]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <div className="w-7 h-7 rounded-full bg-[#C9A96E] text-[#0A1628] flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
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
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0A1628] outline-none focus:ring-2 focus:ring-[#C9A96E] placeholder-slate-400"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] rounded-xl shadow transition-all cursor-pointer border border-[#C9A96E]/30"
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
        propertyName="The Royal Heritage Residency, Jaipur"
      />
    </>
  );
}
