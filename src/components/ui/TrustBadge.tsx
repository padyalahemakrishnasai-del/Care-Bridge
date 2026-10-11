import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, Clock, ShieldCheck } from 'lucide-react';
import { TrustStatus } from '../../types';

interface TrustBadgeProps {
  status: TrustStatus;
  date?: string;
  source?: string;
  showTooltip?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ 
  status, 
  date, 
  source,
  showTooltip = true 
}) => {
  let badgeStyle = '';
  let icon = null;
  let label = '';
  let tooltip = '';

  switch (status) {
    case 'verified':
      badgeStyle = 'bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]';
      icon = <ShieldCheck className="w-3.5 h-3.5 mr-1" />;
      label = date ? `Verified on ${date}` : 'Verified Source';
      tooltip = source ? `Officially confirmed from: ${source}` : 'Confirmed by official authorities or verified clinic tariff records.';
      break;

    case 'estimated':
      badgeStyle = 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]';
      icon = <AlertTriangle className="w-3.5 h-3.5 mr-1" />;
      label = 'Estimated Price / Details';
      tooltip = 'Estimated charge based on average historical records. Final bill at facility may vary depending on patient condition.';
      break;

    case 'user_submitted':
      badgeStyle = 'bg-amber-50 text-amber-800 border border-amber-200';
      icon = <Clock className="w-3.5 h-3.5 mr-1" />;
      label = date ? `User Reported (${date})` : 'User Submitted';
      tooltip = 'Submitted by patient community. Official verification pending by administrative review board.';
      break;

    case 'unavailable':
    default:
      badgeStyle = 'bg-slate-100 text-slate-600 border border-slate-200';
      icon = <HelpCircle className="w-3.5 h-3.5 mr-1" />;
      label = 'Data Not Available';
      tooltip = 'Information has not yet been confirmed by this healthcare facility.';
      break;
  }

  return (
    <div className="relative group inline-flex items-center">
      <span 
        tabIndex={0}
        aria-label={`${label}. ${tooltip}`}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-help select-none ${badgeStyle}`}
      >
        {icon}
        <span>{label}</span>
      </span>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex group-focus-within:flex flex-col z-50 w-64 p-2 text-xs text-white bg-slate-900 rounded-lg shadow-xl pointer-events-none transition-all">
          <span className="font-semibold text-slate-200">{label}</span>
          <span className="text-slate-300 mt-0.5 leading-relaxed">{tooltip}</span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
};
