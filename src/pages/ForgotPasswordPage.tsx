import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPasswordForEmail, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    if (isConfigured) {
      const { error } = await resetPasswordForEmail(email.trim());
      setLoading(false);
      if (error) {
        setErrorMsg(error.message);
      } else {
        setIsSubmitted(true);
      }
    } else {
      setTimeout(() => {
        setLoading(false);
        setIsSubmitted(true);
      }, 500);
    }
  };

  return (
    <AuthLayout
      heading="Reset Password Safely."
      subtitle="Enter your verified email address to receive password reset instructions. We will never disclose your healthcare information."
    >
      <div className="space-y-6">
        <div>
          <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] hover:underline mb-3">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Forgot Your Password?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            No worries. We will send a secure link to reset your account password.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-slate-900 text-base">Check Your Inbox</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We have sent password recovery instructions to <strong>{email}</strong>. Follow the link in the email to set a new password.
            </p>
            <div className="pt-2">
              <Link to="/login" className="inline-block px-4 py-2 bg-[#0F766E] text-white font-bold text-xs rounded-xl">
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">Registered Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priya.sharma@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0F766E] text-xs font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0F766E] hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-md transition-all min-h-[46px] disabled:opacity-50"
            >
              <span>{loading ? 'Sending Recovery Link...' : 'Send Password Reset Link'}</span>
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};
