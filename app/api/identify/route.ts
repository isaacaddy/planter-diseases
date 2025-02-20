// app/api/identify/route.ts
//const genAI = new GoogleGenerativeAI("AIzaSyBzFx_fD9TwNbUNRdvEmX5NsqkcWVFtgi8");
// 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

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
//import OpenAI from "openai";

const genAI = new GoogleGenerativeAI("AIzaSyC_a-VwHEPfaOY-a3b8FgPSaMW1Y4yzXZA");

//const openai = new OpenAI({project: "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"});

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