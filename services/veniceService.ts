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

// ------------------------------------------------------------------
// Visual Refinement Pipeline — kimi-k2-5 for vision + text
// ------------------------------------------------------------------
const KIMI_MODEL = 'kimi-k2-5';

export interface CritiqueResult {
  problems: string[];
  suggestions: string;
  score: number;
}

/**
 * Use kimi-k2-5 to turn a user's plain-language description into a
 * detailed Nano Banana image generation prompt.
 */
export const generateInitialImagePrompt = async (description: string): Promise<string> => {
  const apiKey = getApiKey();

  const response = await fetch(`${VENICE_API_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: KIMI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert AI image prompt engineer for Nano Banana Pro. Convert user descriptions into detailed, structured image generation prompts. Include subject, composition, lighting, color palette, style, and technical quality descriptors. Return ONLY the prompt text — no explanations, no markdown fences.',
        },
        {
          role: 'user',
          content: `Create a detailed image generation prompt for this description:\n\n"${description}"`,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
      venice_parameters: { strip_thinking_response: true, include_venice_system_prompt: false },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Prompt generation error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || description;
};

/**
 * Send a draft image to kimi-k2-5 (vision) and receive a structured critique.
 */
export const critiqueDraftImage = async (
  imageDataUrl: string,
  originalPrompt: string,
): Promise<CritiqueResult> => {
  const apiKey = getApiKey();

  const response = await fetch(`${VENICE_API_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: KIMI_MODEL,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: imageDataUrl } },
            {
              type: 'text',
              text: `You are a visual design critic analyzing an AI-generated image.\n\nThe original prompt was:\n"${originalPrompt}"\n\nAnalyze this image carefully and respond with ONLY a valid JSON object in exactly this format:\n{\n  "score": <integer 1-10>,\n  "problems": ["specific problem 1", "specific problem 2", "specific problem 3"],\n  "suggestions": "A concise paragraph describing the key improvements needed."\n}\n\nBe specific and actionable. Identify real visual flaws in composition, lighting, color, clarity, and adherence to the prompt.`,
            },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0.2,
      venice_parameters: { strip_thinking_response: true, include_venice_system_prompt: false },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Vision critique error: ${response.status}`);
  }

  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content?.trim() || '';

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        problems: Array.isArray(parsed.problems) ? parsed.problems : [content],
        suggestions: typeof parsed.suggestions === 'string' ? parsed.suggestions : '',
        score: typeof parsed.score === 'number' ? Math.max(1, Math.min(10, parsed.score)) : 5,
      };
    }
  } catch (_) { /* fall through to default */ }

  return { problems: [content || 'No specific issues identified.'], suggestions: '', score: 5 };
};

/**
 * Use kimi-k2-5 to create a refined prompt that addresses the critique
 * and optionally incorporates the user's own instruction.
 */
export const refineImagePrompt = async (
  originalPrompt: string,
  problems: string[],
  suggestions: string,
  userInstruction: string,
): Promise<string> => {
  const apiKey = getApiKey();

  const problemsText = problems.map((p, i) => `${i + 1}. ${p}`).join('\n');
  const instructionLine = userInstruction.trim()
    ? `\n\nUser's specific instruction: "${userInstruction.trim()}"`
    : '';

  const response = await fetch(`${VENICE_API_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: KIMI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert AI image prompt engineer. Improve image generation prompts based on visual critique. Maintain the original concept while fixing identified issues. Return ONLY the improved prompt text — no explanations, no markdown.',
        },
        {
          role: 'user',
          content: `Original prompt:\n"${originalPrompt}"\n\nVisual critique problems:\n${problemsText}\n\nCritique summary: ${suggestions}${instructionLine}\n\nWrite an improved image generation prompt that addresses all the problems above.`,
        },
      ],
      max_tokens: 3000,
      temperature: 0.5,
      venice_parameters: { strip_thinking_response: true, include_venice_system_prompt: false },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Prompt refinement error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || originalPrompt;
};

// Vision model used for image text extraction
const VISION_MODEL = 'qwen3-vl-235b-a22b';

/**
 * Send an image (as a data URL) to Venice's vision model and extract any text found in it.
 */
export const analyzeImageForText = async (imageDataUrl: string): Promise<string> => {
  const apiKey = getApiKey();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // 30 s hard timeout

  try {
    const response = await fetch(`${VENICE_API_BASE}/chat/completions`, {
      signal: controller.signal,
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

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Vision API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || 'No text found in image.';
  } catch (err: any) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      throw new Error(`Vision model timed out after 30 s. The model "${VISION_MODEL}" may not be available on Venice.`);
    }
    throw err;
  }
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

