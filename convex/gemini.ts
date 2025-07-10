"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { internal, api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";
import { ActionCtx } from "./_generated/server";

// --- PROMPT ENGINEERING ---

const getPhilosophyPrompt = (
  philosophy: string,
  fileContext?: string
) => {
  const fileInstruction = fileContext
    ? `Reference the following document excerpts for context, examples, and direct quotes. Cite them where appropriate: \n---BEGIN FILE CONTEXT---\n${fileContext}\n---END FILE CONTEXT---\n`
    : "";

  switch (philosophy) {
    case "Lakoff":
      return `Apply George Lakoff's cognitive framing. Reframe the topic using positive, value-based language. Avoid reinforcing negative frames. ${fileInstruction}`;
    case "Godin":
      return "Apply Seth Godin's permission marketing principles. Create a remarkable and shareable piece of content. It should build trust and be designed to earn the audience's attention, not demand it.";
    case "Vaynerchuk":
      return "Apply Gary Vaynerchuk's content philosophy. The tone must be authentic, transparent, and relatable. Avoid corporate jargon completely. Adopt a 'document, don't create' mindset.";
    case "Flanagan":
      return "Apply Kieran Flanagan's user acquisition strategies. The content should be framed to support growth and conversion. Suggest a counter-intuitive angle or hook.";
    case "Integrated":
      return `Combine multiple philosophies. The content must be: 1. **Positively framed** (Lakoff). 2. **Remarkable and trust-building** (Godin). 3. **Authentic and jargon-free** (Vaynerchuk). 4. **Growth-oriented** (Flanagan). ${fileInstruction}`;
    default:
      return "";
  }
};

const getPromptForContentType = (
  contentType: string,
  topic: string,
  region: string,
  philosophy: string,
  fileContext?: string,
  url?: string
) => {
  const baseInstruction = `You are an expert policy analyst and content strategist. Your task is to generate high-quality, strategically framed content about '${topic}' with a focus on the '${region}' geopolitical context.`;
  const urlContext = url
    ? `Analyze the content from this URL for additional context: ${url}.`
    : "";
  const philosophyInstruction = getPhilosophyPrompt(philosophy, fileContext);

  let contentInstruction = "";
  switch (contentType) {
    case "Short Daily Blog Post":
      contentInstruction = `Write a short, thought-provoking blog post (200-300 words). It must include a clear call-to-action and be optimized for SEO with relevant keywords.`;
      break;
    case "Engaging Article":
      contentInstruction = `Write a detailed and engaging article (800-1200 words). Use storytelling techniques, break it into multiple sections with clear headings, and include citations from experts or provided documents.`;
      break;
    case "Marketing Playbook":
      contentInstruction = `Create a comprehensive marketing playbook. This must include a messaging strategy, a brand story, A/B testing suggestions for key messages, and a multi-channel distribution plan.`;
      break;
    case "Social Media Calendar":
      contentInstruction = `Generate a one-month social media calendar. Provide daily post suggestions optimized for Twitter and LinkedIn. Include post copy, relevant hashtags, and an engagement prediction score (1-10) for each post.`;
      break;
    default:
      contentInstruction = `Write a general piece of content about the topic.`;
      break;
  }

  return `${baseInstruction} ${philosophyInstruction} ${urlContext} ${contentInstruction}`;
};

// --- ACTIONS ---

export const generateAndSaveContent = action({
  args: {
    apiKey: v.optional(v.string()),
    model: v.string(),
    topic: v.string(),
    url: v.optional(v.string()),
    region: v.string(),
    contentType: v.string(),
    philosophy: v.string(),
  },
  handler: async (
    ctx: ActionCtx,
    args
  ): Promise<{ success: boolean; generationId?: Id<"generations">; error?: string }> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("You must be logged in to generate content.");
    }

    let fileContext: string | undefined = undefined;
    if (args.philosophy === "Lakoff" || args.philosophy === "Integrated") {
      const searchResults: { _id: Id<"files">; name: string }[] =
        await ctx.runQuery(api.files.search, {
          query: args.topic,
        });
      const contentPromises = searchResults.map((file) =>
        ctx.runQuery(internal.files.getFileContent, { fileId: file._id })
      );
      const contents = await Promise.all(contentPromises);
      fileContext = contents.filter(Boolean).join("\n\n---\n\n");
    }

    const prompt = getPromptForContentType(
      args.contentType,
      args.topic,
      args.region,
      args.philosophy,
      fileContext,
      args.url
    );

    const apiKey = process.env.GEMINI_API_KEY || args.apiKey;

    if (!apiKey) {
      throw new Error(
        "Gemini API key is not configured. Please add it in the settings page or set the GEMINI_API_KEY environment variable in your Convex deployment."
      );
    }
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const generativeModel = genAI.getGenerativeModel({ model: args.model });
      const result = await generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const usage = await generativeModel.countTokens(prompt);

      const generationId: Id<"generations"> = await ctx.runMutation(
        internal.generations.saveGeneration,
        {
          userId,
          topic: args.topic,
          url: args.url,
          region: args.region,
          contentType: args.contentType,
          model: args.model,
          resultText: text,
          philosophy: args.philosophy,
          usage: {
            promptTokens: usage.totalTokens,
            totalTokens: usage.totalTokens,
          },
        }
      );

      return {
        success: true,
        generationId,
      };
    } catch (error: any) {
      console.error("Error generating content:", error);
      return { success: false, error: error.message };
    }
  },
});
