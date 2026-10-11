import React, { useState } from 'react';
import { 
  Plus, 
  Pill, 
  Calendar, 
  Bell, 
  Check, 
  Clock, 
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ReminderTile } from '../components/ui/ReminderTile';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';

export const MedicationsPage: React.FC = () => {
  const { 
    medications, 
    addMedication, 
    updateMedicationStatus, 
    deleteMedication,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'all'>('today');
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // New medication form fields
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [scheduleTime, setScheduleTime] = useState('08:00 AM');
  const [frequency, setFrequency] = useState<'daily' | 'twice_daily' | 'thrice_daily' | 'weekly'>('daily');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const handleCreateMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addMedication({
      userId: 'usr-1',
      medicineName: name.trim(),
      dosage: dosage.trim() || 'As directed',
      instructions: instructions.trim() || 'Take exactly as prescribed by your doctor.',
      scheduleTime,
      frequency,
      startDate,
      statusToday: 'pending'
    });

    // Reset form
    setName('');
    setDosage('');
    setInstructions('');
    setShowAddModal(false);
  };

  const handleRequestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showToast('Browser notification permission enabled for medication reminders!');
        } else {
          showToast('Notification permission was not granted. In-app alerts remain active.');
        }
      });
    } else {
      showToast('Notifications are not supported by this browser. In-app schedule is active.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Medication Reminders
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Track daily prescription doses strictly as directed by your clinician. CareBridge never modifies doctor prescriptions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRequestNotificationPermission}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors min-h-[42px]"
          >
            <Bell className="w-4 h-4 text-teal-600" />
            <span>Enable Browser Alerts</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-xl shadow-xs transition-colors min-h-[42px]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Medicine</span>
          </button>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('today')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'today' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Today's Doses ({medications.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'upcoming' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pending Only ({medications.filter(m => m.statusToday === 'pending').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'all' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Prescriptions ({medications.length})
        </button>
      </div>

      {/* Medication List */}
      <div className="space-y-3">
        {medications
          .filter(m => activeTab === 'all' || (activeTab === 'upcoming' ? m.statusToday === 'pending' : true))
          .map(med => (
            <div key={med.id} className="relative group">
              <ReminderTile
                medication={med}
                onTake={(id) => updateMedicationStatus(id, 'taken')}
                onSkip={(id) => updateMedicationStatus(id, 'skipped')}
                onMiss={(id) => updateMedicationStatus(id, 'missed')}
              />
              <button
                type="button"
                onClick={() => setDeleteTargetId(med.id)}
                className="absolute top-3 right-3 p-1.5 text-slate-300 hover:text-rose-600 transition-colors"
                title="Remove Reminder"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

        {medications.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <Pill className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800 text-base">No medication reminders active</h3>
            <p className="text-xs text-slate-500 mt-1">Add your daily medicines to keep track of dosages easily.</p>
          </div>
        )}
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add Medication Reminder</h3>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMedication} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Metformin 500mg, Telmisartan 40mg"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dosage Quantity
                </label>
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g. 1 tablet, 5 ml syrup"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Doctor's Instructions
                </label>
                <textarea
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Enter instructions exactly as provided by your clinician (e.g. after lunch with water)"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Scheduled Time
                  </label>
                  <input
                    type="text"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    placeholder="e.g. 08:30 AM"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]"
                  >
                    <option value="daily">Daily</option>
                    <option value="twice_daily">Twice Daily</option>
                    <option value="thrice_daily">Thrice Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Medical Safety Notice:</strong> CareBridge does not prescribe or recommend dosage adjustments. Only enter medicines currently prescribed by your doctor.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-lg"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!deleteTargetId}
        title="Remove Medication Reminder"
        message="Are you sure you want to delete this medication schedule? You will no longer receive daily alerts for this dose."
        confirmLabel="Delete Reminder"
        isDangerous={true}
        onConfirm={() => {
          if (deleteTargetId) {
            deleteMedication(deleteTargetId);
            setDeleteTargetId(null);
          }
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
