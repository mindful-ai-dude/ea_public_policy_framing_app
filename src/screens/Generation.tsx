import { useState, useEffect, useContext } from "react";
import { useAction, useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { SettingsContext } from "../context/SettingsContext";
import { Card } from "../components/Card";
import {
  CheckCircle,
  Loader,
  FileSearch,
  Globe,
  ScanText,
  BrainCircuit,
  PenSquare,
  Sparkles,
  ClipboardCopy,
  Download,
} from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import { LandingPageProps } from "./Landing";

const workflowSteps = [
  {
    name: "Analyzing Topic",
    icon: <FileSearch />,
    duration: 1500,
  },
  {
    name: "Applying Geographic Context",
    icon: <Globe />,
    duration: 2000,
  },
  {
    name: "Gathering Information",
    icon: <ScanText />,
    duration: 3000,
  },
  {
    name: "Selecting Optimal Model",
    icon: <BrainCircuit />,
    duration: 1000,
  },
  {
    name: "Generating Content with Gemini",
    icon: <PenSquare />,
    duration: 0, // This step's duration is the API call time
  },
  {
    name: "Finalizing Output",
    icon: <Sparkles />,
    duration: 1000,
  },
];

export const Generation = (props: LandingPageProps) => {
  const { apiKey, model } = useContext(SettingsContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationId, setGenerationId] = useState<Id<"generations"> | null>(
    null
  );

  const generateContent = useAction(api.gemini.generateAndSaveContent);
  const generationResult = useQuery(
    api.generations.getGeneration,
    generationId ? { generationId } : "skip"
  );

  useEffect(() => {
    setIsGenerating(true);
    let stepTimeout: NodeJS.Timeout;

    const runWorkflow = async (stepIndex: number) => {
      if (stepIndex >= workflowSteps.length) {
        setIsGenerating(false);
        return;
      }

      setCurrentStep(stepIndex);
      const step = workflowSteps[stepIndex];

      if (step.name === "Generating Content with Gemini") {
        try {
          const result = await generateContent({ ...props, apiKey, model });
          if (result.success && result.generationId) {
            setGenerationId(result.generationId);
            runWorkflow(stepIndex + 1);
          } else {
            toast.error(`Generation failed: ${result.error}`);
            setIsGenerating(false);
          }
        } catch (e: any) {
          toast.error(`Generation failed: ${e.message}`);
          setIsGenerating(false);
        }
      } else {
        stepTimeout = setTimeout(() => {
          runWorkflow(stepIndex + 1);
        }, step.duration);
      }
    };

    runWorkflow(0);

    return () => {
      clearTimeout(stepTimeout);
    };
  }, []);

  const handleCopyToClipboard = () => {
    if (generationResult?.resultText) {
      navigator.clipboard.writeText(generationResult.resultText);
      toast.success("Content copied to clipboard!");
    }
  };

  const handleDownload = () => {
    if (generationResult) {
      const blob = new Blob([generationResult.resultText], {
        type: "text/plain",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${generationResult.topic.replace(/ /g, "_")}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Content downloaded!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      {isGenerating && !generationResult && (
        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Generating Your Content...
          </h2>
          <div className="flex flex-col gap-4">
            {workflowSteps.map((step, index) => (
              <div key={step.name} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {index < currentStep ? (
                    <CheckCircle className="text-green-500" />
                  ) : index === currentStep ? (
                    <Loader className="animate-spin text-primary" />
                  ) : (
                    <div className="w-6 h-6" /> // Placeholder for alignment
                  )}
                </div>
                <span
                  className={`font-medium ${
                    index < currentStep
                      ? "text-gray-500 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {generationResult && (
        <Card className="text-left">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {generationResult.contentType}
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
          <p className="text-sm text-secondary mb-4">
            Topic: <span className="font-semibold">{generationResult.topic}</span>
          </p>
          <div
            className="prose prose-sm max-w-none whitespace-pre-wrap"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {generationResult.resultText}
          </div>
        </Card>
      )}
    </div>
  );
};
