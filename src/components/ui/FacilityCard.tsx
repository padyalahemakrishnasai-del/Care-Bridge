import React from 'react';
import { Phone, Navigation, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { HealthcareFacility } from '../../types';
import { TrustBadge } from './TrustBadge';
import { Link } from 'react-router-dom';

interface FacilityCardProps {
  facility: HealthcareFacility;
  onCall?: (phone: string) => void;
  onDirections?: (fac: HealthcareFacility) => void;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ 
  facility,
  onCall,
  onDirections
}) => {
  return (
    <article className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between">
      <div>
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-[#E6F4F1] text-[#0F766E]">
            {facility.type}
          </span>
          <TrustBadge status={facility.trustStatus} date={facility.lastVerifiedDate} />
        </div>

        {/* Facility Title & Location */}
        <h3 className="text-lg font-bold text-slate-900 hover:text-[#0F766E] transition-colors leading-snug">
          <Link to={`/facility/${facility.id}`}>
            {facility.name}
          </Link>
        </h3>
        
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          {facility.address}, {facility.city} - {facility.pincode}
        </p>

        {/* Operating Hours & Emergency Tag */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-600">
          <span className="flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {facility.operatingHours}
          </span>
          {facility.isEmergencyReady && (
            <span className="flex items-center gap-1 text-[#DC2626] font-semibold bg-red-50 px-2 py-0.5 rounded">
              <AlertCircle className="w-3.5 h-3.5" />
              24/7 Trauma & Emergency
            </span>
          )}
          {facility.distanceKm !== undefined && (
            <span className="text-slate-500 font-medium">
              • ~{facility.distanceKm} km away
            </span>
          )}
        </div>

        {/* Specialties Chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {facility.specialties.slice(0, 4).map((spec, i) => (
            <span 
              key={i} 
              className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium"
            >
              {spec}
            </span>
          ))}
          {facility.specialties.length > 4 && (
            <span className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full">
              +{facility.specialties.length - 4} more
            </span>
          )}
        </div>

        {/* Sample Published Price Highlight if available */}
        {facility.priceList && facility.priceList.length > 0 && (
          <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
            <span className="text-slate-500 block mb-0.5 font-medium">Published Consultation Tariff:</span>
            <span className="font-bold text-slate-900 text-sm">
              {facility.priceList[0].priceMin === 0 
                ? 'Free (Government Scheme)' 
                : `₹${facility.priceList[0].priceMin.toLocaleString('en-IN')}`}
            </span>
            <span className="text-slate-500 ml-1.5">({facility.priceList[0].serviceName})</span>
          </div>
        )}
      </div>

      {/* Action Footer Buttons */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <a
          href={`tel:${facility.phone}`}
          onClick={(e) => {
            if (onCall) {
              e.preventDefault();
              onCall(facility.phone);
            }
          }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold text-[#0F766E] bg-[#E6F4F1] hover:bg-teal-100 rounded-lg transition-colors min-h-[44px]"
          aria-label={`Call ${facility.name} at ${facility.phone}`}
        >
          <Phone className="w-4 h-4" />
          <span>Call Facility</span>
        </a>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates.lat},${facility.coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (onDirections) {
              e.preventDefault();
              onDirections(facility);
            }
          }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-[#0F766E] hover:bg-teal-800 rounded-lg transition-colors min-h-[44px]"
          aria-label={`Get GPS directions to ${facility.name}`}
        >
          <Navigation className="w-4 h-4" />
          <span>Directions</span>
        </a>

        <Link
          to={`/facility/${facility.id}`}
          className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors min-h-[44px] flex items-center"
        >
          Details
        </Link>
      </div>
    </article>
  );
};
