import style from "./palette.module.css";
import { colorsPalette } from "../../../shared/ui/model/colors-palette.ts";
import { ButtonPalette } from "../../../shared/ui/components/button-palette";
import { FC } from "react";
import { TypeBackground } from "../../../shared/ui/model/types.ts";

interface IProp {
  onChange: (type: TypeBackground, color: string) => void;
}

export const Palette: FC<IProp> = ({ onChange }) => {
  const colors = Object.entries(colorsPalette);

  return (
    <div className={style.palette}>
      {colors.map(([name, color]) => (
        <ButtonPalette
          key={name}
          color={color}
          onClick={() => onChange("color", color)}
        />
      ))}
    </div>
  );
};
