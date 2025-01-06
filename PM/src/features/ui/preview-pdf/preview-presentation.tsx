import { FC } from "react";
import style from "./preview-presentation.module.css";

interface IProps {
  url: string;
}

export const PreviewPresentation: FC<IProps> = ({ url }) => {
  return (
    <div className={style.preview__wrapper}>
      <iframe src={url} width="100%" height="100%" title="Презентация"></iframe>
    </div>
  );
};
