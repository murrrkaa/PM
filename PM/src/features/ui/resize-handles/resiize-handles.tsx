import { resizeHandles } from "../../../shared/ui/components/elements/content-wrapper/model/resizeHandles.ts";
import { Image, Position, Size, Text } from "../../../shared/ui/model/types.ts";
import { FC, SetStateAction, useRef, useState } from "react";
import { ResizeHandle } from "../../../shared/ui/components/resize-handle";
import * as React from "react";

interface IProps {
  content: Image | Text;
  setIsDragging: (state: boolean) => void;
  preview: boolean;
  previewScale: number;
  isDragging: boolean;
  position: Position;
  setPosition: React.Dispatch<SetStateAction<Position>>;
}

export const ResizeHandles: FC<IProps> = ({
  content,
  setIsDragging,
  preview,
  previewScale,
  setPosition,
  position,
}) => {
  const startSize = useRef<Size>({
    height: content.size.height * previewScale,
    width: content.size.width * previewScale,
  });
  const [size, setSize] = useState<Size>({
    height: content.size.height * previewScale,
    width: content.size.width * previewScale,
  });

  return resizeHandles.map((resizer) => (
    <ResizeHandle
      size={size}
      setSize={setSize}
      startSize={startSize}
      key={resizer.corner}
      resizer={resizer}
      setIsDragging={setIsDragging}
      content={content}
      preview={preview}
      previewScale={previewScale}
      position={position}
      setPosition={setPosition}
    />
  ));
};
