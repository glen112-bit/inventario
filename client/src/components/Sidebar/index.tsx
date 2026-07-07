import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  Users,
  Wrench,
  BarChart3,
  Settings,
} from 'lucide-react'
import {
  Button
} from '@mui/material'

import { NavLink } from 'react-router-dom'

const items = [
  {
    label: 'Home',
    icon: LayoutDashboard,
    path: '/',
  },
  {
    label: 'Inventario',
    icon: Boxes,
    path: '/inventario',
  },
  {
    label: 'Alugueis',
    icon: ClipboardList,
    path: '/alugueis',
  },
  {
    label: 'Clientes',
    icon: Users,
    path: '/config/clientes',
  },
  {
    label: 'Usuarios',
    icon: Users,
    path: '/config/usuarios',
  },
  {
    label: 'Manutencao',
    icon: Wrench,
    path: '/manutencao',
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    path: '/analytics',
  },
  {
    label: 'Config',
    icon: Settings,
    path: '/config',
  },
]

export default function Sidebar() {

  return (

    <aside
      className="
        fixed left-0 top-0
        flex h-screen w-[260px] flex-col
        border-r border-white/5
        bg-[#111827]
      "
    >

      {/* LOGO */}

      <div
        className="
          flex h-20 items-center
          border-b border-white/5
          px-8
        "
      >

        <div>

          <h1
            className="
              text-xl font-bold
              tracking-tight
              text-white
            "
          >
            AudioERP
          </h1>

          <p
            className="
              text-xs text-slate-400
            "
          >
            Rental Management
          </p>

        </div>

      </div>

      {/* NAV */}

      <nav
        className="
          flex-1 space-y-1
          p-4
        "
      >

        {items.map((item) => {

          const Icon = item.icon

          return (

            <NavLink
              key={item.label}
              to={item.path}

              className={({ isActive }) => `

                flex items-center gap-3

                rounded-xl

                px-4 py-3

                text-sm font-medium

                transition-all duration-200

                ${
                  isActive
                    ? `
                      bg-blue-500/10
                      text-blue-400
                    `
                    : `
                      text-slate-400

                      hover:bg-white/5
                      hover:text-white
                    `
                }

              `}
            >

              <Icon size={18} />

              {item.label}

            </NavLink>

          )

        })}

      </nav>

      {/* FOOTER */}

      <div
        className="
          border-t border-white/5
          p-4
        "
      >
<Button
  color="error"
  onClick={() => {

    localStorage.removeItem('token')
    localStorage.removeItem('usuario')

    window.location.href = '/login'

  }}
>
  Sair
</Button>
        <div
          className="
            rounded-xl
            bg-[#1f2937]
            p-4
          "
        >

          <p
            className="
              text-xs text-slate-400
            "
          >
            Sistema online
          </p>

          <h3
            className="
              mt-1 text-sm
              font-semibold text-white
            "
          >
            Todos os serviços ativos
          </h3>

        </div>

      </div>

    </aside>

  )

}
