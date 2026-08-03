'use client';

import { X, Download, FileText } from 'lucide-react';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export function getEmbedUrl(url: string): string {
  if (!url) return '';
  if (url.includes('/file/d/')) {
    const fileId = url.split('/file/d/')[1]?.split('/')[0];
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }
  return url;
}

export function getDownloadUrl(url: string): string {
  if (!url) return '';
  if (url.includes('/file/d/')) {
    const fileId = url.split('/file/d/')[1]?.split('/')[0];
    if (fileId) {
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
  }
  return url;
}

export default function DocumentModal({ isOpen, onClose, title, url }: DocumentModalProps) {
  if (!isOpen || !url) return null;

  const embedUrl = getEmbedUrl(url);
  const downloadUrl = getDownloadUrl(url);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[85vh] sm:h-[88vh] bg-[var(--card)] border border-[var(--border)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--card)] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-[var(--violet-soft)] text-[var(--violet)] shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-title)] truncate">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Download Button */}
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-3.5 py-1.5 rounded-xl border border-[var(--border)] text-[var(--text-title)] bg-[var(--violet-soft)] hover:bg-[var(--violet)] hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm"
              title="Download document"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--coral)] hover:border-[var(--coral)] hover:bg-[var(--coral-soft)] transition-colors"
              title="Close document viewer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded Document Frame */}
        <div className="flex-1 w-full h-full bg-slate-900/5 dark:bg-black/40 relative">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}
