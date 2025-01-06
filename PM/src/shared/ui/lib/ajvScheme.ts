export const presentationSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    slides: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          title: {
            $ref: "#/definitions/Text",
          },
          content: {
            type: "array",
            items: {
              oneOf: [
                { $ref: "#/definitions/Text" },
                { $ref: "#/definitions/Image" },
              ],
            },
          },
          background: {
            $ref: "#/definitions/Background",
          },
          selectedElements: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["id", "content"],
        additionalProperties: false,
      },
    },
    selectedSlide: {
      type: "string",
    },
    draggingSlide: {
      type: "string",
    },
  },
  required: ["slides"],
  additionalProperties: false,
  definitions: {
    Position: {
      type: "object",
      properties: {
        x: { type: "number" },
        y: { type: "number" },
      },
      required: ["x", "y"],
      additionalProperties: false,
    },
    Size: {
      type: "object",
      properties: {
        width: { type: "number" },
        height: { type: "number" },
      },
      required: ["width", "height"],
      additionalProperties: false,
    },
    Text: {
      type: "object",
      properties: {
        type: { const: "text" },
        id: { type: "string" },
        position: { $ref: "#/definitions/Position" },
        size: { type: "number" },
        font: { type: "string" },
        text: { type: "string" },
        selected: { type: "boolean" },
      },
      required: ["type", "id", "position", "size", "font", "text", "selected"],
      additionalProperties: false,
    },
    Image: {
      type: "object",
      properties: {
        type: { const: "image" },
        id: { type: "string" },
        image: { type: "string" },
        alt: { type: "string" },
        position: { $ref: "#/definitions/Position" },
        size: { $ref: "#/definitions/Size" },
        selected: { type: "boolean" },
      },
      required: ["type", "id", "image", "alt", "position", "size", "selected"],
      additionalProperties: false,
    },
    Background: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["image", "color", "gradient"],
        },
        background: { type: "string" },
      },
      required: ["type", "background"],
      additionalProperties: false,
    },
  },
};
