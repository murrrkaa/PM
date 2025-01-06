import { ChangeEvent, FC, useEffect, useRef } from "react";
import { Text } from "../../../model/types.ts";
import { useDispatch, useSelector } from "react-redux";
import { changeText } from "../../../store/actions.ts";
import { RootState } from "../../../store/store.ts";
import style from "./text-element.module.css";

interface IProps {
  content: Text;
  previewScale: number;
}

export const TextElement: FC<IProps> = ({ content, previewScale }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLTextAreaElement>(null);
  const selected = useSelector((state: RootState) => state.selectedSlide);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeText(selected ?? "", content.id, e.target.value, "text"));
  };
  const handleClick = () => {
    ref.current?.focus();
    ref.current?.setSelectionRange(content.text.length, content.text.length);
  };

  useEffect(() => {
    if (!content.selected) {
      ref.current?.blur();
    }
  }, [content.selected]);
  return (
    <textarea
      ref={ref}
      onClick={handleClick}
      onChange={handleChange}
      value={content.text}
      className={style.textarea}
      style={{
        font: content.font,
        fontSize: content.fontSize * previewScale,
        height: content.size.height * previewScale,
        width: content.size.width * previewScale,
      }}
    />
  );
};
