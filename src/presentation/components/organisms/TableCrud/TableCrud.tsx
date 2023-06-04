"use client";
import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import ModalConfirm from "../../molecules/ModalConfirm/ModalConfirm";
import FormModal from "../FormModal";
import GenericTable from "../GenericTable";
import { Column } from "react-table";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { useCallback, useMemo, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import CrudHeader from "../../molecules/CrudTable/CrudHeader/CrudHeader";
import CrudRowButtons from "../../molecules/CrudTable/CrudRowButtons/CrudRowButtons";
import { systemServers } from "@/data/constants/servers";
interface Props<T extends object> {
  fieldsFormAdd: FormFieldSchema[];
  fieldsFormEdit: FormFieldSchema[];
  columns: Column<T>[];
  endpoint: string;
  filters?: object;
  filterComponent?: React.ReactNode;
  actions?: {
    onAdd?: (data: T) => Promise<boolean>;
    onEdit?: (data: T, original: T) => Promise<boolean>;
    onDelete?: (data: T) => Promise<boolean>;
    onDisable?: (data: T) => Promise<boolean>;
    onExport?: () => Promise<boolean>;
  };
  server?: keyof typeof systemServers;
}

const TableCrud = <T extends object>({
  fieldsFormAdd,
  fieldsFormEdit,
  columns,
  endpoint,
  actions,
  filters,
  filterComponent,
  server = "dashboard",
}: Props<T>) => {
  const queryClient = useQueryClient();
  const { form: formEdit } = useCustomForm<T>(fieldsFormEdit);
  const { form: formAdd } = useCustomForm<T>(fieldsFormAdd);

  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleAdd, setVisibleAdd] = useState<boolean>(false);
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [visibleDisable, setVisibleDisable] = useState<boolean>(false);

  const focusRegister = useRef<T | null>(null);

  const setFocusRegister = useCallback((value: T | null) => {
    focusRegister.current = value;
  }, []);

  // ADD
  const closeAdd = () => {
    setVisibleAdd(false);
  };
  const openAdd = () => {
    setVisibleAdd(true);
  };

  // EDIT
  const closeEdit = () => {
    setVisibleEdit(false);
  };

  const openEdit = useCallback(
    (data: T) => {
      setFocusRegister(data);
      const newData = { ...data };
      Object.keys(data).map((key) => {
        if (data[key as keyof T] && (data[key as keyof T] as any)?.id) {
          newData[key as keyof T] = (data[key as keyof T] as any).id;
        } else {
          newData[key as keyof T] = data[key as keyof T];
        }
      });
      formEdit.reset(newData);
      setVisibleEdit(true);
    },
    [formEdit, setFocusRegister]
  );

  // DELETE
  const closeDelete = () => {
    setVisibleDelete(false);
  };
  const openDelete = useCallback(
    (data: T) => {
      setFocusRegister(data);
      setVisibleDelete(true);
    },
    [setFocusRegister]
  );

  // DISABLE
  const openDisable = useCallback(
    (data: T) => {
      setFocusRegister(data);
      setVisibleDisable(true);
    },
    [setFocusRegister]
  );

  const closeDisable = () => {
    setVisibleDisable(false);
  };

  // TABLE
  const refreshTable = async () => {
    await queryClient.refetchQueries([`${endpoint}_paginated`], {
      active: true,
    });
  };

  // USER FUNCTIONS
  const onDisable = async (): Promise<boolean> => {
    if (!focusRegister.current || !actions?.onDisable) {
      return false;
    }
    const valid = await actions.onDisable(focusRegister.current);
    if (valid) {
      refreshTable();
    }
    return valid;
  };

  const onAdd = async (): Promise<boolean> => {
    if (!actions?.onAdd) {
      return false;
    }
    const valid = await actions.onAdd(formAdd.getValues());
    if (valid) {
      refreshTable();
    }
    return valid;
  };

  const onEdit = async (): Promise<boolean> => {
    if (!focusRegister.current || !actions?.onEdit) {
      return false;
    }
    const valid = await actions.onEdit(
      formEdit.getValues(),
      focusRegister.current
    );
    if (valid) {
      refreshTable();
    }
    return valid;
  };

  const onDelete = async () => {
    if (!focusRegister.current || !actions?.onDelete) {
      return false;
    }
    const valid = await actions.onDelete(focusRegister.current);
    if (valid) {
      refreshTable();
    }
    return valid;
  };

  const crudColumns = useMemo(() => {
    const newCols = [...columns];
    if (actions?.onDelete || actions?.onDisable || actions?.onEdit) {
      newCols.push({
        Header: "Acciones",
        Cell: ({ row: { original } }: { row: { original: T } }) => {
          return (
            <CrudRowButtons<T>
              original={original}
              openEdit={actions.onEdit ? openEdit : undefined}
              openDelete={actions.onDelete ? openDelete : undefined}
              openDisable={actions.onDisable ? openDisable : undefined}
            />
          );
        },
      });
    }
    return newCols;
  }, [columns, actions, openDisable, openDelete, openEdit]);


  return (
    <>
      <ModalConfirm
        opened={visibleDelete}
        onClose={closeDelete}
        onAccept={onDelete}
        title="¿Eliminar?"
        text="¿Desea eliminar este registro?"
      />

      <ModalConfirm
        opened={visibleDisable}
        onClose={closeDisable}
        onAccept={onDisable}
        title="Modificar registro"
        text={`¿Desea ${
          (focusRegister?.current as any)?.active === undefined
            ? "activar/desactivar"
            : (focusRegister?.current as any)?.active
            ? "desactivas"
            : "activar"
        } este registro?`}
      />

      <FormModal
        title="Agregar registro"
        opened={visibleAdd}
        onClose={closeAdd}
        fields={fieldsFormAdd}
        onAccept={onAdd}
        form={formAdd}
      />
      <FormModal
        title="Modificar registro"
        opened={visibleEdit}
        onClose={closeEdit}
        fields={fieldsFormEdit}
        onAccept={onEdit}
        form={formEdit}
      />

      <GenericTable<T>
        columns={crudColumns || []}
        endpoint={`${endpoint}`}
        server={`${systemServers[server]}`}
        filters={filters || undefined}
        headerRight={
          <CrudHeader
            onExport={actions?.onExport}
            openAdd={actions?.onAdd ? openAdd : undefined}
            filterComponent={filterComponent}
          />
        }
      />
    </>
  );
};

export default TableCrud;
