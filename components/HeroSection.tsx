'use client';

import { useState, useRef, useEffect } from 'react';
import ProfileImage from './ProfileImage';
import { personalInfo } from '../data/resumeData';
import {
  Copy, Check, FileText, ShieldCheck, FileCheck, Award, Compass
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDoc?: (title: string, url: string) => void;
}

/* ── Icon-only action button ──────────────────── */
interface IconButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  href?: string;
  color?: string;
  hoverBg?: string;
}

function IconButton({ icon, title, onClick, href, color, hoverBg }: IconButtonProps) {
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    height: 26,
    borderRadius: 8,
    border: 'none',
    background: 'transparent',
    color: color ?? 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    textDecoration: 'none',
  };

  const handleHover = (e: React.MouseEvent<HTMLElement>, enter: boolean) => {
    const target = e.currentTarget as HTMLElement;
    target.style.background = enter ? (hoverBg ?? 'var(--violet-soft)') : 'transparent';
    target.style.transform = enter ? 'scale(1.1)' : 'scale(1)';
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        aria-label={title}
        style={style}
        onMouseEnter={e => handleHover(e, true)}
        onMouseLeave={e => handleHover(e, false)}
      >
        {icon}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      style={style}
      onMouseEnter={e => handleHover(e, true)}
      onMouseLeave={e => handleHover(e, false)}
    >
      {icon}
    </button>
  );
}

/* ── Copy icon button with feedback ───────────── */
interface CopyIconButtonProps {
  text: string;
  title?: string;
  color?: string;
  hoverBg?: string;
  onCopyClick?: () => void;
}

function CopyIconButton({ text, title = 'Copy', color, hoverBg, onCopyClick }: CopyIconButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    if (onCopyClick) {
      onCopyClick();
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <IconButton
      icon={copied ? <Check className="w-3.5 h-3.5" style={{ color: '#22c55e' }} /> : <Copy className="w-3.5 h-3.5" />}
      title={copied ? 'Copied to clipboard!' : title}
      onClick={handleCopy}
      color={copied ? '#22c55e' : (color ?? 'var(--text-muted)')}
      hoverBg={copied ? 'rgba(34, 197, 94, 0.15)' : hoverBg}
    />
  );
}

/* ── Permanently Expanded Green COC Badge ───────── */
interface CocBadgeProps {
  onOpenDoc?: (title: string, url: string) => void;
  fontSize?: string;
  padding?: string;
}

function CocBadge({ onOpenDoc, fontSize = '12px', padding = '5px 12px' }: CocBadgeProps) {
  const cocDocUrl = "https://drive.google.com/file/d/1at6UhdW-AOPEwT0Ow6XkQNGyMXRPSRSL/view?usp=sharing";

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'rgba(34, 197, 94, 0.12)',
        color: '#16a34a',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: 16,
        padding: padding,
        fontSize: fontSize,
        fontWeight: 700,
        flexWrap: 'wrap',
        maxWidth: '100%',
      }}
      className="dark:!bg-emerald-500/15 dark:!text-emerald-400 dark:!border-emerald-500/30 select-none shrink-0 sm:!rounded-full"
    >
      <span className="flex items-center gap-1.5 shrink-0 font-extrabold">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        COC:
      </span>

      <span style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--text-title)' }} className="opacity-90 leading-tight">
        Cleared the exams, Dispatching Soon from MMD
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (onOpenDoc) {
            onOpenDoc('COC - MMD Exam Clearance Document', cocDocUrl);
          } else {
            window.open(cocDocUrl, '_blank');
          }
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '3px 9px',
          borderRadius: 999,
          fontSize: '11px',
          fontWeight: 700,
          background: '#16a34a',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(22, 163, 74, 0.35)',
          transition: 'transform 0.15s ease, background-color 0.15s ease',
        }}
        className="hover:scale-105 hover:bg-emerald-600 shrink-0"
      >
        <FileText className="w-3 h-3" />
        Document
      </button>
    </div>
  );
}

/* ── Credentials Definitions ──────────────────── */
interface CredentialItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  number: string;
  details: string[];
  docTitle: string;
  docUrl: string;
  accentColor: string;
}

const MARITIME_CREDENTIALS: CredentialItem[] = [
  {
    id: 'indos',
    icon: <Compass className="w-4 h-4" />,
    label: 'INDOS',
    number: '24EM1741',
    details: [],
    docTitle: 'INDOS Certificate (24EM1741)',
    docUrl: 'https://drive.google.com/file/d/166XYju8u71Pra0NF_l6tae69sr-Np89m/view?usp=sharing',
    accentColor: 'var(--violet)',
  },
  {
    id: 'cdc',
    icon: <ShieldCheck className="w-4 h-4" />,
    label: 'CDC',
    number: 'MUM 573376',
    details: ['Valid Upto - 04/11/2034'],
    docTitle: 'CDC Document (MUM 573376)',
    docUrl: 'https://drive.google.com/file/d/12yjm_1r7gl8E0--86ZasE4-cLA83BojE/view?usp=sharing',
    accentColor: 'var(--violet)',
  },
  {
    id: 'passport',
    icon: <FileCheck className="w-4 h-4" />,
    label: 'Passport',
    number: 'Y1684711',
    details: ['Valid Upto - 17/04/2034', '· US Visa Valid Upto - 29/01/2031'],
    docTitle: 'Passport & US Visa Document (Y1684711)',
    docUrl: 'https://drive.google.com/file/d/12nlj9eG1bsJH7sAhEWoNKI2e3NZwcxdJ/view?usp=sharing',
    accentColor: 'var(--coral)',
  },
  {
    id: 'sid',
    icon: <Award className="w-4 h-4" />,
    label: 'SID',
    number: 'M35049870',
    details: ['Valid Upto - 17/12/2034'],
    docTitle: 'Seafarer Identity Document - SID (M35049870)',
    docUrl: 'https://drive.google.com/file/d/1B5oobNZycLJHhZTecqtF2qu6bMARiGGk/view?usp=sharing',
    accentColor: '#16a34a',
  },
];

/* ── Main Hero Section ────────────────────────── */
export default function HeroSection({ onOpenDoc }: HeroSectionProps) {
  const [activeCredId, setActiveCredId] = useState<string | null>(null);
  const credsRef = useRef<HTMLDivElement>(null);

  const activeCred = MARITIME_CREDENTIALS.find(c => c.id === activeCredId);

  /* Close expanded credential tile when clicking / tapping outside */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (credsRef.current && !credsRef.current.contains(event.target as Node)) {
        setActiveCredId(null);
      }
    }
    if (activeCredId) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeCredId]);

  const handleCredMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setActiveCredId(null);
    }
  };

  return (
    <section id="hero">
      <div className="hero-card p-4 sm:p-8 relative overflow-hidden transition-all duration-300">

        {/* Background Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(108,76,245,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Violet glow */}
        <div
          style={{
            position: 'absolute', top: -60, right: -60,
            width: 240, height: 240, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(108,76,245,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-3 sm:gap-6">

          {/* ── Mobile Only: Name at the very top spanning full width ── */}
          <div className="block sm:hidden w-full pb-1">
            <h1
              style={{
                color: 'var(--text-title)',
                fontSize: '21px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {personalInfo.name}
            </h1>
          </div>

          {/* Image & Badges block on Mobile */}
          <div className="flex flex-row items-start gap-3.5 sm:gap-6 w-full sm:w-auto">
            <ProfileImage
              src="/profile.jpg"
              alt="Rajyavardhan Singh Rathore"
              className="w-24 h-24 sm:w-[138px] sm:h-[138px] shrink-0"
            />

            {/* Mobile Badges Column */}
            <div className="block sm:hidden flex-1 min-w-0 space-y-2">
              {/* ELECTRICAL CADET (TEO) Badge - styled clean like COC card */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 11px',
                  borderRadius: 14,
                  fontSize: '11px',
                  fontWeight: 700,
                  background: 'var(--violet-soft)',
                  color: 'var(--violet)',
                  border: '1px solid rgba(108,76,245,0.25)',
                  maxWidth: '100%',
                  flexWrap: 'wrap',
                }}
                className="shrink-0 select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--violet)] shrink-0" />
                <span>ELECTRICAL CADET (TEO)</span>
              </div>

              {/* COC Badge */}
              <CocBadge onOpenDoc={onOpenDoc} fontSize="11px" padding="4px 9px" />
            </div>
          </div>

          {/* Details & Info block */}
          <div className="flex-1 min-w-0 space-y-3.5 sm:space-y-4 w-full">

            {/* Name & Badge on Desktop Only */}
            <div className="hidden sm:block space-y-2.5">
              <h1
                style={{
                  color: 'var(--text-title)',
                  fontSize: 'clamp(22px, 4vw, 32px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {personalInfo.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <span className="accent-violet-badge">ELECTRICAL CADET (TEO)</span>
                <CocBadge onOpenDoc={onOpenDoc} />
              </div>
            </div>

            {/* Summary */}
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, maxWidth: 640 }} className="sm:text-base mobile-text-justify">
              {personalInfo.summary}
            </p>

            {/* ── Maritime Identity Credentials Chips ── */}
            <div
              ref={credsRef}
              className="relative pt-1"
              onMouseLeave={handleCredMouseLeave}
            >

              {/* Base row of resting chips */}
              <div className="credential-chips-row">

                {/* INDOS, CDC, Passport, SID stub chips (With Hover/Click Expanded View) */}
                {MARITIME_CREDENTIALS.map(cred => {
                  const isActive = activeCredId === cred.id;
                  const chipHoverBg = cred.id === 'sid' ? 'rgba(22, 163, 74, 0.15)' : cred.id === 'passport' ? 'var(--coral-soft)' : 'var(--violet-soft)';
                  return (
                    <div
                      key={cred.id}
                      onMouseEnter={() => {
                        if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                          setActiveCredId(cred.id);
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCredId(isActive ? null : cred.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 4,
                        padding: '4px 8px',
                        borderRadius: 14,
                        fontSize: 12,
                        fontWeight: 600,
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-sm)',
                        color: 'var(--text-title)',
                        height: 34,
                        cursor: 'pointer',
                        transition: 'opacity 0.15s ease',
                        visibility: isActive ? 'hidden' : 'visible',
                        opacity: isActive ? 0 : 1,
                      }}
                      className="w-full select-none shrink-0 group hover:border-[var(--violet)]"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span style={{ color: cred.accentColor, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                          {cred.icon}
                        </span>
                        <span style={{ color: cred.accentColor, fontWeight: 700, flexShrink: 0 }}>
                          {cred.label}:
                        </span>
                        <span style={{ fontWeight: 700 }} className="select-all truncate">
                          {cred.number}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <div style={{ width: 1, height: 14, background: 'var(--border)' }} />
                        <CopyIconButton
                          text={cred.number}
                          title={`Copy ${cred.label} number`}
                          color={cred.accentColor}
                          hoverBg={chipHoverBg}
                          onCopyClick={() => setActiveCredId(cred.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── Centered Expanded Tile Overlay (Responsive for mobile screens) ── */}
              {activeCred && (
                <div
                  onMouseLeave={handleCredMouseLeave}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 50,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 14px',
                    borderRadius: 16,
                    fontSize: 12.5,
                    fontWeight: 600,
                    background: 'var(--card)',
                    border: `1.5px solid ${activeCred.accentColor}`,
                    boxShadow: 'var(--shadow-lift)',
                    color: 'var(--text-title)',
                    width: 'max-content',
                    maxWidth: 'calc(100vw - 32px)',
                    flexWrap: 'wrap',
                    animation: 'fadeInScale 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  className="select-none"
                >
                  {/* Icon + Label + Number */}
                  <span style={{ color: activeCred.accentColor, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {activeCred.icon}
                  </span>
                  <span style={{ color: activeCred.accentColor, fontWeight: 700, flexShrink: 0 }}>
                    {activeCred.label}:
                  </span>
                  <span style={{ fontWeight: 700, flexShrink: 0 }} className="select-all">
                    {activeCred.number}
                  </span>

                  {/* Copy button */}
                  <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    <CopyIconButton text={activeCred.number} title={`Copy ${activeCred.label} number`} />
                  </div>

                  {/* Divider */}
                  <div style={{ width: 1, height: 14, background: 'var(--border)', margin: '0 2px', flexShrink: 0 }} />

                  {/* Details */}
                  {activeCred.details.map((d, idx) => (
                    <span key={idx} style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>
                      {d}
                    </span>
                  ))}

                  {/* Document button opening popup modal */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenDoc) {
                        onOpenDoc(activeCred.docTitle, activeCred.docUrl);
                      } else {
                        window.open(activeCred.docUrl, '_blank');
                      }
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '3px 10px',
                      borderRadius: 999,
                      fontSize: '11px',
                      fontWeight: 700,
                      background: activeCred.accentColor,
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: `0 2px 8px ${activeCred.accentColor}55`,
                      transition: 'transform 0.15s ease, opacity 0.15s ease',
                    }}
                    className="hover:scale-105 hover:opacity-90 shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Document
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
