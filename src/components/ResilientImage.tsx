import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-emerald-100 p-6 text-center ${className}`}
      >
        <ShieldCheck className="w-10 h-10 text-emerald-400 mb-3 opacity-80" />
        <span className="text-sm font-bold tracking-tight text-white">
          {fallbackTitle || alt}
        </span>
        <span className="text-xs text-emerald-300/80 mt-1">
          شركة الشهباء التجارية — جودة معتمدة
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
