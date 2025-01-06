import { ChangeEvent, FC } from "react";
import style from "./input-image.module.css";
import { IconImage } from "../../icons/image.tsx";
import { Size } from "../../model/types.ts";

interface IButtonProps {
  onChange?: (image: string, size: Size) => void;
}

export const InputImage: FC<IButtonProps> = ({ onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = reader.result as string;
        const img = new Image();
        img.onload = () => {
          const size: Size = {
            width: img.width,
            height: img.height,
          };
          onChange?.(image, size);
        };
        img.src = image;
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  return (
    <div title="Изображение" className={style.button__wrapper}>
      <IconImage />
      <input
        onChange={handleChange}
        className={style.input__item}
        type="file"
      />
    </div>
  );
};
