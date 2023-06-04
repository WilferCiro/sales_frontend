import { UserSchema } from "./UserSchema";

export interface ShopSchema {
  id?: string;
  name: string;
  nit: string;
  photo: string;
  owner: UserSchema;
  headquarters?: {
    name: string;
    id: string;
    active: boolean;
  }[];
  website: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}
