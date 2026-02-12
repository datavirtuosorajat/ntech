import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'enquiries.json');

// 👈 YOUR GOOGLE APPS SCRIPT URL HERE
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyW7jCFrHJ5W9DmPMQ7l0i4VCpan5l2hogOS7QO2s8w8xhjtNDmUzgVY-Z9CSjZVAI/exec'; 

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newEnquiry = {
      ...body,
      createdAt: new Date().toISOString(),
    };

    // 1. SAVE TO YOUR JSON FILE (existing functionality)
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    const existing = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : [];

    existing.push(newEnquiry);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    // 2. SEND TO GOOGLE SHEET + EMAIL YOU
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method
