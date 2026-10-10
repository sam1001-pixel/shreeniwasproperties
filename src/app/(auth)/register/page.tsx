"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Building2, UserCheck, Mail, Lock, Phone, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { RegisterSchema } from "@/lib/auth/validation";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"seeker" | "owner">("seeker");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const validation = RegisterSchema.safeParse({
      firstName,
      lastName,
      email,
      phone,
      password,
      role
    });

    if (!validation.success) {
      setErrorMsg(validation.error.errors[0]?.message || "Please fill in all required fields accurately.");
      setLoading(false);
      return;
    }

    const { firstName: vFirst, lastName: vLast, email: vEmail, phone: vPhone, password: vPassword } = validation.data;
    const fullName = `${vFirst} ${vLast}`.trim();

    // Check existing registered users
    const rawRegisteredUsers = localStorage.getItem("shreeniwas_registered_users");
    let registeredUsers = rawRegisteredUsers ? JSON.parse(rawRegisteredUsers) : [];

    const existingUser = registeredUsers.find((u: any) => u.email.toLowerCase() === vEmail);
    if (existingUser) {
      setErrorMsg("An account with this email already exists. Please sign in.");
      setLoading(false);
      return;
    }

    try {
      // 1. Check rate limit via API and get bcrypt hash
      const apiCheck = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: vFirst,
          lastName: vLast,
          email: vEmail,
          phone: vPhone,
          password: vPassword,
          role
        }),
      });

      const apiResult = await apiCheck.json();
      if (!apiCheck.ok) {
        setErrorMsg(apiResult.error || "Registration rate limit exceeded.");
        setLoading(false);
        return;
      }

      // 2. Register with Supabase
      const { data } = await supabase.auth.signUp({
        email: vEmail,
        password: vPassword,
        options: {
          data: {
            full_name: fullName,
            role: role === "seeker" ? "Property Seeker" : "Property Owner",
            phone: vPhone,
          },
        },
      });

      // 3. Add to local client cache (omitting sensitive password)
      const newUserRecord = {
        name: fullName,
        email: vEmail,
        role: role === "seeker" ? "Property Seeker" : "Property Owner",
        phone: vPhone,
        preferredCity: "Jaipur",
        avatar: "",
        registeredAt: new Date().toISOString()
      };

      registeredUsers.push(newUserRecord);
      localStorage.setItem("shreeniwas_registered_users", JSON.stringify(registeredUsers));

      // 4. Create active session
      const userSession = {
        name: fullName,
        email: data?.user?.email || vEmail,
        role: role === "seeker" ? "Property Seeker" : "Property Owner",
        phone: vPhone,
        city: "Jaipur, Rajasthan",
        savedCount: 0,
        visitCount: 0,
        loggedIn: true,
        token: data?.session?.access_token || `shreeniwas_token_${Date.now()}`,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };

      localStorage.setItem("shreeniwas_user_session", JSON.stringify(userSession));
      sessionStorage.setItem("shreeniwas_user_session", JSON.stringify(userSession));

      setSuccessMsg("Account registered securely! Redirecting to your User Portal...");
      setTimeout(() => {
        router.push("/dashboard/portal");
      }, 600);

    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to create account. Please check your information.");
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
              <span className="text-xs font-bold text-white uppercase tracking-widest mt-1">Create Account</span>
            </div>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-white mb-1">Register Account</h1>
          <p className="text-slate-300 text-sm font-light">Join Rajasthan's premier real estate network</p>
        </div>

        {/* High-Contrast Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#C9A96E]/30 text-[#0A1628]">
          {/* Role Toggle */}
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

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">First Name</label>
                <input 
                  type="text" 
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] focus:bg-white"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] focus:bg-white"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] focus:bg-white"
                  placeholder="name@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] focus:bg-white"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] focus:bg-white"
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Must be at least 8 chars with 1 uppercase letter & 1 digit.</p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-extrabold text-sm rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-2 border border-[#C9A96E]/30 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 text-[#C9A96E]" />
                  Register Secure Account
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-600 font-medium">
            Already have an account? <Link href="/login" className="text-[#C9A96E] font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
