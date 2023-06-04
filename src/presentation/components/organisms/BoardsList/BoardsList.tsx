"use client";
import BoardInterface from "@/domain/schemas/BoardSchema";
import { Card, Group, Text, Badge, Button, Grid } from "@mantine/core";

interface Props {
  boards: BoardInterface[];
}
const BoardsList = ({ boards }: Props) => {
  return (
    <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
      {boards.map((board) => {
        return (
          <Grid.Col key={board.createdAt + board.name} span={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{board.name}</Text>
                <Badge color={board.active ? "green" : "pink"} variant="light">
                  {board.active ? "Activo" : "Inactivo"}
                </Badge>
              </Group>
              <Text size="sm" color="dimmed">
                Actualizado: {board.updatedAt.toString()}
              </Text>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Ver detallado
              </Button>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default BoardsList;
