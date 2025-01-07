import style from "./change-size-font.module.css";
import { EditingSlide } from "../../../../../shared/ui/components/design-button";
import { IconMinus } from "../../../../../shared/ui/icons/minus.tsx";
import { IconPlus } from "../../../../../shared/ui/icons/plus.tsx";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../shared/ui/store/store.ts";

export const ChangeSizeFont = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selectedSlide);

  const [value, setValue] = useState(24);
  const handleClickDecrement = () => {
    setValue((prev) => {
      if (prev === 6) return prev;
      return prev - 1;
    });
  };
  const handleClickIncrement = () => {
    setValue((prev) => {
      if (prev === 96) return prev;
      return prev + 1;
    });
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    if (val >= 6 && val <= 96) {
      setValue(val);
      dispatch();
    }
  };
  return (
    <div className={style.menu}>
      <div className={style.menu__wrapper}>
        <EditingSlide
          onClick={handleClickDecrement}
          icon={IconMinus}
          description={"Уменьшить размер шрифта"}
        />
        <input
          type="number"
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
