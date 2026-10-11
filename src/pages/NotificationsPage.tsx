import React from 'react';
import { 
  Bell, 
  Smartphone, 
  Mail, 
  MessageSquare, 
  Moon, 
  ShieldCheck, 
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsPage: React.FC = () => {
  const { preferences, updatePreferences, showToast } = useApp();

  const handleToggle = (key: keyof typeof preferences) => {
    updatePreferences({ [key]: !preferences[key] } as any);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Notifications & Reminder Preferences
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Customize how you receive dose alerts and doctor appointments without spam or duplicates.
        </p>
      </div>

      {/* Notification Delivery Honesty Notice */}
      <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#0F766E] flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Delivery Confirmation Principle:</strong> CareBridge only logs an SMS or email notification as "Delivered" once the telecom gateway or SMS provider confirms network receipt. Unconfirmed alerts are honestly designated as "Sent (Pending Gateway Confirmation)".
        </div>
      </div>

      {/* Channels Group */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Delivery Channels
        </h2>

        <div className="space-y-3">
          {/* In-app alerts */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-[#0F766E] flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">In-App Browser Notifications</h3>
                <p className="text-xs text-slate-500">Visual reminders inside the application and device banner</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('inAppAlerts')}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                preferences.inAppAlerts ? 'bg-[#0F766E]' : 'bg-slate-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                preferences.inAppAlerts ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Email alerts */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Email Reminders</h3>
                <p className="text-xs text-slate-500">Appointment summaries sent to your registered email</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('emailAlerts')}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                preferences.emailAlerts ? 'bg-[#0F766E]' : 'bg-slate-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                preferences.emailAlerts ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* SMS alerts */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">SMS Text Message</h3>
                <p className="text-xs text-slate-500">Low-bandwidth fallback for critical emergency broadcasts</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('smsAlerts')}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                preferences.smsAlerts ? 'bg-[#0F766E]' : 'bg-slate-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                preferences.smsAlerts ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Quiet Hours Policy */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">Quiet Hours (Do Not Disturb)</h2>
        </div>
        <p className="text-xs text-slate-500">
          Non-critical notifications are silenced between these hours. Emergency blood broadcasts and urgent doctor visits remain exempt.
        </p>

        <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1">Silence Start Time:</label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>
          <div>
            <label className="block mb-1">Resume Time:</label>
            <input
              type="time"
              defaultValue="07:00"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
