import React, { useState } from 'react';
import {
  Sparkles, Loader2, Download, RotateCcw, AlertCircle, ChevronRight,
  CheckCircle, XCircle, Eye, EyeOff, Zap, Image as ImageIcon, Lightbulb,
} from 'lucide-react';
import {
  generateImage,
  generateInitialImagePrompt,
  critiqueDraftImage,
  refineImagePrompt,
  CritiqueResult,
} from '../services/veniceService';

type Stage = 'input' | 'processing' | 'review' | 'generating_final' | 'complete';

const STEPS = ['Input', 'Draft', 'Critique', 'Refine', 'Final'];

// ── Progress Stepper ──────────────────────────────────────────────
const ProgressStepper: React.FC<{ activeIndex: number }> = ({ activeIndex }) => (
  <div className="flex items-center justify-center gap-0 w-full max-w-lg mx-auto">
    {STEPS.map((label, i) => {
      const done = i < activeIndex;
      const active = i === activeIndex;
      return (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                done
                  ? 'bg-banana-400 border-banana-400 text-obsidian-950'
                  : active
                  ? 'bg-obsidian-900 border-banana-400 text-banana-400 shadow-[0_0_10px_rgba(255,225,53,0.4)]'
                  : 'bg-obsidian-900 border-gray-700 text-gray-600'
              }`}
            >
              {done ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wide ${
                active ? 'text-banana-400' : done ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-0.5 mb-4 mx-1 transition-all ${
                i < activeIndex ? 'bg-banana-400' : 'bg-gray-800'
              }`}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ── Score Badge ───────────────────────────────────────────────────
const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  const color =
    score >= 8 ? 'text-green-400 border-green-500/40 bg-green-500/10' :
    score >= 5 ? 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10' :
                 'text-red-400 border-red-500/40 bg-red-500/10';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-bold ${color}`}>
      {score}/10
    </span>
  );
};

// ── Main Component ────────────────────────────────────────────────
export const VisualRefinement: React.FC = () => {
  const [stage, setStage] = useState<Stage>('input');
  const [processLabel, setProcessLabel] = useState('');
  const [processSub, setProcessSub] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  // Form state
  const [description, setDescription] = useState('');
  const [context, setContext] = useState('');
  const [userInstruction, setUserInstruction] = useState('');
  const [showContext, setShowContext] = useState(false);

  // Pipeline results
  const [initialPrompt, setInitialPrompt] = useState('');
  const [refinedPrompt, setRefinedPrompt] = useState('');
  const [draftImage, setDraftImage] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [critique, setCritique] = useState<CritiqueResult | null>(null);

  // UI state
  const [error, setError] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showRefinedPrompt, setShowRefinedPrompt] = useState(false);

  // ── Pipeline: Generate Draft ──────────────────────────────────
  const handleGenerateDraft = async () => {
    if (!description.trim()) return;
    setError(null);
    setStage('processing');

    try {
      // Step 1 — craft initial image prompt
      setActiveStep(0);
      setProcessLabel('Crafting image prompt…');
      setProcessSub('kimi-k2-5 is converting your description into a structured prompt');
      const fullDesc = context.trim()
        ? `${description.trim()}\n\nAdditional context:\n${context.trim()}`
        : description.trim();
      const imgPrompt = await generateInitialImagePrompt(fullDesc);
      setInitialPrompt(imgPrompt);

      // Step 2 — generate draft image
      setActiveStep(1);
      setProcessLabel('Generating draft image…');
      setProcessSub('Nano Banana 2 at 1K resolution (1024 × 1024)');
      const draft = await generateImage(imgPrompt, 'nano-banana-2');
      setDraftImage(draft);

      // Step 3 — visual critique
      setActiveStep(2);
      setProcessLabel('Analyzing with kimi-k2-5 vision…');
      setProcessSub('Identifying visual problems and areas to improve');
      const critiqueResult = await critiqueDraftImage(draft, imgPrompt);
      setCritique(critiqueResult);

      // Step 4 — refine prompt
      setActiveStep(3);
      setProcessLabel('Refining prompt based on critique…');
      setProcessSub('kimi-k2-5 is creating an improved generation prompt');
      const improved = await refineImagePrompt(
        imgPrompt, critiqueResult.problems, critiqueResult.suggestions, ''
      );
      setRefinedPrompt(improved);

      setActiveStep(3);
      setStage('review');
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please check your API key and try again.');
      setStage('input');
    }
  };

  // ── Pipeline: Generate Final ──────────────────────────────────
  const handleGenerateFinal = async () => {
    setError(null);
    setStage('generating_final');

    try {
      let finalPromptText = refinedPrompt;

      // If user added an instruction, re-refine with it
      if (userInstruction.trim() && critique) {
        setActiveStep(3);
        setProcessLabel('Incorporating your instructions…');
        setProcessSub('kimi-k2-5 is updating the prompt with your changes');
        finalPromptText = await refineImagePrompt(
          initialPrompt, critique.problems, critique.suggestions, userInstruction
        );
        setRefinedPrompt(finalPromptText);
      }

      setActiveStep(4);
      setProcessLabel('Generating final image…');
      setProcessSub('Nano Banana 2 at 1K resolution (1024 × 1024)');
      const final = await generateImage(finalPromptText, 'nano-banana-2');
      setFinalImage(final);
      setStage('complete');
    } catch (err: any) {
      setError(err.message || 'An error occurred during final generation.');
      setStage('review');
    }
  };

  const handleDownload = () => {
    if (!finalImage) return;
    const a = document.createElement('a');
    a.href = finalImage;
    a.download = `nano-banana-refined-${Date.now()}.webp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setStage('input');
    setDescription('');
    setContext('');
    setUserInstruction('');
    setInitialPrompt('');
    setRefinedPrompt('');
    setDraftImage(null);
    setFinalImage(null);
    setCritique(null);
    setError(null);
    setShowComparison(false);
    setShowRefinedPrompt(false);
    setActiveStep(0);
    setProcessLabel('');
    setProcessSub('');
  };

  // ── PROCESSING / GENERATING_FINAL ────────────────────────────
  if (stage === 'processing' || stage === 'generating_final') {
    return (
      <div className="w-full h-full bg-obsidian-950 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-12">
          <ProgressStepper activeIndex={activeStep} />

          <div className="text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full bg-banana-400/10 animate-ping" />
              <div className="relative w-24 h-24 rounded-full bg-banana-400/10 border border-banana-400/30 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-banana-400 animate-spin" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">{processLabel || 'Processing…'}</h2>
              <p className="text-sm text-gray-500">{processSub}</p>
            </div>

            {/* Step mini-list */}
            <div className="text-left inline-block space-y-2">
              {[
                { i: 0, label: 'Generate initial prompt', model: 'kimi-k2-5' },
                { i: 1, label: 'Generate draft image', model: 'Nano Banana 2 @ 1K' },
                { i: 2, label: 'Visual critique', model: 'kimi-k2-5 vision' },
                { i: 3, label: 'Refine prompt', model: 'kimi-k2-5' },
                { i: 4, label: 'Generate final image', model: 'Nano Banana 2 @ 1K' },
              ].map(({ i, label, model }) => (
                <div key={i} className={`flex items-center gap-3 text-sm ${
                  i < activeStep ? 'text-gray-500' :
                  i === activeStep ? 'text-banana-400 font-semibold' :
                  'text-gray-700'
                }`}>
                  {i < activeStep
                    ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    : i === activeStep
                    ? <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    : <div className="w-4 h-4 rounded-full border border-gray-700 shrink-0" />
                  }
                  <span>{label}</span>
                  <span className="text-xs text-gray-600 font-mono ml-auto pl-4">{model}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── REVIEW ───────────────────────────────────────────────────
  if (stage === 'review') {
    return (
      <div className="w-full h-full bg-obsidian-950 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 pb-16">
          <ProgressStepper activeIndex={3} />

          <div className="text-center space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Review Draft & Critique</h2>
            <p className="text-gray-400 text-sm">kimi-k2-5 has analyzed your draft. Review the feedback and generate the final image.</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-red-900/20 border border-red-500/40 rounded-xl p-4 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Draft Image */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-banana-400" /> Draft Image
                </h3>
                {critique && <ScoreBadge score={critique.score} />}
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-900">
                {draftImage && (
                  <img src={draftImage} alt="Draft" className="w-full h-auto" />
                )}
              </div>
              <p className="text-xs text-gray-600 font-mono">Nano Banana 2 · 1024 × 1024 · WebP</p>
            </div>

            {/* Critique + Controls */}
            <div className="space-y-4">
              {/* Problems */}
              {critique && (
                <div className="bg-obsidian-900 border border-gray-800 rounded-xl p-4 space-y-3">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" /> Visual Problems
                    <span className="ml-auto text-xs text-gray-500">identified by kimi-k2-5</span>
                  </h3>
                  <ul className="space-y-2">
                    {critique.problems.map((problem, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                        {problem}
                      </li>
                    ))}
                  </ul>
                  {critique.suggestions && (
                    <div className="pt-2 border-t border-gray-700/50">
                      <p className="text-xs text-gray-400 leading-relaxed">
                        <span className="text-banana-400 font-semibold">Suggestions: </span>
                        {critique.suggestions}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Refined Prompt (collapsible) */}
              <div className="bg-obsidian-900 border border-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowRefinedPrompt(v => !v)}
                  className="w-full flex items-center justify-between p-4 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-banana-400" /> Refined Prompt
                  </span>
                  <Eye className={`w-4 h-4 text-gray-500 transition-transform ${showRefinedPrompt ? 'rotate-180' : ''}`} />
                </button>
                {showRefinedPrompt && (
                  <div className="px-4 pb-4">
                    <p className="text-xs text-gray-400 font-mono leading-relaxed whitespace-pre-wrap border border-gray-700 rounded-lg p-3 bg-black/30 max-h-40 overflow-y-auto">
                      {refinedPrompt}
                    </p>
                  </div>
                )}
              </div>

              {/* User Instruction */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-banana-400" /> Your Instructions <span className="text-gray-600 font-normal">(optional)</span>
                </label>
                <textarea
                  value={userInstruction}
                  onChange={e => setUserInstruction(e.target.value)}
                  placeholder="Add your own guidance… e.g. 'Make the background darker', 'Add more contrast', 'Use warmer tones'"
                  rows={3}
                  className="w-full bg-obsidian-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-banana-400/50 focus:ring-1 focus:ring-banana-400/20 transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleGenerateFinal}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-banana-400 to-banana-500 hover:from-banana-300 hover:to-banana-400 text-obsidian-950 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <Zap className="w-5 h-5" />
                  Generate Final Image
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors"
                  title="Start over"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── COMPLETE ─────────────────────────────────────────────────
  if (stage === 'complete') {
    return (
      <div className="w-full h-full bg-obsidian-950 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 pb-16">
          <ProgressStepper activeIndex={4} />

          {/* Success header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold">
              <CheckCircle className="w-4 h-4" /> Generation Complete
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Your Refined Image</h2>
            <p className="text-gray-400 text-sm">
              Improved from <ScoreBadge score={critique?.score ?? 5} /> → ready to download
            </p>
          </div>

          {/* Comparison toggle */}
          {draftImage && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowComparison(v => !v)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors border border-gray-700"
              >
                {showComparison ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showComparison ? 'Hide Draft' : 'Compare with Draft'}
              </button>
            </div>
          )}

          {/* Images */}
          {showComparison ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Draft</span>
                  {critique && <ScoreBadge score={critique.score} />}
                </div>
                <div className="rounded-xl overflow-hidden border border-gray-700">
                  <img src={draftImage!} alt="Draft" className="w-full h-auto" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-banana-400 uppercase tracking-wider">Final ✦</span>
                  <span className="text-xs font-bold text-green-400 px-2 py-0.5 bg-green-500/10 border border-green-500/30 rounded-lg">Refined</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-banana-400/30 shadow-[0_0_20px_rgba(255,225,53,0.1)]">
                  <img src={finalImage!} alt="Final" className="w-full h-auto" />
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden border border-banana-400/20 shadow-[0_0_40px_rgba(255,225,53,0.08)]">
              <img src={finalImage!} alt="Final refined image" className="w-full h-auto" />
            </div>
          )}

          <p className="text-center text-xs text-gray-600 font-mono">Nano Banana 2 · 1024 × 1024 · WebP</p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-banana-400 to-banana-500 hover:from-banana-300 hover:to-banana-400 text-obsidian-950 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              Download Image
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors border border-gray-700"
            >
              <RotateCcw className="w-4 h-4" />
              Create Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── INPUT (default) ──────────────────────────────────────────
  return (
    <div className="w-full h-full bg-obsidian-950 overflow-y-auto">
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8 pb-16">

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-banana-400/10 text-banana-400 rounded-full text-xs font-mono border border-banana-400/20">
            <Sparkles className="w-3 h-3" />
            <span>AI Visual Refinement</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Generate & <span className="text-banana-400">Refine</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Describe what you want to create. The AI will generate a draft, critique it with
            vision AI, then automatically produce an improved final image.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { icon: '✍️', label: 'You describe', sub: 'Your idea' },
            { icon: '🖼️', label: 'Draft', sub: 'Nano Banana 2' },
            { icon: '👁️', label: 'Critique', sub: 'kimi-k2-5' },
            { icon: '✨', label: 'Refine', sub: 'kimi-k2-5' },
            { icon: '🏆', label: 'Final', sub: 'Nano Banana 2' },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-1 p-3 bg-obsidian-900/50 rounded-xl border border-gray-800 text-center">
              <span className="text-xl">{icon}</span>
              <span className="text-xs font-semibold text-white">{label}</span>
              <span className="text-[10px] text-gray-600 font-mono">{sub}</span>
            </div>
          ))}
        </div>

        {error && (
          <div className="flex items-start gap-3 bg-red-900/20 border border-red-500/40 rounded-xl p-4 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Main form */}
        <div className="space-y-5">
          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">
              What do you want to create? <span className="text-red-400">*</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. A scientific infographic showing ocean acidification levels from 1900 to 2023, with a line graph, color-coded pH scale, and coral reef imagery…"
              rows={5}
              className="w-full bg-obsidian-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-banana-400/50 focus:ring-1 focus:ring-banana-400/20 transition-all resize-none"
              maxLength={3000}
            />
            <div className="flex justify-between">
              <p className="text-xs text-gray-600">Be as specific as you like — data tables, style references, layout details all help.</p>
              {description.length > 0 && (
                <span className="text-[10px] text-gray-600 font-mono">{description.length}/3000</span>
              )}
            </div>
          </div>

          {/* Optional context (collapsible) */}
          <div>
            <button
              onClick={() => setShowContext(v => !v)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-banana-400 transition-colors"
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${showContext ? 'rotate-90' : ''}`} />
              Additional context <span className="text-gray-600">(optional)</span>
            </button>
            {showContext && (
              <div className="mt-3">
                <textarea
                  value={context}
                  onChange={e => setContext(e.target.value)}
                  placeholder="Paste data tables, extra notes, style references, hex colors, or any other context here…"
                  rows={4}
                  className="w-full bg-obsidian-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-banana-400/50 focus:ring-1 focus:ring-banana-400/20 transition-all resize-none"
                />
              </div>
            )}
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerateDraft}
            disabled={!description.trim()}
            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-banana-400 to-banana-500 hover:from-banana-300 hover:to-banana-400 text-obsidian-950 font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Sparkles className="w-5 h-5" />
            Generate Draft & Critique
          </button>

          <p className="text-center text-xs text-gray-600 font-mono">
            Uses kimi-k2-5 (vision + text) · Nano Banana 2 @ 1K · Via Venice AI
          </p>
        </div>

        {/* Example prompts */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Example Descriptions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'A data visualization showing global CO₂ emissions from 1960 to 2024, styled as a modern dashboard with line charts and key statistics',
              'An educational infographic about the water cycle for high school students, with icons, arrows, and labels in a clean flat design',
              'A scientific poster explaining CRISPR gene editing with a DNA double helix diagram, before/after cells, and step-by-step editing process',
              'A financial dashboard screenshot showing stock portfolio performance with candlestick charts, P&L summary, and dark UI',
            ].map((example) => (
              <button
                key={example}
                onClick={() => setDescription(example)}
                className="text-left text-xs px-3 py-3 bg-obsidian-900/50 border border-gray-800 hover:border-banana-400/30 hover:text-banana-300 text-gray-400 rounded-xl transition-all duration-200 leading-relaxed"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
