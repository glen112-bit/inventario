import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Grid from '@mui/material/Grid'
import {
  Box,
  Paper,
  Typography,
  Divider,
} from '@mui/material'

import Inventory2Icon from '@mui/icons-material/Inventory2'
import HandshakeIcon from '@mui/icons-material/Handshake'
import BuildIcon from '@mui/icons-material/Build'
import PeopleIcon from '@mui/icons-material/People'

import KpiCard from '../../components/KpiCard'

export default function DashboardPage() {

  const [stats, setStats] = useState<any>({
    totalEquipos: 0,
    equiposDisponiveis: 0,
    equiposManutencao: 0,
    usuarios: 0,

    alugueisAtivos: 0,
    devolucoesHoje: 0,
    equipamentosDanificados: 0,

    equipamentosManutencao: [],
    ultimosAlugueis: [],
    equipamentosMaisAlugados: [],
    proximasDevolucoes: []
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {

    try {

      const res = await axios.get(
        'http://localhost:3001/api/dashboard/stats'
      )
      setStats(res.data)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Box>

      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            Dashboard
          </Typography>

          <Typography color="text.secondary">
            Visão geral do sistema
          </Typography>
        </Box>
      </Box>

      {/* KPIs */}
      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Equipamentos"
            value={stats.totalEquipos || 0}
            icon={<Inventory2Icon />}
            color="#3b82f6"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Disponíveis"
            value={stats.equiposDisponiveis || 0}
            icon={<HandshakeIcon />}
            color="#10b981"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Manutenção"
            value={stats.equiposManutencao || 0}
            icon={<BuildIcon />}
            color="#f59e0b"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Usuários"
            value={stats.usuarios || 0}
            icon={<PeopleIcon />}
            color="#8b5cf6"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Aluguéis Ativos"
            value={stats.alugueisAtivos || 0}
            icon={<HandshakeIcon />}
            color="#22c55e"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Danificados"
            value={stats.equipamentosDanificados || 0}
            icon={<BuildIcon />}
            color="#ef4444"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Devoluções Hoje"
            value={stats.devolucoesHoje || 0}
            icon={<Inventory2Icon />}
            color="#f59e0b"
          />
        </Grid>
      </Grid>

      {/* Conteúdo */}
      <Grid container spacing={6} mt={8}>

        <Grid size={{ xs: 12, md: 6 }}>

          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              minHeight: 350,
              background: '#111827',
              border: '1px solid rgba(255,255,255,.05)'
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

            {
              stats.equipamentosManutencao?.length > 0
                ? stats.equipamentosManutencao.map(
                  (item: any) => (
                    <Box
                      key={item.equipamento_id}
                      sx={{
                        py: 1,
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
                        {item.marca} {item.modelo}
                      </Typography>
                    </Box>
                  )
                )
                : (
                  <Typography
                    color="text.secondary"
                  >
                    Nenhum equipamento em manutenção
                  </Typography>
                )
            }

          </Paper>

        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>

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

            {
              stats.ultimosAlugueis?.length > 0
                ? stats.ultimosAlugueis.map(
                  (item: any) => (
                    <Box
                      key={item.id}
                      sx={{
                        py: 1,
                        borderBottom:
                        '1px solid rgba(255,255,255,.08)'
                      }}
                    >
                      <Typography
                        fontWeight={600}
                      >
                        {item.cliente}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Saída:
                        {' '}
                        {new Date(
                          item.fecha_salida
                        ).toLocaleDateString('pt-BR')}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Retorno:
                        {' '}
                        {new Date(
                          item.fecha_retorno
                        ).toLocaleDateString('pt-BR')}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="warning.main"
                      >
                        {item.estado}
                      </Typography>

                    </Box>
                  )
                )
                : (
                  <Typography
                    color="text.secondary"
                  >
                    Nenhum aluguel encontrado
                  </Typography>
                )
            }

          </Paper>

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
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
              Equipamentos mais alugados
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {stats.equipamentosMaisAlugados?.length > 0 ? (
              stats.equipamentosMaisAlugados.map((item: any) => (
                <Box
                  key={item.equipamento_id}
                  sx={{
                    py: 1,
                    borderBottom: '1px solid rgba(255,255,255,.08)'
                  }}
                >
                  <Typography fontWeight={600}>
                    {item.codigo_interno}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.marca} {item.modelo}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="primary.main"
                  >
                    {item.total_alugueis} aluguéis
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">
                Nenhum dado encontrado
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
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
              Próximas Devoluções
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {stats.proximasDevolucoes?.length > 0 ? (
              stats.proximasDevolucoes.map((item: any) => (
                <Box
                  key={item.id}
                  sx={{
                    py: 1,
                    borderBottom: '1px solid rgba(255,255,255,.08)'
                  }}
                >
                  <Typography fontWeight={600}>
                    {item.cliente}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Retorno:
                    {" "}
                    {new Date(
                      item.fecha_retorno
                    ).toLocaleDateString('pt-BR')}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">
                Nenhuma devolução pendente
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3
            }}
          >

            <Grid size={{ xs: 12 }}>
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
      Últimas Movimentações
    </Typography>

    <Divider sx={{ mb: 2 }} />

    {stats.ultimasMovimentacoes?.length > 0 ? (
      stats.ultimasMovimentacoes.map((item: any) => (
        <Box
          key={item.id}
          sx={{
            py: 1,
            borderBottom:
              '1px solid rgba(255,255,255,.08)'
          }}
        >
          <Typography fontWeight={600}>
            {item.codigo_interno}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {item.estado_anterior}
            {' → '}
            {item.estado_novo}
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
            {new Date(
              item.created_at
            ).toLocaleString('pt-BR')}
          </Typography>
        </Box>
      ))
    ) : (
      <Typography color="text.secondary">
        Nenhuma movimentação encontrada
      </Typography>
    )}
  </Paper>
</Grid>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  )
}
