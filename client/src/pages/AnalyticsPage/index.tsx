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
  Divider,
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

  const [stats, setStats] = useState<any>(null)

  useEffect(() => {

    carregar()

  }, [])

  const carregar = async () => {

    try {

      const response = await axios.get(
        '/api/analytics'
      )

      setStats(response.data)

    } catch (error) {

      console.error(error)

    }

  }

  if (!stats) {

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
            value={stats.totalEquipamentos}
            icon={<InventoryIcon />}
            color="#3b82f6"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <KpiCard
            title="Clientes"
            value={stats.totalClientes}
            icon={<PeopleIcon />}
            color="#10b981"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <KpiCard
            title="Aluguéis"
            value={stats.totalAlugueis}
            icon={<HandshakeIcon />}
            color="#f59e0b"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <KpiCard
            title="Manutenção"
            value={stats.totalManutencao}
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
              stats.porEstado.find(
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
              stats.porEstado.find(
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
            value={stats.totalManutencao}
            icon={<BuildIcon />}
            color="#ef4444"
          />
        </Grid>

      </Grid>

      <Divider sx={{ mb: 2 }} />

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

            {stats.porMarca.map(item => (

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

      <Divider sx={{ mb: 2, mt:2 }} />
      <Grid
        container
        spacing={3}
      >

        <Grid size={{ xs: 12, md: 6 }}>

          <Paper
            sx={{
              p: 3,
              height: 400
            }}
          >
            <Box
              sx={{
                width:'100%',
                height:300
              }}

            >

            <Typography
              variant="h6"
              mb={2}
            >
              Equipamentos por Estado
            </Typography>

            <ResponsiveContainer
              width={600}
              height={300}
            >

              <BarChart
                layout="vertical"
                data={stats.porEstado}
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
            </Box>
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
                data={stats.porMarca}
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
