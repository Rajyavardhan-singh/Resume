'use client';

import {
  Sparkles, GraduationCap, Briefcase,
  Ship, Zap, Terminal, Rocket, Compass, Globe,
  BookOpen, Calendar, Award,
  ChevronRight, FileText, ExternalLink,
  FolderOpen, Eye, Copy, Check
} from 'lucide-react';
import { useState } from 'react';
import {
  marineElectricalSkills, itSkills, activeLearningSkills,
  educationList, sailingExperience,
  onShoreExperience, internships
} from '../data/resumeData';

export type SectionId = 'education' | 'experience' | 'skills' | 'documents';

interface ExpandedProps {
  onOpenDoc?: (title: string, url: string) => void;
}

/* ─────────────────────────────────────────────────
   EXPANDED CONTENT PANELS
───────────────────────────────────────────────── */

export function EducationExpanded({ onOpenDoc }: ExpandedProps) {
  return (
    <div className="p-4 sm:p-7 flex flex-col gap-5 overflow-y-auto h-full">
      {educationList.map((edu, i) => (
        <div key={i}
          onClick={() => {
            if (edu.docUrl && onOpenDoc) {
              onOpenDoc(`${edu.program} - Document`, edu.docUrl);
            }
          }}
          style={{
            background: i === 0 ? 'var(--violet-soft)' : 'var(--coral-soft)',
            borderRadius: 18,
            cursor: edu.docUrl ? 'pointer' : 'default',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          }}
          className="p-4 sm:p-6 group hover:shadow-md"
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className={i === 0 ? 'icon-badge-violet' : 'icon-badge-coral'} style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0 }}>
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <p style={{ color: 'var(--text-title)', fontSize: 16, fontWeight: 700 }}>{edu.program}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 2 }}>{edu.institution}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {edu.badge && (
                <span className={i === 0 ? 'accent-violet-badge' : 'accent-coral-badge'} style={{ flexShrink: 0 }}>
                  {edu.badge}
                </span>
              )}
              {edu.docUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenDoc) onOpenDoc(`${edu.program} - Document`, edu.docUrl!);
                  }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: 'var(--card)', border: '1px solid var(--border)',
                    color: 'var(--text-title)', boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer', transition: 'all 0.18s ease',
                  }}
                  className="hover:scale-105"
                >
                  <FileText className="w-3.5 h-3.5" style={{ color: 'var(--violet)' }} />
                  Document
                </button>
              )}
            </div>
          </div>

          {/* Date with clearer, darker text color */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-title)', opacity: 0.88, fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
            <Calendar className="w-3.5 h-3.5" style={{ flexShrink: 0, color: 'var(--violet)' }} />
            {edu.period}
          </div>

          {edu.details && (
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.65 }} className="mobile-text-justify">{edu.details}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function ExperienceExpanded({ onOpenDoc }: ExpandedProps) {
  return (
    <div className="p-4 sm:p-7 flex flex-col gap-5 overflow-y-auto h-full">

      {/* ── Section 1 Header: Sailing Experience ── */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-[var(--border)]">
        <div className="w-3 h-3 rounded-full bg-[var(--violet)] shrink-0" />
        <h3 style={{ color: 'var(--text-title)', fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Sailing Experience (Maritime)
        </h3>
      </div>

      {/* Sailing Cards (MSC ROME) */}
      {sailingExperience.map((exp, i) => (
        <div key={i} style={{ background: 'var(--violet-soft)', borderRadius: 18 }} className="p-4 sm:p-6">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>

            {/* Left: Ship Icon + Ship Name + Capacity Badge right next to name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="icon-badge-violet" style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0 }}>
                <Ship className="w-4.5 h-4.5" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <p style={{ color: 'var(--text-title)', fontSize: 17, fontWeight: 800 }}>{exp.vessel}</p>
                  {/* Capacity placed right near ship's name */}
                  <span className="accent-violet-badge" style={{ fontSize: 11, padding: '2px 9px' }}>
                    {exp.capacity}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 2, fontWeight: 500 }}>
                  {exp.rank} · {exp.type}
                </p>
              </div>
            </div>

            {/* Right: Document & Appraisal Report Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>

              {/* MSC ROME Sea Service Certificate / Document Button */}
              {exp.docUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenDoc) onOpenDoc(`${exp.vessel} - Sea Service Document`, exp.docUrl!);
                  }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: 'var(--card)', border: '1px solid var(--border)',
                    color: 'var(--text-title)', boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer', transition: 'all 0.18s ease',
                  }}
                  className="hover:scale-105"
                >
                  <FileText className="w-3.5 h-3.5" style={{ color: 'var(--violet)' }} />
                  Document
                </button>
              )}

              {/* MSC ROME Appraisal Report Button */}
              {exp.appraisalUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenDoc) onOpenDoc(`${exp.vessel} - Appraisal Report`, exp.appraisalUrl!);
                  }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: 'var(--card)', border: '1px solid var(--border)',
                    color: 'var(--text-title)', boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer', transition: 'all 0.18s ease',
                  }}
                  className="hover:scale-105"
                >
                  <Award className="w-3.5 h-3.5" style={{ color: 'var(--violet)' }} />
                  Appraisal Report
                </button>
              )}

            </div>
          </div>

          {/* Date with clearer, darker text color */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-title)', opacity: 0.88, fontSize: 13.5, fontWeight: 600, marginBottom: 10 }}>
            <Calendar className="w-3.5 h-3.5" style={{ flexShrink: 0, color: 'var(--violet)' }} />
            {exp.period}
          </div>

          {exp.description && (
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.65, marginBottom: 12 }} className="mobile-text-justify">{exp.description}</p>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {exp.highlights.map(h => (
              <span key={h} className="skill-tag" style={{ fontSize: 12, padding: '3px 10px' }}>{h}</span>
            ))}
          </div>
        </div>
      ))}

      {/* ── Section 2 Header: On-Shore & Professional Experience ── */}
      <div className="flex items-center gap-2.5 pt-3 pb-2 border-b border-[var(--border)]">
        <div className="w-3 h-3 rounded-full bg-[var(--coral)] shrink-0" />
        <h3 style={{ color: 'var(--text-title)', fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          On-Shore & Professional Experience
        </h3>
      </div>

      {/* On-Shore Work Experience (Edureka) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {onShoreExperience.map((exp, i) => (
          <div key={i} style={{ background: 'var(--coral-soft)', borderRadius: 16 }} className="p-4 sm:p-5">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
              <div>
                <p style={{ color: 'var(--text-title)', fontSize: 15, fontWeight: 700 }}>{exp.company}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 1 }}>{exp.role}</p>
              </div>

              {/* Document Button for Edureka */}
              {exp.docUrl && (
                <button
                  onClick={() => {
                    if (onOpenDoc) onOpenDoc(`${exp.company} - Document`, exp.docUrl!);
                  }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '4px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 600,
                    background: 'var(--card)', border: '1px solid var(--border)',
                    color: 'var(--text-title)', boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer', transition: 'all 0.18s ease',
                  }}
                  className="hover:scale-105"
                >
                  <FileText className="w-3 h-3" style={{ color: 'var(--coral)' }} />
                  Document
                </button>
              )}
            </div>

            {/* Date with clearer, darker text color */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-title)', opacity: 0.88, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
              <Calendar className="w-3 h-3" style={{ flexShrink: 0, color: 'var(--coral)' }} />
              {exp.period}
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.55, marginBottom: 10 }} className="mobile-text-justify">{exp.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {exp.skillsUsed.slice(0, 3).map(s => (
                <span key={s} className="skill-tag-neutral" style={{ fontSize: 12, padding: '3px 9px' }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Internship (Tenco Systems) */}
      {internships.map((intern, i) => (
        <div key={i} style={{ background: 'var(--coral-soft)', borderRadius: 16 }} className="p-4 sm:p-5">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
            <div>
              <p style={{ color: 'var(--text-title)', fontSize: 15, fontWeight: 700 }}>{intern.company}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 1 }}>{intern.role}</p>
            </div>

            {/* Document Button for Tenco Systems */}
            {intern.docUrl && (
              <button
                onClick={() => {
                  if (onOpenDoc) onOpenDoc(`${intern.company} - Document`, intern.docUrl!);
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '4px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 600,
                  background: 'var(--card)', border: '1px solid var(--border)',
                  color: 'var(--text-title)', boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer', transition: 'all 0.18s ease',
                }}
                className="hover:scale-105"
              >
                <FileText className="w-3 h-3" style={{ color: 'var(--coral)' }} />
                Document
              </button>
            )}
          </div>

          {/* Date with clearer, darker text color */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-title)', opacity: 0.88, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            <Calendar className="w-3 h-3" style={{ flexShrink: 0, color: 'var(--coral)' }} />
            {intern.period}
          </div>

          {intern.description && (
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.55 }} className="mobile-text-justify">{intern.description}</p>
          )}
        </div>
      ))}

    </div>
  );
}

export function SkillsExpanded() {
  return (
    <div className="p-4 sm:p-7 flex flex-col gap-6 overflow-y-auto h-full">
      {/* Responsive Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Column 1: Marine Electrical */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="icon-badge-violet">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p style={{ color: 'var(--text-title)', fontSize: 16, fontWeight: 700 }}>Marine Electrical</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>STCW · ETO Certified</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {marineElectricalSkills.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div className="timeline-dot" style={{ marginTop: 7 }} />
                <span style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55 }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['HV Systems', 'Dual Fuel', 'EcoEGR', 'SCR', 'AMS'].map(t => (
              <span key={t} className="skill-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* Column 2: IT & Software */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="icon-badge-coral">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <p style={{ color: 'var(--text-title)', fontSize: 16, fontWeight: 700 }}>IT & Software</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Development · Networking</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {itSkills.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div className="timeline-dot" style={{ background: 'var(--coral)', marginTop: 7 }} />
                <span style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55 }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['ES6+', 'Java', 'Next.js', 'REST', 'Git'].map(t => (
              <span key={t} className="skill-tag-neutral">{t}</span>
            ))}
          </div>
        </div>

        {/* Column 3: Active Pursuits & Continuous Growth (Never Settles Mindset) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="icon-badge-violet" style={{ background: 'var(--coral-soft)', color: 'var(--coral)' }}>
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <p style={{ color: 'var(--text-title)', fontSize: 16, fontWeight: 700 }}>Continuous Growth</p>
              <p style={{ color: 'var(--coral)', fontSize: 13, fontWeight: 600, marginTop: 2 }}>Active Pursuits · Never Settles</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {activeLearningSkills.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div className="timeline-dot" style={{ background: 'var(--violet)', marginTop: 7 }} />
                <span style={{ color: 'var(--text-title)', fontSize: 14, fontWeight: i === 0 ? 700 : 500, lineHeight: 1.55 }}>
                  {s}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <span className="accent-coral-badge" style={{ fontSize: 12, padding: '3px 10px' }}>Constantly Evolving</span>
            <span className="skill-tag-neutral" style={{ fontSize: 12 }}>Self-Driven</span>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   DOCUMENTS EXPANDED
───────────────────────────────────────────────── */

function CopyBtn({ text, title }: { text: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={handle}
      title={title ?? `Copy ${text}`}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700,
        border: '1px solid var(--border)', background: 'var(--card)',
        color: copied ? '#16a34a' : 'var(--text-muted)',
        cursor: 'pointer', transition: 'all 0.18s ease', flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
      className="hover:scale-105"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy No.'}
    </button>
  );
}

function ViewBtn({ title, url, onOpenDoc }: { title: string; url: string; onOpenDoc?: (t: string, u: string) => void }) {
  return (
    <button
      onClick={() => onOpenDoc && onOpenDoc(title, url)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '4px 13px', borderRadius: 999, fontSize: 12, fontWeight: 700,
        background: 'var(--violet)', color: '#fff', border: 'none',
        cursor: 'pointer', transition: 'all 0.18s ease', flexShrink: 0,
        boxShadow: '0 2px 8px rgba(109,40,217,0.25)',
      }}
      className="hover:scale-105 hover:opacity-90"
    >
      <Eye className="w-3.5 h-3.5" />
      View
    </button>
  );
}

interface DocRowProps {
  name: string;
  docNumber?: string;   // show Copy button only when provided
  docTitle: string;
  url: string;
  onOpenDoc?: (title: string, url: string) => void;
}
function DocRow({ name, docNumber, docTitle, url, onOpenDoc }: DocRowProps) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, padding: '12px 14px', borderRadius: 14,
        background: 'var(--card)', border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
      }}
      className="hover:shadow-md hover:border-[var(--violet-soft)]"
    >
      {/* Left: icon + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
        <div
          style={{
            width: 34, height: 34, borderRadius: 9, background: 'var(--violet-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <FileText className="w-4 h-4" style={{ color: 'var(--violet)' }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ color: 'var(--text-title)', fontSize: 13.5, fontWeight: 700, lineHeight: 1.3 }}>
            {name}
          </p>
          {docNumber && (
            <p style={{ color: 'var(--text-muted)', fontSize: 11.5, marginTop: 2, fontWeight: 500 }}>
              No. {docNumber}
            </p>
          )}
        </div>
      </div>

      {/* Right: Copy + View (Column on mobile, Row on sm+) */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0">
        {docNumber && <CopyBtn text={docNumber} title={`Copy ${name} number`} />}
        {url && <ViewBtn title={docTitle} url={url} onOpenDoc={onOpenDoc} />}
      </div>
    </div>
  );
}

export function DocumentsExpanded({ onOpenDoc }: ExpandedProps) {
  return (
    <div className="p-4 sm:p-7 flex flex-col gap-7 overflow-y-auto h-full">

      {/* ── Section 1: Maritime Statutory Documents ── */}
      <div>
        <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border)] mb-4">
          <div className="w-3 h-3 rounded-full bg-[var(--violet)] shrink-0" />
          <h3 style={{ color: 'var(--text-title)', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Maritime Statutory Documents
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          <DocRow
            name="INDOS"
            docNumber="24EM1741"
            docTitle="INDOS Certificate (24EM1741)"
            url="https://drive.google.com/file/d/166XYju8u71Pra0NF_l6tae69sr-Np89m/view?usp=sharing"
            onOpenDoc={onOpenDoc}
          />
          <DocRow
            name="CDC"
            docNumber="MUM 573376"
            docTitle="CDC Document (MUM 573376)"
            url="https://drive.google.com/file/d/12yjm_1r7gl8E0--86ZasE4-cLA83BojE/view?usp=sharing"
            onOpenDoc={onOpenDoc}
          />
          <DocRow
            name="PASSPORT"
            docNumber="Y1684711"
            docTitle="Passport (Y1684711)"
            url="https://drive.google.com/file/d/12nlj9eG1bsJH7sAhEWoNKI2e3NZwcxdJ/view?usp=sharing"
            onOpenDoc={onOpenDoc}
          />
          <DocRow
            name="SID CARD"
            docNumber="M35049870"
            docTitle="Seafarer Identity Document (M35049870)"
            url="https://drive.google.com/file/d/1B5oobNZycLJHhZTecqtF2qu6bMARiGGk/view?usp=sharing"
            onOpenDoc={onOpenDoc}
          />
          <DocRow
            name="COC – MMD Exam Clearance"
            docTitle="COC - MMD Exam Clearance Document"
            url="https://drive.google.com/file/d/1at6UhdW-AOPEwT0Ow6XkQNGyMXRPSRSL/view?usp=sharing"
            onOpenDoc={onOpenDoc}
          />
        </div>
      </div>

      {/* ── Section 2: Education ── */}
      <div>
        <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border)] mb-4">
          <div className="w-3 h-3 rounded-full bg-[var(--coral)] shrink-0" />
          <h3 style={{ color: 'var(--text-title)', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Education
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {educationList.filter(e => e.docUrl).map((edu, i) => (
            <DocRow
              key={i}
              name={`${edu.program} `}
              docTitle={`${edu.program} - Document`}
              url={edu.docUrl!}
              onOpenDoc={onOpenDoc}
            />
          ))}
        </div>
      </div>

      {/* ── Section 3: Experience ── */}
      <div>
        <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border)] mb-4">
          <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
          <h3 style={{ color: 'var(--text-title)', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Experience
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          <DocRow
            name="MSC ROME – Sea Service Certificate"
            docTitle="MSC ROME - Sea Service Document"
            url="https://drive.google.com/file/d/1xTCxtZmr-tiGnOl1pETR7T4NuKCQVqky/view?usp=sharing"
            onOpenDoc={onOpenDoc}
          />
          <DocRow
            name="MSC ROME – Appraisal Report"
            docTitle="MSC ROME - Appraisal Report"
            url="https://drive.google.com/file/d/13rAKUgK2nZRpn8O3vRONzIACUXzuI2nq/view?usp=sharing"
            onOpenDoc={onOpenDoc}
          />
          {onShoreExperience.filter(e => e.docUrl).map((exp, i) => (
            <DocRow
              key={`onshore-${i}`}
              name={`${exp.role}`}
              docTitle={`${exp.company} - Document`}
              url={exp.docUrl!}
              onOpenDoc={onOpenDoc}
            />
          ))}
          {internships.filter(e => e.docUrl).map((intern, i) => (
            <DocRow
              key={`intern-${i}`}
              name={`${'Internship'}`}
              docTitle={`${intern.company} - Document`}
              url={intern.docUrl!}
              onOpenDoc={onOpenDoc}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────────
   CARD METADATA
───────────────────────────────────────────────── */
export const CARDS = [
  {
    id: 'education' as SectionId,
    icon: GraduationCap,
    title: 'Education',
    tagline: 'Academic & maritime credentials',
    stubAccent: 'coral' as const,
  },
  {
    id: 'experience' as SectionId,
    icon: Briefcase,
    title: 'Experience',
    tagline: 'Sea & shore career timeline',
    stubAccent: 'violet' as const,
  },
  {
    id: 'skills' as SectionId,
    icon: Sparkles,
    title: 'Skills',
    tagline: 'Marine systems, IT & active pursuits',
    stubAccent: 'violet' as const,
  },
  {
    id: 'documents' as SectionId,
    icon: FolderOpen,
    title: 'Documents',
    tagline: 'All certificates & records in one place',
    stubAccent: 'coral' as const,
  },
];

/* ─────────────────────────────────────────────────
   STUB CARDS COMPONENT
───────────────────────────────────────────────── */
interface SectionCardsProps {
  active: SectionId | null;
  onHover: (id: SectionId) => void;
}

export default function SectionCards({ active, onHover }: SectionCardsProps) {
  return (
    <div className={`section-cards-stub-row ${active ? 'dimmed' : ''}`}>
      {CARDS.map(card => {
        const Icon = card.icon;
        const isViolet = card.stubAccent === 'violet';
        return (
          <div
            key={card.id}
            className="stub-card group"
            onMouseEnter={() => {
              if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                onHover(card.id);
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              onHover(card.id);
            }}
            tabIndex={0}
            role="button"
            aria-label={`Open ${card.title} section`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div className={isViolet ? 'icon-badge-violet' : 'icon-badge-coral'}>
                <Icon className="w-5 h-5" />
              </div>
              <p style={{ color: 'var(--text-title)', fontSize: 20, fontWeight: 700 }}>
                {card.title}
              </p>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.5 }}>
              {card.tagline}
            </p>

            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-faint)', fontSize: 13, fontWeight: 500 }}>
              <span>Click to explore</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
