import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  rol: string;
  id_dealer: string;
  status: string;
}

const roleMap: Record<string, { label: string; color: string }> = {
  A: { label: "Administrador", color: "bg-blue-100 text-blue-700" },
  RE: { label: "Recepcionista", color: "bg-purple-100 text-purple-700" },
  RP: { label: "Repartidor", color: "bg-yellow-100 text-yellow-700" },
  SU: { label: "Supervisor", color: "bg-pink-100 text-pink-700" },
};

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/list/users/${id}`);
        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-blue-600 font-semibold">Cargando usuario...</span>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-medium py-4">{error}</div>
    );

  if (!user)
    return (
      <div className="text-center text-gray-600 font-medium py-4">
        No se encontró el usuario.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Contenedor flex para botón y título */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/usersList")}
          className="flex items-center text-blue-600 hover:text-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label="Volver a la lista de usuarios"
        >
          <ChevronLeft size={24} />
          <span className="ml-1 font-semibold text-lg">Volver</span>
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center flex-grow">
          Detalles del Usuario
        </h2>

        {/* Espacio invisible para balancear el flex */}
        <div style={{ width: 96 }} />
      </div>

      <div className="space-y-4 text-gray-700 text-base">
        <div>
          <span className="font-semibold text-gray-900">Nombre:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold text-gray-900">Correo:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold text-gray-900">Rol:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              roleMap[user.rol]?.color || "bg-gray-200 text-gray-700"
            }`}
          >
            {roleMap[user.rol]?.label || user.rol}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-900">ID Dealer:</span> {user.id_dealer || "—"}
        </div>
        <div>
          <span className="font-semibold text-gray-900">Contraseña:</span> {user.password}
        </div>
        <div>
          <span className="font-semibold text-gray-900">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              user.status === "A"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.status === "A" ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
