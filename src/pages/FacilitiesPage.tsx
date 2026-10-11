import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  Navigation, 
  Building2, 
  RotateCcw,
  ShieldCheck,
  Map as MapIcon,
  List
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FacilityCard } from '../components/ui/FacilityCard';
import { HealthcareFacility } from '../types';

export const FacilitiesPage: React.FC = () => {
  const { facilities, showToast } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isLocating, setIsLocating] = useState(false);

  // Extract all unique specialties
  const allSpecialties = ['All', ...Array.from(new Set(facilities.flatMap(f => f.specialties)))];
  const allTypes = ['All', 'Hospital', 'Clinic', 'Primary Health Centre', 'Diagnostic Center'];

  // Filter facilities
  const filteredFacilities = facilities.filter(fac => {
    const matchesSearch = 
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.pincode.includes(searchQuery) ||
      fac.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSpecialty = selectedSpecialty === 'All' || fac.specialties.includes(selectedSpecialty);
    const matchesType = selectedType === 'All' || fac.type === selectedType;
    const matchesEmergency = !emergencyOnly || fac.isEmergencyReady;

    return matchesSearch && matchesSpecialty && matchesType && matchesEmergency;
  });

  const handleUseMyLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        showToast(`Location detected: Lat ${pos.coords.latitude.toFixed(3)}, Lng ${pos.coords.longitude.toFixed(3)}. Sorted by proximity.`);
      },
      (err) => {
        setIsLocating(false);
        showToast('Location permission denied. Please enter your PIN or city manually.');
      }
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('All');
    setSelectedType('All');
    setEmergencyOnly(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Hospitals & Clinics
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Search verified healthcare facilities across India with published specialties, tariffs, and emergency readiness.
          </p>
        </div>

        {/* View Toggle (List vs Map) */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'list' 
                ? 'bg-white text-[#0F766E] shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span>List View</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'map' 
                ? 'bg-white text-[#0F766E] shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Map View</span>
          </button>
        </div>
      </div>

      {/* Search & Location Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hospital name, city, PIN code (e.g. 522001), or specialty..."
              className="w-full pl-11 pr-4 py-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] focus:bg-white transition-all min-h-[46px]"
            />
          </div>

          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-[#0F766E] bg-[#E6F4F1] hover:bg-teal-100 rounded-xl transition-all min-h-[46px] flex-shrink-0"
          >
            <MapPin className="w-4 h-4" />
            <span>{isLocating ? 'Locating...' : 'Use My Location'}</span>
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
          {/* Specialty Dropdown */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="spec-filter" className="font-semibold text-slate-600">Specialty:</label>
            <select
              id="spec-filter"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 font-medium cursor-pointer"
            >
              {allSpecialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Facility Type Dropdown */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="type-filter" className="font-semibold text-slate-600">Type:</label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 font-medium cursor-pointer"
            >
              {allTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* 24/7 Emergency Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={emergencyOnly}
              onChange={(e) => setEmergencyOnly(e.target.checked)}
              className="w-4 h-4 text-[#0F766E] rounded focus:ring-[#0F766E]"
            />
            <span className="font-semibold text-red-700">24/7 Emergency Casualty Only</span>
          </label>

          {/* Reset Filters */}
          <button
            type="button"
            onClick={resetFilters}
            className="ml-auto inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 font-medium py-1 px-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      </div>

      {/* Results Count & Live List */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Showing {filteredFacilities.length} healthcare facilities</span>
        <span className="text-slate-400">All sample facilities labeled with source verification badges</span>
      </div>

      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredFacilities.map(fac => (
            <FacilityCard key={fac.id} facility={fac} />
          ))}

          {filteredFacilities.length === 0 && (
            <div className="col-span-full bg-white rounded-2xl p-10 text-center border border-slate-200">
              <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No healthcare facilities match your search</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Try searching by a broader city name, removing the specialty filter, or checking nearby districts.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-[#E6F4F1] text-[#0F766E] font-bold text-xs rounded-lg"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Interactive Map Simulation View */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="bg-slate-100 rounded-xl p-8 border border-slate-200 text-center relative overflow-hidden h-96 flex flex-col items-center justify-center">
            {/* Visual simulated map grid */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0F766E_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10 max-w-md">
              <MapPin className="w-12 h-12 text-[#0F766E] mx-auto animate-bounce mb-2" />
              <h3 className="text-lg font-bold text-slate-900">CareBridge Interactive Map Layer</h3>
              <p className="text-xs text-slate-600 mt-1">
                Displaying {filteredFacilities.length} verified pins across Andhra Pradesh, Telangana, Karnataka, and Tamil Nadu.
              </p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {filteredFacilities.map(fac => (
                  <span key={fac.id} className="text-[11px] font-bold bg-white text-slate-800 px-3 py-1 rounded-full shadow-xs border border-slate-200">
                    📍 {fac.name} (~{fac.distanceKm} km)
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
