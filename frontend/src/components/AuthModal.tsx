import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, User, ArrowRight, Loader2, RefreshCw, X } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  initialMessage?: string;
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialMessage }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when closed
      setEmail('');
      setName('');
      setOtp('');
      setStep('details');
      setError('');
      setSuccessMsg('');
      setDevOtp(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your email address.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep('otp');
        setCountdown(120); // 2 minutes resend countdown
        setSuccessMsg('A 6-digit verification code has been sent to your email.');
        if (data.devOtp) {
          setDevOtp(data.devOtp);
        }
      } else {
        setError(data.error || 'Failed to send verification code. Please try again.');
      }
    } catch (err) {
      setError('Connection failure. Could not contact verification server.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, name }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Verification successful! Logging you in...');
        setTimeout(() => {
          onSuccess(data.user);
          onClose();
        }, 1200);
      } else {
        setError(data.error || 'Invalid or expired verification code.');
      }
    } catch (err) {
      setError('Verification connection error.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col">
        {/* Decorative Top Accent */}
        <div className="h-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-500" />
        
        {/* Header */}
        <div className="p-4 sm:p-6 pb-2 sm:pb-4 flex justify-between items-start">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-950">
              {step === 'details' ? 'Account Authentication' : 'Verify Your Identity'}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
              {step === 'details' ? 'Access specialized counseling & premium admissions' : 'Enter the code sent to your inbox'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition shrink-0 ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Informative message from redirected action */}
        {initialMessage && step === 'details' && (
          <div className="mx-4 sm:mx-6 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
            💡 {initialMessage}
          </div>
        )}

        <div className="p-4 sm:p-6 pt-2 flex-1">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold leading-relaxed">
              ⚠️ {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-100 text-green-800 text-xs font-semibold leading-relaxed">
              ✅ {successMsg}
            </div>
          )}

          {step === 'details' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium text-sm rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                We sent an email to <strong className="text-slate-900">{email}</strong>. If you cannot find the code, please look in your Spam/Junk folder or see the notification above.
              </p>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">6-Digit Verification Code (OTP)</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit OTP code"
                    className="w-full pl-9 pr-4 py-2 text-sm font-semibold tracking-widest text-center border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Verify and Login</span>
                )}
              </button>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-slate-500 hover:text-slate-900 hover:underline"
                >
                  ← Edit details
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={countdown > 0 || loading}
                  className="text-red-600 hover:text-red-500 hover:underline flex items-center space-x-1 disabled:opacity-40 disabled:hover:no-underline"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>{countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}</span>
                </button>
              </div>

              {devOtp && (
                <div className="mt-4 p-3 rounded-xl bg-amber-50/60 border border-dashed border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                  <p className="font-bold text-amber-950 mb-1">🔬 Sandbox Mode & Dev Preview</p>
                  <p className="text-gray-600 mb-2">
                    To make testing effortless without a real mail service, you can log in instantly with this bypass code:
                  </p>
                  <div className="flex items-center justify-center bg-white border border-amber-300 rounded-lg p-2 font-mono text-base font-black text-amber-950 select-all tracking-widest">
                    {devOtp}
                  </div>
                </div>
              )}
            </form>
          )}

          {/* Fallback helper tip */}
        </div>
      </div>
    </div>
  );
}
