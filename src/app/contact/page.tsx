'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'buy',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    alert("Message sent successfully!");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628]">
      {/* Hero Section */}
      <section className="bg-[#0A1628] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-[#C9A96E]">
          Get in Touch with Us
        </h1>
        <p className="text-lg max-w-xl mx-auto font-light text-gray-300">
          Whether you're looking to buy, sell, or rent, our team of experts is here to help you every step of the way.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Column: Contact Info */}
          <div>
            <h2 className="text-3xl font-serif font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0A1628]/5 flex items-center justify-center shrink-0">
                  <Phone className="text-[#C9A96E] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Phone</h4>
                  <p className="text-gray-600 mt-1">+91 98765 43210</p>
                  <p className="text-gray-600">+91 12345 67890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0A1628]/5 flex items-center justify-center shrink-0">
                  <Mail className="text-[#C9A96E] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Email</h4>
                  <p className="text-gray-600 mt-1">info@shreeniwasproperties.com</p>
                  <p className="text-gray-600">support@shreeniwasproperties.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0A1628]/5 flex items-center justify-center shrink-0">
                  <MapPin className="text-[#C9A96E] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Office Address</h4>
                  <p className="text-gray-600 mt-1">
                    123, Shreeniwas Tower, MI Road,<br />
                    Jaipur, Rajasthan 302001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0A1628]/5 flex items-center justify-center shrink-0">
                  <Clock className="text-[#C9A96E] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Business Hours</h4>
                  <p className="text-gray-600 mt-1">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-gray-200">
              <button className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#20b858] transition-colors">
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </button>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-serif font-bold mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#C9A96E]" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#C9A96E]" placeholder="+91" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#C9A96E]" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Inquiry Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#C9A96E]">
                  <option value="buy">Looking to Buy</option>
                  <option value="sell">Looking to Sell</option>
                  <option value="rent">Looking to Rent</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#C9A96E]" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#0A1628] text-white py-3 rounded-lg font-medium hover:bg-[#0A1628]/90 transition-colors flex items-center justify-center gap-2">
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {/* Simple static FAQ representation for visual */}
            {[
              { q: "What areas in Rajasthan do you cover?", a: "We primarily operate in Jaipur, Jodhpur, Udaipur, Kota, Ajmer, and Bikaner." },
              { q: "Do you help with property loans?", a: "Yes, we have tie-ups with leading banks to assist you with home loans at competitive interest rates." },
              { q: "How much is your consultation fee?", a: "Our initial consultation is completely free. We only charge standard brokerage fees upon successful transactions." }
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer group">
                <summary className="font-bold text-lg list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-[#C9A96E] group-open:rotate-45 transition-transform text-2xl">+</span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
