import {
  Presentation,
  Slide,
  Text,
  Image,
  Position,
  Size,
  Background,
} from "./types";
import { v4 as uuid } from "uuid";

export type Properties = "font" | "size" | "text" | "fontSize" | "color";

function isEqualState(
  newState: string | boolean | Position | Size,
  lastState: string | boolean | Position | Size,
): boolean {
  if (typeof newState === "object" && typeof lastState === "object") {
    if (
      "x" in newState &&
      "y" in newState &&
      "x" in lastState &&
      "y" in lastState
    ) {
      return newState.x === lastState.x && newState.y === lastState.y;
    }
    if (
      "height" in newState &&
      "width" in newState &&
      "height" in lastState &&
      "width" in lastState
    ) {
      return (
        newState.width === lastState.width &&
        newState.height === lastState.height
      );
    }
  }
  return newState === lastState;
}

export function changeOfNamePresentation(
  presentation: Presentation,
  newTitle: string,
): Presentation {
  return {
    ...presentation,
    title: newTitle,
    undoStack: [
      ...(presentation.undoStack ?? []),
      {
        selectedSlide: presentation.selectedSlide,
        slides: presentation.slides,
        title: presentation.title,
      },
    ],
    redoStack: [],
  };
}

export function addSlideToPresentation(
  presentation: Presentation,
): Presentation {
  const id = uuid();
  const newSlide = {
    id,
    content: [],
  };
  const updateSlides = [...(presentation.slides ?? []), newSlide];
  return {
    ...presentation,
    selectedSlide: id,
    slides: updateSlides,
    undoStack: [
      ...(presentation.undoStack ?? []),
      {
        selectedSlide: presentation.selectedSlide,
        slides: presentation.slides,
        title: presentation.title,
      },
    ],
    redoStack: [],
  };
}

export function removeSlideFromPresentation(
  presentation: Presentation,
  slideId: string,
): Presentation {
  const deleteSlide = presentation.slides.findIndex(
    (item) => item.id === slideId,
  );

  const selectedSlide =
    presentation.slides[deleteSlide + 1] ??
    presentation.slides[deleteSlide - 1] ??
    "";

  const updateSlides = presentation?.slides?.filter(
    (item) => item.id !== slideId,
  );

  return {
    ...presentation,
    slides: updateSlides,
    selectedSlide: selectedSlide.id,
    undoStack: [
      ...(presentation.undoStack ?? []),
      {
        selectedSlide: presentation.selectedSlide,
        slides: presentation.slides,
        title: presentation.title,
      },
    ],
    redoStack: [],
  };
}

export function changePositionOfSlide(
  presentation: Presentation,
  slide: Slide,
  toIndex: number,
): Presentation {
  const indexDragSlide = presentation.slides.findIndex(
    (item) => item.id === slide.id,
  );

  const slides = JSON.parse(JSON.stringify(presentation.slides)) ?? [];

  if (indexDragSlide === toIndex || toIndex === null || toIndex === undefined) {
    return presentation;
  }

  const movedSlide = slides[indexDragSlide] ?? [];

  slides.splice(indexDragSlide, 1);
  slides.splice(toIndex, 0, movedSlide);

  const updateSlides = [...(slides ?? [])];

  return {
    ...presentation,
    slides: updateSlides,
    undoStack: [
      ...(presentation.undoStack ?? []),
      {
        slides: presentation.slides,
        selectedSlide: presentation.selectedSlide,
        title: presentation.title,
      },
    ],
    redoStack: [],
  };
}

export function addContentToSlide(
  presentation: Presentation,
  slideId: string,
  newContent: Text | Image,
): Presentation {
  const updatedSlides = presentation.slides.map((slide) =>
    slide.id === slideId
      ? { ...slide, content: [...slide.content, newContent] }
      : slide,
  );
  return {
    ...presentation,
    slides: updatedSlides,
    undoStack: [
      ...(presentation.undoStack ?? []),
      {
        slides: presentation.slides,
        selectedSlide: presentation.selectedSlide,
        title: presentation.title,
      },
    ],
    redoStack: [],
  };
}

export function removeContentFromSlide(
  presentation: Presentation,
  slideId: string,
): Presentation {
  const updateSlides = presentation.slides.map((slide) =>
    slide.id === slideId
      ? {
          ...slide,
          content: slide.content.filter((content) => !content.selected),
        }
      : slide,
  );
  return {
    ...presentation,
    slides: updateSlides,
    undoStack: [
      ...(presentation.undoStack ?? []),
      {
        slides: presentation.slides,
        selectedSlide: presentation.selectedSlide,
        title: presentation.title,
      },
    ],
    redoStack: [],
  };
}

export function changePositionElement(
  presentation: Presentation,
  slideId: string,
  elementId: string,
  position: Position,
  isDragging: boolean,
  wasDragging: boolean,
): Presentation {
  const slide = presentation.slides.find((slide) => slide.id === slideId);
  const foundElement = slide?.content?.find(
    (element) => element.id === elementId,
  );
  if (!foundElement) {
    return presentation;
  }

  if (isEqualState(position, foundElement.position) && !wasDragging) {
    return presentation;
  }

  const updateElement: Text | Image = {
    ...foundElement,
    position: {
      x: position.x,
      y: position.y,
    },
  };

  const updateSlides = presentation.slides.map((slide) =>
    slide.id === slideId
      ? {
          ...slide,
          content: [
            ...(slide?.content?.filter((item) => item.id !== elementId) ?? []),
            updateElement,
          ],
        }
      : slide,
  );
  return {
    ...presentation,
    slides: updateSlides,
    undoStack: isDragging
      ? [...(presentation.undoStack ?? [])]
      : [
          ...(presentation.undoStack ?? []),
          {
            slides: presentation.slides,
            selectedSlide: presentation.selectedSlide,
            title: presentation.title,
          },
        ],
    redoStack: [],
  };
}

export function updateSlideText(
  presentation: Presentation,
  slideId: string,
  textId: string,
  newProperty: string | Size,
  initValue: string,
  property: Properties,
  isWriting: boolean,
): Presentation {
  const slide = presentation.slides.find((el) => el.id === slideId);
  const foundText = slide?.content?.find((item) => item.id === textId);
  if (!foundText) {
    return presentation;
  }

  const updatedText = {
    ...foundText,
    [property]:
      typeof newProperty === "string" ? newProperty : { ...newProperty },
  };

  const updatedSlides = presentation.slides.map((slide) =>
    slide.id === slideId
      ? {
          ...slide,
          content: [
            ...(slide?.content?.filter((item) => item.id !== textId) ?? []),
            updatedText,
          ],
        }
      : slide,
  );
  const undoText = {
    ...foundText,
    text: initValue,
  };
  const undoSlides = presentation.slides.map((slide) =>
    slide.id === slideId
      ? {
          ...slide,
          content: [
            ...(slide?.content?.filter((item) => item.id !== textId) ?? []),
            undoText,
          ],
        }
      : slide,
  );

  return {
    ...presentation,
    slides: updatedSlides,
    undoStack: isWriting
      ? [...(presentation.undoStack ?? [])]
      : [
          ...(presentation.undoStack ?? []),
          {
            selectedSlide: presentation.selectedSlide,
            slides: undoSlides,
            title: presentation.title,
          },
        ],
    redoStack: [],
  };
}

export function updateSlideTextProperties(
  presentation: Presentation,
  slideId: string,
  property: Properties,
  newValue: string | number,
  activeMenu: boolean,
) {
  const slide = presentation.slides.find((slide) => slide.id === slideId);
  if (!slide) return presentation;
  const updateSlide = {
    ...slide,
    content: slide.content.map((el) => {
      if (property in el && el.selected)
        return {
          ...el,
          [property]: newValue,
        };
      return el;
    }),
  };
  const updatedSlides = presentation.slides.map((slide) =>
    slide.id === slideId ? updateSlide : slide,
  );
  return {
    ...presentation,
    slides: updatedSlides,
    undoStack: activeMenu
      ? [...(presentation.undoStack ?? [])]
      : [
          ...(presentation.undoStack ?? []),
          {
            selectedSlide: presentation.selectedSlide,
            slides: presentation.slides,
            title: presentation.title,
          },
        ],
    redoStack: [],
  };
}

export function saveTextProperties(
  presentation: Presentation,
  slideId: string,
  data: { color: string | null; fontSize: number | null; font: string | null },
) {
  if (!data.color && !data.font && !data.fontSize) return presentation;

  const slide = presentation.slides.find((slide) => slide.id === slideId);

  const updateSlide = {
    ...slide,
    content: slide?.content.map((el) => {
      if (el.type === "text" && el.selected) {
        return {
          ...el,
          color: data.color ?? el.color,
          font: data.font ?? el.font,
          fontSize: data.fontSize ?? el.fontSize,
        };
      }
      return el;
    }),
  };

  const updateSlides = presentation.slides.map((slide) =>
    slide.id === slideId ? updateSlide : slide,
  );

  return {
    ...presentation,
    slides: updateSlides,
    undoStack: [
      ...(presentation.undoStack ?? []),
      {
        selectedSlide: presentation.selectedSlide,
        slides: presentation.slides,
        title: presentation.title,
      },
    ],
    redoStack: [],
  };
}

export function updateSlideImageSize(
  slide: Slide,
  imageId: string,
  newSize: Size,
) {
  const foundImage = slide?.content?.find((item) => item.id === imageId) ?? [];
  const updatedImage = {
    ...foundImage,
    size: { ...newSize },
  };

  return {
    ...slide,
    content: [
      ...(slide?.content?.filter((item) => item.id !== imageId) ?? []),
      updatedImage,
    ],
  };
}

export const updateElementSize = (
  presentation: Presentation,
  slideId: string,
  contentId: string,
  newSize: Size,
  isResizing: boolean,
) => {
  const slide = presentation.slides.find((slide) => slide.id === slideId);
  const element = slide?.content.find((el) => el.id === contentId);

  if (!slide || !element) return presentation;

  const updateSizeElement = {
    ...element,
    size: {
      height: newSize.height,
      width: newSize.width,
    },
  };

  const updateSlide = {
    ...slide,
    content: slide.content.map((el) =>
      el.id === contentId ? updateSizeElement : el,
    ),
  };

  const updateSlides = presentation.slides.map((slide) =>
    slide.id === slideId ? updateSlide : slide,
  );

  return {
    ...presentation,
    slides: updateSlides,
    undoStack: isResizing
      ? [...(presentation.undoStack ?? [])]
      : [
          ...(presentation.undoStack ?? []),
          {
            selectedSlide: presentation.selectedSlide,
            slides: presentation.slides,
            title: presentation.title,
          },
        ],
    redoStack: [],
  };
};

export function changeBackgroundOfSlide(
  presentation: Presentation,
  slideId: string,
  newBackground: Background,
  startBackground: Background,
  activeMenu: string | null,
): Presentation {
  const slide = presentation.slides.find((slide) => slide.id === slideId);
  if (
    slide &&
    isEqualState(startBackground.background, newBackground.background) &&
    !activeMenu
  ) {
    return presentation;
  }
  const undoSlides = presentation.slides.map((slide) =>
    slide.id === slideId ? { ...slide, background: startBackground } : slide,
  );
  const updateSlides = presentation.slides.map((slide) =>
    slide.id == slideId ? { ...slide, background: newBackground } : slide,
  );
  return {
    ...presentation,
    slides: updateSlides,
    undoStack: activeMenu
      ? [...(presentation.undoStack ?? [])]
      : [
          ...(presentation.undoStack ?? []),
          {
            slides: undoSlides,
            selectedSlide: presentation.selectedSlide,
            title: presentation.title,
          },
        ],
    redoStack: [],
  };
}

export function changeSelectedElement(
  presentation: Presentation,
  slideId: string,
  contentId: string,
): Presentation {
  const updateSlides = presentation.slides.map((slide) => {
    if (slide.id === slideId) {
      return {
        ...slide,
        content: slide.content.map((element) =>
          element.id === contentId
            ? { ...element, selected: !element.selected }
            : element,
        ),
      };
    } else {
      return slide;
    }
  });
  return {
    ...presentation,
    slides: updateSlides,
  };
}

export function setSelectedSlideOfPresentation(
  presentation: Presentation,
  slideId: string,
) {
  if (isEqualState(slideId, presentation.selectedSlide ?? ""))
    return presentation;
  return {
    ...presentation,
    selectedSlide: slideId,
    undoStack: [
      ...(presentation.undoStack ?? []),
      {
        slides: presentation.slides,
        selectedSlide: presentation.selectedSlide,
        title: presentation.title,
      },
    ],
    redoStack: [],
  };
}

export function backupSlide(presentation: Presentation, slideId: string) {
  const currentSlide = presentation?.slides.find(
    (slide) => slide.id === slideId,
  );
  if (!currentSlide) return;

  const currentIndex = presentation?.slides.findIndex(
    (slide) => slide.id === slideId,
  );

  const backuppedSlideId = uuid();

  const backuppedSlide: Slide = {
    ...structuredClone(currentSlide),
    id: backuppedSlideId,
  };
  const updateSlides = presentation.slides.slice(0, currentIndex + 1);
  if (backuppedSlide) updateSlides.push(backuppedSlide);

  updateSlides.push(...presentation.slides.slice(currentIndex + 1));

  return {
    ...presentation,
    selectedSlide: backuppedSlideId,
    slides: updateSlides,
    undoStack: [
      ...(presentation.undoStack ?? []),
      {
        slides: presentation.slides,
        selectedSlide: presentation.selectedSlide,
        title: presentation.title,
      },
    ],
    redoStack: [],
  };
}
