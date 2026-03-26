import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function generateSummary(topic) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_GROQ_API_KEY in .env file");
  }

  const response = await axios.post(
    GROQ_API_URL,
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful study assistant. When given a topic, provide a clear, concise summary suitable for revision. Use bullet points and keep it under 200 words.",
        },
        {
          role: "user",
          content: `Give me a study summary on: ${topic}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}
