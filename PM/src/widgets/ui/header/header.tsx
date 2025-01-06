import style from "./header.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";
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
  const presentation = useSelector((state: RootState) => state);
  const title = useSelector((state: RootState) => state?.title);

  // const navigate = useNavigate();

  const [value, setValue] = useState<string>(title);

  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(changeTitle(e.target.value));
    setValue(e.target.value);
  };

  const handleExportDocument = () => {
    const { pdf } = createPDF(presentation);
    pdf.save(presentation.title);
    // navigate(ROUTES.PREVIEW_PRESENTATION, {
    //   state: { url },
    // });
  };

  const handleSaveDocument = () => {
    saveDocument(presentation);
  };

  return (
    <header className={style.header}>
      <div className={style.header__wrapper}>
        <div className={style.header__top}>
          <EditingSlide icon={IconHome} description={"Главня"} />
          <BurgerMenu />
        </div>
        <div className={style.title__presentation}>
          <input
            onChange={handleChange}
            className={style.title__input}
            value={value}
            type="text"
            maxLength={100}
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
