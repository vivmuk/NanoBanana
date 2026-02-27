export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  isThinking?: boolean;
  imageUrl?: string;
  comparisonImages?: { modelId: string; modelName: string; imageUrl: string }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  promptSnippet: string;
  imageUrl: string;
}

export interface AspectRatioOption {
  label: string;
  width: number;
  height: number;
}

export interface ResolutionTier {
  label: string;
  base: number;
  usd: number;
}

export interface PromptHistoryItem {
  id: string;
  prompt: string;
  timestamp: number;
  modelId: string;
  aspectRatioLabel: string;
  resolutionLabel: string;
  imageUrl?: string;
}

export enum AppView {
  CHAT = 'CHAT',
  GALLERY = 'GALLERY',
  INFO = 'INFO',
  PROMPT_TESTER = 'PROMPT_TESTER',
  SETTINGS = 'SETTINGS',
}
