import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

import Grid from '@mui/material/Grid'

import {
  Box,
  Paper,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Chip
} from '@mui/material'

import Inventory2Icon from '@mui/icons-material/Inventory2'
import HandshakeIcon from '@mui/icons-material/Handshake'
import BuildIcon from '@mui/icons-material/Build'
import PeopleIcon from '@mui/icons-material/People'
import RefreshIcon from '@mui/icons-material/Refresh'
import WarningIcon from '@mui/icons-material/Warning'
import EventIcon from '@mui/icons-material/Event'

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import KpiCard from '../../components/KpiCard'


// =====================================================
// TYPES
// =====================================================

type DashboardStats = {

  totalEquipos: number

  equiposDisponiveis: number

  equiposManutencao: number

  usuarios: number

  alugueisAtivos: number

  devolucoesHoje: number

  equipamentosDanificados: number

  porEstado: any[]

  porMarca: any[]

  equipamentosManutencao: any[]

  ultimosAlugueis: any[]

  equipamentosMaisAlugados: any[]

  proximasDevolucoes: any[]

  ultimasMovimentacoes: any[]

}


// =====================================================
// INITIAL STATE
// =====================================================

const initialStats: DashboardStats = {

  totalEquipos: 0,

  equiposDisponiveis: 0,

  equiposManutencao: 0,

  usuarios: 0,

  alugueisAtivos: 0,

  devolucoesHoje: 0,

  equipamentosDanificados: 0,

  porEstado: [],

  porMarca: [],

  equipamentosManutencao: [],

  ultimosAlugueis: [],

  equipamentosMaisAlugados: [],

  proximasDevolucoes: [],

  ultimasMovimentacoes: []

}


// =====================================================
// COMPONENT
// =====================================================

export default function DashboardPage() {

  const navigate = useNavigate()


  const [stats, setStats] =
    useState<DashboardStats>(initialStats)


  const [loading, setLoading] =
    useState(true)


  const [erro, setErro] =
    useState<string | null>(null)


  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  const loadStats = async () => {

    try {

      setLoading(true)

      setErro(null)

      // console.log(
        // '========== CARREGANDO DASHBOARD =========='
      // )


      const response =
        await api.get('/dashboard/stats')


      // console.log(
        // 'DASHBOARD DATA:',
        // response.data
      // )


      const data =
        response.data || {}


      setStats({

        totalEquipos:
          Number(
            data.totalEquipos ?? 0
          ),

        equiposDisponiveis:
          Number(
            data.equiposDisponiveis ?? 0
          ),

        equiposManutencao:
          Number(
            data.equiposManutencao ?? 0
          ),

        usuarios:
          Number(
            data.usuarios ?? 0
          ),

        alugueisAtivos:
          Number(
            data.alugueisAtivos ?? 0
          ),

        devolucoesHoje:
          Number(
            data.devolucoesHoje ?? 0
          ),

        equipamentosDanificados:
          Number(
            data.equipamentosDanificados ?? 0
          ),

        porEstado:
          Array.isArray(data.porEstado)
            ? data.porEstado
            : [],

        porMarca:
          Array.isArray(data.porMarca)
            ? data.porMarca
            : [],

        equipamentosManutencao:
          Array.isArray(
            data.equipamentosManutencao
          )
            ? data.equipamentosManutencao
            : [],

        ultimosAlugueis:
          Array.isArray(
            data.ultimosAlugueis
          )
            ? data.ultimosAlugueis
            : [],

        equipamentosMaisAlugados:
          Array.isArray(
            data.equipamentosMaisAlugados
          )
            ? data.equipamentosMaisAlugados
            : [],

        proximasDevolucoes:
          Array.isArray(
            data.proximasDevolucoes
          )
            ? data.proximasDevolucoes
            : [],

        ultimasMovimentacoes:
          Array.isArray(
            data.ultimasMovimentacoes
          )
            ? data.ultimasMovimentacoes
            : []

      })


    } catch (error: any) {

      console.error(
        'DASHBOARD ERROR:',
        error
      )


      setErro(
        error?.response?.data?.error ||
        'Não foi possível carregar o dashboard.'
      )


    } finally {

      setLoading(false)

    }

  }


  // =====================================================
  // INIT
  // =====================================================

  useEffect(() => {

    loadStats()

  }, [])


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}
      >

        <CircularProgress />

        <Typography
          color="text.secondary"
        >
          Carregando dashboard...
        </Typography>

      </Box>

    )

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (erro) {

    return (

      <Box sx={{ p: 3 }}>

        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {erro}
        </Alert>

        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={loadStats}
        >
          Tentar novamente
        </Button>

      </Box>

    )

  }


  // =====================================================
  // FORMAT STATUS
  // =====================================================

  const formatEstado = (
    estado: string
  ) => {

    if (!estado) {
      return '-'
    }

    switch (
      estado.toLowerCase()
    ) {

      case 'disponivel':
        return 'Disponível'

      case 'manutencao':
      case 'mantenimiento':
        return 'Manutenção'

      case 'alugado':
      case 'alquilado':
        return 'Alugado'

      case 'danificado':
        return 'Danificado'

      default:
        return estado

    }

  }


  // =====================================================
  // DASHBOARD
  // =====================================================

  return (

    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        pb: 5
      }}
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}
      >

        <Box>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Control de Equipamentos
          </Typography>

          <Typography
            color="text.secondary"
          >
            Visão geral do sistema
          </Typography>

        </Box>


        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={loadStats}
        >
          Atualizar
        </Button>

      </Box>


      {/* ================================================= */}
      {/* KPIs */}
      {/* ================================================= */}

      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <KpiCard
            title="Equipamentos"
            value={stats.totalEquipos}
            icon={<Inventory2Icon />}
            color="#3b82f6"
            onClick={() =>
              navigate('/inventario')
            }
          />

        </Grid>


        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <KpiCard
            title="Disponíveis"
            value={stats.equiposDisponiveis}
            icon={<Inventory2Icon />}
            color="#10b981"
            onClick={() =>
              navigate('/inventario')
            }
          />

        </Grid>


        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <KpiCard
            title="Manutenção"
            value={stats.equiposManutencao}
            icon={<BuildIcon />}
            color="#f59e0b"
            onClick={() =>
              navigate('/manutencao')
            }
          />

        </Grid>


        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <KpiCard
            title="Usuários"
            value={stats.usuarios}
            icon={<PeopleIcon />}
            color="#8b5cf6"
            onClick={() =>
              navigate('/config/usuarios')
            }
          />

        </Grid>


        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <KpiCard
            title="Aluguéis Ativos"
            value={stats.alugueisAtivos}
            icon={<HandshakeIcon />}
            color="#22c55e"
            onClick={() =>
              navigate('/alugueis')
            }
          />

        </Grid>


        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <KpiCard
            title="Danificados"
            value={stats.equipamentosDanificados}
            icon={<WarningIcon />}
            color="#ef4444"
            onClick={() =>
              navigate('/inventario')
            }
          />

        </Grid>


        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <KpiCard
            title="Devoluções Hoje"
            value={stats.devolucoesHoje}
            icon={<EventIcon />}
            color="#f59e0b"
            onClick={() =>
              navigate('/alugueis')
            }
          />

        </Grid>

      </Grid>


      {/* ================================================= */}
      {/* GRÁFICOS */}
      {/* ================================================= */}

      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >

        {/* =============================================== */}
        {/* ESTADO */}
        {/* =============================================== */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: 430
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Equipamentos por Estado
            </Typography>

            {stats.porEstado.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height={340}
              >

                <PieChart>

                  <Pie
                    data={stats.porEstado}
                    dataKey="total"
                    nameKey="estado_actual"
                    cx="50%"
                    cy="50%"
                    outerRadius={115}
                    label={(entry) =>
                      formatEstado(
                        entry.estado_actual
                      )
                    }
                  />

                  <Tooltip
                    formatter={(
                      value: any
                    ) => [
                      value,
                      'Equipamentos'
                    ]}
                    labelFormatter={(
                      label
                    ) =>
                      formatEstado(
                        String(label)
                      )
                    }
                  />

                  <Legend
                    formatter={(
                      value
                    ) =>
                      formatEstado(
                        String(value)
                      )
                    }
                  />

                </PieChart>

              </ResponsiveContainer>

            ) : (

              <Box
                sx={{
                  height: 340,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >

                <Typography
                  color="text.secondary"
                >
                  Nenhum dado disponível.
                </Typography>

              </Box>

            )}

          </Paper>

        </Grid>


        {/* =============================================== */}
        {/* MARCAS */}
        {/* =============================================== */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: 430
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Equipamentos por Marca
            </Typography>

            {stats.porMarca.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height={340}
              >

                <BarChart
                  data={stats.porMarca}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 0,
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

                  <Legend />

                  <Bar
                    dataKey="total"
                    name="Equipamentos"
                    radius={[
                      6,
                      6,
                      0,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            ) : (

              <Box
                sx={{
                  height: 340,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >

                <Typography
                  color="text.secondary"
                >
                  Nenhuma marca encontrada.
                </Typography>

              </Box>

            )}

          </Paper>

        </Grid>

      </Grid>


      {/* ================================================= */}
      {/* LISTAS */}
      {/* ================================================= */}

      <Grid
        container
        spacing={3}
      >

        {/* =============================================== */}
        {/* ÚLTIMOS ALUGUÉIS */}
        {/* =============================================== */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: '100%'
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Últimos Aluguéis
            </Typography>

            <Divider sx={{ mb: 2 }} />


            {stats.ultimosAlugueis.length > 0 ? (

              stats.ultimosAlugueis.map(
                (item: any) => (

                  <Box
                    key={item.id}
                    sx={{
                      py: 1.5,
                      borderBottom:
                        '1px solid rgba(255,255,255,.08)'
                    }}
                  >

                    <Typography
                      fontWeight={600}
                    >
                      {item.cliente ||
                        'Cliente não informado'}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Saída:{' '}
                      {item.fecha_salida
                        ? new Date(
                            item.fecha_salida
                          ).toLocaleDateString(
                            'pt-BR'
                          )
                        : '-'}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Retorno:{' '}
                      {item.fecha_retorno
                        ? new Date(
                            item.fecha_retorno
                          ).toLocaleDateString(
                            'pt-BR'
                          )
                        : '-'}
                    </Typography>

                    <Chip
                      size="small"
                      label={
                        item.estado ||
                        'Sem estado'
                      }
                      sx={{ mt: 1 }}
                    />

                  </Box>

                )

              )

            ) : (

              <Typography
                color="text.secondary"
              >
                Nenhum aluguel encontrado.
              </Typography>

            )}

          </Paper>

        </Grid>


        {/* =============================================== */}
        {/* MAIS ALUGADOS */}
        {/* =============================================== */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: '100%'
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Equipamentos Mais Alugados
            </Typography>

            <Divider sx={{ mb: 2 }} />


            {stats.equipamentosMaisAlugados.length > 0 ? (

              stats.equipamentosMaisAlugados.map(
                (item: any) => (

                  <Box
                    key={
                      item.equipamento_id
                    }
                    sx={{
                      py: 1.5,
                      borderBottom:
                        '1px solid rgba(255,255,255,.08)'
                    }}
                  >

                    <Typography
                      fontWeight={600}
                    >
                      {item.codigo_interno}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.marca}{' '}
                      {item.modelo}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="primary.main"
                    >
                      {item.total_alugueis}
                      {' '}
                      aluguéis
                    </Typography>

                  </Box>

                )

              )

            ) : (

              <Typography
                color="text.secondary"
              >
                Nenhum dado encontrado.
              </Typography>

            )}

          </Paper>

        </Grid>


        {/* =============================================== */}
        {/* MANUTENÇÃO */}
        {/* =============================================== */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              minHeight: 350
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Equipamentos em Manutenção
            </Typography>

            <Divider sx={{ mb: 2 }} />


            {stats.equipamentosManutencao.length > 0 ? (

              stats.equipamentosManutencao.map(
                (item: any) => (

                  <Box
                    key={
                      item.equipamento_id
                    }
                    sx={{
                      py: 1.5,
                      borderBottom:
                        '1px solid rgba(255,255,255,.08)',
                      cursor: 'pointer'
                    }}
                    onClick={() =>
                      navigate(
                        `/manutencao`
                      )
                    }
                  >

                    <Typography
                      fontWeight={600}
                    >
                      {item.codigo_interno}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.marca}{' '}
                      {item.modelo}
                    </Typography>

                    <Chip
                      size="small"
                      color="error"
                      label="Manutenção"
                      sx={{ mt: 1 }}
                    />

                  </Box>

                )

              )

            ) : (

              <Typography
                color="text.secondary"
              >
                Nenhum equipamento em manutenção.
              </Typography>

            )}

          </Paper>

        </Grid>


        {/* =============================================== */}
        {/* PRÓXIMAS DEVOLUÇÕES */}
        {/* =============================================== */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              minHeight: 350
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Próximas Devoluções
            </Typography>

            <Divider sx={{ mb: 2 }} />


            {stats.proximasDevolucoes.length > 0 ? (

              stats.proximasDevolucoes.map(
                (item: any) => (

                  <Box
                    key={item.id}
                    sx={{
                      py: 1.5,
                      borderBottom:
                        '1px solid rgba(255,255,255,.08)'
                    }}
                  >

                    <Typography
                      fontWeight={600}
                    >
                      {item.cliente ||
                        'Cliente não informado'}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Retorno:{' '}
                      {item.fecha_retorno
                        ? new Date(
                            item.fecha_retorno
                          ).toLocaleDateString(
                            'pt-BR'
                          )
                        : '-'}
                    </Typography>

                  </Box>

                )

              )

            ) : (

              <Typography
                color="text.secondary"
              >
                Nenhuma devolução pendente.
              </Typography>

            )}

          </Paper>

        </Grid>


        {/* =============================================== */}
        {/* ÚLTIMAS MOVIMENTAÇÕES */}
        {/* =============================================== */}

        <Grid
          size={{
            xs: 12
          }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Últimas Movimentações
            </Typography>

            <Divider sx={{ mb: 2 }} />


            {stats.ultimasMovimentacoes.length > 0 ? (

              stats.ultimasMovimentacoes.map(
                (item: any) => (

                  <Box
                    key={item.id}
                    sx={{
                      py: 1.5,
                      borderBottom:
                        '1px solid rgba(255,255,255,.08)'
                    }}
                  >

                    <Typography
                      fontWeight={600}
                    >
                      {item.codigo_interno}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {formatEstado(
                        item.estado_anterior
                      )}

                      {' → '}

                      {formatEstado(
                        item.estado_novo
                      )}
                    </Typography>


                    {item.observacao && (

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.observacao}
                      </Typography>

                    )}


                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {item.created_at
                        ? new Date(
                            item.created_at
                          ).toLocaleString(
                            'pt-BR'
                          )
                        : ''}
                    </Typography>

                  </Box>

                )

              )

            ) : (

              <Typography
                color="text.secondary"
              >
                Nenhuma movimentação encontrada.
              </Typography>

            )}

          </Paper>

        </Grid>

      </Grid>

    </Box>

  )

}
