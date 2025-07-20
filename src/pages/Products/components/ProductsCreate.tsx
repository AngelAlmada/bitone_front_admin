import { useState } from "react";
import { Products } from "../interfaces/InterfacesProducts";

export const ProductsCreate = () => {
  const [product, setProduct] = useState<Products>();

    

  return (
    <>
      {!id ? <h1>Crear Producto</h1> : <h1>Actualizar Producto</h1>}
      <div>
        <form>
          <div>
            <label></label>
          </div>
        </form>
      </div>
    </>
  );
};
