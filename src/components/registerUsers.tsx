import React, { useState } from "react";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [rol, setRol] = useState("");
  const [idDealer, setIdDealer] = useState("");
  const [error, setError] = useState("");

  const isRepartidor = rol === "RP";

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
      rol, // char(2)
      id_dealer: isRepartidor ? idDealer : "", // si no es repartidor se manda vacío
      status: "A", // siempre A
    };

    try {
      const res = await fetch("http://localhost:3000/create/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: rol, // aquí va el rol
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onRegisterSuccess();
      } else {
        const data = await res.json();
        setError(data.message || "Error en el registro.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Registrar usuario</h2>
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
            autoComplete="new-password" // <--- Aquí
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password" // <--- Aquí
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Confirmar contraseña</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
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
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
