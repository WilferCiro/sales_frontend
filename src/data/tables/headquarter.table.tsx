"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { HeadquarterSchema } from "@/domain/schemas/HeadquarterSchema";
import { ShopSchema } from "@/domain/schemas/ShopSchema";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import { ActionIcon, Badge, Flex, Group } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import { Column } from "react-table";

export const getTableHearquarterDefinition =
  (): Column<HeadquarterSchema>[] => {
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
        Header: "Dirección",
        accessor: "address",
      },
      {
        Header: "Ciudad",
        accessor: "city",
        Cell: ({ cell: { value } }) => {
          return <label>{value?.name}</label>;
        },
      },
      {
        Header: "Tienda",
        accessor: "shop",
        Cell: ({ cell: { value } }) => {
          return (
            <Flex align="center">
              <label>{value?.name}</label>
              <Link href={`/org/shops/${value.id}`}>
                <ActionIcon variant="transparent">
                  <IconExternalLink size="1rem" />
                </ActionIcon>
              </Link>
            </Flex>
          );
        },
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
