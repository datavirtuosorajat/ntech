// app/api/enquiry/route.ts
import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/library/d/1jKxGM15wg61U7cuAQE0oz9jEf15s7LoxRBHka-UtmRtT-NMswn_uPqtQ/2;  

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
