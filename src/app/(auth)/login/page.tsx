"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Building2 } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"seeker" | "owner">("seeker");

  return (
    <main className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center space-x-2 text-white mb-6">
            <Building2 className="w-8 h-8 text-[#C9A96E]" />
            <span className="text-2xl font-serif font-bold">Shreeniwas</span>
          </Link>
          <h1 className="text-3xl font-serif text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access your exclusive portal</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Role Toggle */}
          <div className="flex p-1 bg-black/20 rounded-lg mb-8">
            <button 
              onClick={() => setRole("seeker")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${role === "seeker" ? "bg-[#C9A96E] text-white shadow-sm" : "text-gray-400 hover:text-white"}`}
            >
              Property Seeker
            </button>
            <button 
              onClick={() => setRole("owner")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${role === "owner" ? "bg-[#C9A96E] text-white shadow-sm" : "text-gray-400 hover:text-white"}`}
            >
              Property Owner
            </button>
          </div>

          <form className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Link href="#" className="text-sm text-[#C9A96E] hover:text-white transition">Forgot?</Link>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition"
                  placeholder="Enter your password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-[#C9A96E] text-white rounded-lg font-medium hover:bg-[#b89a61] transition mt-2">
              Sign In
            </button>
          </form>

          <div className="mt-8 flex items-center space-x-4">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 py-2.5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-2.5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition">
              <span>OTP Login</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account? <Link href="/register" className="text-[#C9A96E] hover:text-white transition">Register now</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
