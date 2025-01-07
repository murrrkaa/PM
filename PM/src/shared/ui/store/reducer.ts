import { ActionEnum } from "./actions.ts";
import {
  addContentToSlide,
  addSlideToPresentation,
  backupSlide,
  changeBackgroundOfSlide,
  changeOfNamePresentation,
  changePositionElement,
  changePositionOfSlide,
  changeSelectedElement,
  removeContentFromSlide,
  removeSlideFromPresentation,
  setSelectedSlideOfPresentation,
  updateElementSize,
  updateSlideText,
  updateSlideTextProperties,
} from "../model/functions.ts";
import { Presentation } from "../model/types.ts";
import { Action } from "./actions.ts";

const initialState: Presentation = {
  slides: [],
  draggingSlide: "",
  undoStack: [],
  redoStack: [],
  title: "New Presentation",
};

const presentationReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionEnum.IMPORT_PRESENTATION:
      return action.payload;
    case ActionEnum.CHANGE_NAME_PRESENTATION:
      return changeOfNamePresentation(state, action.payload);
    case ActionEnum.SET_DRAGGING_SLIDE:
      return {
        ...state,
        draggingSlide: action.payload,
      };
    case ActionEnum.ADD_SLIDE: {
      return addSlideToPresentation(state);
    }
    case ActionEnum.REMOVE_SLIDE:
      return removeSlideFromPresentation(state, action.payload);
    case ActionEnum.SET_SELECTED_SLIDE:
      return setSelectedSlideOfPresentation(state, action.payload);
    case ActionEnum.UPDATE_SLIDE_POSITION: {
      const { slide, index } = action.payload;
      return changePositionOfSlide(state, slide, index);
    }
    case ActionEnum.CHANGE_BACKGROUND: {
      const { id, value, activeMenu } = action.payload;
      return changeBackgroundOfSlide(state, id, value, activeMenu);
    }
    case ActionEnum.ADD_CONTENT_TO_SLIDE: {
      const { id, value } = action.payload;
      return addContentToSlide(state, id, value);
    }
    case ActionEnum.SET_SELECTED_CONTENT: {
      const { slideId, elementId } = action.payload;
      return changeSelectedElement(state, slideId, elementId);
    }
    case ActionEnum.REMOVE_ELEMENT: {
      return removeContentFromSlide(state, action.payload);
    }
    case ActionEnum.UPDATE_ELEMENTS_POSITION: {
      const { slideId, elementId, position, isDragging } = action.payload;
      return changePositionElement(
        state,
        slideId,
        elementId,
        position,
        isDragging,
      );
    }
    case ActionEnum.UNDO: {
      if (!state.undoStack?.length) return state;
      const lastState = state.undoStack.at(-1);
      if (lastState)
        return {
          ...state,
          selectedSlide: lastState.selectedSlide,
          slides: lastState.slides,
          undoStack: state.undoStack.slice(0, -1),
          redoStack: [...(state.redoStack ?? []), state],
        };
      break;
    }
    case ActionEnum.REDO: {
      if (!state.redoStack?.length) return state;
      const lastState = state.redoStack.at(-1);
      if (lastState)
        return {
          ...state,
          selectedSlide: lastState.selectedSlide,
          slides: lastState.slides,
          undoStack: [...(state.undoStack ?? []), state],
          redoStack: state.redoStack.slice(0, -1),
        };
      break;
    }
    case ActionEnum.COPY_SLIDE: {
      return backupSlide(state, action.payload);
    }
    case ActionEnum.CHANGE_SIZE: {
      const { slideId, contentId, newSize, isResize } = action.payload;
      return updateElementSize(state, slideId, contentId, newSize, isResize);
    }
    case ActionEnum.CHANGE_TEXT: {
      const { slideId, contentId, value, property, isWriting } = action.payload;
      return updateSlideText(
        state,
        slideId,
        contentId,
        value,
        property,
        isWriting,
      );
    }
    case ActionEnum.CHANGE_TEXT_PROPERTIES: {
      const { slideId, property, newValue, activeMenu } = action.payload;
      return updateSlideTextProperties(
        state,
        slideId,
        property,
        newValue,
        activeMenu,
      );
    }
    default:
      return state;
  }
};
export default presentationReducer;
