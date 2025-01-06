import { IResizeHandle } from "../components/elements/content-wrapper/model/resizeHandles.ts";
import { SetStateAction, useEffect, useRef } from "react";
import * as React from "react";
import { Position, Size } from "../model/types.ts";

export const useResize = (
  ref: React.RefObject<HTMLDivElement | null>,
  resize: React.MutableRefObject<IResizeHandle | null>,
  isResize: React.MutableRefObject<boolean>,
  setSize: React.Dispatch<SetStateAction<Size>>,
  startSize: React.RefObject<Size>,
  setPosition: React.Dispatch<SetStateAction<Position>>,
) => {
  const startMoveSize = useRef<Size>({
    height: startSize.current?.height ?? 0,
    width: startSize.current?.width ?? 0,
  });

  const startPositionX = useRef(0);
  const startPositionY = useRef(0);

  useEffect(() => {
    const handleMouseUp = () => {
      isResize.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const dh = startPositionY.current - e.pageY;
      const dw = startPositionX.current - e.pageX;
      switch (resize.current?.corner) {
        case "top-middle": {
          setPosition((prev) => ({
            ...prev,
            y: prev.y - dh,
          }));
          setSize((prev) => ({
            height: prev.height + dh,
            width: prev.width,
          }));
          startMoveSize.current = {
            height: startMoveSize.current.height + dh,
            width: startMoveSize.current.width,
          };
          startPositionY.current = e.pageY;
          break;
        }
        case "bottom-middle": {
          setSize((prev) => ({
            height: prev.height - dh,
            width: prev.width,
          }));
          startMoveSize.current = {
            height: startMoveSize.current.height + dh,
            width: startMoveSize.current.width,
          };
          startPositionY.current = e.pageY;
          break;
        }
        case "side-left": {
          setPosition((prev) => ({
            ...prev,
            x: prev.x - dw,
          }));
          setSize((prev) => ({
            height: prev.height,
            width: prev.width + dw,
          }));
          startMoveSize.current = {
            height: startMoveSize.current.height,
            width: startMoveSize.current.width - dw,
          };
          startPositionX.current = e.pageX;
          break;
        }
        case "side-right": {
          setSize((prev) => ({
            height: prev.height,
            width: prev.width - dw,
          }));
          startMoveSize.current = {
            height: startMoveSize.current.height,
            width: startMoveSize.current.width - dw,
          };
          startPositionX.current = e.pageX;
          break;
        }
        case "top-right": {
          setPosition((prev) => ({
            ...prev,
            y: prev.y - dh,
          }));
          setSize((prev) => ({
            height: prev.height + dh,
            width: prev.width - dw,
          }));
          startMoveSize.current = {
            height: startMoveSize.current.height + dh,
            width: startMoveSize.current.width + dw,
          };
          startPositionY.current = e.pageY;
          startPositionX.current = e.pageX;
          break;
        }
        case "top-left": {
          setPosition((prev) => ({
            x: prev.x - dw,
            y: prev.y - dh,
          }));
          setSize((prev) => ({
            height: prev.height + dh,
            width: prev.width + dw,
          }));
          startMoveSize.current = {
            height: startMoveSize.current.height + dh,
            width: startMoveSize.current.width + dw,
          };
          startPositionY.current = e.pageY;
          startPositionX.current = e.pageX;
          break;
        }
        case "bottom-right": {
          setSize((prev) => ({
            height: prev.height - dh,
            width: prev.width - dw,
          }));
          startMoveSize.current = {
            height: startMoveSize.current.height - dh,
            width: startMoveSize.current.width - dw,
          };
          startPositionY.current = e.pageY;
          startPositionX.current = e.pageX;
          break;
        }
        case "bottom-left": {
          setPosition((prev) => ({
            ...prev,
            x: prev.x - dw,
          }));
          setSize((prev) => ({
            height: prev.height - dh,
            width: prev.width + dw,
          }));
          startMoveSize.current = {
            height: startMoveSize.current.height - dh,
            width: startMoveSize.current.width + dw,
          };
          startPositionY.current = e.pageY;
          startPositionX.current = e.pageX;
          break;
        }
        default:
          break;
      }
    };
    const handleMouseDown = (e: MouseEvent) => {
      isResize.current = true;
      e.preventDefault();
      startMoveSize.current = {
        height: startSize.current?.height ?? 0,
        width: startSize.current?.width ?? 0,
      };
      startPositionX.current = e.pageX;
      startPositionY.current = e.pageY;

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };
    ref.current?.addEventListener("mousedown", handleMouseDown);
    return () => {
      ref.current?.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resize.current, isResize]);
};
