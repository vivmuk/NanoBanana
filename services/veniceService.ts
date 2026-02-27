import { SYSTEM_INSTRUCTION } from '../constants';
import { Message } from '../types';

const VENICE_API_BASE = 'https://api.venice.ai/api/v1';
const TEXT_MODEL = 'qwen3-4b';

export interface ImageModelInfo {
  id: string;
  name: string;
  description: string;
}

export const IMAGE_MODELS: ImageModelInfo[] = [
  {
    id: 'nano-banana-pro',
    name: 'Nano Banana Pro',
    description: 'Original model — ultra-fast single-step generation',
  },
  {
    id: 'nano-banana-2',
    name: 'Nano Banana 2',
    description: 'Next-gen model — resolution-based pricing (1K/2K/4K)',
  },
];

export const DEFAULT_IMAGE_MODEL = IMAGE_MODELS[0].id;

// Helper function to check if API key exists
export const hasApiKey = (): boolean => {
  const storedKey = localStorage.getItem('VENICE_API_KEY');
  if (storedKey && storedKey.trim()) {
    return true;
  }
  const envKey = import.meta.env.VITE_VENICE_API_KEY ||
    import.meta.env.VITE_API_KEY ||
    (window as any).__VENICE_API_KEY__ ||
    (window as any).__API_KEY__;
  return !!envKey;
};

const getApiKey = (): string => {
  // First, check localStorage (user-provided API key)
  const storedKey = localStorage.getItem('VENICE_API_KEY');
  if (storedKey && storedKey.trim()) {
    return storedKey.trim();
  }

  // Fallback to environment variables (for deployment/development)
  const apiKey = import.meta.env.VITE_VENICE_API_KEY ||
    import.meta.env.VITE_API_KEY ||
    // Fallback for Railway/deployment (might be injected differently)
    (window as any).__VENICE_API_KEY__ ||
    (window as any).__API_KEY__;

  if (!apiKey) {
    console.error("API_KEY is missing. Please set your API key in Settings.");
    throw new Error("API Key not found. Please go to Settings and add your Venice AI API key.");
  }
  return apiKey;
};

export const initializeChat = async (): Promise<void> => {
  // Venice doesn't require pre-initialization like Google's chat sessions
  // We'll maintain conversation history in the component
};

export const sendMessage = async (
  messages: Message[],
  onChunk: (chunk: string) => void
): Promise<string> => {
  const apiKey = getApiKey();

  // Convert our Message format to Venice API format
  const veniceMessages = messages.map(msg => ({
    role: msg.role === 'model' ? 'assistant' : 'user',
    content: msg.content
  }));

  // Add system instruction as the first message
  const systemMessage = {
    role: 'system' as const,
    content: SYSTEM_INSTRUCTION
  };

  const requestBody = {
    model: TEXT_MODEL,
    messages: [systemMessage, ...veniceMessages],
    stream: true,
    temperature: 0.7,
    venice_parameters: {
      strip_thinking_response: true, // Hide thinking tokens
      disable_thinking: false,
      enable_web_search: 'off',
      include_venice_system_prompt: false // We're providing our own system prompt
    }
  };

  try {
    const response = await fetch(`${VENICE_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body reader available');
    }

    const decoder = new TextDecoder();
    let fullResponse = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');

      // Keep the last incomplete line in buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed.startsWith('data: ')) {
          const data = trimmed.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;

            if (delta) {
              fullResponse += delta;
              onChunk(delta);
            }
          } catch (e) {
            // Skip invalid JSON lines
            continue;
          }
        }
      }
    }

    // Process any remaining buffer
    if (buffer.trim()) {
      const trimmed = buffer.trim();
      if (trimmed.startsWith('data: ')) {
        const data = trimmed.slice(6);
        if (data !== '[DONE]') {
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              fullResponse += delta;
              onChunk(delta);
            }
          } catch (e) {
            // Ignore parse errors in final buffer
          }
        }
      }
    }

    return fullResponse;
  } catch (error) {
    console.error("Error sending message to Venice:", error);
    throw error;
  }
};

export const generateImage = async (prompt: string, modelId: string = DEFAULT_IMAGE_MODEL): Promise<string> => {
  const apiKey = getApiKey();

  // Clean the prompt - remove markdown code block markers if present
  let cleanPrompt = prompt.trim();

  // Remove [PROMPT START] and [PROMPT END] markers
  cleanPrompt = cleanPrompt.replace(/\[PROMPT START\]/gi, '').replace(/\[PROMPT END\]/gi, '');

  // Remove markdown code block markers
  cleanPrompt = cleanPrompt.replace(/```markdown/gi, '').replace(/```/g, '').trim();

  // Ensure prompt is not too long (nano-banana-pro allows up to 32768 chars, but let's be safe)
  if (cleanPrompt.length > 30000) {
    cleanPrompt = cleanPrompt.substring(0, 30000);
  }

  try {
    const response = await fetch(`${VENICE_API_BASE}/image/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelId,
        prompt: cleanPrompt,
        width: 1024,
        height: 1024,
        steps: 1,
        format: 'webp',
        return_binary: false,
        safe_mode: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: { message: errorText || `API error: ${response.status}` } };
      }
      console.error("Venice API error:", errorData);
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Venice Image Response:", data);

    const imageResult = data.images?.[0];

    if (!imageResult) {
      console.error("No image data found in response. Full data:", data);
      throw new Error("No image data found in response");
    }

    // Check if it's a URL (starts with http/https)
    if (imageResult.startsWith('http')) {
      console.log("Image returned as URL");
      return imageResult;
    }

    // Otherwise, assume it's base64 (or empty)
    // Validate base64 string simple check
    if (imageResult.length < 100) {
      console.warn("Received suspicious base64 data (too short):", imageResult);
    }

    // Return as data URL
    return `data:image/webp;base64,${imageResult}`;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const resetChat = () => {
  // Venice doesn't maintain server-side sessions, so nothing to reset
};

// Vision model used for image text extraction
const VISION_MODEL = 'grok-4-1-fast';

/**
 * Send an image (as a data URL) to Venice's vision model and extract any text found in it.
 */
export const analyzeImageForText = async (imageDataUrl: string): Promise<string> => {
  const apiKey = getApiKey();

  const response = await fetch(`${VENICE_API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: VISION_MODEL,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: imageDataUrl },
            },
            {
              type: 'text',
              text: 'Extract all visible text from this image. List each distinct piece of text on its own line, preserving the original wording exactly. If there is no text, respond with "No text found in image."',
            },
          ],
        },
      ],
      max_tokens: 2000,
      temperature: 0.1,
      venice_parameters: {
        strip_thinking_response: true,
        include_venice_system_prompt: false,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Vision API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || 'No text found in image.';
};

/**
 * Generate a new image using an existing image as a starting point (img2img).
 * Supported by Nano Banana 2 via the init_image parameter.
 */
export const generateImageWithBase = async (
  prompt: string,
  initImageDataUrl: string,
  strength: number = 0.75,
  modelId: string = 'nano-banana-2'
): Promise<string> => {
  const apiKey = getApiKey();

  // Strip the data URL prefix — API expects raw base64
  const base64Data = initImageDataUrl.includes(',')
    ? initImageDataUrl.split(',')[1]
    : initImageDataUrl;

  const response = await fetch(`${VENICE_API_BASE}/image/generate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: modelId,
      prompt,
      init_image: base64Data,
      init_image_strength: strength,
      width: 1024,
      height: 1024,
      format: 'webp',
      return_binary: false,
      safe_mode: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorData: any;
    try { errorData = JSON.parse(errorText); } catch { errorData = { error: { message: errorText } }; }
    throw new Error(errorData.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const imageResult = data.images?.[0];
  if (!imageResult) throw new Error('No image data found in response');

  return imageResult.startsWith('http')
    ? imageResult
    : `data:image/webp;base64,${imageResult}`;
};

