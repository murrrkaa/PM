import style from "./editing-text-menu.module.css";
import { FC } from "react";
import { IconChangeColorText } from "../../../shared/ui/icons/change-color-text";
import { IconAddText } from "../../../shared/ui/icons/add-text";
import { EditingSlide } from "../../../shared/ui/components/design-button";
import { ChangeSizeFont } from "../../../entities/ui/components/change-size-font/ui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/ui/store/store.ts";
import { addContentToSlide } from "../../../shared/ui/store/actions.ts";
import { Text } from "../../../shared/ui/model/types.ts";
import { v4 as uuid } from "uuid";
import { InputSelectColor } from "../../../shared/ui/components/input-select-color/ui";
import { SelectFontMenu } from "../../../entities/ui/components/select-font-menu/ui";

interface IProp {
  closeMenu: () => void;
}

export const EditingTextMenu: FC<IProp> = ({ closeMenu }) => {
  const selected = useSelector((state: RootState) => state.selectedSlide) ?? "";
  const dispatch = useDispatch();

  const handleAddText = () => {
    const newText: Text = {
      type: "text",
      id: uuid(),
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: 200,
        height: 100,
      },
      fontSize: 24,
      font: "Arial",
      text: "",
      selected: true,
    };
    dispatch(addContentToSlide(selected, newText));
  };

  const handleChangeColor = () => {};
  return (
    <div className={style.menu}>
      <ChangeSizeFont />
      <div className={style.menu__btn}>
        <InputSelectColor
          icon={<IconChangeColorText />}
          description={"Изменить цвет"}
          onChange={handleChangeColor}
        />
        <EditingSlide
          icon={IconAddText}
          description={"Добавить текстовое поле"}
          onClick={handleAddText}
        />
        <SelectFontMenu />
      </div>
    </div>
  );
};
