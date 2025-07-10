import React from "react";

    interface SelectProps
      extends React.SelectHTMLAttributes<HTMLSelectElement> {
      children: React.ReactNode;
    }

    export const Select = ({ children, className, ...props }: SelectProps) => {
      return (
        <select className={`input-field ${className}`} {...props}>
          {children}
        </select>
      );
    };
