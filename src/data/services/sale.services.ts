import { SaleSchema } from "@/domain/schemas/SaleSchema";
import {
  SaleClientSchema,
  SaleStoreSchema,
} from "@/domain/schemas/SaleStoreSchema";
import { fetchClient } from "../client/fetchClient";

const endpoint = `${process.env.API_SALES_URL}/sales`;

interface Props {
  data: SaleSchema[];
  client: SaleClientSchema;
}

export async function addSaleService({
  data,
  client,
}: Props): Promise<SaleStoreSchema | null> {
  const body = {
    products: data.map((sale: SaleSchema) => ({
      id: sale.id,
      name: sale.name,
      quantity: sale.quantity,
      unit_price: sale.price,
      discount_percent: 0,
    })),
    headquarter: {
      id: 1,
      name: "Testing",
      shop: {
        id: 1,
        name: "Testing",
      },
    },
    client,
  };

  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body,
  });
}

export async function exportInvoiceSale(
  id: number | string
): Promise<SaleStoreSchema | null> {
  return await fetchClient({
    endpoint: endpoint + `/export/${id}`,
    method: "POST",
    fileName: "invoice.pdf",
    isFile: true,
  });
}
