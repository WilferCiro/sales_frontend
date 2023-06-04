import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getUserFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "firstName",
      label: "Nombres",
      placeholder: "Nombres",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      label: "Apellidos",
      placeholder: "Apellidos",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Contraseña",
      required: true,
    },
    /*{
      type: "password",
      name: "password2",
      label: "Contraseña 2",
      required: true,
    },
    {
      type: "select",
      name: "gender",
      label: "Género",
      placeholder: "Género",
      required: true,
      options: [
        {
          value: "M",
          label: "Masculino",
        },
        {
          value: "F",
          label: "Femenino",
        },
      ],
    },*/
    {
      type: "email",
      name: "email",
      label: "E-mail",
      placeholder: "E-mail",
      required: true,
    },
    {
      type: "text",
      name: "phone",
      label: "Celular",
      placeholder: "+57 3111 111 1111",
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

export const getUserFormDefinitionEdit = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "firstName",
      label: "Nombres",
      placeholder: "Nombres",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      label: "Apellidos",
      placeholder: "Apellidos",
      required: true,
    },
    /*{
      type: "email",
      name: "email",
      label: "E-mail",
      placeholder: "E-mail",
      required: true,
    },*/
    {
      type: "text",
      name: "phone",
      label: "Celular",
      placeholder: "+57 3111 111 1111",
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
