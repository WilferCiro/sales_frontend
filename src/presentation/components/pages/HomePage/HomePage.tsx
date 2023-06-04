"use client";
import CardsProjectLinks from "@/presentation/components/organisms/CardsProjectLinks/CardsProjectLinks";
import { Text, Title } from "@mantine/core";

import styles from "./styles.module.css";

const HomePage = () => {
  return (
    <>
      <div className={styles.title}>
        <Title>¡Bienvenido!</Title>
        <Text>
          Descubre las posibilidades de esta plataforma, además de poder ver de
          forma totalmente gratuita su código fuente.
        </Text>
      </div>
      <CardsProjectLinks />
    </>
  );
};

export default HomePage;
