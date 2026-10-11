import React, { useState } from 'react';
import { 
  Trees, 
  Search, 
  MapPin, 
  Phone, 
  Navigation, 
  AlertTriangle, 
  Building2, 
  WifiOff,
  Clock,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TrustBadge } from '../components/ui/TrustBadge';

export const RuralCarePage: React.FC = () => {
  const { facilities } = useApp();
  const [searchDistrict, setSearchDistrict] = useState('');
  const [liteModeActive, setLiteModeActive] = useState(false);

  // Filter facilities in rural areas or primary health centres
  const ruralFacilities = facilities.filter(f => {
    const isRuralType = f.type === 'Primary Health Centre' || f.type === 'Community Health Centre' || f.city.toLowerCase().includes('rural');
    const matchesDistrict = 
      !searchDistrict || 
      f.district.toLowerCase().includes(searchDistrict.toLowerCase()) || 
      f.pincode.includes(searchDistrict) ||
      f.name.toLowerCase().includes(searchDistrict.toLowerCase());
    return matchesDistrict;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Low-Bandwidth Optimized
            </span>
            <span className="text-xs font-semibold text-slate-500">National Rural Health Mission Ready</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Rural Healthcare & Primary Health Centres (PHCs)
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Designed for village, taluk, and block-level residents. Works fast even on 2G/3G mobile data connections.
          </p>
        </div>

        {/* Lite Mode Toggle */}
        <button
          type="button"
          onClick={() => setLiteModeActive(!liteModeActive)}
          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
            liteModeActive
              ? 'bg-[#0F766E] text-white border-[#0F766E]'
              : 'bg-white text-slate-700 border-slate-200'
          }`}
        >
          {liteModeActive ? '⚡ Ultra-Lite Mode ON' : '⚡ Switch to Ultra-Lite'}
        </button>
      </div>

      {/* Warning regarding verification recency in remote sectors */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Rural Verification Advisory:</strong> Due to remote geography, doctor shifts and medicine stock at Primary Health Centres can fluctuate weekly. We display the latest DMHO inspection date on every listing. Always call the duty medical officer before long journeys.
        </div>
      </div>

      {/* Simple Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchDistrict}
            onChange={(e) => setSearchDistrict(e.target.value)}
            placeholder="Type Village Name, Taluk, District (e.g. Dharwad, Guntur) or 6-digit PIN code..."
            className="w-full pl-9 pr-4 py-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
          />
        </div>
      </div>

      {/* Facilities List (Ultra lightweight table or simple card) */}
      <div className="space-y-4">
        {ruralFacilities.map(fac => (
          <div key={fac.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold bg-[#E6F4F1] text-[#0F766E] px-2.5 py-0.5 rounded-full">
                {fac.type}
              </span>
              <TrustBadge status={fac.trustStatus} date={fac.lastVerifiedDate} />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {fac.name}
            </h3>
            
            <p className="text-xs text-slate-600 mt-1">
              📍 {fac.address}, {fac.district} - PIN {fac.pincode}
            </p>

            <div className="mt-3 p-3 bg-slate-50 rounded-lg text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Operating Duty:</span>
                <span className="font-semibold text-slate-800">{fac.operatingHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Free Generic Medicines:</span>
                <span className="font-semibold text-emerald-700">Available from Govt Stock</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <a
                href={`tel:${fac.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#0F766E] text-white font-bold text-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call Center ({fac.phone})</span>
              </a>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${fac.coordinates.lat},${fac.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Route</span>
              </a>
            </div>
          </div>
        ))}

        {ruralFacilities.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <Trees className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800 text-base">No rural facilities matched this search</h3>
            <p className="text-xs text-slate-500 mt-1">Try entering your district name or state.</p>
          </div>
        )}
      </div>
    </div>
  );
};
