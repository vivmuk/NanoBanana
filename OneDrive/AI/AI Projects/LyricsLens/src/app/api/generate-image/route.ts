import { NextResponse } from 'next/server';
import { veniceClient } from '@/lib/venice';

export async function POST(request: Request) {
  try {
    const { prompt, modelId, style } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const selectedModel = modelId || 'venice-sd35';

    // Construct the payload
    // Note: style_preset is not explicitly in the native generate params in the docs provided, 
    // but 'style' might be part of the prompt or handled via prompt engineering.
    // I'll append the style to the prompt to be safe if it's not already there.
    
    const finalPrompt = style ? `${prompt}, ${style} style` : prompt;

    const response = await veniceClient.post('/image/generate', {
      model: selectedModel,
      prompt: finalPrompt,
      width: 1280, // 16:9 aspect ratio approx for video
      height: 720,
      steps: 30,
      cfg_scale: 7.5,
      return_binary: false, // We want base64 for easy frontend display
    });

    // The response should have images array
    if (response.data && response.data.images && response.data.images.length > 0) {
       const base64Image = response.data.images[0];
       // Return as a data URL
       return NextResponse.json({ 
           imageUrl: `data:image/png;base64,${base64Image}` 
       });
    } else {
        throw new Error('No image returned from API');
    }

  } catch (error: any) {
    console.error('Image generation error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: error.response?.status || 500 }
    );
  }
}


