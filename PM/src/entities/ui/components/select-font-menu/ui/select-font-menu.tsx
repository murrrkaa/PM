import style from "./select-font-menu.module.css";
import { fonts } from "../model/fonts.ts";
import { Properties } from "../../../../../shared/ui/model/functions.ts";
import { FC, useState } from "react";

interface IProp {
  onChange: (property: Properties | string, value: string | number) => void;
}

export const SelectFontMenu: FC<IProp> = ({ onChange }) => {
  const [value, setValue] = useState<string>("Times New Roman, serif");
  return (
    <div className={style.menu}>
      <div className={style.menu__wrapper}>
        <select
          className={style.menu__select}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange("font", e.target.value);
          }}
        >
          {fonts.map((font) => (
            <option key={font.name} value={font.value}>
              {font.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
