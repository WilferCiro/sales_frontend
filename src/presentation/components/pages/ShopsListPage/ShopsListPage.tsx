"use client";

import TableCrud from "../../organisms/TableCrud/TableCrud";
import { useMemo } from "react";
import { useMutation } from "react-query";
import { ShopSchema } from "@/domain/schemas/ShopSchema";
import { getTableShopDefinition } from "@/data/tables/shop.table";
import {
  addShopService,
  editShopService,
  exportShopService,
} from "@/data/services/shop.services";
import { getShopFormDefinition } from "@/data/forms/shop.form";
import PageTitle from "../../atoms/PageTitle/PageTitle";

const ShopsListPage = () => {
  const fieldsFormAdd = useMemo(() => getShopFormDefinition(), []);
  const columns = useMemo(() => getTableShopDefinition(), []);

  const mutationAdd = useMutation({
    mutationFn: addShopService,
  });
  const mutationEdit = useMutation({
    mutationFn: editShopService,
  });
  const mutationExport = useMutation({
    mutationFn: exportShopService,
  });

  const onDisable = async (original: ShopSchema): Promise<boolean> => {
    const res = await mutationEdit.mutateAsync({
      id: original.id,
      active: !original.active,
    });
    return res !== null;
  };

  const onAdd = async (data: ShopSchema): Promise<boolean> => {
    const res = await mutationAdd.mutateAsync(data);
    return res !== null;
  };

  const onEdit = async (
    data: ShopSchema,
    original: ShopSchema
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
        title="Tiendas"
        subtitle="Gestiona todas las tiendas de la plataforma"
      />
      <TableCrud<ShopSchema>
        columns={columns}
        endpoint="shops"
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
        fieldsFormEdit={fieldsFormAdd} // customActions={[]}
      />
    </>
  );
};

export default ShopsListPage;
