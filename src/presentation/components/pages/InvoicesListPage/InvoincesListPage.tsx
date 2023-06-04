"use client";

import TableCrud from "../../organisms/TableCrud/TableCrud";
import { useMemo, useState } from "react";
import { useMutation } from "react-query";
import { getProductCategoryFormDefinition } from "@/data/forms/product_category.form";
import PageTitle from "../../atoms/PageTitle/PageTitle";
import { SaleStoreSchema } from "@/domain/schemas/SaleStoreSchema";
import { getTableInvoicesDefinition } from "@/data/tables/invoices.table";
import { exportInvoiceSale } from "@/data/services/sale.services";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

const InvoincesListPage = () => {
  const [creationRange, setCreationRange] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const fieldsFormAdd = useMemo(() => getProductCategoryFormDefinition(), []);

  const mutationExport = useMutation({
    mutationFn: exportInvoiceSale,
  });

  const onExport = async (id: number | string): Promise<boolean> => {
    const res = await mutationExport.mutateAsync(id);
    return res !== null;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => getTableInvoicesDefinition(onExport), []);

  const changeCreationRange = (value: [Date | null, Date | null]) => {
    const date2 = value[1]
      ? new Date(value[1]?.toISOString().replace("00:00.000", "23:59.000"))
      : null;
    setCreationRange([value[0], date2]);
  };
  return (
    <>
      <PageTitle
        title="Lista de ventas"
        subtitle="Visualiza las ventas y descarga las facturas"
      />
      <TableCrud<SaleStoreSchema>
        columns={columns}
        endpoint="sales"
        server="sales"
        fieldsFormAdd={fieldsFormAdd}
        fieldsFormEdit={fieldsFormAdd}
        filters={{
          fromDate: creationRange[0]?.toISOString() || undefined,
          endDate: creationRange[1]?.toISOString() || undefined,
        }}
        filterComponent={
          <DatePickerInput
            type="range"
            valueFormat="DD/MM/YYYY"
            icon={<IconCalendar />}
            placeholder="Seleccione un rango de creación"
            value={creationRange}
            onChange={changeCreationRange}
          />
        }
      />
    </>
  );
};

export default InvoincesListPage;
