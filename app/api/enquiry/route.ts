// app/api/enquiry/route.ts
import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwSjLOjkV1WathIg_wkn2r-WjRGocgx5LqDMJBrrqqKs5EmYTdx06kheXE6rHJ6qy6ntg/exec'; // ← PASTE YOUR FULL NEW /exec URL HERE – ALL ON ONE LINE

export async function POST(request: Request) {
  try {
    const body = await request.formData(); // Use formData() since your page sends FormData

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body, // Pass the FormData directly – Google Script handles it well
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
