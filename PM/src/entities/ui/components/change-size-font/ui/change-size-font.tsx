import style from "./change-size-font.module.css";
import { EditingSlide } from "../../../../../shared/ui/components/design-button";
import { IconMinus } from "../../../../../shared/ui/icons/minus.tsx";
import { IconPlus } from "../../../../../shared/ui/icons/plus.tsx";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../shared/ui/store/store.ts";
import { changeTextProperty } from "../../../../../shared/ui/store/actions.ts";

interface IProp {
  activeMenu: string | null;
}

export const ChangeSizeFont: FC<IProp> = ({ activeMenu }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selectedSlide);
  const saveFont = useRef<number | null>(null);

  const [value, setValue] = useState<number>(24);

  const handleClickDecrement = () => {
    setValue((prev) => {
      if (prev <= 6) return prev;
      dispatch(changeTextProperty(selected ?? "", "fontSize", prev - 1, true));
      saveFont.current = prev - 1;
      return prev - 1;
    });
  };
  const handleClickIncrement = () => {
    setValue((prev) => {
      if (prev >= 96) return prev;
      dispatch(changeTextProperty(selected ?? "", "fontSize", prev + 1, true));
      saveFont.current = prev - 1;
      return prev + 1;
    });
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    if (val >= 96 || isNaN(val)) return;
    setValue(val);
    saveFont.current = val;
    dispatch(changeTextProperty(selected ?? "", "fontSize", val, true));
  };

  useEffect(() => {
    if (activeMenu && saveFont.current)
      dispatch(
        changeTextProperty(selected ?? "", "fontSize", saveFont.current, false),
      );
  }, [activeMenu]);

  return (
    <div className={style.menu}>
      <div className={style.menu__wrapper}>
        <EditingSlide
          onClick={handleClickDecrement}
          icon={IconMinus}
          description={"Уменьшить размер шрифта"}
        />
        <input
          type="text"
          className={style.menu__input}
          value={value}
          onChange={handleChangeInput}
        />
        <EditingSlide
          icon={IconPlus}
          description={"Увеличить размер шрифта"}
          onClick={handleClickIncrement}
        />
      </div>
    </div>
  );
};
