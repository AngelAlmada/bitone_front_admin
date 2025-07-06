import { useEffect, useState } from "react";
import type { IUser } from "../../interfaces/User";
import { API_ROUTES } from "../../routes/apiConfig";

type User = IUser

export const useFetchUsers = (initialUsers: User[] = []) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ROUTES.LIST_USERS);
      if (!res.ok) throw new Error("Error al obtener usuarios");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
};
