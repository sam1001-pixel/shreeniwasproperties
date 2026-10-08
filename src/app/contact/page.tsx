"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronDown } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", topic: "Rent Inquiry", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Submission failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Local fallback sync
      const existingRaw = localStorage.getItem('shreeniwas_inquiries');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const newInq = {
        id: data.inquiry?.id || `INQ-${Date.now().toString().slice(-4)}`,
        user: formData.name || "Website Visitor",
        phone: formData.phone || "--",
        email: formData.email || "--",
        property: formData.topic || "General Inquiry",
        type: "Direct Message",
        status: "Pending",
        query: formData.message || "Contact form request",
        reply: ""
      };
      localStorage.setItem('shreeniwas_inquiries', JSON.stringify([newInq, ...existing]));

      setFormData({ name: "", email: "", phone: "", topic: "Rent Inquiry", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      setErrorMessage("Network error occurred. Please contact us via WhatsApp.");
      setIsSubmitting(false);
    }
  };

  const faqs = [
    { q: "What areas in Rajasthan do you cover?", a: "We primarily operate in Jaipur, Udaipur, Jodhpur, and Ajmer, focusing on premium residential and commercial spaces." },
    { q: "Do you offer property management services?", a: "Yes, we offer comprehensive end-to-end property management for NRIs and out-of-state investors." },
    { q: "How long does it take to list a property?", a: "After initial inspection and documentation, your property can be live on our exclusive network within 48 hours." },
    { q: "Are virtual tours available?", a: "Absolutely. We provide high-quality virtual tours and live video walkthroughs for all our premium listings." }
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-28 sm:pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[#0A1628] mb-4">Get in Touch</h1>
          <div className="w-20 h-1 bg-[#C9A96E] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Whether you're looking to buy, sell, or rent, our expert advisors are here to guide you through your real estate journey.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-24">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
              <h3 className="text-2xl font-serif text-[#0A1628] mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#0A1628]/5 rounded-full text-[#0A1628]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Head Office</h4>
                    <p className="text-gray-600 mt-1">103, Jodhana Arcade, Bombay Motor Circle<br/>Jodhpur, Rajasthan</p>
                    <a href="https://maps.google.com/?q=Bombay+Motor+Circle+Jodhpur" target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] text-base sm:text-sm font-medium mt-2 inline-block hover:underline">View on Map &rarr;</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#0A1628]/5 rounded-full text-[#0A1628]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Direct Contact</h4>
                    <p className="text-gray-600 mt-1">+91 6376117833</p>
                    <a 
                      href="https://wa.me/916376117833?text=Namaste%20Shree%20Niwas%20Properties%2C%20I%20have%20an%20inquiry" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 inline-block px-4 py-2 bg-green-500 text-white rounded text-base sm:text-sm font-medium hover:bg-green-600 transition"
                    >
                      WhatsApp Us
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#0A1628]/5 rounded-full text-[#0A1628]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600 mt-1">contact@shreeniwasproperties.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#0A1628]/5 rounded-full text-[#0A1628]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600 mt-1">Mon - Sat: 9:00 AM - 7:00 PM<br/>Sunday: By Appointment Only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-serif text-[#0A1628] mb-6">Send us a Message</h3>
              
              {errorMessage && (
                <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 mb-6 text-sm">
                  {errorMessage}
                </div>
              )}

              {isSuccess ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-lg flex items-center space-x-4 border border-green-200">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-lg">Message Sent Successfully!</h4>
                    <p className="text-green-700">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-base sm:text-sm font-medium text-gray-700">Full Name</label>
                      <input 
                        type="text" required
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-base sm:text-sm font-medium text-gray-700">Email Address</label>
                      <input 
                        type="email" required
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-base sm:text-sm font-medium text-gray-700">Phone Number</label>
                      <input 
                        type="tel" required
                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition"
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-base sm:text-sm font-medium text-gray-700">Topic</label>
                      <select 
                        value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition bg-white"
                      >
                        <option>Rent Inquiry</option>
                        <option>Buy Inquiry</option>
                        <option>List Property</option>
                        <option>General</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-base sm:text-sm font-medium text-gray-700">Your Message</label>
                    <textarea 
                      required rows={5}
                      value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition resize-none"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" disabled={isSubmitting}
                    className="w-full bg-[#0A1628] text-white py-4 rounded-md font-medium hover:bg-[#112240] transition flex justify-center items-center space-x-2 disabled:opacity-70"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    {!isSubmitting && <Send className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-serif text-center text-[#0A1628] mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
