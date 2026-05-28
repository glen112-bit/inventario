import Sidebar from './components/Sidebar' // 1. Asegúrate de que la importación apunte al archivo correcto
import DashboardLayout from './components/DashboardLayout'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      {/* 2. RENDERIZAR EL SIDEBAR AQUÍ */}
      <Sidebar />

      {/* 3. CONTENEDOR DEL DASHBOARD (Con un margen izquierdo de w-72 para no pisarse con el Sidebar) */}
      <main className="flex-1 pl-72 p-8">
        <DashboardLayout />
      </main>
    </div>
  )
}
