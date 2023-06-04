"use client";

import {
  getUserFormDefinition,
  getUserFormDefinitionEdit,
} from "@/data/forms/user.form";
import { getTableUserDefinition } from "@/data/tables/user.table";
import { UserSchema } from "@/domain/schemas/UserSchema";
import TableCrud from "../../organisms/TableCrud/TableCrud";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  addUserService,
  editUserService,
  exportUserService,
} from "@/data/services/user.services";
import PageTitle from "../../atoms/PageTitle/PageTitle";

const UserPage = () => {
  const fieldsFormAdd = useMemo(() => getUserFormDefinition(), []);
  const fieldsFormEdit = useMemo(() => getUserFormDefinitionEdit(), []);
  const columns = useMemo(() => getTableUserDefinition(), []);

  const mutationAdd = useMutation({
    mutationFn: addUserService,
  });
  const mutationEdit = useMutation({
    mutationFn: editUserService,
  });
  const mutationExport = useMutation({
    mutationFn: exportUserService,
  });

  const onDisable = async (original: UserSchema): Promise<boolean> => {
    const res = await mutationEdit.mutateAsync({
      id: original.id,
      active: !original.active,
    });
    return res !== null;
  };

  const onAdd = async (data: UserSchema): Promise<boolean> => {
    const res = await mutationAdd.mutateAsync(data);
    return res !== null;
  };

  const onEdit = async (
    data: UserSchema,
    original: UserSchema
  ): Promise<boolean> => {
    const res = await mutationEdit.mutateAsync({ id: original.id, ...data });
    return res !== null;
  };

  const onExport = async (): Promise<boolean> => {
    const res = await mutationExport.mutateAsync();
    return res !== null;
  };

  return (
    <>
      <PageTitle
        title="Usuarios"
        subtitle="Gestiona los usuarios de la plataforma"
      />
      <TableCrud<UserSchema>
        columns={columns}
        endpoint="users"
        actions={{
          onAdd: onAdd,
          onEdit: onEdit,
          onDisable: onDisable,
          onExport: onExport,
        }}
        filters={{
          createdFrom: "",
        }}
        fieldsFormAdd={fieldsFormAdd}
        fieldsFormEdit={fieldsFormEdit} // customActions={[]}
      />
    </>
  );
};

export default UserPage;
