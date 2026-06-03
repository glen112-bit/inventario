 import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  Paper,
  Button,
  Box
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

import {
  DataGrid
} from '@mui/x-data-grid'

export default function CategoriasTab() {

  const [rows, setRows] = useState([])

  useEffect(() => {

    carregar()

  }, [])

  const carregar = async () => {

    try {

      const response = await axios.get(
        '/api/config/categorias'
      )

      setRows(response.data)

    } catch (error) {

      console.error(error)

    }

  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100
    },
    {
      field: 'nombre',
      headerName: 'Categoria',
      flex: 1
    }
  ]

  return (

    <Paper
      sx={{
        p: 3,
        borderRadius: 3
      }}
    >

      <Box
        display="flex"
        justifyContent="flex-end"
        mb={2}
      >

        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nova Categoria
        </Button>

      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSizeOptions={[10,25,50]}
      />

    </Paper>

  )

} 
