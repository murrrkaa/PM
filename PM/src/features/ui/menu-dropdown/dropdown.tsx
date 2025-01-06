import style from "./dropdown.module.css";
import {
  DropdownContent,
  DropdownTrigger,
} from "../../../shared/ui/components/dropdown";
import { useState } from "react";
import { menuList } from "../../../shared/ui/model/menu.ts";
import { Presentation1 } from "../../../shared/ui/model/testFc/check.ts";

export const Dropdown = () => {
  const firstSlide = Presentation1.slides[0];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(
    !firstSlide ? "" : firstSlide.id,
  );
  return (
    <div className={style.menu}>
      <div className={style.menu__wrapper}>
        <div className={style.menu__titles}>
          {menuList.map((menu) => (
            <DropdownTrigger
              key={menu.id}
              title={menu.title}
              onMouseEnter={() => {
                setIsOpen(true);
                setSelected(menu.title);
              }}
            />
          ))}
        </div>
        <div className={style.menu__content}>
          {isOpen &&
            menuList.map(
              (menu) =>
                selected === menu.title && (
                  <DropdownContent
                    onMouseLeave={() => {
                      setIsOpen(false);
                    }}
                    content={menu.menuList}
                  />
                ),
            )}
        </div>
      </div>
    </div>
  );
};
