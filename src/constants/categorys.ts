// categoryMap.ts
import { ProductType } from "../pages/Products/enums/enumsProducts";

export const categoryMap: Record<ProductType, { label: string; color: string }> = {
  [ProductType.TACOSVAPOR]: { label: "tacos de vapor", color: "bg-red-100 text-red-700" },
  [ProductType.TACOSGUISO]: { label: "tacos de guiso", color: "bg-orange-100 text-orange-700" },
  [ProductType.TACOSCANASTA]: { label: "tacos de canasta", color: "bg-yellow-100 text-yellow-700" },
  [ProductType.BEBIDAS]: { label: "bebidas", color: "bg-blue-100 text-blue-700" },
};