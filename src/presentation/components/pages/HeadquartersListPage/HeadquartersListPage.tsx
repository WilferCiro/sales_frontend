"use client";

import TableCrud from "../../organisms/TableCrud/TableCrud";
import { useMemo } from "react";
import { useMutation } from "react-query";
import { getHeadquarterFormDefinition } from "@/data/forms/headquarter.form";
import { HeadquarterSchema } from "@/domain/schemas/HeadquarterSchema";
import {
  addHeadquarterService,
  editHeadquarterService,
  exportHeadquarterService,
} from "@/data/services/headquarter.services";
import { getTableHearquarterDefinition } from "@/data/tables/headquarter.table";
import PageTitle from "../../atoms/PageTitle/PageTitle";

const HeadquartersListPage = () => {
  const fieldsFormAdd = useMemo(() => getHeadquarterFormDefinition(), []);
  const columns = useMemo(() => getTableHearquarterDefinition(), []);

  const mutationAdd = useMutation({
    mutationFn: addHeadquarterService,
  });
  const mutationEdit = useMutation({
    mutationFn: editHeadquarterService,
  });

  const onDisable = async (original: HeadquarterSchema): Promise<boolean> => {
    const res = await mutationEdit.mutateAsync({
      id: original.id,
      active: !original.active,
    });
    return res !== null;
  };

  const onAdd = async (data: HeadquarterSchema): Promise<boolean> => {
    const res = await mutationAdd.mutateAsync(data);
    return res !== null;
  };

  const onEdit = async (
    data: HeadquarterSchema,
    original: HeadquarterSchema
  ): Promise<boolean> => {
    const res = await mutationEdit.mutateAsync({ id: original.id, ...data });
    return res !== null;
  };

  return (
    <>
      <PageTitle title="Sedes" subtitle="Gestiona las sedes de tu empresa" />
      <TableCrud<HeadquarterSchema>
        columns={columns}
        endpoint="headquarters"
        actions={{
          onAdd: onAdd,
          onEdit: onEdit,
          onDisable: onDisable,
        }}
        filters={{
          createdFrom: "",
        }}
        fieldsFormAdd={fieldsFormAdd}
        fieldsFormEdit={fieldsFormAdd} // customActions={[]}
      />
    </>
  );
};

export default HeadquartersListPage;
