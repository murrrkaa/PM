import {
  Text,
  Image,
  Background,
  Slide,
  Position,
  Presentation,
  Size,
} from "../model/types.ts";
import { Properties } from "../model/functions.ts";

export enum ActionEnum {
  CHANGE_NAME_PRESENTATION = "CHANGE_NAME_PRESENTATION",
  SET_DRAGGING_SLIDE = "SET_DRAGGING_SLIDE",
  ADD_SLIDE = "ADD_SLIDE",
  REMOVE_SLIDE = "REMOVE_SLIDE",
  SET_SELECTED_SLIDE = "SET_SELECTED_SLIDE",
  UPDATE_SLIDE_POSITION = "UPDATE_SLIDE_POSITION",
  CHANGE_BACKGROUND = "CHANGE_BACKGROUND",
  ADD_CONTENT_TO_SLIDE = "ADD_CONTENT_TO_SLIDE",
  SET_SELECTED_CONTENT = "SET_SELECTED_CONTENT",
  REMOVE_ELEMENT = "REMOVE_ELEMENT",
  UPDATE_ELEMENTS_POSITION = "UPDATE_ELEMENTS_POSITION",
  IMPORT_PRESENTATION = "IMPORT_PRESENTATION",
  UNDO = "UNDO",
  REDO = "REDO",
  COPY_SLIDE = "COPY_SLIDE",
  CHANGE_SIZE = "CHANGE_SIZE",
  CHANGE_TEXT = "CHANGE_TEXT",
  CHANGE_TEXT_PROPERTIES = "CHANGE_TEXT_PROPERTIES",
}

export const changeTitle = (title: string) => ({
  type: ActionEnum.CHANGE_NAME_PRESENTATION,
  payload: title,
});

export const setDraggingSlide = (slideId: string) => ({
  type: ActionEnum.SET_DRAGGING_SLIDE,
  payload: slideId,
});

export const changePositionElementOfSlide = (
  slideId: string,
  elementId: string,
  position: Position,
  isDragging: boolean,
) => ({
  type: ActionEnum.UPDATE_ELEMENTS_POSITION,
  payload: {
    slideId,
    elementId,
    position,
    isDragging,
  },
});

export const updateSlidesPositions = (slide: Slide, index: number | null) => ({
  type: ActionEnum.UPDATE_SLIDE_POSITION,
  payload: {
    slide,
    index,
  },
});

export const addSlide = () => ({
  type: ActionEnum.ADD_SLIDE,
});

export const removeSlide = (slideId: string) => ({
  type: ActionEnum.REMOVE_SLIDE,
  payload: slideId,
});

export const setSelectedSlide = (slideId: string) => ({
  type: ActionEnum.SET_SELECTED_SLIDE,
  payload: slideId,
});

export const changeBackground = (
  slideId: string,
  background: Background,
  activeMenu: string | null,
) => ({
  type: ActionEnum.CHANGE_BACKGROUND,
  payload: {
    id: slideId,
    value: background,
    activeMenu,
  },
});

export const addContentToSlide = (slideId: string, element: Text | Image) => ({
  type: ActionEnum.ADD_CONTENT_TO_SLIDE,
  payload: {
    id: slideId,
    value: element,
  },
});

export const setStateSelectedElements = (
  slideId: string,
  elementId: string,
) => ({
  type: ActionEnum.SET_SELECTED_CONTENT,
  payload: {
    slideId,
    elementId,
  },
});

export const removeElementFromSlide = (slideId: string) => ({
  type: ActionEnum.REMOVE_ELEMENT,
  payload: slideId,
});

export const importPresentation = (state: Presentation) => ({
  type: ActionEnum.IMPORT_PRESENTATION,
  payload: state,
});

export const undo = () => ({
  type: ActionEnum.UNDO,
});

export const redo = () => ({
  type: ActionEnum.REDO,
});

export const copySlide = (slideId: string) => ({
  type: ActionEnum.COPY_SLIDE,
  payload: slideId,
});

export const changeSize = (
  slideId: string,
  contentId: string,
  newSize: Size,
  isResize: boolean,
) => ({
  type: ActionEnum.CHANGE_SIZE,
  payload: {
    slideId,
    contentId,
    newSize,
    isResize,
  },
});

export const changeText = (
  slideId: string,
  contentId: string,
  value: string,
  property: Properties,
  isWriting: boolean,
) => ({
  type: ActionEnum.CHANGE_TEXT,
  payload: {
    slideId,
    contentId,
    value,
    property,
    isWriting,
  },
});

export const changeTextProperty = (
  slideId: string,
  property: Properties,
  newValue: string | number,
  activeMenu: boolean,
) => ({
  type: ActionEnum.CHANGE_TEXT_PROPERTIES,
  payload: {
    slideId,
    property,
    newValue,
    activeMenu,
  },
});

export interface Action {
  type: string;
  payload: any;
}
