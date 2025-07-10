import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState } from "react";
import { Landing, LandingPageProps } from "./screens/Landing";
import { Settings } from "./screens/Settings";
import { Library } from "./screens/Library";
import { Generation } from "./screens/Generation";
import { Menu, X } from "lucide-react";
import { SettingsProvider } from "./context/SettingsContext";

type Screen = "landing" | "generation" | "settings" | "library";

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

function AppContent() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [generationProps, setGenerationProps] = useState<LandingPageProps | null>(
    null
  );

  const handleGenerate = (props: LandingPageProps) => {
    setGenerationProps(props);
    setScreen("generation");
  };

  const NavLink = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
        active
          ? "bg-primary/20 text-primary"
          : "text-secondary hover:bg-gray-200/50"
      }`}
    >
      {children}
    </button>
  );

  const renderScreen = () => {
    switch (screen) {
      case "landing":
        return <Landing onGenerate={handleGenerate} />;
      case "generation":
        return generationProps ? (
          <Generation {...generationProps} />
        ) : (
          <Landing onGenerate={handleGenerate} />
        );
      case "settings":
        return <Settings />;
      case "library":
        return <Library />;
      default:
        return <Landing onGenerate={handleGenerate} />;
    }
  };

  return (
    <div className="min-h-screen w-full gradient-background">
      <header className="sticky top-0 z-30 p-4">
        <div className="glass-card flex justify-between items-center p-2">
          <h2
            className="text-xl font-bold text-gray-800 ml-4 cursor-pointer"
            onClick={() => setScreen("landing")}
          >
            PolicyFrame
          </h2>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              active={screen === "landing"}
              onClick={() => setScreen("landing")}
            >
              Home
            </NavLink>
            <NavLink
              active={screen === "library"}
              onClick={() => setScreen("library")}
            >
              Library
            </NavLink>
            <NavLink
              active={screen === "settings"}
              onClick={() => setScreen("settings")}
            >
              Settings
            </NavLink>
            <SignOutButton />
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-2 p-4 glass-card">
            <nav className="flex flex-col gap-4">
              <NavLink
                active={screen === "landing"}
                onClick={() => {
                  setScreen("landing");
                  setIsMenuOpen(false);
                }}
              >
                Home
              </NavLink>
              <NavLink
                active={screen === "library"}
                onClick={() => {
                  setScreen("library");
                  setIsMenuOpen(false);
                }}
              >
                Library
              </NavLink>
              <NavLink
                active={screen === "settings"}
                onClick={() => {
                  setScreen("settings");
                  setIsMenuOpen(false);
                }}
              >
                Settings
              </NavLink>
              <SignOutButton />
            </nav>
          </div>
        )}
      </header>
      <main className="p-4 md:p-8">
        <Authenticated>{renderScreen()}</Authenticated>
        <Unauthenticated>
          <AuthContent />
        </Unauthenticated>
      </main>
      <Toaster />
    </div>
  );
}

function AuthContent() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to PolicyFrame
        </h1>
        <p className="text-lg md:text-xl">
          Sign in to start generating AI policy content.
        </p>
      </div>
      <div className="w-full max-w-sm">
        <div className="glass-card p-8">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
