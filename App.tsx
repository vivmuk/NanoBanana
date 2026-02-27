import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { StyleGallery } from './components/StyleGallery';
import { InfoSection } from './components/InfoSection';
import { PromptTester } from './components/PromptTester';
import { ApiKeySettings } from './components/ApiKeySettings';
import { CustomCreations } from './components/CustomCreations';
import { AppView } from './types';
import { MessageSquare, LayoutGrid, Wand2, BookOpen, Play, Settings, Zap } from 'lucide-react';

const VIEW_TITLES: Record<AppView, string> = {
  [AppView.CHAT]: 'Architect Chat',
  [AppView.GALLERY]: 'Style Gallery',
  [AppView.CUSTOM_CREATIONS]: 'Custom Creations',
  [AppView.INFO]: 'Manual & Guide',
  [AppView.PROMPT_TESTER]: 'Prompt Tester',
  [AppView.SETTINGS]: 'Settings',
};

const MOBILE_NAV_ITEMS = [
  { view: AppView.CHAT, icon: MessageSquare, label: 'Chat' },
  { view: AppView.GALLERY, icon: LayoutGrid, label: 'Gallery' },
  { view: AppView.CUSTOM_CREATIONS, icon: Wand2, label: 'Create' },
  { view: AppView.INFO, icon: BookOpen, label: 'Guide' },
  { view: AppView.PROMPT_TESTER, icon: Play, label: 'Test' },
  { view: AppView.SETTINGS, icon: Settings, label: 'Settings' },
] as const;

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CHAT);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);

  const handleSelectPrompt = (prompt: string) => {
    setInitialPrompt(prompt);
    setCurrentView(AppView.CHAT);
  };

  const handleClearInitialPrompt = () => {
    setInitialPrompt(undefined);
  };

  const handleNavigateToSettings = () => {
    setCurrentView(AppView.SETTINGS);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.CHAT:
        return (
          <div className="flex-1 h-full w-full animate-in fade-in zoom-in-95 duration-300">
            <ChatInterface
              initialPrompt={initialPrompt}
              onClearInitialPrompt={handleClearInitialPrompt}
              onNavigateToSettings={handleNavigateToSettings}
            />
          </div>
        );
      case AppView.GALLERY:
        return (
          <div className="flex-1 h-full w-full animate-in fade-in slide-in-from-right-4 duration-300">
            <StyleGallery onSelectPrompt={handleSelectPrompt} />
          </div>
        );
      case AppView.CUSTOM_CREATIONS:
        return (
          <div className="flex-1 h-full w-full animate-in fade-in slide-in-from-right-4 duration-300">
            <CustomCreations onSelectPrompt={handleSelectPrompt} />
          </div>
        );
      case AppView.INFO:
        return (
          <div className="flex-1 h-full w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <InfoSection />
          </div>
        );
      case AppView.PROMPT_TESTER:
        return (
          <div className="flex-1 h-full w-full animate-in fade-in slide-in-from-left-4 duration-300">
            <PromptTester />
          </div>
        );
      case AppView.SETTINGS:
        return (
          <div className="flex-1 h-full w-full animate-in fade-in zoom-in-95 duration-300">
            <ApiKeySettings />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-obsidian-950 text-gray-200 overflow-hidden font-sans">

      {/* Desktop Sidebar — hidden on mobile */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      </div>

      {/* Mobile Top Header — hidden on desktop */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-obsidian-900/95 backdrop-blur-md border-b border-gray-800 flex items-center px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-banana-400 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(255,225,53,0.3)] shrink-0">
            <Zap className="w-5 h-5 text-obsidian-950 fill-current" />
          </div>
          <span className="font-bold text-sm text-white tracking-tight">
            Nano<span className="text-banana-400">Banana</span>
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">
            {VIEW_TITLES[currentView]}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col overflow-hidden
                       pt-14 pb-16 md:pt-0 md:pb-0">

        {/* Background Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-banana-500/10 rounded-full blur-[80px] pointer-events-none" />

        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation — hidden on desktop */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-obsidian-900/95 backdrop-blur-md border-t border-gray-800"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center justify-around h-16 px-1">
          {MOBILE_NAV_ITEMS.map(({ view, icon: Icon, label }) => {
            const isActive = currentView === view;
            return (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`relative flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl min-w-[52px] transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'text-banana-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                title={VIEW_TITLES[view]}
              >
                {/* Active indicator line at top */}
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-banana-400" />
                )}
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[9px] font-semibold leading-none tracking-wide uppercase">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
}

export default App;
