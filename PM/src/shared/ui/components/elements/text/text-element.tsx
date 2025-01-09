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

  const currentValue = useRef(content.text);
  const isWriting = useRef(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    isWriting.current = true;
    dispatch(
      changeText(
        selected ?? "",
        content.id,
        e.target.value,
        "text",
        isWriting.current,
      ),
    );
    currentValue.current = e.target.value;
  };

  const handleBlur = () => {
    if (content.text !== currentValue.current) {
      dispatch(
        changeText(
          selected ?? "",
          content.id,
          currentValue.current,
          "text",
          isWriting.current,
        ),
      );
    }
    isWriting.current = true;
  };
  useEffect(() => {
    currentValue.current = content.text;
  }, [content.text]);

  useEffect(() => {
    if (!content.selected) {
      ref.current?.blur();
      isWriting.current = false;
    } else {
      ref.current?.focus();
      ref.current?.setSelectionRange(content.text.length, content.text.length);
      isWriting.current = true;
    }
  }, [content.selected]);
  return (
    <textarea
      placeholder={"Введите текст"}
      ref={ref}
      onChange={handleChange}
      onBlur={handleBlur}
      value={content.text}
      className={style.textarea}
      style={{
        fontFamily: content.font,
        fontSize: content.fontSize * previewScale,
        height: content.size.height * previewScale,
        width: content.size.width * previewScale,
        color: content.color,
      }}
    />
  );
};
