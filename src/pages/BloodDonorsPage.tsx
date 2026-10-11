import React, { useState } from 'react';
import { 
  Droplet, 
  Heart, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  Search, 
  CheckCircle2, 
  UserCheck, 
  MessageSquare,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BloodDonor, BloodRequest } from '../types';

export const BloodDonorsPage: React.FC = () => {
  const { 
    donors, 
    bloodRequests, 
    registerDonor, 
    toggleDonorConsent, 
    addBloodRequest, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'requests' | 'find_donor' | 'register'>('requests');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [donorSearchCity, setDonorSearchCity] = useState('');

  // Donor Registration form state
  const [donorName, setDonorName] = useState('');
  const [donorGroup, setDonorGroup] = useState<BloodDonor['bloodGroup']>('O+');
  const [donorCity, setDonorCity] = useState('');
  const [donorDistrict, setDonorDistrict] = useState('');
  const [donorPincode, setDonorPincode] = useState('');
  const [hasConsented, setHasConsented] = useState(false);

  // Request Form modal state
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [reqInitials, setReqInitials] = useState('');
  const [reqGroup, setReqGroup] = useState('O+');
  const [reqUnits, setReqUnits] = useState(1);
  const [reqHospital, setReqHospital] = useState('');
  const [reqCity, setReqCity] = useState('');

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredDonors = donors.filter(d => {
    const matchesGroup = selectedGroup === 'All' || d.bloodGroup === selectedGroup;
    const matchesCity = !donorSearchCity || d.city.toLowerCase().includes(donorSearchCity.toLowerCase()) || d.district.toLowerCase().includes(donorSearchCity.toLowerCase());
    return d.consentGiven && matchesGroup && matchesCity;
  });

  const handleRegisterDonorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsented) {
      showToast('Explicit consent is required to register as a voluntary blood donor.');
      return;
    }

    registerDonor({
      fullName: donorName.trim() + ' (Consented Volunteer)',
      bloodGroup: donorGroup,
      city: donorCity.trim() || 'Local City',
      district: donorDistrict.trim() || 'District',
      pincode: donorPincode.trim() || '500001',
      isAvailable: true,
      consentGiven: true,
      totalDonationsCount: 1,
      contactPreference: 'carebridge_inbox'
    });

    setDonorName('');
    setDonorCity('');
    setDonorDistrict('');
    setDonorPincode('');
    setHasConsented(false);
    setActiveTab('find_donor');
  };

  const handleCreateRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqHospital.trim()) return;

    addBloodRequest({
      patientNameInitials: reqInitials.trim() || 'Patient Requester',
      bloodGroup: reqGroup,
      unitsNeeded: Number(reqUnits),
      hospitalName: reqHospital.trim(),
      city: reqCity.trim() || 'City',
      urgency: 'critical',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'active',
      contactPerson: 'Authorized Medical Social Worker'
    });

    setShowRequestModal(false);
    setActiveTab('requests');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Blood Donor Discovery & Coordination
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Ethical, voluntary blood donor network. Zero commercial blood trade. Absolute privacy protection.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowRequestModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#DC2626] hover:bg-red-800 rounded-xl shadow-xs transition-colors min-h-[42px]"
        >
          <Droplet className="w-4 h-4" />
          <span>+ Request Blood Urgently</span>
        </button>
      </div>

      {/* Safety & Legal Standards Notice */}
      <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#0F766E] flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>National Blood Transfusion Guidelines (NBTC India):</strong> CareBridge coordinates voluntary communication. Donor matching does not guarantee clinical compatibility or infection-free blood. All cross-matching, testing (HIV, Hepatitis, Malaria), and blood collection must take place at an authorized, licensed hospital blood bank. Commercial sale or purchase of human blood is illegal under Indian law.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'requests' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Emergency Blood Requests ({bloodRequests.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('find_donor')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'find_donor' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Find Consented Donors ({donors.filter(d => d.consentGiven).length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'register' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Become a Voluntary Donor
        </button>
      </div>

      {/* Tab 1: Emergency Blood Requests Board */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bloodRequests.map(req => (
              <div key={req.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
                      🚨 Urgency: {req.urgency.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Date: {req.requestDate}</span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-xl shadow-xs">
                      {req.bloodGroup}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        {req.unitsNeeded} Unit(s) Needed for {req.patientNameInitials}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Hospital: <strong>{req.hospitalName}</strong> ({req.city})
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">Contact: {req.contactPerson}</span>
                  <button
                    type="button"
                    onClick={() => showToast(`Donor notification sent to hospital coordination team for ${req.patientNameInitials}.`)}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-lg transition-colors"
                  >
                    I Can Donate (Coordinate)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Consented Donors Directory */}
      {activeTab === 'find_donor' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Blood Group:</span>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold"
              >
                {bloodGroups.map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={donorSearchCity}
                onChange={(e) => setDonorSearchCity(e.target.value)}
                placeholder="Filter by city or district (e.g. Guntur, Karimnagar)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDonors.map(donor => (
              <div key={donor.id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black px-2.5 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
                      {donor.bloodGroup}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Consented
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-2">{donor.fullName}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    📍 {donor.city}, {donor.district} • PIN {donor.pincode}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Donation history: {donor.totalDonationsCount} donations recorded
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-teal-600" /> Phone Protected
                  </span>
                  <button
                    type="button"
                    onClick={() => showToast(`Encrypted request forwarded to ${donor.fullName} via CareBridge relay.`)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#E6F4F1] text-[#0F766E] hover:bg-teal-100"
                  >
                    Contact via CareBridge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Donor Registration Form */}
      {activeTab === 'register' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Register as a Consented Blood Donor</h2>
            <p className="text-xs text-slate-500 mt-1">Your exact phone number will never be exposed publicly.</p>
          </div>

          <form onSubmit={handleRegisterDonorSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Display Name *</label>
              <input
                type="text"
                required
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="e.g. Ramesh K."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Blood Group *</label>
                <select
                  value={donorGroup}
                  onChange={(e) => setDonorGroup(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold"
                >
                  {bloodGroups.filter(g => g !== 'All').map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">PIN Code *</label>
                <input
                  type="text"
                  required
                  value={donorPincode}
                  onChange={(e) => setDonorPincode(e.target.value)}
                  placeholder="e.g. 522001"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={donorCity}
                  onChange={(e) => setDonorCity(e.target.value)}
                  placeholder="e.g. Guntur"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  value={donorDistrict}
                  onChange={(e) => setDonorDistrict(e.target.value)}
                  placeholder="e.g. Guntur"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            {/* Explicit Consent Checkbox */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasConsented}
                  onChange={(e) => setHasConsented(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#0F766E] rounded"
                />
                <span className="text-[11px] text-slate-600 leading-relaxed select-none">
                  I voluntarily consent to be listed as a donor. I understand CareBridge protects my private contact number and will only relay requests for emergency hospital situations. I can withdraw my consent at any time.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!hasConsented}
              className="w-full py-3 bg-[#0F766E] hover:bg-teal-800 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Complete Voluntary Registration
            </button>
          </form>
        </div>
      )}

      {/* Blood Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Request Emergency Blood</h3>
              <button onClick={() => setShowRequestModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateRequestSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Patient Identifier (Initials only for privacy)</label>
                <input
                  type="text"
                  required
                  value={reqInitials}
                  onChange={(e) => setReqInitials(e.target.value)}
                  placeholder="e.g. S. R. (ICU Bed 14)"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Blood Group Needed</label>
                  <select
                    value={reqGroup}
                    onChange={(e) => setReqGroup(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold"
                  >
                    {bloodGroups.filter(g => g !== 'All').map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Units Needed</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={reqUnits}
                    onChange={(e) => setReqUnits(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hospital Blood Bank Name *</label>
                <input
                  type="text"
                  required
                  value={reqHospital}
                  onChange={(e) => setReqHospital(e.target.value)}
                  placeholder="e.g. District Govt Hospital Blood Bank"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={reqCity}
                  onChange={(e) => setReqCity(e.target.value)}
                  placeholder="e.g. Guntur"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-[#DC2626] hover:bg-red-800 rounded-lg"
                >
                  Broadcast Urgent Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
