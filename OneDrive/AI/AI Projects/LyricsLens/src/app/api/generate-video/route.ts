import { NextResponse } from 'next/server';
import { veniceClient } from '@/lib/venice';

export async function POST(request: Request) {
  try {
    const { imageUrl, motionPrompt, modelId } = await request.json();

    if (!imageUrl || !motionPrompt) {
      return NextResponse.json({ error: 'Image and Motion Prompt are required' }, { status: 400 });
    }

    // Strip the data:image/png;base64, prefix if present for the raw payload, 
    // or keep it if the API expects it. Usually APIs want raw base64 or the full string.
    // I'll try sending just the base64 part if it has a prefix.
    let imagePayload = imageUrl;
    if (imageUrl.startsWith('data:image')) {
        imagePayload = imageUrl.split(',')[1];
    }

    // Use user selected model or default to "wan-2.1" as per PRD
    const selectedModel = modelId || 'wan-2.1';

    const response = await veniceClient.post('/image/video', {
      model: selectedModel,
      image: imagePayload,
      prompt: motionPrompt,
      // Add likely parameters
      duration_seconds: 10,
      width: 1280,
      height: 720
    });

    // Assume response contains a video URL or base64
    // If it's base64:
    if (response.data && response.data.video) {
        return NextResponse.json({ videoUrl: `data:video/mp4;base64,${response.data.video}` });
    }
    // If it's a URL:
    if (response.data && response.data.url) {
        return NextResponse.json({ videoUrl: response.data.url });
    }

    // Fallback/Mock for demo if API is not actually live yet but we want to show UI state
    // return NextResponse.json({ videoUrl: "https://example.com/mock-video.mp4" });
    
    return NextResponse.json({ error: 'Unknown response format from Video API' }, { status: 500 });

  } catch (error: any) {
    console.error('Video generation error:', error.response?.data || error.message);
    
    // MOCK RESPONSE FOR DEMO PURPOSES IF ENDPOINT DOESN'T EXIST
    // Remove this in production
    if (error.response?.status === 404) {
        console.warn("Video endpoint not found, returning mock.");
        // Return a placeholder video or error
         return NextResponse.json(
          { error: 'Video generation API endpoint not found (404). This feature might be in beta.' },
          { status: 404 }
        );
    }

    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: error.response?.status || 500 }
    );
  }
}


