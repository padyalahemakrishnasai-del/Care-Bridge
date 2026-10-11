import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  UserCheck, 
  Globe, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HealthArticle } from '../types';

export const HealthLibraryPage: React.FC = () => {
  const { articles } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Diabetes & Nutrition', 'Cardiology', 'Preventive Care', 'Elderly Health'];

  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Medically-Reviewed Health Awareness Library
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Evidence-based health education for Indian families. Reviewed by doctors. Strictly educational.
        </p>
      </div>

      {/* Educational Legal Note */}
      <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#0F766E] flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Clinical Editorial Standard:</strong> Every article is reviewed by certified Indian medical doctors with name, credentials, and revision timestamps displayed. These materials provide general awareness and must never replace personal medical evaluation by a licensed physician.
        </div>
      </div>

      {selectedArticle ? (
        /* Reading View for Selected Article (Comfortable 680px Reading Width) */
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs max-w-[720px] mx-auto space-y-6">
          <button
            type="button"
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0F766E]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E6F4F1] text-[#0F766E]">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {selectedArticle.readTimeMinutes} min read
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
              <span>Source: <strong>{selectedArticle.authorOrSource}</strong></span>
              <span className="text-emerald-800 font-bold flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                Reviewed by {selectedArticle.medicallyReviewedBy} ({selectedArticle.reviewDate})
              </span>
            </div>
          </div>

          {/* Emergency Warning Strip if Red Flags Exist */}
          {selectedArticle.emergencySymptomsWarning && (
            <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-950 text-xs space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-rose-800 text-sm">
                <AlertTriangle className="w-4 h-4" />
                Red-Flag Warning Signs (Seek Immediate Medical Care):
              </span>
              <ul className="list-disc pl-5 space-y-0.5 pt-1 text-slate-800">
                {selectedArticle.emergencySymptomsWarning.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Markdown Prose Content */}
          <div className="prose prose-slate text-sm leading-relaxed space-y-4 text-slate-800 border-t border-slate-100 pt-4">
            <p className="font-medium text-slate-700 italic">
              {selectedArticle.summary}
            </p>
            <div className="whitespace-pre-line text-slate-700 leading-relaxed">
              {selectedArticle.contentMarkdown}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span>CareBridge Health Awareness Advisory</span>
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="px-4 py-2 bg-[#E6F4F1] text-[#0F766E] font-bold rounded-lg"
            >
              Close Article
            </button>
          </div>
        </div>
      ) : (
        /* Articles Grid View */
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-3 text-xs">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, diabetes, heart, diet..."
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="flex overflow-x-auto gap-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-[#0F766E] text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map(art => (
              <article 
                key={art.id} 
                onClick={() => setSelectedArticle(art)}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#0F766E] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E6F4F1] text-[#0F766E]">
                      {art.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {art.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-[#0F766E] transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Reviewed: <strong>{art.reviewDate}</strong></span>
                  <span className="font-bold text-[#0F766E] flex items-center gap-1">
                    Read article <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
