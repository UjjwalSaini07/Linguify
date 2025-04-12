import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// POST function to handle incoming requests
export async function POST(req) {
  try {
    const context = await req.json();

    // Stream the object using the provided context and model
    const result = await streamObject({
      model: google("gemini-1.5-pro-latest"),
      system:
        "You are an expert code analyzer and reviewer. You evaluate code to identify issues, explain those issues, and suggest corrections with detailed explanations. You will only respond with code errors, corrections, and explanations.",
      prompt: `Analyze the following code:
\n\n${context.sourceCode}\n\nProvide a detailed analysis of any errors, corrections, and explanations.`,
      schemaDescription: "Code analysis including errors, corrections, and explanations",
      schema: z.object({
        errors: z.array(z.string()),
        corrections: z.array(z.string()),
        explanations: z.array(z.string()),
      }),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error processing the request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
