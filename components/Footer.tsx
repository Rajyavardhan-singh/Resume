'use client';

import { personalInfo } from '../data/resumeData';
import ContactChips from './ContactChips';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--card)',
        marginTop: 'auto',
        transition: 'background 0.3s',
      }}
      className="py-1.5 sm:py-3.5"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3">

          {/* Identity */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <p style={{ color: 'var(--text-title)', fontSize: 12 }} className="sm:text-xs">
              Developed by <span style={{ fontWeight: 600 }}>{personalInfo.name}</span>
            </p>
            <span style={{ color: 'var(--text-faint)', fontSize: 10 }}>•</span>
            <p style={{ color: 'var(--text-muted)', fontSize: 11 }}>© {new Date().getFullYear()}</p>
          </div>

          {/* Contact Chips at Bottom App Bar */}
          <div className="transform scale-90 sm:scale-100 origin-center sm:origin-right">
            <ContactChips />
          </div>

        </div>
      </div>
    </footer>
  );
}
