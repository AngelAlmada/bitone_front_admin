import { useProductsList } from "./hooks/useProductsList";
import { categoryMap } from "../../constants/categorys";
import { ProductType } from "./enums/enumsProducts";
import { Eye, Edit2, Slash, Plus, CheckCircle } from "lucide-react";
import { ProductsCreate } from "./components/ProductsCreate";
import { useNavigate } from "react-router-dom";

export const Products = () => {
const navigate = useNavigate();

  const { products, load, error } = useProductsList();

  const handleView = () => {};

  const handleEdit = () => {};

  const handleDeactivate = () => {};

  const handleActivate = () => {};

  const handleCreateProduct = () => {
    navigate("/registerProduct")
  };
  
  if (load)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-blue-600 font-semibold">
          Cargando productos...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-medium py-4">{error}</div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Lista de Productos</h2>
        <button

          onClick={handleCreateProduct}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Agregar Producto
        </button>
        {/* Aquí puedes poner un botón para agregar productos si lo deseas */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-6 text-left">Categoría</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((p, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="py-3 px-6">{p.name}</td>
                <td className="py-3 px-6">{p.description}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      categoryMap[p.category as ProductType]?.color ||
                      "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {categoryMap[p.category as ProductType]?.label ||
                      p.category}
                  </span>
                </td>
                <td className="py-3 px-6 flex gap-2">
                  <button
                    onClick={() => handleView()}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                    title="Ver información"
                  >
                    <Eye size={16} /> Ver
                  </button>
                  <button
                    onClick={() => handleEdit()}
                    className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 text-xs"
                    title="Editar"
                  >
                    <Edit2 size={16} /> Editar
                  </button>
                  {p.status === "A" ? (
                    <button
                      onClick={() => handleDeactivate()}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 text-xs"
                      title="Desactivar"
                    >
                      <Slash size={16} /> Desactivar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate()}
                      className="flex items-center gap-1 text-green-600 hover:text-green-800 text-xs"
                      title="Activar"
                    >
                      <CheckCircle size={16} /> Activar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
