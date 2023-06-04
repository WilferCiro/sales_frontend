"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { ShopSchema } from "@/domain/schemas/ShopSchema";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import { ActionIcon, Flex, Text, Tooltip } from "@mantine/core";
import { IconExternalLink, IconLink } from "@tabler/icons-react";
import Link from "next/link";
import { Cell, Column } from "react-table";

export const getTableShopDefinition = (): Column<ShopSchema>[] => {
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
      Cell: ({ cell }: { cell: Cell<ShopSchema> }) => {
        return (
          <Tooltip label={"Click para ver el perfil"}>
            <Link href={`/org/shops/${cell.row.original.id}`}>
              <Flex align="center" gap={10}>
                <Text>{cell.value}</Text>
                <IconLink size="1rem" />
              </Flex>
            </Link>
          </Tooltip>
        );
      },
    },
    {
      Header: "Nit",
      accessor: "nit",
    },
    {
      Header: "Dueño",
      accessor: "owner",
      Cell: ({ cell: { value } }) => {
        return (
          <Tooltip label={"Click para ver el perfil del dueño"}>
            <Link href={`/org/users/${value.id}`}>
              <Flex align="center" gap={10}>
                <Text>
                  {value.firstName} {value.lastName}
                </Text>
                <ActionIcon variant="transparent">
                  <IconExternalLink size="1rem" />
                </ActionIcon>
              </Flex>
            </Link>
          </Tooltip>
        );
      },
    },
    {
      Header: "Teléfono",
      accessor: "phone",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Web",
      accessor: "website",
      Cell: ({ cell: { value } }) => {
        return value ? (
          <ActionIcon variant="transparent">
            <IconExternalLink size="1rem" />
          </ActionIcon>
        ) : null;
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
