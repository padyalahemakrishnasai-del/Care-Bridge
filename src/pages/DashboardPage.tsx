import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Pill, 
  Calendar, 
  AlertCircle, 
  Search, 
  FileText, 
  ShieldAlert, 
  Users, 
  ArrowRight, 
  Check, 
  Plus,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ReminderTile } from '../components/ui/ReminderTile';

export const DashboardPage: React.FC = () => {
  const { 
    currentUser, 
    medications, 
    appointments, 
    tasks, 
    caregivers,
    updateMedicationStatus 
  } = useApp();

  // Medications due today
  const pendingMeds = medications.filter(m => m.statusToday === 'pending');
  const takenMeds = medications.filter(m => m.statusToday === 'taken');

  // Next upcoming appointment
  const nextAppointment = appointments[0];

  // Incomplete tasks
  const pendingTasks = tasks.filter(t => !t.isCompleted);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Greeting Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider block">
            Personal Health Desk
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Good morning, {currentUser.name}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Role: <span className="font-semibold capitalize text-teal-800">{currentUser.role.replace('_', ' ')}</span> • PIN: {currentUser.pincode} • Blood Group: {currentUser.bloodGroup || 'O+'}
          </p>
        </div>

        {/* 4 Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/facilities"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0F766E] bg-[#E6F4F1] hover:bg-teal-100 rounded-xl transition-colors min-h-[42px]"
          >
            <Search className="w-4 h-4" />
            <span>Find Hospital</span>
          </Link>

          <Link
            to="/medications"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-xl shadow-xs transition-colors min-h-[42px]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medicine</span>
          </Link>

          <Link
            to="/records"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors min-h-[42px]"
          >
            <FileText className="w-4 h-4" />
            <span>Upload Record</span>
          </Link>

          <Link
            to="/emergency"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#DC2626] hover:bg-red-800 rounded-xl shadow-xs transition-colors min-h-[42px]"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Emergency</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Today's Medicines & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Today's Medication Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-[#0F766E]" />
              <h2 className="text-xl font-bold text-slate-900">
                Today's Medicines Schedule
              </h2>
            </div>
            <Link 
              to="/medications" 
              className="text-xs font-bold text-[#0F766E] hover:underline flex items-center gap-1"
            >
              <span>Manage all ({medications.length})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {medications.map(med => (
              <ReminderTile
                key={med.id}
                medication={med}
                onTake={(id) => updateMedicationStatus(id, 'taken')}
                onSkip={(id) => updateMedicationStatus(id, 'skipped')}
                onMiss={(id) => updateMedicationStatus(id, 'missed')}
              />
            ))}
          </div>

          <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 text-xs text-slate-600 flex items-center justify-between">
            <span>Dose progress today: <strong>{takenMeds.length} of {medications.length} taken</strong></span>
            <span className="font-semibold text-teal-800">
              {Math.round((takenMeds.length / (medications.length || 1)) * 100)}% Adherence
            </span>
          </div>
        </div>

        {/* Right Column: Next Appointment & Shared Tasks */}
        <div className="space-y-6">
          
          {/* Upcoming Appointment Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0F766E]" />
                <h3 className="font-bold text-slate-900 text-base">Next Doctor Visit</h3>
              </div>
              <Link to="/appointments" className="text-xs font-bold text-[#0F766E] hover:underline">
                View all
              </Link>
            </div>

            {nextAppointment ? (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    nextAppointment.status === 'confirmed_by_provider'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {nextAppointment.status === 'confirmed_by_provider' ? 'Confirmed by Clinic' : 'Planned by Patient'}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    {nextAppointment.appointmentDate}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">
                  {nextAppointment.doctorOrFacilityName}
                </h4>
                <p className="text-xs text-slate-600">
                  {nextAppointment.specialty} • {nextAppointment.appointmentTime}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {nextAppointment.location}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3">No upcoming appointments scheduled.</p>
            )}
          </div>

          {/* Shared Family Tasks Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0F766E]" />
                <h3 className="font-bold text-slate-900 text-base">Family Care Coordination</h3>
              </div>
              <Link to="/family" className="text-xs font-bold text-[#0F766E] hover:underline">
                Board
              </Link>
            </div>

            <div className="space-y-2.5">
              {pendingTasks.slice(0, 3).map(task => (
                <div key={task.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-slate-900 leading-snug">
                      {task.title}
                    </span>
                    <span className="text-[10px] font-bold bg-teal-50 text-[#0F766E] px-2 py-0.5 rounded-full flex-shrink-0">
                      {task.category}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Assigned: <strong>{task.assignedToName}</strong></span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400">
                    {task.updatedAtNote}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>Connected Caregivers: <strong>{caregivers.filter(c => c.status === 'active').length}</strong></span>
              <Link to="/family" className="font-bold text-[#0F766E] hover:underline">
                + Invite Caregiver
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
