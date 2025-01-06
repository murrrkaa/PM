export interface IResizeHandle {
  corner: string;
  cursor: string;
  style?: Record<string, string>;
}

export const resizeHandles: IResizeHandle[] = [
  {
    corner: "top-left",
    cursor: "nwse-resize",
    style: {
      top: "0px",
      left: "0px",
    },
  },
  {
    corner: "top-middle",
    cursor: "ns-resize",
    style: {
      top: "0px",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  {
    corner: "top-right",
    cursor: "nesw-resize",
    style: {
      top: "0px",
      right: "0px",
    },
  },
  {
    corner: "bottom-left",
    cursor: "nesw-resize",
    style: {
      bottom: "0px",
      left: "0px",
    },
  },
  {
    corner: "bottom-right",
    cursor: "nwse-resize",
    style: {
      bottom: "0px",
      right: "0px",
    },
  },
  {
    corner: "bottom-middle",
    cursor: "ns-resize",
    style: {
      bottom: "0px",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  {
    corner: "side-left",
    cursor: "ew-resize",
    style: {
      top: "50%",
      left: "0px",
      transform: "translateY(-50%)",
    },
  },
  {
    corner: "side-right",
    cursor: "ew-resize",
    style: {
      top: "50%",
      right: "0px",
      transform: "translateY(-50%)",
    },
  },
];
