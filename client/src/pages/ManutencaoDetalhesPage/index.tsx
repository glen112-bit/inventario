import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import api from '../../services/api'
import {
  Box,
  Typography,
  Paper,
  Button
} from '@mui/material'

import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'

export default function ManutencaoDetalhesPage() {

  const navigate = useNavigate()
  const { tipo } = useParams()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    carregar()

  }, [tipo])

  const carregar = async () => {

    try {

      const response = await api.get(
        '/inventario'
      )
      const equipamentos = response.data || []

      let dados = [...equipamentos]

      switch (tipo) {

        case 'valor':

          dados.sort(
            (a, b) =>
              Number(b.valor) -
              Number(a.valor)
          )

          break

        case 'marcas':

          dados.sort(
            (a, b) =>
              a.marca.localeCompare(
                b.marca
              )
          )

          break

        case 'fora-operacao':

          dados = dados.filter(
            item =>
              item.estado_actual ===
              'mantenimiento'
          )

          break

        default:
          break

      }

      setRows(
        dados.map(item => ({
          id: item.equipamento_id,
          ...item
        }))
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }
  }

  const columns: GridColDef[] = [
    {
      field: 'codigo_interno',
      headerName: 'Código',
      flex: 1
    },
    {
      field: 'marca',
      headerName: 'Marca',
      flex: 1
    },
    {
      field: 'modelo',
      headerName: 'Modelo',
      flex: 1
    },
    {
      field: 'valor',
      headerName: 'Valor',
      flex: 1
    },
    {
      field: 'estado_actual',
      headerName: 'Estado',
      flex: 1
    }
  ]

  return (

    <Box>
<Box
  display="flex"
  alignItems="center"
  gap={2}
  mb={3}
>

  <Button
    variant="outlined"
  startIcon={<ArrowBackIcon />}
    onClick={() => navigate('/manutencao')}
  >
    ← Voltar
  </Button>

  <Typography
    variant="h4"
    fontWeight={700}
  >
    {tipo}
  </Typography>

</Box>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        {tipo}
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3
        }}
      >

        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          autoHeight
          pageSizeOptions={[
            10,
            25,
            50
          ]}
        />

      </Paper>

    </Box>

  )

}
