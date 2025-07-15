import React from "react";
import { Eye, Edit2, Slash, Plus, CheckCircle} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../interfaces/User";
import { roleMap } from "../constants/roles";
import { useFetchUsers } from "../hooks/users/useFetchUsers";
import { useDesactivateUser } from "../hooks/users/useDesactivateUser";
import { useActivateUsers } from "../hooks/users/useActivateUsers";

const UsersList: React.FC = () => {
  const navigate = useNavigate();

  // función para navegar al componente de crear usuarios
  const handleCreateUser = () => {
    navigate("/registerUsers");
  };

  // se obtiene el fetch usando la API con un Hook personalizado
  const { users, loading, error, refetch } = useFetchUsers();

  // Se obtiene el hook personalizado para desactivar usuarios
  const { desactivate } = useDesactivateUser(refetch);

  // Se obtiene el hook personalizado para activar usuarios
  const { activate } = useActivateUsers(refetch);

  // -------------------------------------------------------- Inicio de Handle
                                                                                  
  //función para navegar al componente de ver usuarios
  const handleView = (user: IUser) => {
    navigate(`/userDetails/${user.id}`);
  };

  //Función para navegar al componente de editar usuarios
  const handleEdit = (user: IUser) => navigate(`/registerUsers/${user.id}`);

  // Función para desactivar usuarios
  const handleDeactivate = (user: IUser) => {
    desactivate(user);
  };

  const handleActivate = (user: IUser) => {
    activate(user);
  };

  // ------------------------------------------------------- Fin de Handle

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-blue-600 font-semibold">
          Cargando usuarios...
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
        <h2 className="text-3xl font-bold text-gray-800">Lista de Usuarios</h2>
        <button
          onClick={handleCreateUser}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Crear usuario
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Correo</th>
              <th className="py-3 px-6 text-left">Rol</th>
              <th className="py-3 px-6 text-left">ID Dealer</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        roleMap[user.rol]?.color || "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {roleMap[user.rol]?.label || user.rol}
                    </span>
                </td>
                <td className="py-3 px-6">{user.id_dealer || "—"}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "A"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status === "A" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="py-3 px-6 flex gap-2">
                  <button
                    onClick={() => handleView(user)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                    title="Ver información"
                  >
                    <Eye size={16} /> Ver
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 text-xs"
                    title="Editar"
                  >
                    <Edit2 size={16} /> Editar
                  </button>
                  {user.status === "A" ? (
                    <button
                      onClick={() => handleDeactivate(user)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 text-xs"
                      title="Desactivar"
                    >
                      <Slash size={16} /> Desactivar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate(user)}
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

export default UsersList;
