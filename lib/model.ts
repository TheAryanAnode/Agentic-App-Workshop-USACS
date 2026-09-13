import { ChatGoogle } from "@langchain/google/node";
import { ChatGroq } from "@langchain/groq";

/**
 * The model is created lazily so `npm run build` works before a student has
 * copied `.env.example` to `.env.local`.
 */
export function getModel() {
  const googleApiKey =
    process.env.GOOGLE_API_KEY ?? process.env.GEMINI_API_KEY;

  if (googleApiKey) {
    return new ChatGoogle({
      apiKey: googleApiKey,
      model: process.env.GEMINI_MODEL ?? "gemini-3.6-flash",
      maxRetries: 2,
    });
  }

  if (process.env.GROQ_API_KEY) {
    return new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
      maxRetries: 2,
    });
  }

  throw new Error(
    "Missing AI key. Add GOOGLE_API_KEY to .env.local (or use GROQ_API_KEY as a fallback).",
  );
}
