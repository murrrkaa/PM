import { FC } from "react";
import { TypeButtonEnum } from "../../../../shared/ui/model/menu-item";
import { EditingBackgroundMenu } from "../../../../features/ui/editing-bg-menu";
import { EditingTextMenu } from "../../../../features/ui/editing-text-menu";
import { Slide } from "../../../../shared/ui/model/types.ts";

interface IProps {
  activeMenu: string | null;
  closeMenu: () => void;
  slide: Slide;
}

export const SidebarDropdown: FC<IProps> = ({
  activeMenu,
  closeMenu,
  slide,
}) => {
  switch (activeMenu) {
    case TypeButtonEnum.Background:
      return (
        <EditingBackgroundMenu
          closeMenu={closeMenu}
          activeMenu={activeMenu}
          slide={slide}
        />
      );
    case TypeButtonEnum.Text:
      return <EditingTextMenu closeMenu={closeMenu} activeMenu={activeMenu} />;
    default:
      return null;
  }
};
