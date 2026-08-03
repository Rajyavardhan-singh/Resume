'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  if (!mounted) return <div style={{ width: 34, height: 34 }} />;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle Theme"
      style={{
        width: 34, height: 34, borderRadius: 9,
        border: '1px solid var(--border)',
        background: 'var(--card)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-sm)',
        transition: 'background 0.2s, transform 0.15s',
        color: dark ? '#f5c842' : 'var(--text-muted)',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {dark
        ? <Sun className="w-4 h-4" />
        : <Moon className="w-4 h-4" />
      }
    </button>
  );
}
