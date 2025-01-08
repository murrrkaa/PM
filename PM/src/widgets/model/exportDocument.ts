import { Slide } from "../../shared/ui/model/types";
import { jsPDF } from "jspdf";

export const saveDocument = (state: Slide[]) => {
  const jsonFile = JSON.stringify(state);
  const blob = new Blob([jsonFile], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "presentation.json";
  link.click();

  URL.revokeObjectURL(url);
};

export const createPDF = (
  slides: Slide[],
  title: string,
): { url: string; pdf: jsPDF } => {
  const pdf = new jsPDF("landscape", "mm", [317, 185]);

  pdf.setProperties({
    title,
  });

  slides.forEach((slide: Slide, index: number) => {
    if (index) pdf.addPage();
    if (slide.background) {
      if (slide.background.type === "color") {
        pdf.setFillColor(slide.background.background);
        pdf.rect(0, 0, 317, 185, "F");
      } else if (slide.background.type === "image") {
        pdf.addImage(slide.background.background, 0, 0, 317, 185);
      }
    }
    slide.content.forEach((content) => {
      if (content.type === "text") {
        pdf.setFont(content.font || "helvetica", "normal");
        pdf.setFontSize(content.fontSize);
        pdf.text(
          content.text,
          content.position.x * (25.4 / 96),
          content.position.y * (25.4 / 96),
        );
      }

      if (content.type === "image") {
        const widthInMM = content.size.width * (25.4 / 96);
        const heightInMM = content.size.height * (25.4 / 96);
        const positionXMM = content.position.x * (25.4 / 96);
        const positionYMM = content.position.y * (25.4 / 96);
        pdf.addImage(
          content.image,
          positionXMM,
          positionYMM,
          widthInMM,
          heightInMM,
        );
      }
    });
  });

  const pdfBlob = pdf.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

  return {
    url: pdfUrl,
    pdf,
  };
};
