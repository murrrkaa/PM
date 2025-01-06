import { Presentation } from "../model/types.ts";

export const saveStateToLocalStorage = (state: Presentation) => {
  try {
    const statePresentation = JSON.stringify(state);
    localStorage.setItem("PresentationData", statePresentation);
  } catch (error) {
    console.log(error);
  }
};

export const loadStateFromLocalStorage = (): Presentation | undefined => {
  try {
    const statePresentation = localStorage.getItem("PresentationData");
    if (statePresentation === null) {
      return undefined;
    }
    return JSON.parse(statePresentation);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
