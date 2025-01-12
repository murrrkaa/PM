import style from "./main.module.css";
import { SlidesPreviews } from "../../../widgets/ui/slides-list";
import { SlideShow } from "../../../features/ui/slide-show";
import { Sidebar } from "../../../features/ui/sidebar/ui/components";
import { SlideButton } from "../../../shared/ui/components/slideButton";
import { IconPlus } from "../../../shared/ui/icons/plus";
import { IconCopy } from "../../../shared/ui/icons/copy";
import { IconDelete } from "../../../shared/ui/icons/delete";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/ui/store/store";
import { useDispatch } from "react-redux";
import {
  addSlide,
  copySlide,
  setSelectedSlide,
} from "../../../shared/ui/store/actions.ts";
import { removeSlide } from "../../../shared/ui/store/actions.ts";
import { useEffect } from "react";

export const Main = () => {
  const slides = useSelector((state: RootState) => state?.slides);
  const selected = useSelector((state: RootState) => state?.selectedSlide);
  const slide = slides?.find((slide) => slide.id === selected);

  const dispatch = useDispatch();

  const addSlideHandler = () => {
    dispatch(addSlide());
  };

  const removeSlideHandler = (id: string) => {
    dispatch(removeSlide(id));
  };

  const backupSlideHandler = () => {
    if (selected) dispatch(copySlide(selected));
  };

  useEffect(() => {
    if (slides[0]?.id) dispatch(setSelectedSlide(slides[0].id));
  }, []);

  return (
    <main className={style.main}>
      <div
        className={style.main__wrapper}
        style={{
          justifyContent: !slides?.length ? "center" : "space-between",
        }}
      >
        <div className={style["main__slides-preview"]}>
          {slides?.length > 0 && (
            <SlideButton
              icon={IconPlus}
              description={"Добавить слайд"}
              onClick={addSlideHandler}
            >
              Добавить слайд
            </SlideButton>
          )}
          <SlidesPreviews />
        </div>
        <div className={style.slide__tools}>
          <div className={style["main__slide-show"]}>
            <SlideShow />
          </div>
          <div className={style.slide__buttons}>
            {slides?.length > 0 && (
              <SlideButton
                icon={IconCopy}
                description={"Дублировать слайд"}
                onClick={backupSlideHandler}
              >
                Дублировать слайд
              </SlideButton>
            )}
            {slides?.length ? (
              <SlideButton
                icon={IconDelete}
                description={"Удалить слайд"}
                onClick={() => removeSlideHandler(selected ?? "")}
              >
                Удалить слайд
              </SlideButton>
            ) : (
              <SlideButton
                icon={IconPlus}
                description={"Добавить слайд"}
                onClick={addSlideHandler}
              >
                Добавить слайд
              </SlideButton>
            )}
          </div>
        </div>
        {slide && <Sidebar slide={slide} />}
      </div>
    </main>
  );
};
