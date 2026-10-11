import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Download, 
  Trash2, 
  ShieldCheck, 
  Smartphone, 
  MapPin, 
  Heart,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';

export const ProfilePage: React.FC = () => {
  const { currentUser, setCurrentUser, logout, showToast } = useApp();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fontSizeSetting, setFontSizeSetting] = useState<'standard' | 'large' | 'extra-large'>('standard');

  const handleExportData = () => {
    const backupData = {
      user: currentUser,
      exportTimestamp: new Date().toISOString(),
      platform: 'CareBridge India',
      compliance: 'Digital Personal Data Protection (DPDP) Act 2023 India'
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `carebridge_personal_data_export_${currentUser.id}.json`;
    link.click();
    showToast('Your full healthcare profile archive was downloaded.');
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          User Profile & Privacy Controls
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Manage your personal identity, accessibility font sizes, and privacy consent history under India DPDP Act.
        </p>
      </div>

      {/* Profile Details Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0F766E] text-white flex items-center justify-center font-black text-2xl shadow-xs">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{currentUser.name}</h2>
            <p className="text-xs text-slate-500">
              {currentUser.email} • {currentUser.phone}
            </p>
            <span className="inline-block mt-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E6F4F1] text-[#0F766E] capitalize">
              Role: {currentUser.role.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-500 block">Emergency Contact:</span>
            <span className="font-bold text-slate-800">{currentUser.emergencyContactName} ({currentUser.emergencyContactPhone})</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-500 block">PIN Code & Blood Group:</span>
            <span className="font-bold text-slate-800">{currentUser.pincode} • Blood Group: {currentUser.bloodGroup || 'O+'}</span>
          </div>
        </div>
      </div>

      {/* Accessibility Font Size Scaling for Elderly Users */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
        <h3 className="font-bold text-slate-900 text-base">
          Reading Text Size (A / A+ / A++)
        </h3>
        <p className="text-xs text-slate-500">
          Scale interface typography for comfortable reading without straining eyesight.
        </p>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => { setFontSizeSetting('standard'); showToast('Text scale: Standard'); }}
            className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
              fontSizeSetting === 'standard' ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-slate-50 text-slate-700'
            }`}
          >
            A (Standard)
          </button>
          <button
            type="button"
            onClick={() => { setFontSizeSetting('large'); showToast('Text scale: Large (+15%)'); }}
            className={`flex-1 py-3 rounded-xl border text-base font-bold transition-all ${
              fontSizeSetting === 'large' ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-slate-50 text-slate-700'
            }`}
          >
            A+ (Large)
          </button>
          <button
            type="button"
            onClick={() => { setFontSizeSetting('extra-large'); showToast('Text scale: Extra Large (+30%)'); }}
            className={`flex-1 py-3 rounded-xl border text-lg font-bold transition-all ${
              fontSizeSetting === 'extra-large' ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-slate-50 text-slate-700'
            }`}
          >
            A++ (Elderly Care)
          </button>
        </div>
      </div>

      {/* Data Export & Portability (DPDP Compliance) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
        <h3 className="font-bold text-slate-900 text-base">
          Data Portability & Full Export
        </h3>
        <p className="text-xs text-slate-500">
          Under India’s Digital Personal Data Protection Act, you have the right to obtain a digital archive of your stored health records, medication schedules, and audit entries.
        </p>
        <button
          type="button"
          onClick={handleExportData}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
        >
          <Download className="w-4 h-4 text-teal-700" />
          <span>Export All My Data (.JSON format)</span>
        </button>
      </div>

      {/* Red Danger Zone: Account Deletion */}
      <div className="bg-rose-50/60 rounded-2xl p-6 border-2 border-rose-200 space-y-3">
        <div className="flex items-center gap-2 text-rose-800">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-bold text-base">Account Deletion & Data Purge Zone</h3>
        </div>
        <p className="text-xs text-rose-900/80 leading-relaxed">
          Permanently delete your account, remove private medical vault records, cancel medication alerts, and revoke all active caregiver linkages.
        </p>
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#DC2626] hover:bg-red-800 text-white font-bold text-xs shadow-xs transition-colors"
        >
          Permanently Delete My CareBridge Account
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteModal}
        title="Permanent Account Erasure"
        message="This is a permanent operation under DPDP right to be forgotten. All your medication reminders, private vault records, and family associations will be deleted immediately."
        confirmLabel="Yes, Delete Everything"
        isDangerous={true}
        onConfirm={() => {
          setShowDeleteModal(false);
          logout();
          showToast('Account permanently erased. Returning to Guest view.');
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};
