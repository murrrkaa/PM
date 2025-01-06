import { EditorPage } from "./pages/ui/main/editor-page.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./shared/ui/lib/routes.ts";
import { SlideshowPage } from "./pages/ui/slideshow";
// import { PreviewPresentationPage } from "./pages/ui/preview-presentation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.EDITOR} element={<EditorPage />} />
        <Route path={ROUTES.SLIDESHOW} element={<SlideshowPage />} />
        {/*<Route*/}
        {/*  path={ROUTES.PREVIEW_PRESENTATION}*/}
        {/*  element={<PreviewPresentationPage />}*/}
        {/*/>*/}
        <Route path="*" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
