'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, AlertCircle, Building2, KeyRound, ArrowLeft } from 'lucide-react';
import { ForgotPasswordSchema } from '@/lib/auth/validation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<{
    message: string;
    targetEmail: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const validation = ForgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      setErrorMessage(validation.error.errors[0]?.message || 'Invalid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: validation.data.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to dispatch reset instructions.');
        setLoading(false);
        return;
      }

      setSuccessData({
        message: data.message,
        targetEmail: validation.data.email,
      });

    } catch (err: any) {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4 relative overflow-hidden pt-28 sm:pt-32 pb-16">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C9A96E]/15 blur-[150px] rounded-full pointer-events-none" />

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
              <span className="text-xs font-bold text-white uppercase tracking-widest mt-1">Identity Shield</span>
            </div>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-white mb-1">Forgot Password</h1>
          <p className="text-slate-300 text-xs sm:text-sm font-light">
            Enter your registered email to receive a secure password reset link
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#C9A96E]/30 text-[#0A1628]">
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successData ? (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0A1628]">Check Your Gmail / Email</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  We have dispatched a secure password reset link to{' '}
                  <span className="font-bold text-[#0A1628]">{successData.targetEmail}</span>.
                </p>
                <p className="text-[11px] text-slate-500 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  Please open your Gmail inbox and click the reset link to choose a new password. The link will remain active for <strong>15 minutes</strong>.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href="https://mail.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Open Gmail
                </a>

                <Link
                  href="/login"
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] placeholder-slate-400 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A96E] focus:bg-white transition-all"
                    placeholder="name@gmail.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-[#0A1628]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#C9A96E]/30 hover:scale-[1.01] active:scale-[0.99]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-[#C9A96E]" />
                    Send Password Reset Link
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-600">
                  Remembered your password?{' '}
                  <Link href="/login" className="text-[#C9A96E] font-bold hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          )}
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
