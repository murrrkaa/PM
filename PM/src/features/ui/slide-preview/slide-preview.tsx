import style from "./slide-preview.module.css";
import { FC, useEffect, useRef, useState } from "react";
import { Slide } from "../../../shared/ui/model/types";
import { SlideElement } from "../../../entities/ui/components/slide";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/ui/store/store.ts";
import { useDragAndDrop } from "../../hooks/useDragAndDrop.tsx";
import * as React from "react";
import { Position } from "../../../shared/ui/model/types";
import { IIndicator } from "../../../widgets/ui/slides-list/slides-previews.tsx";
import {
  setSelectedSlide,
  setDraggingSlide,
  updateSlidesPositions,
} from "../../../shared/ui/store/actions.ts";

interface IProps {
  slide: Slide;
  number?: number;
  slideId?: string;
  lastSlide?: boolean;
  indicators?: (IIndicator | null)[];
  activeIndicator?: IIndicator | null;
  setActiveIndicator?: React.Dispatch<React.SetStateAction<IIndicator | null>>;
  scrollSlideWrapper: React.RefObject<HTMLDivElement>;
  setIndicators: React.Dispatch<React.SetStateAction<(IIndicator | null)[]>>;
}

export const SlidePreview: FC<IProps> = ({
  slide,
  number,
  slideId,
  lastSlide,
  indicators,
  activeIndicator,
  setActiveIndicator,
  scrollSlideWrapper,
  setIndicators,
}) => {
  const selected = useSelector((state: RootState) => state.selectedSlide);
  const draggingSlide = useSelector((state: RootState) => state.draggingSlide);

  const dispatch = useDispatch();

  const handleSelectedSlide = () => {
    if (!wasDragging) {
      dispatch(setSelectedSlide(slideId ?? ""));
      dispatch(setDraggingSlide(slideId ?? ""));
    }
    setWasDragging(false);
  };

  const ref = useRef<HTMLDivElement>(null);
  const isDragging = draggingSlide === slideId && selected === slideId;
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const lastIndicator = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLDivElement>(null);

  const initIndicator = useRef(false);
  const lastInitIndicator = useRef(false);

  const slides = useSelector((state: RootState) => state.slides);

  const [wasDragging, setWasDragging] = useState<boolean>(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (selected === slideId) {
      dispatch(setDraggingSlide(slideId ?? ""));
    }
  };

  const updateSlidePosition = (activeIndicator: IIndicator | null) => {
    setActiveIndicator?.(null);
    setWasDragging(true);
    dispatch(updateSlidesPositions(slide, activeIndicator?.index ?? null));
  };

  useDragAndDrop(
    ref,
    isDragging,
    setPosition,
    setActiveIndicator,
    indicators,
    scrollSlideWrapper,
    updateSlidePosition,
  );

  useEffect(() => {
    if (!initIndicator.current) {
      setIndicators((prev) => [
        ...prev,
        {
          indicator: indicator.current,
          index: number ? number - 1 : 0,
        },
      ]);
      initIndicator.current = true;
    }
    if (lastSlide && !lastInitIndicator.current) {
      setIndicators((prev) => [
        ...prev,
        {
          indicator: lastIndicator.current,
          index: number ?? 0,
        },
      ]);
      lastInitIndicator.current = true;
    }
  }, [slides]);

  return (
    <>
      <div
        ref={indicator}
        className={style.drag__indicator}
        style={{
          opacity: activeIndicator?.indicator === indicator.current ? "1" : "0",
        }}
      ></div>
      <div className={style.slide}>
        <div className={style.slide__number}>{number}</div>
        <div
          ref={ref}
          onMouseDown={handleMouseDown}
          onClick={handleSelectedSlide}
          className={style.slide__preview}
          style={{
            border: selected === slideId ? "2px solid #7731d8" : "transparent",
            position: isDragging ? "absolute" : "static",
            zIndex: (isDragging && 1000) || 1,
            cursor: isDragging ? "pointer" : "default",
            left: "30px",
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          {slide && <SlideElement slide={slide} scale={0.25} preview={true} />}
        </div>
        {isDragging && (
          <div
            className={style.slide__preview}
            style={{
              border:
                selected === slideId ? "2px solid #7731d8" : "transparent",
              opacity: "0.5",
            }}
          >
            {slide && (
              <SlideElement slide={slide} scale={0.25} preview={true} />
            )}
          </div>
        )}
      </div>
      {lastSlide && (
        <div
          ref={lastIndicator}
          style={{
            opacity:
              activeIndicator?.indicator === lastIndicator.current ? "1" : "0",
          }}
          className={style.drag__indicator}
        ></div>
      )}
    </>
  );
};
