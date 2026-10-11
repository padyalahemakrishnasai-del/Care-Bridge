import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useApp } from '../context/AppContext';

export const CompleteProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, showToast } = useApp();

  const [emergencyContactName, setEmergencyContactName] = useState(currentUser.emergencyContactName || '');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(currentUser.emergencyContactPhone || '');
  const [bloodGroup, setBloodGroup] = useState(currentUser.bloodGroup || 'O+');
  const [pincode, setPincode] = useState(currentUser.pincode || '522001');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      emergencyContactName: emergencyContactName.trim(),
      emergencyContactPhone: emergencyContactPhone.trim(),
      bloodGroup,
      pincode: pincode.trim(),
    });
    showToast('Profile setup complete! Welcome to CareBridge.');
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      heading="Complete Your Health Profile."
      subtitle="Help us personalize nearby hospital discovery and set up your emergency contact for 1-tap dialer assistance."
    >
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Final Step: Essential Details
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            These details help display nearby emergency facilities and enable blood donor compatibility.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs"
              >
                {bloodGroups.map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Your 6-Digit PIN Code *</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 522001"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs font-medium"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-3">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-[#0F766E]">
              <Heart className="w-4 h-4 text-[#0F766E]" />
              Emergency Contact (Used for 112 Location SOS)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Contact Full Name</label>
                <input
                  type="text"
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  placeholder="e.g. Ravi Kumar (Son)"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Contact Phone Number</label>
                <input
                  type="tel"
                  value={emergencyContactPhone}
                  onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  placeholder="+91 98480 98765"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0F766E] hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 min-h-[46px]"
          >
            <span>Finish & Go to My Health Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};
