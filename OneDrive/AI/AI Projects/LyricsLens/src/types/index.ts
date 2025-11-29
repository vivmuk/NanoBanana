export interface LyricSegment {
  id: string;
  text: string;
  duration: number; // in seconds, usually 10
  visualPrompt: string;
  motionPrompt: string;
  status: 'pending' | 'generating_image' | 'image_complete' | 'generating_video' | 'complete' | 'error';
  imageUrl?: string;
  videoUrl?: string;
  error?: string;
}

export interface ProjectState {
  lyrics: string;
  style: string;
  segments: LyricSegment[];
  selectedModel: string; // For text orchestration
  selectedImageModel: string; // For image generation
  isProcessing: boolean;
}

export interface VeniceModel {
  id: string;
  object: string;
  created: number;
  owned_by: string;
  type: 'text' | 'image' | 'audio';
  model_spec?: {
    name: string;
    capabilities?: {
      supportsReasoning?: boolean;
      supportsVision?: boolean;
      supportsFunctionCalling?: boolean;
    };
    traits?: string[];
  };
}


