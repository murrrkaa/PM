import style from "./select-font-menu.module.css";
import { fonts } from "../model/fonts.ts";

export const SelectFontMenu = () => {
  return (
    <div className={style.menu}>
      <div className={style.menu__wrapper}>
        <select className={style.menu__select}>
          {fonts.map((font) => (
            <option>{font.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
