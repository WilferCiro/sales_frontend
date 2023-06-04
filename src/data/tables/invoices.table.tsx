"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { SaleStoreSchema } from "@/domain/schemas/SaleStoreSchema";
import AsyncButton from "@/presentation/components/atoms/AsyncButton/AsyncButton";
import { IconFileInvoice, IconPdf } from "@tabler/icons-react";
import { Cell, Column } from "react-table";

export const getTableInvoicesDefinition = (
  onExport: (id: string | number) => Promise<boolean>
): Column<SaleStoreSchema>[] => {
  return [
    {
      Header: "Total",
      accessor: "total",
      Cell: ({ cell: { value } }) => {
        return <>{getPriceFormat(value)}</>;
      },
    },
    {
      Header: "Cliente",
      accessor: "client",
      Cell: ({ cell: { value } }) => {
        return <>{value?.name}</>;
      },
    },
    {
      Header: "Doc. Cliente",
      Cell: ({ cell }: { cell: Cell<SaleStoreSchema> }) => {
        return <>{cell.row.original.client?.document}</>;
      },
    },
    {
      Header: "Productos",
      accessor: "products",
      Cell: ({ cell: { value } }) => {
        return <>{value.length}</>;
      },
    },
    {
      Header: "Creado en",
      accessor: "createdAt",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
    {
      Header: "Actualizado en",
      accessor: "updatedAt",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
    {
      Header: "Factura",
      accessor: "id",
      Cell: ({ cell }: { cell: Cell<SaleStoreSchema> }) => {
        return (
          <AsyncButton
            label="Descargar"
            leftIcon={<IconFileInvoice />}
            onClick={() => onExport(cell.value)}
          />
        );
      },
    },
  ];
};
