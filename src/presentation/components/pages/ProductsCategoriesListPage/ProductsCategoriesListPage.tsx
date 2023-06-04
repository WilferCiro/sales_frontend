"use client";

import TableCrud from "../../organisms/TableCrud/TableCrud";
import { useMemo } from "react";
import { useMutation } from "react-query";
import {
  addProductCategoryService,
  editProductCategoryService,
  exportProductCategoryService,
} from "@/data/services/product_category.services";
import { ProductCategorySchema } from "@/domain/schemas/ProductCategorySchema";
import { getProductCategoryFormDefinition } from "@/data/forms/product_category.form";
import { getTableProductCategoryDefinition } from "@/data/tables/product_category.table";
import PageTitle from "../../atoms/PageTitle/PageTitle";

const ProductCategorysCategoriesListPage = () => {
  const fieldsFormAdd = useMemo(() => getProductCategoryFormDefinition(), []);
  const columns = useMemo(() => getTableProductCategoryDefinition(), []);

  const mutationAdd = useMutation({
    mutationFn: addProductCategoryService,
  });
  const mutationEdit = useMutation({
    mutationFn: editProductCategoryService,
  });
  const mutationExport = useMutation({
    mutationFn: exportProductCategoryService,
  });

  const onDisable = async (
    original: ProductCategorySchema
  ): Promise<boolean> => {
    const res = await mutationEdit.mutateAsync({
      id: original.id,
      active: !original.active,
    });
    return res !== null;
  };

  const onAdd = async (data: ProductCategorySchema): Promise<boolean> => {
    const res = await mutationAdd.mutateAsync(data);
    return res !== null;
  };

  const onEdit = async (
    data: ProductCategorySchema,
    original: ProductCategorySchema
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
      <PageTitle title="Categoría de productos" subtitle="Administra las categorías de los diferentes productos" />
      <TableCrud<ProductCategorySchema>
        columns={columns}
        endpoint="product_categories"
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

export default ProductCategorysCategoriesListPage;
