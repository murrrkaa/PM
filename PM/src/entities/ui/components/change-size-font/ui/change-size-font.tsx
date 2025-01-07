import style from "./change-size-font.module.css";
import { EditingSlide } from "../../../../../shared/ui/components/design-button";
import { IconMinus } from "../../../../../shared/ui/icons/minus.tsx";
import { IconPlus } from "../../../../../shared/ui/icons/plus.tsx";
import { useState } from "react";

export const ChangeSizeFont = () => {
  const [value, setValue] = useState(6);
  return (
    <div className={style.menu}>
      <div className={style.menu__wrapper}>
        <EditingSlide
          icon={IconMinus}
          description={"Уменьшить размер шрифта"}
        />
        <input type="number" className={style.menu__input} value={value} />
        <EditingSlide icon={IconPlus} description={"Увеличить размер шрифта"} />
      </div>
    </div>
  );
};
