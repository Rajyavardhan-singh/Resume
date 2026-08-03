'use client';

import { useState, useRef, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { Anchor, Menu, X, Contact } from 'lucide-react';
import ContactChips from './ContactChips';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showContactPopover, setShowContactPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowContactPopover(false);
      }
    }
    if (showContactPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showContactPopover]);

  return (
    <header className="navbar sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" style={{ textDecoration: 'none' }}>
            <div
              style={{
                width: 32, height: 32, borderRadius: 10,
                background: 'var(--violet)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', boxShadow: '0 4px 12px rgba(108,76,245,0.35)',
                transition: 'transform 0.2s',
              }}
              className="group-hover:scale-105"
            >
              <Anchor className="w-4 h-4" />
            </div>
            <div>
              <p style={{ color: 'var(--text-title)', fontSize: 13, fontWeight: 700, lineHeight: 1.1, letterSpacing: '0.18em' }}>
                RESUME
              </p>
            </div>
          </a>

          {/* Right actions — desktop */}
          <div className="hidden md:flex items-center gap-2.5 relative" ref={popoverRef}>

            {/* Contact Click-to-Toggle Button */}
            <button
              onClick={() => setShowContactPopover(!showContactPopover)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 9, fontSize: 13, fontWeight: 600,
                color: showContactPopover ? '#fff' : 'var(--text-title)',
                background: showContactPopover ? 'var(--violet)' : 'var(--card)',
                border: showContactPopover ? '1px solid var(--violet)' : '1px solid var(--border)',
                cursor: 'pointer',
                boxShadow: showContactPopover ? '0 4px 14px rgba(108,76,245,0.35)' : 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
              }}
              className="hover:border-[var(--violet)]"
            >
              <Contact className={`w-4 h-4 ${showContactPopover ? 'text-white' : 'text-[var(--violet)]'}`} />
              Contact
            </button>

            {/* Popover window — stays open until clicked again or clicked outside */}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 10,
                padding: 16,
                borderRadius: 18,
                background: 'var(--card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lift)',
                opacity: showContactPopover ? 1 : 0,
                transform: showContactPopover ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.96)',
                pointerEvents: showContactPopover ? 'auto' : 'none',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                zIndex: 60,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, gap: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Contact
                </div>
                <button
                  onClick={() => setShowContactPopover(false)}
                  style={{
                    padding: 3, borderRadius: 6, border: 'none', background: 'rgba(0,0,0,0.05)',
                    color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  }}
                  className="hover:bg-coral-soft hover:text-coral"
                  aria-label="Close contact popover"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <ContactChips />
            </div>

            <ThemeToggle />
          </div>

          {/* Mobile row */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              style={{ padding: '6px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text-title)' }}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '14px 16px', background: 'var(--card)' }} className="md:hidden">
          <ContactChips />
        </div>
      )}
    </header>
  );
}
