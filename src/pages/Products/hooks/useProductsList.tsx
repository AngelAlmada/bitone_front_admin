import { useEffect, useState } from "react";
import { IProducts } from "../interfaces/InterfacesProducts";
import { API_ROUTES } from "../../../routes/apiConfig";

export const useProductsList = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const response = await fetch(API_ROUTES.LIST_PRODUCTS);
        const data: IProducts[] = await response.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message || "Error desconocido");
      } finally {
        setLoad(false);
      }
    };
    getListProducts();
  }, []);

  return {
    products,
    load,
    error
  };
};
