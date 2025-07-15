import React from 'react';

interface ClientCardProps {
  nombre: string;
  numero: string;
}

const ClientCard: React.FC<ClientCardProps> = ({ nombre, numero }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-md w-full max-w-md mb-6">
      <p className="text-lg font-medium text-gray-700 mb-2">
        👤 <span className="font-normal">{nombre}</span>
      </p>
      <p className="text-lg font-medium text-gray-700">
        📞 <span className="font-normal">{numero}</span>
      </p>
    </div>
  );
};

export default ClientCard;
