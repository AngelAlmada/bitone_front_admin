import { useEffect, useState } from 'react';
import ClientCard from '../components/ClientCard';
import OrderTypeSelector from '../components/OrderTypeSelector';

const OrderTypePage = () => {
  const [nombre, setNombre] = useState<string>('');
  const [numero, setNumero] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('waid');

    console.log('🌍 API_URL:', import.meta.env.VITE_API_URL);
    
    if (!token || token.trim() === '') {
      setNombre('No disponible');
      setNumero('-');
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/client/${encodeURIComponent(token)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error en la respuesta del servidor');
        return res.json();
      })
      .then((data) => {
        setNombre(data.nombre);
        setNumero(data.numero);
      })
      .catch((err) => {
        console.error('❌ Error al cargar cliente:', err);
        setNombre('Error al obtener');
        setNumero('-');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 py-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold text-center mb-4">👋 Bienvenido</h2>

      {loading ? (
        <p className="text-gray-600 text-center mb-4">Cargando datos del cliente...</p>
      ) : (
        <ClientCard nombre={nombre} numero={numero} />
      )}

      <OrderTypeSelector />
    </div>
  );
};

export default OrderTypePage;
