import { fetchClient } from "../client/fetchClient";
import { ShopSchema } from "@/domain/schemas/ShopSchema";

const endpoint = `${process.env.API_DASHBOARD_URL}/shops`;

export async function addShopService(
  data: ShopSchema
): Promise<ShopSchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data, owner: 10 },
  });
}

export async function editShopService(
  data: Partial<ShopSchema>
): Promise<ShopSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data.id}`,
    method: "PATCH",
    body: { ...data, id: undefined },
  });
}

export async function exportShopService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "shops.xlsx",
  });
}

export async function getShopById(id: number): Promise<ShopSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${id}`,
    method: "GET",
  });
}
