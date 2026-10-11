import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, 
  Search, 
  Pill, 
  FileText, 
  Users, 
  PhoneCall, 
  Menu, 
  X, 
  Globe, 
  Bell, 
  ShieldAlert, 
  MapPin, 
  DollarSign, 
  Trees, 
  Droplet, 
  Smile, 
  BookOpen, 
  Calendar,
  Settings,
  Shield,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    currentUser, 
    preferences, 
    updatePreferences, 
    toastMessage, 
    loginAs, 
    logout 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleSelectorOpen, setRoleSelectorOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updatePreferences({ language: e.target.value as Language });
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
      isActive 
        ? 'bg-[#E6F4F1] text-[#0F766E]' 
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F766E]">
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite"
          className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-2 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#0F766E] text-white flex items-center justify-center shadow-xs">
                {/* Bridge icon with patient and care dots */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                  <path d="M4 18c4-8 12-8 16 0" />
                  <circle cx="4" cy="18" r="2" fill="currentColor" />
                  <circle cx="20" cy="18" r="2" fill="currentColor" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#0F766E] transition-colors">
                  CareBridge
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-[#0F766E] bg-[#E6F4F1] px-2 py-0.5 rounded-full">
                  India Healthcare
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Top Navigation Bar: Home, Find Care, Medicines, Records */}
          <nav aria-label="Top Primary Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all flex items-center gap-1.5 ${
                isActive 
                  ? 'bg-[#E6F4F1] text-[#0F766E]' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-4 h-4 text-[#0F766E]" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/facilities"
              className={({ isActive }) => `px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all flex items-center gap-1.5 ${
                isActive 
                  ? 'bg-[#E6F4F1] text-[#0F766E]' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4 text-[#0F766E]" />
              <span>Find Care</span>
            </NavLink>

            <NavLink
              to="/medications"
              className={({ isActive }) => `px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all flex items-center gap-1.5 ${
                isActive 
                  ? 'bg-[#E6F4F1] text-[#0F766E]' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Pill className="w-4 h-4 text-[#0F766E]" />
              <span>Medicines</span>
            </NavLink>

            <NavLink
              to="/records"
              className={({ isActive }) => `px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all flex items-center gap-1.5 ${
                isActive 
                  ? 'bg-[#E6F4F1] text-[#0F766E]' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-[#0F766E]" />
              <span>Records</span>
            </NavLink>
          </nav>

          {/* Quick Header Controls (Emergency, Language, Role Switcher) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Direct Emergency Call Button */}
            <Link
              to="/emergency"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white bg-[#DC2626] hover:bg-red-800 rounded-lg shadow-sm transition-transform active:scale-95 animate-pulse min-h-[38px]"
              aria-label="Emergency Assistance - Call 112 instantly"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>EMERGENCY 112</span>
            </Link>

            {/* Language Switcher */}
            <div className="relative inline-flex items-center">
              <label htmlFor="lang-select" className="sr-only">Select Application Language</label>
              <Globe className="w-4 h-4 text-slate-500 absolute left-2.5 pointer-events-none" />
              <select
                id="lang-select"
                value={preferences.language}
                onChange={handleLanguageChange}
                className="pl-8 pr-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E] min-h-[38px] cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>

            {/* Role Switcher Demo Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleSelectorOpen(!roleSelectorOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg min-h-[38px]"
                aria-label="Change simulated user role for testing"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="hidden md:inline font-bold capitalize">
                  {currentUser.role.replace('_', ' ')}
                </span>
                <span className="md:hidden">Role</span>
              </button>

              {roleSelectorOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 text-xs">
                  <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Switch Test Persona
                  </div>
                  <button 
                    type="button"
                    onClick={() => { loginAs('registered_user'); setRoleSelectorOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-800 font-semibold block"
                  >
                    👤 Patient (Priya Sharma)
                  </button>
                  <button 
                    type="button"
                    onClick={() => { loginAs('authorized_caregiver'); setRoleSelectorOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-800 font-semibold block"
                  >
                    🤝 Caregiver (Ravi Kumar)
                  </button>
                  <button 
                    type="button"
                    onClick={() => { loginAs('verified_facility_manager'); setRoleSelectorOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-800 font-semibold block"
                  >
                    🏥 Facility Manager
                  </button>
                  <button 
                    type="button"
                    onClick={() => { loginAs('administrator'); setRoleSelectorOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-800 font-semibold block"
                  >
                    🛡️ System Administrator
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button 
                    type="button"
                    onClick={() => { logout(); setRoleSelectorOpen(false); }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold block"
                  >
                    🚪 Browse as Guest
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <Link
              to="/notifications"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative"
              aria-label="Notification Preferences"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0F766E] rounded-full"></span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container with 4 Sidebar Groups */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex gap-8">
        
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav aria-label="Main Navigation" className="sticky top-24 space-y-6">
            
            {/* Section 1: My Health */}
            <div>
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                My Health
              </p>
              <div className="space-y-1">
                <NavLink to="/dashboard" className={navItemClass}>
                  <Heart className="w-4 h-4 text-[#0F766E]" />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink to="/medications" className={navItemClass}>
                  <Pill className="w-4 h-4 text-[#0F766E]" />
                  <span>Medicines</span>
                </NavLink>
                <NavLink to="/appointments" className={navItemClass}>
                  <Calendar className="w-4 h-4 text-[#0F766E]" />
                  <span>Appointments</span>
                </NavLink>
                <NavLink to="/records" className={navItemClass}>
                  <FileText className="w-4 h-4 text-[#0F766E]" />
                  <span>Medical Records</span>
                </NavLink>
              </div>
            </div>

            {/* Section 2: Find Care */}
            <div>
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Find Care
              </p>
              <div className="space-y-1">
                <NavLink to="/facilities" className={navItemClass}>
                  <MapPin className="w-4 h-4 text-[#0F766E]" />
                  <span>Hospitals & Clinics</span>
                </NavLink>
                <NavLink to="/cost-comparison" className={navItemClass}>
                  <DollarSign className="w-4 h-4 text-[#0F766E]" />
                  <span>Cost Comparison</span>
                </NavLink>
                <NavLink to="/rural-care" className={navItemClass}>
                  <Trees className="w-4 h-4 text-[#0F766E]" />
                  <span>Rural Care</span>
                </NavLink>
                <NavLink to="/mental-health" className={navItemClass}>
                  <Smile className="w-4 h-4 text-[#0F766E]" />
                  <span>Mental Well-being</span>
                </NavLink>
              </div>
            </div>

            {/* Section 3: Community */}
            <div>
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Community
              </p>
              <div className="space-y-1">
                <NavLink to="/blood-donors" className={navItemClass}>
                  <Droplet className="w-4 h-4 text-[#0F766E]" />
                  <span>Blood Donors</span>
                </NavLink>
                <NavLink to="/health-library" className={navItemClass}>
                  <BookOpen className="w-4 h-4 text-[#0F766E]" />
                  <span>Health Library</span>
                </NavLink>
              </div>
            </div>

            {/* Section 4: Family & Admin */}
            <div>
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Family & Safety
              </p>
              <div className="space-y-1">
                <NavLink to="/family" className={navItemClass}>
                  <Users className="w-4 h-4 text-[#0F766E]" />
                  <span>Family & Caregivers</span>
                </NavLink>
                <NavLink to="/profile" className={navItemClass}>
                  <Settings className="w-4 h-4 text-[#0F766E]" />
                  <span>Profile & Privacy</span>
                </NavLink>
                {currentUser.role === 'administrator' && (
                  <NavLink to="/admin" className={navItemClass}>
                    <Shield className="w-4 h-4 text-[#0F766E]" />
                    <span>Admin Operations</span>
                  </NavLink>
                )}
                {['administrator', 'content_reviewer', 'verified_facility_manager'].includes(currentUser.role) && (
                  <NavLink to="/verification" className={navItemClass}>
                    <Shield className="w-4 h-4 text-[#0F766E]" />
                    <span>Moderation Queue</span>
                  </NavLink>
                )}
              </div>
            </div>
          </nav>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" 
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative bg-white w-72 max-w-[85vw] p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-extrabold text-slate-900 text-lg">CareBridge</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-1 text-sm font-semibold">
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Dashboard</Link>
                  <Link to="/facilities" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Hospitals & Clinics</Link>
                  <Link to="/medications" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Medication Reminders</Link>
                  <Link to="/appointments" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Appointments</Link>
                  <Link to="/records" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Medical Records</Link>
                  <Link to="/cost-comparison" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Cost Comparison</Link>
                  <Link to="/rural-care" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Rural Healthcare</Link>
                  <Link to="/blood-donors" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Blood Donors</Link>
                  <Link to="/mental-health" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Mental Well-being</Link>
                  <Link to="/health-library" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Health Awareness</Link>
                  <Link to="/family" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Family Coordination</Link>
                  <Link to="/emergency" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-rose-600 font-bold">Emergency 112</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 w-full max-w-full overflow-hidden">
          {children}
        </main>
      </div>

      {/* Mobile Fixed Bottom 5-Item Navigation Bar */}
      <nav 
        aria-label="Mobile Bottom Bar"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg"
      >
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `flex flex-col items-center justify-center p-1.5 text-xs font-semibold ${
            isActive ? 'text-[#0F766E]' : 'text-slate-500'
          }`}
        >
          <Heart className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        <NavLink 
          to="/facilities" 
          className={({ isActive }) => `flex flex-col items-center justify-center p-1.5 text-xs font-semibold ${
            isActive ? 'text-[#0F766E]' : 'text-slate-500'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>Find Care</span>
        </NavLink>

        <NavLink 
          to="/medications" 
          className={({ isActive }) => `flex flex-col items-center justify-center p-1.5 text-xs font-semibold ${
            isActive ? 'text-[#0F766E]' : 'text-slate-500'
          }`}
        >
          <Pill className="w-5 h-5 mb-0.5" />
          <span>Medicines</span>
        </NavLink>

        <NavLink 
          to="/records" 
          className={({ isActive }) => `flex flex-col items-center justify-center p-1.5 text-xs font-semibold ${
            isActive ? 'text-[#0F766E]' : 'text-slate-500'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span>Records</span>
        </NavLink>

        <button 
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center p-1.5 text-xs font-semibold text-slate-500"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span>More</span>
        </button>
      </nav>

      {/* Floating Mobile Emergency Button */}
      <Link
        to="/emergency"
        className="lg:hidden fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-2xl animate-pulse"
        aria-label="Emergency Call 112"
      >
        <PhoneCall className="w-6 h-6" />
      </Link>

      {/* Trust Footer on Every Page */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-600 mb-14 lg:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-700 text-center md:text-left">
            <Shield className="w-4 h-4 text-[#0F766E] flex-shrink-0" />
            <p>
              <strong>CareBridge Medical Disclaimer:</strong> CareBridge provides healthcare discovery and coordination tools. It does not replace doctors, medical diagnosis, or emergency dispatch services. In acute medical crises, always call <span className="font-bold text-[#DC2626]">112</span> or visit an emergency room.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium">
            <Link to="/help" className="hover:text-slate-900">Help & FAQ</Link>
            <Link to="/privacy" className="hover:text-slate-900">Privacy Notice</Link>
            <Link to="/consent" className="hover:text-slate-900">Consent & Data Sharing</Link>
            <Link to="/accessibility" className="hover:text-slate-900">Accessibility</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
