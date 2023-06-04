import constantStore from "@/data/constantStore";
import {
  ActionIcon,
  Avatar,
  Burger,
  Button,
  Header,
  MediaQuery,
  Menu,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { nprogress } from "@mantine/nprogress";
import {
  IconDoor,
  IconMoonStars,
  IconSun,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  setOpened: (value: boolean) => void;
  opened: boolean;
}

const CustomHeader = ({ setOpened, opened }: Props) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const closeSession = () => {
    nprogress.reset();
    nprogress.start();
    constantStore.token.remove();
    constantStore.user.remove();
    router.replace("/user/login");
  };

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <Image
            src="/images/logo.svg"
            alt="Landscape picture"
            width={50}
            height={50}
          />
        </div>
        <Menu width={200} shadow="md">
          <Menu.Target>
            <Avatar radius="xl" color="cyan">
              WC
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>

            <Menu.Item
              icon={
                dark ? (
                  <IconSun size="1.1rem" />
                ) : (
                  <IconMoonStars size="1.1rem" />
                )
              }
              component="button"
              onClick={() => toggleColorScheme()}
            >
              {dark ? <>Cambiar a claro</> : <>Cambiar a oscuro</>}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              icon={<IconDoor size="1.1rem" />}
              component="button"
              onClick={() => closeSession()}
            >
              Cerrar sesión
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </Header>
  );
};

export default CustomHeader;
