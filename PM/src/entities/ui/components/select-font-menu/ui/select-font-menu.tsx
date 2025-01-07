import style from "./select-font-menu.module.css";

export const SelectFontMenu = () => {
  return (
    <div className={style.menu}>
      <div className={style.menu__wrapper}>
        <select className={style.menu__select}>
          <option>Arial</option>
          <option>Arial</option>
          <option>Arial</option>
        </select>
      </div>
    </div>
  );
};
