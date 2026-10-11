import React, { useState } from 'react';
import { 
  FolderLock, 
  Upload, 
  FileText, 
  Lock, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Plus,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DocumentCard } from '../components/ui/DocumentCard';
import { MedicalDocument, DocumentCategory } from '../types';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';

export const MedicalRecordsPage: React.FC = () => {
  const { documents, addDocument, deleteDocument, showToast } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<MedicalDocument | null>(null);
  const [deleteDocId, setDeleteDocId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DocumentCategory>('Prescription');
  const [doctorName, setDoctorName] = useState('');
  const [recordDate, setRecordDate] = useState(new Date().toISOString().split('T')[0]);
  const [tagsInput, setTagsInput] = useState('');

  const categories: string[] = ['All', 'Prescription', 'Lab Report', 'Discharge Summary', 'Vaccination'];

  const filteredDocs = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.doctorName && doc.doctorName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addDocument({
      userId: 'usr-1',
      title: title.trim(),
      category,
      recordDate,
      doctorName: doctorName.trim() || undefined,
      fileType: 'pdf',
      fileSizeMb: 1.5,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      isPrivate: true,
      sharedWithCaregiverIds: [],
      mockDataSummary: 'Uploaded test document in encrypted vault.'
    });

    setTitle('');
    setDoctorName('');
    setTagsInput('');
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Medical Records Vault
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Organize prescriptions, lab reports, and vaccination certificates in a zero-leak encrypted vault.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-xl shadow-xs transition-colors min-h-[42px]"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Security Privacy Notice */}
      <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-900 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#0F766E] flex-shrink-0" />
          <span>
            <strong>Private Storage:</strong> Documents are private to you. Only authorized caregivers whom you explicitly designate can access these records.
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by report name, doctor, or tag (#diabetes, #cbc)..."
              className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex overflow-x-auto gap-1">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#0F766E] text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onView={(d) => setViewingDoc(d)}
            onDownload={(d) => showToast(`Downloaded "${d.title}" securely.`)}
            onDelete={(id) => setDeleteDocId(id)}
            onShare={(d) => showToast(`Access link granted to authorized caregiver for "${d.title}".`)}
          />
        ))}

        {filteredDocs.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-10 text-center border border-slate-200">
            <FolderLock className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800 text-base">No documents found</h3>
            <p className="text-xs text-slate-500 mt-1">Upload prescriptions or lab reports to build your organized vault.</p>
          </div>
        )}
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Upload Medical Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Apollo Diabetes Review Rx, Thyrocare Blood Test"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Document Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                >
                  <option value="Prescription">Prescription</option>
                  <option value="Lab Report">Lab Report</option>
                  <option value="Discharge Summary">Discharge Summary</option>
                  <option value="Vaccination">Vaccination</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Doctor or Lab Name</label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="e.g. Dr. S. K. Sharma"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. diabetes, blood test, bp"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-lg"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">{viewingDoc.title}</h3>
              <button onClick={() => setViewingDoc(null)} className="text-slate-400 font-bold">✕</button>
            </div>
            <div className="py-4 space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono">
                {viewingDoc.mockDataSummary || 'Encrypted clinical record content preview.'}
              </div>
              <div className="text-xs text-slate-500">
                Category: <strong>{viewingDoc.category}</strong> • Date: <strong>{viewingDoc.recordDate}</strong>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="px-4 py-2 bg-[#0F766E] text-white text-xs font-bold rounded-lg"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!deleteDocId}
        title="Permanently Delete Medical Record"
        message="Are you sure you want to delete this document from your private vault? This action cannot be undone."
        confirmLabel="Delete Record"
        isDangerous={true}
        onConfirm={() => {
          if (deleteDocId) {
            deleteDocument(deleteDocId);
            setDeleteDocId(null);
          }
        }}
        onCancel={() => setDeleteDocId(null)}
      />
    </div>
  );
};
