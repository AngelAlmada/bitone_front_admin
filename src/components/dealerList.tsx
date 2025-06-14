import React, { useEffect, useState } from "react";
import { Eye, Edit2, Slash, Plus, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../routes/apiConfig";

interface Dealer {
  id: string;
  name: string;
  last_name: string;
  last_name2: string;
  phone: string;
  status: string;
  imageUrl?: string | null;
  email?: string;
  rol?: string;
  id_dealer?: string;
}

const DealerList: React.FC = () => {
  const navigate = useNavigate();
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const rol = sessionStorage.getItem("rol");
        if (!rol) throw new Error("No se encontró el rol en sessionStorage.");

        const res = await fetch(API_ROUTES.LIST_DEALER, {
          headers: {
            Authorization: `${rol}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            `Error al obtener repartidores: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();
        setDealers(data);
      } catch (err: any) {
        console.error("Error en fetchDealers:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);

  const handleCreateUser = () => navigate("/RegisterDealerForm");
  const handleView = (dealer: Dealer) =>
    navigate(`/dealerView/${dealer.id}`);
  const handleEdit = (dealer: Dealer) =>
    navigate(`/RegisterDealerForm/${dealer.id}`);

  const handleDeactivate = async (dealer: Dealer) => {
    if (window.confirm(`¿Desactivar a ${dealer.name}?`)) {
      try {
        const res = await fetch(API_ROUTES.UPDATE_DEALER(dealer.id), {
          method: "DELETE",
          headers: {
            Authorization: `${sessionStorage.getItem("rol")}`,
          },
        });
        if (!res.ok) throw new Error("Error al desactivar el usuario");
        setDealers((prev) =>
          prev.map((d) => (d.id === dealer.id ? { ...d, status: "I" } : d))
        );
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleActivate = async (dealer: Dealer) => {
    if (window.confirm(`¿Activar a ${dealer.name}?`)) {
      try {
        const res = await fetch(API_ROUTES.ACTIVATE_DEALER(dealer.id), {
          method: "POST",
          headers: {
            Authorization: `${sessionStorage.getItem("rol")}`,
          },
        });
        if (!res.ok) throw new Error("Error al activar el usuario");
        setDealers((prev) =>
          prev.map((d) => (d.id === dealer.id ? { ...d, status: "A" } : d))
        );
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-blue-600 font-semibold">
          Cargando repartidores...
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
        <h2 className="text-3xl font-bold text-gray-800">
          Lista de Repartidores
        </h2>
        <button
          onClick={handleCreateUser}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Crear repartidor
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left">Foto</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Teléfono</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dealers.map((dealer) => (
              <tr
                key={dealer.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="py-3 px-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {dealer.imageUrl ? (
                      <img
                        src={dealer.imageUrl}
                        alt={`${dealer.name} ${dealer.last_name}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/default-profile.png";
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 text-xs text-center">
                        Sin foto
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3 px-6 font-medium">
                  {`${dealer.name} ${dealer.last_name} ${dealer.last_name2}`}
                </td>
                <td className="py-3 px-6">{dealer.phone}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dealer.status === "A"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {dealer.status === "A" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="py-3 px-6 flex gap-2">
                  <button
                    onClick={() => handleView(dealer)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                    title="Ver información"
                  >
                    <Eye size={16} /> Ver
                  </button>
                  <button
                    onClick={() => handleEdit(dealer)}
                    className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 text-xs"
                    title="Editar"
                  >
                    <Edit2 size={16} /> Editar
                  </button>
                  {dealer.status === "A" ? (
                    <button
                      onClick={() => handleDeactivate(dealer)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 text-xs"
                      title="Desactivar"
                    >
                      <Slash size={16} /> Desactivar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate(dealer)}
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

export default DealerList;
