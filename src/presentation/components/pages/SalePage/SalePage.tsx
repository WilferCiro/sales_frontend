"use client";
import {
  Button,
  Card,
  Divider,
  Group,
  Modal,
  Space,
  Text,
  Title,
} from "@mantine/core";
import TableComponent from "../../molecules/TableComponent/TableComponent";
import styles from "./styles.module.css";
import { useMemo, useState } from "react";
import SelectSearchSale from "../../atoms/SelectSearchSale/SelectSearchSale";
import { getTableSaleDefinition } from "@/data/tables/sale.table";
import { SaleSchema } from "@/domain/schemas/SaleSchema";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import AsyncButton from "../../atoms/AsyncButton/AsyncButton";
import { useMutation } from "react-query";
import { addSaleService } from "@/data/services/sale.services";
import GenericForm from "../../organisms/GenericForm/GenericForm";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { getSellClientFormDefinition } from "@/data/forms/sell_client.form";
import { SaleClientSchema } from "@/domain/schemas/SaleStoreSchema";
import { notifications } from "@mantine/notifications";

const calculateTotal = (data: SaleSchema[]) => {
  let price = 0;
  data.forEach((dt: SaleSchema) => {
    price += (dt?.price || 0) * dt.quantity;
  });
  return getPriceFormat(price);
};

const SalePage = () => {
  const fieldsClient = useMemo(() => getSellClientFormDefinition(), []);

  const [tableData, setTableData] = useState<SaleSchema[]>([]);
  const [visibleResume, setVisibleResume] = useState<boolean>(false);
  const { form: formSave } = useCustomForm<SaleClientSchema>(fieldsClient);

  const mutationStore = useMutation({
    mutationFn: addSaleService,
  });

  const addProduct = (product: SaleSchema) => {
    const index = tableData.findIndex(
      (row: SaleSchema) => row.id === product.id
    );
    if (index !== -1) {
      onChangeQuantity(tableData[index].quantity + 1, product.id);
    } else {
      setTableData((last) => [...last, { ...product, quantity: 1 }]);
    }
  };

  const onChangeQuantity = (value: number, id?: number) => {
    if (id) {
      setTableData((last) => {
        const lastData = [...last];
        const index = lastData.findIndex((row: SaleSchema) => row.id === id);
        if (index !== -1) {
          lastData[index]["quantity"] = value;
        }
        return lastData;
      });
    }
  };

  const columns = useMemo(
    () => getTableSaleDefinition({ changeQuantity: onChangeQuantity }),
    []
  );

  const showModalResume = () => {
    setVisibleResume(true);
  };
  const hideModalResume = () => {
    setVisibleResume(false);
  };
  const storeSale = async (): Promise<boolean> => {
    const client = formSave.getValues();
    const res = await mutationStore.mutateAsync({ data: tableData, client });
    if (res !== null) {
      setTableData([]);
      setVisibleResume(false);

      notifications.show({
        title: "Venta guardada con éxito",
        message: "La venta se registró exitosamente",
        color: "green",
      });
    }
    return res !== null;
  };
  return (
    <>
      <Card className={styles.card_total} withBorder>
        <Title order={4}>Total:</Title>
        <Title order={2}>{calculateTotal(tableData)}</Title>
        <Divider m={10} />
        <Button onClick={showModalResume} disabled={tableData.length === 0}>
          Guardar venta
        </Button>
      </Card>

      <Modal
        title="Resumen de venta"
        opened={visibleResume}
        onClose={hideModalResume}
      >
        <b>Total: {calculateTotal(tableData)}</b>
        <Divider m={10} />
        <h3>Datos del cliente</h3>
        <Text>*No son requeridos</Text>
        <Space h="lg" />
        <GenericForm form={formSave} fields={fieldsClient} />
        <Space h="lg" />
        <Divider m={10} />
        <Group position="right" spacing="sm">
          <AsyncButton label="Confirmar guardado" onClick={storeSale} />
        </Group>
      </Modal>

      <div className={styles.select_sell}>
        <SelectSearchSale onChange={addProduct} endpoint="products/search" />
      </div>

      <TableComponent columns={columns} data={tableData} showEmpty={false} />
    </>
  );
};

export default SalePage;
