import { ButtonProps } from "../../model/button-types.ts";
import { FC } from "react";
import style from "./button.module.css";

export const Button: FC<ButtonProps> = ({
  icon,
  command,
  children,
  input = false,
  item,
  onChange,
  onClick,
}) => {
  return (
    <div className={style.button}>
      <div className={style.button__wrapper}>
        {icon && <div className={style.button__icon}>{icon({})}</div>}
        {input ? (
          <>
            <input
              type="file"
              className={style.button__input}
              onChange={(e) => onChange?.(e, item)}
            />
            <span className={style.input__title}>{children}</span>
          </>
        ) : (
          <button className={style.button__item} onClick={(e) => onClick?.(e)}>
            {children}
          </button>
        )}
      </div>
      {command && <span className={style.button__command}>{command}</span>}
    </div>
  );
};
