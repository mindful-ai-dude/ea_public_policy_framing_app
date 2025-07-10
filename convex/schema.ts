import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  generations: defineTable({
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
  })
    .index("by_userId", ["userId"])
    .searchIndex("search_topic", {
      searchField: "topic",
      filterFields: ["userId"],
    }),

  files: defineTable({
    name: v.string(),
    storageId: v.id("_storage"),
    textContent: v.string(),
  }).searchIndex("search_text_content", {
    searchField: "textContent",
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
