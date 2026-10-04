"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Building2, ShieldCheck, Mail, Lock, AlertCircle, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"seeker" | "owner">("seeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedEmail || !trimmedPass) {
      setErrorMsg("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      // 1. Attempt Supabase Authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPass,
      });

      if (!error && data?.user && data?.session) {
        // Supabase Auth Success
        const userSession = {
          name: data.user.user_metadata?.full_name || trimmedEmail.split('@')[0],
          email: data.user.email || trimmedEmail,
          role: role === "seeker" ? "Property Seeker" : "Property Owner",
          phone: data.user.user_metadata?.phone || "+91 98765 43210",
          city: "Jaipur, Rajasthan",
          savedCount: 5,
          visitCount: 2,
          loggedIn: true,
          token: data.session.access_token,
          memberSince: "Oct 2024"
        };

        localStorage.setItem("shreeniwas_user_session", JSON.stringify(userSession));
        sessionStorage.setItem("shreeniwas_user_session", JSON.stringify(userSession));

        setSuccessMsg("Signed in securely! Redirecting to your Portal...");
        setTimeout(() => {
          router.push("/dashboard/portal");
        }, 600);
        return;
      }

      // 2. Check local registered user database (if Supabase user is freshly created locally or offline)
      const rawRegisteredUsers = localStorage.getItem("shreeniwas_registered_users");
      const registeredUsers = rawRegisteredUsers ? JSON.parse(rawRegisteredUsers) : [];

      const matchingUser = registeredUsers.find((u: any) => u.email.toLowerCase() === trimmedEmail);

      if (!matchingUser) {
        // User is not registered! Reject login.
        setErrorMsg("No account found with this email. Please sign up first before signing in.");
        setLoading(false);
        return;
      }

      if (matchingUser.password !== trimmedPass) {
        // Registered email, but wrong password! Reject login.
        setErrorMsg("Invalid password. Please check your password and try again.");
        setLoading(false);
        return;
      }

      // 3. Valid registered user credentials match
      const userSession = {
        name: matchingUser.name || trimmedEmail.split('@')[0],
        email: matchingUser.email,
        role: matchingUser.role || (role === "seeker" ? "Property Seeker" : "Property Owner"),
        phone: matchingUser.phone || "+91 98765 43210",
        city: "Jaipur, Rajasthan",
        savedCount: 3,
        visitCount: 1,
        loggedIn: true,
        token: `shreeniwas_token_${Date.now()}`,
        memberSince: "Oct 2024"
      };

      localStorage.setItem("shreeniwas_user_session", JSON.stringify(userSession));
      sessionStorage.setItem("shreeniwas_user_session", JSON.stringify(userSession));

      setSuccessMsg("Signed in securely! Redirecting to your User Portal...");
      setTimeout(() => {
        router.push("/dashboard/portal");
      }, 600);

    } catch (err: any) {
      setErrorMsg(err?.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4 relative overflow-hidden pt-28 sm:pt-32 pb-16">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C9A96E]/15 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md mx-auto relative z-10"
      >
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center justify-center space-x-2.5 text-white mb-4 group">
            <div className="w-11 h-11 rounded-2xl bg-[#0A1628] flex items-center justify-center border-2 border-[#C9A96E] shadow-xl group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-[#C9A96E]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-serif font-bold text-[#C9A96E] leading-none">Shreeniwas</span>
              <span className="text-xs font-bold text-white uppercase tracking-widest mt-1">Secure Sign In</span>
            </div>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-white mb-1">Welcome Back</h1>
          <p className="text-slate-300 text-sm font-light">Enter your credentials to access your user portal</p>
        </div>

        {/* Ultra Pro Max High-Contrast Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#C9A96E]/30 text-[#0A1628]">
          {/* Account Role Selector */}
          <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-6 border border-slate-200">
            <button 
              type="button"
              onClick={() => setRole("seeker")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                role === "seeker" 
                  ? "bg-[#0A1628] text-[#C9A96E] shadow-md border border-[#C9A96E]/30" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Property Seeker
            </button>
            <button 
              type="button"
              onClick={() => setRole("owner")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                role === "owner" 
                  ? "bg-[#0A1628] text-[#C9A96E] shadow-md border border-[#C9A96E]/30" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Property Owner
            </button>
          </div>

          {/* Feedback Banners */}
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2"
            >
              <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Registered Email</label>
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-[#0A1628]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#C9A96E]/30 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                  Secure Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-600 font-medium">
            Don't have an account? <Link href="/register" className="text-[#C9A96E] font-bold hover:underline">Create Account Free</Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-[#C9A96E] transition-colors">
            ← Return to Homepage
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
