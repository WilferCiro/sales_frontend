"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { UserSchema } from "@/domain/schemas/UserSchema";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import { Column } from "react-table";

export const getTableUserDefinition = (): Column<UserSchema>[] => {
  return [
    {
      Header: "Activo",
      accessor: "active",
      Cell: ({ cell: { value } }) => {
        return <BadgeActive active={value} />;
      },
    },
    {
      Header: "Nombres",
      accessor: "firstName",
    },
    {
      Header: "Apellidos",
      accessor: "lastName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Celular",
      accessor: "phone",
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
