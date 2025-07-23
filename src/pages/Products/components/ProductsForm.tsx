import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProducts } from "../interfaces/InterfacesProducts";
import { API_ROUTES } from "../../../routes/apiConfig";
import { ChevronLeft } from "lucide-react";
import { ProductTypeLabels, ProductType } from "../enums/enumsProducts";
import useAlerts from "../../../hooks/useAlerts";
import { useProductId } from "../hooks/useProductId";

export const ProductsForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { productId } = useProductId(id ?? "");

  const [product, setProduct] = useState<Partial<IProducts>>({});
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { confirmDialog } = useAlerts();

  useEffect(() => {
    if (productId) {      
      const {id, ...cleanedProduct} = productId
      setProduct(cleanedProduct);
    }
  }, [productId]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Funcion para mandar los datos del formulario al backend
  const handleSave = async () => {
    const confirm = await confirmDialog(
      id ? "Actualizar producto" : "Crear producto",
      id
        ? "¿Esta seguro de actualizar este producto?"
        : "¿Esta seguro de crear este producto?"
    );

    if (!confirm) return;

    try {
      setLoading(true);

      const productToSend = { ...product, status: "activo" };

      const method = id ? "PATCH" : "POST";

      const response = await fetch(
        id ? `${API_ROUTES.CREATE_PRODUCT}/${id}` : API_ROUTES.CREATE_PRODUCT,
        {
          method,
          headers: {
            "Content-Type": "application/json", // ❗️IMPORTANTE
          },
          body: JSON.stringify(productToSend),
        }
      );

      console.log(JSON.stringify(product));

      if (response.ok) {
        navigate("/productsList");
      } else {
        const data = await response.json();
        setError(data.message || "Error en la operación");
      }
    } catch {
      console.log(error);

      throw "Hubo un error al crear el producto";
    }
    finally {
      setLoading(false)
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-blue-600 font-semibold">
          Cargando producto...
        </span>
      </div>
    );

  return (
    <>
      <div className="w-full min-h-screen px-8 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-10">
          {/* Botón Volver */}
          <button
            onClick={() => navigate("/productsList")}
            className="flex items-center text-blue-600 hover:text-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded mb-10"
            aria-label="Volver a la lista de productos"
          >
            <ChevronLeft size={28} />
            <span className="ml-2 font-semibold text-xl">Volver</span>
          </button>

          <h2 className="text-xl font-bold mb-4 text-left">
            {id ? "Actualizar producto" : "Registrar producto"}
          </h2>

          {/* Formulario */}
          <form
            onSubmit={handleOnSubmit}
            autoComplete="off"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Título */}
            <div>
              <label htmlFor="title" className="block mb-2 text-lg font-medium">
                Título del producto *
              </label>
              <input
                id="title"
                type="text"
                value={product?.name || ""}
                name="name"
                required
                onChange={handleOnChange}
                className="w-full border border-gray-300 shadow-sm px-4 py-3 rounded-md text-base"
              />
            </div>

            {/* Descripción */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-lg font-medium"
              >
                Descripción *
              </label>
              <input
                type="text"
                name="description"
                id="description"
                required
                value={product?.description || ""}
                onChange={handleOnChange}
                className="w-full border border-gray-300 shadow-sm px-4 py-3 rounded-md text-base"
              />
            </div>

            {/* Precio */}
            <div>
              <label htmlFor="price" className="block mb-2 text-lg font-medium">
                Precio *
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={product?.price || ""}
                onChange={handleOnChange}
                required
                className="w-full border border-gray-300 shadow-sm px-4 py-3 rounded-md text-base"
              />
            </div>

            {/* Tipo de producto */}
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-lg font-medium"
              >
                Tipo de producto
              </label>
              <select
                name="category"
                id="category"
                value={product?.category || ""}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    category: e.target.value as ProductType,
                  }))
                }
                className="w-full border border-gray-300 shadow-sm px-4 py-3 rounded-md text-base bg-white"
                required
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                {Object.entries(ProductTypeLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              onClick={handleSave}
            >
              {id ? "Actualizar" : "Crear"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
