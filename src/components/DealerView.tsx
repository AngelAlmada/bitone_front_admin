import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { API_ROUTES } from "../routes/apiConfig";
import type { DealerData } from "../interfaces/Dealer";

const DealerView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem("rol") || "";

  const [dealer, setDealer] = useState<DealerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dealer data cuando el componente se monta o cambia el id
  useEffect(() => {
    if (!id) {
      setError("ID del dealer no proporcionado");
      setLoading(false);
      return;
    }

    const fetchDealerData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_ROUTES.UPDATE_DEALER(id), {
          headers: {
            Authorization: userRole,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setDealer({
          id,
          name: data.name || "No disponible",
          last_name: data.last_name || "No disponible",
          last_name2: data.last_name2 || "No disponible",
          phone: data.phone || "No disponible",
          status: data.status || "No disponible",
          imageUrl: data.imageUrl || null,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchDealerData();
  }, [id, userRole]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-blue-600 font-semibold">
          Cargando datos del dealer...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <div className="text-center text-red-600 font-medium py-4">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mt-4"
        >
          <ChevronLeft size={24} />
          <span className="ml-1 font-semibold">Volver</span>
        </button>
      </div>
    );
  }

  if (!dealer) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <div className="text-center text-gray-600 font-medium py-4">
          No se encontraron datos del dealer
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mt-4"
        >
          <ChevronLeft size={24} />
          <span className="ml-1 font-semibold">Volver</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ChevronLeft size={24} />
        <span className="ml-1 font-semibold text-lg">Volver</span>
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Información del Dealer
      </h2>

      <div className="flex flex-col items-center mb-8">
        {dealer.imageUrl ? (
          <img
            src={dealer.imageUrl}
            alt={`${dealer.name} ${dealer.last_name}`}
            className="w-40 h-40 object-cover rounded-full border-4 border-blue-100 shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-profile.png";
            }}
          />
        ) : (
          <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-100 shadow-md">
            <span className="text-gray-500">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Nombre completo</h3>
          <p className="text-lg font-semibold text-gray-800">
            {dealer.name} {dealer.last_name} {dealer.last_name2}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Teléfono</h3>
          <p className="text-lg font-semibold text-gray-800">{dealer.phone}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Estado</h3>
          <div className="flex items-center">
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${
                dealer.status === "A" ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <p className="text-lg font-semibold text-gray-800">
              {dealer.status === "A" ? "Activo" : "Inactivo"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerView;