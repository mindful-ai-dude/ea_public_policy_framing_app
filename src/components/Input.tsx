import React from "react";

    interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

    export const Input = ({ className, ...props }: InputProps) => {
      return <input className={`input-field ${className}`} {...props} />;
    };
