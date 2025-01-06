import { IIconProps } from "./icon.ts";
import { FC } from "react";
import { TypeMenuButton } from "../../../entities/model/menu-list.ts";

export enum TypeButtonEnum {
  Image = "Image",
  Text = "Text",
  Background = "Background",
  DuplicateSlide = "DuplicateSlide",
  Undo = "Undo",
  Redo = "Redo",
  Delete = "Delete",
  SearchImage = "SearchImage",
}

export interface IMenuItem {
  icon: FC<IIconProps>;
  command?: string;
  title: string;
  type?: TypeButtonEnum | TypeMenuButton;
  id?: string;
}
