import React, { useEffect, useState } from 'react';
import ClientCard from '../components/ClientCard';
import OrderTypeSelector from '../components/OrderTypeSelector';

const OrderTypePage = () => {
  const [nombre, setNombre] = useState<string>('');
  const [numero, setNumero] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('cliente');

    if (!token) {
      setNombre('No disponible');
      setNumero('-');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/api/client/${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((data) => {
        setNombre(data.nombre);
        setNumero(data.numero);
      })
      .catch((err) => {
        console.error(err);
        setNombre('Error');
        setNumero('-');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👋 Bienvenido</h2>

      {loading ? (
        <p style={styles.loading}>Cargando datos del cliente...</p>
      ) : (
        <ClientCard nombre={nombre} numero={numero} />
      )}

      <OrderTypeSelector />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '16px',
    maxWidth: '480px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '12px',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    color: '#666',
  },
};

export default OrderTypePage;
