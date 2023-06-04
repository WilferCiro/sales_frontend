"use client";

import {
  Badge,
  Card,
  Divider,
  List,
  Skeleton,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import styles from "./styles.module.css";
import {
  IconBuilding,
  IconCards,
  IconDatabase,
  IconLink,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { useQuery } from "react-query";
import { getShopById } from "@/data/services/shop.services";
import getDateString from "@/domain/adapters/getDateString";
import BadgeActive from "../../atoms/BadgeActive/BadgeActive";
import Image from "next/image";

interface Props {
  shopId: number;
}

const ShopProfilePage = ({ shopId }: Props) => {
  const { data, isLoading, isError } = useQuery(
    [`shop_profile_${shopId}`, { shopId }],
    () => getShopById(shopId),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  if (isError) {
    return <>Error al cargar la tienda</>;
  }

  return (
    <Card className={styles.card_container}>
      <Skeleton visible={isLoading}>
        <header className={styles.header}>
          <div className={styles.avatar}>
            <Image
              src={"/images/logo.svg"}
              alt={"Foto del usuario"}
              width={200}
              height={200}
            />
          </div>
          <div>
            <Title order={2}>{data?.name}</Title>
            <BadgeActive active={data?.active || false} />
          </div>
        </header>
      </Skeleton>
      <Divider m={20} />
      <Skeleton visible={isLoading}>
        <Tabs defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="gallery" icon={<IconDatabase size="0.8rem" />}>
              Datos básicos
            </Tabs.Tab>
            <Tabs.Tab
              value="messages"
              icon={<IconBuilding size="0.8rem" />}
              rightSection={
                <Badge
                  w={16}
                  h={16}
                  sx={{ pointerEvents: "none" }}
                  variant="filled"
                  size="xs"
                  p={0}
                >
                  {(data?.headquarters || []).length}
                </Badge>
              }
            >
              Sedes
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" pt="xs">
            <List spacing="xs" size="sm" center>
              <List.Item icon={<IconUser />}>
                {data?.owner?.firstName} {data?.owner?.lastName}
              </List.Item>
              <List.Item icon={<IconCards />}>Nit: {data?.nit}</List.Item>
              {data?.phone && (
                <List.Item icon={<IconPhone />}>{data?.phone}</List.Item>
              )}
              {data?.email && (
                <List.Item icon={<IconMail />}>{data?.email}</List.Item>
              )}
              {data?.website && (
                <List.Item icon={<IconLink />}>{data?.website}</List.Item>
              )}
            </List>
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            <List spacing="xs" size="sm" center>
              {(data?.headquarters || []).map((h) => {
                return (
                  <List.Item icon={<IconBuilding />} key={h.id}>
                    {h.name} <BadgeActive active={h?.active || false} />
                  </List.Item>
                );
              })}
            </List>
          </Tabs.Panel>
        </Tabs>
      </Skeleton>
      <Divider m={20} />
      <Skeleton visible={isLoading}>
        <Text c="dimmed" fz="xs">
          Creada el {getDateString(data?.createdAt)}
        </Text>
        <Text c="dimmed" fz="xs">
          Datos actualizados el {getDateString(data?.updatedAt)}
        </Text>
      </Skeleton>
    </Card>
  );
};

export default ShopProfilePage;
