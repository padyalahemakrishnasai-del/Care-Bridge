import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Navigation, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertCircle,
  Building2,
  Receipt,
  Share2,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TrustBadge } from '../components/ui/TrustBadge';

export const FacilityDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { facilities, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'specialties' | 'prices' | 'hours'>('overview');

  const facility = facilities.find(f => f.id === id) || facilities[0];

  if (!facility) {
    return (
      <div className="bg-white p-8 rounded-2xl text-center">
        <h2 className="text-xl font-bold">Facility not found</h2>
        <Link to="/facilities" className="text-teal-700 underline mt-2 block">Back to facility list</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Back button */}
      <div>
        <Link 
          to="/facilities" 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0F766E]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Facility Directory</span>
        </Link>
      </div>

      {/* Main Facility Banner Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E6F4F1] text-[#0F766E]">
              {facility.type}
            </span>
            <TrustBadge status={facility.trustStatus} date={facility.lastVerifiedDate} />
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Official ID: {facility.id}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {facility.name}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#0F766E] flex-shrink-0" />
          <span>{facility.address}, {facility.city}, {facility.state} - {facility.pincode}</span>
        </p>

        {facility.verificationNotes && (
          <div className="mt-4 p-3 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-teal-900">
            <span className="font-bold">Verification Note: </span>
            {facility.verificationNotes}
          </div>
        )}

        {/* Desktop Sticky Action Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <a
            href={`tel:${facility.phone}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-teal-800 text-white font-bold text-sm shadow-xs transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Facility ({facility.phone})</span>
          </a>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates.lat},${facility.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E6F4F1] hover:bg-teal-100 text-[#0F766E] font-bold text-sm transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              showToast('Facility link copied to clipboard.');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/50 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3.5 border-b-2 transition-colors flex-shrink-0 ${
              activeTab === 'overview'
                ? 'border-[#0F766E] text-[#0F766E] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview & Services
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('specialties')}
            className={`px-5 py-3.5 border-b-2 transition-colors flex-shrink-0 ${
              activeTab === 'specialties'
                ? 'border-[#0F766E] text-[#0F766E] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Specialties ({facility.specialties.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prices')}
            className={`px-5 py-3.5 border-b-2 transition-colors flex-shrink-0 ${
              activeTab === 'prices'
                ? 'border-[#0F766E] text-[#0F766E] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Published Prices & Tariffs ({facility.priceList.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hours')}
            className={`px-5 py-3.5 border-b-2 transition-colors flex-shrink-0 ${
              activeTab === 'hours'
                ? 'border-[#0F766E] text-[#0F766E] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Hours & Location
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Available Infrastructure & Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {facility.services.map((srv, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {facility.isEmergencyReady && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs">
                  <span className="font-bold block text-sm mb-1">🚨 24/7 Trauma & Emergency Ready</span>
                  This facility operates an active casualty department with critical care triage and emergency doctor presence.
                </div>
              )}
            </div>
          )}

          {activeTab === 'specialties' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 mb-2">Medical Specialties Offered</h3>
              <div className="flex flex-wrap gap-2">
                {facility.specialties.map((spec, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-[#E6F4F1] text-[#0F766E] text-xs font-bold">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'prices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Official Rate Card & Standard Charges</h3>
                <span className="text-xs text-slate-500">Subject to clinical assessment</span>
              </div>

              <div className="space-y-3">
                {facility.priceList.map(pr => (
                  <div key={pr.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{pr.serviceName}</span>
                        {pr.isEstimated ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            Estimated
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Published Tariff
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Inclusions: {pr.inclusions}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Source: {pr.source} • Verified: {pr.lastVerifiedDate}</p>
                    </div>

                    <div className="text-right sm:flex-shrink-0">
                      <span className="text-lg font-black text-slate-900 block">
                        {pr.priceMin === 0 
                          ? 'Free' 
                          : pr.priceMax 
                          ? `₹${pr.priceMin.toLocaleString('en-IN')} - ₹${pr.priceMax.toLocaleString('en-IN')}` 
                          : `₹${pr.priceMin.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hours' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Operating Schedule:</span>
                  <span className="font-bold text-slate-900">{facility.operatingHours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Telephone Contact:</span>
                  <span className="font-bold text-slate-900">{facility.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Postal District:</span>
                  <span className="font-bold text-slate-900">{facility.district}, {facility.state}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sticky Bottom Action Strip */}
      <div className="sm:hidden fixed bottom-14 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${facility.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#0F766E] text-white font-bold text-xs"
        >
          <Phone className="w-4 h-4" />
          <span>Call Facility</span>
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates.lat},${facility.coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs"
        >
          <Navigation className="w-4 h-4" />
          <span>Directions</span>
        </a>
      </div>
    </div>
  );
};
