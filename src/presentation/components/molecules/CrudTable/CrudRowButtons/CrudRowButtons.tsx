import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconEdit, IconToggleLeft, IconTrash } from "@tabler/icons-react";

interface Props<T> {
  openEdit?: (data: T) => void;
  openDelete?: (data: T) => void;
  openDisable?: (data: T) => void;
  original: T;
}

const CrudRowButtons = <T extends object>({
  openEdit,
  openDelete,
  openDisable,
  original,
}: Props<T>) => {
  return (
    <Group spacing={5}>
      {openEdit && (
        <Tooltip label="Editar registro">
          <ActionIcon
            onClick={() => openEdit(original)}
            color="yellow"
            variant="filled"
          >
            <IconEdit size="1.125rem" />
          </ActionIcon>
        </Tooltip>
      )}
      {openDelete && (
        <Tooltip label="Eliminar registro">
          <ActionIcon
            color="red"
            variant="filled"
            onClick={() => openDelete(original)}
          >
            <IconTrash size="1.125rem" />
          </ActionIcon>
        </Tooltip>
      )}
      {openDisable && (
        <Tooltip label="Activar/Desactivar registro">
          <ActionIcon
            color="blue"
            variant="filled"
            onClick={() => openDisable(original)}
          >
            <IconToggleLeft size="1.125rem" />
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
};

export default CrudRowButtons;
