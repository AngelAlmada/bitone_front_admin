import { useEffect, useState } from "react";
import { API_ROUTES } from "../../routes/apiConfig";

export const useDealerList = () => {

  const [dealers, setDealers] = useState<any[]>([]);


    // 🔁 Cargar lista de dealers
      useEffect(() => {
        fetch(API_ROUTES.LIST_DEALER, {
          headers: {
            Authorization: sessionStorage.getItem("rol") || "", // por si es null
          },
        })
          .then(async (res) => {
            if (!res.ok) throw new Error("Error al obtener los dealers");
            const data = await res.json();
            setDealers(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);

    return ({dealers}
  )
}
