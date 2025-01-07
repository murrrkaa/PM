import { useDispatch, useSelector } from "react-redux";
import { Text, Image, Slide, Position } from "../../../../model/types.ts";
import * as React from "react";
import { FC, useEffect, useRef, useState } from "react";
import { useDragAndDrop } from "../../../../hooks/useDragAndDrop.tsx";
import { RootState } from "../../../../store/store.ts";
import { setStateSelectedElements } from "../../../../store/actions.ts";
import { changePositionElementOfSlide } from "../../../../store/actions.ts";
import { ResizeHandles } from "../../../../../../features/ui/resize-handles";
import style from "./content-wrapper.module.css";
import { useMemo } from "react";

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
  const startPosition = useMemo(
    () => ({
      x: content.position.x * previewScale,
      y: content.position.y * previewScale,
    }),
    [content.position.x, content.position.y, previewScale],
  );

  const [position, setPosition] = useState<Position>(startPosition);

  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    if (!preview) {
      dispatch(
        changePositionElementOfSlide(
          selected ?? "",
          content.id,
          position,
          isDragging,
        ),
      );
    }
  }, [position, isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useDragAndDrop(ref, position, setPosition, isDragging, setIsDragging);

  useEffect(() => {
    setPosition(startPosition);
  }, [startPosition]);

  return (
    <div
      key={content.id}
      ref={ref}
      onMouseDown={handleMouseDown}
      onClick={() => handleClickElement(slide.id, content.id)}
      className={style.content__wrapper}
      style={{
        top: content.position.y * previewScale,
        left: content.position.x * previewScale,
        outline:
          content.selected && !preview && !slideShow ? "1px solid #444" : "",
        outlineOffset: "-5px",
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
