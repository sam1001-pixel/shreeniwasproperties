"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Building2, UserCheck, Mail, Lock, User, Phone, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"seeker" | "owner">("seeker");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userSession = {
      name: `${firstName} ${lastName}`.trim() || "New User",
      email: email || "user@shreeniwas.com",
      role: role === "seeker" ? "Property Seeker" : "Property Owner",
      phone: phone || "+91 98765 43210",
      city: "Jaipur, Rajasthan",
      savedCount: 0,
      visitCount: 0,
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
          <h1 className="text-3xl font-serif font-bold text-white mb-1">Create Account</h1>
          <p className="text-slate-300 text-sm">Join Rajasthan's premier real estate network</p>
        </div>

        {/* High Contrast Pure White Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-[#0A1628]">
          {/* Role Toggle */}
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

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">First Name</label>
                <input 
                  type="text" 
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  placeholder="Rahul"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  placeholder="Sharma"
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  placeholder="rahul@example.com"
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  placeholder="+91 9876543210"
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
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2 border border-[#C9A96E]/30"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  Register Account Free
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-600 font-medium">
            Already have an account? <Link href="/login" className="text-[#C9A96E] font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
