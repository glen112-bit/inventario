import { useEffect,useMemo,useState } from 'react'
import axios from 'axios'

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Grid,
  Avatar
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import Inventory2Icon from '@mui/icons-material/Inventory2'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

type Equipamento={
  id:number
nome:string
numero_serie:string
categoria:string
marca:string
estado_actual:string
ubicacion:string
valor_compra:number
}

export default function EquipamentosPage(){

  const [equipos,setEquipos]=useState<Equipamento[]>([])
  const [search,setSearch]=useState('')

  useEffect(()=>{

    const obtenerEquipamentos=async()=>{

      try{

        const response=await axios.get(
          'http://localhost:3001/api/inventario'
        )

        setEquipos(response.data)

      }catch(error){

        console.error(error)

      }

    }

    obtenerEquipamentos()
    console.log(equipos)
  },[])

  const filtrados=useMemo(()=>{

    return equipos.filter(e=>

                          e.nome?.toLowerCase().includes(search.toLowerCase()) ||

                          e.numero_serie?.toLowerCase().includes(search.toLowerCase()) ||

                          e.categoria?.toLowerCase().includes(search.toLowerCase())

                         )

  },[equipos,search])

  const total=equipos.length

  const disponiveis=equipos.filter(
    e=>e.estado_actual==='disponivel'
  ).length

  const alugados=equipos.filter(
    e=>e.estado_actual==='alugado'
  ).length

  const manutencao=equipos.filter(
    e=>e.estado_actual==='manutencao'
  ).length

  return(

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

          <Typography color="text.secondary">
            Gestão de equipos de áudio
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Novo Equipamento
        </Button>

      </Box>

      <Grid container spacing={3} mb={4}>

        <Grid item xs={12} md={3}>
          <Paper sx={{p:3,borderRadius:4}}>
            <Typography color="text.secondary">
              Total
            </Typography>
            <Typography variant="h4">
              {total}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{p:3,borderRadius:4}}>
            <Typography color="text.secondary">
              Disponíveis
            </Typography>
            <Typography variant="h4">
              {disponiveis}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{p:3,borderRadius:4}}>
            <Typography color="text.secondary">
              Alugados
            </Typography>
            <Typography variant="h4">
              {alugados}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{p:3,borderRadius:4}}>
            <Typography color="text.secondary">
              Manutenção
            </Typography>
            <Typography variant="h4">
              {manutencao}
            </Typography>
          </Paper>
        </Grid>

      </Grid>

      <Paper
        sx={{
          p:3,
          borderRadius:4
        }}
      >

        <Box mb={3}>

          <TextField
            fullWidth
            label="Buscar equipamento..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </Box>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>Equipamento</TableCell>
                <TableCell>Série</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Localização</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Status</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {filtrados.map((equipamento)=>(

                <TableRow
                  hover
                  key={equipamento.id}
                >

                  <TableCell>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >

                      <Avatar>

                        <Inventory2Icon />

                      </Avatar>

                      <Typography
                        fontWeight={600}
                      >
                        {equipamento.nome}
                      </Typography>

                    </Box>

                  </TableCell>

                  <TableCell>
                    {equipamento.numero_serie}
                  </TableCell>

                  <TableCell>
                    {equipamento.categoria}
                  </TableCell>

                  <TableCell>
                    {equipamento.marca}
                  </TableCell>

                  <TableCell>
                    {equipamento.ubicacion}
                  </TableCell>

                  <TableCell>
                    R$ {equipamento.valor_compra}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={
                        equipamento.estado_actual === 'disponivel'
                          ? 'Disponível'
                          : equipamento.estado_actual === 'alugado'
                            ? 'Alugado'
                            : equipamento.estado_actual === 'manutencao'
                              ? 'Manutenção'
                              : equipamento.estado_actual
                      }
                      color={
                        equipamento.estado_actual === 'disponivel'
                          ? 'success'
                          : equipamento.estado_actual === 'alugado'
                            ? 'warning'
                            : equipamento.estado_actual === 'manutencao'
                              ? 'error'
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
