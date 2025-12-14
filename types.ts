export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  isThinking?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  promptSnippet: string;
  imageUrl: string;
}

export enum AppView {
  CHAT = 'CHAT',
  GALLERY = 'GALLERY',
  INFO = 'INFO',
  PROMPT_TESTER = 'PROMPT_TESTER',
  SETTINGS = 'SETTINGS',
}
