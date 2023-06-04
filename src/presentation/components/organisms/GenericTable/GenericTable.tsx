"use client";

import { getPaginatedData } from "@/data/services/table.services";
import { Box, Grid, Input, LoadingOverlay, Table } from "@mantine/core";
import { Column } from "react-table";
import { IconInputSearch } from "@tabler/icons-react";
import { ChangeEvent, ReactElement, startTransition, useState } from "react";
import { useQuery } from "react-query";

import styles from "./styles.module.css";
import CustomTableFooter from "../../molecules/CustomTableFooter/CustomTableFooter";
import TableComponent from "../../molecules/TableComponent/TableComponent";

interface Props<T extends object> {
  columns: readonly Column<T>[];
  endpoint: string;

  filters: any; // TODO: change type
  headerRight: ReactElement;
  server: string;
}

const GenericTable = <T extends object>({
  columns,
  endpoint,
  filters,
  headerRight,
  server,
}: Props<T>) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState("10");
  const [query, setQuery] = useState("");

  const { isLoading, isError, data, isFetching } = useQuery(
    [`${endpoint}_paginated`, { server, endpoint, page, count, query, filters }],
    () => getPaginatedData<T>({ server, endpoint, page, count, query, filters }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const changePage = (pPage: number) => {
    setPage(pPage);
  };

  const changeCount = (pCount: number) => {
    setCount(`${pCount}` || "10");
  };

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setQuery(e.target.value);
    });
  };

  return (
    <div className={styles.table_container}>
      <header className={styles.header}>
        <Grid justify="space-between">
          <Grid.Col md={6} lg={3}>
            <Input
              icon={<IconInputSearch />}
              value={query}
              placeholder="Búsqueda"
              onChange={changeSearch}
            />
          </Grid.Col>
          <Grid.Col md={6} lg={6}>
            {headerRight}
          </Grid.Col>
        </Grid>
      </header>
      <Box pos="relative">
        <LoadingOverlay visible={isFetching} overlayBlur={2} />
        <div className={styles.table_responsive}>
          <TableComponent
            isLoading={isLoading}
            isError={isError}
            columns={columns}
            data={data?.data || []}
          />
        </div>
        <CustomTableFooter
          page={page}
          count={parseInt(count)}
          total={data?.total || 0}
          changePage={changePage}
          changeCount={changeCount}
        />
      </Box>
    </div>
  );
};

export default GenericTable;
