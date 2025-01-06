import style from "./editing-slide.module.css";
import { FC } from "react";
import { IIconProps } from "../../model/icon.ts";

interface IButtonProps {
  icon: FC<IIconProps>;
  title?: string;
  description: string;
  onClick?: () => void;
}

export const EditingSlide: FC<IButtonProps> = ({
  icon,
  title,
  description,
  onClick,
}) => {
  return (
    <>
      {icon && (
        <div
          title={description}
          className={style.button__wrapper}
          onClick={onClick}
        >
          <button className={style.button}> {icon({})}</button>
          {title && <span className={style.button__title}>{title}</span>}
        </div>
      )}
    </>
  );
};
