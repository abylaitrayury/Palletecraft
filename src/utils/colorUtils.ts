import { AI_VIBES_DICTIONARY, PresetVibe } from '../types';

/**
 * Generates a random high-quality hexadecimal color code.
 */
export function generateRandomHex(): string {
  const chars = '0123456789abcdef';
  let hex = '#';
  for (let i = 0; i < 6; i++) {
    hex += chars[Math.floor(Math.random() * 16)];
  }
  return hex;
}

/**
 * Generates highly sophisticated coordinated palettes based on aesthetic vibes.
 * Utilized when a custom description doesn't explicitly match dictionary keywords.
 */
export function generateCoordinatedPalette(): string[] {
  const modes = ['retro', 'tech', 'pastel', 'corporate', 'sunset', 'warm', 'forest'];
  const chosenMode = modes[Math.floor(Math.random() * modes.length)];

  switch (chosenMode) {
    case 'retro':
      return [
        getRandomColorFromList(['#d4a373', '#8c2f1b', '#3d5a80', '#e07a5f', '#f4f1de']),
        getRandomColorFromList(['#f2cc8f', '#e07a5f', '#81b29a', '#f4f1de', '#3d5a80']),
        getRandomColorFromList(['#ae2012', '#ca6702', '#0a9396', '#94d2bd', '#ee9b00']),
        getRandomColorFromList(['#e9d8a6', '#005f73', '#0a9396', '#ae2012', '#9b2226']),
        getRandomColorFromList(['#f4f1de', '#e9d8a6', '#cb997e', '#a5a58d', '#6b705c']),
      ];
    case 'tech':
      return [
        getRandomColorFromList(['#0b0c10', '#0f172a', '#17252a', '#0d1b2a', '#1a1a2e']),
        getRandomColorFromList(['#1f2833', '#1e293b', '#2b7a78', '#1b263b', '#16213e']),
        getRandomColorFromList(['#c5c6c7', '#38bdf8', '#3aafa9', '#415a77', '#0f3460']),
        getRandomColorFromList(['#66fcf1', '#f43f5e', '#def2f1', '#778da9', '#e94560']),
        getRandomColorFromList(['#45a29e', '#06b6d4', '#feffff', '#e0e1dd', '#ffffff']),
      ];
    case 'pastel':
      return [
        getRandomColorFromList(['#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#ff9aa2']),
        getRandomColorFromList(['#c7ceea', '#e8d7ff', '#ffd3e8', '#ffd8cc', '#e2f0cb']),
        getRandomColorFromList(['#ffd3b6', '#ffd1dc', '#cff4fc', '#d1e7dd', '#fff3cd']),
        getRandomColorFromList(['#ffb7c5', '#ff9ebb', '#ffcad4', '#b388eb', '#98f5e1']),
        getRandomColorFromList(['#ffccd5', '#ffb3c1', '#dbf9f0', '#edf2f4', '#f1f5f9']),
      ];
    case 'corporate':
      return [
        getRandomColorFromList(['#1e3a8a', '#1e1b4b', '#0f172a', '#0a192f', '#0d1e36']),
        getRandomColorFromList(['#2563eb', '#312e81', '#1e293b', '#112240', '#1c315e']),
        getRandomColorFromList(['#3b82f6', '#4338ca', '#3b82f6', '#233554', '#227c9d']),
        getRandomColorFromList(['#60a5fa', '#4f46e5', '#64748b', '#64ffda', '#17c3b2']),
        getRandomColorFromList(['#93c5fd', '#818cf8', '#f1f5f9', '#ccd6f6', '#feefdd']),
      ];
    case 'sunset':
      return [
        getRandomColorFromList(['#ff4e50', '#8a2387', '#200122', '#eb3349', '#5f2c82']),
        getRandomColorFromList(['#f9d423', '#e94057', '#6f0000', '#f45c43', '#49a09d']),
        getRandomColorFromList(['#f27121', '#f27121', '#ff9900', '#ee0979', '#ff512f']),
        getRandomColorFromList(['#f12711', '#ee0979', '#ffdd00', '#ff007f', '#dd2476']),
        getRandomColorFromList(['#f5af19', '#ff007f', '#ffffff', '#ffd200', '#f9d423']),
      ];
    case 'warm':
      return [
        getRandomColorFromList(['#6e473b', '#483c32', '#3e2723', '#4a3728', '#2d1e18']),
        getRandomColorFromList(['#a1685a', '#6d4c41', '#5d4037', '#8c6239', '#5c4033']),
        getRandomColorFromList(['#d4a297', '#8d6e63', '#8d6e63', '#b38b6d', '#8b5a2b']),
        getRandomColorFromList(['#f4dcd6', '#d7ccc8', '#bcaaa4', '#d7ccc8', '#cd853f']),
        getRandomColorFromList(['#fff4f2', '#f5f5f5', '#efebe9', '#fcfcfc', '#f5f5dc']),
      ];
    default: // forest
      return [
        getRandomColorFromList(['#132a13', '#1a3a2a', '#0f291e', '#1e352f', '#091e14']),
        getRandomColorFromList(['#31572c', '#2c5d3d', '#1b4332', '#386641', '#143625']),
        getRandomColorFromList(['#4f772d', '#40916c', '#2d6a4f', '#6a994e', '#205036']),
        getRandomColorFromList(['#90a955', '#52b788', '#40916c', '#a7c957', '#2e8b57']),
        getRandomColorFromList(['#ecf39e', '#74c69d', '#b7e4c7', '#f2e8cf', '#98ff98']),
      ];
  }
}

/**
 * Select a random color from an array.
 */
function getRandomColorFromList(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Calculates relative luminance to estimate contrast/brightness.
 */
export function getLuminance(hex: string): number {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Determines whether light or dark is better suited for foreground text/indices.
 */
export function getContrastYIQ(hex: string): 'light' | 'dark' {
  const luminance = getLuminance(hex);
  return luminance > 0.52 ? 'dark' : 'light';
}

/**
 * Analyzes the human input string (English or Traditional Chinese) and matches
 * the most appropriate coordinated palette using simple substring keyword matching.
 */
export function matchAiVibe(input: string): PresetVibe | null {
  if (!input) return null;
  const cleanInput = input.trim().toLowerCase();

  for (const item of AI_VIBES_DICTIONARY) {
    // Check if any keyword matches
    const hasMatch = item.keywords.some(keyword => {
      return cleanInput.includes(keyword.toLowerCase());
    });
    if (hasMatch) {
      return item;
    }
  }

  return null;
}
