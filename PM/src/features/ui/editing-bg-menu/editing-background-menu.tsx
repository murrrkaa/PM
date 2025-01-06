import style from "./editing-background-menu.module.css";
import { IconPlus } from "../../../shared/ui/icons/plus.tsx";
import { Palette } from "../palette";
import { EditingSlide } from "../../../shared/ui/components/design-button";
import { IconChangeColor } from "../../../shared/ui/icons/change-color.tsx";
import { FC } from "react";
import { AddImageBg } from "../../../entities/ui/components/add-image-bg";
import { IconDelete } from "../../../shared/ui/icons/delete.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/ui/store/store.ts";
import { SelectColorBg } from "../../../entities/ui/components/select-color-bg";
import { changeBackground } from "../../../shared/ui/store/actions.ts";
import { TypeBackground } from "../../../shared/ui/model/types.ts";

interface IProp {
  closeMenu: () => void;
}

export const EditingBackgroundMenu: FC<IProp> = ({ closeMenu }) => {
  const handleCloseMenu = () => {
    closeMenu();
  };

  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selectedSlide) ?? "";

  const handleChangeBg = (type: TypeBackground, background: string) => {
    const newBackground = {
      type,
      background,
    };
    dispatch(changeBackground(selected, newBackground));
  };

  return (
    <div className={style.menu}>
      <div className={style.menu__wrapper}>
        <div className={style.menu__colors}>
          <IconChangeColor />
          <span>Цвета по умолчанию</span>
        </div>
        <div className={style.menu__close}>
          <EditingSlide
            icon={IconPlus}
            description={"Закрыть меню"}
            onClick={handleCloseMenu}
          />
        </div>
      </div>
      <Palette onChange={handleChangeBg} />
      <AddImageBg onChange={handleChangeBg} />
      <SelectColorBg onChange={handleChangeBg} />
      <div
        onClick={() => handleChangeBg("color", "#fff")}
        title="Удалить фон"
        className={style.menu__delete_bg}
      >
        <IconDelete />
      </div>
    </div>
  );
};