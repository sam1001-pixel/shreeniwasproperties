"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Building2, ShieldCheck, Mail, Lock, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"seeker" | "owner">("seeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userSession = {
      name: email.split('@')[0] || "Vikram Sharma",
      email: email || "user@shreeniwas.com",
      role: role === "seeker" ? "Property Seeker" : "Property Owner",
      phone: "+91 98765 43210",
      city: "Jaipur, Rajasthan",
      savedCount: 5,
      visitCount: 2,
      loggedIn: true,
      memberSince: "Oct 2024"
    };

    localStorage.setItem("shreeniwas_user_session", JSON.stringify(userSession));
    sessionStorage.setItem("shreeniwas_user_session", JSON.stringify(userSession));

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/portal");
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setEmail("demo@shreeniwasproperties.com");
    setPassword("demo123");
    
    const userSession = {
      name: "Rahul Verma",
      email: "demo@shreeniwasproperties.com",
      role: "Property Seeker",
      phone: "+91 99887 76655",
      city: "Jaipur, Rajasthan",
      savedCount: 6,
      visitCount: 2,
      loggedIn: true,
      memberSince: "Oct 2024"
    };

    localStorage.setItem("shreeniwas_user_session", JSON.stringify(userSession));
    sessionStorage.setItem("shreeniwas_user_session", JSON.stringify(userSession));

    setTimeout(() => {
      router.push("/dashboard/portal");
    }, 400);
  };

  return (
    <main className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4 relative overflow-hidden py-16">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C9A96E]/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center justify-center space-x-2 text-white mb-4 group">
            <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center border border-[#C9A96E] shadow-md">
              <Building2 className="w-5 h-5 text-[#C9A96E]" />
            </div>
            <span className="text-2xl font-serif font-bold text-[#C9A96E]">Shreeniwas Properties</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-white mb-1">User Sign In</h1>
          <p className="text-slate-300 text-sm">Access your saved properties, profile & VIP visits</p>
        </div>

        {/* High Contrast Pure White Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-[#0A1628]">
          {/* Role Selector */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6 border border-slate-200">
            <button 
              type="button"
              onClick={() => setRole("seeker")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${role === "seeker" ? "bg-[#0A1628] text-[#C9A96E] shadow-md" : "text-slate-600 hover:text-slate-900"}`}
            >
              Property Seeker
            </button>
            <button 
              type="button"
              onClick={() => setRole("owner")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${role === "owner" ? "bg-[#0A1628] text-[#C9A96E] shadow-md" : "text-slate-600 hover:text-slate-900"}`}
            >
              Property Owner
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] focus:bg-white transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
                <Link href="#" className="text-xs font-bold text-[#C9A96E] hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] focus:bg-white transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#0A1628]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#C9A96E]/30"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Sign In to Account
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#0A1628] border border-[#C9A96E]/40 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              1-Click Demo Sign In (Instant Access)
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-600 font-medium">
            Don't have an account? <Link href="/register" className="text-[#C9A96E] font-bold hover:underline">Create Account Free</Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-[#C9A96E] transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
