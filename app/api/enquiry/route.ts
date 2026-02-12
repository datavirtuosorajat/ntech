import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 👈 YOUR GOOGLE APPS SCRIPT URL HERE (replace YOUR_SCRIPT_ID)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyW7jCFrHJ5W9DmPMQ7l0i4VCpan5l2hogOS7QO2s8w8xhjtNDmUzgVY-Z9CSjZVAI/exec';

const filePath = path.join(process.cwd(), 'data', 'enquiries.json');

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newEnquiry
