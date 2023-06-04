import { Group, Pagination, Select, Text } from "@mantine/core";
import styles from "./styles.module.css";

const countOptions = ["10", "20", "40", "60", "100"];
interface Props {
  page: number;
  count: number;
  total: number;
  changePage: (page: number) => void;
  changeCount: (count: number) => void;
}
const CustomTableFooter = ({
  page,
  count,
  total,
  changePage,
  changeCount,
}: Props) => {
  return (
    <Group position="apart" className={styles.footer_options}>
      <div>
        <p>
          {count * (page - 1) + 1} a{" "}
          {total < count * page ? total : count * page} de {total}
        </p>
      </div>
      <Pagination
        value={page}
        onChange={changePage}
        total={Math.ceil((total || 0) / count)}
      />
      <Group position="center">
        Items Por página
        <Select
          value={`${count}`}
          onChange={(val: string) => changeCount(parseInt(val))}
          data={countOptions}
          className={styles.select_count}
        />{" "}
      </Group>
    </Group>
  );
};

export default CustomTableFooter;
