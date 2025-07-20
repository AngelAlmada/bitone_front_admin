export enum ProductType {
  TACOSVAPOR = "TACOSVAPOR",
  TACOSGUISO = "TACOSGUISO",
  TACOSCANASTA = "TACOSCANASTA",
  BEBIDAS = "BEBIDAS",
}

export const ProductTypeLabels: Record<ProductType, string> = {
  [ProductType.TACOSVAPOR]: "tacos de vapor",
  [ProductType.TACOSGUISO]: "tacos de guiso",
  [ProductType.TACOSCANASTA]: "tacos de canasta",
  [ProductType.BEBIDAS]: "b ebidas",
};
