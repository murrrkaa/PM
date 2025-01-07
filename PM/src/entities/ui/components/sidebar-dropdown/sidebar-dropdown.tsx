import { FC } from "react";
import { TypeButtonEnum } from "../../../../shared/ui/model/menu-item";
import { EditingBackgroundMenu } from "../../../../features/ui/editing-bg-menu";
import { EditingTextMenu } from "../../../../features/ui/editing-text-menu";

interface IProp {
  activeMenu: string | null;
  closeMenu: () => void;
}

export const SidebarDropdown: FC<IProp> = ({ activeMenu, closeMenu }) => {
  switch (activeMenu) {
    case TypeButtonEnum.Background:
      return (
        <EditingBackgroundMenu closeMenu={closeMenu} activeMenu={activeMenu} />
      );
    case TypeButtonEnum.Text:
      return <EditingTextMenu closeMenu={closeMenu} />;
    default:
      return null;
  }
};
