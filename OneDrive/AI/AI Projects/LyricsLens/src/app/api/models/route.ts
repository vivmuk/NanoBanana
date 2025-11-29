import { NextResponse } from 'next/server';
import { veniceClient } from '@/lib/venice';

export async function GET() {
  try {
    const response = await veniceClient.get('/models');
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching models:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: error.response?.status || 500 }
    );
  }
}


