import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserPassword, isConfigured } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);

    if (isConfigured) {
      const { error } = await updateUserPassword(password);
      setLoading(false);
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccess(true);
      }
    } else {
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 500);
    }
  };

  return (
    <AuthLayout
      heading="Set a New Secure Password."
      subtitle="Ensure your password contains a mix of letters and numbers to protect your personal healthcare records."
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Create New Password
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Choose a strong password you haven't used before.
          </p>
        </div>

        {success ? (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-slate-900 text-base">Password Updated Successfully</h3>
            <p className="text-xs text-slate-600">
              You can now log in using your new credentials.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="px-5 py-2.5 bg-[#0F766E] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Go to Sign In
              </button>
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
              <label className="block font-bold text-slate-700 mb-1">New Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confirm New Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0F766E] hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-md transition-all min-h-[46px] disabled:opacity-50"
            >
              <span>{loading ? 'Updating Password...' : 'Save New Password'}</span>
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};
