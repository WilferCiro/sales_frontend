import AsyncButton from "@/presentation/components/atoms/AsyncButton";
import { Button, Group } from "@mantine/core";
import { IconFileExport, IconPlus } from "@tabler/icons-react";

interface Props {
  onExport?: () => Promise<boolean>;
  openAdd?: () => void;
  filterComponent: React.ReactNode;
}

const CrudHeader = ({ onExport, openAdd, filterComponent }: Props) => {
  return (
    <Group position="right">
      {filterComponent}
      {openAdd && (
        <Button onClick={openAdd} leftIcon={<IconPlus size="1.125rem" />}>
          Nuevo
        </Button>
      )}
      {onExport && (
        <AsyncButton
          onClick={onExport}
          leftIcon={<IconFileExport size="1.125rem" />}
          label={"Exportar"}
        />
      )}
    </Group>
  );
};

export default CrudHeader;
