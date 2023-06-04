"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { ProductSchema } from "@/domain/schemas/ProductSchema";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import { ActionIcon, Badge, Flex, Group } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { Column } from "react-table";

export const getTableProductDefinition = (): Column<ProductSchema>[] => {
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
      Header: "SKU",
      accessor: "sku",
    },
    {
      Header: "Tienda",
      accessor: "shop",
      Cell: ({ cell: { value } }) => {
        return (
          <Flex align="center">
            <label>{value?.name}</label>
            <ActionIcon variant="transparent">
              <IconExternalLink size="1rem" />
            </ActionIcon>
          </Flex>
        );
      },
    },
    {
      Header: "Categoría",
      accessor: "category",
      Cell: ({ cell: { value } }) => {
        return (
          <Flex align="center">
            <label>{value?.name}</label>
          </Flex>
        );
      },
    },
    {
      Header: "Precio",
      accessor: "price",
      Cell: ({ cell: { value } }) => {
        return <>{getPriceFormat(value)}</>;
      },
    },
    {
      Header: "Presentación",
      accessor: "presentation",
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
