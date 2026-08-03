'use client';

import { useState, useRef, useEffect } from 'react';

interface ProfileImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export default function ProfileImage({
  src = '/profile.jpg',
  alt,
  className = 'w-20 h-20 sm:w-[138px] sm:h-[138px]',
}: ProfileImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden shrink-0 rounded-2xl sm:rounded-3xl bg-[var(--violet-soft)] border border-[var(--border)] shadow-md ${className}`}
    >
      {/* Skeleton while loading */}
      {!loaded && !error && (
        <div className="skeleton absolute inset-0 rounded-2xl sm:rounded-3xl" />
      )}

      {/* Actual image */}
      {!error && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Fallback initials badge on image load error */}
      {error && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#6C4CF5] via-[#4F3AD4] to-[#F14E3D] flex items-center justify-center text-white text-2xl sm:text-4xl font-black select-none"
        >
          R
        </div>
      )}
    </div>
  );
}
