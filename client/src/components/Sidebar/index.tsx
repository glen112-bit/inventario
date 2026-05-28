import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  Users,
  Wrench,
  BarChart3,
  Settings,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const items = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
  },
  {
    label: 'Inventario',
    icon: Boxes,
    path: '/inventario',
  },
  {
    label: 'Alquileres',
    icon: ClipboardList,
    path: '/alquileres',
  },
  {
    label: 'Clientes',
    icon: Users,
    path: '/clientes',
  },
  {
    label: 'Mantenimiento',
    icon: Wrench,
    path: '/mantenimiento',
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    path: '/analytics',
  },
  {
    label: 'Configuraciones',
    icon: Settings,
    path: '/configuracion',
  },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[290px] flex-col border-r border-white/10 bg-[#0B1020] px-6 py-8">
      <div className="mb-14">
        <h1 className="text-4xl font-black tracking-tight">
          AudioERP
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Enterprise Management
        </p>
      </div>

      <nav className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4
                rounded-2xl
                px-5 py-4
                transition-all duration-300
                ${
                  isActive
                    ? `
                      bg-gradient-to-r
                      from-cyan-500/20
                      to-blue-500/10
                      text-cyan-300
                      border border-cyan-400/20
                    `
                    : `
                      text-gray-400
                      hover:bg-white/5
                      hover:text-white
                    `
                }
              `}
            >
              <Icon size={22} />

              <span className="text-[15px] font-medium">
                {item.label}
              </span>
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto">
        <div className="rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-5">
          <p className="text-sm text-cyan-300">
            Sistema Online
          </p>

          <h3 className="mt-3 text-lg font-bold">
            Todos los servicios funcionando
          </h3>
        </div>
      </div>
    </aside>
  )
}
