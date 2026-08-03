'use client';

import { marineElectricalSkills, itSkills } from '../data/resumeData';
import { Zap, Terminal, CheckCircle2, ChevronDown } from 'lucide-react';

export default function CompetencyCards() {
  return (
    <section id="skills" className="space-y-3">
      <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-5 bg-sky-500 rounded-full inline-block" />
        Skills & Competencies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Marine Electrical Card — compact + hover expand */}
        <div className="expand-card group dark-card rounded-2xl border border-slate-200 dark:border-sky-900/30 bg-white shadow-sm hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-400 cursor-default">
          {/* Collapsed Header — always visible */}
          <div className="flex items-center gap-4 p-5">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Marine Electrical & Systems</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">STCW · ETO Certified · HV Systems</p>
            </div>
            <ChevronDown className="card-arrow w-4 h-4 text-slate-400 shrink-0" />
          </div>

          {/* Expanded Detail — shows on hover */}
          <div className="card-detail px-5 pb-5 space-y-2.5">
            <div className="h-px bg-slate-100 dark:bg-white/5 mb-3" />
            {marineElectricalSkills.map((skill, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                {skill}
              </div>
            ))}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['HV Systems', 'Dual Fuel', 'EcoEGR', 'SCR', 'AMS'].map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* IT & Software Card — compact + hover expand */}
        <div className="expand-card group dark-card rounded-2xl border border-slate-200 dark:border-indigo-900/30 bg-white shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-400 cursor-default">
          <div className="flex items-center gap-4 p-5">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">IT & Software Engineering</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Networking · Development · Consulting</p>
            </div>
            <ChevronDown className="card-arrow w-4 h-4 text-slate-400 shrink-0" />
          </div>

          <div className="card-detail px-5 pb-5 space-y-2.5">
            <div className="h-px bg-slate-100 dark:bg-white/5 mb-3" />
            {itSkills.map((skill, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                {skill}
              </div>
            ))}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['ES6+', 'Java', 'REST APIs', 'Next.js', 'Git'].map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
