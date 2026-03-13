import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        fontSize: "16px",
        cursor: "pointer",
        borderRadius: "8px",
        border: "2px solid black",
        background: "white"
      }}
    >
      {children}
    </button>
  );
}