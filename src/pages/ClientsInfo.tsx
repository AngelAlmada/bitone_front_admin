import { useEffect, useState } from 'react';
import axios from 'axios';

function ClientsInfo() {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clienteEncriptado = params.get('cliente');

    console.log('🔍 Param "cliente" recibido:', clienteEncriptado); // 👈 importante para verificar si llega

    if (!clienteEncriptado || clienteEncriptado.trim() === '') {
      setNombre('No se recibió número');
      setNumero('-');
      setCargando(false);
      return;
    }

    axios
      .get(`http://localhost:3000/api/client/${encodeURIComponent(clienteEncriptado)}`)
      .then((response) => {
        console.log('✅ Respuesta del backend:', response.data);
        setNombre(response.data.nombre);
        setNumero(response.data.numero);
      })
      .catch((error) => {
        console.error('❌ Error al obtener datos del cliente:', error);
        setNombre('Error al obtener datos');
        setNumero('-');
      })
      .finally(() => setCargando(false));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Datos del cliente</h2>
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <p><strong>Nombre:</strong> {nombre}</p>
          <p><strong>Número:</strong> {numero}</p>
        </div>
      )}
    </div>
  );
}

export default ClientsInfo;
