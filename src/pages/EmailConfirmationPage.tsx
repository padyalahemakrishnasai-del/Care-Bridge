import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';

export const EmailConfirmationPage: React.FC = () => {
  const location = useLocation();
  const email = (location.state as any)?.email || 'your registered email';

  return (
    <AuthLayout
      heading="Verify Your Email Address."
      subtitle="We have sent a verification confirmation message to ensure you maintain full ownership of your health account."
    >
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-100 text-[#0F766E] flex items-center justify-center mx-auto shadow-sm">
          <Mail className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Check Your Email
          </h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-sm mx-auto">
            We sent an activation link to <strong>{email}</strong>. Click the link in your email to confirm your account and get started.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-left space-y-1.5">
          <p className="font-bold text-slate-700">Didn't receive the email?</p>
          <p>• Check your Spam or Promotions folder</p>
          <p>• Ensure your email address was typed correctly</p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/login"
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0F766E] hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Go to Login
          </Link>
          <Link
            to="/signup"
            className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl transition-colors"
          >
            Re-enter Email
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
