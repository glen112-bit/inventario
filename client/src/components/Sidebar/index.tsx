import {
  Button,
  Typography
} from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import BuildIcon from '@mui/icons-material/Build'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import HistoryIcon from '@mui/icons-material/History'
import CategoryIcon from '@mui/icons-material/Category'
import QrCodeIcon from '@mui/icons-material/QrCode'
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import PlaceIcon from '@mui/icons-material/Place'

import { NavLink } from 'react-router-dom'

const sections = [

  {
    title: 'PAINEL',
    items: [
      {
        label: 'Dashboard',
        icon: DashboardIcon,
        path: '/'
      }
    ]
  },

  {
    title: 'INVENTÁRIO',
    items: [
      {
        label: 'Inventário',
        icon: Inventory2Icon,
        path: '/inventario'
      },
      {
        label: 'Manutenção',
        icon: BuildIcon,
        path: '/manutencao'
      },
      {
        label: 'Aluguéis',
        icon: AssignmentIcon,
        path: '/alugueis'
      }
    ]
  },

  {
    title: 'OPERAÇÕES',
    items: [
      {
        label: 'Nova Saída',
        icon: LocalShippingIcon,
        path: '/operacoes/saida'
      },
{
        label: 'Nova Devolução',
        icon: KeyboardReturnIcon,
        path: '/operacoes/devolucao'
      },
      {
        label: 'Scan QrCode',
        icon: QrCodeIcon,
        path: '/qr-scanner'
      },
      {
        label: 'Histórico',
        icon: HistoryIcon,
        path: '/equipamentos/historico'
      }
    ]
  },

  {
    title: 'RELATÓRIOS',
    items: [
      {
        label: 'Analytics',
        icon: AnalyticsIcon,
        path: '/analytics'
      }
    ]
  },

  {
    title: 'CONFIGURAÇÕES',
    items: [
      {
        label: 'Equipamentos',
        icon: Inventory2Icon,
        path: '/config/equipamentos'
      },
      {
        label: 'Clientes',
        icon: PeopleIcon,
        path: '/config/clientes'
      },
      {
        label: 'Usuários',
        icon: PeopleIcon,
        path: '/config/usuarios'
      },

      {
        label: 'Sistema',
        icon: SettingsIcon,
        path: '/config'
      }
    ]
  }

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
<nav className="flex-1 overflow-y-auto p-4">

  {sections.map(section => (

    <div
      key={section.title}
      className="mb-6"
    >

      <Typography
        variant="caption"
        sx={{
          color: '#64748b',
          px: 2,
          mb: 1,
          display: 'block',
          fontWeight: 700,
          letterSpacing: 1
        }}
      >
        {section.title}
      </Typography>

      {section.items.map(item => {

        const Icon = item.icon

        return (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              mb-1
              transition-all

              ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }
            `}
          >

            <Icon fontSize="small" />

            {item.label}

          </NavLink>

        )

      })}

    </div>

  ))}

</nav>      {/* FOOTER */}

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
