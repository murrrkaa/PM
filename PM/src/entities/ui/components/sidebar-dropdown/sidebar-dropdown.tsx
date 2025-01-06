import { FC } from "react";
import { TypeButtonEnum } from "../../../../shared/ui/model/menu-item.ts";
import { EditingBackgroundMenu } from "../../../../features/ui/editing-bg-menu";

interface IProp {
  activeMenu: string | null;
  closeMenu: () => void;
}

export const SidebarDropdown: FC<IProp> = ({ activeMenu, closeMenu }) => {
  switch (activeMenu) {
    case TypeButtonEnum.Background:
      return <EditingBackgroundMenu closeMenu={closeMenu} />;
    case TypeButtonEnum.Text:
      // <EditingTextMenu closeMenu={closeMenu} />
      return null;
    default:
      return null;
  }
};
