import { ProductCategorySchema } from "@/domain/schemas/ProductCategorySchema";
import { fetchClient } from "../client/fetchClient";

const endpoint = `${process.env.API_DASHBOARD_URL}/product_categories`;

export async function addProductCategoryService(
  data: ProductCategorySchema
): Promise<ProductCategorySchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data },
  });
}

export async function editProductCategoryService(
  data: Partial<ProductCategorySchema>
): Promise<ProductCategorySchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data.id}`,
    method: "PATCH",
    body: { ...data, id: undefined },
  });
}

export async function exportProductCategoryService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "products.xlsx",
  });
}
