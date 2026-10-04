'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, QrCode, ShieldCheck, CheckCircle2, Copy, Check, Upload, 
  Smartphone, IndianRupee, ArrowRight, FileText, Lock
} from 'lucide-react';

interface SecureQrPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
  amount?: number;
  purpose?: string;
  onPaymentSuccess?: (utr: string) => void;
}

export default function SecureQrPaymentModal({
  isOpen,
  onClose,
  propertyName = "The Royal Heritage Residency",
  amount = 499,
  purpose = "VIP Site Visit & Cab Pickup Booking",
  onPaymentSuccess
}: SecureQrPaymentModalProps) {
  const [step, setStep] = useState<'scan' | 'verify' | 'receipt'>('scan');
  const [utrNumber, setUtrNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentTxnId, setPaymentTxnId] = useState('');
  const [error, setError] = useState('');

  const upiId = "shreeniwasproperties@upi";

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim() || utrNumber.trim().length < 8) {
      setError("Please enter a valid 12-digit UPI Ref / UTR transaction number.");
      return;
    }

    setError('');
    setIsVerifying(true);

    setTimeout(() => {
      const generatedTxn = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      setPaymentTxnId(generatedTxn);
      setIsVerifying(false);
      setStep('receipt');
      if (onPaymentSuccess) {
        onPaymentSuccess(utrNumber.trim());
      }
    }, 1200);
  };

  const resetModal = () => {
    setStep('scan');
    setUtrNumber('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-[#0A1628] my-8"
        >
          {/* Header */}
          <div className="bg-[#0A1628] text-white p-6 relative">
            <button
              onClick={resetModal}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/20 flex items-center justify-center border border-[#C9A96E]/40 text-[#C9A96E]">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A96E]">Secure UPI Gateway</span>
                <h3 className="text-xl font-serif font-bold text-white">Verified QR Payment</h3>
              </div>
            </div>
          </div>

          {/* Body Step 1: Scan & Pay */}
          {step === 'scan' && (
            <div className="p-6 sm:p-8 space-y-6">
              {/* Order Summary */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">{purpose}</p>
                  <p className="text-sm font-bold text-[#0A1628] line-clamp-1">{propertyName}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-semibold block">Total Amount</span>
                  <span className="text-2xl font-extrabold text-[#0A1628]">₹{amount}</span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-white rounded-3xl border-2 border-[#C9A96E]/40 shadow-xl relative">
                  {/* Generated QR Code Graphic */}
                  <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-slate-900 to-[#0A1628] rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${upiId}%26pn=ShreeniwasProperties%26am=${amount}%26cu=INR`} 
                      alt="UPI QR Code"
                      className="w-full h-full object-contain rounded-xl bg-white p-2"
                    />
                  </div>
                  <div className="mt-2 text-[10px] font-bold text-slate-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> NPCI Verified UPI Merchant
                  </div>
                </div>

                {/* Accepted Apps Badges */}
                <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500 font-semibold">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200">GPay</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200">PhonePe</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200">Paytm</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200">BHIM</span>
                </div>

                {/* UPI ID Copy Bar */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-500 font-medium">Official UPI ID:</span>
                  <div className="flex items-center gap-2 font-mono font-bold text-[#0A1628]">
                    <span>{upiId}</span>
                    <button
                      onClick={handleCopyUpi}
                      className="p-1 text-[#C9A96E] hover:text-[#0A1628] transition-colors"
                      title="Copy UPI ID"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setStep('verify')}
                className="w-full py-4 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-[#0A1628]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#C9A96E]/30"
              >
                I Have Paid ₹{amount} — Submit UTR Ref <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Body Step 2: Verification */}
          {step === 'verify' && (
            <form onSubmit={handleVerifyPayment} className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-lg font-serif font-bold text-[#0A1628] mb-1">Verify Your Payment</h4>
                <p className="text-xs text-slate-500">Enter the 12-digit UTR / Reference number from your GPay, PhonePe, or Paytm receipt.</p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    12-Digit UTR / Transaction Ref No.
                  </label>
                  <input
                    type="text"
                    required
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. 428901839210"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0A1628] font-mono font-bold text-base outline-none focus:ring-2 focus:ring-[#C9A96E] placeholder-slate-400"
                  />
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-700" /> Instant Admin Sync
                  </p>
                  <p className="text-[11px] text-amber-800">
                    Once submitted, our real estate dispatch team verifies your payment reference instantly and confirms your dedicated cab driver assignment.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('scan')}
                  className="px-5 py-3.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors"
                >
                  ← Back to QR
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="flex-1 py-3.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-extrabold text-sm rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-[#C9A96E]/30"
                >
                  {isVerifying ? (
                    <div className="w-5 h-5 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin"></div>
                  ) : (
                    <>Verify & Issue Receipt</>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Body Step 3: Receipt */}
          {step === 'receipt' && (
            <div className="p-6 sm:p-8 space-y-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Payment Confirmed & Verified</span>
                <h4 className="text-2xl font-serif font-bold text-[#0A1628] mt-1">Receipt Generated</h4>
              </div>

              {/* Printable Receipt Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-bold text-[#0A1628]">{paymentTxnId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">UTR Reference:</span>
                  <span className="font-bold text-[#0A1628]">{utrNumber}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">₹{amount}.00</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Purpose:</span>
                  <span className="font-bold text-[#0A1628]">{purpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Property:</span>
                  <span className="font-bold text-[#0A1628] truncate max-w-[200px]">{propertyName}</span>
                </div>
              </div>

              <button
                onClick={resetModal}
                className="w-full py-4 bg-[#0A1628] text-[#C9A96E] font-extrabold text-sm rounded-xl shadow-xl hover:bg-[#0A1628]/90 transition-all cursor-pointer"
              >
                Done & View in My Account
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
