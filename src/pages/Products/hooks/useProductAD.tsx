// utils/productActions.ts
import { API_ROUTES } from "../../../routes/apiConfig";
import { IProducts } from "../interfaces/InterfacesProducts";

export const updateProductStatus = async (
  product: IProducts,
  status: string,
  navigate: (path: string) => void
) => {
  try {
    const productClean = {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      status: status,
    };

    const res = await fetch(`${API_ROUTES.CREATE_PRODUCT}/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productClean),
    });

    if (res.ok) {
      navigate("/productsList");
    } else {
      const data = await res.json();
      console.error(data.message || "Error en la operación");
    }
  } catch (err: any) {
    throw new Error("Error al actualizar el status: " + err.message);
  }
};
