import { OpenRouter } from "@openrouter/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt || typeof prompt !== "string") {
      return res
        .status(400)
        .json({ error: "Prompt is required and must be a string" });
    }

    // Send prompt to OpenRouter
    const completion = await openrouter.chat.send({
      model: process.env.OPENROUTER_MODEL,
      messages: [
        {
          role: "user",
          content: `You are a precise text-processing engine. Your task is to refine the provided paragraph based on the user's instructions. Return only the refined text. Do not include greetings, explanations, or any introductory/concluding remarks.

  ${prompt}`,
        },
      ],
      stream: false,
    });

    const output = completion.choices[0]?.message?.content ?? "";

    return res.status(200).json({ output });
  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
