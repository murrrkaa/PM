import style from "./editing-background-menu.module.css";
import { IconPlus } from "../../../shared/ui/icons/plus.tsx";
import { Palette } from "../palette";
import { EditingSlide } from "../../../shared/ui/components/design-button";
import { IconChangeColor } from "../../../shared/ui/icons/change-color.tsx";
import { FC, useMemo, useRef } from "react";
import { AddImageBg } from "../../../entities/ui/components/add-image-bg";
import { IconDelete } from "../../../shared/ui/icons/delete.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/ui/store/store.ts";
import { SelectColorBg } from "../../../entities/ui/components/select-color-bg";
import { changeBackground } from "../../../shared/ui/store/actions.ts";
import {
  Background,
  Slide,
  TypeBackground,
} from "../../../shared/ui/model/types.ts";

interface IProps {
  closeMenu: () => void;
  activeMenu: string | null;
  slide: Slide;
}

export const EditingBackgroundMenu: FC<IProps> = ({
  closeMenu,
  activeMenu,
  slide,
}) => {
  const startBackground: Background = useMemo(
    () => slide.background ?? { type: "color", background: "#fff" },
    [slide.id, activeMenu],
  );
  const handleCloseMenu = () => {
    closeMenu();
    if (saveBg.current) {
      dispatch(
        changeBackground(selected, saveBg.current, startBackground, null),
      );
    }
  };

  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selectedSlide) ?? "";

  const saveBg = useRef<{
    type: TypeBackground;
    background: string;
  }>();

  const handleChangeBg = (
    type: TypeBackground | string,
    background: string,
  ) => {
    if (type === "image" || type === "color" || type === "gradient") {
      const newBackground: { type: TypeBackground; background: string } = {
        type,
        background,
      };
      saveBg.current = {
        type,
        background,
      };
      dispatch(
        changeBackground(selected, newBackground, startBackground, activeMenu),
      );
    }
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
