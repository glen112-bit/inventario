import { useEffect, useState } from 'react'

export default function Dashboard({ data }) {
  const [stats, setStats] = useState([
    {
      title: 'Equipos Disponibles',
      value: '0',
      description: 'Listos para alquiler',
    },
    {
      title: 'Equipos Alquilados',
      value: '0',
      description: 'Actualmente fuera',
    },
    {
      title: 'Mantenimientos',
      value: '0',
      description: 'Pendientes o en proceso',
    },
    {
      title: 'Retornos Hoy',
      value: '0',
      description: 'Equipos por devolver',
    },
  ])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      // CORRECCIÓN: Apuntar al puerto 3000 y al endpoint /stats correcto
      const response = await fetch('http://localhost:3001/api/dashboard/stats')
      
      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`)
      }

      const resData = await response.json()

      // CORRECCIÓN: Acceder de forma segura a resData.stats según la estructura del backend
      if (resData.success && resData.stats) {
        const backendStats = resData.stats;
        
        setStats([
          {
            title: 'Equipos Disponibles',
            value: backendStats.equiposDisponibles ?? 0,
            description: 'Listos para alquiler',
          },
          {
            title: 'Equipos Alquilados',
            value: backendStats.equiposAlquilados ?? 0,
            description: 'Actualmente fuera',
          },
          {
            title: 'Mantenimientos',
            value: backendStats.mantenimientosPendientes ?? 0, // Ajustado al nombre del JSON del backend
            description: 'Pendientes o en proceso',
          },
          {
            title: 'Retornos Hoy',
            value: backendStats.prestamosActivos ?? 0, // Usamos temporalmente prestamosActivos mapeado desde el backend
            description: 'Equipos por devolver',
          },
        ])
      }
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const recentRentals = [
    {
      cliente: 'Studio Live Eventos',
      salida: '26/05/2026',
      retorno: '28/05/2026',
      estado: 'Activo',
    },
    {
      cliente: 'Music Pro Agency',
      salida: '25/05/2026',
      retorno: '30/05/2026',
      estado: 'Reservado',
    },
    {
      cliente: 'Black Noise Producciones',
      salida: '24/05/2026',
      retorno: '27/05/2026',
      estado: 'Retornado',
    },
  ]

  const maintenanceList = [
    {
      equipo: 'Shure ULXD4',
      problema: 'Sin señal RF',
      estado: 'En proceso',
    },
    {
      equipo: 'Yamaha CL5',
      problema: 'Fader dañado',
      estado: 'Pendiente',
    },
    {
      equipo: 'Rack FOH 03',
      problema: 'Ventilación',
      estado: 'Finalizado',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard Rental Audio
          </h1>
          <p className="mt-2 text-gray-600">
            Sistema de Inventario y Alquiler de Equipos
          </p>
        </div>

        <div className="rounded-2xl bg-white px-5 py-3 shadow-md">
          <p className="text-sm text-gray-500">Usuario</p>
          <h2 className="font-semibold text-gray-800">Administrador</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {loading && (
          <div className="col-span-full rounded-2xl bg-yellow-100 p-4 text-yellow-800">
            Cargando estadísticas...
          </div>
        )}
        {!loading && stats.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl"
          >
            <p className="text-sm text-gray-500">{item.title}</p>

            <h2 className="mt-4 text-4xl font-bold text-gray-900">
              {item.value}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Alquileres Recientes
            </h2>

            <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
              Nuevo Alquiler
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left text-sm text-gray-500">
                  <th className="pb-3">Cliente</th>
                  <th className="pb-3">Salida</th>
                  <th className="pb-3">Retorno</th>
                  <th className="pb-3">Estado</th>
                </tr>
              </thead>

              <tbody>
                {recentRentals.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b text-sm text-gray-700"
                  >
                    <td className="py-4 font-medium">{item.cliente}</td>
                    <td>{item.salida}</td>
                    <td>{item.retorno}</td>
                    <td>
                      <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-800">
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Mantenimiento
            </h2>

            <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
              Ver Todo
            </button>
          </div>

          <div className="space-y-4">
            {maintenanceList.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.equipo}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {item.problema}
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-800">
                    {item.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Acciones Rápidas
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <button className="rounded-2xl bg-black p-5 text-left text-white transition hover:opacity-90">
            <h3 className="text-lg font-semibold">Nuevo Equipo</h3>
            <p className="mt-2 text-sm text-gray-300">
              Registrar equipo en inventario
            </p>
          </button>

          <button className="rounded-2xl bg-white p-5 text-left shadow-inner ring-1 ring-gray-200 transition hover:bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              Escanear QR
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Verificar salida o retorno
            </p>
          </button>

          <button className="rounded-2xl bg-white p-5 text-left shadow-inner ring-1 ring-gray-200 transition hover:bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              Crear Reserva
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Reservar equipos para evento
            </p>
          </button>

          <button className="rounded-2xl bg-white p-5 text-left shadow-inner ring-1 ring-gray-200 transition hover:bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              Reportes
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Estadísticas y movimientos
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
