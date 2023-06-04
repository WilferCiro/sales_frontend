import { Button, Group, Modal, Space } from "@mantine/core";
import GenericForm from "../GenericForm/GenericForm";
import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { useEffect, useState } from "react";
import AsyncButton from "../../atoms/AsyncButton/AsyncButton";

interface Props {
  opened: boolean;
  onClose: () => void;
  onAccept: () => Promise<boolean>;
  fields: FormFieldSchema[];
  form: any; // TODO: change type
  title: string;
}

const FormModal = ({
  opened,
  onClose,
  fields,
  onAccept,
  form,
  title,
}: Props) => {
  useEffect(() => {
    if (opened) {
      form.reset();
    }
  }, [opened, form]);

  const acceptAction = async () => {
    await form.trigger();
    const valid = form.formState.isValid;
    if (!valid) {
      return;
    }
    const value = await onAccept();
    if (value) {
      onClose();
    }
    return value;
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <GenericForm form={form} fields={fields} />
      <Space h="lg" />
      <Group position="right" spacing="sm">
        <AsyncButton
          disabled={!form.formState.isValid}
          onClick={acceptAction}
          label={"Guardar"}
        />
        <Button color={"red"} onClick={onClose}>
          Cancelar
        </Button>
      </Group>
    </Modal>
  );
};

export default FormModal;
