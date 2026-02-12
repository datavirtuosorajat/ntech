// app/api/enquiry/route.ts
import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyW7jCFrHJ5W9DmPMQ7l0i4VCpan5l2hogOS7QO2s8w8xhjtNDmUzgVY-Z9CSjZVAI/exec';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Google Script responded with status ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Google Script failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Enquiry API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
}
