import { useLocation } from "react-router-dom";
import { PreviewPresentation } from "../../../features/ui/preview-pdf";

export const PreviewPresentationPage = () => {
  const location = useLocation();
  const { state } = location;
  const { url: pdfUrl } = state;
  return <PreviewPresentation url={pdfUrl} />;
};
