import style from "./select-color-bg.module.css";
import { FC } from "react";
import { TypeBackground } from "../../../../shared/ui/model/types";
import { InputSelectColor } from "../../../../shared/ui/components/input-select-color/ui";
import { Pipette } from "../../../../shared/ui/icons/pipette.tsx";

interface IProp {
  onChange: (type: TypeBackground | string, color: string) => void;
}

export const SelectColorBg: FC<IProp> = ({ onChange }) => {
  return (
    <div className={style.select__color}>
      <span>Выбрать свой цвет</span>
      <InputSelectColor onChange={onChange} icon={<Pipette />} />
    </div>
  );
};
