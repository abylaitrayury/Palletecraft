import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AiGenerator } from './components/AiGenerator';
import { PaletteDisplay } from './components/PaletteDisplay';
import { LivePreview } from './components/LivePreview';
import { SavedSidebar } from './components/SavedSidebar';
import { Language, ColorBlock, SavedPalette, ProjectVibeType, translations } from './types';
import { generateRandomHex } from './utils/colorUtils';
import { Sparkles, MonitorSmartphone, Layers, RefreshCw, Palette } from 'lucide-react';

export default function App() {
  // Locale State
  const [lang, setLang] = useState<Language>(() => {
    const local = localStorage.getItem('palettecraft_lang');
    return (local === 'en' || local === 'zh') ? local : 'zh';
  });

  // Sync language selection to Local Storage
  useEffect(() => {
    localStorage.setItem('palettecraft_lang', lang);
  }, [lang]);

  // Project Vibe Theme Mode State
  const [vibe, setVibe] = useState<ProjectVibeType>('web');

  // Initial Colors structure: 5 slots seeded with gorgeous aesthetic tones initially
  const [colors, setColors] = useState<ColorBlock[]>([
    { hex: '#0a0f1d', locked: false },
    { hex: '#ff007f', locked: false },
    { hex: '#3b82f6', locked: false },
    { hex: '#05f3ff', locked: false },
    { hex: '#ffffff', locked: false }
  ]);

  // Saved Palettes persistence state
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>(() => {
    const raw = localStorage.getItem('palettecraft_saved_v1');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        // Fallback below
      }
    }
    // Default initial mock database seed values for high-quality starter kit
    return [
      {
        id: 'seed-cyberpunk',
        name: 'Cyberpunk Sports Car / 電競霓虹跑車',
        colors: ['#0d1117', '#ff007f', '#3b82f6', '#8b5cf6', '#05f3ff'],
        vibe: 'automotive' as ProjectVibeType,
        createdAt: Date.now() - 3600000 * 24
      },
      {
        id: 'seed-rainy',
        name: 'Rainy Kyoto / 京都日落微雨',
        colors: ['#2d3748', '#4a5568', '#718096', '#a0aec0', '#e2e8f0'],
        vibe: 'home' as ProjectVibeType,
        createdAt: Date.now() - 3600000 * 12
      },
      {
        id: 'seed-watches',
        name: 'Royal Chronograph / 皇家奢華黑金',
        colors: ['#111111', '#1c1c1c', '#b5a642', '#d4af37', '#f3e5ab'],
        vibe: 'watches' as ProjectVibeType,
        createdAt: Date.now() - 3600000 * 2
      }
    ];
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('palettecraft_saved_v1', JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  // Global spacebar listener to randomize unlocked colors (skipping input field focuses)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl) {
        const tag = activeEl.tagName.toUpperCase();
        if (tag === 'INPUT' || tag === 'TEXTAREA' || activeEl.getAttribute('contenteditable') === 'true') {
          return;
        }
      }
      if (e.code === 'Space') {
        e.preventDefault();
        randomizeUnlockedColors();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  // Utility to randomize unlocked nodes
  const randomizeUnlockedColors = () => {
    setColors(prev =>
      prev.map(slot => (slot.locked ? slot : { ...slot, hex: generateRandomHex() }))
    );
  };

  // Callback when AI submits matching colors or randomizes matching
  const handleAiPaletteGenerated = (newColors: string[], themeName: string) => {
    setColors(prev => {
      return prev.map((slot, index) => {
        if (slot.locked) return slot;
        return {
          ...slot,
          hex: newColors[index] || generateRandomHex()
        };
      });
    });
    
    // Auto-update Project Vibe depending on AI category keywords
    const lowerName = themeName.toLowerCase();
    if (lowerName.includes('car') || lowerName.includes('車') || lowerName.includes('racer')) {
      setVibe('automotive');
    } else if (lowerName.includes('home') || lowerName.includes('kyoto') || lowerName.includes('小屋') || lowerName.includes('靜謐') || lowerName.includes('雨')) {
      setVibe('home');
    } else if (lowerName.includes('watch') || lowerName.includes('gold') || lowerName.includes('錶') || lowerName.includes('金')) {
      setVibe('watches');
    } else {
      setVibe('web');
    }
  };

  // Save active palette combination to sidebar state
  const handleSavePalette = (nameInput: string) => {
    const hexArray = colors.map(c => c.hex);
    const newRecord: SavedPalette = {
      id: `p-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: nameInput,
      colors: hexArray,
      vibe: vibe,
      createdAt: Date.now()
    };
    setSavedPalettes(prev => [newRecord, ...prev]);
  };

  // Load selected saved palette back into slots (respecting locked items or overwriting them)
  const handleLoadPalette = (loadedColors: string[]) => {
    setColors(prev => {
      return prev.map((slot, index) => {
        // Ensure we load the colors correctly, but keep locks if the user is lock-focusing
        if (slot.locked) return slot;
        return {
          ...slot,
          hex: loadedColors[index] || slot.hex
        };
      });
    });
  };

  // Delete color saved
  const handleDeletePalette = (id: string) => {
    setSavedPalettes(prev => prev.filter(p => p.id !== id));
  };

  // Import JSON list
  const handleImportPalettes = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed)) {
        // Simple type verification
        const valid = parsed.every(p => p.name && Array.isArray(p.colors) && p.colors.length >= 5);
        if (valid) {
          const sanitized: SavedPalette[] = parsed.map((p, idx) => ({
            id: p.id || `imported-${Date.now()}-${idx}`,
            name: p.name,
            colors: p.colors.slice(0, 5),
            vibe: p.vibe || 'web',
            createdAt: p.createdAt || Date.now()
          }));
          setSavedPalettes(prev => [...sanitized, ...prev]);
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // Direct toggle for project category with descriptions
  const projectVibeOptions = [
    { value: 'home', labelEn: '🏠 Home Interior', labelZh: '🏠 居家室內設計' },
    { value: 'automotive', labelEn: '🏎️ Automotive Concepts', labelZh: '🏎️ 奢華跑車外觀' },
    { value: 'watches', labelEn: '⌚ Luxury Horizon Watch', labelZh: '⌚ 精品機械腕錶' },
    { value: 'web', labelEn: '💻 Web Application UI', labelZh: '💻 響應式網站 UI' }
  ];

  const t = translations[lang];

  return (
    <div className="min-h-screen text-neutral-100 bg-neutral-950 pb-16">
      
      {/* Decorative top ambient color header line */}
      <div className="w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Bilingual Header Navigation */}
      <Header lang={lang} setLang={setLang} />

      {/* Main Application Outer container */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
        
        {/* Core AI prompt inputs */}
        <section aria-label="AI Generator Control Arena">
          <AiGenerator 
            lang={lang} 
            onPaletteGenerated={handleAiPaletteGenerated} 
          />
        </section>

        {/* Dynamic Split Layout: Primary Workspace (Left) & Sidebar Management (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLS: Generator Workspace & Sandboxed Renderings */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* 1. Main Palette Display columns */}
            <section aria-label="Palette Generator Columns">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-sm font-semibold tracking-wider font-display uppercase text-neutral-300">
                    {lang === 'en' ? 'Designer Sandbox Space' : '設計工作沙盒'}
                  </h2>
                </div>
                <button
                  onClick={randomizeUnlockedColors}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-all active:scale-95 px-2.5 py-1 bg-indigo-500/10 rounded-lg"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{lang === 'en' ? 'Randomize Slots' : '隨機化未鎖定'}</span>
                </button>
              </div>

              <PaletteDisplay
                colors={colors}
                setColors={setColors}
                lang={lang}
                onRandomize={randomizeUnlockedColors}
              />
            </section>

            {/* 2. Project Vibe selection drop-down & sandboxed vector visualization */}
            <section aria-label="Aesthetic Live Previews">
              
              {/* Category dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 bg-neutral-900/30 border border-neutral-800/80 rounded-xl p-4">
                <div>
                  <label htmlFor="project-vibe-select" className="text-xs font-medium text-neutral-300 block mb-1">
                    {t.vibeDropdownLabel}
                  </label>
                  <p className="text-[10px] text-neutral-500">
                    {lang === 'en' ? 'Choose which mock object gets recolorized' : '選擇欲彩渲的模擬實例'}
                  </p>
                </div>

                <div className="relative">
                  <select
                    id="project-vibe-select"
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value as ProjectVibeType)}
                    className="w-full sm:w-64 h-10 px-3 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-indigo-600 rounded-xl text-xs text-neutral-200 outline-none transition-all cursor-pointer font-medium appearance-none"
                  >
                    {projectVibeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {lang === 'en' ? opt.labelEn : opt.labelZh}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {/* High-fidelity Vector sandbox render sheet */}
              <LivePreview 
                colors={colors.map(c => c.hex)} 
                vibe={vibe} 
                lang={lang} 
              />
            </section>

          </div>

          {/* RIGHT 1 COL: Saved Storage, CSV/JSON backups, quick copy lists */}
          <div className="lg:col-span-1">
            <section aria-label="Saved Palettes Storage Sidebar">
              <SavedSidebar
                savedPalettes={savedPalettes}
                activeColors={colors.map(c => c.hex)}
                activeVibe={vibe}
                lang={lang}
                onSavePalette={handleSavePalette}
                onLoadPalette={handleLoadPalette}
                onDeletePalette={handleDeletePalette}
                onImportPalettes={handleImportPalettes}
              />
            </section>
          </div>

        </div>

      </main>

      {/* Modern footer with attribution */}
      <footer className="w-full max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-900/80 px-4 text-center">
        <p className="text-[10px] font-mono text-neutral-600 tracking-wider">
          PALETTE CRAFT ﹒ {new Date().getFullYear()} ﹒ DESIGNED WITH PREMIUM CONTRAST & ACCESSIBLE STYLING
        </p>
      </footer>

    </div>
  );
}
