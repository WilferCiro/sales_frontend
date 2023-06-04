import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getProductFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "name",
      label: "Título",
      placeholder: "Título del producto",
      required: true,
    },
    {
      type: "text",
      name: "sku",
      label: "SKU",
      placeholder: "sku",
      required: true,
    },
    {
      type: "number",
      name: "price",
      label: "Precio",
      placeholder: "Ej: 50000",
      required: true,
    },
    {
      type: "text",
      name: "presentation",
      label: "Presentación",
      placeholder: "Ej: unidad",
      required: false,
    },
    {
      type: "text",
      name: "barcode",
      label: "Código de barras",
      placeholder: "¿Tienes código de barras?",
      required: false,
    },
    {
      type: "select_search",
      name: "category",
      label: "Categoría",
      placeholder: "Seleccione una categoría",
      required: true,
      endpoint: "product_categories/select",
    },
    {
      type: "select_search",
      name: "shop",
      label: "Tienda",
      placeholder: "Seleccione una tienda",
      required: true,
      endpoint: "shops/select",
    },
    {
      type: "textarea",
      name: "description",
      label: "Descripción",
      placeholder: "Describe brevemente el producto",
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
