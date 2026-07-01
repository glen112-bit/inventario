import { useMemo,useState } from 'react'
import api from '../../services/api'

import useEquipamentoForm from '../../hooks/useEquipamentoForm'
import useCategorias from '../../hooks/useCategorias'
import useMarcas from '../../hooks/useMarcas'
import useLocalizacoes from '../../hooks/useLocalizacoes'
import useEquipamentos from '../../hooks/useEquipamentos'
import useEdicaoEstado from '../../hooks/useEdicaoEstado'
// import useGrupos from '../../hooks/useGrupos'
import useInventarioStats from '../../hooks/useInventarioStats'
import useEquipamentosFilter from '../../hooks/useEquipamentosFilter'

import NovoEquipamentoForm from '../../components/equipamentos/NovoEquipamentoForm'
import EquipamentosTable from '../../components/equipamentos/EquipamentosTable'
import EquipamentosKpis from '../../components/equipamentos/EquipamentosKpis'
import EstadoDialog from '../../components/equipamentos/EstadoDialog'
import GruposTable from '../../components/equipamentos/GruposTable'

import Inventory2Icon from '@mui/icons-material/Inventory2'
import HandshakeIcon from '@mui/icons-material/Handshake'
import BuildIcon from '@mui/icons-material/Build'
import PeopleIcon from '@mui/icons-material/People'


import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

export default function InventarioPage() {

const salvarEquipamento = async () => {

  const {valid, errors} = validate()
  if(!valid){
    console.log(errors)
    return
  }

  const payload = buildPayload()

  console.log("PAYLOAD:", payload)

  await criarEquipamento(payload)

  resetForm()

  setOpenNovo(false)

}
  const {
    equipos,
    carregarEquipamentos,
    criarEquipamento,
    alterarEstado
  } = useEquipamentos()

  const [ openNovo,setOpenNovo ] = useState(false)
  const [ search,setSearch ] = useState('')
  const [ filtroStatus, setFiltroStatus ] = useState('')

  const {
    filtrados
  } = useEquipamentosFilter(
    equipos,
    search,
    filtroStatus
  )
  const grupos = filtrados

  const [ modoVisualizacao,setModoVisualizacao ] =
    useState<'grupos' | 'equipamentos'>(
      'grupos'
    )
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

  const {
    form,
    setForm,
    resetForm,
    validate,
    // salvarEquipamento,
    buildPayload
  } = useEquipamentoForm()

  const {
    total,
    disponiveis,
    alugados,
    manutencao,
    danificados
  } = useInventarioStats(
    equipos
  )

  const{
    codigo_interno,
    numero_serie,
    marca,
    modelo
  } = useEquipamentosFilter(
    equipos
  )

  const {
    categorias
  } = useCategorias()

  const {
    marcas
  } = useMarcas()

  const {
    localizacoes
  } = useLocalizacoes()

  // const {
    // grupos
  // } = useGrupos(filtrados)

// console.log(categorias)

  return (

    <Box>

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

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
              setOpenNovo(true)
          }
        >
          Novo Equipamento
        </Button>

      </Box>

      <EquipamentosKpis
        total={total}
        disponiveis={disponiveis}
        alugados={alugados}
        manutencao={manutencao}
        danificados={danificados}
        onFiltro={setFiltroStatus}
      />
      <Paper
        sx={{
          p:3,
          borderRadius:4
        }}
      >
        <Box
          mb={3} 
        >

          <Typography >
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
          </Typography>
        </Box>
        <TextField
          fullWidth
          label="Buscar equipamento..."
          value={search}
          onChange={(e)=>
              setSearch(
                e.target.value
              )
          }
        />
        {
          modoVisualizacao === 'grupos'
            ? (
              <GruposTable
                grupos={grupos}
                categorias={categorias}
              />
            )
            : (
              <EquipamentosTable
                equipamentos={filtrados}
                categorias={categorias}
                localizacoes={localizacoes}
                onEditar={abrirEdicaoEstado}
              />
            )
        }
      </Paper>
      <Dialog
        open={openNovo}
        onClose={() =>
            setOpenNovo(false)
        }
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

          <Button
            onClick={() =>
                setOpenNovo(false)
            }
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={salvarEquipamento}
          >
            Salvar
          </Button>

        </DialogActions>

      </Dialog>

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
