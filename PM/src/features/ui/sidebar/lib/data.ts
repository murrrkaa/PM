import { Background, Image, Text } from "../../../../shared/ui/model/types.ts";
import { v4 as uuid } from "uuid";
import { testImages } from "../../../../shared/ui/assets/images";

export const newText: Text = {
  type: "text",
  id: uuid(),
  position: {
    x: 100,
    y: 100,
  },
  size: 24,
  font: "Arial",
  text: "I am added Text!",
  selected: false,
};

export const newImage: Image = {
  type: "image",
  id: uuid(),
  image: testImages.testImage,
  alt: "image",
  position: {
    x: 400,
    y: 300,
  },
  size: {
    width: 300,
    height: 300,
  },
  selected: false,
};

export const newBackground: Background = {
  type: "color",
  background: "#d9c8ff",
};
