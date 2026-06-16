import React from 'react';
import { ProjectVibeType, Language, translations } from '../types';

interface LivePreviewProps {
  colors: string[];
  vibe: ProjectVibeType;
  lang: Language;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ colors, vibe, lang }) => {
  const t = translations[lang];

  // Assign semantic roles to the 5 colors in the palette
  const c0 = colors[0] || "#2d3748"; // Main Accent / Primary Exterior
  const c1 = colors[1] || "#4a5568"; // Secondary Surface / Contrast Accent
  const c2 = colors[2] || "#718096"; // Detail highlight / Secondary details
  const c3 = colors[3] || "#a0aec0"; // Vivid Accent / Light emission / Glowing parts
  const c4 = colors[4] || "#e2e8f0"; // Ambient Trim / Background / Contrast pop

  return (
    <div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-display font-medium tracking-tight text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 pulse-glow"></span>
            {t.previewTitle}
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            {lang === 'en' 
              ? 'Watch how the current color combination renders across different design products.'
              : '即時看配色如何在不同設計品類（居家、跑車、精品錶、介面）中展現。'}
          </p>
        </div>
        
        {/* Style selection indicator status */}
        <div className="flex items-center gap-2 px-3 h-8 bg-neutral-800/80 border border-neutral-700 rounded-lg text-xs font-mono text-indigo-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          {vibe === 'home' && t.previewCouch}
          {vibe === 'automotive' && t.previewCar}
          {vibe === 'watches' && t.previewWatch}
          {vibe === 'web' && t.previewWeb}
        </div>
      </div>

      <div className="w-full min-h-[320px] bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-6 flex items-center justify-center relative overflow-hidden">
        
        {/* Dynamic Background subtle ambient lighting glow using the first and fourth colors */}
        <div 
          className="absolute inset-0 opacity-15 blur-[120px] pointer-events-none transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${c0} 0%, ${c3} 50%, transparent 100%)`
          }}
        />

        {/* 1. HOME INTERIOR VECTOR PREVIEW */}
        {vibe === 'home' && (
          <div className="w-full max-w-lg aspect-video flex flex-col justify-end items-center relative gap-2 animate-fade-in">
            {/* Wall Painting Artwork */}
            <div className="absolute top-4 left-1/4 w-24 h-32 rounded-md border border-neutral-800 bg-neutral-900 p-2 flex flex-col gap-1.5 shadow-xl">
              <div className="w-full h-1/2 rounded" style={{ backgroundColor: c0 }} />
              <div className="w-4/5 h-2 rounded" style={{ backgroundColor: c1 }} />
              <div className="w-2/3 h-2 rounded" style={{ backgroundColor: c3 }} />
              <div className="w-1/2 h-2 rounded" style={{ backgroundColor: c2 }} />
            </div>

            {/* Contemporary Floor Lamp */}
            <div className="absolute top-6 right-16 flex flex-col items-center">
              {/* Lamp Shade Glow aura */}
              <div 
                className="w-16 h-16 rounded-full blur-md opacity-70 transition-all duration-300"
                style={{ backgroundColor: c3 }}
              />
              {/* Lamp shade */}
              <div className="w-10 h-7 rounded-t-xl -mt-12 transition-all duration-300" style={{ backgroundColor: c2 }} />
              {/* Stand */}
              <div className="w-0.5 h-36 bg-neutral-700" />
              {/* Base */}
              <div className="w-8 h-1 bg-neutral-500 rounded" />
            </div>

            {/* Plant Pot */}
            <div className="absolute bottom-6 left-10 flex flex-col items-center">
              {/* Plant leaves */}
              <svg className="w-12 h-12 -mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 9 6 9 10C9 14 12 18 12 18" stroke={c3} strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 2C12 2 15 6 15 10C15 14 12 18 12 18" stroke={c3} strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 8C6 8 8 11 11 13" stroke={c1} strokeWidth="2" strokeLinecap="round"/>
                <path d="M18 8C18 8 16 11 13 13" stroke={c1} strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="w-6 h-7 bg-neutral-800 rounded-b-md border border-neutral-700" />
            </div>

            {/* Main Sofa / Couch Couch */}
            <div className="w-80 flex flex-col items-center relative z-10">
              {/* Sofa back cushion */}
              <div className="w-72 h-20 rounded-t-2xl flex gap-1 p-1 shadow-lg transition-all duration-300" style={{ backgroundColor: c0 }}>
                {/* Back pillows pattern */}
                <div className="flex-1 opacity-25 border-r border-neutral-900/10" />
                <div className="flex-1 opacity-25" />
              </div>
              
              {/* Sofa seat cushions */}
              <div className="w-76 h-10 rounded-md -mt-1 flex gap-1.5 p-1 transition-all duration-300 shadow-md" style={{ backgroundColor: c1 }}>
                <div className="flex-1 rounded" style={{ backgroundColor: c0, opacity: 0.8 }} />
                <div className="flex-1 rounded" style={{ backgroundColor: c0, opacity: 0.8 }} />
              </div>

              {/* Armrests */}
              <div className="absolute bottom-1 -left-4 w-6 h-20 rounded-l-xl rounded-r-md transition-all duration-300" style={{ backgroundColor: c0, borderRight: `2px solid ${c1}` }} />
              <div className="absolute bottom-1 -right-4 w-6 h-20 rounded-r-xl rounded-l-md transition-all duration-300" style={{ backgroundColor: c0, borderLeft: `2px solid ${c1}` }} />

              {/* Decorative Pillows */}
              <div className="absolute bottom-9 left-6 w-10 h-10 rounded shadow-md transform rotate-12 transition-all duration-300" style={{ backgroundColor: c3 }} />
              <div className="absolute bottom-9 right-8 w-8 h-8 rounded shadow-md transform -rotate-12 transition-all duration-300" style={{ backgroundColor: c4 }} />

              {/* Sofa legs */}
              <div className="w-72 flex justify-between px-6 pt-0.5">
                <div className="w-2 h-4 bg-neutral-800 rounded-b" />
                <div className="w-2 h-4 bg-neutral-800 rounded-b" />
              </div>
            </div>

            {/* Living room floor rug */}
            <div className="w-[340px] h-3 rounded-full blur-[1px] transition-all duration-300" style={{ backgroundColor: c4, opacity: 0.5 }} />
          </div>
        )}

        {/* 2. AUTOMOTIVE VECTOR PREVIEW */}
        {vibe === 'automotive' && (
          <div className="w-full max-w-lg aspect-video flex flex-col justify-center items-center relative animate-fade-in">
            {/* Cyberpunk grid road floor line is drawn with outline */}
            <div className="absolute bottom-12 w-full h-[1px] bg-neutral-800" />
            <div 
              className="absolute bottom-4 w-11/12 h-8 opacity-30 blur-md rounded-full transition-all duration-500"
              style={{ backgroundColor: c3 }}
            />

            {/* Sleek sports car vector SVG */}
            <svg className="w-96 h-48 relative z-10" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Ground neon underglow */}
              <path 
                d="M 90 145 L 310 145" 
                stroke={c3} 
                strokeWidth="10" 
                strokeLinecap="round" 
                className="opacity-85 blur-md"
              />

              {/* Main Car Body Shell */}
              <path 
                d="M 50 140 
                   C 50 140, 48 115, 65 110 
                   C 82 105, 95 105, 120 90
                   C 145 75, 175 70, 210 70
                   C 255 70, 305 85, 330 100
                   C 355 115, 360 125, 360 140
                   C 360 143, 340 143, 335 140
                   C 330 130, 300 130, 290 140
                   C 285 145, 185 145, 180 140
                   C 170 130, 140 130, 130 140
                   C 125 145, 55 145, 50 140 Z" 
                fill={c0} 
                stroke={c4}
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              {/* Side intake wing and sporty highlights */}
              <path 
                d="M 180 115 
                   C 195 110, 220 110, 235 118 
                   C 250 125, 255 135, 255 135
                   C 255 135, 215 135, 185 125 Z" 
                fill={c1}
                className="transition-all duration-300"
              />

              {/* Cabin Glass / Windshield */}
              <path 
                d="M 140 92 
                   C 152 82, 175 78, 205 78
                   C 240 78, 265 88, 275 96
                   C 260 96, 150 96, 140 92 Z" 
                fill={c2} 
                opacity="0.8"
                className="transition-all duration-300"
              />
              
              {/* Premium Spoiler / Rear wing */}
              <path 
                d="M 335 98 C 345 88, 358 85, 365 85" 
                stroke={c1} 
                strokeWidth="4" 
                strokeLinecap="round"
                className="transition-all duration-300"
              />

              {/* Headlights & Tail lights glowing indicators */}
              <circle cx="58" cy="116" r="4" fill={c3} className="pulse-glow" />
              <path d="M 356 112 C 358 112, 360 114, 360 118" stroke="#ff3b30" strokeWidth="3" strokeLinecap="round" />

              {/* Wheel 1 (Front Wheel) */}
              <g className="transition-all duration-300">
                <circle cx="130" cy="140" r="22" fill="#0c0d0e" stroke={c4} strokeWidth="2" />
                <circle cx="130" cy="140" r="14" fill="#1f2326" />
                {/* Rims spoke accents */}
                <line x1="130" y1="124" x2="130" y2="156" stroke={c3} strokeWidth="2" />
                <line x1="114" y1="140" x2="146" y2="140" stroke={c3} strokeWidth="2" />
                <circle cx="130" cy="140" r="4" fill="#fff" />
              </g>

              {/* Wheel 2 (Rear Wheel) */}
              <g className="transition-all duration-300">
                <circle cx="290" cy="140" r="22" fill="#0c0d0e" stroke={c4} strokeWidth="2" />
                <circle cx="290" cy="140" r="14" fill="#1f2326" />
                {/* Rims spoke accents */}
                <line x1="290" y1="124" x2="290" y2="156" stroke={c3} strokeWidth="2" />
                <line x1="274" y1="140" x2="306" y2="140" stroke={c3} strokeWidth="2" />
                <circle cx="290" cy="140" r="4" fill="#fff" />
              </g>
            </svg>
          </div>
        )}

        {/* 3. LUXURY MECHANICAL WATCH PREVIEW */}
        {vibe === 'watches' && (
          <div className="w-full max-w-lg aspect-video flex justify-center items-center relative animate-fade-in">
            <svg className="w-80 h-80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Leather Watch Straps (Vertical) */}
              <rect 
                x="84" 
                y="10" 
                width="32" 
                height="180" 
                rx="6" 
                fill={c1} 
                stroke={c4} 
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
              {/* Stitching lines pattern */}
              <line x1="88" y1="15" x2="88" y2="185" stroke={c2} strokeWidth="1" strokeDasharray="3 3 shrink" />
              <line x1="112" y1="15" x2="112" y2="185" stroke={c2} strokeWidth="1" strokeDasharray="3 3" />

              {/* Metal Lug links for watch frame structure */}
              <rect x="76" y="60" width="8" height="24" rx="2" fill={c0} />
              <rect x="116" y="60" width="8" height="24" rx="2" fill={c0} />
              <rect x="76" y="116" width="8" height="24" rx="2" fill={c0} />
              <rect x="116" y="116" width="8" height="24" rx="2" fill={c0} />

              {/* Solid Bezel Ring casing */}
              <circle 
                cx="100" 
                cy="100" 
                r="46" 
                fill={c0} 
                stroke={c4} 
                strokeWidth="3.5"
                className="transition-all duration-300 shadow-2xl"
              />

              {/* Dial Face Plate */}
              <circle 
                cx="100" 
                cy="100" 
                r="38" 
                fill="#0f0f12" 
                stroke={c1} 
                strokeWidth="1.5"
              />

              {/* Sub-dials background complication */}
              <circle cx="100" cy="84" r="10" fill="rgba(0,0,0,0.5)" stroke={c2} strokeWidth="0.5" />
              <line x1="100" y1="84" x2="100" y2="76" stroke={c3} strokeWidth="1" />

              {/* Hour notches */}
              <line x1="100" y1="65" x2="100" y2="70" stroke={c4} strokeWidth="2.5" />
              <line x1="100" y1="135" x2="100" y2="130" stroke={c4} strokeWidth="2.5" />
              <line x1="65" y1="100" x2="70" y2="100" stroke={c4} strokeWidth="2.5" />
              <line x1="135" y1="100" x2="130" y2="100" stroke={c4} strokeWidth="2.5" />

              {/* Chrono Hands ticking dynamically */}
              {/* Hour hand */}
              <line 
                x1="100" 
                y1="100" 
                x2="114" 
                y2="88" 
                stroke={c4} 
                strokeWidth="3.5" 
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              {/* Minute hand */}
              <line 
                x1="100" 
                y1="100" 
                x2="84" 
                y2="74" 
                stroke={c2} 
                strokeWidth="2" 
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              {/* Sweeping elegant Second hand */}
              <line 
                x1="100" 
                y1="100" 
                x2="122" 
                y2="122" 
                stroke={c3} 
                strokeWidth="1" 
                strokeLinecap="round"
                className="transition-all duration-300"
              />

              {/* Middle Pin Axle point */}
              <circle cx="100" cy="100" r="4" fill="#fff" stroke={c0} strokeWidth="1.5" />

              {/* Watch Outer dial crown */}
              <rect x="145" y="93" width="6" height="14" rx="1.5" fill={c4} />
            </svg>
          </div>
        )}

        {/* 4. WEB DEV APPLICATION UI DASHBOARD */}
        {vibe === 'web' && (
          <div className="w-full max-w-lg aspect-video flex flex-col justify-start rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl animate-fade-in">
            {/* Header Navbar */}
            <div 
              className="w-full h-10 px-4 flex items-center justify-between border-b border-neutral-800 transition-all duration-300"
              style={{ backgroundColor: c0 }}
            >
              {/* Logo icon */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c3 }} />
                <span className="text-[10px] font-display font-bold text-white tracking-wider">PaletteCraft App</span>
              </div>
              
              {/* Navbar items */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-2 rounded-full" style={{ backgroundColor: c4, opacity: 0.6 }} />
                <div className="w-12 h-2 rounded-full" style={{ backgroundColor: c4, opacity: 0.3 }} />
                <div className="w-5 h-5 rounded-full overflow-hidden" style={{ backgroundColor: c1 }} />
              </div>
            </div>

            {/* Application Main Layout */}
            <div className="flex-1 flex overflow-hidden">
              {/* Micro Sidebar */}
              <div className="w-14 border-r border-neutral-800/60 p-2 flex flex-col gap-3 items-center bg-neutral-900/40">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: c1 }}>
                  <div className="w-3.5 h-3.5 rounded bg-white opacity-90" />
                </div>
                <div className="w-6 h-1.5 rounded-full" style={{ backgroundColor: c4, opacity: 0.4 }} />
                <div className="w-6 h-1.5 rounded-full" style={{ backgroundColor: c4, opacity: 0.4 }} />
                <div className="w-6 h-1.5 rounded-full" style={{ backgroundColor: c4, opacity: 0.4 }} />
              </div>

              {/* Main Arena Dashboard Content */}
              <div className="flex-1 p-4 flex flex-col gap-3">
                {/* Greeting segment */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-24 h-3 rounded" style={{ backgroundColor: c4 }} />
                    <div className="w-36 h-1.5 rounded mt-2" style={{ backgroundColor: c4, opacity: 0.5 }} />
                  </div>
                  {/* Status Indicator pill */}
                  <div className="px-2 py-0.5 rounded text-[8px] font-mono tracking-wide" style={{ backgroundColor: c3, color: '#050505' }}>
                    PRO CAPABILITY
                  </div>
                </div>

                {/* Grid Widgets dashboard */}
                <div className="grid grid-cols-3 gap-3 flex-1">
                  
                  {/* Card Widget 1: Interactive Button & Stat */}
                  <div className="col-span-2 bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-3 flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-2 rounded" style={{ backgroundColor: c1 }} />
                      <div className="w-28 h-5 rounded mt-2 font-mono text-xs font-bold" style={{ color: c3 }}>
                        $48,920.00
                      </div>
                    </div>

                    {/* Prominent CTA Interactive Button */}
                    <button 
                      className="w-full py-1.5 rounded text-[9px] font-medium tracking-wide text-center transition-all duration-300"
                      style={{ 
                        backgroundColor: c3,
                        color: c0,
                        boxShadow: `0 4px 10px -2px ${c3}50`
                      }}
                    >
                      {lang === 'en' ? 'Execute Action' : '執行操作'}
                    </button>
                  </div>

                  {/* Card Widget 2: Accent Chart / Gauge representation */}
                  <div className="col-span-1 bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-3 flex flex-col items-center justify-center gap-1">
                    {/* Ring simulation */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-4 border-dashed" style={{ borderColor: c1 }} />
                      <div className="absolute inset-1.5 rounded-full border-4 border-solid transition-all duration-300" style={{ borderColor: c3 }} />
                      <span className="text-[8px] font-mono font-semibold" style={{ color: c4 }}>82%</span>
                    </div>
                    <div className="w-10 h-1.5 rounded mt-2" style={{ backgroundColor: c2, opacity: 0.8 }} />
                  </div>

                </div>

                {/* Horizontal System Alert bar */}
                <div 
                  className="w-full py-1.5 px-3 rounded-lg border flex items-center justify-between text-[8px] tracking-wide"
                  style={{ 
                    backgroundColor: `${c1}15`, 
                    borderColor: `${c1}30`,
                    color: c4
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c3 }} />
                    <span>{t.colorContrastAlert}</span>
                  </div>
                  <span className="opacity-60 font-mono">OK</span>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
