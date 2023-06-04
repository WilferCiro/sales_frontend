import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { SaleSchema } from "@/domain/schemas/SaleSchema";
import { Flex, NumberInput } from "@mantine/core";
import { Cell, Column } from "react-table";

interface Props {
  changeQuantity: (value: number, id?: number) => void;
}

export const getTableSaleDefinition = ({
  changeQuantity,
}: Props): Column<SaleSchema>[] => {
  return [
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "SKU",
      accessor: "sku",
    },
    {
      Header: "Categoría",
      accessor: "category",
      Cell: ({ cell: { value } }) => {
        return (
          <Flex align="center">
            <label>{value?.name}</label>
          </Flex>
        );
      },
    },
    {
      Header: "Presentación",
      accessor: "presentation",
    },
    {
      Header: "Precio",
      accessor: "price",
      Cell: ({ cell: { value } }) => {
        return <>{getPriceFormat(value || 0)}</>;
      },
    },
    {
      Header: "Cantidad",
      accessor: "quantity",
      Cell: ({ cell }: { cell: Cell<SaleSchema> }) => {
        return (
          <NumberInput
            value={cell.value || 1}
            placeholder="Your age"
            min={1}
            onChange={(e: number) => changeQuantity(e, cell.row.original.id)}
            style={{ width: "100px"}}
          />
        );
      },
    },
    {
      Header: "Total",
      accessor: "total",
      Cell: ({ cell }: { cell: Cell<SaleSchema> }) => {
        return (
          <>
            {getPriceFormat(
              (cell.row.original.quantity || 0) * (cell.row.original.price || 0)
            )}
          </>
        );
      },
    },
  ];
};
