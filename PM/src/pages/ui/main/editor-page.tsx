import { Header } from "../../../widgets/ui/header";
import { Main } from "./main.tsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { redo, undo } from "../../../shared/ui/store/actions.ts";

export const EditorPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        dispatch(undo());
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        dispatch(redo());
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  });
  return (
    <>
      <Header />
      <Main />
    </>
  );
};
