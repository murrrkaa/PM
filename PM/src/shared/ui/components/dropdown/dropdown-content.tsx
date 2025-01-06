import style from "./dropdown-content.module.css";
import { IMenuItem } from "../../model/menu-item.ts";
import { FC } from "react";
import { Button } from "../button";

interface IProps {
  content: IMenuItem[];
  onMouseLeave: () => void;
}

export const DropdownContent: FC<IProps> = ({ content, onMouseLeave }) => {
  return (
    <div className={style.menu__content} onMouseLeave={onMouseLeave}>
      {content.map((item) => (
        <Button icon={item.icon} command={item.command}>
          {item.title}
        </Button>
      ))}
    </div>
  );
};
