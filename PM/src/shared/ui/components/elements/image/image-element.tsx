import { FC } from "react";
import { Image } from "../../../model/types.ts";
interface IProps {
  content: Image;
  previewScale: number;
}

export const ImageElement: FC<IProps> = ({ content, previewScale }) => {
  return (
    <img
      alt={content.alt}
      src={`${content.image}`}
      style={{
        width: content.size.width * previewScale,
        height: content.size.height * previewScale,
      }}
    />
  );
};
