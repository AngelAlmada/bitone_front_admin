import type { IUser } from "../../interfaces/User";
import { API_ROUTES } from "../../routes/apiConfig";

type User = IUser;

export const useActivateUsers = (refetch: () => Promise<void>) => {
  const activate = async (user: User) => {
    if (window.confirm(`¿Activar a ${user.name}?`)) {
      try {
        const res = await fetch(API_ROUTES.DESACTIVATE_USER(user.id), {
          method: "POST",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al activar el usuario");
        }

        alert(`Usuario ${user.name} Activado correctamente.`);

        // Actualizar localmente el estado para reflejar el cambio en UI:
        await refetch();
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return { activate };
};
