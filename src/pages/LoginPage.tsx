import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithEmail, signInWithGoogle, isConfigured } = useAuth();
  const { loginAs, showToast } = useApp();

  const [loginMethod, setLoginMethod] = useState<'email' | 'username'>('email');
  const [identifier, setIdentifier] = useState('priya.sharma@example.com');
  const [password, setPassword] = useState('CareBridge2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    // Resolve email if username selected (in client demo, username@carebridge.in or direct mapping)
    const emailToUse = loginMethod === 'username' 
      ? (identifier.includes('@') ? identifier : `${identifier.toLowerCase().trim()}@carebridge.in`)
      : identifier.trim();

    if (isConfigured) {
      const { error } = await signInWithEmail(emailToUse, password);
      setLoading(false);
      if (error) {
        setErrorMessage(error.message || 'Invalid email/username or password. Please try again.');
      } else {
        showToast('Signed in successfully.');
        navigate('/dashboard');
      }
    } else {
      // Offline fallback: log in directly with demo state
      setTimeout(() => {
        setLoading(false);
        loginAs('registered_user');
        showToast('Demo Mode: Logged in successfully.');
        navigate('/dashboard');
      }, 500);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    if (isConfigured) {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(error.message);
      }
    } else {
      showToast('Demo Mode: Google authentication simulated.');
      loginAs('registered_user');
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout
      heading="Your Health Journey Starts Here."
      subtitle="Connect with healthcare services, manage your health, and care for your loved ones — all in one place."
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Sign In to CareBridge
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your credentials to access your medication reminders, vault, and family coordination.
          </p>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs min-h-[46px]"
        >
          {/* Google Icon SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            or continue with
          </span>
          <div className="border-t border-slate-200 w-full" />
        </div>

        {/* Toggle Login Option (Email vs Username) */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              loginMethod === 'email' ? 'bg-white text-[#0F766E] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Email Address
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('username')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              loginMethod === 'username' ? 'bg-white text-[#0F766E] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Username
          </button>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {loginMethod === 'email' ? 'Email Address' : 'Unique Username'} *
            </label>
            <div className="relative">
              {loginMethod === 'email' ? (
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              ) : (
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              )}
              <input
                type={loginMethod === 'email' ? 'email' : 'text'}
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={loginMethod === 'email' ? 'e.g. priya.sharma@example.com' : 'e.g. priya_health'}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0F766E] text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">Password *</label>
              <Link to="/forgot-password" className="text-xs font-bold text-[#0F766E] hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0F766E] text-xs font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#0F766E] rounded focus:ring-[#0F766E]"
              />
              <span className="font-medium text-slate-600">Remember my session</span>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0F766E] hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 min-h-[46px] disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Link to Sign-Up */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-[#0F766E] hover:underline">
            Sign Up Free
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
