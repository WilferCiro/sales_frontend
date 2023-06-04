import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getShopFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "name",
      label: "Razón social",
      placeholder: "Razón social",
      required: true,
    },
    {
      type: "select_search",
      name: "owner",
      label: "Dueño",
      placeholder: "Seleccione un usuario",
      required: true,
      endpoint: "users/select",
    },
    {
      type: "text",
      name: "nit",
      label: "Nit",
      placeholder: "55-555-5555",
      required: true,
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "email@email.com",
      required: false,
    },
    {
      type: "text",
      name: "phone",
      label: "Teléfono",
      placeholder: "+5X - XXXXXXXXXX",
      required: false,
    },
    {
      type: "text",
      name: "website",
      label: "Página web",
      placeholder: "https://website.com",
      required: false,
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
