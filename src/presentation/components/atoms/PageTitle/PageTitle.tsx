import { Title } from "@mantine/core";
import style from "./style.module.css";

interface Props {
  title: string;
  subtitle?: string;
}

const PageTitle = ({ title, subtitle }: Props) => {
  return (
    <div className={style.title}>
      <Title order={2}>{title}</Title>
      {subtitle && <Title order={4}>{subtitle}</Title>}
    </div>
  );
};

export default PageTitle;
