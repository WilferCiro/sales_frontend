export interface HeadquarterSchema {
  id?: string;
  name: string;
  address: string;
  city: {
    id: number;
    name: string;
  };
  shop: {
    id: number;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}
