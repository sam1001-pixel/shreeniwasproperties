'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Home } from 'lucide-react';

export default function RegisterPage() {
  const [role, setRole] = useState<'seeker' | 'owner'>('seeker');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1628] px-4 py-12">
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center">
          <h2 className="text-2xl font-serif font-bold text-[#0A1628] mb-2">Create an Account</h2>
          <p className="text-gray-500 text-sm">Join Shreeniwas Properties</p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          
          {/* Role Selector */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button 
              onClick={() => setRole('seeker')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors ${role === 'seeker' ? 'bg-white text-[#0A1628] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <User className="w-4 h-4" /> Seeker / Tenant
            </button>
            <button 
              onClick={() => setRole('owner')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors ${role === 'owner' ? 'bg-[#0A1628] text-[#C9A96E] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Home className="w-4 h-4" /> Owner / Seller
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] bg-white text-gray-900"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  +91
                </span>
                <input 
                  type="tel" 
                  className="flex-1 min-w-0 block w-full px-4 py-2.5 rounded-none rounded-r-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] bg-white text-gray-900"
                  placeholder="98765 43210"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] bg-white text-gray-900"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] bg-white text-gray-900"
                placeholder="••••••••"
              />
            </div>
            
            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded border-gray-300 text-[#0A1628] focus:ring-[#C9A96E]" />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I agree to the <a href="#" className="text-[#0A1628] font-bold">Terms of Service</a> and <a href="#" className="text-[#0A1628] font-bold">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button type="submit" className="w-full bg-[#0A1628] text-[#C9A96E] font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors mt-6">
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#0A1628] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
