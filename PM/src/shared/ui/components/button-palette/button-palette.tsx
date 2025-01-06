import style from "./button-palette.module.css";
import { FC } from "react";

interface IProp {
  color: string;
  onClick: () => void;
}

export const ButtonPalette: FC<IProp> = ({ color, onClick }) => {
  return (
    <div className={style.button}>
      <button
        onClick={onClick}
        style={{
          backgroundColor: color,
        }}
        type="button"
        className={style.button__item}
      ></button>
    </div>
  );
};
