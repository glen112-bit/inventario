import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Avatar,
  TextField,
  Grid
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import BusinessIcon from '@mui/icons-material/Business'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

type Cliente = {
  id:number
  nome:string
  empresa:string
  email:string
  telefone:string
  cidade:string
  activo:number
  created_at:string
}

export default function ClientesPage(){

  const [clientes,setClientes]=useState<Cliente[]>([])
  const [search,setSearch]=useState('')

  useEffect(()=>{

    const obtenerClientes=async()=>{

      try{

        const response=await axios.get(
'http://localhost:3001/api/clientes'
        )

        setClientes(response.data)

      }catch(error){

        console.error(error)

      }

    }

    obtenerClientes()
console.log
  },[])

  const clientesFiltrados=useMemo(()=>{

    return clientes.filter(cliente=>
      cliente.nome?.toLowerCase().includes(search.toLowerCase()) ||
      cliente.empresa?.toLowerCase().includes(search.toLowerCase()) ||
      cliente.email?.toLowerCase().includes(search.toLowerCase())
    )

  },[clientes,search])

  const totalClientes=clientes.length

  const clientesActivos=clientes.filter(
    c=>c.activo===1
  ).length

  const clientesInactivos=clientes.filter(
    c=>c.activo===0
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
            Clientes
          </Typography>

          <Typography color="text.secondary">
            Gestión de clientes y empresas
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nuevo Cliente
        </Button>

      </Box>

      <Grid container spacing={3} mb={4}>

        <Grid item xs={12} md={4}>
          <Paper sx={{p:3,borderRadius:3}}>
            <Typography color="text.secondary">
              Total Clientes
            </Typography>
            <Typography variant="h4">
              {totalClientes}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{p:3,borderRadius:3}}>
            <Typography color="text.secondary">
              Activos
            </Typography>
            <Typography variant="h4">
              {clientesActivos}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{p:3,borderRadius:3}}>
            <Typography color="text.secondary">
              Inactivos
            </Typography>
            <Typography variant="h4">
              {clientesInactivos}
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
            label="Buscar cliente..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </Box>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>Cliente</TableCell>
                <TableCell>Empresa</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>Estado</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {clientesFiltrados.map(cliente=>(

                <TableRow key={cliente.id} hover>

                  <TableCell>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >

                      <Avatar>
                        <BusinessIcon />
                      </Avatar>

                      <Box>

                        <Typography fontWeight={600}>
                          {cliente.nome}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          ID #{cliente.id}
                        </Typography>

                      </Box>

                    </Box>

                  </TableCell>

                  <TableCell>
                    {cliente.empresa}
                  </TableCell>

                  <TableCell>
                    {cliente.email}
                  </TableCell>

                  <TableCell>
                    {cliente.telefone}
                  </TableCell>

                  <TableCell>
                    {cliente.cidade}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={
                        cliente.activo
                          ? 'Activo'
                          : 'Inactivo'
                      }
                      color={
                        cliente.activo
                          ? 'success'
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
