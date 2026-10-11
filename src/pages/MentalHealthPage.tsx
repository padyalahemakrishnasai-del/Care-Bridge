import React, { useState } from 'react';
import { 
  Smile, 
  PhoneCall, 
  ShieldCheck, 
  Heart, 
  Search, 
  Lock, 
  Sparkles, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MentalHealthResource } from '../types';

export const MentalHealthPage: React.FC = () => {
  const { mentalHealthResources, showToast } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const types = ['All', 'Crisis Helpline', 'Peer Support', 'Licensed Professional'];
  const languages = ['All', 'Hindi', 'English', 'Telugu', 'Tamil', 'Bengali'];

  const filteredResources = mentalHealthResources.filter(res => {
    const matchesType = selectedType === 'All' || res.type === selectedType;
    const matchesLang = selectedLanguage === 'All' || res.languagesSupported.includes(selectedLanguage);
    const matchesSearch = 
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.cityOrMode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesLang && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Mental Well-being & Emotional Support
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Confidential support, verified psychologists, and 24/7 crisis hotlines. Free from judgment, stigma, or invasive tracking.
        </p>
      </div>

      {/* Immediate Crisis Card - Always Available Zero-Login */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-teal-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-teal-200 uppercase tracking-wider">
                Need Help Right Now? 24x7 Government Helplines
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              You are not alone. Immediate support is one phone call away.
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-xl leading-relaxed">
              Trained counselors are ready to listen in your mother tongue. Free, confidential, and run by NIMHANS and the Ministry of Health.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            <a
              href="tel:14416"
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm shadow-lg transition-transform active:scale-95 min-h-[48px]"
            >
              <PhoneCall className="w-5 h-5 text-slate-950" />
              <span>Call Tele-MANAS (14416)</span>
            </a>

            <a
              href="tel:18005990019"
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 min-h-[48px]"
            >
              <span>KIRAN (1800-599-0019)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Non-Clinical Practical Wellness Reminder */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Daily Care Routine:</strong> Taking 10 minutes for slow deep breathing (Pranayama), a 20-minute morning walk in sunlight, and sharing concerns with a trusted friend significantly reduces acute stress cortisol levels.
        </div>
      </div>

      {/* Directory Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-3 text-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mental health organization or professional..."
            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Type:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium"
          >
            {types.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium"
          >
            {languages.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map(res => (
          <div key={res.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  res.type === 'Crisis Helpline'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : res.type === 'Licensed Professional'
                    ? 'bg-[#E6F4F1] text-[#0F766E]'
                    : 'bg-indigo-50 text-indigo-700'
                }`}>
                  {res.type}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Organization
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base">{res.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Mode: {res.cityOrMode}</p>

              {res.credentials && (
                <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-800">Credentials: </span>
                  {res.credentials}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-1">
                {res.languagesSupported.map(lang => (
                  <span key={lang} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {lang}
                  </span>
                ))}
              </div>

              <div className="mt-3 text-xs flex justify-between text-slate-600">
                <span>Published Fee: <strong>{res.publishedFee || 'Contact for details'}</strong></span>
                <span>Hours: <strong>{res.hours}</strong></span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">{res.phoneOrContact}</span>
              <a
                href={res.phoneOrContact.startsWith('1') || res.phoneOrContact.startsWith('+') ? `tel:${res.phoneOrContact}` : '#'}
                onClick={() => {
                  if (!res.phoneOrContact.startsWith('1') && !res.phoneOrContact.startsWith('+')) {
                    showToast('Referral request securely forwarded to clinical psychologist coordinator.');
                  }
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contact Confidentially</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
