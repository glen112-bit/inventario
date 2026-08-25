import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import api from '../../services/api'

import useEquipamentoForm from '../../hooks/useEquipamentoForm'
import useCategorias from '../../hooks/useCategorias'
import useMarcas from '../../hooks/useMarcas'
import useLocalizacoes from '../../hooks/useLocalizacoes'
import useEquipamentos from '../../hooks/useEquipamentos'
import useEdicaoEstado from '../../hooks/useEdicaoEstado'
import useInventarioStats from '../../hooks/useInventarioStats'
import useInventarioAgrupado from '../../hooks/useInventarioAgrupado'
import useEquipamentosFilter from '../../hooks/useEquipamentosFilter'

import EquipamentosTable from '../../components/equipamentos/EquipamentosTable'
import EquipamentosKpis from '../../components/equipamentos/EquipamentosKpis'
import EstadoDialog from '../../components/equipamentos/EstadoDialog'
import GruposTable from '../../components/equipamentos/GruposTable'
import EquipamentoProfileDialog from '../../components/equipamentos/Profile/EquipamentoProfileDialog'

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField
} from '@mui/material'

export default function InventarioPage() {

  const [searchParams] = useSearchParams()

  /*
  ==========================================================
  PROFILE
  ==========================================================
  */

  const [profileOpen, setProfileOpen] = useState(false)

  const [equipamento, setEquipamento] =
    useState<any>(null)

  const [historico, setHistorico] =
    useState<any[]>([])

  const [analytics, setAnalytics] =
    useState<any>(null)

  const [operacoes, setOperacoes] =
    useState<any[]>([])


  /*
  ==========================================================
  FILTROS
  ==========================================================
  */

  const [search, setSearch] = useState('')

  const [filtroStatus, setFiltroStatus] =
    useState(
      () => searchParams.get('estado') ?? ''
    )


  /*
  ==========================================================
  MODO DE VISUALIZAÇÃO
  ==========================================================
  */

  const [modoVisualizacao, setModoVisualizacao] =
    useState<'grupos' | 'equipamentos'>(
      'equipamentos'
    )


  /*
  ==========================================================
  INVENTÁRIO AGRUPADO
  ==========================================================
  */

  const {
    grupos,
    carregarGrupos
  } = useInventarioAgrupado()


  /*
  ==========================================================
  EQUIPAMENTOS
  ==========================================================
  */

  const {
    equipos,
    carregarEquipamentos,
    criarEquipamento,
    alterarEstadoEquipamento
  } = useEquipamentos()


  /*
  ==========================================================
  CONFIGURAÇÕES
  ==========================================================
  */

  const { categorias } =
    useCategorias()

  const { marcas } =
    useMarcas()

  const { localizacoes } =
    useLocalizacoes()


  /*
  ==========================================================
  FORMULÁRIO
  ==========================================================
  */

  const {
    form,
    setForm,
    resetForm,
    validate,
    buildPayload
  } = useEquipamentoForm()


  /*
  ==========================================================
  FILTRO DE GRUPOS
  ==========================================================
  */

  const {
    filtrados: gruposFiltrados
  } = useEquipamentosFilter(
    grupos,
    search,
    filtroStatus
  )


  /*
  ==========================================================
  FILTRO DE EQUIPAMENTOS
  ==========================================================
  */

  const {
    filtrados: equipamentosFiltrados
  } = useEquipamentosFilter(
    equipos,
    search,
    filtroStatus
  )


  /*
  ==========================================================
  ESTATÍSTICAS
  ==========================================================
  */

  const {
    total,
    disponiveis,
    alugados,
    manutencao,
    danificados
  } = useInventarioStats(grupos)


  /*
  ==========================================================
  ESTADO DO EQUIPAMENTO
  ==========================================================
  */

  const {
    open: estadoDialogOpen,
    estadoAtual,
    observacao,

    setEstadoAtual,
    setObservacao,

    abrirEdicaoEstado,
    fecharEdicaoEstado,
    salvarEstado

  } = useEdicaoEstado()


  /*
  ==========================================================
  ABRIR PERFIL DO EQUIPAMENTO
  ==========================================================
  */

const abrirProfile = async (id: number) => {
  // console.log('========== PROFILE ==========')
  // console.log('EQUIPAMENTO ID:', id)

  try {

    const { data } = await api.get(
      `/equipamentos/${id}/profile`
    )

    // console.log('PROFILE DATA:', data)

    setEquipamento(data.equipamento)
    setHistorico(data.historico)
    setAnalytics(data.analytics)
    setOperacoes(data.operacoes)

    setProfileOpen(true)

  } catch (error) {

    console.error(error)

  }
}


  /*
  ==========================================================
  RENDER
  ==========================================================
  */

  return (

    <Box>

      {/* =====================================================
          HEADER
      ===================================================== */}

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
            Equipamentos
          </Typography>

          <Typography
            color="text.secondary"
          >
            Gestão de equipamentos
          </Typography>

        </Box>

      </Box>


      {/* =====================================================
          KPIs
      ===================================================== */}

      <EquipamentosKpis

        total={total}

        disponiveis={disponiveis}

        alugados={alugados}

        manutencao={manutencao}

        danificados={danificados}

        onFiltro={setFiltroStatus}

      />


      {/* =====================================================
          CONTEÚDO
      ===================================================== */}

      <Paper
        sx={{
          p: 3,
          borderRadius: 2
        }}
      >

        {/* ===================================================
            MODO DE VISUALIZAÇÃO
        =================================================== */}

        <Box
          display="flex"
          gap={2}
          mb={3}
        >

          <Button
            variant={
              modoVisualizacao === 'grupos'
                ? 'contained'
                : 'outlined'
            }
            onClick={() =>
              setModoVisualizacao(
                'grupos'
              )
            }
          >
            Resumo
          </Button>


          <Button
            variant={
              modoVisualizacao === 'equipamentos'
                ? 'contained'
                : 'outlined'
            }
            onClick={() =>
              setModoVisualizacao(
                'equipamentos'
              )
            }
          >
            Detalhado
          </Button>

        </Box>


        {/* ===================================================
            BUSCA
        =================================================== */}

        <TextField
          fullWidth
          label="Buscar equipamento..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          sx={{
            mb: 3
          }}
        />


        {/* ===================================================
            TABELA
        =================================================== */}

        {
          modoVisualizacao === 'grupos'

            ? (

              <GruposTable
                grupos={
                  gruposFiltrados
                }
                categorias={
                  categorias
                }
              />

            )

            : (

              <EquipamentosTable

                equipamentos={
                  equipamentosFiltrados
                }

                categorias={
                  categorias
                }

                localizacoes={
                  localizacoes
                }

                onEditar={
                  abrirEdicaoEstado
                }

                abrirProfile={
                  abrirProfile
                }

              />

            )
        }

      </Paper>


      {/* =====================================================
          DIALOG ESTADO
      ===================================================== */}

      <EstadoDialog

        open={
          estadoDialogOpen
        }

        estadoAtual={
          estadoAtual
        }

        observacao={
          observacao
        }

        setEstadoAtual={
          setEstadoAtual
        }

        setObservacao={
          setObservacao
        }

        onClose={
          fecharEdicaoEstado
        }

        onSalvar={() =>
          salvarEstado(
            alterarEstadoEquipamento
          )
        }

      />
      <EquipamentoProfileDialog
        open={profileOpen}
        equipamento={equipamento}
        historico={historico}
        analytics={analytics}
        operacoes={operacoes}
        onClose={() => setProfileOpen(false)}
      />
    </Box>

  )
}
