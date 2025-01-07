import * as React from "react";
import { IResizeHandle } from "../elements/content-wrapper/model/resizeHandles.ts";
import { FC, SetStateAction, useEffect, useRef } from "react";
import { Image, Position, Size, Text } from "../../model/types.ts";
import { useResize } from "../../hooks/useResize.tsx";
import {
  changePositionElementOfSlide,
  changeSize,
} from "../../store/actions.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

interface IProps {
  resizer: IResizeHandle;
  setIsDragging: (state: boolean) => void;
  content: Text | Image;
  preview: boolean;
  previewScale: number;
  startSize: React.MutableRefObject<Size>;
  size: Size;
  setSize: React.Dispatch<SetStateAction<Size>>;
  position: Position;
  setPosition: React.Dispatch<SetStateAction<Position>>;
}

export const ResizeHandle: FC<IProps> = ({
  resizer,
  setIsDragging,
  preview,
  content,
  startSize,
  size,
  setSize,
  setPosition,
  position,
}) => {
  const ref = useRef(null);
  const resize = useRef<IResizeHandle>(resizer);
  const isResize = useRef(true);

  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selectedSlide);

  useResize(ref, resize, isResize, setSize, startSize, setPosition, setIsDragging);

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  useEffect(() => {
    if (
      startSize.current.width === size.width &&
      startSize.current.height === size.height && isResize.current
    ) {
      return;
    }
    if (!preview) {
      dispatch(changeSize(selected ?? "", content.id, size, isResize.current));
      startSize.current = {
        height: size.height,
        width: size.width,
      };
    }
  }, [size, isResize]);

  useEffect(() => {
    if (isResize.current)
      dispatch(
        changePositionElementOfSlide(
          selected ?? "",
          content.id,
          position,
          isResize.current,
        ),
      );
  }, [position]);

  useEffect(() => {
    setSize({
      height: content.size.height,
      width: content.size.width,
    })
    startSize.current = {
      height: content.size.height,
      width: content.size.width,
    };
  }, [content.size.width, content.size.height])

  return (
    <div
      ref={ref}
      onMouseDown={(e) => {
        setIsDragging(false);
        handleResize(e);
      }}
      style={{
        display: content.selected && !preview ? "block" : "none",
        position: "absolute",
        height: "10px",
        width: "10px",
        backgroundColor: "white",
        borderRadius: "50%",
        borderWidth: "0.5px",
        borderStyle: "solid",
        borderColor: "black",
        cursor: resizer.cursor,
        ...resizer.style,
      }}
    ></div>
  );
};
