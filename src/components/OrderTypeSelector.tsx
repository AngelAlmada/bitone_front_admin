import React from 'react';

const OrderTypeSelector: React.FC = () => {
  return (
    <div className="mt-8 flex flex-col items-center gap-4 px-4">
      <h3 className="text-lg font-bold text-center mb-4">
        Selecciona el tipo de pedido
      </h3>

      <button className="w-full max-w-[350px] px-6 py-4 text-lg text-white bg-green-600 rounded-xl shadow-md hover:bg-green-700 active:scale-95 transition-transform">
        🏬 Recoger en tienda
      </button>

      <button className="w-full max-w-[350px] px-6 py-4 text-lg text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition-transform">
        🏍️ Entrega a domicilio
      </button>
    </div>
  );
};

export default OrderTypeSelector;
