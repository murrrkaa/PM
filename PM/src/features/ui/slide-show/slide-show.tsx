import { SlideElement } from "../../../entities/ui/components/slide";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/ui/store/store.ts";

export const SlideShow = () => {
  const selected = useSelector((state: RootState) => state?.selectedSlide);
  const slides = useSelector((state: RootState) => state?.slides);
  const slide = slides?.find((slide) => slide.id === selected);

  return slide && <SlideElement slide={slide} />;
};
