import { useEffect, useState } from "react";
import { IProducts } from "../interfaces/InterfacesProducts";
import { API_ROUTES } from "../../../routes/apiConfig";

export const useProductId = (id: string) => {
  const [productId, setProduct] = useState<IProducts>();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`${API_ROUTES.CREATE_PRODUCT}/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        throw "Error al obtener el producto: " + err.message();
      }
    };

    getProduct();
  }, []);

  return { productId };
};
