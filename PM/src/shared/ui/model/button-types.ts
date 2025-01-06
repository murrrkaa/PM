import { FC } from "react";
import { IIconProps } from "./icon.ts";
import { IMenuItem } from "./menu-item.ts";

export interface ButtonProps {
  children?: React.ReactNode;
  icon?: FC<IIconProps>;
  command?: string;
  input?: boolean;
  item: IMenuItem;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: IMenuItem,
  ) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
