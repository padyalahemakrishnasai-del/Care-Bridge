import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthPage: React.FC = () => {
  const { loginAs, showToast } = useApp();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('priya.sharma@example.com');
  const [password, setPassword] = useState('CareBridge2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'registered_user' | 'authorized_caregiver'>('registered_user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(role);
    showToast(`Welcome! Signed in successfully as ${role.replace('_', ' ')}.`);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto my-6 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      {/* Left Illustration & Brand Value Pane */}
      <div className="bg-gradient-to-br from-[#0F766E] to-teal-900 p-8 sm:p-10 text-white flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-100 text-xs font-bold mb-4">
            <ShieldCheck className="w-4 h-4 text-teal-300" />
            <span>Secure Patient Access</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black leading-tight">
            Healthcare, connected for every family.
          </h2>

          <p className="text-xs sm:text-sm text-teal-100/90 mt-3 leading-relaxed">
            Sign in to track elder medicines, organize lab records in your encrypted vault, and coordinate appointments with loved ones.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-teal-800/80 space-y-2 text-xs text-teal-200">
          <p>✓ 100% compliant with India Digital Personal Data Protection</p>
          <p>✓ Zero passwords or clinical data shared with third parties</p>
          <p>✓ Instant 112 emergency access available without login</p>
        </div>
      </div>

      {/* Right Form Pane */}
      <div className="p-8 sm:p-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-slate-900">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h3>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-bold text-[#0F766E] hover:underline"
            >
              {isSignUp ? 'Already registered? Log in' : 'New user? Sign up'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Mobile Number or Email *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="+91 98480 12345 or your@email.com"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">Primary Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold"
                >
                  <option value="registered_user">Patient / Family Head</option>
                  <option value="authorized_caregiver">Caregiver (Son, Daughter, Relative)</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#0F766E] hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5 min-h-[46px]"
            >
              <span>{isSignUp ? 'Create My Free Account' : 'Sign In to CareBridge'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-500">
          By continuing, you agree to CareBridge's{' '}
          <Link to="/privacy" className="text-[#0F766E] underline">Privacy Notice</Link> and{' '}
          <Link to="/consent" className="text-[#0F766E] underline">Consent Charter</Link>.
        </div>
      </div>
    </div>
  );
};
