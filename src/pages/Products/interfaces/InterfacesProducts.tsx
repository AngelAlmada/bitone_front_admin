import { ProductType } from "../enums/enumsProducts";

export interface IProducts {
  id: string;
  name: string;
  description: string;
  category: ProductType;
  price: number;
  status: string;
}
