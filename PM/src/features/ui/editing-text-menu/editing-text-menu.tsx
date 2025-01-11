import style from "./editing-text-menu.module.css";
import { FC, useRef } from "react";
import { IconChangeColorText } from "../../../shared/ui/icons/change-color-text";
import { IconAddText } from "../../../shared/ui/icons/add-text";
import { EditingSlide } from "../../../shared/ui/components/design-button";
import { ChangeSizeFont } from "../../../entities/ui/components/change-size-font/ui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/ui/store/store.ts";
import {
  addContentToSlide,
  changeTextProperty,
  saveTextProperties,
} from "../../../shared/ui/store/actions.ts";
import { Text } from "../../../shared/ui/model/types.ts";
import { v4 as uuid } from "uuid";
import { InputSelectColor } from "../../../shared/ui/components/input-select-color/ui";
import { SelectFontMenu } from "../../../entities/ui/components/select-font-menu/ui";
import { IconPlus } from "../../../shared/ui/icons/plus.tsx";
import { Properties } from "../../../shared/ui/model/functions.ts";

interface IProps {
  closeMenu: () => void;
  activeMenu: string | null;
}

export const EditingTextMenu: FC<IProps> = ({ closeMenu, activeMenu }) => {
  const selected = useSelector((state: RootState) => state.selectedSlide) ?? "";
  const dispatch = useDispatch();

  const saveFontSize = useRef<number | null>(null);
  const saveColor = useRef<string | null>(null);
  const saveFont = useRef<string | null>(null);

  const handleAddText = () => {
    const newText: Text = {
      type: "text",
      id: uuid(),
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: 210,
        height: 30,
      },
      color: "000",
      fontSize: 24,
      font: "Arial",
      text: "",
      selected: false,
    };
    dispatch(addContentToSlide(selected, newText));
    closeMenu();
  };

  const handleChangePropertyValue = (
    property: Properties | string,
    newValue: string | number,
  ) => {
    if (property === "color" && typeof newValue === "string")
      saveColor.current = newValue;
    if (property === "fontSize" && typeof newValue === "number")
      saveFontSize.current = newValue;
    if (property === "font" && typeof newValue === "string")
      saveFont.current = newValue;
    if (
      property === "color" ||
      property === "fontSize" ||
      property === "font"
    ) {
      dispatch(changeTextProperty(selected, property, newValue, !!activeMenu));
    }
  };

  const handleSaveData = () => {
    const data = {
      color: saveColor.current,
      fontSize: saveFontSize.current,
      font: saveFont.current,
    };
    dispatch(saveTextProperties(selected, data));
  };

  const handleCloseMenu = () => {
    handleSaveData();
    saveColor.current = null;
    saveFontSize.current = null;
    saveFont.current = null;
    closeMenu();
  };

  return (
    <div className={style.menu}>
      <div className={style.menu__top}>
        <ChangeSizeFont onChange={handleChangePropertyValue} />
        <div className={style.menu__close}>
          <EditingSlide
            icon={IconPlus}
            description={"Закрыть меню"}
            onClick={handleCloseMenu}
          />
        </div>
      </div>
      <div className={style.menu__btn}>
        <InputSelectColor
          icon={<IconChangeColorText />}
          description={"Изменить цвет"}
          onChange={handleChangePropertyValue}
        />
        <EditingSlide
          icon={IconAddText}
          description={"Добавить текстовое поле"}
          onClick={handleAddText}
        />
        <SelectFontMenu onChange={handleChangePropertyValue} />
      </div>
    </div>
  );
};
