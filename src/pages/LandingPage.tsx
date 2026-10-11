import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Pill, 
  Receipt, 
  ShieldAlert, 
  BookOpen, 
  FolderLock, 
  Trees, 
  Droplet, 
  Smile, 
  Users, 
  ShieldCheck, 
  PhoneCall, 
  Search, 
  ArrowRight,
  CheckCircle2,
  Lock,
  HeartHandshake
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#E6F4F1] to-white p-6 sm:p-10 lg:p-14 border border-teal-100 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#0F766E] text-xs font-bold border border-teal-200/60 shadow-xs mb-4">
            <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
            <span>Built for Indian Families & Caregivers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Healthcare, connected for every family.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Find nearby verified hospitals, compare transparent treatment charges, track elder medication routines, organize lab records securely, and coordinate care—in one calm, human-friendly platform.
          </p>

          {/* Quick Search & CTA buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to="/facilities"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-[#0F766E] hover:bg-teal-800 shadow-md transition-all active:scale-95 min-h-[50px]"
            >
              <Search className="w-5 h-5" />
              <span>Find Care Now</span>
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-[#0F766E] bg-white hover:bg-slate-50 border border-teal-200 shadow-xs transition-all min-h-[50px]"
            >
              <span>Explore My Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/emergency"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-bold text-white bg-[#DC2626] hover:bg-red-800 shadow-md transition-all min-h-[50px]"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>Emergency (112)</span>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No Mandatory Sign-up to Browse
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-teal-600" />
              Private Encrypted Vaults
            </span>
            <span className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-indigo-600" />
              Regional Language Ready
            </span>
          </div>
        </div>
      </section>

      {/* 10 Healthcare Modules Grid */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            10 Healthcare Solutions for Real-World Challenges
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every feature is purpose-built to eliminate stress, confusion, and predatory pricing for Indian patients and caregivers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Module 1 */}
          <Link to="/facilities" className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#0F766E] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0F766E]">
              1. Hospital & Clinic Finder
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Discover verified hospitals and clinics with live specialties, emergency capability, and clear verification dates.
            </p>
          </Link>

          {/* Module 2 */}
          <Link to="/medications" className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#0F766E] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Pill className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0F766E]">
              2. Medication Reminders
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Track daily prescriptions with doctor instructions. Mark doses as Taken, Skipped, or Missed with browser alerts.
            </p>
          </Link>

          {/* Module 3 */}
          <Link to="/cost-comparison" className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#0F766E] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Receipt className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0F766E]">
              3. Healthcare Cost Transparency
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Compare published consultation tariffs and diagnostic fees side by side. Avoid unexpected hospital bills.
            </p>
          </Link>

          {/* Module 4 */}
          <Link to="/emergency" className="group bg-white p-5 rounded-2xl border border-red-200 hover:border-red-500 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-red-600">
              4. Emergency Assistance
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Instant 1-tap call to 112 / 108 and 1-tap GPS location sharing for responders without any login or delay.
            </p>
          </Link>

          {/* Module 5 */}
          <Link to="/health-library" className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#0F766E] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0F766E]">
              5. Medically-Reviewed Health Library
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Trustworthy articles in simple English and Indian regional languages, reviewed by certified medical specialists.
            </p>
          </Link>

          {/* Module 6 */}
          <Link to="/records" className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#0F766E] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FolderLock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0F766E]">
              6. Medical Records Vault
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Organize prescriptions, discharge summaries, and lab reports in a private vault with revocable caregiver sharing.
            </p>
          </Link>

          {/* Module 7 */}
          <Link to="/rural-care" className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#0F766E] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0F766E]">
              7. Rural & PHC Care Finder
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Low-bandwidth search for Primary Health Centres (PHCs) and Community Health Centres (CHCs) by village or PIN code.
            </p>
          </Link>

          {/* Module 8 */}
          <Link to="/blood-donors" className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#0F766E] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0F766E]">
              8. Blood Donor Coordination
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Voluntary, consent-governed donor registry with private in-app outreach and zero phone number exposure.
            </p>
          </Link>

          {/* Module 9 */}
          <Link to="/mental-health" className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#0F766E] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0F766E]">
              9. Mental Well-being Support
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Verified therapists and free 24/7 Tele-MANAS (14416) crisis support without judgment or unnecessary tracking.
            </p>
          </Link>

          {/* Module 10 */}
          <Link to="/family" className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#0F766E] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0F766E]">
              10. Family & Caregiver Coordination
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Coordinate elder follow-up appointments and shared family duties with audit histories and 1-tap revocation.
            </p>
          </Link>

        </div>
      </section>

      {/* 3 Simple Steps */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center tracking-tight">
          How CareBridge Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#E6F4F1] text-[#0F766E] font-extrabold text-xl flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Search or Organize</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Find verified care near your PIN code or set up personal daily medicines and health documents.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#E6F4F1] text-[#0F766E] font-extrabold text-xl flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Involve Family Safely</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Invite a son, daughter, or nurse to coordinate reminders with granular permissions you control.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#E6F4F1] text-[#0F766E] font-extrabold text-xl flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Stay Ahead of Emergencies</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Access 112 emergency calling and verified blood requests instantly when every second counts.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Strip */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">
            National Helplines
          </span>
          <h3 className="text-xl sm:text-2xl font-bold mt-1">
            Need Immediate Help? India Helplines Available 24/7
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Free government emergency response lines. Call directly from your mobile device.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="tel:112"
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-sm text-white flex items-center gap-2 shadow-lg"
          >
            <PhoneCall className="w-4 h-4" />
            <span>112 All Emergencies</span>
          </a>

          <a
            href="tel:108"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 font-bold text-sm text-white flex items-center gap-2 shadow-lg"
          >
            <PhoneCall className="w-4 h-4" />
            <span>108 Ambulance</span>
          </a>

          <a
            href="tel:14416"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-slate-200 border border-slate-700 flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>14416 Tele-MANAS</span>
          </a>
        </div>
      </section>
    </div>
  );
};
