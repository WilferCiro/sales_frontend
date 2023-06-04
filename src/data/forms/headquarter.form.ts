import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getHeadquarterFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "name",
      label: "Nombre",
      placeholder: "Nombre",
      required: true,
    },
    {
      type: "text",
      name: "address",
      label: "Dirección",
      placeholder: "Cr. X # XX-X",
      required: true,
    },
    {
      type: "select_search",
      name: "city",
      label: "Ciudad",
      placeholder: "Selecione la ciudad",
      required: true,
      endpoint: "cities/select",
    },
    {
      type: "select_search",
      name: "shop",
      label: "Tienda",
      placeholder: "Selecione la tienda",
      required: false,
      endpoint: "shops/select",
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
