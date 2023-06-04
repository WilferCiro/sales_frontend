import * as Yup from "yup";

interface FormFieldCommonSchema {
  name: string;
  label: string;
  type:
    | "text"
    | "select"
    | "textarea"
    | "email"
    | "number"
    | "password"
    | "checkbox"
    | "date"
    | "datetime"
    | "select_search";
  initialValue?: string | number | boolean;
  placeholder?: string;
  required?: boolean;
  validate?: Yup.NumberSchema<number | undefined, Yup.AnyObject, undefined, "">;
}
export type FormFieldSchema =
  | (FormFieldCommonSchema & {
      type: "text" | "textarea" | "email" | "password" | "checkbox";
    })
  | (FormFieldCommonSchema & {
      type: "select";
      service?: string;
      options?: { value: string; label: string }[];
    })
  | (FormFieldCommonSchema & {
    type: "select_search",
    endpoint: string;
  })
  | (FormFieldCommonSchema & {
      type: "number";
      min?: number;
      max?: number;
      decimals?: boolean;
    })
  | (FormFieldCommonSchema & {
      type: "date" | "datetime";
      showFuture?: boolean;
    });
