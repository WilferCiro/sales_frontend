"use client";

import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import {
  Checkbox,
  NumberInput,
  PasswordInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import SelectSearchForm from "../../molecules/SelectSearchForm/SelectSearchForm";

interface Props {
  form: any;
  fields: FormFieldSchema[];
  services?: [
    {
      service: string;
    }
  ];
}

const GenericForm = ({ form, fields, services }: Props) => {
  const formFieldsFormat = useMemo(() => {
    return (fields || []).map((formField: FormFieldSchema) => {
      const props = {
        name: formField.name,
        withAsterisk: formField?.required ?? false,
        label: formField.label,
        placeholder: formField.placeholder || formField.label,
        autoComplete: "false",
        errorProps: { size: "xs" },
        error: form.formState?.errors[formField.name]?.message,
      };
      switch (formField.type) {
        case "email":
        case "text":
          return (
            <TextInput
              key={formField.name}
              {...props}
              {...form.register(formField.name)}
            />
          );
        case "password":
          return (
            <PasswordInput
              key={formField.name}
              {...props}
              {...form.register(formField.name)}
            />
          );
        case "number":
          return (
            <Controller
              name={formField.name}
              control={form.control}
              key={formField.name}
              render={({ field }) => (
                <NumberInput {...field} {...props} onChange={field.onChange} />
              )}
            />
          );
        case "textarea":
          return (
            <Textarea
              key={formField.name}
              {...props}
              {...form.register(formField.name)}
            />
          );
        case "select":
          return (
            <Controller
              name={formField.name}
              control={form.control}
              key={formField.name}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    {...props}
                    data={formField.options || []}
                    value={(field.value?.id || field.value) + ""}
                  />
                );
              }}
            />
          );
        case "select_search":
          return (
            <Controller
              name={formField.name}
              control={form.control}
              key={formField.name}
              render={({ field }) => {
                return (
                  <SelectSearchForm
                    {...props}
                    {...field}
                    ref={field.ref}
                    endpoint={formField.endpoint}
                    value={(field.value?.id || field.value) + ""}
                  />
                );
              }}
            />
          );
        case "checkbox":
          const propsCheck = {
            ...props,
            withAsterisk: undefined,
            errorProps: undefined,
          };
          return (
            <Controller
              name={formField.name}
              control={form.control}
              key={formField.name}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  {...propsCheck}
                  style={{ marginTop: "10px" }}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          );
      }
    });
  }, [fields, form]);

  return <>{formFieldsFormat}</>;
};

export default GenericForm;
