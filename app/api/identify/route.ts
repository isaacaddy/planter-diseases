// app/api/identify/route.ts


import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from "openai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


const apiKey = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get('image') as File;
  ////////////////
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  //const model = genAI.getGenerativeModel({ model: "gpt-4o-mini" });

  if (!image) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageData = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageData).toString('base64');

    const imageParts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType: image.type,
        },
      },
    ];

    const result = await model.generateContent([
      "Identify this plant and provide its name and important information.",
      ...imageParts,
    ]);

    console.log("API Response:", result); // Log the API response

    return NextResponse.json({ result: result.response.text() });
  } catch (error) {
    console.error("Detailed error:", error); // Log the detailed error
    return NextResponse.json({ error: "Error identifying plant" }, { status: 500 });
  }
}