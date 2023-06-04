import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getSellClientFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "name",
      label: "Nombre",
      placeholder: "Nombre",
      required: false,
    },
    {
      type: "text",
      name: "document",
      label: "Documento",
      placeholder: "Ingrese un documento de identidad",
      required: false,
    },
    {
      type: "email",
      name: "email",
      label: "Correo electrónico",
      placeholder: "Ingrese un correo electrónico",
      required: false,
    },
  ];

  return fields;
};
