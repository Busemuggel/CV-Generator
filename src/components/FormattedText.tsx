import React from "react";
import "./FormattedText.css";

export const FormattedText = ({ text, className = "" }) => {
  if (!text) return null;

  const lines = text.split(/\r?\n/);

  return (
    <div className={className}>
      {lines.map((line, idx) => {
        if (line.startsWith("- ")) {
          return (
            <p key={idx} className="ft-bullet">
              {line}
            </p>
          );
        }

        // Leere Zeilen als Abstand
        if (line.trim() === "") {
          return <br key={idx} />;
        }

        return <p key={idx}>{line}</p>;
      })}
    </div>
  );
};
