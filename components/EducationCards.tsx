'use client';

import { educationList } from '../data/resumeData';
import { GraduationCap, BookOpen, ChevronDown } from 'lucide-react';

export default function EducationCards() {
  return (
    <section id="education" className="space-y-3">
      <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block" />
        Education & Credentials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {educationList.map((edu, idx) => (
          <div
            key={idx}
            className="expand-card dark-card rounded-2xl border border-slate-200 dark:border-emerald-900/20 bg-white shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-400 cursor-default"
          >
            {/* Collapsed Row */}
            <div className="flex items-center gap-4 p-5">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{edu.program}</h3>
                  {edu.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shrink-0">
                      {edu.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{edu.institution}</p>
                <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-500 mt-0.5">{edu.period}</p>
              </div>
              <ChevronDown className="card-arrow w-4 h-4 text-slate-400 shrink-0" />
            </div>

            {/* Expanded detail */}
            <div className="card-detail px-5 pb-5">
              <div className="h-px bg-slate-100 dark:bg-white/5 mb-3" />
              {edu.details && (
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{edu.details}</p>
              )}
              <div className="flex items-center gap-1.5 mt-3 text-[10px] text-slate-400 dark:text-slate-500">
                <BookOpen className="w-3 h-3" />
                Verified Qualification
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
