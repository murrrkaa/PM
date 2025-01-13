import style from "./header.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { EditingSlide } from "../../../shared/ui/components/design-button";
import { IconHome } from "../../../shared/ui/icons/home";
import { BurgerMenu } from "../../../features/ui/burger-menu/ui/components";
import { IconSave } from "../../../shared/ui/icons/save";
import { IconExport } from "../../../shared/ui/icons/export";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/ui/store/store";
import { changeTitle } from "../../../shared/ui/store/actions";
import { createPDF, saveDocument } from "../../model/exportDocument";
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "../../../shared/ui/lib/routes.ts";

export const Header = () => {
  const slides = useSelector((state: RootState) => state.slides);
  const title = useSelector((state: RootState) => state?.title);
  const [value, setValue] = useState(title);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleBlur = () => {
    dispatch(changeTitle(value));
  };

  const handleExportDocument = () => {
    const { pdf } = createPDF(slides, title);
    pdf.save(title);
    // navigate(ROUTES.PREVIEW_PRESENTATION, {
    //   state: { url },
    // });
  };

  const handleSaveDocument = () => {
    saveDocument(slides, title);
  };

  useEffect(() => {
    setValue(title);
  }, [title]);

  return (
    <header className={style.header}>
      <div className={style.header__wrapper}>
        <div className={style.header__top}>
          <EditingSlide icon={IconHome} description={"Главная"} />
          <BurgerMenu />
        </div>
        <div className={style.title__presentation}>
          <input
            onChange={handleChange}
            className={style.title__input}
            value={value}
            type="text"
            maxLength={100}
            onBlur={handleBlur}
          />
        </div>
        <div className={style.header__export}>
          <EditingSlide
            icon={IconSave}
            description={"Сохранить"}
            onClick={handleSaveDocument}
          />
          <EditingSlide
            icon={IconExport}
            description={"Экспорт"}
            onClick={handleExportDocument}
          />
        </div>
      </div>
    </header>
  );
};
