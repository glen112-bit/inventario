import React, { useState, useEffect } from 'react'
import api from '../../services/api'
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
import { gerarPdfAluguel } from '../../utils/pdf/aluguelPdf'
import useClientes from '../../hooks/useClientes'
import useAlugueis from '../../hooks/useAlugueis'
import useEquipamentos from '../../hooks/useEquipamentos'
import useEquipamentosDisponiveis from '../../hooks/useEquipamentosDisponiveis'
import useAlugueisKpis from '../../hooks/useAlugueisKpis'
import useAlugueisFilter from '../../hooks/useAlugueisFilter'
import AlugueisKpis from '../../components/alugueis/AlugueisKpis'
import AlugueisTable from '../../components/alugueis/AlugueisTable'
import AlugueisHeader from '../../components/alugueis/AlugueisHeader'
import NovoAluguelDialog from '../../components/alugueis/NovoAluguelDialog'
import DetalhesAluguelDialog from '../../components/alugueis/DetalhesAluguelDialog'
import EditarAluguelDialog from '../../components/alugueis/EditarAluguelDialog'

export default function AlugueisPage() {

  const {
    equipamentos,
    equipamentosDisponiveis
  } = useEquipamentosDisponiveis()

  const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:3001/api'

  const [ search, setSearch ] = useState('')
  const [ filtroStatus, setFiltroStatus ] = useState('')
  const [ novo, setNovo ] = useState(false)
  const [ openAluguel, setOpenAluguel ] = useState(false)
  const [ openDetalhes, setOpenDetalhes ] = useState(false)
  const [ aluguelSelecionado, setAluguelSelecionado ] = useState<any>(null)
  const [ openEditar, setOpenEditar ] = useState(false)

  const abrirDetalhes = async (item:any) => {

    try {

      const response = await api.get(
        `/alugueis/${item.id}`
      )
      setAluguelSelecionado(response.data)
      setOpenDetalhes(true)
    } catch(error) {
      console.error(error)
    }
  }
  const editarAluguel = async (item:any) => {
    // console.log(item)

    const response = await api.get(
      `/alugueis/${item.id}`
    )

    // console.log(response.data)
    setAluguelSelecionado(response.data)

    setOpenEditar(true)
  }
  const {
    equipos 
  } = useEquipamentos()

  const {
    clientes
  } = useClientes()

  const {
    alugueis,
    carregarAlugueis,
    atualizarAluguel,
    buscarAluguel,
    criarAluguel,
    excluirAluguel,
    finalizarAluguel
  } = useAlugueis()

  const {
    total,
    ativos,
    reservados,
    retornados,
    cancelados
  } = useAlugueisKpis(alugueis)

  const {
    filtrados
  } = useAlugueisFilter(
    alugueis,
    search,
    filtroStatus
  )
const exportarPdf = async (item: any) => {
  try {
    const data = await buscarAluguel(item.id)
    // console.log(data)

    gerarPdfAluguel(data)

  } catch (error) {
    console.error(error)
  }
}
  return(
    <Box>
      <AlugueisHeader
        onNovo={() => {
          setOpenAluguel(true)
        }}
      />

      <Box>
      <AlugueisKpis
        ativos={ativos}
        reservados={reservados}
        retornados={retornados}
        cancelados={cancelados}
        onFiltro={setFiltroStatus}
      />

      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        mb={2}
      >

      </Box>
      <Paper
        sx={{
          p:3,
          borderRadius:2
        }}
      >

        <TextField
          fullWidth
          label="Buscar cliente..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
          )
          }
        />

        <AlugueisTable
          alugueis={filtrados}
          onDetalhes={abrirDetalhes}
          onEditar={editarAluguel}
          onExcluir={excluirAluguel}
          onFinalizar={finalizarAluguel}
          onPdf={exportarPdf}
        />

      </Paper>

      <NovoAluguelDialog
        open={openAluguel}
        onClose={() => setOpenAluguel(false)}
        clientes={clientes}
        equipamentos={equipamentos}
        onSalvar={criarAluguel}
      />
      {
        aluguelSelecionado && (
          <DetalhesAluguelDialog
            open={openDetalhes}
            aluguel={aluguelSelecionado}
            onClose={() => setOpenDetalhes(false)}
          />

        )

      }
      {
        <EditarAluguelDialog
          open={openEditar}
          aluguel={aluguelSelecionado}
          clientes={clientes}
          equipamentos={equipamentos}
          onClose={() => setOpenEditar(false)}
          onSalvar={atualizarAluguel}
        />
      }
    </Box>
  )

}
