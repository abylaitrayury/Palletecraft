import React, { useState } from 'react';
import { Save, Trash2, FolderHeart, ShieldCheck, Download, Upload, Copy, ExternalLink, BookmarkCheck } from 'lucide-react';
import { SavedPalette, Language, translations, ProjectVibeType } from '../types';

interface SavedSidebarProps {
  savedPalettes: SavedPalette[];
  activeColors: string[];
  activeVibe: ProjectVibeType;
  lang: Language;
  onSavePalette: (name: string) => void;
  onLoadPalette: (colors: string[]) => void;
  onDeletePalette: (id: string) => void;
  onImportPalettes: (jsonStr: string) => boolean;
}

export const SavedSidebar: React.FC<SavedSidebarProps> = ({
  savedPalettes,
  activeColors,
  activeVibe,
  lang,
  onSavePalette,
  onLoadPalette,
  onDeletePalette,
  onImportPalettes
}) => {
  const t = translations[lang];
  const [customName, setCustomName] = useState('');
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const triggerSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = customName.trim() || `${t.placeholderPaletteName} #${Math.floor(100 + Math.random() * 900)}`;
    onSavePalette(finalName);
    setCustomName('');
    showTransientFeedback(t.paletteSaved);
  };

  const showTransientFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  // Export all saved palettes as clipboard string
  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(savedPalettes, null, 2);
      navigator.clipboard.writeText(dataStr);
      showTransientFeedback(t.exportSuccess);
    } catch (e) {
      showTransientFeedback('Export failed.');
    }
  };

  // Import raw JSON string
  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;
    
    const success = onImportPalettes(importText);
    if (success) {
      showTransientFeedback(t.importSuccess);
      setImportText('');
      setShowImport(false);
    } else {
      showTransientFeedback(t.importFailed);
    }
  };

  return (
    <div className="w-full bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-5 md:p-6 backdrop-blur-md flex flex-col gap-6">
      
      {/* 1. SAVE NEW PALETTE FORM */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookmarkCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-display font-medium tracking-wide uppercase text-neutral-300">
            {lang === 'en' ? 'Commit New Design' : '固化當前大師配色'}
          </h3>
        </div>

        <form onSubmit={triggerSave} className="flex flex-col gap-2.5">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder={t.paletteNameInput}
            maxLength={32}
            className="w-full h-10 px-3.5 bg-neutral-950 border border-neutral-800 focus:border-neutral-700 focus:ring-1 focus:ring-indigo-500/20 rounded-xl text-xs text-neutral-200 placeholder-neutral-600 outline-none transition-all duration-200"
            id="palette-name-input"
          />
          
          <button
            type="submit"
            className="w-full h-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-98 transition-all duration-200"
            id="save-palette-submit-btn"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{t.saveBtn}</span>
          </button>
        </form>

        {/* Temporary success toasts */}
        {feedbackMsg && (
          <div className="mt-3 p-2 bg-neutral-950 border border-neutral-800/80 rounded-lg text-[10px] text-emerald-400 font-mono tracking-wider text-center animate-pulse">
            ✨ {feedbackMsg}
          </div>
        )}
      </div>

      <hr className="border-neutral-800/80" />

      {/* 2. SAVED LISTS */}
      <div className="flex-1 flex flex-col min-h-[300px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FolderHeart className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-display font-medium tracking-wide uppercase text-neutral-300">
              {t.savedSectionTitle}
            </h3>
          </div>

          <span className="text-[10px] bg-neutral-950 border border-neutral-800 text-neutral-500 px-2 py-0.5 rounded-full font-mono">
            {savedPalettes.length}
          </span>
        </div>

        {/* Quick action utility buttons */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setShowImport(!showImport)}
            className="flex-1 py-1 px-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg text-[10px] text-neutral-400 hover:text-white transition-all flex items-center justify-center gap-1.5 font-medium"
            title="Import Backup JSON"
          >
            <Upload className="w-3 h-3" />
            <span>{t.importBtn}</span>
          </button>
          
          <button
            onClick={handleExport}
            className="flex-1 py-1 px-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg text-[10px] text-neutral-400 hover:text-white transition-all flex items-center justify-center gap-1.5 font-medium"
            title="Export Backup JSON"
          >
            <Download className="w-3 h-3" />
            <span>{t.exportBtn}</span>
          </button>
        </div>

        {/* Diagnostic Import panel */}
        {showImport && (
          <form onSubmit={handleImportSubmit} className="mb-4 p-3 bg-neutral-950 border border-indigo-950 rounded-xl flex flex-col gap-2">
            <label className="text-[9px] font-mono text-indigo-400 uppercase">Paste JSON Color Data</label>
            <textarea
              rows={3}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder='[{"name": "Preset", "colors": ["#111111",...], "vibe": "web"}]'
              className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-[10px] font-mono text-neutral-300 outline-none focus:border-indigo-600"
            />
            <div className="flex justify-end gap-1.5">
              <button
                type="button"
                onClick={() => setShowImport(false)}
                className="px-2 py-1 text-[9px] text-neutral-500 hover:text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-[9px] bg-indigo-600 hover:bg-indigo-500 text-white rounded-md"
              >
                Load
              </button>
            </div>
          </form>
        )}

        {/* Scrollable list of saved palettes */}
        <div className="flex-1 max-h-[360px] overflow-y-auto pr-1 flex flex-col gap-3">
          {savedPalettes.length === 0 ? (
            <div className="text-center py-8 text-neutral-600 text-xs mt-4">
              <p className="mb-1">📭</p>
              <p>{t.noSavedPalettes}</p>
            </div>
          ) : (
            savedPalettes.map((palette) => (
              <div
                key={palette.id}
                className="group/item p-3.5 bg-neutral-950 hover:bg-neutral-900/60 transition-all duration-200 border border-neutral-800/80 hover:border-neutral-700/80 rounded-xl flex flex-col gap-3 relative"
              >
                
                {/* Palette Info block */}
                <div className="flex items-center justify-between gap-1 w-full">
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-neutral-200 truncate pr-6 font-display">
                      {palette.name}
                    </h4>
                    <span className="text-[8px] text-neutral-500 uppercase font-mono tracking-wider block mt-0.5">
                      {palette.vibe === 'home' && t.previewCouch}
                      {palette.vibe === 'automotive' && t.previewCar}
                      {palette.vibe === 'watches' && t.previewWatch}
                      {palette.vibe === 'web' && t.previewWeb}
                    </span>
                  </div>

                  {/* Delete button: visible on hover */}
                  <button
                    onClick={() => onDeletePalette(palette.id)}
                    className="opacity-0 group-hover/item:opacity-100 hover:text-rose-500 text-neutral-500 p-1 rounded-md hover:bg-neutral-850 transition-all absolute right-2.5 top-2.5"
                    title={t.deleteSaved}
                    id={`delete-palette-${palette.id}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Colors visualization row */}
                <div className="flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => onLoadPalette(palette.colors)}
                    className="flex-1 flex h-7 rounded-md overflow-hidden border border-neutral-800 relative cursor-pointer"
                    title={lang === 'en' ? 'Click to load into generator workspace' : '點擊載入此配色工作區'}
                    id={`load-palette-${palette.id}`}
                  >
                    {palette.colors.map((colorHex, index) => (
                      <div
                        key={index}
                        className="flex-1 h-full"
                        style={{ backgroundColor: colorHex }}
                      />
                    ))}
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-[8px] font-mono text-white tracking-widest font-bold transition-opacity">
                      LOAD
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(palette.colors.join(', '));
                      showTransientFeedback(lang === 'en' ? 'Copied codes!' : '已複製數值！');
                    }}
                    className="p-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white rounded-md"
                    title={lang === 'en' ? 'Copy comma-separated codes' : '複製逗號分隔色碼'}
                    id={`copy-bulk-${palette.id}`}
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
      
    </div>
  );
};
