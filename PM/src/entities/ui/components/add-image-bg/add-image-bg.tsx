import style from "./add-image-bg.module.css";
import { ChangeEvent, FC } from "react";
import { IconImage } from "../../../../shared/ui/icons/image.tsx";
import { TypeBackground } from "../../../../shared/ui/model/types.ts";

interface IProp {
  onChange: (type: TypeBackground, bg: string) => void;
}

export const AddImageBg: FC<IProp> = ({ onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = reader.result as string;
        onChange("image", image);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  return (
    <div className={style.menu__image_bg}>
      <IconImage />
      <span>Выбрать изображение</span>
      <input
        onChange={handleChange}
        className={style.input__item}
        type="file"
      />
    </div>
  );
};
