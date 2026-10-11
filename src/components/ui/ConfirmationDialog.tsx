import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm Action',
  cancelLabel = 'Cancel',
  isDangerous = false,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDangerous ? 'bg-rose-100 text-rose-600' : 'bg-teal-100 text-teal-800'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 id="dialog-title" className="text-lg font-bold text-slate-900">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          {message}
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg min-h-[44px] transition-colors"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-semibold text-white rounded-lg min-h-[44px] transition-colors ${
              isDangerous 
                ? 'bg-[#DC2626] hover:bg-red-800 shadow-xs' 
                : 'bg-[#0F766E] hover:bg-teal-800'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
