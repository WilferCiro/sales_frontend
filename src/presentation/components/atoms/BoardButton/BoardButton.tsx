"use client";
import { ColorTypes } from "@/domain/enums/ColorsEnum";
import { ColorSwatch, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";

const allColors: ColorTypes[] = ["red", "orange", "green", "black"];

interface Props {
  col: number;
  row: number;
  initialColor: ColorTypes;
  addColor: (color: ColorTypes, col: number, row: number) => void;
}

const BoardButton = ({ col, row, initialColor, addColor }: Props) => {
  const changeStatus = () => {
    let currentIndex = allColors.findIndex((cl: string) => cl === initialColor);
    currentIndex = currentIndex >= allColors.length - 1 ? 0 : currentIndex + 1;
    const newColor = allColors[currentIndex];
    addColor(newColor, col, row);
  };
  return (
    <Tooltip label={`(${col}, ${row})`}>
      <ColorSwatch
        component="button"
        color={initialColor}
        onClick={changeStatus}
        sx={{ color: "#fff", cursor: "pointer" }}
      ></ColorSwatch>
    </Tooltip>
  );
};

export default BoardButton;
