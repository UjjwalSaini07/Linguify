import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req) {
  const context = await req.json();

  const result = await streamObject({
    model: google("gemini-1.5-pro-latest"),
    system:
      "You are the best coder and code generator. you take the code and give the converted code in the perfect format with some bit of explanations. you will reject everything except codes.",
    prompt: context,
    schemaDescription: "Code and its explanation",
    schema: z.object({
      code: z.string(),
      explanation: z.string(),
    }),
  });

  return result.toTextStreamResponse();
}
