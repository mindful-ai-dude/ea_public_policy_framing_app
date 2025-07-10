import { query } from "./_generated/server";

export const isGeminiApiKeySet = query({
  handler: async (): Promise<boolean> => {
    return !!process.env.GEMINI_API_KEY;
  },
});
