import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Doc } from "../../convex/_generated/dataModel";
import { ClipboardCopy, Download, Search, X } from "lucide-react";
import { toast } from "sonner";

const GenerationDetail = ({
  generation,
  onClose,
}: {
  generation: Doc<"generations">;
  onClose: () => void;
}) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generation.resultText);
    toast.success("Content copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([generation.resultText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generation.topic.replace(/ /g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Content downloaded!");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center p-4">
      <Card className="w-full max-w-3xl text-left relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200/50 transition-colors"
        >
          <X className="w-5 h-5 text-secondary" />
        </button>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {generation.contentType}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleCopyToClipboard}
              className="p-2 rounded-full hover:bg-gray-200/50 transition-colors"
              title="Copy to Clipboard"
            >
              <ClipboardCopy className="w-5 h-5 text-secondary" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-full hover:bg-gray-200/50 transition-colors"
              title="Download as .txt"
            >
              <Download className="w-5 h-5 text-secondary" />
            </button>
          </div>
        </div>
        <p className="text-sm text-secondary mb-1">
          Topic: <span className="font-semibold">{generation.topic}</span>
        </p>
        <p className="text-sm text-secondary mb-4">
          Framework: <span className="font-semibold">{generation.philosophy}</span>
        </p>
        <div
          className="prose prose-sm max-w-none whitespace-pre-wrap h-96 overflow-y-auto"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {generation.resultText}
        </div>
      </Card>
    </div>
  );
};

export const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeneration, setSelectedGeneration] =
    useState<Doc<"generations"> | null>(null);
  const generations = useQuery(api.generations.searchGenerations, {
    query: searchQuery,
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {selectedGeneration && (
        <GenerationDetail
          generation={selectedGeneration}
          onClose={() => setSelectedGeneration(null)}
        />
      )}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Content Library
        </h1>
        <p className="text-lg text-blue-100">
          Browse and manage your generated content.
        </p>
      </div>

      <Card className="text-left">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl text-gray-800">
            Generation History
          </h3>
          <div className="relative w-full max-w-xs">
            <Input
              placeholder="Search by topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {generations?.map((gen) => (
            <Card
              key={gen._id}
              interactive
              onClick={() => setSelectedGeneration(gen)}
              className="text-left"
            >
              <h4 className="font-bold truncate text-gray-800">{gen.topic}</h4>
              <p className="text-sm text-secondary">{gen.contentType}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(gen._creationTime).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
        {generations?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-secondary">No content generated yet.</p>
          </div>
        )}
      </Card>
    </div>
  );
};
