import style from "./select-color-bg.module.css";
import { Pipette } from "../../../../shared/ui/icons/pipette.tsx";
import { ChangeEvent, FC } from "react";
import { TypeBackground } from "../../../../shared/ui/model/types.ts";

interface IProp {
  onChange: (type: TypeBackground, color: string) => void;
}

export const SelectColorBg: FC<IProp> = ({ onChange }) => {
  return (
    <div className={style.select__color}>
      <span>Выбрать свой цвет</span>
      <div className={style.select__item}>
        <Pipette />
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange("color", e.target.value)
          }
          className={style.input__color}
          type="color"
        />
      </div>
    </div>
  );
};
