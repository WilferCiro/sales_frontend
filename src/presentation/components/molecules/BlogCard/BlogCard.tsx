import {
  Avatar,
  Badge,
  Button,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import { IconExternalLink, IconLink } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  icon: React.ReactElement;
  technologies: string[];
  link: string;
}

const BlogCard = ({ title, description, icon, technologies, link }: Props) => {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar color="orange" size={120} radius={120} mx="auto">
        {" "}
        {icon}
      </Avatar>
      <Group mt={20} align="center">
        {technologies.map((tec: string) => (
          <Badge key={tec}>{tec}</Badge>
        ))}
      </Group>
      <Text ta="center" fz="lg" weight={500} mt="md">
        {title}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {description}
      </Text>

      <Link href={link} rel="noreferer" target="_blank">
        <Button
          variant="outline"
          fullWidth
          mt="md"
          rightIcon={<IconExternalLink size={"1.2em"} />}
        >
          Ver código fuente
        </Button>
      </Link>
    </Paper>
  );
};

export default BlogCard;
