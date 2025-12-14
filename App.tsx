import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { StyleGallery } from './components/StyleGallery';
import { InfoSection } from './components/InfoSection';
import { PromptTester } from './components/PromptTester';
import { ApiKeySettings } from './components/ApiKeySettings';
import { AppView } from './types';

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
    <div className="flex flex-col md:flex-row h-screen w-screen bg-obsidian-950 text-gray-200 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <div className="order-2 md:order-1 flex-shrink-0">
        <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      </div>

      {/* Main Content Area */}
      <main className="order-1 md:order-2 flex-1 relative flex flex-col h-[calc(100vh-80px)] md:h-screen overflow-hidden">
        
        {/* Background Gradients for Aesthetics */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-banana-500/10 rounded-full blur-[80px] pointer-events-none" />

        {renderContent()}
      </main>

    </div>
  );
}

export default App;