import React from 'react';
import { AppView } from '../types';
import { MessageSquare, LayoutGrid, Zap, BookOpen, Play, Settings, Wand2 } from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  return (
    <div className="h-full w-20 lg:w-64 bg-obsidian-900 border-r border-gray-800 flex flex-col items-center py-8">

      {/* Brand */}
      <div className="flex items-center gap-3 px-6 mb-10 w-full justify-center lg:justify-start">
        <div className="w-10 h-10 bg-banana-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,225,53,0.3)] shrink-0 overflow-visible">
          <Zap className="w-7 h-7 text-obsidian-950 fill-current" />
        </div>
        <span className="hidden lg:block font-bold text-lg text-white tracking-tight">
          Nano<span className="text-banana-400">Banana</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 w-full px-4">
        <button
          onClick={() => onChangeView(AppView.CHAT)}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 w-full ${
            currentView === AppView.CHAT
              ? 'bg-gray-800 text-banana-400 shadow-inner'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
          }`}
          title="Architect Chat"
        >
          <MessageSquare className="w-6 h-6 shrink-0" />
          <span className="hidden lg:block font-medium">Architect Chat</span>
        </button>

        <button
          onClick={() => onChangeView(AppView.GALLERY)}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 w-full ${
            currentView === AppView.GALLERY
              ? 'bg-gray-800 text-banana-400 shadow-inner'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
          }`}
          title="Style Gallery"
        >
          <LayoutGrid className="w-6 h-6 shrink-0" />
          <span className="hidden lg:block font-medium">Style Gallery</span>
        </button>

        <button
          onClick={() => onChangeView(AppView.CUSTOM_CREATIONS)}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 w-full ${
            currentView === AppView.CUSTOM_CREATIONS
              ? 'bg-gray-800 text-banana-400 shadow-inner'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
          }`}
          title="Custom Creations"
        >
          <Wand2 className="w-6 h-6 shrink-0" />
          <span className="hidden lg:block font-medium">Custom Creations</span>
        </button>

        <button
          onClick={() => onChangeView(AppView.INFO)}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 w-full ${
            currentView === AppView.INFO
              ? 'bg-gray-800 text-banana-400 shadow-inner'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
          }`}
          title="Manual & Guide"
        >
          <BookOpen className="w-6 h-6 shrink-0" />
          <span className="hidden lg:block font-medium">Manual</span>
        </button>

        <button
          onClick={() => onChangeView(AppView.PROMPT_TESTER)}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 w-full ${
            currentView === AppView.PROMPT_TESTER
              ? 'bg-gray-800 text-banana-400 shadow-inner'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
          }`}
          title="Prompt Tester"
        >
          <Play className="w-6 h-6 shrink-0" />
          <span className="hidden lg:block font-medium">Test Prompt</span>
        </button>

        <button
          onClick={() => onChangeView(AppView.SETTINGS)}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 w-full ${
            currentView === AppView.SETTINGS
              ? 'bg-gray-800 text-banana-400 shadow-inner'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
          }`}
          title="Settings"
        >
          <Settings className="w-6 h-6 shrink-0" />
          <span className="hidden lg:block font-medium">Settings</span>
        </button>
      </nav>

      {/* Footer / Status */}
      <div className="flex flex-col items-center lg:items-start w-full px-6 mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="hidden lg:block text-xs text-gray-500 font-mono">System Online</span>
        </div>
      </div>

    </div>
  );
};
