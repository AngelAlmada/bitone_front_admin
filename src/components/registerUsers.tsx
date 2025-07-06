import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { API_ROUTES } from "../routes/apiConfig";
import { useDealerList } from "../hooks/dealer/useDealerList";
import { useDetailId } from "../hooks/users/useDetailId";

interface RegisterUserProps {
  onRegisterSuccess: () => void;
}

const ROLES = [
  { label: "Administrador", value: "A" },
  { label: "Recepcionista", value: "RE" },
  { label: "Repartidor", value: "RP" },
  { label: "Supervisor", value: "SU" },
];

const RegisterUser: React.FC<RegisterUserProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { dealers } = useDealerList();

  const {
    Dname,
    Demail,
    Dpassword,
    Dconfirm,
    Drol,
    DidDealer,
    Derrors,
    Dloading,
    DisRepartidor,
  } = useDetailId(id);

  const [name, setName] = useState(Dname);
  const [email, setEmail] = useState(Demail);
  const [password, setPassword] = useState(Dpassword);
  const [confirm, setConfirm] = useState(Dconfirm);
  const [rol, setRol] = useState(Drol);
  const [idDealer, setIdDealer] = useState(DidDealer);
  const [loading, setLoading] = useState(Dloading);
  const isRepartidor = DisRepartidor;

  useEffect(() => {
    if (Dname) setName(Dname);
    if (Demail) setEmail(Demail);
    if (Dpassword) setPassword(Dpassword);
    if (Dconfirm) setConfirm(Dconfirm);
    if (Drol) setRol(Drol);
    if (DidDealer) setIdDealer(DidDealer);
    setLoading(Dloading);
  }, [Dname, Demail, Dpassword, Dconfirm, Drol, DidDealer, Dloading]);

  const [error, setError] = useState(Derrors);

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

    const payload: any = {
      name,
      email,
      password,
      rol,
      status: "A",
    };

    // Si el rol es repartidor, añade id_dealer como string
    if (rol === "RP" && idDealer) {
      payload.id_dealer = idDealer;
    }

    console.log("ID del repartidor seleccionado:", idDealer);

    try {
      const url = id ? API_ROUTES.UPDATE_USER(id) : API_ROUTES.CREATE_USER;

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
      <button
        onClick={() => navigate("/usersList")}
        className="flex items-center text-blue-600 hover:text-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        aria-label="Volver a la lista de usuarios"
      >
        <ChevronLeft size={24} />
        <span className="ml-1 font-semibold text-lg">Volver</span>
      </button>
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
            <label className="block mb-1 font-medium">
              Selecciona un Dealer
            </label>
            <select
              value={idDealer}
              onChange={(e) => setIdDealer(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Selecciona un dealer --</option>
              {dealers.map((dealer) => (
                <option key={dealer.id} value={dealer.id}>
                  {dealer.name} {dealer.last_name} {dealer.last_name2}
                </option>
              ))}
            </select>
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
