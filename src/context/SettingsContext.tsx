import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Note on Security: Storing API keys in localStorage is standard for client-side
// applications where the user provides their own key. It's not "encrypted" in a
// way that's safe from a compromised machine, but it prevents the key from being
// in the codebase and is sandboxed to the browser's origin.

const getStoredValue = (key: string, defaultValue: string): string => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    return saved !== null ? saved : defaultValue;
  }
  return defaultValue;
};

interface SettingsContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  model: string;
  setModel: (model: string) => void;
  isServerKeySet: boolean | undefined;
}

export const SettingsContext = createContext<SettingsContextType>({
  apiKey: "",
  setApiKey: () => {},
  model: "gemini-2.5-flash",
  setModel: () => {},
  isServerKeySet: undefined,
});

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [apiKey, setApiKeyValue] = useState(() =>
    getStoredValue("geminiApiKey", "")
  );
  const [model, setModelValue] = useState(() =>
    getStoredValue("geminiModel", "gemini-2.5-flash")
  );
  const isServerKeySet = useQuery(api.config.isGeminiApiKeySet);

  useEffect(() => {
    localStorage.setItem("geminiApiKey", apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem("geminiModel", model);
  }, [model]);

  const setApiKey = (key: string) => setApiKeyValue(key);
  const setModel = (modelId: string) => setModelValue(modelId);

  return (
    <SettingsContext.Provider
      value={{ apiKey, setApiKey, model, setModel, isServerKeySet }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
