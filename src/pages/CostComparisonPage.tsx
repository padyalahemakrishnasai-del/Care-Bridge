import React, { useState } from 'react';
import { 
  DollarSign, 
  Search, 
  Filter, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Building2,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HealthcareFacility } from '../types';

export const CostComparisonPage: React.FC = () => {
  const { facilities } = useApp();
  const [selectedService, setSelectedService] = useState('OPD Consultation');
  const [maxBudget, setMaxBudget] = useState(6000);
  const [selectedFacilityIds, setSelectedFacilityIds] = useState<string[]>([
    facilities[0]?.id, 
    facilities[1]?.id
  ]);

  const allAvailableServices = [
    'OPD Consultation',
    'Complete Blood Count (CBC)',
    'Cardiac 2D Echo Test',
    'HbA1c Glycated Hemoglobin Test',
    'Brain MRI Plain',
    'ICU Day Stay (Standard Bed)'
  ];

  const handleToggleFacilitySelection = (id: string) => {
    if (selectedFacilityIds.includes(id)) {
      if (selectedFacilityIds.length > 1) {
        setSelectedFacilityIds(selectedFacilityIds.filter(fId => fId !== id));
      }
    } else {
      if (selectedFacilityIds.length < 3) {
        setSelectedFacilityIds([...selectedFacilityIds, id]);
      }
    }
  };

  const comparedFacilities = facilities.filter(f => selectedFacilityIds.includes(f.id));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Healthcare Cost Transparency & Comparison
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Compare published rates, inclusions, and estimates across facilities. Never face hidden surprise bills.
        </p>
      </div>

      {/* Transparency Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Tariff Disclaimer: </span>
          Listed prices reflect official published hospital rate cards or certified government schemes. Final billed amounts may differ depending on clinical complexity, emergency triage, prescription medications, and room categories.
        </div>
      </div>

      {/* Controls & Filter Panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Service Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Select Medical Procedure or Consultation
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
            >
              {allAvailableServices.map(srv => (
                <option key={srv} value={srv}>{srv}</option>
              ))}
            </select>
          </div>

          {/* Budget Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Budget Cap Filter</span>
              <span className="text-[#0F766E]">Max ₹{maxBudget.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="250"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-[#0F766E] cursor-pointer"
            />
          </div>
        </div>

        {/* Facility Selector Checkboxes (Select up to 3) */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-700 block mb-2">
            Select Up to 3 Facilities to Compare Side-by-Side:
          </span>
          <div className="flex flex-wrap gap-2">
            {facilities.map(fac => {
              const isSelected = selectedFacilityIds.includes(fac.id);
              return (
                <button
                  key={fac.id}
                  type="button"
                  onClick={() => handleToggleFacilitySelection(fac.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-[#0F766E] text-white border-[#0F766E]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '} {fac.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-700 w-44">Parameter</th>
              {comparedFacilities.map(fac => (
                <th key={fac.id} className="p-4 font-bold text-slate-900 min-w-[240px]">
                  <div className="text-sm font-extrabold text-[#0F766E]">{fac.name}</div>
                  <div className="text-[11px] text-slate-500 font-normal mt-0.5">{fac.city} • {fac.type}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* Row 1: Typical OPD Consultation */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/40">OPD Consultation Fee</td>
              {comparedFacilities.map(fac => {
                const opdPrice = fac.priceList.find(p => p.serviceName.toLowerCase().includes('consultation')) || fac.priceList[0];
                return (
                  <td key={fac.id} className="p-4">
                    {opdPrice ? (
                      <div>
                        <span className="text-base font-black text-slate-900">
                          {opdPrice.priceMin === 0 ? 'Free (Govt)' : `₹${opdPrice.priceMin.toLocaleString('en-IN')}`}
                        </span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">{opdPrice.inclusions}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400">Tariff not listed</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Row 2: Selected Service Match */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/40">{selectedService}</td>
              {comparedFacilities.map(fac => {
                const matched = fac.priceList.find(p => p.serviceName.toLowerCase().includes(selectedService.toLowerCase()));
                return (
                  <td key={fac.id} className="p-4">
                    {matched ? (
                      <div>
                        <span className="text-base font-black text-slate-900">
                          {matched.priceMin === 0 
                            ? 'Free' 
                            : matched.priceMax 
                            ? `₹${matched.priceMin} - ₹${matched.priceMax}` 
                            : `₹${matched.priceMin}`}
                        </span>
                        <span className="block text-[11px] text-slate-600 mt-0.5 font-medium">{matched.inclusions}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Service not available or unlisted at this clinic</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Row 3: Trust Status & Data Source */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/40">Tariff Source & Verification</td>
              {comparedFacilities.map(fac => (
                <td key={fac.id} className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                    fac.trustStatus === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {fac.trustStatus === 'verified' ? 'Officially Verified' : 'User Submitted Estimate'}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1">Verified: {fac.lastVerifiedDate}</span>
                </td>
              ))}
            </tr>

            {/* Row 4: Schemes & Cashless Insurance */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/40">Government / Cashless Support</td>
              {comparedFacilities.map(fac => (
                <td key={fac.id} className="p-4">
                  <div className="space-y-1">
                    {fac.services.map((s, idx) => (
                      <span key={idx} className="block text-[11px] text-slate-600">
                        • {s}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
