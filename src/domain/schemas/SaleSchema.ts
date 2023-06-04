import { ProductSchema } from "./ProductSchema";

export interface SaleSchema extends Partial<ProductSchema> {
  quantity: number;
  total: number;
}
