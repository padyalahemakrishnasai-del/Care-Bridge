import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  MapPin, 
  Phone, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Appointment } from '../types';

export const AppointmentsPage: React.FC = () => {
  const { appointments, addAppointment, showToast } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00 AM');
  const [location, setLocation] = useState('');
  const [purpose, setPurpose] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isConfirmedByClinic, setIsConfirmedByClinic] = useState(false);

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorName.trim()) return;

    addAppointment({
      userId: 'usr-1',
      doctorOrFacilityName: doctorName.trim(),
      specialty: specialty.trim() || 'General Medicine',
      appointmentDate: date,
      appointmentTime: time,
      location: location.trim() || 'Clinic OPD',
      purpose: purpose.trim() || 'Regular consultation',
      status: isConfirmedByClinic ? 'confirmed_by_provider' : 'planned',
      contactPhone: contactPhone.trim() || '+91 863 2224000'
    });

    setDoctorName('');
    setSpecialty('');
    setLocation('');
    setPurpose('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Appointments & Follow-up Organizer
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Organize upcoming consultations and diagnostic clinic tokens. Distinguish patient plans from clinic confirmations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-xl shadow-xs transition-colors min-h-[42px]"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Visit</span>
        </button>
      </div>

      {/* Appointment Confirmation Standard Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Data Honesty Standard:</strong> CareBridge never labels an appointment as "Confirmed" unless verified by the hospital or doctor's reception desk. Self-entered calendar entries are clearly badged as "Planned by Patient".
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map(apt => (
          <div key={apt.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  apt.status === 'confirmed_by_provider'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {apt.status === 'confirmed_by_provider' ? '✓ Confirmed by Clinic' : 'Planned by Patient'}
                </span>

                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4 text-[#0F766E]" />
                  {apt.appointmentDate} at {apt.appointmentTime}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                {apt.doctorOrFacilityName}
              </h3>
              
              <p className="text-xs font-semibold text-[#0F766E] mt-0.5">
                Specialty: {apt.specialty}
              </p>

              <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-800">Purpose / Instructions: </span>
                {apt.purpose} {apt.notes && `(${apt.notes})`}
              </p>

              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {apt.location}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`tel:${apt.contactPhone}`}
                className="text-xs font-bold text-[#0F766E] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Clinic Reception ({apt.contactPhone})</span>
              </a>

              <span className="text-[11px] text-slate-400">
                ID: {apt.id}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add Doctor Visit / Appointment</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateAppointment} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor / Clinic Name *</label>
                <input
                  type="text"
                  required
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="e.g. Dr. S. K. Sharma (Diabetologist)"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specialty</label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="e.g. Cardiology, Eye Care"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 10:30 AM"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location / Clinic Room</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. District General Hospital, Room 14"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Visit Purpose / Notes</label>
                <textarea
                  rows={2}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Quarterly fasting blood sugar review, carry previous ECG"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isConfirmedByClinic}
                    onChange={(e) => setIsConfirmedByClinic(e.target.checked)}
                    className="w-4 h-4 text-[#0F766E] rounded"
                  />
                  <span className="font-semibold text-slate-700">Already confirmed token with clinic reception</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-lg"
                >
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
