import React, { useState, useEffect } from 'react';
import { AspectRatioOption, ResolutionTier, PromptHistoryItem } from '../types';
import { Copy, Check, Download, Play, Loader2, Image as ImageIcon, History, ChevronDown, ChevronUp, Trash2, ArrowUp } from 'lucide-react';
import {
  generateImage, upscaleImage,
  IMAGE_MODELS, DEFAULT_IMAGE_MODEL,
  ASPECT_RATIOS, RESOLUTION_TIERS, UPSCALE_TIERS,
  getScaledDimensions, estimateCost,
  savePromptToHistory, getPromptHistory, clearPromptHistory,
} from '../services/veniceService';

// ---- tiny helpers ----
function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function downloadBlob(src: string, filename = 'nano-banana.webp') {
  const a = document.createElement('a');
  a.href = src;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const PromptTester: React.FC = () => {
  const [promptText, setPromptText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usedModel, setUsedModel] = useState<string | null>(null);
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);

  // Generation settings
  const [selectedModel, setSelectedModel] = useState(DEFAULT_IMAGE_MODEL);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatioOption>(ASPECT_RATIOS[0]);
  const [selectedResolutionTier, setSelectedResolutionTier] = useState<ResolutionTier>(RESOLUTION_TIERS[0]);

  // Load saved prompt + history on mount
  useEffect(() => {
    const savedPrompt = localStorage.getItem('lastGeneratedPrompt');
    if (savedPrompt) {
      setPromptText(savedPrompt);
      localStorage.removeItem('lastGeneratedPrompt');
    }
    setHistory(getPromptHistory());
  }, []);

  const refreshHistory = () => setHistory(getPromptHistory());

  // Derived
  const effectiveResolution = selectedModel === 'nano-banana-2' ? selectedResolutionTier : RESOLUTION_TIERS[0];
  const { width, height } = getScaledDimensions(selectedAspectRatio, effectiveResolution);
  const cost = estimateCost(selectedModel, effectiveResolution.label);

  // ---- Handlers ----
  const handleCopy = () => {
    if (promptText.trim()) {
      navigator.clipboard.writeText(promptText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleDownloadPrompt = () => {
    if (promptText.trim()) {
      const blob = new Blob([promptText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      downloadBlob(url, `nano-banana-prompt-${Date.now()}.txt`);
      URL.revokeObjectURL(url);
    }
  };

  const handleTest = async () => {
    if (!promptText.trim()) { setError('Please enter a prompt to test'); return; }
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    setUpscaledImage(null);

    try {
      const imageDataUrl = await generateImage(promptText, selectedModel, width, height);
      setGeneratedImage(imageDataUrl);
      setUsedModel(selectedModel);

      savePromptToHistory({
        id: Date.now().toString(),
        prompt: promptText,
        timestamp: Date.now(),
        modelId: selectedModel,
        aspectRatioLabel: selectedAspectRatio.label,
        resolutionLabel: effectiveResolution.label,
        imageUrl: imageDataUrl.startsWith('http') ? imageDataUrl : undefined,
      });
      refreshHistory();
    } catch (err: any) {
      setError(err.message || 'Failed to generate image. Please check your API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpscale = async (scale: 2 | 4) => {
    const src = upscaledImage ?? generatedImage;
    if (!src) return;
    setIsUpscaling(true);
    setError(null);
    try {
      const result = await upscaleImage(src, scale, promptText);
      setUpscaledImage(result);
    } catch (err: any) {
      setError(err.message || 'Upscale failed.');
    } finally {
      setIsUpscaling(false);
    }
  };

  const handleLoadFromHistory = (item: PromptHistoryItem) => {
    setPromptText(item.prompt);
    setSelectedModel(item.modelId);
    const ar = ASPECT_RATIOS.find(a => a.label === item.aspectRatioLabel) ?? ASPECT_RATIOS[0];
    const res = RESOLUTION_TIERS.find(r => r.label === item.resolutionLabel) ?? RESOLUTION_TIERS[0];
    setSelectedAspectRatio(ar);
    setSelectedResolutionTier(res);
    setGeneratedImage(item.imageUrl ?? null);
    setUpscaledImage(null);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    clearPromptHistory();
    refreshHistory();
  };

  const displayImage = upscaledImage ?? generatedImage;

  return (
    <div className="w-full h-full bg-obsidian-950 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-6 pb-32">

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-banana-400/10 text-banana-400 rounded-full text-xs font-mono border border-banana-400/20">
            <Play className="w-3 h-3" />
            <span>Prompt Tester</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Test Your <span className="text-banana-400">Prompt</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Paste a prompt, pick a model and aspect ratio, then generate a live preview.
          </p>
        </div>

        {/* ---- Model Selector ---- */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Image Model</label>
          <div className="flex gap-2 flex-wrap">
            {IMAGE_MODELS.map((model) => (
              <button key={model.id} onClick={() => setSelectedModel(model.id)}
                className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${
                  selectedModel === model.id
                    ? 'bg-banana-400/15 border-banana-400/60 text-banana-400'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                }`}>
                <span className="text-sm font-semibold">{model.name}</span>
                <span className="text-xs mt-0.5 opacity-70">{model.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ---- Aspect Ratio ---- */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Aspect Ratio</label>
          <div className="flex gap-2 flex-wrap">
            {ASPECT_RATIOS.map((ar) => (
              <button key={ar.label} onClick={() => setSelectedAspectRatio(ar)}
                className={`flex flex-col items-center px-4 py-2.5 rounded-xl border text-left transition-all ${
                  selectedAspectRatio.label === ar.label
                    ? 'bg-banana-400/15 border-banana-400/60 text-banana-400'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                }`}>
                <span className="text-sm font-semibold">{ar.label}</span>
                <span className="text-[10px] mt-0.5 opacity-60">{ar.width}×{ar.height}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ---- Resolution (nano-banana-2 only) ---- */}
        {selectedModel === 'nano-banana-2' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Resolution</label>
            <div className="flex gap-2 flex-wrap">
              {RESOLUTION_TIERS.map((tier) => (
                <button key={tier.label} onClick={() => setSelectedResolutionTier(tier)}
                  className={`flex flex-col items-center px-4 py-2.5 rounded-xl border text-left transition-all ${
                    selectedResolutionTier.label === tier.label
                      ? 'bg-banana-400/15 border-banana-400/60 text-banana-400'
                      : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                  }`}>
                  <span className="text-sm font-semibold">{tier.label}</span>
                  <span className="text-[10px] mt-0.5 opacity-60">${tier.usd.toFixed(2)}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 font-mono">
              Output: {width}×{height}px
              {cost !== null && <span className="text-banana-400/70 ml-2">~${cost.toFixed(2)} per generation</span>}
            </p>
          </div>
        )}
        {selectedModel !== 'nano-banana-2' && (
          <p className="text-xs text-gray-600 font-mono">Output: {width}×{height}px</p>
        )}

        {/* ---- Prompt Input ---- */}
        <div className="bg-obsidian-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Prompt Text</label>
            <div className="flex items-center gap-2">
              <button onClick={handleCopy} disabled={!promptText.trim()}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-banana-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                {copied ? <><Check className="w-4 h-4" /><span>Copied!</span></> : <><Copy className="w-4 h-4" /><span>Copy</span></>}
              </button>
              <button onClick={handleDownloadPrompt} disabled={!promptText.trim()}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-banana-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                <Download className="w-4 h-4" /><span>Download</span>
              </button>
            </div>
          </div>
          <textarea value={promptText} onChange={(e) => setPromptText(e.target.value)}
            placeholder={"Paste your prompt here...\n\nExample:\n[PROMPT START]\n**WORK SURFACE:** A 3-column infographic...\n**LAYOUT:** ...\n[PROMPT END]"}
            className="w-full h-64 bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 text-yellow-50 font-mono text-sm resize-none focus:outline-none focus:border-banana-400/50 focus:ring-1 focus:ring-banana-400/20 transition-all break-words whitespace-pre-wrap" />
        </div>

        {/* ---- Generate Button ---- */}
        <div className="flex justify-center">
          <button onClick={handleTest} disabled={!promptText.trim() || isGenerating}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-banana-400 to-banana-500 hover:from-banana-300 hover:to-banana-400 text-obsidian-950 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
            {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Generating Image…</span></> : <><ImageIcon className="w-5 h-5" /><span>Generate Image Preview</span></>}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* ---- Generated Image ---- */}
        {displayImage && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {upscaledImage ? 'Upscaled Image' : 'Generated Image'}
              </h2>
              {upscaledImage && (
                <button onClick={() => setUpscaledImage(null)}
                  className="text-xs text-gray-500 hover:text-gray-300 border border-gray-700 px-2 py-1 rounded transition-colors">
                  Show original
                </button>
              )}
            </div>
            <div className="bg-obsidian-900 border border-gray-800 rounded-2xl p-6 space-y-4">
              <div className="relative group/img">
                <img src={displayImage} alt="Generated preview" className="w-full h-auto rounded-lg shadow-2xl" />
                <button onClick={() => downloadBlob(displayImage, `nano-banana-${Date.now()}.webp`)}
                  className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity"
                  title="Download image">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ImageIcon className="w-4 h-4" />
                <span>{IMAGE_MODELS.find(m => m.id === usedModel)?.name ?? usedModel} via Venice API • {selectedAspectRatio.label} • {effectiveResolution.label}</span>
              </div>

              {/* Upscale controls — nano-banana-2 only */}
              {usedModel === 'nano-banana-2' && (
                <div className="pt-2 border-t border-gray-800">
                  <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Upscale</p>
                  <div className="flex gap-2">
                    {UPSCALE_TIERS.map((t) => (
                      <button key={t.label} onClick={() => handleUpscale(t.scale)} disabled={isUpscaling}
                        className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-banana-400 rounded-lg text-sm font-semibold border border-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        {isUpscaling ? <Loader2 className="w-3 h-3 animate-spin" /> : <ArrowUp className="w-3 h-3" />}
                        {t.label} <span className="text-[10px] text-gray-500 ml-0.5">(~${t.usd.toFixed(2)})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---- Prompt History ---- */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
          <button onClick={() => { setShowHistory(v => !v); if (!showHistory) refreshHistory(); }}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-2 text-gray-300">
              <History className="w-4 h-4 text-banana-400/70" />
              <span className="font-semibold text-sm">Prompt History</span>
              {history.length > 0 && (
                <span className="text-[10px] bg-banana-400/10 text-banana-400 border border-banana-400/20 px-1.5 py-0.5 rounded-full font-mono">
                  {history.length}
                </span>
              )}
            </div>
            {showHistory ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>

          {showHistory && (
            <div className="border-t border-gray-800">
              {history.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-8">No history yet. Generate some images to build history.</p>
              ) : (
                <>
                  <div className="divide-y divide-gray-800 max-h-96 overflow-y-auto">
                    {history.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-4 hover:bg-gray-800/30 transition-colors group/hist">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt="" className="w-12 h-12 rounded object-cover border border-gray-700 flex-shrink-0" />
                        )}
                        {!item.imageUrl && (
                          <div className="w-12 h-12 rounded bg-gray-800 border border-gray-700 flex-shrink-0 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-gray-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 truncate font-mono">{item.prompt.slice(0, 80)}…</p>
                          <p className="text-[10px] text-gray-600 mt-0.5">
                            {IMAGE_MODELS.find(m => m.id === item.modelId)?.name ?? item.modelId}
                            {' · '}{item.aspectRatioLabel}{' · '}{item.resolutionLabel}
                            {' · '}{relativeTime(item.timestamp)}
                          </p>
                        </div>
                        <button onClick={() => handleLoadFromHistory(item)}
                          className="flex-shrink-0 px-2 py-1 text-[10px] font-semibold bg-banana-400/10 text-banana-400 border border-banana-400/20 rounded hover:bg-banana-400/20 transition-colors opacity-0 group-hover/hist:opacity-100">
                          Load
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-800 flex justify-end">
                    <button onClick={handleClearHistory}
                      className="flex items-center gap-1.5 text-xs text-red-500/70 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3 h-3" /> Clear all
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* How to Use */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-white">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
            <li>Generate a prompt using the Architect Chat</li>
            <li>Choose your model, aspect ratio, and (for NB2) resolution</li>
            <li>Click "Generate Image Preview" to test it</li>
            <li>Use the upscale buttons (Nano Banana 2 only) for higher resolution</li>
            <li>Hover over the image to download it</li>
            <li>Access previous prompts via Prompt History</li>
          </ol>
        </div>

      </div>
    </div>
  );
};
