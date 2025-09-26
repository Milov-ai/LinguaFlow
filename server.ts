
import Fastify from 'fastify';
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";


const server = Fastify({
  logger: true
});

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

server.post('/api/translate', async (request, reply) => {
  try {
    const { text } = request.body as { text: string };

    if (!text) {
      return reply.status(400).send({ error: 'Text is required' });
    }

    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
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

    return reply.status(200).send(object);
  } catch (error) {
    server.log.error(error);
    return reply.status(500).send({ error: "Failed to translate text." });
  }
});

const start = async () => {
  try {
    await server.listen({ port: PORT, host: 'localhost' });
    server.log.info(`Server listening on port ${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
