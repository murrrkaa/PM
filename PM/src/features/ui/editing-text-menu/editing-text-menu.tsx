import style from "./editing-text-menu.module.css";
import { FC } from "react";

interface IProp {
  closeMenu: () => void;
}

export const EditingTextMenu: FC<IProp> = ({ closeMenu }) => {
  return (
    <div className={style.menu}>
      <div className={style.menu__wrapper}>rgdrgdr</div>
    </div>
  );
};
