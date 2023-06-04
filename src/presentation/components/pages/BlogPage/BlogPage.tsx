"use client";
import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandGmail,
  IconBrandLinkedin,
  IconCheck,
} from "@tabler/icons-react";
import styles from "./styles.module.css";
import Link from "next/link";
import CardsProjectLinks from "../../organisms/CardsProjectLinks/CardsProjectLinks";

const BlogPage = () => {
  return (
    <div>
      <Container>
        <div className={styles.inner}>
          <div className={styles.content}>
            <Title className={styles.title}>
              <span className={styles.highlight}>Simple</span> backoffice de
              prueba con Nestjs y Nextjs <br />{" "}
            </Title>
            <Text color="dimmed" mt="md">
              Encuentra una demo funcional del backoffice creado con Nextjs 13 y
              Nestjs utilizando arquitectura hexagonal y microservicios
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={rem(12)} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Typescript</b> como lenguaje principal para ambos proyectos
              </List.Item>
              <List.Item>
                <b>Código abierto</b> – revisa los repositorios disponibles con
                el código fuente
              </List.Item>
              <List.Item>
                <b>Arquitecturas</b> – revisa el código fuente con una
                implementación real de arquitectura hexagonal
              </List.Item>
            </List>

            <Group mt={30}>
              <Link href="/user/login">
                <Button radius="xl" size="md" className={styles.control}>
                  Iniciar sesión
                </Button>
              </Link>
              <a href="#source-code">
                <Button
                  variant="default"
                  radius="xl"
                  size="md"
                  className={styles.control}
                >
                  Código fuente
                </Button>
              </a>
            </Group>
          </div>
          <Image
            src={"/images/logo.svg"}
            className={styles.image}
            alt="Logo del blog"
          />
        </div>
      </Container>

      <CardsProjectLinks />

      <div className={styles.footer}>
        <Container className={styles.footer_inner}>
          <div>
            <Image
              src={"/images/logo.svg"}
              className={styles.footer_image}
              alt="Logo del blog"
            />
          </div>
          <div>
            <Text>Creado por: Wilfer Ciro</Text>
          </div>
          <Group spacing={20} className={styles.links} position="right" noWrap>
            <Tooltip label="Ver mi Linkedin">
              <Link
                href="https://www.linkedin.com/in/wilfer-ciro/"
                target="_blank"
              >
                <ActionIcon size="lg">
                  <IconBrandLinkedin size="1.5rem" stroke={1.5} />
                </ActionIcon>
              </Link>
            </Tooltip>
            <Tooltip label="Ver mi Linkedin">
              <Link href="mailto:wilcirom@gmail.com" target="_blank">
                <ActionIcon size="lg">
                  <IconBrandGmail size="1.5rem" stroke={1.5} />
                </ActionIcon>
              </Link>
            </Tooltip>
            <Tooltip label="Ver mi perfil en Github">
              <Link href="http://github.com/WilferCiro" target="_blank">
                <ActionIcon size="lg">
                  <IconBrandGithub size="1.5rem" stroke={1.5} />
                </ActionIcon>
              </Link>
            </Tooltip>
          </Group>
        </Container>
      </div>
    </div>
  );
};

export default BlogPage;
