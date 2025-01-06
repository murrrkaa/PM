import * as React from "react";
import { SetStateAction, useEffect, useRef } from "react";
import { Position } from "../../shared/ui/model/types.ts";
import { IIndicator } from "../../widgets/ui/slides-list/slides-previews.tsx";
import { useDispatch } from "react-redux";
import { setDraggingSlide } from "../../shared/ui/store/actions.ts";

export const useDragAndDrop = (
  ref: React.RefObject<HTMLDivElement>,
  isDragging: boolean,
  setPosition: React.Dispatch<SetStateAction<Position>>,
  setActiveIndicator:
    | React.Dispatch<React.SetStateAction<IIndicator | null>>
    | undefined,
  indicators: (IIndicator | null)[] | undefined,
  scrollSlideWrapper: React.RefObject<HTMLDivElement>,
  updateSlidePosition: (activeIndicator: IIndicator | null) => void,
) => {
  const scroll = useRef<number>(0);
  const activeIndicatorRef = useRef<IIndicator | null>(null);
  const dispatch = useDispatch();

  const position = useRef<Position | null>(null);
  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (isDragging && ref.current && position.current) {
      const dx = e.pageX - position.current.x;
      const dy = e.pageY - position.current.y;

      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      let found: IIndicator | null = null;

      indicators?.forEach((indicator) => {
        if (indicator?.indicator) {
          const lineRect = indicator.indicator.getBoundingClientRect();
          const slideRect = ref.current?.getBoundingClientRect();
          if (
            slideRect &&
            slideRect.top < lineRect.bottom &&
            slideRect.bottom > lineRect.top &&
            slideRect.left < lineRect.right &&
            slideRect.right > lineRect.left
          ) {
            found = indicator;
          }
        }
      });
      setActiveIndicator?.(found);
      activeIndicatorRef.current = found;
      position.current = {
        x: e.pageX,
        y: e.pageY,
      };
    }
  };

  const handleMouseUp = () => {
    dispatch(setDraggingSlide(""));
    setPosition({
      x: 0,
      y: 0,
    });
    setActiveIndicator?.(null);
    updateSlidePosition(activeIndicatorRef.current);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
    scrollSlideWrapper.current?.removeEventListener("scroll", handleScroll);
  };

  const handleScroll = () => {
    if (isDragging && ref.current && position.current) {
      const currentScrollTop = scrollSlideWrapper.current?.scrollTop ?? 0;
      const dy = currentScrollTop - scroll.current;

      setPosition((prev) => ({
        x: prev.x,
        y: prev.y + dy,
      }));

      scroll.current = currentScrollTop;
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    position.current = {
      x: e.pageX,
      y: e.pageY,
    };

    scroll.current = scrollSlideWrapper.current?.scrollTop ?? 0;
    activeIndicatorRef.current = null;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    scrollSlideWrapper.current?.addEventListener("scroll", handleScroll);
  };

  useEffect(() => {
    if (isDragging) {
      ref?.current?.addEventListener("mousedown", handleMouseDown);
    }
    return () => {
      ref?.current?.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref, isDragging]);
};
