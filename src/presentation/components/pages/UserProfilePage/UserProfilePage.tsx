"use client";

import {
  Avatar,
  Card,
  Divider,
  Grid,
  List,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import styles from "./styles.module.css";
import BadgeActive from "../../atoms/BadgeActive/BadgeActive";
import {
  IconCards,
  IconLink,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import getDateString from "@/domain/adapters/getDateString";
import { useQuery } from "react-query";
import { getUserById } from "@/data/services/user.services";
import Image from "next/image";
interface Props {
  userId: number;
}

const UserProfilePage = ({ userId }: Props) => {
  const { data, isLoading, isError } = useQuery(
    [`shop_profile_${userId}`, { userId }],
    () => getUserById(userId),
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
            <Title order={2}>
              {data?.firstName} {data?.lastName}
            </Title>
            <BadgeActive active={data?.active || false} />
          </div>
        </header>
      </Skeleton>
      <Divider m={20} />
      <Skeleton visible={isLoading}>
        <List spacing="xs" size="sm" center>
          {data?.phone && (
            <List.Item icon={<IconPhone />}>{data?.phone}</List.Item>
          )}
          {data?.email && (
            <List.Item icon={<IconMail />}>{data?.email}</List.Item>
          )}
        </List>
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

export default UserProfilePage;
