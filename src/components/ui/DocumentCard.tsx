import React from 'react';
import { FileText, Download, Eye, Trash2, Lock, Share2 } from 'lucide-react';
import { MedicalDocument } from '../../types';

interface DocumentCardProps {
  document: MedicalDocument;
  onView: (doc: MedicalDocument) => void;
  onDownload: (doc: MedicalDocument) => void;
  onDelete: (id: string) => void;
  onShare?: (doc: MedicalDocument) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onView,
  onDownload,
  onDelete,
  onShare
}) => {
  const getCategoryColor = (cat: MedicalDocument['category']) => {
    switch (cat) {
      case 'Prescription': return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Lab Report': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Discharge Summary': return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Vaccination': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryColor(document.category)}`}>
            {document.category}
          </span>
          <span className="flex items-center text-xs text-slate-500 font-medium gap-1">
            <Lock className="w-3 h-3 text-teal-600" />
            Private Vault
          </span>
        </div>

        <div className="flex items-start gap-3 mt-3">
          <div className="w-10 h-10 rounded-lg bg-[#E6F4F1] flex items-center justify-center flex-shrink-0 text-[#0F766E]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base leading-snug">
              {document.title}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Recorded: {document.recordDate} • {document.fileSizeMb} MB ({document.fileType.toUpperCase()})
            </p>
            {document.doctorName && (
              <p className="text-xs text-slate-600 mt-1">
                Doctor: <span className="font-medium">{document.doctorName}</span>
              </p>
            )}
          </div>
        </div>

        {document.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {document.tags.map((tag, idx) => (
              <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onView(document)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-teal-900 py-1.5 px-2 rounded hover:bg-[#E6F4F1] transition-colors"
          aria-label={`View ${document.title}`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </button>

        <button
          type="button"
          onClick={() => onDownload(document)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 py-1.5 px-2 rounded hover:bg-slate-100 transition-colors"
          aria-label={`Download ${document.title}`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>

        {onShare && (
          <button
            type="button"
            onClick={() => onShare(document)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 py-1.5 px-2 rounded hover:bg-slate-100 transition-colors"
            aria-label={`Share ${document.title} with caregiver`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(document.id)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 py-1.5 px-2 rounded hover:bg-rose-50 transition-colors"
          aria-label={`Delete ${document.title}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
