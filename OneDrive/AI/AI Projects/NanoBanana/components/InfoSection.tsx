import React from 'react';
import { BookOpen, Layers, MousePointerClick, AlertTriangle, Lightbulb } from 'lucide-react';

export const InfoSection: React.FC = () => {
  return (
    <div className="w-full h-full bg-obsidian-950 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12 pb-32">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-banana-400/10 text-banana-400 rounded-full text-xs font-mono border border-banana-400/20">
            <BookOpen className="w-3 h-3" />
            <span>Official Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            The Nano Banana <span className="text-banana-400">Manual</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Nano Banana Pro (Gemini 3 Pro Image) is not just an image generator—it's a visual reasoning engine. 
            Unlike older models that guess, this model thinks in structures, layouts, and components.
          </p>
        </div>

        {/* Section 1: The Philosophy */}
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-obsidian-900 border border-gray-800 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-banana-400" />
                    Visual Reasoning
                </h3>
                <p className="text-gray-400 leading-relaxed">
                    The model overcomes the limitation of "hallucination" by respecting structural constraints. 
                    It understands spatial arrangements. If you ask for a "3-column dashboard", it doesn't just paint a picture of a dashboard; it builds the grid.
                </p>
            </div>
            <div className="bg-obsidian-900 border border-gray-800 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <MousePointerClick className="w-5 h-5 text-banana-400" />
                    Structured Prompting
                </h3>
                <p className="text-gray-400 leading-relaxed">
                    Good results don't come from vague requests like "make a cool comic". 
                    They come from precise design documents. Think of your prompt as a blueprint, not a wish.
                </p>
            </div>
        </div>

        {/* Section 2: The Prompt Canvas (8 Areas) */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">The Prompt Canvas (8 Areas)</h2>
            <div className="grid gap-4">
                {[
                    { step: 1, title: "Intent & Goal", desc: "What are we making? (e.g. A comic, a dashboard, a logo?)" },
                    { step: 2, title: "Subject & Content", desc: "Who or what is in it? Be specific about characters." },
                    { step: 3, title: "Work Surface", desc: "CRITICAL: Define the medium. 'A 6-panel storyboard', 'A SaaS dashboard', 'A blueprint'." },
                    { step: 4, title: "Layout & Structure", desc: "How is space organized? '3 balanced columns', 'Golden ratio spiral', '2x2 grid'." },
                    { step: 5, title: "Style & Aesthetics", desc: "Art style, lighting, color palette, era, specific artist references." },
                    { step: 6, title: "Components & Details", desc: "List items to activate object recognition. 'Title block, two bar charts, legend'." },
                    { step: 7, title: "Constraints", desc: "Rules to prevent errors. 'No text overlap', 'Flat design', 'Blue tones only'." },
                    { step: 8, title: "Context", desc: "Background info, specific data to visualize, or story context." },
                ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-banana-400/30 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-banana-400 font-bold shrink-0">
                            {item.step}
                        </div>
                        <div>
                            <h4 className="text-white font-medium">{item.title}</h4>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Section 3: Best Practices */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Best Practices</h2>
            
            <div className="bg-gradient-to-br from-gray-900 to-obsidian-950 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                    <h3 className="font-bold text-banana-300 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Common Mistakes
                    </h3>
                </div>
                <div className="p-6 space-y-4">
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li>Starting with style instead of <strong>Work Surface</strong>.</li>
                        <li>Vague layout descriptions ("arrange them nicely"). Use grids!</li>
                        <li>Forgetting to list components. Lists activate the engines.</li>
                        <li>Ignoring constraints. You must tell the model what NOT to do.</li>
                    </ul>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-obsidian-950 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                    <h3 className="font-bold text-banana-300 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        Pro Tips
                    </h3>
                </div>
                <div className="p-6 space-y-4">
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li><strong>For Text:</strong> Explicitly state "The headline 'URBAN EXPLORER' rendered in bold sans-serif".</li>
                        <li><strong>For Consistency:</strong> Use specific reference names for characters if defined in context.</li>
                        <li><strong>For Diagrams:</strong> Define the flow ("left-to-right with swimlanes").</li>
                    </ul>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};