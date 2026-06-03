import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'

import InventoryIcon from '@mui/icons-material/Inventory'
import PeopleIcon from '@mui/icons-material/People'
import HandshakeIcon from '@mui/icons-material/Handshake'
import BuildIcon from '@mui/icons-material/Build'

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'

import KpiCard from '../../components/KpiCard'

export default function AnalyticsPage() {

  const [data, setData] = useState<any>(null)

  useEffect(() => {

    carregar()

  }, [])

  const carregar = async () => {

    try {

      const response = await axios.get(
        '/api/analytics'
      )

      setData(response.data)

    } catch (error) {

      console.error(error)

    }

  }

  if (!data) {

    return (
      <Typography>
        Carregando...
      </Typography>
    )

  }

  return (

    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        Analytics
      </Typography>

      <Grid
        container
        spacing={3}
        mb={4}
      >

        <Grid size={{ xs: 12, md: 3 }}>
          <KpiCard
            title="Equipamentos"
            value={data.totalEquipamentos}
            icon={<InventoryIcon />}
            color="#3b82f6"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <KpiCard
            title="Clientes"
            value={data.totalClientes}
            icon={<PeopleIcon />}
            color="#10b981"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <KpiCard
            title="Aluguéis"
            value={data.totalAlugueis}
            icon={<HandshakeIcon />}
            color="#f59e0b"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <KpiCard
            title="Manutenção"
            value={data.totalManutencao}
            icon={<BuildIcon />}
            color="#ef4444"
          />
        </Grid>

      </Grid>
<Grid container spacing={3} mb={4}>

  <Grid size={{ xs: 12, md: 4 }}>
    <KpiCard
      title="Disponíveis"
      value={
        data.porEstado.find(
          x => x.estado_actual === 'disponible'
        )?.total || 0
      }
      icon={<InventoryIcon />}
      color="#22c55e"
    />
  </Grid>

  <Grid size={{ xs: 12, md: 4 }}>
    <KpiCard
      title="Alugados"
      value={
        data.porEstado.find(
          x => x.estado_actual === 'alquilado'
        )?.total || 0
      }
      icon={<HandshakeIcon />}
      color="#f59e0b"
    />
  </Grid>

  <Grid size={{ xs: 12, md: 4 }}>
    <KpiCard
      title="Em Manutenção"
      value={data.totalManutencao}
      icon={<BuildIcon />}
      color="#ef4444"
    />
  </Grid>

</Grid>
<Paper
  sx={{
    p: 3,
    borderRadius: 3,
    mt: 3
  }}
>

  <Typography
    variant="h6"
    mb={2}
  >
    Top Marcas
  </Typography>

  <Table>

    <TableHead>

      <TableRow>
        <TableCell>Marca</TableCell>
        <TableCell align="right">
          Equipamentos
        </TableCell>
      </TableRow>

    </TableHead>

    <TableBody>

      {data.porMarca.map(item => (

        <TableRow key={item.marca}>

          <TableCell>
            {item.marca}
          </TableCell>

          <TableCell align="right">
            {item.total}
          </TableCell>

        </TableRow>

      ))}

    </TableBody>

  </Table>

</Paper>
      <Grid
        container
        spacing={3}
      >

        <Grid size={{ xs: 12, md: 6 }}>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: 400
            }}
          >

            <Typography
              variant="h6"
              mb={2}
            >
              Equipamentos por Estado
            </Typography>

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

<BarChart
  layout="vertical"
  data={data.porEstado}
>
  <CartesianGrid strokeDasharray="3 3" />

  <XAxis type="number" />

  <YAxis
    type="category"
    dataKey="estado_actual"
  />

  <Tooltip />

  <Bar
    dataKey="total"
    radius={[0, 6, 6, 0]}
  />
</BarChart>

            </ResponsiveContainer>

          </Paper>

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: 400
            }}
          >

            <Typography
              variant="h6"
              mb={2}
            >
              Equipamentos por Marca
            </Typography>

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={data.porMarca}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="marca" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="total"
                />

              </BarChart>

            </ResponsiveContainer>

          </Paper>

        </Grid>

      </Grid>

    </Box>

  )

}
