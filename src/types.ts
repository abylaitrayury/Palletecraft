export type Language = 'en' | 'zh';

export interface ColorBlock {
  hex: string;
  locked: boolean;
}

export type ProjectVibeType = 'home' | 'automotive' | 'watches' | 'web';

export interface SavedPalette {
  id: string;
  name: string;
  colors: string[];
  vibe: ProjectVibeType;
  createdAt: number;
}

export interface PresetVibe {
  keywords: string[];
  colors: string[];
  nameEn: string;
  nameZh: string;
}

// Translations structure
export interface TranslationSchema {
  title: string;
  subtitle: string;
  aiSectionTitle: string;
  aiPlaceholder: string;
  generateBtn: string;
  randomizePrompt: string;
  spacebarTip: string;
  vibeDropdownLabel: string;
  savedSectionTitle: string;
  noSavedPalettes: string;
  placeholderPaletteName: string;
  paletteNameInput: string;
  saveBtn: string;
  previewTitle: string;
  previewCouch: string;
  previewCar: string;
  previewWatch: string;
  previewWeb: string;
  hexCopied: string;
  paletteSaved: string;
  aiThinking: string;
  lockTip: string;
  unlockTip: string;
  copyTip: string;
  deleteSaved: string;
  aiResultTitle: string;
  recentSaved: string;
  importBtn: string;
  exportBtn: string;
  exportSuccess: string;
  importSuccess: string;
  importFailed: string;
  saturation: string;
  brightness: string;
  colorContrastAlert: string;
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    title: "PaletteCraft",
    subtitle: "Aesthetic Color Palette Generator & Playground",
    aiSectionTitle: "AI Palette Generator",
    aiPlaceholder: "Describe a mood, scene, or vibe (e.g., 'Rainy day in Kyoto' or 'Cyberpunk sports car')...",
    generateBtn: "Generate with AI",
    randomizePrompt: "Randomize Colors",
    spacebarTip: "Press [Spacebar] to randomize unlocked colors",
    vibeDropdownLabel: "Project Vibe Theme Mode",
    savedSectionTitle: "Saved Palettes",
    noSavedPalettes: "No saved palettes yet. Craft some and save above!",
    placeholderPaletteName: "My Sleek Palette",
    paletteNameInput: "Palette Name...",
    saveBtn: "Save Current Palette",
    previewTitle: "Live Preview Sandbox",
    previewCouch: "Interior Decor",
    previewCar: "Automotive Concepts",
    previewWatch: "Luxury Horizon Watch",
    previewWeb: "Web Application UI",
    hexCopied: "Hex copied to clipboard!",
    paletteSaved: "Palette saved successfully to your collection!",
    aiThinking: "AI is analyzing & dreaming colors...",
    lockTip: "Lock Color",
    unlockTip: "Unlock Color",
    copyTip: "Copy Hex Code",
    deleteSaved: "Remove Palette",
    aiResultTitle: "AI Crafted Theme:",
    recentSaved: "Recently Saved Work",
    importBtn: "Import",
    exportBtn: "Export",
    exportSuccess: "Palette data copied to clipboard!",
    importSuccess: "Palette imported successfully!",
    importFailed: "Failed to parse imported data.",
    saturation: "Saturation",
    brightness: "Brightness",
    colorContrastAlert: "Aesthetic match configured successfully!"
  },
  zh: {
    title: "色彩工坊 PaletteCraft",
    subtitle: "美學配色方案生成器與互動沙盒",
    aiSectionTitle: "AI 智慧生成色票",
    aiPlaceholder: "請輸入描述或氛圍（例如：'京都的雨天'、'電競霓虹跑車'、'復古底片'）...",
    generateBtn: "AI 智慧生成",
    randomizePrompt: "隨機配色",
    spacebarTip: "按下 [空白鍵] 可以隨機更換未鎖定的顏色",
    vibeDropdownLabel: "模擬專案風格類別",
    savedSectionTitle: "已儲存的色票",
    noSavedPalettes: "尚無儲存的色票。快在上方設計一組並儲存吧！",
    placeholderPaletteName: "我的極簡質感色調",
    paletteNameInput: "請輸入色票名稱...",
    saveBtn: "儲存此配色方案",
    previewTitle: "即時設計效果預覽",
    previewCouch: "居家室內設計",
    previewCar: "奢華跑車外觀",
    previewWatch: "精品機械腕錶",
    previewWeb: "響應式網站 UI",
    hexCopied: "已成功複製色碼！",
    paletteSaved: "配色方案已成功儲存至集合！",
    aiThinking: "AI 正在分析光影與色彩意境...",
    lockTip: "鎖定顏色",
    unlockTip: "解鎖顏色",
    copyTip: "複製色碼",
    deleteSaved: "刪除色票",
    aiResultTitle: "AI 智慧配色結果：",
    recentSaved: "歷史色票收納庫",
    importBtn: "導入",
    exportBtn: "導出",
    exportSuccess: "已將色票數據複製到剪貼簿！",
    importSuccess: "成功導入配色色票！",
    importFailed: "導入格式有誤，無法解析。",
    saturation: "飽和度",
    brightness: "亮度",
    colorContrastAlert: "美學搭配設定完成！"
  }
};

// Preset palette matching dict
export const AI_VIBES_DICTIONARY: PresetVibe[] = [
  {
    keywords: ["rainy", "kyoto", "temple", "雨", "京都", "寺廟", "古色", "靜謐", "憂鬱", "cloudy"],
    colors: ["#2d3748", "#4a5568", "#718096", "#a0aec0", "#e2e8f0"],
    nameEn: "Rainy Day in Kyoto",
    nameZh: "京都雨日"
  },
  {
    keywords: ["cyberpunk", "sport", "neon", "car", "neon", "racer", "跑車", "賽車", "霓虹", "科技", "電子", "未來"],
    colors: ["#0d1117", "#ff007f", "#3b82f6", "#8b5cf6", "#05f3ff"],
    nameEn: "Cyberpunk Sports Car",
    nameZh: "電競霓虹跑車"
  },
  {
    keywords: ["nature", "forest", "mountain", "tree", "plant", "自然", "森林", "山脈", "大自然", "綠色", "植栽", "生態"],
    colors: ["#1e352f", "#386641", "#6a994e", "#a7c957", "#f2e8cf"],
    nameEn: "Deep Alpine Woods",
    nameZh: "高山深邃森林"
  },
  {
    keywords: ["vintage", "film", "retro", "kodak", "polaroid", "復古", "底片", "柯達", "懷舊", "老舊", "相機", "古著"],
    colors: ["#8c2f1b", "#d97706", "#f59e0b", "#4b5320", "#fef3c7"],
    nameEn: "70s Rich Vintage Film",
    nameZh: "70年代懷舊底片"
  },
  {
    keywords: ["cozy", "home", "autumn", "fall", "wood", "warm", "溫馨", "溫暖", "居家", "秋天", "木質", "木頭", "臥室", "小木屋"],
    colors: ["#4a3728", "#8c6239", "#b38b6d", "#d7ccc8", "#fcfcfc"],
    nameEn: "Cozy Autumn Fireplace",
    nameZh: "暖秋壁爐小屋"
  },
  {
    keywords: ["ocean", "sea", "beach", "deep", "blue", "water", "海洋", "深海", "沙灘", "水藍", "蔚藍", "夏天", "浪花"],
    colors: ["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"],
    nameEn: "Deep Sea Horizon",
    nameZh: "蔚藍深海地平線"
  },
  {
    keywords: ["luxury", "gold", "watch", "jewelry", "royal", "奢華", "尊貴", "高雅", "黃金", "腕錶", "時光", "金屬", "黑金"],
    colors: ["#111111", "#1c1c1c", "#b5a642", "#d4af37", "#f3e5ab"],
    nameEn: "Luxury Imperial Gold",
    nameZh: "皇家璀璨奢華黑金"
  },
  {
    keywords: ["aurora", "night", "sky", "star", "space", "極光", "星空", "銀河", "太空", "宇宙", "行星", "璀璨"],
    colors: ["#020c1b", "#0b2545", "#134074", "#8da9c4", "#eef4f8"],
    nameEn: "Starry Aurora Sky",
    nameZh: "極光浩瀚星穹"
  },
  {
    keywords: ["sunset", "sunrise", "beach", "orange", "pink", "夕陽", "晚霞", "黎明", "晨曦", "橙色", "粉紅", "日落"],
    colors: ["#fc143c", "#f368e0", "#ff9f43", "#ee5253", "#10ac84"],
    nameEn: "Vibrant Horizon Sunset",
    nameZh: "落日晚霞餘暉"
  },
  {
    keywords: ["sakura", "cherry", "spring", "pink", "bloom", "櫻花", "春天", "粉嫩", "花見", "盛開", "浪漫"],
    colors: ["#ffccd5", "#ffb3c1", "#ff8fa3", "#ff758f", "#fff0f3"],
    nameEn: "Spring Sakura Blossom",
    nameZh: "京都盛櫻春景"
  },
  {
    keywords: ["coffee", "cafe", "latte", "espresso", "brown", "咖啡", "文青", "烘焙", "下午茶", "大地色", "卡布奇諾"],
    colors: ["#36220f", "#603f26", "#9a7b56", "#ddc3a5", "#fff8f0"],
    nameEn: "Hipster Espresso Cafe",
    nameZh: "街角文青咖啡館"
  },
  {
    keywords: ["matcha", "tea", "green", "zen", "抹香", "抹茶", "茶道", "禪風", "綠茶", "日式", "清心"],
    colors: ["#1c3a27", "#2e5a36", "#557c3e", "#a3b899", "#f5f6f4"],
    nameEn: "Zen Matcha Garden",
    nameZh: "禪道宇治抹茶"
  }
];
