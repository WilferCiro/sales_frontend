"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { ProductCategorySchema } from "@/domain/schemas/ProductCategorySchema";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import { Badge } from "@mantine/core";
import { Column } from "react-table";

export const getTableProductCategoryDefinition =
  (): Column<ProductCategorySchema>[] => {
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
