'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SectionCards, {
  CARDS,
  SectionId,
  EducationExpanded,
  ExperienceExpanded,
  SkillsExpanded,
  DocumentsExpanded,
} from '../components/SectionCards';
import Footer from '../components/Footer';
import DocumentModal from '../components/DocumentModal';

interface ExpandedBodyProps {
  active: SectionId | null;
  onOpenDoc: (title: string, url: string) => void;
}

/* Map section IDs → expanded panel */
function ExpandedBody({ active, onOpenDoc }: ExpandedBodyProps) {
  if (active === 'education')  return <EducationExpanded onOpenDoc={onOpenDoc} />;
  if (active === 'experience') return <ExperienceExpanded onOpenDoc={onOpenDoc} />;
  if (active === 'skills')     return <SkillsExpanded />;
  if (active === 'documents')  return <DocumentsExpanded onOpenDoc={onOpenDoc} />;
  return null;
}

export default function Home() {
  const [active, setActive] = useState<SectionId | null>(null);
  const [docModal, setDocModal] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: '',
    url: '',
  });

  const scrollableRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Keep last-active so the panel stays visible during close animation */
  const lastActive = useRef<SectionId | null>(null);
  if (active) lastActive.current = active;

  const displayed     = active ?? lastActive.current;
  const displayedCard = CARDS.find(c => c.id === displayed);

  /* Handle deep-linking via URL parameter (?section=documents, ?documents) or hash (#documents) */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const sectionParam = urlParams.get('section') || urlParams.get('tab');
    const hashParam = window.location.hash.replace('#', '').toLowerCase();

    const validSections: SectionId[] = ['education', 'experience', 'skills', 'documents'];

    let targetSection: SectionId | null = null;

    if (sectionParam && validSections.includes(sectionParam as SectionId)) {
      targetSection = sectionParam as SectionId;
    } else if (hashParam && validSections.includes(hashParam as SectionId)) {
      targetSection = hashParam as SectionId;
    } else if (urlParams.has('documents')) {
      targetSection = 'documents';
    } else if (urlParams.has('education')) {
      targetSection = 'education';
    } else if (urlParams.has('experience')) {
      targetSection = 'experience';
    } else if (urlParams.has('skills')) {
      targetSection = 'skills';
    }

    if (targetSection) {
      setActive(targetSection);
    }
  }, []);

  const close = () => {
    setActive(null);
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleSelectCard = (id: SectionId) => {
    setActive(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`);
    }
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = 0;
    }
    // Smooth scroll to top of overlay on mobile
    setTimeout(() => {
      if (window.innerWidth < 768 && overlayRef.current) {
        overlayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  /* Prevent accidental instant close on mouse leave (ignored on touch screens) */
  const handleMouseLeaveOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = e;
    // Only close if mouse truly exited the bounding box
    if (
      clientX <= rect.left + 2 ||
      clientX >= rect.right - 2 ||
      clientY <= rect.top + 2 ||
      clientY >= rect.bottom - 2
    ) {
      setActive(null);
    }
  };

  const handleOpenDoc = (title: string, url: string) => {
    setDocModal({ isOpen: true, title, url });
  };

  const handleCloseDoc = () => {
    setDocModal(prev => ({ ...prev, isOpen: false }));
  };

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef   = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    touchEndRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const diffX = touchStartRef.current.x - touchEndRef.current.x;
    const diffY = touchStartRef.current.y - touchEndRef.current.y;

    // Ensure horizontal swipe is dominant and exceeds 40px threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      const sectionOrder: SectionId[] = ['education', 'experience', 'skills', 'documents'];
      const currentSection = active ?? lastActive.current;
      if (!currentSection) return;

      const currentIndex = sectionOrder.indexOf(currentSection);
      if (currentIndex === -1) return;

      if (diffX > 0) {
        // Swipe Left -> Next Section (e.g. Education -> Experience -> Skills)
        const nextIndex = (currentIndex + 1) % sectionOrder.length;
        handleSelectCard(sectionOrder[nextIndex]);
      } else {
        // Swipe Right -> Previous Section (e.g. Skills -> Experience -> Education)
        const prevIndex = (currentIndex - 1 + sectionOrder.length) % sectionOrder.length;
        handleSelectCard(sectionOrder[prevIndex]);
      }
    }

    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">

        {/* CONTENT ZONE */}
        <div style={{ position: 'relative' }}>

          {/* Hero */}
          <HeroSection onOpenDoc={handleOpenDoc} />

          {/* Gap */}
          <div className="h-4 sm:h-6" />

          {/* Three stub cards */}
          <SectionCards active={active} onHover={handleSelectCard} />

          {/* ── Full-height expanded overlay ───────────────── */}
          <div
            ref={overlayRef}
            className={`expanded-overlay ${active ? 'visible' : ''}`}
            onMouseLeave={handleMouseLeaveOverlay}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {displayedCard && (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                {/* ── Header bar ─────────────────────────── */}
                <div className="p-3.5 sm:p-5 border-b border-[var(--border)] shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--card)]">
                  
                  {/* Left: Icon + Title & Subtitle */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    <div className={displayedCard.stubAccent === 'violet' ? 'icon-badge-violet' : 'icon-badge-coral'} style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10 }}>
                      <displayedCard.icon className="w-4.5 h-4.5" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ color: 'var(--text-title)', fontSize: 17, fontWeight: 800, lineHeight: 1.2 }} className="sm:text-lg">
                        {displayedCard.title}
                      </p>
                      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }} className="truncate">
                        {displayedCard.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Right: pills + X — pills scroll on mobile, X always visible */}
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 w-full sm:w-auto pt-0.5 sm:pt-0">

                    {/* Scrollable pill strip — overflow-x-auto on mobile */}
                    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto flex-1 sm:flex-none pb-0.5 sm:pb-0 scrollbar-hide">
                      {CARDS.map(c => (
                        <button
                          key={c.id}
                          onMouseEnter={() => {
                            if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                              setActive(c.id);
                            }
                          }}
                          onClick={() => handleSelectCard(c.id)}
                          style={{
                            padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                            cursor: 'pointer', border: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0,
                            background: c.id === (active ?? lastActive.current)
                              ? 'var(--violet)'
                              : 'var(--violet-soft)',
                            color: c.id === (active ?? lastActive.current)
                              ? '#fff'
                              : 'var(--violet)',
                          }}
                          className="sm:!px-4 sm:!py-1.5 sm:!text-xs"
                        >
                          {c.title}
                        </button>
                      ))}
                    </div>

                    {/* Close / X button — always visible, never inside scroll */}
                    <button
                      onClick={close}
                      aria-label="Close panel"
                      style={{
                        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.05)', border: '1px solid var(--border)',
                        color: 'var(--text-muted)', cursor: 'pointer',
                      }}
                      className="hover:bg-coral-soft hover:text-coral hover:border-coral sm:!w-8 sm:!h-8"
                    >
                      <X className="w-4 h-4" />
                    </button>

                  </div>

                </div>

                {/* ── Scrollable body ─────────────────────── */}
                <div ref={scrollableRef} style={{ flex: 1, overflow: 'auto' }}>
                  <ExpandedBody active={active ?? lastActive.current} onOpenDoc={handleOpenDoc} />
                </div>

              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />

      {/* ── Document Modal Popup ── */}
      <DocumentModal
        isOpen={docModal.isOpen}
        onClose={handleCloseDoc}
        title={docModal.title}
        url={docModal.url}
      />
    </div>
  );
}
