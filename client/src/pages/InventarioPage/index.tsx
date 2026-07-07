import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import useEquipamentoForm from '../../hooks/useEquipamentoForm'
import useCategorias from '../../hooks/useCategorias'
import useMarcas from '../../hooks/useMarcas'
import useLocalizacoes from '../../hooks/useLocalizacoes'
import useEquipamentos from '../../hooks/useEquipamentos'
import useEdicaoEstado from '../../hooks/useEdicaoEstado'
import useGrupos from '../../hooks/useGrupos'
import useInventarioStats from '../../hooks/useInventarioStats'
import useInventarioAgrupado from '../../hooks/useInventarioAgrupado'
import useEquipamentosFilter from '../../hooks/useEquipamentosFilter'

import NovoEquipamentoForm from '../../components/equipamentos/NovoEquipamentoForm'
import EquipamentosTable from '../../components/equipamentos/EquipamentosTable'
import EquipamentosKpis from '../../components/equipamentos/EquipamentosKpis'
import EstadoDialog from '../../components/equipamentos/EstadoDialog'
import GruposTable from '../../components/equipamentos/GruposTable'

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

export default function InventarioPage() {

  const [searchParams] = useSearchParams()

  const [openNovo, setOpenNovo] = useState(false)
  const [search, setSearch] = useState('')
  const [filtroStatus, setFiltroStatus] = useState(
    () => searchParams.get('estado') ?? ''
  )

  const [modoVisualizacao, setModoVisualizacao] =
    useState<'grupos' | 'equipamentos'>('grupos')
const {
  grupos,
  carregarGrupos
} = useInventarioAgrupado()

  const {
    equipos,
    carregarEquipamentos,
    criarEquipamento,
    alterarEstado
  } = useEquipamentos()

  const { categorias } = useCategorias()
  const { marcas } = useMarcas()
  const { localizacoes } = useLocalizacoes()

  const {
    form,
    setForm,
    resetForm,
    validate,
    buildPayload
  } = useEquipamentoForm()

const {
  filtrados: gruposFiltrados
} = useEquipamentosFilter(
  grupos,
  search,
  filtroStatus
)

const {
  filtrados: equipamentosFiltrados
} = useEquipamentosFilter(
  equipos,
  search,
  filtroStatus
) 

const {
    total,
    disponiveis,
    alugados,
    manutencao,
    danificados
  } = useInventarioStats(grupos)

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

  const abrirNovoEquipamento = () => {
    resetForm()
    setOpenNovo(true)
  }

  const fecharNovoEquipamento = () => {
    resetForm()
    setOpenNovo(false)
  }


// console.log(equipos[0])
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
            Equipamentos
          </Typography>
          <Typography color="text.secondary">
            Gestão de equipamentos
          </Typography>
        </Box>


      </Box>

      {/* KPIs */}

      <EquipamentosKpis
        total={total}
        disponiveis={disponiveis}
        alugados={alugados}
        manutencao={manutencao}
        danificados={danificados}
        onFiltro={setFiltroStatus}
      />

      {/* Conteúdo */}

      <Paper
        sx={{
          p: 3,
          borderRadius: 2
        }}
      >

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
              setModoVisualizacao('grupos')
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
              setModoVisualizacao('equipamentos')
            }
          >
            Detalhado
          </Button>

        </Box>

        <TextField
          fullWidth
          label="Buscar equipamento..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{ mb: 3 }}
        />

        {
          modoVisualizacao === 'grupos'
            ? (
              <GruposTable
                grupos={gruposFiltrados}
                categorias={categorias}
              />
            )
            : (
              <EquipamentosTable
                equipamentos={equipamentosFiltrados}
                categorias={categorias}
                localizacoes={localizacoes}
                onEditar={abrirEdicaoEstado}
              />
            )
        }

      </Paper>

      {/* Dialog Novo Equipamento */}

      <Dialog
        open={openNovo}
        onClose={fecharNovoEquipamento}
        maxWidth="md"
        fullWidth
      >

        <DialogTitle>
          Novo Equipamento
        </DialogTitle>

        <DialogContent>

          <NovoEquipamentoForm
            form={form}
            setForm={setForm}
            categorias={categorias}
            marcas={marcas}
            localizacoes={localizacoes}
          />

        </DialogContent>

        <DialogActions>

           </DialogActions>

      </Dialog>

      {/* Dialog Estado */}

      <EstadoDialog
        open={estadoDialogOpen}
        estadoAtual={estadoAtual}
        observacao={observacao}
        setEstadoAtual={setEstadoAtual}
        setObservacao={setObservacao}
        onClose={fecharEdicaoEstado}
        onSalvar={() =>
          salvarEstado(alterarEstado)
        }
      />

    </Box>
  )
}
