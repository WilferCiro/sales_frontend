export interface SaleClientSchema {
  name: string;
  document: string;
  email: string;
}
export interface SaleStoreSchema {
  id?: number | string;
  total: number;
  tip_percent: number;
  products: {
    id: number;
    name: string;
    quantity: number;
    unit_price: number;
    discount_percent: number;
  }[];
  headquarter: {
    id: number;
    name: string;
    shop: {
      id: number;
      name: string;
    };
  };
  client: SaleClientSchema;
  createdAt?: Date;
  updatedAt?: Date;
}
