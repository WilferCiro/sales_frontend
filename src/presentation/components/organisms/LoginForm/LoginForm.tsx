"use client";

import Link from "next/link";
import style from "./style.module.css";
import {
  Avatar,
  Button,
  Card,
  Code,
  Divider,
  List,
  Popover,
  Space,
  ThemeIcon,
} from "@mantine/core";
import {
  LoginServiceProps,
  loginService,
} from "@/data/services/login.services";
import constantStore from "@/data/constantStore";
import { useRouter } from "next/navigation";
import { getLoginFormDefinition } from "@/data/forms/login.form";
import GenericForm from "../GenericForm";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { LoginSchema } from "@/domain/schemas/LoginSchema";
import { useMemo } from "react";
import { useMutation } from "react-query";
import { IconKey, IconUser } from "@tabler/icons-react";
import { nprogress } from "@mantine/nprogress";

const LoginForm = () => {
  const mutation = useMutation({
    mutationFn: loginService,
    onSuccess: (result: { token: string } | null) => {
      if (result?.token) {
        nprogress.reset();
        nprogress.start();
        constantStore.token.set(result.token);
        router.push("/org/home");
      }
    },
  });

  const fieldsForm = useMemo(() => getLoginFormDefinition(), []);
  const { form } = useCustomForm<LoginSchema>(fieldsForm);
  const router = useRouter();

  const onFinish = async () => {
    await form.trigger();
    const valid = form.formState.isValid;
    if (valid) {
      mutation.mutate(form.getValues() as LoginServiceProps);
    }
  };

  return (
    <Card className={style.form}>
      <div>
        <h2>Iniciar sesión</h2>
        <GenericForm form={form} fields={getLoginFormDefinition()} />
        <Space h="md" />
        <Button fullWidth onClick={onFinish} loading={mutation.isLoading}>
          Iniciar sesión
        </Button>
        <Divider my="xs" label="Ayuda" labelPosition="center" />
        <List spacing="xs" size="sm" center>
          <List.Item
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconUser size="1rem" />
              </ThemeIcon>
            }
          >
            <Code>Email:</Code> admin@admin.com
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconKey size="1rem" />
              </ThemeIcon>
            }
          >
            <Code>Contraseña:</Code> admin
          </List.Item>
        </List>
      </div>
    </Card>
  );
};

export default LoginForm;
