import React from 'react';

const OrderTypeSelector: React.FC = () => {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Selecciona el tipo de pedido</h3>
      <button style={styles.pickupBtn}>🏬 Recoger en tienda</button>
      <button style={styles.deliveryBtn}>🏍️ Entrega a domicilio</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center',
  },
  pickupBtn: {
    width: '90%',
    maxWidth: '350px',
    padding: '18px',
    fontSize: '18px',
    backgroundColor: '#34a853',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  deliveryBtn: {
    width: '90%',
    maxWidth: '350px',
    padding: '18px',
    fontSize: '18px',
    backgroundColor: '#4285f4',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
};

export default OrderTypeSelector;
