import React from 'react';
import { Check, X, Clock, AlertTriangle } from 'lucide-react';
import { MedicationReminder } from '../../types';

interface ReminderTileProps {
  medication: MedicationReminder;
  onTake: (id: string) => void;
  onSkip: (id: string) => void;
  onMiss: (id: string) => void;
}

export const ReminderTile: React.FC<ReminderTileProps> = ({
  medication,
  onTake,
  onSkip,
  onMiss
}) => {
  const isTaken = medication.statusToday === 'taken';
  const isSkipped = medication.statusToday === 'skipped';
  const isMissed = medication.statusToday === 'missed';

  return (
    <div className={`p-5 rounded-xl border transition-all ${
      isTaken 
        ? 'bg-emerald-50/60 border-emerald-200' 
        : isSkipped
        ? 'bg-amber-50/50 border-amber-200'
        : isMissed
        ? 'bg-rose-50/50 border-rose-200'
        : 'bg-white border-slate-200 shadow-xs'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {medication.scheduleTime}
            </span>

            {isTaken && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Taken today
              </span>
            )}
            {isSkipped && (
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Skipped by patient
              </span>
            )}
            {isMissed && (
              <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                Missed dose
              </span>
            )}
          </div>

          <h4 className="text-lg font-bold text-slate-900 mt-2">
            {medication.medicineName}
          </h4>
          <p className="text-sm font-medium text-slate-700">
            Dose: {medication.dosage}
          </p>

          <p className="text-xs text-slate-600 mt-1.5 bg-white/80 p-2 rounded-lg border border-slate-100 leading-relaxed">
            <span className="font-semibold text-slate-800">Doctor's instructions: </span>
            {medication.instructions}
          </p>
        </div>

        {/* Accessible Action Buttons & Alarm Trigger */}
        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              // Play a gentle audible chime using Web Audio API (cross-browser compatible)
              try {
                const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 tone
                osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5 tone
                gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.5);
              } catch (e) {
                // AudioContext fallback
              }

              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(`⏰ Medication Alarm: ${medication.medicineName}`, {
                  body: `Time: ${medication.scheduleTime} • Dose: ${medication.dosage}\nInstructions: ${medication.instructions}`,
                  icon: '/vite.svg',
                });
              } else {
                alert(`⏰ Medication Alarm Ringing!\n\nMedicine: ${medication.medicineName}\nDose: ${medication.dosage}\nTime: ${medication.scheduleTime}\n\n${medication.instructions}`);
              }
            }}
            className="flex items-center gap-1 px-2.5 py-2.5 rounded-lg text-xs font-bold bg-teal-100/80 text-teal-900 hover:bg-teal-200 transition-colors border border-teal-200 min-h-[46px]"
            title="Ring / Test Alarm for this dose"
            aria-label={`Test alarm chime for ${medication.medicineName}`}
          >
            <span>⏰ Ring Alarm</span>
          </button>

          <button
            type="button"
            onClick={() => onTake(medication.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all min-h-[46px] min-w-[90px] justify-center ${
              isTaken
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
            aria-label={`Mark ${medication.medicineName} as taken`}
          >
            <Check className="w-4 h-4" />
            <span>Taken ✓</span>
          </button>

          <button
            type="button"
            onClick={() => onSkip(medication.id)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all min-h-[46px] ${
              isSkipped
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
            aria-label={`Mark ${medication.medicineName} as skipped`}
          >
            <Clock className="w-4 h-4" />
            <span>Skipped</span>
          </button>

          <button
            type="button"
            onClick={() => onMiss(medication.id)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all min-h-[46px] ${
              isMissed
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
            }`}
            aria-label={`Mark ${medication.medicineName} as missed`}
          >
            <X className="w-4 h-4" />
            <span>Missed</span>
          </button>
        </div>
      </div>
    </div>
  );
};
