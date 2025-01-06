import style from "./slide.module.css";
import { Slide } from "../../../../shared/ui/model/types.ts";
import { FC } from "react";
import { ContentWrapper } from "../../../../shared/ui/components/elements/content-wrapper/content-wrapper.tsx";
import { TextElement } from "../../../../shared/ui/components/elements/text/text-element.tsx";
import { ImageElement } from "../../../../shared/ui/components/elements/image/image-element.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../../shared/ui/store/store.ts";
import { IconArrowRight } from "../../../../shared/ui/icons/arrow-right.tsx";
import { IconArrowLeft } from "../../../../shared/ui/icons/arrow-left.tsx";
import { EditingSlide } from "../../../../shared/ui/components/design-button";
import { IconCancel } from "../../../../shared/ui/icons/cancel.tsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../shared/ui/lib/routes.ts";

interface IProp {
  slide: Slide;
  scale?: number;
  preview?: boolean;
  slideShow?: boolean;
  setCurrIndex?: (index: number) => void;
  currIndex?: number;
}

export const SlideElement: FC<IProp> = ({
  slide,
  scale,
  preview,
  slideShow,
  setCurrIndex,
  currIndex,
}) => {
  const previewScale = scale ? scale : 1;
  const currentSlide = useSelector((state: RootState) =>
    state.slides.find((item) => item.id === slide?.id),
  );
  const index = currIndex ?? 0;
  const navigate = useNavigate();
  return (
    <div
      className={style.slide}
      style={{
        backgroundColor:
          currentSlide?.background?.type === "color"
            ? currentSlide.background.background
            : "#fff",
        backgroundImage:
          currentSlide?.background?.type === "image"
            ? `url(${currentSlide.background.background})`
            : "",
        backgroundSize:
          currentSlide?.background?.type === "image" ? "cover" : "",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {slideShow && (
        <div className={style.slideshow__cancel}>
          <EditingSlide
            icon={IconCancel}
            description={"Завершить показ"}
            onClick={() => navigate(ROUTES.EDITOR)}
          />
        </div>
      )}
      {slideShow && (
        <div className={style.slideshow__btns}>
          <button
            className={style.slideshow__btn}
            onClick={() => setCurrIndex?.(index - 1)}
          >
            <IconArrowLeft />
          </button>
          <button
            className={style.slideshow__btn}
            onClick={() => setCurrIndex?.(index + 1)}
          >
            <IconArrowRight />
          </button>
        </div>
      )}
      <div className={style.slide__wrapper}>
        {currentSlide?.content?.map((content) => {
          return (
            <ContentWrapper
              key={content.id}
              slide={currentSlide}
              content={content}
              previewScale={previewScale}
              preview={preview ?? false}
              slideShow={slideShow}
            >
              {content.type === "text" ? (
                <TextElement content={content} previewScale={previewScale} />
              ) : (
                <ImageElement content={content} previewScale={previewScale} />
              )}
            </ContentWrapper>
          );
        })}
      </div>
    </div>
  );
};
