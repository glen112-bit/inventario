import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

type Aluguel = {
  id: number
  cliente_id: number
  cliente: string
  fecha_salida: string
  fecha_retorno: string
  estado: string
}

export default function AlugueisPage() {

  const [alugueis, setAlugueis] = useState<Aluguel[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {

    const carregar = async () => {

      try {

        const response = await axios.get(
          'http://localhost:3001/api/alugueis'
        )

        console.log(response.data)

        setAlugueis(
          Array.isArray(response.data)
            ? response.data
            : []
        )

      } catch (error) {

        console.error(error)

      }

    }

    carregar()

  }, [])

  const ativos = alugueis.filter(
    item => item.estado === 'ativo'
  ).length

  const retornados = alugueis.filter(
    item => item.estado === 'retornado'
  ).length

  const cancelados = alugueis.filter(
    item => item.estado === 'cancelado'
  ).length

  const reservados = alugueis.filter(
    item => item.estado === 'reservado'
  ).length

  const filtrados = alugueis.filter(item =>
    String(item.cliente_id)
      .includes(search)
  )

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
            Aluguéis
          </Typography>

          <Typography color="text.secondary">
            Gestão de locações
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Novo Aluguel
        </Button>

      </Box>

      <Grid container spacing={3} mb={4}>

        <Grid size={{ xs: 12, md: 3 }}>

          <Paper sx={{ p: 3, borderRadius: 4 }}>

            <Typography color="text.secondary">
              Ativos
            </Typography>

            <Typography variant="h4">
              {ativos}
            </Typography>

          </Paper>

        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>

          <Paper sx={{ p: 3, borderRadius: 4 }}>

            <Typography color="text.secondary">
              Reservados
            </Typography>

            <Typography variant="h4">
              {reservados}
            </Typography>

          </Paper>

        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>

          <Paper sx={{ p: 3, borderRadius: 4 }}>

            <Typography color="text.secondary">
              Retornados
            </Typography>

            <Typography variant="h4">
              {retornados}
            </Typography>

          </Paper>

        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>

          <Paper sx={{ p: 3, borderRadius: 4 }}>

            <Typography color="text.secondary">
              Cancelados
            </Typography>

            <Typography variant="h4">
              {cancelados}
            </Typography>

          </Paper>

        </Grid>

      </Grid>

      <Paper
        sx={{
          p: 3,
          borderRadius: 4
        }}
      >

        <Box mb={3}>

          <TextField
            fullWidth
            label="Buscar por ID do cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </Box>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>ID</TableCell>
                <TableCell>Ciente</TableCell>
                <TableCell>Saída</TableCell>
                <TableCell>Retorno</TableCell>
                <TableCell>Status</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {filtrados.map(item => (

                <TableRow
                  hover
                  key={item.id}
                >

                  <TableCell>
                    {item.id}
                  </TableCell>

                  <TableCell>
                    {item.cliente}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      item.fecha_salida
                    ).toLocaleDateString('pt-BR')}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      item.fecha_retorno
                    ).toLocaleDateString('pt-BR')}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={item.estado}
                      color={
                        item.estado === 'ativo'
                          ? 'success'
                          : item.estado === 'cancelado'
                            ? 'error'
                            : item.estado === 'reservado'
                              ? 'warning'
                              : 'default'
                      }
                    />

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </Box>

  )

}
