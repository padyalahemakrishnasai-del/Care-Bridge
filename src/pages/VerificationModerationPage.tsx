import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Clock, 
  Building2, 
  AlertTriangle, 
  FileText,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VerificationModerationPage: React.FC = () => {
  const { facilities, updateFacility, showToast } = useApp();
  const [moderatorNotes, setModeratorNotes] = useState('');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>(facilities[3]?.id || facilities[0]?.id);

  const selectedFacility = facilities.find(f => f.id === selectedFacilityId) || facilities[0];

  const handleApprove = () => {
    updateFacility(selectedFacility.id, {
      trustStatus: 'verified',
      lastVerifiedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      verificationNotes: moderatorNotes.trim() || 'Verified by clinical moderation board with local license registry.'
    });
    showToast(`Facility "${selectedFacility.name}" approved as officially VERIFIED.`);
    setModeratorNotes('');
  };

  const handleReject = () => {
    showToast(`Verification submission for "${selectedFacility.name}" was rejected. Additional documentation requested.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-[#0F766E]">
            Clinical Verification Bureau
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Facility Verification & Moderation Queue
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Review clinic submissions, check official registration licenses against state health portals, and certify price cards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left List of Pending Submissions */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            Pending Queue ({facilities.length})
          </h2>
          
          <div className="space-y-2">
            {facilities.map(fac => (
              <button
                key={fac.id}
                type="button"
                onClick={() => setSelectedFacilityId(fac.id)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                  selectedFacility.id === fac.id
                    ? 'bg-[#E6F4F1] border-[#0F766E] shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{fac.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    fac.trustStatus === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {fac.trustStatus}
                  </span>
                </div>
                <p className="text-slate-500 mt-1">{fac.city} • {fac.type}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Last status: {fac.lastVerifiedDate}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Review Pane (Side-by-side Inspection) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-[#0F766E] uppercase">Verification Dossier</span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedFacility.name}</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">{selectedFacility.id}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="text-slate-500 font-semibold block">Official Address:</span>
              <span className="text-slate-900 font-medium">{selectedFacility.address}, {selectedFacility.city} - {selectedFacility.pincode}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="text-slate-500 font-semibold block">Duty Phone & Operating Hours:</span>
              <span className="text-slate-900 font-medium">{selectedFacility.phone} ({selectedFacility.operatingHours})</span>
            </div>
          </div>

          {/* Published Rate Card Inspection */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
              Declared Tariff & Rate Card
            </h4>
            <div className="space-y-2">
              {selectedFacility.priceList.map(pr => (
                <div key={pr.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs flex justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{pr.serviceName}</span>
                    <p className="text-slate-500 mt-0.5">Inclusions: {pr.inclusions} (Source: {pr.source})</p>
                  </div>
                  <span className="font-black text-slate-900 text-sm">₹{pr.priceMin}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Moderator Decision Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Clinical Reviewer Verification Notes *
            </label>
            <textarea
              rows={3}
              value={moderatorNotes}
              onChange={(e) => setModeratorNotes(e.target.value)}
              placeholder="e.g. Cross-referenced hospital registration license with State Council portal. Rate card certified."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleReject}
              className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>Reject Submission</span>
            </button>

            <button
              type="button"
              onClick={handleApprove}
              className="px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Approve as Officially Verified</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
