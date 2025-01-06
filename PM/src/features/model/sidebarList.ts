import { IMenu } from "../../shared/ui/model/menu.ts";
import { IconImage } from "../../shared/ui/icons/image.tsx";
import { IconText } from "../../shared/ui/icons/text.tsx";
import { IconChangeColor } from "../../shared/ui/icons/change-color.tsx";
import { IconCopy } from "../../shared/ui/icons/copy.tsx";
import { IconRepeat } from "../../shared/ui/icons/repeat.tsx";
import { IconCancel } from "../../shared/ui/icons/cancel.tsx";
import { TypeButtonEnum } from "../../shared/ui/model/menu-item.ts";
import { IconDelete } from "../../shared/ui/icons/delete.tsx";
import { IconSearchImage } from "../../shared/ui/icons/search-image.tsx";

export const sidebarList: IMenu = {
  menuList: [
    {
      title: "Поиск картинки в интернете",
      icon: IconSearchImage,
      type: TypeButtonEnum.SearchImage,
    },
    {
      title: "Изображение",
      icon: IconImage,
      type: TypeButtonEnum.Image,
    },
    {
      title: "Текстовое поле",
      icon: IconText,
      type: TypeButtonEnum.Text,
    },
    {
      title: "Изменить фон",
      icon: IconChangeColor,
      type: TypeButtonEnum.Background,
    },
    {
      title: "Дублировать слайд",
      icon: IconCopy,
      type: TypeButtonEnum.DuplicateSlide,
    },
    {
      title: "Повторить",
      icon: IconRepeat,
      command: "Ctrl + Y",
      type: TypeButtonEnum.Redo,
    },
    {
      title: "Отменить",
      icon: IconCancel,
      command: "Ctrl + Z",
      type: TypeButtonEnum.Undo,
    },
    {
      title: "Удалить элемент",
      icon: IconDelete,
      type: TypeButtonEnum.Delete,
    },
  ],
};
