import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: `You are noro.ai, a helpful customer support assistant for Norobin.
    Your goal is to answer user questions about our business and services.
    Keep your answers concise, professional, and friendly.
    
    [PLACEHOLDER FOR BUSINESS INFO: We are Norobin, a company that provides excellent services.]
    
    If the user asks something you don't know, politely inform them that you are still learning and recommend they contact support.`,
    messages,
  });

  return result.toTextStreamResponse();
}
