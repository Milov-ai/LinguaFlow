import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text } = request.body;

  if (!text) {
    return response.status(400).json({ error: 'Text is required' });
  }

  try {
    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: z.object({
        detectedLanguage: z.string().describe("The language detected in the input text, e.g., 'German'"),
        translations: z.object({
          english: z.string(),
          spanish: z.string(),
          french: z.string(),
        }),
      }),
      prompt: `Detect the language of the following text and then translate it to English, Spanish, and French. Text: ${text}`
    });

    return response.status(200).json(object);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Failed to translate text." });
  }
}
