import React, { useState, useRef, useEffect } from 'react';
import { Message, AspectRatioOption, ResolutionTier } from '../types';
import { ChatMessage } from './ChatMessage';
import {
  sendMessage, initializeChat, resetChat, generateImage, hasApiKey,
  IMAGE_MODELS, DEFAULT_IMAGE_MODEL,
  ASPECT_RATIOS, RESOLUTION_TIERS,
  getScaledDimensions, estimateCost,
  savePromptToHistory,
} from '../services/veniceService';
import { Send, RefreshCw, StopCircle, Image as ImageIcon, Loader2, AlertCircle, Settings, GitCompare } from 'lucide-react';

interface ChatInterfaceProps {
  initialPrompt?: string;
  onClearInitialPrompt: () => void;
  onNavigateToSettings?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialPrompt, onClearInitialPrompt, onNavigateToSettings }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showApiKeyWarning, setShowApiKeyWarning] = useState(!hasApiKey());

  // Generation settings (global — applies to whichever "Generate Preview" is clicked)
  const [selectedImageModel, setSelectedImageModel] = useState(DEFAULT_IMAGE_MODEL);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatioOption>(ASPECT_RATIOS[0]);
  const [selectedResolutionTier, setSelectedResolutionTier] = useState<ResolutionTier>(RESOLUTION_TIERS[0]);
  const [compareMode, setCompareMode] = useState(false);

  // Prompt versioning: msgId → version number
  const [promptVersionMap, setPromptVersionMap] = useState<Map<string, number>>(new Map());
  const promptVersionCounter = useRef(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ---- Scroll helpers ----
  const scrollToBottom = (force = false, immediate = false) => {
    if (!messagesContainerRef.current || !messagesEndRef.current) return;
    const container = messagesContainerRef.current;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
    if (isNearBottom || force || shouldAutoScrollRef.current) {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      const scroll = () => messagesEndRef.current?.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'end' });
      immediate ? scroll() : requestAnimationFrame(() => { scrollTimeoutRef.current = setTimeout(scroll, 10); });
    }
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const c = messagesContainerRef.current;
    shouldAutoScrollRef.current = c.scrollHeight - c.scrollTop - c.clientHeight < 200;
  };

  useEffect(() => { if (messagesContainerRef.current) messagesContainerRef.current.scrollTop = 0; }, []);
  useEffect(() => { scrollToBottom(false, false); }, [messages, isLoading, isGeneratingImage]);

  // ---- API key watch ----
  useEffect(() => {
    const check = () => setShowApiKeyWarning(!hasApiKey());
    check();
    const onStorage = (e: StorageEvent) => { if (e.key === 'VENICE_API_KEY') check(); };
    window.addEventListener('storage', onStorage);
    const iv = setInterval(check, 1000);
    return () => { window.removeEventListener('storage', onStorage); clearInterval(iv); };
  }, []);

  // ---- Init chat ----
  useEffect(() => {
    const init = async () => {
      if (!isInitialized) {
        resetChat();
        await initializeChat();
        setIsInitialized(true);
        setMessages([{
          id: 'init-1', role: 'model',
          content: "Hello. I am the **Nano Banana Architect**.\n\nI generate complete, professional prompts for Nano Banana Pro based on your description. Simply tell me what you want to create, and I'll build a structured prompt using the 8-area Prompt Canvas.\n\nWhat would you like to create? (e.g., A comic page, a dashboard, a logo, a concept art piece, etc.)"
        }]);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialPrompt && isInitialized) {
      handleSend(initialPrompt);
      onClearInitialPrompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt, isInitialized]);

  // ---- Send message ----
  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const loadingId = 'loading-' + Date.now();
      let accumulatedContent = '';
      setMessages((prev) => [...prev, { id: loadingId, role: 'model', content: '', isThinking: true }]);

      const currentMessages = [...messages, userMsg];
      await sendMessage(currentMessages, (chunk: string) => {
        accumulatedContent += chunk;
        setMessages((prev) => prev.map(m => m.id === loadingId ? { ...m, content: accumulatedContent, isThinking: false } : m));
        scrollToBottom(false, false);
      });

      const promptCode = extractPromptFromMessage(accumulatedContent);
      if (promptCode) {
        localStorage.setItem('lastGeneratedPrompt', promptCode);
        // Assign version number to this message
        promptVersionCounter.current += 1;
        const version = promptVersionCounter.current;
        setPromptVersionMap(prev => new Map(prev).set(loadingId, version));
      }
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => {
        const filtered = prev.filter(m => !m.isThinking);
        return [...filtered, { id: Date.now().toString(), role: 'model', content: `**Error:** ${error.message || 'Unable to connect to the Architect. Please check your connection or API key.'}` }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = async () => {
    setMessages([]);
    setIsInitialized(false);
    promptVersionCounter.current = 0;
    setPromptVersionMap(new Map());
    resetChat();
    await initializeChat();
    setIsInitialized(true);
    setMessages([{ id: 'restart-1', role: 'model', content: "Session reset. I am ready to generate a new prompt.\n\nWhat would you like to create?" }]);
  };

  const extractPromptFromMessage = (content: string): string | null => {
    const match = content.match(/\[PROMPT START\]([\s\S]*?)\[PROMPT END\]/);
    return match ? match[1].trim() : null;
  };

  // ---- Generate image preview ----
  const handleGeneratePreview = async (promptText: string) => {
    setIsGeneratingImage(true);
    const { width, height } = getScaledDimensions(
      selectedAspectRatio,
      selectedImageModel === 'nano-banana-2' ? selectedResolutionTier : RESOLUTION_TIERS[0]
    );

    try {
      if (compareMode) {
        // Generate with both models in parallel
        const [r1, r2] = await Promise.allSettled([
          generateImage(promptText, IMAGE_MODELS[0].id, width, height),
          generateImage(promptText, IMAGE_MODELS[1].id, width, height),
        ]);

        const comparisonImages = IMAGE_MODELS.map((m, i) => {
          const result = i === 0 ? r1 : r2;
          return {
            modelId: m.id,
            modelName: m.name,
            imageUrl: result.status === 'fulfilled' ? result.value : '',
          };
        }).filter(c => c.imageUrl);

        setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'model',
          content: '**Comparison Preview:**',
          comparisonImages,
        }]);

        // Save both to history
        comparisonImages.forEach(ci => {
          savePromptToHistory({
            id: `${Date.now()}-${ci.modelId}`,
            prompt: promptText,
            timestamp: Date.now(),
            modelId: ci.modelId,
            aspectRatioLabel: selectedAspectRatio.label,
            resolutionLabel: selectedResolutionTier.label,
            imageUrl: ci.imageUrl.startsWith('http') ? ci.imageUrl : undefined,
          });
        });
      } else {
        const imageDataUrl = await generateImage(promptText, selectedImageModel, width, height);
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', content: '**Preview Generated:**', imageUrl: imageDataUrl }]);
        savePromptToHistory({
          id: Date.now().toString(),
          prompt: promptText,
          timestamp: Date.now(),
          modelId: selectedImageModel,
          aspectRatioLabel: selectedAspectRatio.label,
          resolutionLabel: selectedImageModel === 'nano-banana-2' ? selectedResolutionTier.label : '1K',
          imageUrl: imageDataUrl.startsWith('http') ? imageDataUrl : undefined,
        });
      }
    } catch (error: any) {
      console.error('Preview generation failed:', error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', content: `**Error Generating Preview:** ${error.message || 'Unknown error.'}` }]);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // ---- Derived values ----
  const effectiveResolution = selectedImageModel === 'nano-banana-2' ? selectedResolutionTier : RESOLUTION_TIERS[0];
  const { width: previewW, height: previewH } = getScaledDimensions(selectedAspectRatio, effectiveResolution);
  const cost = estimateCost(compareMode ? 'nano-banana-2' : selectedImageModel, effectiveResolution.label);
  const compareCost = compareMode ? (estimateCost('nano-banana-2', effectiveResolution.label) ?? 0) : 0;
  const totalCost = compareMode
    ? compareCost  // nano-banana-pro cost unknown; show nb2 cost as minimum indicator
    : (cost ?? null);

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto relative font-sans">

      {/* API Key Warning Banner */}
      {showApiKeyWarning && !hasApiKey() && (
        <div className="mx-4 md:mx-8 mt-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-yellow-200 font-semibold mb-1">API Key Required</p>
            <p className="text-xs text-yellow-300/80 mb-3">Please add your Venice AI API key in Settings to use the Architect and generate images.</p>
            {onNavigateToSettings && (
              <button onClick={() => { onNavigateToSettings(); setShowApiKeyWarning(false); }}
                className="flex items-center gap-2 px-3 py-1.5 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 rounded-lg text-xs font-semibold transition-colors border border-yellow-400/30">
                <Settings className="w-3 h-3" /> Go to Settings
              </button>
            )}
          </div>
          <button onClick={() => setShowApiKeyWarning(false)} className="text-yellow-400/60 hover:text-yellow-300 transition-colors" title="Dismiss">
            <StopCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Messages Area */}
      <div ref={messagesContainerRef} onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2 pb-4 scroll-smooth">
        {messages.map((msg) => {
          const promptCode = extractPromptFromMessage(msg.content);
          const version = promptVersionMap.get(msg.id);
          return (
            <div key={msg.id} className="flex flex-col">
              <ChatMessage message={msg} />
              {/* Generate button below each prompt code block */}
              {!msg.isThinking && msg.role === 'model' && promptCode && (
                <div className="ml-16 -mt-4 mb-8 flex items-center gap-2">
                  {version !== undefined && (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-banana-400/10 text-banana-400/70 border border-banana-400/20 rounded-full">
                      v{version}
                    </span>
                  )}
                  <button
                    onClick={() => handleGeneratePreview(promptCode)}
                    disabled={isGeneratingImage}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-banana-400 to-banana-500 hover:from-banana-300 hover:to-banana-400 text-obsidian-950 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingImage ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Generating…</>
                    ) : (
                      <><ImageIcon className="w-4 h-4" />{compareMode ? 'Compare Both Models' : 'Generate Preview'}</>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
        <div className="h-72 w-full flex-shrink-0" id="chat-spacer" />
        <div ref={messagesEndRef} />
      </div>

      {/* Input + Settings Area */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-obsidian-950 via-obsidian-950 to-transparent pt-10 pb-4 px-4 md:px-8 pointer-events-none">
        <div className="relative max-w-4xl mx-auto pointer-events-auto space-y-2">
          <div className="absolute inset-0 bg-banana-400/5 blur-xl rounded-full pointer-events-none" />

          {/* ---- Generation Settings Bar ---- */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-1">

            {/* Model pills */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider font-mono mr-1">Model</span>
              {IMAGE_MODELS.map((m) => (
                <button key={m.id} onClick={() => setSelectedImageModel(m.id)} title={m.description}
                  disabled={compareMode}
                  className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border transition-all disabled:opacity-40 ${
                    (compareMode || selectedImageModel === m.id)
                      ? 'bg-banana-400/15 border-banana-400/60 text-banana-400'
                      : 'bg-transparent border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                  }`}>
                  {compareMode ? m.name : (selectedImageModel === m.id ? m.name : m.name)}
                </button>
              ))}
            </div>

            {/* Aspect ratio pills */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider font-mono mr-1">Ratio</span>
              {ASPECT_RATIOS.map((ar) => (
                <button key={ar.label} onClick={() => setSelectedAspectRatio(ar)}
                  className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border transition-all ${
                    selectedAspectRatio.label === ar.label
                      ? 'bg-banana-400/15 border-banana-400/60 text-banana-400'
                      : 'bg-transparent border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                  }`}>
                  {ar.label}
                </button>
              ))}
            </div>

            {/* Resolution tiers — only nano-banana-2 */}
            {(selectedImageModel === 'nano-banana-2' || compareMode) && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-600 uppercase tracking-wider font-mono mr-1">Res</span>
                {RESOLUTION_TIERS.map((t) => (
                  <button key={t.label} onClick={() => setSelectedResolutionTier(t)}
                    className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border transition-all ${
                      selectedResolutionTier.label === t.label
                        ? 'bg-banana-400/15 border-banana-400/60 text-banana-400'
                        : 'bg-transparent border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            {/* Compare mode toggle */}
            <button onClick={() => setCompareMode(v => !v)}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold border transition-all ${
                compareMode
                  ? 'bg-purple-500/15 border-purple-400/60 text-purple-300'
                  : 'bg-transparent border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
              }`}>
              <GitCompare className="w-3 h-3" />
              Compare
            </button>

            {/* Dimensions + cost */}
            <span className="text-[10px] text-gray-600 font-mono ml-auto">
              {previewW}×{previewH}
              {totalCost !== null && <span className="text-banana-400/60 ml-1">~${totalCost.toFixed(2)}</span>}
            </span>
          </div>

          {/* Input row */}
          <div className="flex items-end gap-3 bg-obsidian-900 border border-gray-800 rounded-2xl p-2 shadow-2xl focus-within:border-banana-400/50 focus-within:ring-1 focus-within:ring-banana-400/20 transition-all">
            <button onClick={handleRestart}
              className="p-3 text-gray-500 hover:text-banana-400 hover:bg-gray-800 rounded-xl transition-colors"
              title="Restart Session">
              <RefreshCw className="w-5 h-5" />
            </button>
            <textarea value={inputText} onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(inputText); } }}
              placeholder="Describe your idea..."
              className="flex-1 bg-transparent border-none text-gray-200 placeholder-gray-500 resize-none max-h-32 py-3 px-2 focus:ring-0 text-base font-sans"
              rows={1} />
            <button onClick={() => handleSend(inputText)} disabled={isLoading || !inputText.trim()}
              className={`p-3 rounded-xl transition-all duration-200 ${isLoading || !inputText.trim()
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-banana-400 text-obsidian-950 hover:bg-banana-300 shadow-[0_0_15px_rgba(255,225,53,0.4)]'
              }`}>
              {isLoading ? <StopCircle className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>

          <div className="text-center">
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">
              Powered by Venice AI (qwen3-4b) • Nano Banana Architect v1.0
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
