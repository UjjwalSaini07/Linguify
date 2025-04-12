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
        "You are the best coder and code generator. You take the code and give the converted code in the perfect format with some explanation. You will reject everything except code.",
      prompt: context,
      schemaDescription: "Code and its explanation",
      schema: z.object({
        code: z.string(),
        explanation: z.string(),
      }),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error processing the request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}


// Todo: Chunks Log passer
// import { google } from "@ai-sdk/google";
// import { streamObject } from "ai";
// import { z } from "zod";

// // Constants
// export const dynamic = "force-dynamic";
// export const maxDuration = 30;

// // Define the POST function to handle incoming requests
// export async function POST(req) {
//   try {
//     console.log("Starting POST request...");

//     // Parse the incoming request context
//     const context = await req.json();
//     console.log("Parsed context:", context);

//     // Ensure 'code' exists in the context
//     if (!context.code) {
//       console.error("Missing 'code' in context");
//       return new Response("Bad Request: Missing 'code' in context", {
//         status: 400,
//       });
//     }

//     let result;
//     try {
//       console.log("Streaming object with context...");

//       // Format the prompt with the provided code
//       const formattedPrompt = `Convert the following JavaScript code to C++:\n\n${context.code}`;

//       // Initialize the Gemini API client with the API key from the environment variables
//       // Access the Gemini API key from environment variables
//       const geminiApiKey = process.env.GEMINI_API_KEY;
//       if (!geminiApiKey) {
//         console.error("Missing Gemini API key in environment variables");
//         return new Response("Internal Server Error: Missing API key", {
//           status: 500,
//         });
//       }

//       // Call the streamObject function with the Gemini API key
//       result = await streamObject({
//         model: google("gemini-1.5-pro-latest", { apiKey: geminiApiKey }), // Pass the API key correctly here
//         system:
//           "You are the best coder and code generator. You take the code and give the converted code in the perfect format with some explanation. You will reject everything except code.",
//         prompt: formattedPrompt, // Pass the formatted prompt to the API
//         schemaDescription: "Code and its explanation",
//         schema: z.object({
//           code: z.string(),
//           explanation: z.string(),
//         }),
//       });

//       console.log("Raw Result:", result);
//     } catch (streamError) {
//       console.error("Error while streaming object:", streamError);
//       return new Response("Internal Server Error: StreamObject failed", {
//         status: 500,
//       });
//     }

//     // Read the result stream if available
//     if (result?.baseStream) {
//       const reader = result.baseStream.getReader();
//       const chunks = [];
//       let done = false;

//       while (!done) {
//         const { value, done: streamDone } = await reader.read();
//         if (value && value instanceof Uint8Array) {
//           chunks.push(new TextDecoder().decode(value));
//         } else if (value) {
//           console.warn("Unexpected chunk type, skipping:", value);
//         }
//         done = streamDone;
//       }

//       const fullResult = chunks.join("");
//       console.log("Full Result:", fullResult);
//       return new Response(fullResult, { status: 200 });
//     } else {
//       console.error("No baseStream available in result.");
//       return new Response("Internal Server Error: No baseStream available", {
//         status: 500,
//       });
//     }
//   } catch (error) {
//     console.error("Error processing the request:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }
