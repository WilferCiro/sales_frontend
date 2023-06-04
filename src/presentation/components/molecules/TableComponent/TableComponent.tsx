import { Alert, Table } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { Column, HeaderGroup, useTable } from "react-table";
import styles from "./styles.module.css";
interface Props<T extends object> {
  isLoading?: boolean;
  isError?: boolean;
  showEmpty?: boolean;
  columns: readonly Column<T>[];
  data: T[];
}

const TableComponent = <T extends object>({
  isLoading,
  isError,
  data,
  columns,
  showEmpty,
}: Props<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data || [],
    });

  return (
    <Table striped highlightOnHover {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup: HeaderGroup<T>) => {
          const { key, ...restHeaderProps } = headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...restHeaderProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumnProps } = column.getHeaderProps();
                return (
                  <th key={key} {...restColumnProps}>
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <tr key={key} {...restRowProps}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <td key={key} {...restCellProps}>
                    <span className={styles.title_table}>{cell.render("Header")}</span>{" "}
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
        {(showEmpty === true || showEmpty === undefined) &&
          rows.length === 0 &&
          !isLoading && (
            <tr>
              <td colSpan={columns.length}>
                <Alert
                  icon={<IconAlertCircle size="2rem" />}
                  title="Sin resultados"
                  color="indigo"
                >
                  No hay registros
                </Alert>
              </td>
            </tr>
          )}
        {isError && <div>ERROR</div>}
      </tbody>
    </Table>
  );
};

export default TableComponent;
