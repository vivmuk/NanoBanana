import React, { useState, useRef } from 'react';
import {
  Wand2, Upload, Type, AlertCircle, Loader2, Check,
  RefreshCw, X, ArrowRight, Download, Image as ImageIcon,
} from 'lucide-react';
import { analyzeImageForText, generateImageWithBase, IMAGE_MODELS } from '../services/veniceService';

interface CustomCreationsProps {
  onSelectPrompt: (prompt: string) => void;
}

type InternalTab = 'builder' | 'image-editor';

const MOOD_OPTIONS = [
  { label: 'Cinematic',  value: 'cinematic, dramatic lighting, epic atmosphere' },
  { label: 'Vibrant',    value: 'vibrant colors, energetic, high saturation' },
  { label: 'Dark',       value: 'dark atmosphere, moody, noir-like shadows' },
  { label: 'Minimal',   value: 'minimalist, clean, simple composition' },
  { label: 'Retro',     value: 'retro aesthetic, vintage feel, nostalgic' },
  { label: 'Dreamy',    value: 'dreamy, soft, ethereal, painterly' },
];

export const CustomCreations: React.FC<CustomCreationsProps> = ({ onSelectPrompt }) => {
  const [activeTab, setActiveTab] = useState<InternalTab>('builder');

  // ── Custom Builder state ────────────────────────────────────────────────────
  const [subject, setSubject]         = useState('');
  const [background, setBackground]   = useState('');
  const [textContent, setTextContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  // ── Image Editor state ──────────────────────────────────────────────────────
  const [uploadedImage, setUploadedImage]   = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing]       = useState(false);
  const [extractedText, setExtractedText]   = useState('');
  const [editedText, setEditedText]         = useState('');
  const [analysisError, setAnalysisError]   = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regeneratedImage, setRegeneratedImage] = useState<string | null>(null);
  const [regenError, setRegenError]         = useState('');
  const [imageStrength, setImageStrength]   = useState(0.75);
  const [selectedModel, setSelectedModel]   = useState('nano-banana-2');
  const [isDragging, setIsDragging]         = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Custom Builder helpers ──────────────────────────────────────────────────
  const handleBuildPrompt = () => {
    if (!subject.trim()) return;

    const lines: string[] = [
      'Create a custom image with the following specifications:',
      '',
      `**Subject / Content:** ${subject.trim()}`,
    ];
    if (background.trim())  lines.push(`**Background / Environment:** ${background.trim()}`);
    if (textContent.trim()) lines.push(`**Text to Include:** "${textContent.trim()}"`);
    if (selectedMood)       lines.push(`**Mood / Style:** ${selectedMood}`);
    lines.push('', 'Please generate a complete, professional Nano Banana Pro structured prompt for this.');

    onSelectPrompt(lines.join('\n'));
  };

  // ── Image Editor helpers ────────────────────────────────────────────────────
  const resetEditorState = () => {
    setUploadedImage(null);
    setExtractedText('');
    setEditedText('');
    setRegeneratedImage(null);
    setAnalysisError('');
    setRegenError('');
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.match(/^image\/(png|webp|jpeg|jpg)$/)) {
      setAnalysisError('Please upload a PNG, WebP, or JPEG image.');
      return;
    }
    setAnalysisError('');
    setExtractedText('');
    setEditedText('');
    setRegeneratedImage(null);
    setRegenError('');

    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;
    setIsAnalyzing(true);
    setAnalysisError('');
    try {
      const text = await analyzeImageForText(uploadedImage);
      setExtractedText(text);
      setEditedText(text);
    } catch (err: any) {
      setAnalysisError(err.message || 'Failed to analyze image. Make sure your API key is set.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRegenerate = async () => {
    if (!uploadedImage || !editedText.trim()) return;
    setIsRegenerating(true);
    setRegenError('');
    try {
      const prompt = `Recreate this image with the following updated text: ${editedText.trim()}. Maintain the original image style, layout, and visual design as closely as possible. Only change the text content.`;
      const result = await generateImageWithBase(prompt, uploadedImage, imageStrength, selectedModel);
      setRegeneratedImage(result);
    } catch (err: any) {
      setRegenError(err.message || 'Failed to regenerate image. The selected model may not support image-to-image editing.');
    } finally {
      setIsRegenerating(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="w-full h-full flex flex-col bg-obsidian-950">

      {/* Sticky Header */}
      <div className="flex-none p-4 md:p-8 bg-obsidian-950/95 backdrop-blur z-20 sticky top-0 border-b border-gray-800">
        <div className="max-w-4xl mx-auto space-y-4">

          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Custom <span className="text-banana-400">Creations</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Build fully tailored prompts from scratch, or upload an image to extract and edit its text.
            </p>
          </div>

          {/* Internal tab switcher */}
          <div className="flex gap-2">
            {(['builder', 'image-editor'] as InternalTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-banana-400 text-obsidian-950 shadow-[0_0_10px_rgba(255,225,53,0.25)]'
                    : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {tab === 'builder' ? (
                  <span className="flex items-center gap-2"><Wand2 className="w-3.5 h-3.5" />Custom Builder</span>
                ) : (
                  <span className="flex items-center gap-2"><ImageIcon className="w-3.5 h-3.5" />Image Editor</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-20">
        <div className="max-w-4xl mx-auto">

          {/* ═══════════════════ CUSTOM BUILDER ═══════════════════ */}
          {activeTab === 'builder' && (
            <div className="space-y-6">

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">
                  Subject / Content <span className="text-banana-400">*</span>
                </label>
                <textarea
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Describe the main subject — e.g., 'A warrior standing on a cliff overlooking a stormy ocean'"
                  rows={3}
                  className="w-full px-4 py-3 bg-obsidian-900 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-banana-400/50 focus:ring-1 focus:ring-banana-400/20 text-sm resize-none transition-all"
                />
              </div>

              {/* Background */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Background / Environment</label>
                <textarea
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="Describe the background — e.g., 'Dramatic sunset sky with purple and orange hues, ancient ruins in the distance'"
                  rows={3}
                  className="w-full px-4 py-3 bg-obsidian-900 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-banana-400/50 focus:ring-1 focus:ring-banana-400/20 text-sm resize-none transition-all"
                />
              </div>

              {/* Text to include */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Text to Include in Image</label>
                <input
                  type="text"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder='Any text that should appear in the image — e.g., "RISE UP" or a logo tagline'
                  className="w-full px-4 py-3 bg-obsidian-900 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-banana-400/50 focus:ring-1 focus:ring-banana-400/20 text-sm transition-all"
                />
              </div>

              {/* Mood / Style */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Mood / Style</label>
                <div className="flex flex-wrap gap-2">
                  {MOOD_OPTIONS.map((mood) => (
                    <button
                      key={mood.label}
                      onClick={() => setSelectedMood(selectedMood === mood.value ? '' : mood.value)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                        selectedMood === mood.value
                          ? 'bg-banana-400/20 border-banana-400/60 text-banana-300 shadow-[0_0_8px_rgba(255,225,53,0.2)]'
                          : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                      }`}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Build button */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleBuildPrompt}
                  disabled={!subject.trim()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                    subject.trim()
                      ? 'bg-banana-400 text-obsidian-950 hover:bg-banana-300 shadow-[0_0_15px_rgba(255,225,53,0.3)] hover:-translate-y-0.5'
                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <Wand2 className="w-4 h-4" />
                  Build Custom Prompt
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-gray-500">
                  Opens Architect Chat with your prompt pre-filled — review and edit before sending.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════ IMAGE EDITOR ═══════════════════ */}
          {activeTab === 'image-editor' && (
            <div className="space-y-6">

              {/* Info banner */}
              <div className="bg-blue-900/20 border border-blue-800/40 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-300 space-y-1">
                  <p className="font-semibold">Nano Banana 2 — Image Text Editing</p>
                  <p className="text-blue-200/80">
                    Upload a PNG or WebP image. The vision AI extracts any visible text so you can edit it,
                    then Nano Banana 2 regenerates the image with your changes applied.
                  </p>
                </div>
              </div>

              {/* Upload zone or image preview */}
              {!uploadedImage ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? 'border-banana-400 bg-banana-400/10'
                      : 'border-gray-700 bg-obsidian-900/50 hover:border-gray-500 hover:bg-obsidian-900'
                  }`}
                >
                  <Upload className="w-10 h-10 text-gray-500 mb-3" />
                  <p className="text-gray-300 font-semibold mb-1">Drop your image here</p>
                  <p className="text-gray-500 text-sm">PNG, WebP, or JPEG — or click to browse</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/webp,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  />
                </div>
              ) : (
                <div className="space-y-4">

                  {/* Preview */}
                  <div className="relative rounded-xl overflow-hidden bg-obsidian-900 border border-gray-800">
                    <img src={uploadedImage} alt="Uploaded" className="w-full max-h-64 object-contain" />
                    <button
                      onClick={resetEditorState}
                      className="absolute top-2 right-2 p-1.5 bg-gray-900/80 hover:bg-red-900/80 text-gray-300 hover:text-red-300 rounded-lg border border-gray-700 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Analyze button */}
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl border border-gray-700 text-sm font-semibold transition-all disabled:opacity-50"
                  >
                    {isAnalyzing
                      ? <><Loader2 className="w-4 h-4 animate-spin" />Analyzing Image...</>
                      : <><Type className="w-4 h-4" />Extract Text from Image</>
                    }
                  </button>

                  {analysisError && (
                    <div className="flex gap-2 items-start text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-lg p-3">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{analysisError}</span>
                    </div>
                  )}

                  {/* Extracted / editable text */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">
                      {extractedText ? 'Edit Extracted Text' : 'Or enter replacement text manually'}
                    </label>
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      placeholder="Extracted text will appear here — or type the new text you want in the image..."
                      rows={5}
                      className="w-full px-4 py-3 bg-obsidian-900 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-banana-400/50 focus:ring-1 focus:ring-banana-400/20 text-sm resize-none font-mono transition-all"
                    />
                  </div>

                  {/* Model selector + strength slider */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Model</label>
                      <div className="flex gap-2 flex-wrap">
                        {IMAGE_MODELS.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setSelectedModel(m.id)}
                            title={m.description}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              selectedModel === m.id
                                ? 'bg-banana-400/15 border-banana-400/60 text-banana-400'
                                : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                            }`}
                          >
                            {m.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Edit Strength: {Math.round(imageStrength * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0.3"
                        max="1"
                        step="0.05"
                        value={imageStrength}
                        onChange={(e) => setImageStrength(parseFloat(e.target.value))}
                        className="w-full accent-banana-400"
                      />
                      <p className="text-xs text-gray-500">Higher % = more divergence from the original</p>
                    </div>
                  </div>

                  {/* Regenerate button */}
                  <button
                    onClick={handleRegenerate}
                    disabled={isRegenerating || !editedText.trim()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                      !isRegenerating && editedText.trim()
                        ? 'bg-banana-400 text-obsidian-950 hover:bg-banana-300 shadow-[0_0_15px_rgba(255,225,53,0.3)] hover:-translate-y-0.5'
                        : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {isRegenerating
                      ? <><Loader2 className="w-4 h-4 animate-spin" />Regenerating...</>
                      : <><RefreshCw className="w-4 h-4" />Regenerate with Edits</>
                    }
                  </button>

                  {regenError && (
                    <div className="flex gap-2 items-start text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-lg p-3">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{regenError}</span>
                    </div>
                  )}

                  {/* Regenerated result */}
                  {regeneratedImage && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-green-400 flex items-center gap-2">
                        <Check className="w-4 h-4" /> Regenerated Image
                      </p>
                      <div className="rounded-xl overflow-hidden border border-banana-400/20">
                        <img src={regeneratedImage} alt="Regenerated result" className="w-full object-contain" />
                      </div>
                      <a
                        href={regeneratedImage}
                        download="custom-creation.webp"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-sm font-semibold transition-colors border border-gray-700"
                      >
                        <Download className="w-4 h-4" /> Download Image
                      </a>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
