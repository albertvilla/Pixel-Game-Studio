import React from "react";

type PanelProps = {
  title: string;
  children: React.ReactNode;
};

export function Panel({ title, children }: PanelProps) {
  return (
    <div
      style={{
        border: "3px solid black",
        borderRadius: "12px",
        padding: "16px",
        background: "#f4f4f4"
      }}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
}