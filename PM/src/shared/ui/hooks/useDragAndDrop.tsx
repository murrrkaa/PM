import * as React from "react";
import { SetStateAction, useEffect, useRef } from "react";
import { Position } from "../model/types.ts";

export const useDragAndDrop = (
  ref: React.RefObject<HTMLDivElement>,
  position: Position,
  setPosition: React.Dispatch<SetStateAction<Position>>,
  isDragging: boolean,
  setIsDragging: (state: boolean) => void,
) => {
  const startPosition = useRef<Position>(position);
  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (isDragging && ref.current && startPosition.current) {
      const dx = e.pageX - startPosition?.current?.x;
      const dy = e.pageY - startPosition?.current?.y;
      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
      startPosition.current = {
        x: e.pageX,
        y: e.pageY,
      };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    startPosition.current = {
      x: e.pageX,
      y: e.pageY,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    ref.current?.addEventListener("mousedown", handleMouseDown);
    return () => {
      ref.current?.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);
};
