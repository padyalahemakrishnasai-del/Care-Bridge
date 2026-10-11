import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartPulse, CheckCircle2, Lock } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, heading, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Brand & Trust Visual Pane (Desktop 5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0F766E] via-teal-800 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0F766E] flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
                  <path d="M4 18c4-8 12-8 16 0" />
                  <circle cx="4" cy="18" r="2" fill="currentColor" />
                  <circle cx="20" cy="18" r="2" fill="currentColor" />
                </svg>
              </div>
              <span className="text-2xl font-black text-white tracking-tight">CareBridge</span>
            </Link>

            <div className="mt-10 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-bold border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Trusted Healthcare Platform
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {heading}
              </h1>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-normal">
                {subtitle}
              </p>
            </div>

            {/* Value checklist */}
            <div className="mt-8 space-y-2.5 text-xs text-teal-100/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Find verified hospitals, clinics & blood donors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Medicine schedule alerts with audible alarms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Private encrypted medical records vault</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>1-Tap access to 112 emergency calling</span>
              </div>
            </div>
          </div>

          {/* Privacy footnote */}
          <div className="relative z-10 pt-6 mt-6 border-t border-teal-700/60 text-[11px] text-teal-200/80 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-teal-300" />
            <span>Digital Personal Data Protection (DPDP) Act 2023 Compliant</span>
          </div>
        </div>

        {/* Right Form Interaction Pane (Desktop 7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};
