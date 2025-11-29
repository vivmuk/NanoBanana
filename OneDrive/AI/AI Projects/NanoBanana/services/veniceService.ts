import { SYSTEM_INSTRUCTION } from '../constants';
import { Message } from '../types';

const VENICE_API_BASE = 'https://api.venice.ai/api/v1';
const TEXT_MODEL = 'qwen3-4b';
const IMAGE_MODEL = 'nano-banana-pro';

const getApiKey = (): string => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing from environment variables.");
    throw new Error("API Key not found");
  }
  return process.env.API_KEY;
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

export const generateImage = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();

  try {
    const response = await fetch(`${VENICE_API_BASE}/image/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        prompt: prompt,
        width: 1024,
        height: 1024,
        steps: 20,
        format: 'webp',
        return_binary: false,
        safe_mode: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const imageBase64 = data.images?.[0];
    
    if (!imageBase64) {
      throw new Error("No image data found in response");
    }

    // Return as data URL
    return `data:image/webp;base64,${imageBase64}`;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const resetChat = () => {
  // Venice doesn't maintain server-side sessions, so nothing to reset
};

