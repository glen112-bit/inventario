import Grid from '@mui/material/Grid'

import PeopleIcon from '@mui/icons-material/People'
import HandshakeIcon from '@mui/icons-material/Handshake'
import BlockIcon from '@mui/icons-material/Block'

import KpiCard from '../../../kpiCard'

type Props = {
  totalClientes: number
  clientesActivos: number
  clientesInactivos: number
}

export default function ClientesKpis({
  totalClientes,
  clientesActivos,
  clientesInactivos
}: Props) {

  return (

    <Grid
      container
      spacing={3}
      mb={4}
    >

      <Grid size={{ xs: 12, md: 4 }}>
        <KpiCard
          title="Clientes"
          value={totalClientes}
          icon={<PeopleIcon />}
          color="#3b82f6"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <KpiCard
          title="Activos"
          value={clientesActivos}
          icon={<HandshakeIcon />}
          color="#10b981"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <KpiCard
          title="Inactivos"
          value={clientesInactivos}
          icon={<BlockIcon />}
          color="#ef4444"
        />
      </Grid>

    </Grid>

  )

}
