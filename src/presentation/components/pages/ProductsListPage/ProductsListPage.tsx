"use client";

import TableCrud from "../../organisms/TableCrud/TableCrud";
import { useMemo } from "react";
import { useMutation } from "react-query";
import {
  addProductService,
  editProductService,
  exportProductService,
} from "@/data/services/product.services";
import { ProductSchema } from "@/domain/schemas/ProductSchema";
import { getTableProductDefinition } from "@/data/tables/product.table";
import { getProductFormDefinition } from "@/data/forms/product.form";
import PageTitle from "../../atoms/PageTitle/PageTitle";

const ProductsListPage = () => {
  const fieldsFormAdd = useMemo(() => getProductFormDefinition(), []);
  const columns = useMemo(() => getTableProductDefinition(), []);

  const mutationAdd = useMutation({
    mutationFn: addProductService,
  });
  const mutationEdit = useMutation({
    mutationFn: editProductService,
  });
  const mutationExport = useMutation({
    mutationFn: exportProductService,
  });

  const onDisable = async (original: ProductSchema): Promise<boolean> => {
    const res = await mutationEdit.mutateAsync({
      id: original.id,
      active: !original.active,
    });
    return res !== null;
  };

  const onAdd = async (data: ProductSchema): Promise<boolean> => {
    const res = await mutationAdd.mutateAsync(data);
    return res !== null;
  };

  const onEdit = async (
    data: ProductSchema,
    original: ProductSchema
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
        title="Productos"
        subtitle="Gestiona los productos de la empresa"
      />
      <TableCrud<ProductSchema>
        columns={columns}
        endpoint="products"
        actions={{
          onAdd: onAdd,
          onEdit: onEdit,
          onDisable: onDisable,
          onExport: onExport,
        }}
        fieldsFormAdd={fieldsFormAdd}
        fieldsFormEdit={fieldsFormAdd} // customActions={[]}
      />
    </>
  );
};

export default ProductsListPage;
