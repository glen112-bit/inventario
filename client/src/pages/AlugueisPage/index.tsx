import React, { useState, useEffect } from 'react'
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
import useAlugueis from '../../hooks/useAlugueis'
import useAlugueisKpis from '../../hooks/useAlugueisKpis'
import useAlugueisFilter from '../../hooks/useAlugueisFilter'
import AlugueisKpis from '../../components/alugueis/AlugueisKpis'
import AlugueisTable from '../../components/alugueis/AlugueisTable'
import AlugueisHeader from '../../components/alugueis/AlugueisHeader'
import NovoAluguelDialog from '../../components/alugueis/NovoAluguelDialog'

export default function AlugueisPage() {

  const [ search, setSearch ] = useState('')
  const [ filtroStatus, setFiltroStatus ] = useState('')
  const [ novo, setNovo ] = useState(false)

  const {
    alugueis,
    carregarAlugueis
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

  return(
    <Box>
      <AlugueisHeader
        onNovo={() => {
          setOpenNovo(true)
        }}
      />


      <AlugueisKpis
        ativos={ativos}
        reservados={reservados}
        retornados={retornados}
        cancelados={cancelados}
        onFiltro={setFiltroStatus}
      />

      <Paper
        sx={{
          p:3,
          borderRadius:4
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
        />

      </Paper>

      <NovoAluguelDialog
        open={novo}
        onClose={() =>
          setNovo(false)
        }
      />
    </Box>
  )

}
