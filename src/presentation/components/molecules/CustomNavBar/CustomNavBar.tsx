import { NavLink, Navbar } from "@mantine/core";
import { nprogress } from "@mantine/nprogress";
import {
  IconHome2,
  IconUsersGroup,
  IconShoppingCart,
  IconFileInvoice,
  IconShoppingBag,
  IconBuilding,
  IconBox,
  IconTools,
  IconCategory,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  opened: boolean;
}

const CustomNavBar = ({ opened }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const goTo = (path: string) => {
    nprogress.reset();
    nprogress.start();
    router.push(path);
  };
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 150, lg: 210 }}
    >
      <NavLink
        active={pathname === "/org/home"}
        label="Inicio"
        icon={<IconHome2 size="1rem" stroke={1.5} />}
        onClick={() => goTo("/org/home")}
      />
      <NavLink
        active={pathname === "/org/sale"}
        label="Vender"
        icon={<IconShoppingCart size="1rem" stroke={1.5} />}
        onClick={() => goTo("/org/sale")}
      />
      <NavLink
        active={pathname === "/org/invoices"}
        label="Facturas"
        icon={<IconFileInvoice size="1rem" stroke={1.5} />}
        onClick={() => goTo("/org/invoices")}
      />
      <NavLink
        active={pathname === "/org/shops"}
        label="Tiendas"
        icon={<IconShoppingBag size="1rem" stroke={1.5} />}
        onClick={() => goTo("/org/shops")}
      />
      <NavLink
        active={pathname === "/org/headquarters"}
        label="Sedes"
        icon={<IconBuilding size="1rem" stroke={1.5} />}
        onClick={() => goTo("/org/headquarters")}
      />
      <NavLink
        active={pathname === "/org/users"}
        label="Usuarios"
        icon={<IconUsersGroup size="1rem" stroke={1.5} />}
        onClick={() => goTo("/org/users")}
      />
      <NavLink
        active={pathname === "/org/products"}
        label="Productos"
        icon={<IconBox size="1rem" stroke={1.5} />}
        onClick={() => goTo("/org/products")}
      />
      <NavLink label="Config" icon={<IconTools size="1rem" stroke={1.5} />}>
        <NavLink
          active={pathname === "/org/product_categories"}
          label="Categorias de productos"
          icon={<IconCategory size="1rem" stroke={1.5} />}
          onClick={() => goTo("/org/product_categories")}
        />
      </NavLink>
    </Navbar>
  );
};

export default CustomNavBar;
