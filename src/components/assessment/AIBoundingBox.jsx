import { useState, useEffect } from 'react';

const SEVERITY_COLORS = {
  minor: { border: 'border-emerald-400', bg: 'bg-emerald-500', text: 'text-emerald-100' },
  moderate: { border: 'border-amber-400', bg: 'bg-amber-500', text: 'text-amber-100' },
  major: { border: 'border-red-400', bg: 'bg-red-500', text: 'text-red-100' },
  critical: { border: 'border-red-600', bg: 'bg-red-700', text: 'text-red-100' },
};

export default function AIBoundingBox({ boundingBoxes = [], scanning = false }) {
  const [showBoxes, setShowBoxes] = useState(!scanning);

  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => setShowBoxes(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [scanning]);

  return (
    <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Simulated vehicle damage image placeholder */}
      <div
        className="w-full h-48 sm:h-64 relative"
        style={{
          background: 'linear-gradient(135deg, #475569 0%, #334155 40%, #1e293b 100%)',
        }}
      >
        {/* Car silhouette */}
        <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="xMidYMid meet">
          <path d="M60,140 L80,100 L120,80 L180,75 L250,75 L310,80 L340,100 L360,140 L350,150 L50,150 Z" fill="white" />
          <circle cx="110" cy="155" r="20" fill="white" />
          <circle cx="300" cy="155" r="20" fill="white" />
          <rect x="130" y="85" width="50" height="30" rx="3" fill="rgba(255,255,255,0.3)" />
          <rect x="220" y="85" width="50" height="30" rx="3" fill="rgba(255,255,255,0.3)" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/30 text-sm font-medium tracking-wider uppercase">Vehicle Damage Photo</p>
        </div>

        {/* Scan line */}
        {scanning && !showBoxes && (
          <div className="absolute left-0 right-0 h-[3px] bg-brand-400/80 scan-line shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
        )}

        {/* Bounding boxes */}
        {showBoxes &&
          boundingBoxes.map((box, i) => {
            const severity = SEVERITY_COLORS[box.severity] || SEVERITY_COLORS.moderate;
            return (
              <div
                key={i}
                className={`absolute border-2 ${severity.border} rounded-sm transition-all duration-500`}
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.w}%`,
                  height: `${box.h}%`,
                  opacity: showBoxes ? 1 : 0,
                  transitionDelay: `${i * 200}ms`,
                }}
              >
                <span
                  className={`absolute -top-5 left-0 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded ${severity.bg} ${severity.text} whitespace-nowrap`}
                >
                  {box.label}
                </span>
                {/* Corner markers */}
                <div className={`absolute -top-[3px] -left-[3px] w-2 h-2 ${severity.bg}`} />
                <div className={`absolute -top-[3px] -right-[3px] w-2 h-2 ${severity.bg}`} />
                <div className={`absolute -bottom-[3px] -left-[3px] w-2 h-2 ${severity.bg}`} />
                <div className={`absolute -bottom-[3px] -right-[3px] w-2 h-2 ${severity.bg}`} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
