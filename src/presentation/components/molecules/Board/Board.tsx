"use client";
import style from "./style.module.css";
import BoardButton from "../../atoms/BoardButton/BoardButton";
import BoardInterface from "@/domain/schemas/BoardSchema";
import { ColorTypes } from "@/domain/enums/ColorsEnum";
import { Grid, TextInput } from "@mantine/core";
import { SequenceInterface } from "@/domain/schemas/SerieSchema";

interface Props {
  data: SequenceInterface;
  addColor: (color: ColorTypes, col: number, row: number) => void;
}

const Board = ({ data, addColor }: Props) => {
  const grid = {
    rows: 16,
    cols: 8,
  };

  const addColorInternal = (color: ColorTypes, col: number, row: number) => {
    addColor(color, col, row);
  };

  return (
    <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} align="center">
      <Grid.Col span={8}>
        <div
          className={`${style.board_container}`}
          style={{
            gridTemplateColumns: `repeat(${grid.rows}, 1fr)`,
          }}
        >
          {data.sequence.map((color: string, index: number) => {
            const col = Math.floor(index / grid.rows) + 1;
            const row = grid.rows - -1 * (index - col * grid.rows + 1);
            const cl: ColorTypes =
              color === "O"
                ? "orange"
                : color === "G"
                ? "green"
                : color === "B"
                ? "black"
                : "red";
            return (
              <BoardButton
                key={`row${col}${row}${index}${color}`}
                col={col}
                row={row}
                initialColor={cl}
                addColor={addColorInternal}
              />
            );
          })}
        </div>
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput label="Tiempo de espera(ms)" placeholder="Tiempo de espera (ms)" type="number" />
        <TextInput label="Agregar X aleatorios:" placeholder="Posición a saltar" />
        Si no termina los naranjas, pasa al primero
      </Grid.Col>
    </Grid>
  );
};

export default Board;
