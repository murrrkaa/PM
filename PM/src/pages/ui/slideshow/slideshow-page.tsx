import { useSelector } from "react-redux";
import { RootState } from "../../../shared/ui/store/store.ts";
import { useEffect, useState } from "react";
import { SlideElement } from "../../../entities/ui/components/slide";
import { Slide } from "../../../shared/ui/model/types.ts";
import style from "./slideshow-page.module.css";

export const SlideshowPage = () => {
  const slides = useSelector((state: RootState) => state.slides);
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [currSlide, setCurrSlide] = useState<Slide>(slides[currIndex]);

  useEffect(() => {
    if (currIndex > slides.length - 1) {
      setCurrIndex(0);
      setCurrSlide(slides[0]);
      return;
    }
    if (currIndex < 0) {
      setCurrIndex(slides.length);
      setCurrSlide(slides[slides.length]);
      return;
    }
    setCurrSlide(slides[currIndex]);
  }, [currIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight": {
          setCurrIndex((prev) => prev + 1);
          break;
        }
        case "ArrowLeft": {
          setCurrIndex((prev) => prev - 1);
          break;
        }
        default: {
          break;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className={style.slideshow__slide}>
      <SlideElement
        slide={currSlide}
        scale={1.4}
        slideShow
        setCurrIndex={setCurrIndex}
        currIndex={currIndex}
      />
    </div>
  );
};
