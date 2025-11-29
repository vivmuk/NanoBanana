'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LyricSegment, VeniceModel } from '@/types';
import { SegmentCard } from './SegmentCard';
import { Wand2, Music, Settings2, Loader2, AlertCircle } from 'lucide-react';

const STYLES = [
  'Cinematic',
  'Cyberpunk',
  'Watercolor',
  'Photorealistic',
  'Anime',
  'Noir',
  'Vaporwave',
  '3D Render',
  'Oil Painting'
];

export default function Dashboard() {
  const [lyrics, setLyrics] = useState('');
  const [style, setStyle] = useState(STYLES[0]);
  const [segments, setSegments] = useState<LyricSegment[]>([]);
  const [models, setModels] = useState<VeniceModel[]>([]);
  const [textModel, setTextModel] = useState('venice-uncensored');
  const [imageModel, setImageModel] = useState('venice-sd35');
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get('/api/models');
      setModels(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch models', err);
    }
  };

  const textModels = models.filter(m => m.type === 'text');
  const imageModels = models.filter(m => m.type === 'image');

  const handleOrchestrate = async () => {
    if (!lyrics.trim()) return;
    setIsOrchestrating(true);
    setError(null);
    setSegments([]);

    try {
      const response = await axios.post('/api/orchestrate', {
        lyrics,
        style,
        modelId: textModel
      });

      const newSegments = response.data.segments.map((s: any, i: number) => ({
        id: crypto.randomUUID(),
        text: s.text,
        duration: 10,
        visualPrompt: s.visualPrompt,
        motionPrompt: s.motionPrompt,
        status: 'pending'
      }));

      setSegments(newSegments);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to process lyrics');
    } finally {
      setIsOrchestrating(false);
    }
  };

  const generateImage = async (segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId);
    if (!segment) return;

    updateSegmentStatus(segmentId, 'generating_image');

    try {
      const response = await axios.post('/api/generate-image', {
        prompt: segment.visualPrompt,
        style,
        modelId: imageModel
      });

      updateSegment(segmentId, {
        imageUrl: response.data.imageUrl,
        status: 'image_complete'
      });
    } catch (err) {
      console.error(err);
      updateSegmentStatus(segmentId, 'error');
    }
  };
  
  const generateVideo = async (segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId);
    if (!segment || !segment.imageUrl) return;

    updateSegmentStatus(segmentId, 'generating_video');

    try {
      const response = await axios.post('/api/generate-video', {
        imageUrl: segment.imageUrl,
        motionPrompt: segment.motionPrompt,
        // modelId: 'wan-2.1' // Could be selectable if we had video models listed
      });

      updateSegment(segmentId, {
        videoUrl: response.data.videoUrl,
        status: 'complete'
      });
    } catch (err) {
      console.error(err);
      // Don't set error state to 'error' if it's just video failure, keep image
      // But maybe show a toast? For now just log and revert status
      updateSegment(segmentId, { status: 'image_complete', error: 'Video generation failed' });
    }
  };

  const updateSegmentStatus = (id: string, status: LyricSegment['status']) => {
    setSegments(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const updateSegment = (id: string, updates: Partial<LyricSegment>) => {
    setSegments(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const generateAllImages = () => {
    segments.forEach(s => {
      if (!s.imageUrl) generateImage(s.id);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar / Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Settings2 className="text-purple-500" /> Configuration
          </h2>
          
          <div className="space-y-4">
             <div>
              <label className="block text-sm text-neutral-400 mb-1">Text Orchestrator Model</label>
              <select 
                value={textModel}
                onChange={(e) => setTextModel(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              >
                {textModels.length > 0 ? textModels.map(m => (
                  <option key={m.id} value={m.id}>{m.id}</option>
                )) : <option value="venice-uncensored">venice-uncensored</option>}
              </select>
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-1">Image Generation Model</label>
              <select 
                value={imageModel}
                onChange={(e) => setImageModel(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              >
                 {imageModels.length > 0 ? imageModels.map(m => (
                  <option key={m.id} value={m.id}>{m.id}</option>
                )) : <option value="venice-sd35">venice-sd35</option>}
              </select>
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-1">Visual Style</label>
              <div className="grid grid-cols-3 gap-2">
                {STYLES.map(s => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-2 py-1.5 text-xs rounded-md transition-all ${
                      style === s 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Music className="text-pink-500" /> Lyrics
          </h2>
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            placeholder="Paste your song lyrics here..."
            className="w-full h-64 bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-neutral-300 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
          />
          <button
            onClick={handleOrchestrate}
            disabled={isOrchestrating || !lyrics.trim()}
            className="mt-4 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {isOrchestrating ? <Loader2 className="animate-spin" /> : <Wand2 />}
            {isOrchestrating ? 'Orchestrating...' : 'Orchestrate Video'}
          </button>
          
           {error && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg flex items-start gap-2 text-red-400 text-sm">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content / Timeline */}
      <div className="lg:col-span-8 space-y-6">
        {segments.length > 0 ? (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Scene Timeline</h2>
              <button 
                onClick={generateAllImages}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors"
              >
                Generate All Images
              </button>
            </div>
            <div className="space-y-4">
              {segments.map((segment, index) => (
                <SegmentCard 
                  key={segment.id} 
                  segment={segment} 
                  index={index}
                  onRegenerateImage={generateImage}
                  onGenerateVideo={generateVideo}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-neutral-500 bg-neutral-900/30 rounded-3xl border-2 border-dashed border-neutral-800">
            <Film size={48} className="mb-4 opacity-20" />
            <p>Enter lyrics and orchestrate to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}


