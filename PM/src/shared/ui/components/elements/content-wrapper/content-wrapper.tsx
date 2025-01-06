import { useDispatch, useSelector } from "react-redux";
import { Text, Image, Slide, Position } from "../../../model/types.ts";
import * as React from "react";
import { FC, useEffect, useRef, useState } from "react";
import { useDragAndDrop } from "../../../hooks/useDragAndDrop.tsx";
import { RootState } from "../../../store/store.ts";
import { setStateSelectedElements } from "../../../store/actions.ts";
import { changePositionElementOfSlide } from "../../../store/actions.ts";
import { ResizeHandles } from "../../../../../features/ui/resize-handles";

interface IProps {
  slide: Slide;
  content: Text | Image;
  previewScale: number;
  children: React.ReactNode;
  preview: boolean;
  slideShow?: boolean;
}

export const ContentWrapper: FC<IProps> = ({
  slide,
  content,
  children,
  previewScale,
  preview,
  slideShow,
}) => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selectedSlide);

  const handleClickElement = (slideId: string, contentId: string) => {
    setIsDragging(!content.selected);
    dispatch(setStateSelectedElements(slideId, contentId));
  };
  const ref = useRef<HTMLDivElement>(null);

  const startPosition = useRef({
    x: content.position.x * previewScale,
    y: content.position.y * previewScale,
  });
  const [position, setPosition] = useState<Position>({
    x: content.position.x * previewScale,
    y: content.position.y * previewScale,
  });

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (
      startPosition.current.x === position.x &&
      startPosition.current.y === position.y && isDragging
    )
      return;
    if (!preview) {
      dispatch(
        changePositionElementOfSlide(
          selected ?? "",
          content.id,
          position,
          isDragging,
        ),
      );
      startPosition.current = {
        x: position.x,
        y: position.y,
      };
    }
  }, [position, isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useDragAndDrop(ref, position, setPosition, isDragging, setIsDragging);

  useEffect(() => {
    setPosition({
      x: content.position.x,
      y: content.position.y,
    });
    startPosition.current = {
      x: position.x,
      y: position.y,
    };
  }, [content.position.x, content.position.y]);
  return (
    <div
      key={content.id}
      ref={ref}
      onMouseDown={handleMouseDown}
      onClick={() => handleClickElement(slide.id, content.id)}
      style={{
        width: "fit-content",
        height: "fit-content",
        position: "absolute",
        top: !previewScale
          ? content.position.y
          : content.position.y * previewScale,
        left: !previewScale
          ? content.position.x
          : content.position.x * previewScale,
        border:
          content.selected && !preview && !slideShow ? "1px solid #444" : "",
        pointerEvents: preview || slideShow ? "none" : "auto",
        cursor: isDragging ? "all-scroll" : "default",
      }}
    >
      <ResizeHandles
        content={content}
        setIsDragging={setIsDragging}
        preview={preview}
        previewScale={previewScale}
        isDragging={isDragging}
        position={position}
        setPosition={setPosition}
      />
      {children}
    </div>
  );
};
