import React, { useState } from 'react';
import { Sparkles, BrainCircuit, Lightbulb, ChevronRight } from 'lucide-react';
import { Language, translations } from '../types';
import { matchAiVibe, generateCoordinatedPalette } from '../utils/colorUtils';

interface AiGeneratorProps {
  lang: Language;
  onPaletteGenerated: (colors: string[], themeName: string) => void;
}

export const AiGenerator: React.FC<AiGeneratorProps> = ({ lang, onPaletteGenerated }) => {
  const t = translations[lang];
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStage, setThinkingStage] = useState('');

  // Example prompt suggestions to guide users
  const suggestions = lang === 'en' ? [
    { label: "🎏 Rainy Kyoto", text: "Rainy day in Kyoto" },
    { label: "⚡ Cyberpunk Neon", text: "Neon cyberpunk sports car racer" },
    { label: "🌲 Alpine Woods", text: "Deep nature alpine woods" },
    { label: "🎞️ 70s Retro Film", text: "Vintage polaroid analog film camera vibes" },
    { label: "🍵 Zen Matcha", text: "Zen Matcha garden tea ceremony" },
    { label: "🍂 Cozy Fireplace", text: "Cozy home autumn warm cabin fireplace" }
  ] : [
    { label: "🎏 京都雨天", text: "京都的雨天靜謐寺廟" },
    { label: "⚡ 霓虹跑車", text: "電競霓虹跑車賽車" },
    { label: "🌲 高山深林", text: "大自然綠色植栽高山深林" },
    { label: "🎞️ 復古底片", text: "復古懷舊柯達底片相機" },
    { label: "🍵 禪風抹茶", text: "日式禪風宇治抹茶" },
    { label: "🍂 暖秋小屋", text: "溫馨秋天木頭壁爐小屋" }
  ];

  const handleGenerate = (targetPrompt: string) => {
    const activePrompt = targetPrompt || prompt;
    if (!activePrompt.trim()) return;

    setIsThinking(true);
    setThinkingStage(lang === 'en' ? 'Scanning prompt semantics...' : '正在掃描語意關鍵字...');

    // Phase 1 (0ms - 500ms): Scanning
    setTimeout(() => {
      setThinkingStage(lang === 'en' ? 'Extracting chromatic atmospheres...' : '抽取大氣與光影色彩氛圍...');
    }, 500);

    // Phase 2 (500ms - 1100ms): Math processing
    setTimeout(() => {
      setThinkingStage(lang === 'en' ? 'Formulating custom color harmony rules...' : '計算專屬色彩美學配對空間...');
    }, 1100);

    // Final Execution (1500ms)
    setTimeout(() => {
      const match = matchAiVibe(activePrompt);
      if (match) {
        onPaletteGenerated(match.colors, lang === 'en' ? match.nameEn : match.nameZh);
      } else {
        const generatedColors = generateCoordinatedPalette();
        const customName = lang === 'en' ? `Aesthetic: "${activePrompt}"` : `美學氛圍：「${activePrompt}」`;
        onPaletteGenerated(generatedColors, customName);
      }
      setIsThinking(false);
      setPrompt('');
    }, 1500);
  };

  return (
    <div className="w-full bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
      
      {/* Sleek diagonal highlight bar */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <BrainCircuit className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-display font-medium tracking-wide uppercase text-neutral-300">
          {t.aiSectionTitle}
        </h2>
      </div>

      {/* Main input layout */}
      <div className="relative">
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isThinking) {
                  handleGenerate(prompt);
                }
              }}
              disabled={isThinking}
              placeholder={t.aiPlaceholder}
              className="w-full h-11 px-4 pr-10 bg-neutral-950 hover:bg-neutral-950/80 focus:bg-neutral-950 border border-neutral-800 focus:border-neutral-700 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
              id="ai-prompt-input"
            />
            {prompt && (
              <button 
                onClick={() => setPrompt('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => handleGenerate(prompt)}
            disabled={isThinking || !prompt.trim()}
            className={`h-11 px-6 rounded-xl flex items-center justify-center gap-2 text-xs font-medium transition-all duration-200 active:scale-98 ${
              isThinking 
                ? 'bg-neutral-800 border border-neutral-700 text-neutral-400 cursor-not-allowed'
                : !prompt.trim()
                  ? 'bg-neutral-800/40 border border-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/15 border border-indigo-500/50'
            }`}
            id="ai-generate-btn"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.generateBtn}</span>
          </button>
        </div>

        {/* MOCK THINKING / AI IS THINKING LOADING MODAL VIEWPORT */}
        {isThinking && (
          <div className="absolute inset-0 bg-neutral-950/95 rounded-xl border border-neutral-800 flex flex-col items-center justify-center gap-3 animate-fade-in z-20">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce duration-500 [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce duration-500 [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce duration-500"></span>
              </div>
              <span className="text-xs font-mono font-medium text-neutral-300 tracking-wider">
                {t.aiThinking}
              </span>
            </div>
            
            {/* Dynamic Stage descriptions and progress visual */}
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-[10px] font-mono text-indigo-400 animate-pulse">
                {thinkingStage}
              </p>
              <div className="w-48 h-1 bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1 uppercase mr-1">
          <Lightbulb className="w-3 h-3 text-amber-500/80" />
          {lang === 'en' ? 'Quick Ideas:' : '靈感提案：'}
        </span>
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setPrompt(item.text);
              handleGenerate(item.text);
            }}
            disabled={isThinking}
            className="px-2.5 py-1 text-[10px] bg-neutral-950 hover:bg-neutral-900 active:scale-95 border border-neutral-800 hover:border-neutral-700 rounded-lg text-neutral-400 hover:text-indigo-300 transition-all duration-150 flex items-center gap-1"
          >
            {item.label}
            <ChevronRight className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
          </button>
        ))}
      </div>

    </div>
  );
};
