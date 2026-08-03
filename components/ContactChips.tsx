'use client';

import { useState } from 'react';
import { personalInfo } from '../data/resumeData';
import { Mail, Phone, Copy, Check, Send, PhoneCall } from 'lucide-react';

/* Authentic WhatsApp SVG Logo */
function WhatsAppIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

function IconButton({ icon, title, onClick, href, color, hoverBg }: {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  href?: string;
  color?: string;
  hoverBg?: string;
}) {
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 7,
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

function CopyIconButton({ text, title = 'Copy' }: { text: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <IconButton
      icon={copied ? <Check className="w-3.5 h-3.5" style={{ color: '#22c55e' }} /> : <Copy className="w-3.5 h-3.5" />}
      title={copied ? 'Copied to clipboard!' : title}
      onClick={handleCopy}
      color={copied ? '#22c55e' : 'var(--text-muted)'}
      hoverBg={copied ? 'rgba(34, 197, 94, 0.15)' : undefined}
    />
  );
}

export default function ContactChips() {
  const whatsappNumber = personalInfo.phone.replace(/\D/g, '');

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {/* Email Chip */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 py-1 px-2.5 sm:py-1.5 sm:px-3.5 rounded-xl text-xs sm:text-sm font-medium bg-[var(--card)] border border-[var(--border)] shadow-sm text-[var(--text-title)] max-w-full overflow-hidden">
        <span style={{ color: 'var(--violet)', display: 'flex', alignItems: 'center' }}>
          <Mail className="w-3.5 h-3.5" />
        </span>
        <span className="select-all truncate">{personalInfo.email}</span>

        <div style={{ width: 1, height: 14, background: 'var(--border)', margin: '0 1px' }} />

        <CopyIconButton text={personalInfo.email} title="Copy email address" />
        <IconButton
          icon={<Send className="w-3.5 h-3.5" />}
          title="Send Email"
          href={`mailto:${personalInfo.email}`}
          color="var(--violet)"
        />
      </div>

      {/* Phone Chip */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 py-1 px-2.5 sm:py-1.5 sm:px-3.5 rounded-xl text-xs sm:text-sm font-medium bg-[var(--card)] border border-[var(--border)] shadow-sm text-[var(--text-title)] max-w-full overflow-hidden">
        <span style={{ color: 'var(--coral)', display: 'flex', alignItems: 'center' }}>
          <Phone className="w-3.5 h-3.5" />
        </span>
        <span className="select-all truncate">{personalInfo.phone}</span>

        <div style={{ width: 1, height: 14, background: 'var(--border)', margin: '0 1px' }} />

        <CopyIconButton text={personalInfo.phone} title="Copy phone number" />
        <IconButton
          icon={<PhoneCall className="w-3.5 h-3.5" />}
          title="Dial phone number"
          href={`tel:${personalInfo.phone}`}
          color="var(--coral)"
          hoverBg="var(--coral-soft)"
        />
        <IconButton
          icon={<WhatsAppIcon className="w-3.5 h-3.5" />}
          title="Chat on WhatsApp"
          href={`https://wa.me/${whatsappNumber}`}
          color="#25D366"
          hoverBg="rgba(37, 211, 102, 0.15)"
        />
      </div>
    </div>
  );
}
