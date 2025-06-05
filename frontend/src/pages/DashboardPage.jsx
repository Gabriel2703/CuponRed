export default function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">Bienvenido al panel de control de CupónRed.</p>
        <div className="mt-6">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded">Estadísticas y resumen aquí</span>
        </div>
      </div>
    </div>
  );
} 