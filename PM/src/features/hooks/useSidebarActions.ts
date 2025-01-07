import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Background, Image, Text } from "../../shared/ui/model/types.ts";
import {
  addContentToSlide,
  removeElementFromSlide,
  changeBackground,
} from "../../shared/ui/store/actions.ts";

export const useSidebarActions = () => {
  const dispatch = useDispatch();

  const handleAddContent = useCallback(
    (slideId: string, newContent: Text | Image) => {
      dispatch(addContentToSlide(slideId, newContent));
    },
    [],
  );

  const handleChangeBackground = useCallback(
    (slideId: string, newBackground: Background) => {
      dispatch(changeBackground(slideId, newBackground, null));
    },
    [],
  );

  const handleDeleteElements = useCallback((slideId: string) => {
    dispatch(removeElementFromSlide(slideId));
  }, []);

  return { handleAddContent, handleChangeBackground, handleDeleteElements };
};
