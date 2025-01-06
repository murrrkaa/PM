import { burgerMenu, TypeMenuButton } from "../../../../model/menu-list.ts";
import { Button } from "../../../../../shared/ui/components/button";
import style from "./burger-menu-content.module.css";
import { IMenuItem } from "../../../../../shared/ui/model/menu-item.ts";
import { useDispatch } from "react-redux";
import { importDocument } from "../../../../../widgets/model/importDocument.ts";
import { importPresentation } from "../../../../../shared/ui/store/actions.ts";
import { FC } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../shared/ui/lib/routes.ts";

interface IProp {
  setIsOpen?: (isOpen: boolean) => void;
}

export const BurgerMenuContent: FC<IProp> = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImportDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importDocument(file, (data) => {
        dispatch(importPresentation(data));
      });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: IMenuItem,
  ) => {
    switch (item.type) {
      case TypeMenuButton.OPEN_DOCUMENT:
        setIsOpen?.(false);
        handleImportDocument(event);
    }
  };
  const handleClick = (item: IMenuItem) => {
    switch (item.type) {
      case TypeMenuButton.SLIDESHOW: {
        return navigate(ROUTES.SLIDESHOW);
      }
    }
  };
  return (
    <div className={style.burger__menu}>
      {burgerMenu.menuList.map((item) => (
        <Button
          item={item}
          key={item.id}
          onClick={() => handleClick(item)}
          onChange={handleChange}
          icon={item.icon}
          command={item.command}
          input={item.id === "open"}
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
};
