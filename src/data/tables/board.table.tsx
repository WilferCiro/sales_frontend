"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import BoardInterface from "@/domain/schemas/BoardSchema";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import { Column } from "react-table";

export const getTableBoardDefinition = (): Column<BoardInterface>[] => {
  return [
    {
      Header: "Activo",
      accessor: "active",
      Cell: ({ cell: { value } }) => {
        return <BadgeActive active={value} />;
      },
    },
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Creado en",
      accessor: "createdAt",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
    {
      Header: "Actualizado en",
      accessor: "updatedAt",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
  ];
};
