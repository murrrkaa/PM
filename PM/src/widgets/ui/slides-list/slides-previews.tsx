import style from "./slides-previews.module.css";
import { SlidePreview } from "../../../features/ui/slide-preview";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/ui/store/store.ts";
import { useRef, useState } from "react";

export interface IIndicator {
  indicator: HTMLDivElement | null;
  index: number;
}

export const SlidesPreviews = () => {
  const slides = useSelector((state: RootState) => state?.slides);
  const [indicators, setIndicators] = useState<(IIndicator | null)[]>([]);
  const [activeIndicator, setActiveIndicator] = useState<IIndicator | null>(
    null,
  );

  const scrollSlideWrapper = useRef<HTMLDivElement | null>(null);

  return (
    <div className={style.slides}>
      <div ref={scrollSlideWrapper} className={style.slides__wrapper}>
        {slides?.map((slide, index) => (
          <SlidePreview
            key={index}
            number={index + 1}
            slide={slide}
            slideId={slide.id}
            lastSlide={slide === slides.at(-1)}
            indicators={indicators}
            setIndicators={setIndicators}
            activeIndicator={activeIndicator}
            setActiveIndicator={setActiveIndicator}
            scrollSlideWrapper={scrollSlideWrapper}
          />
        ))}
      </div>
    </div>
  );
};
