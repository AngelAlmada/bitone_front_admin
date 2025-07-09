import React from 'react';

interface ClientCardProps {
  nombre: string;
  numero: string;
}

const ClientCard: React.FC<ClientCardProps> = ({ nombre, numero }) => {
  return (
    <div style={{
      backgroundColor: '#f9f9f9',
      padding: '16px',
      borderRadius: '8px',
      marginTop: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <p><strong>👤 Nombre:</strong> {nombre}</p>
      <p><strong>📞 Teléfono:</strong> {numero}</p>
    </div>
  );
};

export default ClientCard;
