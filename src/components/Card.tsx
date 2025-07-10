import React from "react";

    interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
      children: React.ReactNode;
      interactive?: boolean;
      selected?: boolean;
    }

    export const Card = ({
      children,
      className,
      interactive = false,
      selected = false,
      ...props
    }: CardProps) => {
      const baseClasses = "glass-card p-6 text-center";
      const interactiveClasses = interactive
        ? "cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        : "";
      const selectedClasses = selected
        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
        : "";

      return (
        <div
          className={`${baseClasses} ${interactiveClasses} ${selectedClasses} ${className}`}
          {...props}
        >
          {children}
        </div>
      );
    };
