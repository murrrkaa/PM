export type Position = {
  x: number;
  y: number;
};

export interface IUndoRedoStack {
  selectedSlide?: string;
  slides?: Slide[];
  title: string;
}

export type Presentation = {
  title: string;
  slides: Slide[];
  selectedSlide?: string;
  draggingSlide?: string;
  undoStack?: IUndoRedoStack[];
  redoStack?: IUndoRedoStack[];
};

export type Slide = {
  readonly id: string;
  title?: Text;
  content: (Text | Image)[];
  background?: Background;
  selectedElements?: string[];
};

export type Size = {
  width: number;
  height: number;
};

export type Text = {
  type: "text";
  readonly id: string;
  position: Position;
  size: Size;
  fontSize: number;
  font: string;
  text: string;
  color: string;
  selected: boolean;
};

export type Image = {
  type: "image";
  readonly id: string;
  image: string;
  alt: string;
  position: Position;
  size: Size;
  selected: boolean;
};

export type TypeBackground = "image" | "color" | "gradient";

export type Background = {
  type: TypeBackground;
  background: string;
};
