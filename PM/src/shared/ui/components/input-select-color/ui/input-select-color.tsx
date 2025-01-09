import style from "./input-select-color.module.css";
import { ChangeEvent, FC, ReactNode } from "react";

interface IProps {
  onChange: (type: string, value: string) => void;
  icon?: ReactNode;
  description?: string;
}

export const InputSelectColor: FC<IProps> = ({
  onChange,
  icon,
  description,
}) => {
  return (
    <div className={style.select__item} title={description}>
      {icon}
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("color", e.target.value)
        }
        className={style.input__color}
        type="color"
      />
    </div>
  );
};
