import style from "./dropdown-trigger.module.css";
import { FC } from "react";

interface IProps {
  title: string;
  onMouseEnter: () => void;
}

export const DropdownTrigger: FC<IProps> = ({ title, onMouseEnter }) => {
  return (
    <div onMouseEnter={onMouseEnter} className={style.menu__title}>
      {title}
    </div>
  );
};
