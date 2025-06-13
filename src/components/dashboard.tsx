export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Sección de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Usuarios" value="1,234" />
        <StatCard title="Pedidos" value="567" />
        <StatCard title="Ingresos" value="$12,345" />
        <StatCard title="Visitas" value="8,900" />
      </div>

      {/* Sección de contenido adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Actividad reciente</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✔️ Pedido #123 fue completado</li>
            <li>📥 Nuevo usuario registrado</li>
            <li>🚚 Envío procesado para Pedido #122</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
          <p className="text-gray-600">No hay notificaciones pendientes.</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
