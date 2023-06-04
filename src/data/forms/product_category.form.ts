import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getProductCategoryFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "name",
      label: "Título",
      placeholder: "Título del producto",
      required: true,
    },
    {
      type: "checkbox",
      name: "active",
      label: "¿Es activo?",
      initialValue: true,
    },
  ];

  return fields;
};
