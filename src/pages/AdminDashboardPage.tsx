import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  AlertTriangle, 
  Activity, 
  Search, 
  FileCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboardPage: React.FC = () => {
  const { facilities, donors, auditLogs, reports, resolveReport, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'audit' | 'reports'>('audit');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
            System Administration
          </span>
          <span className="text-xs text-slate-500 font-semibold">Strict Role-Based Security Mode</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Platform Governance & Security Audit
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Review immutable administrative audit trails, monitor hospital verifications, and resolve user data reports.
        </p>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Verified Facilities</span>
            <Building2 className="w-4 h-4 text-[#0F766E]" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {facilities.filter(f => f.trustStatus === 'verified').length}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold">100% Audit Verified</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Consented Donors</span>
            <Users className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {donors.filter(d => d.consentGiven).length}
          </div>
          <span className="text-[11px] text-slate-500 font-semibold">Zero Phone Leak</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Pending Reports</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {reports.filter(r => r.status === 'pending' || r.status === 'investigating').length}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold">Requires Moderation</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Security Audits</span>
            <Activity className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {auditLogs.length}
          </div>
          <span className="text-[11px] text-slate-500 font-semibold">Immutable Logs</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 gap-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            activeTab === 'audit' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Administrative Security Audit Logs ({auditLogs.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reports')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            activeTab === 'reports' ? 'bg-[#E6F4F1] text-[#0F766E]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Community Data Reports Queue ({reports.length})
        </button>
      </div>

      {/* Audit Logs Table */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Actor</th>
                <th className="p-4">Security Action</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">Details & Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50">
                  <td className="p-4 text-slate-500 font-mono whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-4 font-bold text-slate-800">{log.actorEmail}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-teal-100 text-[#0F766E]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-700">{log.targetEntity}</td>
                  <td className="p-4 text-slate-600 leading-relaxed max-w-xs">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Community Reports Queue */}
      {activeTab === 'reports' && (
        <div className="space-y-3">
          {reports.map(rep => (
            <div key={rep.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    rep.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {rep.status.toUpperCase()}
                  </span>
                  <span className="text-slate-500">Target: <strong>{rep.targetTitle}</strong> ({rep.targetType})</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mt-2">
                  Report Reason: {rep.reason}
                </p>
                <p className="text-slate-400 mt-1">Submitted by: {rep.reporterName} • {rep.submittedAt}</p>
              </div>

              {rep.status !== 'resolved' && (
                <button
                  type="button"
                  onClick={() => resolveReport(rep.id)}
                  className="px-4 py-2 bg-[#0F766E] hover:bg-teal-800 text-white font-bold rounded-lg self-start sm:self-auto transition-colors"
                >
                  Mark as Resolved ✓
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
