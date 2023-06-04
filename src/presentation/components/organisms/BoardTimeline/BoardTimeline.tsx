"use client";
import BoardInterface from "@/domain/schemas/BoardSchema";
import Board from "../../molecules/Board";
import { useEffect, useState } from "react";
import { Button, Menu, Pagination, Space } from "@mantine/core";
import { ColorTypes } from "@/domain/enums/ColorsEnum";
import config from "@/data/config/config";
import {
  SequenceInterface,
  SerieInterface,
} from "@/domain/schemas/SerieSchema";

const emptyData: SequenceInterface = {
  sequence: Array(config.COL_SIZE * config.ROW_SIZE).fill("R"),
  delay: 0,
  random: 0,
};

const BoardTimeline = () => {
  const [serie, setSerie] = useState<SerieInterface>({
    name: "Serie",
    active: true,
  });
  const [data, setData] = useState<SequenceInterface[]>([]);
  const [action, setAction] = useState<number>(0);

  const onAdd = () => {
    setData([...data, structuredClone(emptyData)]);
  };

  const addColor = (color: ColorTypes, col: number, row: number) => {
    const colors = {
      red: "R",
      green: "G",
      orange: "O",
      black: "B",
    };
    const prevData = structuredClone(data);
    prevData[action].sequence[config.COL_SIZE * (col - 1) + row - 1] =
      colors[`${color}`];
    setData(prevData);
  };

  const changePage = (page: number) => {
    setAction(page - 1);
  };

  const turnOffRed = () => {
    const prevData = structuredClone(data);
    prevData[action].sequence = prevData[action].sequence.map(
      (color: string) => {
        if (color === "R") {
          return "B";
        }
        return color;
      }
    );
    setData(prevData);
  };

  const duplicateAll = () => {
    const prevData = structuredClone(data);
    prevData.push(prevData[prevData.length - 1]);
    setData(prevData);
  };
  
  return (
    <>
      <Button onClick={onAdd}>Add</Button>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Apagado masivo</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={turnOffRed}>Rojos</Menu.Item>
          <Menu.Item>Verdes</Menu.Item>
          <Menu.Item>Naranjas</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Cambiar</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Negros por Rojos</Menu.Item>
          <Menu.Item>Negros por Verdes</Menu.Item>
          <Menu.Item>Verdes</Menu.Item>
          <Menu.Item>Naranjas</Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Duplicar</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={duplicateAll}>Todo</Menu.Item>
          <Menu.Item onClick={turnOffRed}>Rojos</Menu.Item>
          <Menu.Item>Verdes</Menu.Item>
          <Menu.Item>Naranjas</Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Space h="xl" />
      {data[action] && <Board data={data[action]} addColor={addColor} />}
      <Space h="xl" />
      <Pagination
        total={data.length}
        onChange={changePage}
        position="center"
        withEdges
      />
      <h3>Espera {action && data[action]?.delay} ms en esta posición</h3>
      {action && data[action] && (
        <>
          <p>
            Rojos:{" "}
            {
              data[action].sequence.filter((color: string) => color === "R")
                .length
            }
          </p>
          <p>
            Naranjas:{" "}
            {
              data[action].sequence.filter((color: string) => color === "O")
                .length
            }
          </p>
          <p>
            Verdes:{" "}
            {
              data[action].sequence.filter((color: string) => color === "G")
                .length
            }
          </p>
          <p>
            Apagados:{" "}
            {
              data[action].sequence.filter((color: string) => color === "B")
                .length
            }
          </p>
        </>
      )}
    </>
  );
};

export default BoardTimeline;
