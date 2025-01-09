import style from "./change-size-font.module.css";
import { EditingSlide } from "../../../../../shared/ui/components/design-button";
import { IconMinus } from "../../../../../shared/ui/icons/minus.tsx";
import { IconPlus } from "../../../../../shared/ui/icons/plus.tsx";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Properties } from "../../../../../shared/ui/model/functions.ts";

interface IProp {
  onChange: (property: Properties | string, value: string | number) => void;
}

export const ChangeSizeFont: FC<IProp> = ({ onChange }) => {
  const [value, setValue] = useState<number | null>(null);

  const handleClickDecrement = () => {
    setValue((prev) => {
      if (!prev || prev <= 6) return prev;
      return prev - 1;
    });
  };
  const handleClickIncrement = () => {
    setValue((prev) => {
      if (!prev) return 6;
      if (prev >= 96) return prev;
      return prev + 1;
    });
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    if (val > 96 || isNaN(val)) return;
    setValue(val);
  };

  useEffect(() => {
    if (value) {
      onChange("fontSize", value);
    }
  }, [value]);

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
          value={value ?? ""}
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
