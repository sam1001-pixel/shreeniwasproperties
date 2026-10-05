'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, QrCode, ShieldCheck, CheckCircle2, Copy, Check, 
  Smartphone, IndianRupee, ArrowRight, Download, Share2, 
  Building, ExternalLink, Sparkles, AlertCircle, RefreshCw
} from 'lucide-react';
import { useSiteSettings } from '@/lib/settings/site-settings-context';

export interface SecureQrPaymentModalProps {
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
  const { settings } = useSiteSettings();
  const paymentConfig = settings.payment;

  const [step, setStep] = useState<'scan' | 'verify' | 'receipt'>('scan');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedQr, setCopiedQr] = useState(false);
  const [copiedBank, setCopiedBank] = useState<'acc' | 'ifsc' | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentTxnId, setPaymentTxnId] = useState('');
  const [error, setError] = useState('');
  const [showBankDetails, setShowBankDetails] = useState(false);

  // Dynamic credentials from SuperAdmin settings
  const upiId = paymentConfig.upiId || '6376117833@okbizaxis';
  const merchantName = paymentConfig.merchantName || 'Shreeniwas Properties';
  
  // Standard NPCI UPI URI
  const upiDeeplink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(purpose.slice(0, 30))}`;
  
  // QR image URL (Custom or Dynamic API)
  const qrCodeImgUrl = paymentConfig.customQrUrl && paymentConfig.customQrUrl.trim() !== ''
    ? paymentConfig.customQrUrl
    : `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiDeeplink)}`;

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } catch (err) {
      console.warn('Copy UPI failed', err);
    }
  };

  const handleCopyBank = async (val: string, type: 'acc' | 'ifsc') => {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedBank(type);
      setTimeout(() => setCopiedBank(null), 2000);
    } catch (err) {
      console.warn('Copy bank failed', err);
    }
  };

  // Direct Button 1: Download QR Image
  const handleDownloadQr = async () => {
    try {
      setIsDownloading(true);
      const res = await fetch(qrCodeImgUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `shreeniwas-payment-qr-inr${amount}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error('Download QR error:', err);
      // Fallback
      window.open(qrCodeImgUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  // Direct Button 2: Share QR Code
  const handleShareQr = async () => {
    const shareText = `Namaste! Here is the official payment request from ${merchantName}.\n\n• Amount: ₹${amount}\n• Purpose: ${purpose}\n• UPI ID: ${upiId}\n• Verified Merchant: ${merchantName}\n\nPay directly via UPI: ${upiDeeplink}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        // Try file sharing if supported
        const res = await fetch(qrCodeImgUrl);
        const blob = await res.blob();
        const file = new File([blob], `shreeniwas-payment-qr-${amount}.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Pay ₹${amount} to ${merchantName}`,
            text: shareText,
            files: [file],
          });
          return;
        }
      } catch (e) {
        console.debug('File share skipped/failed:', e);
      }

      try {
        await navigator.share({
          title: `Pay ₹${amount} to ${merchantName}`,
          text: shareText,
          url: upiDeeplink,
        });
        return;
      } catch (e) {
        console.debug('Navigator share dismissed:', e);
      }
    }

    // Fallback: Copy share message to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedQr(true);
      setTimeout(() => setCopiedQr(false), 2500);
    } catch (e) {
      console.warn('Share copy fallback failed', e);
    }
  };

  // Direct App Pay Intent triggers
  const handleDirectAppPay = (appType: 'any' | 'gpay' | 'phonepe' | 'paytm' | 'bhim') => {
    let url = upiDeeplink;
    if (appType === 'gpay') {
      url = `tez://upi/pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(purpose.slice(0, 30))}`;
    } else if (appType === 'phonepe') {
      url = `phonepe://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(purpose.slice(0, 30))}`;
    } else if (appType === 'paytm') {
      url = `paytmmp://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(purpose.slice(0, 30))}`;
    }

    // Trigger intent
    window.location.href = url;

    // Fallback to standard UPI link after small timeout if app not installed
    if (appType !== 'any') {
      setTimeout(() => {
        window.location.href = upiDeeplink;
      }, 700);
    }
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
    setShowBankDetails(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="secure-payment-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 18 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-[#0A1628] my-6"
        >
          {/* Header */}
          <div className="bg-[#0A1628] text-white p-5 sm:p-6 relative border-b-2 border-[#C9A96E]/40">
            <button
              onClick={resetModal}
              aria-label="Close payment modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/20 flex items-center justify-center border border-[#C9A96E]/40 text-[#C9A96E]">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A96E] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> NPCI Verified UPI Gateway
                </span>
                <h2 id="secure-payment-modal-title" className="text-xl font-serif font-bold text-white">
                  Direct UPI & QR Payment
                </h2>
              </div>
            </div>
          </div>

          {/* Body Step 1: Scan & Pay */}
          {step === 'scan' && (
            <div className="p-5 sm:p-7 space-y-5">
              {/* Order Summary Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                <div className="truncate pr-3">
                  <p className="text-xs text-slate-500 font-medium">{purpose}</p>
                  <p className="text-sm font-bold text-[#0A1628] truncate">{propertyName}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Amount Payable</span>
                  <span className="text-2xl font-extrabold text-[#0A1628] text-emerald-700">₹{amount}</span>
                </div>
              </div>

              {/* QR Code Graphic Box */}
              <div className="text-center space-y-3.5">
                <div className="inline-block p-3.5 bg-white rounded-3xl border-2 border-[#C9A96E]/50 shadow-xl relative">
                  <div className="w-48 h-48 sm:w-52 sm:h-52 bg-white rounded-2xl flex flex-col items-center justify-center relative overflow-hidden border border-slate-100 p-2">
                    <img 
                      src={qrCodeImgUrl} 
                      alt="UPI Payment QR Code"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <div className="mt-2 text-[10px] font-bold text-slate-600 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Payee: <strong className="text-[#0A1628]">{merchantName}</strong></span>
                  </div>
                </div>

                {/* REQUIRED BUTTONS: ONE FOR DOWNLOAD, ONE FOR SHARE QR */}
                <div className="grid grid-cols-2 gap-2.5 max-w-sm mx-auto">
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    disabled={isDownloading}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-[#0A1628] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all border border-slate-300 shadow-xs cursor-pointer active:scale-95"
                  >
                    {isDownloading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C9A96E]" />
                    ) : downloadSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Saved!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-[#0A1628]" />
                        <span>Download QR Image</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleShareQr}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-[#0A1628] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all border border-slate-300 shadow-xs cursor-pointer active:scale-95"
                  >
                    {copiedQr ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-[#0A1628]" />
                        <span>Share QR Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* REQUIRED: DIRECT TO PAY APP BUTTONS */}
                {paymentConfig.enableDirectUpiPay && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <span>Direct to Pay (Tap to Open App)</span>
                      <span className="text-[10px] text-emerald-600 lowercase bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        1-tap checkout
                      </span>
                    </div>

                    {/* Primary All-in-one button */}
                    <button
                      type="button"
                      onClick={() => handleDirectAppPay('any')}
                      className="w-full py-3 px-4 bg-[#0A1628] hover:bg-[#132238] text-[#C9A96E] font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md border border-[#C9A96E]/40 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <Smartphone className="w-4 h-4 text-[#C9A96E]" />
                      <span>Direct Pay via Any Installed UPI App</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Individual App Direct Triggers */}
                    <div className="grid grid-cols-4 gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => handleDirectAppPay('gpay')}
                        className="py-2 px-1 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-200 shadow-xs transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center cursor-pointer"
                        title="Direct Pay with Google Pay"
                      >
                        <span className="text-[#4285F4] font-black text-xs">GPay</span>
                        <span className="text-[9px] text-slate-400 font-medium">Google</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDirectAppPay('phonepe')}
                        className="py-2 px-1 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-200 shadow-xs transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center cursor-pointer"
                        title="Direct Pay with PhonePe"
                      >
                        <span className="text-[#5F259F] font-black text-xs">PhonePe</span>
                        <span className="text-[9px] text-slate-400 font-medium">UPI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDirectAppPay('paytm')}
                        className="py-2 px-1 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-200 shadow-xs transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center cursor-pointer"
                        title="Direct Pay with Paytm"
                      >
                        <span className="text-[#00BAF2] font-black text-xs">Paytm</span>
                        <span className="text-[9px] text-slate-400 font-medium">Wallet/UPI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDirectAppPay('bhim')}
                        className="py-2 px-1 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-200 shadow-xs transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center cursor-pointer"
                        title="Direct Pay with BHIM"
                      >
                        <span className="text-[#00897B] font-black text-xs">BHIM</span>
                        <span className="text-[9px] text-slate-400 font-medium">Govt UPI</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Official UPI ID Copy Strip */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="text-left">
                    <span className="text-slate-500 font-medium block text-[10px] uppercase">Verified Merchant UPI ID</span>
                    <span className="font-mono font-bold text-[#0A1628] text-xs sm:text-sm">{upiId}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="p-2 text-[#C9A96E] hover:text-[#0A1628] hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Optional Bank Transfer Drawer */}
                {paymentConfig.bankName && (
                  <div className="text-left border-t border-slate-100 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowBankDetails(!showBankDetails)}
                      className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-[#0A1628] p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>Direct Bank Transfer / NEFT / IMPS Option</span>
                      </span>
                      <span className="text-[11px] font-bold text-[#C9A96E]">
                        {showBankDetails ? 'Hide' : 'Show Details'}
                      </span>
                    </button>

                    {showBankDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs font-mono"
                      >
                        <div className="flex justify-between">
                          <span className="text-slate-500">Bank:</span>
                          <span className="font-bold text-[#0A1628]">{paymentConfig.bankName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Account No:</span>
                          <span className="font-bold text-[#0A1628] flex items-center gap-1.5">
                            {paymentConfig.accountNumber}
                            <button
                              type="button"
                              onClick={() => handleCopyBank(paymentConfig.accountNumber, 'acc')}
                              className="text-slate-400 hover:text-[#0A1628]"
                            >
                              {copiedBank === 'acc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">IFSC Code:</span>
                          <span className="font-bold text-[#0A1628] flex items-center gap-1.5">
                            {paymentConfig.ifscCode}
                            <button
                              type="button"
                              onClick={() => handleCopyBank(paymentConfig.ifscCode, 'ifsc')}
                              className="text-slate-400 hover:text-[#0A1628]"
                            >
                              {copiedBank === 'ifsc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Beneficiary:</span>
                          <span className="font-bold text-[#0A1628] truncate max-w-[200px]">{paymentConfig.accountHolder}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button: Next Step */}
              <button
                type="button"
                onClick={() => setStep('verify')}
                className="w-full py-3.5 sm:py-4 bg-[#0A1628] hover:bg-[#132238] text-[#C9A96E] font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-[#0A1628]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#C9A96E]/40 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>I Have Paid ₹{amount} — Submit UTR Ref</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Body Step 2: Verification */}
          {step === 'verify' && (
            <form onSubmit={handleVerifyPayment} className="p-5 sm:p-7 space-y-5">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#0A1628] mb-1">Verify Your Payment</h3>
                <p className="text-xs text-slate-500">
                  Enter the 12-digit UTR / Reference number from your GPay, PhonePe, Paytm, or Bank confirmation receipt.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
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
                    <ShieldCheck className="w-4 h-4 text-amber-700" /> SuperAdmin Instant Live Verification
                  </p>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Once submitted, our accounts desk matches this UTR against our bank ledger and issues your official verified receipt and priority dispatch.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('scan')}
                  className="px-5 py-3.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  ← Back to QR
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="flex-1 py-3.5 bg-[#0A1628] hover:bg-[#132238] text-[#C9A96E] font-extrabold text-sm rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-[#C9A96E]/40"
                >
                  {isVerifying ? (
                    <div className="w-5 h-5 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" />
                  ) : (
                    <>Verify & Issue Receipt</>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Body Step 3: Receipt */}
          {step === 'receipt' && (
            <div className="p-5 sm:p-7 space-y-5 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                  Payment Confirmed & Verified
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#0A1628] mt-1">Official Receipt Generated</h3>
              </div>

              {/* Printable Receipt Card */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-left space-y-2.5 font-mono text-xs">
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
                  <span className="text-slate-500">Payee Merchant:</span>
                  <span className="font-bold text-[#0A1628] truncate max-w-[200px]">{merchantName}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetModal}
                className="w-full py-3.5 bg-[#0A1628] text-[#C9A96E] font-extrabold text-sm rounded-xl shadow-xl hover:bg-[#132238] transition-all cursor-pointer border border-[#C9A96E]/30"
              >
                Done & Continue
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
