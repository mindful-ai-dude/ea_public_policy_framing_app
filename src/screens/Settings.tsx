import { useState, useContext, useEffect } from "react";
import { useQuery } from "convex/react";
import { toast } from "sonner";
import { SettingsContext } from "../context/SettingsContext";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { BrainCircuit, Zap, Gem, Server } from "lucide-react";

const ModelCard = ({ model, selected, onSelect }: any) => (
  <Card
    interactive
    selected={selected}
    onClick={() => onSelect(model.id)}
    className="text-left"
  >
    <div className="flex items-center gap-4">
      <div className="p-2 bg-primary/10 rounded-full">{model.icon}</div>
      <div>
        <h4 className="font-bold text-gray-800">{model.name}</h4>
        <p className="text-sm text-secondary">{model.description}</p>
      </div>
    </div>
    <div className="text-xs text-secondary mt-4 grid grid-cols-2 gap-2">
      <span>
        <b>Speed:</b> {model.speed}
      </span>
      <span>
        <b>Cost:</b> {model.cost}
      </span>
    </div>
  </Card>
);

export const Settings = () => {
  const {
    apiKey,
    setApiKey,
    model: selectedModel,
    setModel,
    isServerKeySet,
  } = useContext(SettingsContext);

  const [keyInput, setKeyInput] = useState("");
  const usage = useQuery(api.generations.getUserUsage);

  useEffect(() => {
    setKeyInput(apiKey);
  }, [apiKey]);

  const handleSaveKey = () => {
    setApiKey(keyInput);
    toast.success("API Key saved successfully!");
  };

  const handleClearKey = () => {
    setApiKey("");
    setKeyInput("");
    toast.info("API Key cleared.");
  };

  const models = [
    {
      id: "gemini-2.5-pro",
      name: "Gemini 2.5 Pro",
      description: "Most capable, complex reasoning.",
      icon: <BrainCircuit className="text-primary" />,
      speed: "Moderate",
      cost: "High",
    },
    {
      id: "gemini-2.5-flash",
      name: "Gemini 2.5 Flash",
      description: "Fast responses, efficient processing.",
      icon: <Zap className="text-yellow-500" />,
      speed: "Fast",
      cost: "Medium",
    },
    {
      id: "gemma-3-12b-it",
      name: "Gemma 3 12B",
      description: "Lightweight, cost-effective option.",
      icon: <Gem className="text-green-500" />,
      speed: "Varies",
      cost: "Low",
    },
  ];

  const maskedApiKey = apiKey
    ? `••••••••••••••••••••${apiKey.slice(-4)}`
    : "";

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Settings
        </h1>
        <p className="text-lg text-blue-100">
          Configure your API key and generation preferences.
        </p>
      </div>

      <Card>
        <h3 className="font-bold text-xl mb-4 text-gray-800">
          API Configuration
        </h3>
        {isServerKeySet === undefined ? (
          <div className="text-center text-secondary">Loading...</div>
        ) : isServerKeySet ? (
          <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <Server className="w-6 h-6 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">
                Server API Key is Active
              </h4>
              <p className="text-sm text-green-700">
                The application is configured with a backend API key. No action
                is needed.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-secondary">
              Your API key is stored securely in your browser's local storage
              and is never saved on our servers.
            </p>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <Input
                type="password"
                placeholder="Enter your Google Gemini API Key"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
              />
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  onClick={handleSaveKey}
                  className="flex-1 md:flex-none"
                >
                  Save
                </Button>
                <Button
                  onClick={handleClearKey}
                  className="flex-1 md:flex-none bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Clear
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-sm">Current Key: </span>
                <span className="text-sm text-secondary font-mono">
                  {maskedApiKey || "Not set"}
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card>
        <h3 className="font-bold text-xl mb-4 text-gray-800">
          Model Selection
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {models.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              selected={selectedModel === model.id}
              onSelect={setModel}
            />
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-bold text-xl mb-4 text-gray-800">
          Usage Monitoring
        </h3>
        <p className="text-secondary text-sm">
          Total tokens used in all your generations.
        </p>
        <div className="mt-4 text-center">
          <p className="text-4xl font-bold text-primary">
            {usage ? usage.totalTokens.toLocaleString() : "0"}
          </p>
          <p className="text-sm text-secondary mt-1">Total Tokens Used</p>
        </div>
      </Card>
    </div>
  );
};
