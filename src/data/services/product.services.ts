import { fetchClient } from "../client/fetchClient";
import { ProductSchema } from "@/domain/schemas/ProductSchema";

const endpoint = `${process.env.API_DASHBOARD_URL}/products`;

export async function addProductService(
  data: ProductSchema
): Promise<ProductSchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data, owner: 10 },
  });
}

export async function editProductService(
  data: Partial<ProductSchema>
): Promise<ProductSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data.id}`,
    method: "PATCH",
    body: { ...data, id: undefined },
  });
}

export async function exportProductService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "products.xlsx",
  });
}
