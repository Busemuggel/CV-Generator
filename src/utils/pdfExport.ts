export async function exportToPDF(
  element: HTMLElement,
  filename: string
): Promise<void> {
  // Store the original document title
  const originalTitle = document.title;

  // Set the document title to the desired filename (without extension)
  document.title = filename.replace(".pdf", "");

  // Create a new window/iframe for printing
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Please allow pop-ups to export PDF");
    return;
  }

  // Clone the element to print
  const clonedElement = element.cloneNode(true) as HTMLElement;

  // Get all stylesheets from the parent document
  const styles = Array.from(document.styleSheets)
    .map((styleSheet) => {
      try {
        return Array.from(styleSheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
      } catch (e) {
        // Handle CORS issues with external stylesheets
        return "";
      }
    })
    .join("\n");

  // Build the print window HTML
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename.replace(".pdf", "")}</title>
        <style>
          ${styles}
          
          @media print {
            @page {
              size: A4;
              margin-top: 10mm;
              margin-bottom: 10mm;
            }
            
            body {
              margin: 0;
              padding: 0;
              background: white;
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          }
          
          body {
            margin: 0;
            padding: 0;
            background: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        </style>
      </head>
      <body>
        ${clonedElement.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();

  // Wait for content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();

      // Close the print window after printing (or if user cancels)
      setTimeout(() => {
        printWindow.close();
        // Restore original title
        document.title = originalTitle;
      }, 100);
    }, 250);
  };
}
