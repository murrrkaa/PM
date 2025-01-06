import { IMenuItem } from "./menu-item.ts";
import { IconCreatePresentation } from "../icons/create-presentation.tsx";
import { IconOpen } from "../icons/open.tsx";
import { IconSave } from "../icons/save.tsx";
import { IconExport } from "../icons/export.tsx";
import { IconRepeat } from "../icons/repeat.tsx";
import { IconCancel } from "../icons/cancel.tsx";
import { IconCut } from "../icons/cut.tsx";
import { IconCopy } from "../icons/copy.tsx";
import { IconInsert } from "../icons/insert.tsx";
import { IconSelectAll } from "../icons/select-all.tsx";
import { IconDelete } from "../icons/delete.tsx";
import { IconImage } from "../icons/image.tsx";
import { IconText } from "../icons/text.tsx";
import { IconPlus } from "../icons/plus.tsx";
import { IconChangeColor } from "../icons/change-color.tsx";

export interface IMenu {
  id?: string;
  title?: string;
  menuList: IMenuItem[];
}

export const menuList: IMenu[] = [
  {
    id: "Файл",
    title: "Файл",
    menuList: [
      {
        title: "Создать",
        icon: IconCreatePresentation,
      },
      {
        title: "Открыть",
        icon: IconOpen,
        command: "Ctrl + O",
      },
      {
        title: "Сохранить",
        icon: IconSave,
      },
      {
        title: "Экспорт",
        icon: IconExport,
      },
    ],
  },
  {
    id: "Правка",
    title: "Правка",
    menuList: [
      {
        title: "Повторить",
        icon: IconRepeat,
        command: "Ctrl + Y",
      },
      {
        title: "Отменить",
        icon: IconCancel,
        command: "Ctrl + Z",
      },
      {
        title: "Вырезать",
        icon: IconCut,
        command: "Ctrl + X",
      },
      {
        title: "Копировать",
        icon: IconCopy,
        command: "Ctrl + C",
      },
      {
        title: "Вставить",
        icon: IconInsert,
        command: "Ctrl + V",
      },
      {
        title: "Выбрать всё",
        icon: IconSelectAll,
        command: "Ctrl + A",
      },
      {
        title: "Удалить",
        icon: IconDelete,
      },
    ],
  },
  {
    id: "Вставка",
    title: "Вставка",
    menuList: [
      {
        title: "Изображение",
        icon: IconImage,
      },
      {
        title: "Текстовое поле",
        icon: IconText,
      },
    ],
  },
  {
    id: "Слайд",
    title: "Слайд",
    menuList: [
      {
        title: "Новый слайд",
        icon: IconPlus,
        command: "Ctrl + M",
      },
      {
        title: "Дублировать слайд",
        icon: IconCopy,
      },
      {
        title: "Удалить слайд",
        icon: IconDelete,
      },
      {
        title: "Изменить фон",
        icon: IconChangeColor,
      },
    ],
  },
];
