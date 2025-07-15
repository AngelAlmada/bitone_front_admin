import { ProductType } from "../enums/enumsProducts";

export interface Products {
  name: string;
  description: string;
  category: ProductType;
  price: number;
  status: string;
}
