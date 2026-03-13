import React from "react";

type AdPlaceholderProps = {
  label: string;
};

export function AdPlaceholder({ label }: AdPlaceholderProps) {
  return (
    <div
      style={{
        marginTop: "12px",
        padding: "12px",
        border: "2px dashed #666",
        borderRadius: "8px",
        textAlign: "center",
        background: "#fafafa"
      }}
    >
      {label}
    </div>
  );
}