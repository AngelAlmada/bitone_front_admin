import { API_ROUTES } from "../../routes/apiConfig";
import type { IUser } from "../../interfaces/User";

type User = IUser

export const useDesactivateUser = (refetch: () => Promise<void>) => {
  const desactivate = async (user: User) => {
    if (window.confirm(`¿Desactivar a ${user.name}?`)) {
      try {
        const res = await fetch(API_ROUTES.DESACTIVATE_USER(user.id), {
          method: "DELETE",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Error al desactivar el usuario"
          );
        }

        alert(`Usuario ${user.name} desactivado correctamente.`);

        // Actualizar localmente el estado para reflejar el cambio en UI:
        await refetch();
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return {desactivate};
};
