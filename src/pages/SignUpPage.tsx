import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithGoogle, isConfigured } = useAuth();
  const { loginAs, showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<'registered_user' | 'authorized_caregiver' | 'verified_facility_manager'>('registered_user');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password validation indicators
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }

    if (!hasMinLength) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);

    if (isConfigured) {
      const { error } = await signUpWithEmail(email.trim(), password, {
        fullName: fullName.trim(),
        username: username.toLowerCase().trim(),
        role: accountType,
        phone: phone.trim() || undefined,
      });

      setLoading(false);
      if (error) {
        setErrorMessage(error.message);
      } else {
        showToast('Registration successful! Please check your email for confirmation.');
        navigate('/email-confirmation', { state: { email } });
      }
    } else {
      setTimeout(() => {
        setLoading(false);
        loginAs(accountType);
        showToast('Demo Account Created: Welcome to CareBridge!');
        navigate('/complete-profile');
      }, 600);
    }
  };

  const handleGoogleSignUp = async () => {
    if (isConfigured) {
      await signInWithGoogle();
    } else {
      loginAs('registered_user');
      showToast('Demo Mode: Google account registration successful.');
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout
      heading="Join CareBridge Today."
      subtitle="Create an account to organize family health routines, store prescriptions securely, and find verified emergency facilities."
    >
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Free forever for individuals and families.
          </p>
        </div>

        {/* Google OAuth Quick Button */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs min-h-[44px]"
        >
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
          <span>Sign Up with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            or fill details
          </span>
          <div className="border-t border-slate-200 w-full" />
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Unique Username *</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. priyasharma26"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98480 12345"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs font-medium"
              />
            </div>
          </div>

          {/* Account Role Selector */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Account Type / Primary Role</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-xs"
            >
              <option value="registered_user">Patient / Individual Family Member</option>
              <option value="authorized_caregiver">Caregiver (Son, Daughter, Relative)</option>
              <option value="verified_facility_manager">Healthcare Provider (Subject to Verification)</option>
            </select>
            {accountType === 'verified_facility_manager' && (
              <p className="text-[11px] text-amber-700 mt-1">
                Notice: Provider access requires official clinic license verification before administrative rights are granted.
              </p>
            )}
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confirm Password *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Password Strength Checklist */}
          <div className="flex flex-wrap gap-3 text-[11px] text-slate-500 pt-0.5">
            <span className={hasMinLength ? 'text-emerald-700 font-bold' : ''}>
              {hasMinLength ? '✓' : '○'} 8+ characters
            </span>
            <span className={hasNumber ? 'text-emerald-700 font-bold' : ''}>
              {hasNumber ? '✓' : '○'} Contains number
            </span>
            <span className={passwordsMatch ? 'text-emerald-700 font-bold' : ''}>
              {passwordsMatch ? '✓' : '○'} Passwords match
            </span>
          </div>

          {/* Terms Agreement */}
          <div className="pt-2">
            <label className="flex items-start gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#0F766E] rounded"
              />
              <span className="text-[11px] text-slate-600 leading-relaxed">
                I agree to the <Link to="/privacy" className="text-[#0F766E] font-bold underline">Terms of Service</Link> and <Link to="/consent" className="text-[#0F766E] font-bold underline">Privacy Policy</Link> under India DPDP Act.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0F766E] hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 min-h-[46px] disabled:opacity-50"
          >
            <span>{loading ? 'Creating Account...' : 'Create CareBridge Account'}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#0F766E] hover:underline">
            Log In Here
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
