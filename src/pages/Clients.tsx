import { useSearchParams } from "react-router-dom";

export const Clients = () => {
  const [searchParams] = useSearchParams();
  const waid = searchParams.get("waid"); // devuelve string | null

  return (
    <>
      <h1>Esta es una página dedicada a los clientes</h1>
      {waid && (
        <p className="text-xl mt-4 text-gray-700">
          Número recibido por URL: <strong>{waid}</strong>
        </p>
      )}
    </>
  );
};
