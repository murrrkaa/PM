import { Presentation } from "../../shared/ui/model/types.ts";
import { presentationSchema } from "../../shared/ui/lib/ajvScheme.ts";
import Ajv from "ajv";

export const importDocument = (
  file: File,
  onLoad: (data: Presentation) => void,
) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const dataText = event.target?.result;
      if (typeof dataText === "string") {
        const data = JSON.parse(dataText);
        const ajv = new Ajv();
        const validate = ajv.compile(presentationSchema);
        const isValid = validate(data);
        if (isValid) {
          onLoad(data as Presentation);
        } else {
          console.log("Невалидные данные");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  reader.readAsText(file);
};
