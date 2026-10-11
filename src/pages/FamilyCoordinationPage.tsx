import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  CheckSquare, 
  Plus, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  AlertTriangle,
  Lock,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';

export const FamilyCoordinationPage: React.FC = () => {
  const { 
    caregivers, 
    tasks, 
    addCaregiver, 
    revokeCaregiver, 
    addTask, 
    toggleTaskStatus, 
    showToast 
  } = useApp();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [revokingCaregiverId, setRevokingCaregiverId] = useState<string | null>(null);

  // Invite Caregiver Form state
  const [cgName, setCgName] = useState('');
  const [cgEmail, setCgEmail] = useState('');
  const [relationship, setRelationship] = useState<'Child' | 'Spouse' | 'Parent' | 'Relative' | 'Professional Nurse'>('Child');
  const [permMeds, setPermMeds] = useState(true);
  const [permRecords, setPermRecords] = useState(false);
  const [permAppts, setPermAppts] = useState(true);

  // New Shared Task Form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState<'Medicine Refill' | 'Doctor Follow-up' | 'Lab Test' | 'Diet Routine' | 'Care Coordination'>('Medicine Refill');
  const [taskAssignee, setTaskAssignee] = useState('Ravi Kumar');
  const [taskDueDate, setTaskDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cgName.trim() || !cgEmail.trim()) return;

    addCaregiver({
      patientId: 'usr-1',
      caregiverId: `usr-cg-${Date.now()}`,
      caregiverName: cgName.trim(),
      caregiverEmail: cgEmail.trim(),
      relationship,
      permissions: {
        canViewMedicines: permMeds,
        canUpdateMedicines: permMeds,
        canViewRecords: permRecords,
        canViewAppointments: permAppts
      },
      status: 'active',
      invitedAt: new Date().toISOString().split('T')[0]
    });

    setCgName('');
    setCgEmail('');
    setShowInviteModal(false);
  };

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    addTask({
      title: taskTitle.trim(),
      category: taskCategory,
      assignedToName: taskAssignee,
      dueDate: taskDueDate,
      isCompleted: false,
      createdBy: 'Priya (Patient)',
      updatedAtNote: `Created by Priya · Updated just now`
    });

    setTaskTitle('');
    setShowTaskModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Family & Caregiver Coordination
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Delegate elder care tasks and medicine refills with explicit, revocable permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTaskModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors min-h-[42px]"
          >
            <Plus className="w-4 h-4 text-[#0F766E]" />
            <span>Add Family Task</span>
          </button>

          <button
            type="button"
            onClick={() => setShowInviteModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-xl shadow-xs transition-colors min-h-[42px]"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Caregiver</span>
          </button>
        </div>
      </div>

      {/* Security Privacy Notice */}
      <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-start gap-3">
        <Lock className="w-5 h-5 text-[#0F766E] flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Granular Access Control:</strong> You hold full custody of your healthcare profile. When you invite a family member or nurse, you select exactly what they can see (Medicines, Appointments, or Records). You can revoke access in 1 click at any time.
        </div>
      </div>

      {/* Connected Caregivers Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#0F766E]" />
            <h2 className="text-lg font-bold text-slate-900">
              Active Authorized Caregivers ({caregivers.filter(c => c.status === 'active').length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {caregivers.map(cg => (
            <div key={cg.id} className={`p-4 rounded-xl border flex flex-col justify-between ${
              cg.status === 'active' ? 'bg-slate-50 border-slate-200' : 'bg-rose-50/50 border-rose-200'
            }`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E6F4F1] text-[#0F766E]">
                    {cg.relationship}
                  </span>
                  <span className={`text-[11px] font-bold ${cg.status === 'active' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {cg.status === 'active' ? 'Active Access' : 'Access Revoked'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mt-2">{cg.caregiverName}</h3>
                <p className="text-xs text-slate-500">{cg.caregiverEmail} • Invited: {cg.invitedAt}</p>

                {/* Permissions matrix */}
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  <span className={`px-2 py-0.5 rounded font-semibold ${cg.permissions.canViewMedicines ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-500'}`}>
                    {cg.permissions.canViewMedicines ? '✓ Medicines' : '✕ Medicines'}
                  </span>
                  <span className={`px-2 py-0.5 rounded font-semibold ${cg.permissions.canViewAppointments ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-500'}`}>
                    {cg.permissions.canViewAppointments ? '✓ Appointments' : '✕ Appointments'}
                  </span>
                  <span className={`px-2 py-0.5 rounded font-semibold ${cg.permissions.canViewRecords ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-500'}`}>
                    {cg.permissions.canViewRecords ? '✓ Medical Records' : '✕ Records Private'}
                  </span>
                </div>
              </div>

              {cg.status === 'active' && (
                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setRevokingCaregiverId(cg.id)}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 py-1 px-2 rounded hover:bg-rose-50 transition-colors"
                  >
                    Revoke Access Immediately
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Shared Family Tasks Board */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-[#0F766E]" />
            <h2 className="text-lg font-bold text-slate-900">
              Shared Family Healthcare Task Board ({tasks.length})
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                task.isCompleted ? 'bg-slate-50/70 border-slate-200 opacity-75' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => toggleTaskStatus(task.id)}
                  className="mt-1 w-4 h-4 text-[#0F766E] rounded cursor-pointer"
                />
                <div>
                  <h4 className={`text-sm font-bold ${task.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {task.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded">
                      {task.category}
                    </span>
                    <span>Assigned to: <strong>{task.assignedToName}</strong></span>
                    <span>Due: <strong>{task.dueDate}</strong></span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {task.updatedAtNote}
                  </div>
                </div>
              </div>

              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full self-start sm:self-auto ${
                task.isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {task.isCompleted ? 'Completed ✓' : 'In Progress'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Caregiver Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Invite Family Member or Caregiver</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleInviteSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Caregiver Full Name *</label>
                <input
                  type="text"
                  required
                  value={cgName}
                  onChange={(e) => setCgName(e.target.value)}
                  placeholder="e.g. Ravi Kumar"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={cgEmail}
                  onChange={(e) => setCgEmail(e.target.value)}
                  placeholder="e.g. ravi.kumar@example.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Relationship</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold"
                >
                  <option value="Child">Child (Son / Daughter)</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Relative">Relative</option>
                  <option value="Professional Nurse">Professional Nurse / Attendant</option>
                </select>
              </div>

              <div className="pt-2">
                <span className="block font-bold text-slate-700 mb-1.5">Granular Permissions Granted:</span>
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permMeds}
                      onChange={(e) => setPermMeds(e.target.checked)}
                      className="w-4 h-4 text-[#0F766E] rounded"
                    />
                    <span>Can view and update daily medication logs</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permAppts}
                      onChange={(e) => setPermAppts(e.target.checked)}
                      className="w-4 h-4 text-[#0F766E] rounded"
                    />
                    <span>Can view and manage doctor appointments</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permRecords}
                      onChange={(e) => setPermRecords(e.target.checked)}
                      className="w-4 h-4 text-[#0F766E] rounded"
                    />
                    <span>Can view private medical prescriptions and lab reports</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-lg"
                >
                  Send Access Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Create Shared Family Task</h3>
              <button onClick={() => setShowTaskModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateTaskSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Refill blood pressure tablets at Jan Aushadhi"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={taskCategory}
                  onChange={(e) => setTaskCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-semibold"
                >
                  <option value="Medicine Refill">Medicine Refill</option>
                  <option value="Doctor Follow-up">Doctor Follow-up</option>
                  <option value="Lab Test">Lab Test</option>
                  <option value="Diet Routine">Diet Routine</option>
                  <option value="Care Coordination">Care Coordination</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assign To</label>
                  <input
                    type="text"
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value)}
                    placeholder="e.g. Ravi Kumar"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-lg"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Revocation Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!revokingCaregiverId}
        title="Revoke Caregiver Permissions"
        message="Are you sure you want to revoke this caregiver's access? They will immediately lose access to view your medications, appointments, and medical documents."
        confirmLabel="Revoke Access Immediately"
        isDangerous={true}
        onConfirm={() => {
          if (revokingCaregiverId) {
            revokeCaregiver(revokingCaregiverId);
            setRevokingCaregiverId(null);
          }
        }}
        onCancel={() => setRevokingCaregiverId(null)}
      />
    </div>
  );
};
