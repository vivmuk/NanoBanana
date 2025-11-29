import React from 'react';
import { LyricSegment } from '@/types';
import { Loader2, Play, Film, Image as ImageIcon, RefreshCw, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SegmentCardProps {
  segment: LyricSegment;
  index: number;
  onRegenerateImage: (id: string) => void;
  onGenerateVideo: (id: string) => void;
}

export const SegmentCard: React.FC<SegmentCardProps> = ({ segment, index, onRegenerateImage, onGenerateVideo }) => {
  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors">
      <div className="p-4 border-b border-neutral-800 flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-neutral-800 rounded text-xs font-mono text-neutral-400">
              {index + 1}. {String(segment.duration)}s
            </span>
            <span className={cn("text-xs capitalize", {
              "text-yellow-500": segment.status === 'pending',
              "text-blue-400": segment.status.startsWith('generating'),
              "text-green-400": segment.status === 'complete' || segment.status === 'image_complete',
              "text-red-400": segment.status === 'error'
            })}>
              {segment.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-lg font-medium text-neutral-200 font-serif italic">"{segment.text}"</p>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Visual Prompt</label>
            <p className="text-sm text-neutral-400 bg-neutral-950/50 p-2 rounded border border-neutral-800/50">
              {segment.visualPrompt}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Motion Prompt</label>
            <p className="text-sm text-neutral-400 bg-neutral-950/50 p-2 rounded border border-neutral-800/50">
              {segment.motionPrompt}
            </p>
          </div>
        </div>

        <div className="aspect-video bg-neutral-950 rounded-lg border border-neutral-800 flex items-center justify-center relative overflow-hidden group">
          {segment.imageUrl ? (
            <>
              <Image 
                src={segment.imageUrl} 
                alt="Generated Scene" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => onRegenerateImage(segment.id)}
                  className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 text-white transition-colors"
                  title="Regenerate Image"
                >
                  <RefreshCw size={16} />
                </button>
                 <button 
                  onClick={() => onGenerateVideo(segment.id)}
                  className="p-2 bg-purple-600 rounded-full hover:bg-purple-500 text-white transition-colors"
                  title="Generate Video"
                >
                  <Film size={16} />
                </button>
                 <a 
                  href={segment.videoUrl || segment.imageUrl} 
                  download={`scene-${index + 1}.${segment.videoUrl ? 'mp4' : 'png'}`}
                  className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 text-white transition-colors"
                  title="Download"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download size={16} />
                </a>
              </div>
            </>
          ) : (
            <div className="text-center p-4">
              {segment.status === 'generating_image' ? (
                <Loader2 className="animate-spin mx-auto text-purple-500 mb-2" />
              ) : (
                <ImageIcon className="mx-auto text-neutral-700 mb-2" />
              )}
              <p className="text-xs text-neutral-500">
                {segment.status === 'generating_image' ? 'Generating...' : 'No Image'}
              </p>
            </div>
          )}
          
           {segment.videoUrl && (
            <div className="absolute inset-0 bg-black z-10">
                <video src={segment.videoUrl} controls className="w-full h-full object-cover" />
            </div>
           )}
        </div>
      </div>
    </div>
  );
};

