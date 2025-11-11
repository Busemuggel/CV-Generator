import React from "react";
import "./FormattedText.css";

export const FormattedText = ({ text, className = "", primaryColor }) => {
  if (!text) return null;

  const renderInlineWithMarkup = (input) => {
    const out = [];
    let buf = "";
    let i = 0;
    let isBold = false;
    let isPrimary = false;

    const flush = (key) => {
      if (!buf) return;
      const style = isPrimary ? { color: primaryColor } : undefined;

      if (isBold) {
        out.push(
          <strong key={key} style={style}>
            {buf}
          </strong>
        );
      } else if (isPrimary) {
        out.push(
          <span key={key} style={style}>
            {buf}
          </span>
        );
      } else {
        out.push(<React.Fragment key={key}>{buf}</React.Fragment>);
      }
      buf = "";
    };

    while (i < input.length) {
      // *** -> bold + primary (WICHTIG: vor ** prüfen)
      if (input.startsWith("***", i)) {
        flush(`bp-${i}`);
        isBold = !isBold;
        isPrimary = !isPrimary;
        i += 3;
        continue;
      }
      // ** -> bold
      if (input.startsWith("**", i)) {
        flush(`b-${i}`);
        isBold = !isBold;
        i += 2;
        continue;
      }
      // *p* -> primary color
      if (input.startsWith("*p*", i)) {
        flush(`p-${i}`);
        isPrimary = !isPrimary;
        i += 3;
        continue;
      }

      buf += input[i];
      i += 1;
    }
    flush("end");
    return out;
  };

  const lines = text.split(/\r?\n/);

  return (
    <div className={className}>
      {lines.map((line, idx) => {
        // Leere Zeilen als Abstand
        if (line.trim() === "") return <br key={`br-${idx}`} />;

        // Bullet-Zeile: "- " am Anfang
        if (line.startsWith("- ")) {
          // WICHTIG: NICHT mehr slice(2) → der Bindestrich bleibt erhalten,
          // damit dein .ft-bullet Hanging-Indent wieder korrekt funktioniert.
          return (
            <p key={`li-${idx}`} className="ft-bullet">
              {renderInlineWithMarkup(line)}
            </p>
          );
        }

        // normale Zeile
        return <p key={`p-${idx}`}>{renderInlineWithMarkup(line)}</p>;
      })}
    </div>
  );
};
