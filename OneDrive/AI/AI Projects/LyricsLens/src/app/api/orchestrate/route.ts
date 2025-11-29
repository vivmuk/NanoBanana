import { NextResponse } from 'next/server';
import { veniceClient } from '@/lib/venice';

export async function POST(request: Request) {
  try {
    const { lyrics, style, modelId } = await request.json();

    if (!lyrics) {
      return NextResponse.json({ error: 'Lyrics are required' }, { status: 400 });
    }

    const selectedModel = modelId || 'venice-uncensored';

    const systemPrompt = `You are an expert Film Director and Visual Artist. 
Your goal is to turn song lyrics into a sequence of 10-second video scenes.
The user wants the video style to be: "${style || 'Cinematic'}".

Instructions:
1. Divide the lyrics into logical 10-second segments (roughly 2-4 lines each). If lines are long, use fewer.
2. For each segment, create a "Visual Prompt" for an AI image generator. Focus on subject, lighting, composition, and the specified style.
3. For each segment, create a "Motion Prompt" for an AI video generator. Use terms like "Slow pan right", "Zoom in", "Camera orbit", "Morphing shapes".
4. Return ONLY a JSON object with a "segments" array.

JSON Schema:
{
  "segments": [
    {
      "text": "string (the lyrics for this segment)",
      "visualPrompt": "string (detailed image prompt)",
      "motionPrompt": "string (camera movement description)"
    }
  ]
}
`;

    const response = await veniceClient.post('/chat/completions', {
      model: selectedModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: lyrics }
      ],
      // Enable JSON mode if supported or just rely on the prompt
      response_format: { type: "json_object" }, 
      temperature: 0.7,
    });

    const content = response.data.choices[0].message.content;
    
    // Parse the content to ensure it's valid JSON
    let parsedData;
    try {
      parsedData = JSON.parse(content);
    } catch (e) {
        // Fallback: try to find JSON in the text if the model chatted around it
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
        } else {
            throw new Error('Invalid JSON response from LLM');
        }
    }

    return NextResponse.json({ segments: parsedData.segments });

  } catch (error: any) {
    console.error('Orchestration error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to orchestrate lyrics' },
      { status: error.response?.status || 500 }
    );
  }
}


