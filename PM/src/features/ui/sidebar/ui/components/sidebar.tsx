import style from "./sidebar.module.css";
import { sidebarList } from "../../../../model/sidebarList";
import { EditingSlide } from "../../../../../shared/ui/components/design-button";
import { useSidebarActions } from "../../../../hooks/useSidebarActions";
import {
  IMenuItem,
  TypeButtonEnum,
} from "../../../../../shared/ui/model/menu-item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../shared/ui/store/store";
import { useState } from "react";
import { SidebarDropdown } from "../../../../../entities/ui/components/sidebar-dropdown";
import { v4 as uuid } from "uuid";
import { redo, undo } from "../../../../../shared/ui/store/actions.ts";
import { InputImage } from "../../../../../shared/ui/components/input-image";
import { Image, Size } from "../../../../../shared/ui/model/types.ts";

export const Sidebar = () => {
  const selected =
    useSelector((state: RootState) => state?.selectedSlide) ?? "";
  const dispatch = useDispatch();
  const { handleAddContent, handleDeleteElements } = useSidebarActions();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleCloseMenu = () => {
    setActiveMenu(null);
  };

  const handleChangeImage = (image: string, size: Size) => {
    const newImage: Image = {
      type: "image",
      id: uuid(),
      image,
      alt: "image",
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: size.width,
        height: size.height,
      },
      selected: false,
    };
    handleAddContent(selected, newImage);
  };

  const handleClick = (item: IMenuItem) => {
    switch (item.type) {
      case TypeButtonEnum.Text:
        handleAddContent(selected, {
          type: "text",
          id: uuid(),
          position: {
            x: 100,
            y: 100,
          },
          size: {
            height: 50,
            width: 300,
          },
          fontSize: 24,
          font: "Arial",
          text: "",
          selected: false,
        });
        setActiveMenu(TypeButtonEnum.Text);
        break;
      case TypeButtonEnum.Delete:
        handleDeleteElements(selected);
        setActiveMenu(TypeButtonEnum.Delete);
        break;
      case TypeButtonEnum.Background:
        setActiveMenu(TypeButtonEnum.Background);
        break;
      case TypeButtonEnum.Undo:
        dispatch(undo());
        break;
      case TypeButtonEnum.Redo:
        dispatch(redo());
        break;
      default:
        setActiveMenu(null);
        break;
    }
  };

  return (
    <div className={style.sidebar}>
      {sidebarList.menuList.map((item) => (
        <div key={item.title} className={style.sidebar__item}>
          {item.type === TypeButtonEnum.Image ? (
            <InputImage onChange={handleChangeImage} />
          ) : (
            <EditingSlide
              icon={item.icon}
              description={item.title}
              onClick={() => handleClick(item)}
            />
          )}
        </div>
      ))}
      {activeMenu && (
        <SidebarDropdown closeMenu={handleCloseMenu} activeMenu={activeMenu} />
      )}
    </div>
  );
};
