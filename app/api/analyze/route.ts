import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();

    if (!transcript) {
      return NextResponse.json(
        { success: false, error: "Transcript is required." },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: `You are an expert YouTube Shorts editor.

Given a transcript, identify the BEST continuous 30-60 second highlight.

Return ONLY valid JSON.

Example:

{
  "start": 40,
  "end": 90,
  "reason": "This section contains the key explanation."
}

Never return markdown.
Never explain anything.
Return JSON only.`,
        },
        {
          role: "user",
          content: transcript,
        },
      ],
    });

    const answer = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      result: JSON.parse(answer ?? "{}"),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Analysis failed.",
      },
      { status: 500 }
    );
  }
}