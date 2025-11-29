import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { ChatMessage } from './ChatMessage';
import { sendMessage, initializeChat, resetChat, generateImage } from '../services/veniceService';
import { Send, RefreshCw, StopCircle, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ChatInterfaceProps {
  initialPrompt?: string;
  onClearInitialPrompt: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialPrompt, onClearInitialPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isGeneratingImage]);

  // Initialize chat on mount or if prompt passed from gallery
  useEffect(() => {
    const init = async () => {
      if (!isInitialized) {
        resetChat();
        await initializeChat();
        setIsInitialized(true);
        
        // Add initial greeting from the system (simulated)
        setMessages([
          {
            id: 'init-1',
            role: 'model',
            content: "Hello. I am the **Nano Banana Architect**.\n\nI am here to help you construct a highly structured, professional prompt for Nano Banana Pro. We will move through the 8 areas of the **Prompt Canvas** together.\n\nFirst, tell me about your **Intent & Goal**. What are we creating today? (e.g., A comic page, a dashboard, a logo, a concept art piece?)"
          }
        ]);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Handle incoming prompt from Gallery
  useEffect(() => {
    if (initialPrompt && isInitialized) {
        handleSend(initialPrompt);
        onClearInitialPrompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt, isInitialized]);


  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Add a temporary loading message for streaming
      const loadingId = 'loading-' + Date.now();
      let accumulatedContent = '';
      
      setMessages((prev) => [...prev, { id: loadingId, role: 'model', content: '', isThinking: true }]);

      // Get current messages (including the new user message) for context
      const currentMessages = [...messages, userMsg];
      
      // Stream the response
      await sendMessage(currentMessages, (chunk: string) => {
        accumulatedContent += chunk;
        // Update the loading message with accumulated content
        setMessages((prev) => {
          return prev.map(m => 
            m.id === loadingId 
              ? { ...m, content: accumulatedContent, isThinking: false }
              : m
          );
        });
      });

    } catch (error: any) {
      console.error(error);
      setMessages((prev) => {
        const filtered = prev.filter(m => !m.isThinking);
        return [...filtered, {
          id: Date.now().toString(),
          role: 'model',
          content: `**Error:** ${error.message || "Unable to connect to the Architect. Please check your connection or API key."}`
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = async () => {
    setMessages([]);
    setIsInitialized(false);
    resetChat();
    await initializeChat();
    setIsInitialized(true);
    setMessages([
        {
          id: 'restart-1',
          role: 'model',
          content: "Session reset. I am ready to start a new architecture process.\n\nWhat is your **Intent & Goal** for this new project?"
        }
      ]);
  };

  const extractPromptFromMessage = (content: string): string | null => {
    const regex = /\[PROMPT START\]([\s\S]*?)\[PROMPT END\]/;
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  };

  const handleGeneratePreview = async (promptText: string) => {
    setIsGeneratingImage(true);
    try {
      // 1. Check API Key
      // Cast to any to avoid type conflict with global window.aistudio definition if it exists
      const win = window as any;
      if (win.aistudio && win.aistudio.hasSelectedApiKey) {
        const hasKey = await win.aistudio.hasSelectedApiKey();
        if (!hasKey) {
            if (win.aistudio.openSelectKey) {
                await win.aistudio.openSelectKey();
                // Guideline: Assume success and proceed to mitigate race condition.
                // Do not check hasSelectedApiKey() again immediately.
            }
        }
      }

      // 2. Generate Image
      const imageDataUrl = await generateImage(promptText);

      // 3. Append Image Message
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        content: `**Preview Generated:**\n\n![Generated Image](${imageDataUrl})`
      }]);

    } catch (error: any) {
        console.error("Preview generation failed:", error);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'model',
            content: `**Error Generating Preview:** ${error.message || "Unknown error."}`
        }]);
    } finally {
        setIsGeneratingImage(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto relative">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2 pb-32 scroll-smooth">
        {messages.map((msg) => {
            const promptCode = extractPromptFromMessage(msg.content);
            return (
                <div key={msg.id} className="flex flex-col">
                    <ChatMessage message={msg} />
                    {/* Render Generate Button if prompt is detected in this message */}
                    {!msg.isThinking && msg.role === 'model' && promptCode && (
                        <div className="ml-16 -mt-4 mb-8">
                             <button
                                onClick={() => handleGeneratePreview(promptCode)}
                                disabled={isGeneratingImage}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-banana-400 to-banana-500 hover:from-banana-300 hover:to-banana-400 text-obsidian-950 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                                {isGeneratingImage ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Generating Preview...
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon className="w-4 h-4" />
                                        Generate Image Preview
                                    </>
                                )}
                             </button>
                             <p className="text-xs text-gray-500 mt-2 ml-1 max-w-md">
                                *Uses Nano Banana Pro model via Venice API.
                             </p>
                        </div>
                    )}
                </div>
            );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-obsidian-950 via-obsidian-950 to-transparent pt-10 pb-6 px-4 md:px-8">
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-banana-400/5 blur-xl rounded-full pointer-events-none"></div>
          <div className="flex items-end gap-3 bg-obsidian-900 border border-gray-800 rounded-2xl p-2 shadow-2xl focus-within:border-banana-400/50 focus-within:ring-1 focus-within:ring-banana-400/20 transition-all">
            
            <button 
              onClick={handleRestart}
              className="p-3 text-gray-500 hover:text-banana-400 hover:bg-gray-800 rounded-xl transition-colors"
              title="Restart Session"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(inputText);
                }
              }}
              placeholder="Describe your idea..."
              className="flex-1 bg-transparent border-none text-gray-200 placeholder-gray-500 resize-none max-h-32 py-3 px-2 focus:ring-0 text-base font-sans"
              rows={1}
            />

            <button
              onClick={() => handleSend(inputText)}
              disabled={isLoading || !inputText.trim()}
              className={`p-3 rounded-xl transition-all duration-200 ${
                isLoading || !inputText.trim()
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-banana-400 text-obsidian-950 hover:bg-banana-300 shadow-[0_0_15px_rgba(255,225,53,0.4)]'
              }`}
            >
              {isLoading ? <StopCircle className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">
                Powered by Venice AI (qwen3-4b) • Nano Banana Architect v1.0
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
