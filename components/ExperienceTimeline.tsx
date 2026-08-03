'use client';

import { sailingExperience, onShoreExperience, internships } from '../data/resumeData';
import { Ship, Briefcase, Award, Calendar, ChevronDown } from 'lucide-react';

export default function ExperienceTimeline() {
  return (
    <div className="space-y-6">

      {/* ── Sailing Experience ── */}
      <section id="sailing" className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-5 bg-sky-500 rounded-full inline-block" />
          Sailing Experience
        </h2>

        {sailingExperience.map((exp, idx) => (
          <div
            key={idx}
            className="expand-card dark-card rounded-2xl border border-slate-200 dark:border-sky-900/30 bg-white shadow-sm hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-400 cursor-default"
          >
            {/* Collapsed row */}
            <div className="flex items-center gap-4 p-5">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sm shrink-0">
                <Ship className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{exp.vessel}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500 text-white">{exp.capacity}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10">{exp.rank}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {exp.period}
                </p>
              </div>
              <ChevronDown className="card-arrow w-4 h-4 text-slate-400 shrink-0" />
            </div>

            {/* Expanded detail */}
            <div className="card-detail px-5 pb-5">
              <div className="h-px bg-slate-100 dark:bg-white/5 mb-4" />

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-50 dark:bg-white/3 rounded-xl p-3 border border-slate-100 dark:border-white/5">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Type</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{exp.type}</p>
                </div>
                <div className="bg-slate-50 dark:bg-white/3 rounded-xl p-3 border border-slate-100 dark:border-white/5">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Reefer</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{exp.reeferCapacity}</p>
                </div>
                <div className="bg-slate-50 dark:bg-white/3 rounded-xl p-3 border border-slate-100 dark:border-white/5 col-span-2 sm:col-span-1">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Engine</p>
                  <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-0.5 leading-snug">{exp.engineSpec}</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                {exp.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── On-Shore & IT Experience ── */}
      <section id="onshore" className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-5 bg-indigo-500 rounded-full inline-block" />
          On-Shore Experience
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {onShoreExperience.map((exp, idx) => (
            <div
              key={idx}
              className="expand-card dark-card rounded-2xl border border-slate-200 dark:border-indigo-900/30 bg-white shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-400 cursor-default"
            >
              {/* Collapsed row */}
              <div className="flex items-center gap-3 p-5">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{exp.company}</p>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mt-0.5">{exp.role}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{exp.period}</p>
                </div>
                <ChevronDown className="card-arrow w-4 h-4 text-slate-400 shrink-0" />
              </div>

              {/* Expanded */}
              <div className="card-detail px-5 pb-5">
                <div className="h-px bg-slate-100 dark:bg-white/5 mb-3" />
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skillsUsed.map((s, si) => (
                    <span key={si} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Internship as slim banner */}
        {internships.map((intern, idx) => (
          <div
            key={idx}
            className="expand-card dark-card rounded-2xl border border-slate-200 dark:border-amber-900/20 bg-white shadow-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-400 cursor-default"
          >
            <div className="flex items-center gap-3 p-5">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Internship · {intern.period}</p>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mt-0.5">{intern.company}</h3>
              </div>
              <ChevronDown className="card-arrow w-4 h-4 text-slate-400 shrink-0" />
            </div>
            <div className="card-detail px-5 pb-5">
              <div className="h-px bg-slate-100 dark:bg-white/5 mb-3" />
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{intern.description}</p>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
