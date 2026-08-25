import { useEffect, useState } from 'react'
import api from '../../services/api'

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
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

import KpiCard from '../../components/KpiCard'


// ======================================================
// TIPOS
// ======================================================

interface EstadoData {
  estado_actual: string
  total: number
}

interface MarcaData {
  marca: string
  total: number
}

interface AluguelEstadoData {
  estado: string
  total: number
}

interface LocalizacaoData {
  localizacao: string | null
  total: number
}

interface AnalyticsData {
  totalEquipamentos: number
  totalClientes: number
  totalAlugueis: number
  totalManutencao: number

  porEstado: EstadoData[]
  porMarca: MarcaData[]
  alugueisPorEstado: AluguelEstadoData[]
  porLocalizacao: LocalizacaoData[]
}


// ======================================================
// COMPONENTE
// ======================================================

export default function AnalyticsPage() {

  const [stats, setStats] =
    useState<AnalyticsData | null>(null)

  const [erro, setErro] =
    useState<string | null>(null)

  const [loading, setLoading] =
    useState(true)


  // ======================================================
  // CARREGAR ANALYTICS
  // ======================================================

  useEffect(() => {

    carregar()

  }, [])


  const carregar = async () => {

    try {

      setLoading(true)
      setErro(null)

      const response =
        await api.get<AnalyticsData>('/analytics')

      // console.log(
        // 'ANALYTICS DATA:',
        // response.data
      // )

      setStats(response.data)

    } catch (error: any) {

      console.error(
        'ANALYTICS ERROR:',
        error
      )

      console.error(
        'STATUS:',
        error.response?.status
      )

      console.error(
        'DATA:',
        error.response?.data
      )

      setErro(
        error.response?.data?.error ||
        'Erro ao carregar analytics'
      )

    } finally {

      setLoading(false)

    }

  }


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {

    return (
      <Box
        sx={{
          width: '100%',
          p: 3
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Analytics
        </Typography>

        <Typography
          sx={{ mt: 2 }}
        >
          Carregando dados...
        </Typography>

      </Box>
    )

  }


  // ======================================================
  // ERRO
  // ======================================================

  if (erro) {

    return (
      <Box
        sx={{
          width: '100%',
          p: 3
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
          mb={3}
        >
          Analytics
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3
          }}
        >

          <Typography
            color="error"
            fontWeight={600}
          >
            {erro}
          </Typography>

        </Paper>

      </Box>
    )

  }


  // ======================================================
  // SEM DADOS
  // ======================================================

  if (!stats) {

    return (
      <Box p={3}>

        <Typography>
          Nenhum dado disponível.
        </Typography>

      </Box>
    )

  }


  // ======================================================
  // VALORES POR ESTADO
  // ======================================================

  const equipamentosDisponiveis =
    stats.porEstado?.find(
      item =>
        item.estado_actual === 'disponivel'
    )?.total || 0


  const equipamentosAlugados =
    stats.porEstado?.find(
      item =>
        item.estado_actual === 'alugado'
    )?.total || 0


  const equipamentosManutencao =
    stats.porEstado?.find(
      item =>
        item.estado_actual === 'manutencao'
    )?.total || 0


  const equipamentosDanificados =
    stats.porEstado?.find(
      item =>
        item.estado_actual === 'danificado'
    )?.total || 0


  // ======================================================
  // RENDER
  // ======================================================

  return (

    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        pb: 5
      }}
    >

      {/* ==================================================
          TÍTULO
      ================================================== */}

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        Analytics
      </Typography>


      {/* ==================================================
          KPIs PRINCIPAIS
      ================================================== */}

      <Grid
        container
        spacing={3}
        mb={4}
      >

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <KpiCard
            title="Equipamentos"
            value={stats.totalEquipamentos}
            icon={<InventoryIcon />}
            color="#3b82f6"
          />

        </Grid>


        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <KpiCard
            title="Clientes"
            value={stats.totalClientes}
            icon={<PeopleIcon />}
            color="#10b981"
          />

        </Grid>


        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <KpiCard
            title="Aluguéis"
            value={stats.totalAlugueis}
            icon={<HandshakeIcon />}
            color="#f59e0b"
          />

        </Grid>


        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <KpiCard
            title="Manutenção"
            value={stats.totalManutencao}
            icon={<BuildIcon />}
            color="#ef4444"
          />

        </Grid>

      </Grid>


      {/* ==================================================
          KPIs POR ESTADO
      ================================================== */}

      <Grid
        container
        spacing={3}
        mb={4}
      >

        <Grid size={{ xs: 12, md: 3 }}>

          <KpiCard
            title="Disponíveis"
            value={equipamentosDisponiveis}
            icon={<InventoryIcon />}
            color="#22c55e"
          />

        </Grid>


        <Grid size={{ xs: 12, md: 3 }}>

          <KpiCard
            title="Alugados"
            value={equipamentosAlugados}
            icon={<HandshakeIcon />}
            color="#f59e0b"
          />

        </Grid>


        <Grid size={{ xs: 12, md: 3 }}>

          <KpiCard
            title="Em Manutenção"
            value={equipamentosManutencao}
            icon={<BuildIcon />}
            color="#ef4444"
          />

        </Grid>


        <Grid size={{ xs: 12, md: 3 }}>

          <KpiCard
            title="Danificados"
            value={equipamentosDanificados}
            icon={<BuildIcon />}
            color="#dc2626"
          />

        </Grid>

      </Grid>


      <Divider sx={{ mb: 3 }} />


      {/* ==================================================
          TOP MARCAS
      ================================================== */}

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 4
        }}
      >

        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Top Marcas
        </Typography>


        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Marca
              </TableCell>

              <TableCell align="right">
                Equipamentos
              </TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {stats.porMarca?.length > 0 ? (

              stats.porMarca.map(
                (item, index) => (

                  <TableRow
                    key={`${item.marca}-${index}`}
                  >

                    <TableCell>
                      {item.marca || 'Sem marca'}
                    </TableCell>

                    <TableCell align="right">
                      {item.total}
                    </TableCell>

                  </TableRow>

                )
              )

            ) : (

              <TableRow>

                <TableCell
                  colSpan={2}
                  align="center"
                >
                  Nenhuma marca encontrada.
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </Paper>


      {/* ==================================================
          GRÁFICOS
      ================================================== */}

      <Grid
        container
        spacing={3}
      >


        {/* ================================================
            EQUIPAMENTOS POR ESTADO
        ================================================= */}

        <Grid
          size={{ xs: 12, md: 6 }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: 400
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Equipamentos por Estado
            </Typography>


            <Box
              sx={{
                width: '100%',
                height: 320
              }}
            >

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  layout="vertical"
                  data={stats.porEstado || []}
                  margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 5
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    type="number"
                  />

                  <YAxis
                    type="category"
                    dataKey="estado_actual"
                    width={100}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="total"
                    radius={[
                      0,
                      6,
                      6,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </Box>

          </Paper>

        </Grid>


        {/* ================================================
            EQUIPAMENTOS POR MARCA
        ================================================= */}

        <Grid
          size={{ xs: 12, md: 6 }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: 400
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Equipamentos por Marca
            </Typography>


            <Box
              sx={{
                width: '100%',
                height: 320
              }}
            >

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={stats.porMarca || []}
                  margin={{
                    top: 5,
                    right: 20,
                    left: 10,
                    bottom: 40
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="marca"
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="total"
                    radius={[
                      6,
                      6,
                      0,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </Box>

          </Paper>

        </Grid>


        {/* ================================================
            ALUGUÉIS POR ESTADO
        ================================================= */}

        <Grid
          size={{ xs: 12, md: 6 }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: 400
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Aluguéis por Estado
            </Typography>


            <Box
              sx={{
                width: '100%',
                height: 320
              }}
            >

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={
                    stats.alugueisPorEstado || []
                  }
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="estado"
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="total"
                    radius={[
                      6,
                      6,
                      0,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </Box>

          </Paper>

        </Grid>


        {/* ================================================
            EQUIPAMENTOS POR LOCALIZAÇÃO
        ================================================= */}

        <Grid
          size={{ xs: 12, md: 6 }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: 400
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Equipamentos por Localização
            </Typography>


            <Box
              sx={{
                width: '100%',
                height: 320
              }}
            >

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={
                    stats.porLocalizacao || []
                  }
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="localizacao"
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="total"
                    radius={[
                      6,
                      6,
                      0,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </Box>

          </Paper>

        </Grid>

      </Grid>

    </Box>

  )
}
