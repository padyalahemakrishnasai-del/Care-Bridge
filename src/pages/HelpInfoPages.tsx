import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Lock, 
  Eye, 
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export const HelpInfoPages: React.FC<{ initialTab?: 'help' | 'privacy' | 'consent' | 'accessibility' }> = ({ initialTab = 'help' }) => {
  const [activeTab, setActiveTab] = useState<'help' | 'privacy' | 'consent' | 'accessibility'>(initialTab);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Does CareBridge replace an emergency ambulance or clinical doctor?",
      a: "No. CareBridge is an access, discovery, and coordination platform for Indian families. In any acute medical emergency, immediately call 112 or 108 or go to the nearest trauma hospital casualty."
    },
    {
      q: "How does CareBridge verify hospital details and consultation charges?",
      a: "Our moderation team checks official medical council registries, government health databases (e.g. DMHO, NHM), and published tariff cards. Listings without recent re-checks are explicitly badged with 'User Submitted' or 'Not recently verified'."
    },
    {
      q: "Can my caregiver see my private lab reports without permission?",
      a: "No. You have complete custody of your medical vault. When inviting a family member, you select whether they can see medicines, appointments, or documents. You can revoke their access in one click anytime."
    },
    {
      q: "Can anyone see my phone number if I register as a blood donor?",
      a: "No. CareBridge never displays your telephone number publicly. Inquiries from verified hospital coordinators are relayed privately through our secure inbox."
    }
  ];

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 gap-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('help')}
          className={`flex-1 py-2.5 rounded-lg transition-all ${
            activeTab === 'help' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Help & FAQs
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('privacy')}
          className={`flex-1 py-2.5 rounded-lg transition-all ${
            activeTab === 'privacy' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Privacy Notice (DPDP)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('consent')}
          className={`flex-1 py-2.5 rounded-lg transition-all ${
            activeTab === 'consent' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Consent & Revocation
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('accessibility')}
          className={`flex-1 py-2.5 rounded-lg transition-all ${
            activeTab === 'accessibility' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Accessibility Standard
        </button>
      </div>

      {/* Tab 1: Help & FAQs */}
      {activeTab === 'help' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Plain-language answers for patients, elders, and family caregivers.</p>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 font-bold text-sm text-slate-900 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Privacy Notice */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2 text-[#0F766E]">
            <Lock className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900">Digital Personal Data Protection (DPDP) Privacy Notice</h2>
          </div>
          <p>
            CareBridge complies with the provisions of India's Digital Personal Data Protection Act 2023. We hold data minimization as an absolute principle.
          </p>
          <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">Key Privacy Guarantees:</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Zero Commercial Monetization:</strong> We never sell medical history, diagnostic findings, or blood groups to third-party insurance brokers or advertisers.</li>
              <li><strong>Zero Unrestricted Public Buckets:</strong> Patient documents are saved in private encrypted vaults protected with signed short-lived access links.</li>
              <li><strong>Portability & Deletion:</strong> You can export all your recorded data in JSON format or trigger complete account purging anytime from your Profile settings.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Consent & Data Sharing */}
      {activeTab === 'consent' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2 text-[#0F766E]">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900">Informed Consent Architecture</h2>
          </div>
          <p>
            Under healthcare ethics in India, consent is not an ambiguous one-time checkbox. In CareBridge, consent is:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-teal-50 rounded-xl border border-teal-100">
              <span className="font-bold text-[#0F766E] block mb-1">Granular</span>
              Select individual permissions for medicines, appointments, and records.
            </div>
            <div className="p-3 bg-teal-50 rounded-xl border border-teal-100">
              <span className="font-bold text-[#0F766E] block mb-1">Purpose-Bound</span>
              Collected exclusively to assist care coordination and emergency notification.
            </div>
            <div className="p-3 bg-teal-50 rounded-xl border border-teal-100">
              <span className="font-bold text-[#0F766E] block mb-1">Revocable in 1 Tap</span>
              Withdraw consent anytime. Revoked caregivers immediately lose all file access.
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Accessibility Standard */}
      {activeTab === 'accessibility' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2 text-[#0F766E]">
            <Eye className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900">WCAG 2.1 AA Accessibility Commitment</h2>
          </div>
          <p>
            CareBridge is designed for everyone—including elderly citizens, users with low-vision, and rural users with basic mobile smartphones.
          </p>
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>4.5:1 High Contrast Text Ratios across all design tokens</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Visible teal focus rings on all interactive keyboard buttons</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full screen reader ARIA labels and semantic landmark structures</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Indian scripts typographic optimization with Google Noto Sans</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
