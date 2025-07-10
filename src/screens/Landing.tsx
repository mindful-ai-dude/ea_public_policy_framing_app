import { useState, useContext } from "react";
import { useQuery } from "convex/react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import {
  FileText,
  BookOpen,
  Share2,
  Calendar,
  ArrowRight,
  Lightbulb,
  Gift,
  Camera,
  TrendingUp,
  Combine,
  FileSearch,
} from "lucide-react";
import { toast } from "sonner";
import { SettingsContext } from "../context/SettingsContext";
import { api } from "../../convex/_generated/api";

type ContentType =
  | "Short Daily Blog Post"
  | "Engaging Article"
  | "Marketing Playbook"
  | "Social Media Calendar";

type Philosophy = "Lakoff" | "Godin" | "Vaynerchuk" | "Flanagan" | "Integrated";

export interface LandingPageProps {
  topic: string;
  url?: string;
  region: string;
  contentType: ContentType;
  philosophy: Philosophy;
}

interface LandingProps {
  onGenerate: (props: LandingPageProps) => void;
}

const FileContextDisplay = ({ topic }: { topic: string }) => {
  const files = useQuery(api.files.search, { query: topic });

  if (!topic || !files || files.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-primary/10 rounded-lg">
      <h4 className="font-semibold text-sm text-primary mb-2 flex items-center gap-2">
        <FileSearch className="w-4 h-4" />
        Using File Context
      </h4>
      <p className="text-xs text-secondary">
        The following documents from your library will be used to enhance content
        generation:
      </p>
      <ul className="text-xs text-secondary list-disc list-inside mt-1">
        {files.map((file) => (
          <li key={file._id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const Landing = ({ onGenerate }: LandingProps) => {
  const [topic, setTopic] = useState("");
  const [url, setUrl] = useState("");
  const [region, setRegion] = useState("USA");
  const [contentType, setContentType] = useState<ContentType>(
    "Short Daily Blog Post"
  );
  const [philosophy, setPhilosophy] = useState<Philosophy>("Integrated");
  const { apiKey, isServerKeySet } = useContext(SettingsContext);

  const contentTypes = [
    { name: "Short Daily Blog Post", icon: <FileText /> },
    { name: "Engaging Article", icon: <BookOpen /> },
    { name: "Marketing Playbook", icon: <Share2 /> },
    { name: "Social Media Calendar", icon: <Calendar /> },
  ];

  const philosophies = [
    { name: "Lakoff", description: "Cognitive Framing", icon: <Lightbulb /> },
    { name: "Godin", description: "Permission Marketing", icon: <Gift /> },
    { name: "Vaynerchuk", description: "Authentic Creation", icon: <Camera /> },
    { name: "Flanagan", description: "User Acquisition", icon: <TrendingUp /> },
    { name: "Integrated", description: "All Frameworks", icon: <Combine /> },
  ];

  const handleGenerateClick = () => {
    if (!topic) {
      toast.error("Please enter a topic to generate content.");
      return;
    }
    if (!apiKey && !isServerKeySet) {
      toast.error(
        "Please set your API key in Settings before generating content."
      );
      return;
    }
    onGenerate({ topic, url, region, contentType, philosophy });
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Frame the Debate
        </h1>
        <p className="text-lg text-blue-100">
          Generate strategically framed AI policy content in seconds.
        </p>
      </div>

      <Card>
        <div className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Enter a Topic (e.g., AI in healthcare)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <Input
              placeholder="Enter a URL to analyze (optional)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option>USA</option>
            <option>Europe</option>
            <option>Australia</option>
            <option>Morocco</option>
          </Select>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-700">
              Choose Framework
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {philosophies.map((p) => (
                <Card
                  key={p.name}
                  interactive
                  selected={philosophy === p.name}
                  onClick={() => setPhilosophy(p.name as Philosophy)}
                >
                  <div className="flex flex-col items-center gap-2">
                    {p.icon}
                    <span className="font-medium text-sm text-center">
                      {p.description}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
            {(philosophy === "Lakoff" || philosophy === "Integrated") && (
              <FileContextDisplay topic={topic} />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-700">
              Choose Content Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contentTypes.map((type) => (
                <Card
                  key={type.name}
                  interactive
                  selected={contentType === type.name}
                  onClick={() => setContentType(type.name as ContentType)}
                >
                  <div className="flex flex-col items-center gap-2">
                    {type.icon}
                    <span className="font-medium text-sm text-center">
                      {type.name}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Button
            className="w-full md:w-auto self-center"
            onClick={handleGenerateClick}
          >
            Generate Content <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
