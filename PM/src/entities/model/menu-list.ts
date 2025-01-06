import { IMenu } from "../../shared/ui/model/menu.ts";
import { IconOpen } from "../../shared/ui/icons/open.tsx";
import { IconCreatePresentation } from "../../shared/ui/icons/create-presentation.tsx";
import { IconCut } from "../../shared/ui/icons/cut.tsx";
import { IconCopy } from "../../shared/ui/icons/copy.tsx";
import { IconInsert } from "../../shared/ui/icons/insert.tsx";
import { IconSelectAll } from "../../shared/ui/icons/select-all.tsx";
import { IconDelete } from "../../shared/ui/icons/delete.tsx";
import { IconImage } from "../../shared/ui/icons/image.tsx";

export enum TypeMenuButton {
  CREATE_DOCUMENT = "CREATE_DOCUMENT",
  OPEN_DOCUMENT = "OPEN_DOCUMENT",
  CUT = "CUT",
  COPY = "COPY",
  INSERT = "INSERT",
  SELECT_ALL = "SELECT_ALL",
  DELETE_PRESENTATION = "DELETE_PRESENTATION",
  SLIDESHOW = "SLIDESHOW",
}

export const burgerMenu: IMenu = {
  id: "Файл",
  title: "Файл",
  menuList: [
    {
      id: "create",
      title: "Создать",
      icon: IconCreatePresentation,
      type: TypeMenuButton.CREATE_DOCUMENT,
    },
    {
      id: "open",
      title: "Открыть",
      icon: IconOpen,
      command: "Ctrl + O",
      type: TypeMenuButton.OPEN_DOCUMENT,
    },
    {
      id: "cut",
      title: "Вырезать",
      icon: IconCut,
      command: "Ctrl + X",
      type: TypeMenuButton.CUT,
    },
    {
      id: "copy",
      title: "Копировать",
      icon: IconCopy,
      command: "Ctrl + C",
      type: TypeMenuButton.COPY,
    },
    {
      id: "insert",
      title: "Вставить",
      icon: IconInsert,
      command: "Ctrl + V",
      type: TypeMenuButton.INSERT,
    },
    {
      id: "selectAll",
      title: "Выбрать всё",
      icon: IconSelectAll,
      command: "Ctrl + A",
      type: TypeMenuButton.SELECT_ALL,
    },
    {
      id: "slideshow",
      title: "Слайд-шоу",
      icon: IconImage,
      type: TypeMenuButton.SLIDESHOW,
    },
    {
      id: "deletePresentation",
      title: "Удалить презентацию",
      icon: IconDelete,
      type: TypeMenuButton.DELETE_PRESENTATION,
    },
  ],
};
