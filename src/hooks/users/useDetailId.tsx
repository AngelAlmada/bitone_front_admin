import { useEffect, useState } from "react";
import { API_ROUTES } from "../../routes/apiConfig";

export const useDetailId = (id: string | undefined) => {
  const [Dname, setName] = useState("");
  const [Demail, setEmail] = useState("");
  const [Dpassword, setPassword] = useState("");
  const [Dconfirm, setConfirm] = useState("");
  const [Drol, setRol] = useState("");
  const [DidDealer, setIdDealer] = useState("");
  const [Derrors, setError] = useState("");
  const [Dloading, setLoading] = useState(false);
  const DisRepartidor = Drol === "RP";

  // 🔁 Cargar datos si es edición
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(API_ROUTES.LIST_USER(id))
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();
        setName(data.name || "");
        setEmail(data.email || "");
        setPassword("");
        setConfirm("");
        setRol(data.rol || "");
        setIdDealer(data.id_dealer || "");
      })
      .catch((err) => setError(err.message || "Error desconocido"))
      .finally(() => setLoading(false));
  }, [id]);

  return {
    Dname,
    Demail,
    Dpassword,
    Dconfirm,
    Drol,
    DidDealer,
    Derrors,
    Dloading,
    DisRepartidor
  };
};
