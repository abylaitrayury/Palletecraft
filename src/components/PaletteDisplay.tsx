import React, { useEffect, useRef } from 'react';
import { Lock, Unlock, Copy, RefreshCw, Sliders } from 'lucide-react';
import { ColorBlock, Language, translations } from '../types';
import { getContrastYIQ, generateRandomHex } from '../utils/colorUtils';

interface PaletteDisplayProps {
  colors: ColorBlock[];
  setColors: React.Dispatch<React.SetStateAction<ColorBlock[]>>;
  lang: Language;
  onRandomize: () => void;
}

export const PaletteDisplay: React.FC<PaletteDisplayProps> = ({
  colors,
  setColors,
  lang,
  onRandomize
}) => {
  const t = translations[lang];

  // Copy individual color to clipboard
  const handleCopyColor = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    
    // Simple visual toast event logic represented locally
    const toastId = `toast-copy-${index}`;
    const el = document.getElementById(toastId);
    if (el) {
      el.innerText = lang === 'en' ? 'COPIED!' : '已複製！';
      el.classList.remove('opacity-0');
      el.classList.add('opacity-100');
      setTimeout(() => {
        el.classList.remove('opacity-100');
        el.classList.add('opacity-0');
      }, 1200);
    }
  };

  // Toggle lock state of color slot
  const toggleLock = (index: number) => {
    setColors(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], locked: !copy[index].locked };
      return copy;
    });
  };

  // Handle manual update of hex code via color picker
  const handlePickerChange = (index: number, newHex: string) => {
    setColors(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], hex: newHex };
      return copy;
    });
  };

  // Update the hex through direct textual inputs
  const handleTextInputChange = (index: number, val: string) => {
    // Basic santizing for styling
    let santized = val.trim();
    if (!santized.startsWith('#')) {
      santized = '#' + santized;
    }
    // Only update if it looks like a potential hex sequence
    if (santized.match(/^#[0-9a-fA-F]{0,6}$/)) {
      setColors(prev => {
        const copy = [...prev];
        copy[index] = { ...copy[index], hex: santized };
        return copy;
      });
    }
  };

  // Format validation on text focus loss
  const handleTextBlur = (index: number, val: string) => {
    let santized = val.trim();
    if (!santized.startsWith('#')) {
      santized = '#' + santized;
    }
    // If invalid configuration length, default to random hex
    if (!santized.match(/^#[0-9a-fA-F]{6}$/)) {
      setColors(prev => {
        const copy = [...prev];
        copy[index] = { ...copy[index], hex: generateRandomHex() };
        return copy;
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* Interaction Guideline Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 bg-neutral-900/30 border border-neutral-800/60 rounded-xl px-4 py-3 gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-block px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px] font-mono text-neutral-300">
            SPACEBAR
          </span>
          <span>{t.spacebarTip}</span>
        </div>
        <button
          onClick={onRandomize}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 hover:text-white text-xs font-medium text-neutral-200 transition-all active:scale-95 border border-neutral-700"
          id="randomize-palette-btn"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.randomizePrompt}</span>
        </button>
      </div>

      {/* Grid of the 5 Color block columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 w-full min-h-[380px] bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
        {colors.map((colorItem, idx) => {
          const textContrast = getContrastYIQ(colorItem.hex);
          const isLight = textContrast === 'dark';
          
          // Foreground CSS configuration based on contrast
          const primaryTextClass = isLight ? 'text-neutral-950 font-semibold' : 'text-neutral-50';
          const secondaryTextClass = isLight ? 'text-neutral-800/70 font-medium' : 'text-neutral-300';
          const activeActionBg = isLight 
            ? 'bg-neutral-950/5 hover:bg-neutral-950/15 border-transparent' 
            : 'bg-white/5 hover:bg-white/12 border-transparent';

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col justify-between p-6 transition-all duration-300 relative group min-h-[220px] md:min-h-[380px]"
              style={{ backgroundColor: colorItem.hex }}
            >
              
              {/* Copy Notification Toast overlay */}
              <div
                id={`toast-copy-${idx}`}
                className="absolute inset-x-0 top-18 flex justify-center pointer-events-none opacity-0 transition-opacity duration-300 z-10"
              >
                <span className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider shadow-md ${
                  isLight ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-950'
                }`}>
                  COPIED
                </span>
              </div>

              {/* Upper Control Bar: Index counter status, copy Hex and quick locks */}
              <div className="flex items-center justify-between w-full relative z-10">
                <span className={`text-[10px] font-mono font-bold tracking-wider ${secondaryTextClass}`}>
                  0{idx + 1}
                </span>

                <div className="flex items-center gap-1.5">
                  {/* Manual Palette Color picker utility wrapper */}
                  <div className="relative">
                    <button
                      className={`p-2 rounded-lg transition-all ${activeActionBg}`}
                      title={lang === 'en' ? 'Open Color Picker' : '開啟選色器'}
                      style={{ color: isLight ? '#0a0a0a' : '#fafafa' }}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="color"
                      value={colorItem.hex.startsWith('#') && colorItem.hex.length === 7 ? colorItem.hex : '#ffffff'}
                      onChange={(e) => handlePickerChange(idx, e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id={`color-picker-${idx}`}
                    />
                  </div>

                  {/* Lock slot toggle */}
                  <button
                    onClick={() => toggleLock(idx)}
                    className={`p-2 rounded-lg transition-all ${activeActionBg}`}
                    title={colorItem.locked ? t.unlockTip : t.lockTip}
                    style={{ color: isLight ? '#0a0a0a' : '#fafafa' }}
                    id={`lock-btn-${idx}`}
                  >
                    {colorItem.locked ? (
                      <Lock className="w-3.5 h-3.5 animate-bounce" />
                    ) : (
                      <Unlock className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mid-body Hex Text manual editable inputs */}
              <div className="flex flex-col items-center gap-1.5 w-full relative z-10">
                
                {/* Editable Hex TextInput */}
                <input
                  type="text"
                  value={colorItem.hex.toUpperCase()}
                  onChange={(e) => handleTextInputChange(idx, e.target.value)}
                  onBlur={(e) => handleTextBlur(idx, e.target.value)}
                  className={`w-full max-w-[120px] text-center bg-transparent border-b border-transparent focus:border-current py-1 font-mono text-base font-bold outline-none uppercase transition-all tracking-wide ${primaryTextClass}`}
                />

                {/* Aesthetic status markers */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyColor(colorItem.hex, idx)}
                    className={`px-2 py-1 rounded text-[10px] font-mono tracking-wider flex items-center justify-center gap-1 transition-all ${activeActionBg}`}
                    title={t.copyTip}
                    style={{ color: isLight ? '#050505' : '#fcfcfc' }}
                    id={`copy-hex-${idx}`}
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>COPY</span>
                  </button>
                </div>

              </div>

              {/* Bottom tag decoration details */}
              <div className="flex items-center justify-between w-full relative z-10 mt-4">
                <span className={`text-[9px] font-mono select-none px-1.5 py-0.5 rounded ${
                  isLight ? 'bg-black/5 text-neutral-800' : 'bg-white/5 text-neutral-300'
                }`}>
                  {isLight ? (lang === 'en' ? 'HIGH CONTRAST' : '高明度') : (lang === 'en' ? 'DARK SURFACES' : '深邃底色')}
                </span>
                
                {colorItem.locked && (
                  <span className={`text-[8px] font-mono font-medium tracking-widest ${secondaryTextClass}`}>
                    LOCKED
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
