import { Card } from "../components/Card";

    const ScreenPlaceholder = ({ title }: { title: string }) => (
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-700">{title}</h1>
          <p className="text-secondary mt-2">This screen is under construction.</p>
        </Card>
      </div>
    );

    export const Dashboard = () => <ScreenPlaceholder title="Generation Dashboard" />;
    export const Output = () => <ScreenPlaceholder title="Output Display" />;
    export const Settings = () => <ScreenPlaceholder title="Settings" />;
    export const Library = () => <ScreenPlaceholder title="Content Library" />;
