import React, { useState } from 'react';
import { 
  PhoneCall, 
  MapPin, 
  ShieldAlert, 
  Share2, 
  ArrowLeft, 
  Check, 
  AlertTriangle,
  Building2,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const EmergencyPage: React.FC = () => {
  const { facilities, showToast } = useApp();
  const [locationShared, setLocationShared] = useState(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<string | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Filter 24/7 trauma and emergency ready hospitals
  const emergencyHospitals = facilities.filter(f => f.isEmergencyReady);

  const handleShareLocation = () => {
    setIsLocating(true);
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your current browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`;
        setGpsCoordinates(coords);
        setLocationShared(true);
        setIsLocating(false);

        // Native Web Share API if supported
        if (navigator.share) {
          navigator.share({
            title: 'EMERGENCY - My Current Location via CareBridge',
            text: `URGENT: I need emergency medical assistance. My live coordinates are: https://maps.google.com/?q=${coords}`,
          }).catch(() => {
            // Cancelled or unsupported share
          });
        } else {
          navigator.clipboard.writeText(`https://maps.google.com/?q=${coords}`);
          showToast('GPS coordinates copied to clipboard. Ready to paste in SMS or WhatsApp.');
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGpsError('Location permission was denied. Please turn on GPS in your browser settings.');
        } else {
          setGpsError('Unable to retrieve precise GPS coordinates. Please state your street address directly to the emergency dispatcher.');
        }
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Banner & Quick Back */}
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold py-2 px-3 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Return to Dashboard</span>
          </Link>

          <span className="bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-red-500/30 flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Zero-Login Emergency Mode
          </span>
        </div>

        {/* Big Alert Notice */}
        <div className="mt-6 bg-red-950/80 border-2 border-red-600 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Emergency Assistance (India)
              </h1>
              <p className="text-red-200 text-sm mt-1 leading-relaxed">
                <strong>IMPORTANT NOTICE:</strong> CareBridge is an informational directory and does <u>not</u> automatically dispatch an ambulance. If someone is severely injured, unresponsive, or having chest pain, <strong>call 112 or 108 immediately</strong> using the buttons below.
              </p>
            </div>
          </div>
        </div>

        {/* Primary 1-Tap Emergency Call Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* 112 - National Unified Emergency Number */}
          <a
            href="tel:112"
            className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black shadow-xl hover:scale-[1.01] active:scale-95 transition-all min-h-[90px]"
            aria-label="Call 112 India National Emergency Number"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white text-red-600 flex items-center justify-center shadow-md">
                <PhoneCall className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-red-100 font-bold block">
                  National Emergency (India)
                </span>
                <span className="text-3xl font-black tracking-tight">
                  CALL 112
                </span>
              </div>
            </div>
            <span className="text-xs bg-red-800/80 px-2.5 py-1 rounded-md text-red-100 font-semibold">
              Toll Free 24/7
            </span>
          </a>

          {/* 108 - Medical & Ambulance Emergency */}
          <a
            href="tel:108"
            className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black shadow-xl hover:scale-[1.01] active:scale-95 transition-all min-h-[90px]"
            aria-label="Call 108 Emergency Ambulance Helpline"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white text-teal-700 flex items-center justify-center shadow-md">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-teal-100 font-bold block">
                  Ambulance & Trauma
                </span>
                <span className="text-3xl font-black tracking-tight">
                  CALL 108
                </span>
              </div>
            </div>
            <span className="text-xs bg-teal-900/80 px-2.5 py-1 rounded-md text-teal-100 font-semibold">
              Free Ambulance
            </span>
          </a>

          {/* 102 - Maternal & Child Health Helpline */}
          <a
            href="tel:102"
            className="flex items-center justify-between p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white transition-all"
            aria-label="Call 102 Pregnant Women and Infant Transport Helpline"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-teal-400" />
              <div>
                <span className="text-xs text-slate-400 block font-medium">Maternal & Child Transport</span>
                <span className="text-xl font-bold">102 Helpline</span>
              </div>
            </div>
            <span className="text-xs text-slate-400">Janani Shishu Suraksha</span>
          </a>

          {/* 14416 - Tele-MANAS Mental Health Helpline */}
          <a
            href="tel:14416"
            className="flex items-center justify-between p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white transition-all"
            aria-label="Call 14416 Tele-MANAS Mental Health Distress Helpline"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-indigo-400" />
              <div>
                <span className="text-xs text-slate-400 block font-medium">Acute Distress & Mental Crisis</span>
                <span className="text-xl font-bold">Tele-MANAS (14416)</span>
              </div>
            </div>
            <span className="text-xs text-slate-400">24/7 Psychological Care</span>
          </a>
        </div>

        {/* Explicit Location Sharing Tool */}
        <div className="mt-8 bg-slate-800/80 border border-slate-700 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                Share My Exact Location with Rescuers
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Clicking this will request your device GPS and generate a shareable Google Maps location link you can immediately send to family or paramedics.
              </p>
              {gpsCoordinates && (
                <div className="mt-2 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-lg text-emerald-400 border border-slate-700 inline-block">
                  GPS Fixed: {gpsCoordinates}
                </div>
              )}
              {gpsError && (
                <div className="mt-2 text-xs text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{gpsError}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleShareLocation}
              disabled={isLocating}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex-shrink-0 min-h-[48px]"
            >
              {isLocating ? (
                <span>Retrieving GPS...</span>
              ) : locationShared ? (
                <>
                  <Check className="w-5 h-5 text-emerald-300" />
                  <span>Location Shared (Click to Re-share)</span>
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5" />
                  <span>Share My Location Now</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Nearby Verified Emergency Hospitals */}
        <div className="mt-8 mb-10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-teal-400" />
            Verified Nearby Emergency Trauma Hospitals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyHospitals.map(hospital => (
              <div 
                key={hospital.id} 
                className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-red-950 text-red-300 font-bold px-2 py-0.5 rounded border border-red-800">
                      24/7 Casualty & ICU
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      ~{hospital.distanceKm} km away
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2">
                    {hospital.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {hospital.address}, {hospital.city}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center gap-2">
                  <a
                    href={`tel:${hospital.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors min-h-[42px]"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Casualty</span>
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.coordinates.lat},${hospital.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-colors min-h-[42px]"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Emergency Footer */}
      <footer className="text-center text-xs text-slate-500 py-4 border-t border-slate-800">
        CareBridge India Emergency Fast-Lane • No registration required • Works with low bandwidth
      </footer>
    </div>
  );
};
