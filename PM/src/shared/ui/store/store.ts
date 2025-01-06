import presentationReducer from "./reducer.ts";
import { createStore, Store } from "redux";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "../lib/localStorage.ts";
import { Presentation } from "../model/types.ts";

const preloadedState = loadStateFromLocalStorage();

export const store: Store<Presentation> = createStore(
  presentationReducer,
  preloadedState,
);
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
