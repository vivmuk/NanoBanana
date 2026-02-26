import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, Play, Loader2, Image as ImageIcon } from 'lucide-react';
import { generateImage, IMAGE_MODELS, DEFAULT_IMAGE_MODEL } from '../services/veniceService';

export const PromptTester: React.FC = () => {
  const [promptText, setPromptText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState(DEFAULT_IMAGE_MODEL);
  const [usedModel, setUsedModel] = useState<string | null>(null);

  // Try to extract prompt from localStorage or clipboard on mount
  useEffect(() => {
    // Check if there's a prompt in localStorage (set by ChatInterface)
    const savedPrompt = localStorage.getItem('lastGeneratedPrompt');
    if (savedPrompt) {
      setPromptText(savedPrompt);
      localStorage.removeItem('lastGeneratedPrompt'); // Clear after reading
    }
  }, []);

  const handleCopy = () => {
    if (promptText.trim()) {
      navigator.clipboard.writeText(promptText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleDownload = () => {
    if (promptText.trim()) {
      const blob = new Blob([promptText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nano-banana-prompt-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleTest = async () => {
    if (!promptText.trim()) {
      setError('Please enter a prompt to test');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageDataUrl = await generateImage(promptText, selectedModel);
      setGeneratedImage(imageDataUrl);
      setUsedModel(selectedModel);
    } catch (err: any) {
      setError(err.message || 'Failed to generate image. Please check your API key.');
      console.error('Image generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

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
            Paste your generated prompt here to test it with Nano Banana Pro via Venice API. 
            Copy, download, or generate an image preview.
          </p>
        </div>

        {/* Model Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Image Model</label>
          <div className="flex gap-2 flex-wrap">
            {IMAGE_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${
                  selectedModel === model.id
                    ? 'bg-banana-400/15 border-banana-400/60 text-banana-400'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                }`}
              >
                <span className="text-sm font-semibold">{model.name}</span>
                <span className="text-xs mt-0.5 opacity-70">{model.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input Area */}
        <div className="bg-obsidian-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Prompt Text</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!promptText.trim()}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-banana-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                title="Copy prompt"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                disabled={!promptText.trim()}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-banana-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                title="Download prompt"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Paste your prompt here...&#10;&#10;Example:&#10;[PROMPT START]&#10;**WORK SURFACE:** A 3-column infographic...&#10;**LAYOUT:** ...&#10;[PROMPT END]"
            className="w-full h-64 bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 text-yellow-50 font-mono text-sm resize-none focus:outline-none focus:border-banana-400/50 focus:ring-1 focus:ring-banana-400/20 transition-all break-words whitespace-pre-wrap"
          />
        </div>

        {/* Test Button */}
        <div className="flex justify-center">
          <button
            onClick={handleTest}
            disabled={!promptText.trim() || isGenerating}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-banana-400 to-banana-500 hover:from-banana-300 hover:to-banana-400 text-obsidian-950 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Image...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" />
                <span>Generate Image Preview</span>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Generated Image */}
        {generatedImage && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Generated Image</h2>
            <div className="bg-obsidian-900 border border-gray-800 rounded-2xl p-6">
              <img 
                src={generatedImage} 
                alt="Generated preview" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <ImageIcon className="w-4 h-4" />
                <span>Generated using {IMAGE_MODELS.find(m => m.id === usedModel)?.name ?? usedModel} via Venice API</span>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-white">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
            <li>Generate a prompt using the Architect Chat</li>
            <li>Copy the prompt from the code block</li>
            <li>Paste it here in the text area</li>
            <li>Click "Generate Image Preview" to test it</li>
            <li>Use "Copy" or "Download" to save your prompt</li>
          </ol>
        </div>

      </div>
    </div>
  );
};

