import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language, translations } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const t = translations[lang];

  return (
    <header className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-b border-neutral-900 mb-8 px-4 sm:px-6">
      
      {/* Brand Logo & Typography */}
      <div className="flex items-center gap-3.5 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:rotate-6 transition-transform duration-300">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-display font-medium tracking-tight text-white flex items-center gap-2 justify-center sm:justify-start">
            {t.title}
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 font-mono text-neutral-400 font-normal">
              v1.0
            </span>
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5 font-light">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Language Toggle switch & Quick status */}
      <div className="flex items-center gap-4">
        {/* Subtle decorative connection indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-neutral-900 rounded-full border border-neutral-800 text-[10px] font-mono text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-glow"></span>
          LOCAL ENGINE ACTIVE
        </div>

        {/* The Actionable Language Toggle Button */}
        <button
          onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 active:scale-95 border border-neutral-800 hover:border-neutral-700 text-neutral-200 text-xs font-medium rounded-xl transition-all duration-200 shadow-sm shadow-neutral-950/20"
          id="lang-toggle-btn"
        >
          <span className="text-xs">🌐</span>
          <span>{lang === 'en' ? '繁體中文' : 'English'}</span>
        </button>
      </div>

    </header>
  );
};
