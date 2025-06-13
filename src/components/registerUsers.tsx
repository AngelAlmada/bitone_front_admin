import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface RegisterUserProps {
  onRegisterSuccess: () => void;
}

const ROLES = [
  { label: "Administrador", value: "A" },
  { label: "Recepcionista", value: "RE" },
  { label: "Repartidor", value: "RP" },
  { label: "Supervisor", value: "SU" },
];

const RegisterUser: React.FC<RegisterUserProps> = ({ onRegisterSuccess }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [rol, setRol] = useState("");
  const [idDealer, setIdDealer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isRepartidor = rol === "RP";

  // Fetch user data si hay id (modo edición)
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`http://localhost:3000/list/users/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();
        setName(data.name || "");
        setEmail(data.email || "");
        // Por seguridad, deja password vacío
        setPassword("");
        setConfirm("");
        setRol(data.rol || "");
        setIdDealer(data.id_dealer || "");
      })
      .catch((err) => setError(err.message || "Error desconocido"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!rol) {
      setError("Selecciona un rol.");
      return;
    }

    const payload = {
      name,
      email,
      password,
      rol,
      id_dealer: isRepartidor ? Number(idDealer) : undefined,
      status: "A",
    };

    try {
      const url = id
        ? `http://localhost:3000/create/user/${id}`
        : "http://localhost:3000/create/user";

      const method = id ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: rol,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Redirige al componente de lista de usuarios
        navigate("/usersList");
      } else {
        const data = await res.json();
        setError(data.message || "Error en la operación.");
      }
    } catch {
      setError("Error de conexión con el servidor.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-blue-600 font-semibold">
          Cargando usuario...
        </span>
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        {id ? "Actualizar usuario" : "Registrar usuario"}
      </h2>
      {error && (
        <div className="mb-4 text-red-600 text-center text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="new-password"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!id} // si es edición, la contraseña no es obligatoria
            autoComplete="new-password"
            className="w-full border px-3 py-2 rounded"
            placeholder={id ? "Deja vacío para no cambiar" : ""}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Confirmar contraseña</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required={!id} // igual que contraseña
            className="w-full border px-3 py-2 rounded"
            placeholder={id ? "Deja vacío para no cambiar" : ""}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rol</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Selecciona un rol --</option>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {isRepartidor && (
          <div>
            <label className="block mb-1 font-medium">ID Dealer</label>
            <input
              type="text"
              value={idDealer}
              onChange={(e) => setIdDealer(e.target.value)}
              required={isRepartidor}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {id ? "Actualizar" : "Registrar"}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
