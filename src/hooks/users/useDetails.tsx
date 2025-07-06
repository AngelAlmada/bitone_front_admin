import { useEffect, useState } from "react";
import { API_ROUTES } from "../../routes/apiConfig";
import type { IUser } from "../../interfaces/User";
import { Zap } from "lucide-react";


export const useDetails = (id: string | undefined) => {
  
    const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchUser = async () => {
    if (!id) {
      setError("ID de usuario no proporcionado.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(API_ROUTES.LIST_USER(id));
      if (!res.ok) throw new Error("Error al obtener usuario");
      const data = await res.json();
      setUser(data);
    } catch (err: any) {Zap
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, [id]);

  
    return ({
        user,
        loading,
        error
    }  )
}
