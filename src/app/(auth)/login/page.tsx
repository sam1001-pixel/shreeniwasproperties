'use client';

import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1628] px-4 py-12">
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="w-12 h-12 bg-[#0A1628] text-[#C9A96E] font-serif font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 shadow-md border border-[#C9A96E]/30">
            SP
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#0A1628] mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Sign in to Shreeniwas Properties</p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] bg-white text-gray-900"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] bg-white text-gray-900"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#0A1628] focus:ring-[#C9A96E]" />
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>
              <a href="#" className="text-sm text-[#0A1628] font-medium hover:underline">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full bg-[#C9A96E] text-[#0A1628] font-bold py-3 rounded-lg hover:bg-[#b5955a] transition-colors shadow-lg shadow-[#C9A96E]/20 mt-4">
              Sign In
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#FDFBF7] text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 bg-white">
              Google
            </button>
            <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 bg-white">
              Phone OTP
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-[#0A1628] hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
