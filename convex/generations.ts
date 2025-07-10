import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const saveGeneration = internalMutation({
  args: {
    userId: v.id("users"),
    topic: v.string(),
    url: v.optional(v.string()),
    region: v.string(),
    contentType: v.string(),
    model: v.string(),
    resultText: v.string(),
    philosophy: v.string(),
    usage: v.object({
      promptTokens: v.number(),
      totalTokens: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("generations", args);
  },
});

export const getGeneration = query({
  args: {
    generationId: v.id("generations"),
  },
  handler: async (ctx, { generationId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const generation = await ctx.db.get(generationId);
    if (!generation || generation.userId !== userId) {
      return null;
    }
    return generation;
  },
});

export const searchGenerations = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, { query }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    if (!query) {
      return await ctx.db
        .query("generations")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .order("desc")
        .collect();
    }

    return await ctx.db
      .query("generations")
      .withSearchIndex("search_topic", (q) =>
        q.search("topic", query).eq("userId", userId)
      )
      .collect();
  },
});

export const getUserUsage = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { totalTokens: 0 };
    }
    const generations = await ctx.db
      .query("generations")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const totalTokens = generations.reduce(
      (sum, gen) => sum + gen.usage.totalTokens,
      0
    );
    return { totalTokens };
  },
});
