"use client";
import { AppShell, Card } from "@mantine/core";
import CustomHeader from "../../molecules/CustomHeader/CustomHeader";
import CustomFooter from "../../molecules/CustomFooter/CustomFooter";
import CustomNavBar from "../../molecules/CustomNavBar";
import { useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      navbar={<CustomNavBar opened={opened} />}
      footer={<CustomFooter />}
      header={<CustomHeader setOpened={setOpened} opened={opened} />}
    >
      <Card style={{ minHeight: "83vh"}}>{children}</Card>
    </AppShell>
  );
}
