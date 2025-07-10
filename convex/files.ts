import { v } from "convex/values";
import { query, internalQuery } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const search = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, { query }) => {
    if (!query) {
      return [];
    }
    const results = await ctx.db
      .query("files")
      .withSearchIndex("search_text_content", (q) => q.search("textContent", query))
      .take(5); // Take top 5 results
    return results.map((file) => ({ _id: file._id, name: file.name }));
  },
});

export const getFileContent = internalQuery({
  args: {
    fileId: v.id("files"),
  },
  handler: async (ctx, { fileId }) => {
    const file = await ctx.db.get(fileId);
    return file?.textContent ?? null;
  },
});
