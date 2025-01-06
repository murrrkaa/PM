import style from "./slide-button.module.css";
import { FC, ReactNode } from "react";
import { IIconProps } from "../../model/icon.ts";

interface IProps {
  icon: FC<IIconProps>;
  description: string;
  children: ReactNode;
  onClick?: () => void;
}

export const SlideButton: FC<IProps> = ({
  icon,
  description,
  children,
  onClick,
}) => {
  return (
    <div onClick={onClick} title={description} className={style.button}>
      {icon && icon({})}
      <button className={style.button__item}>{children}</button>
    </div>
  );
};
