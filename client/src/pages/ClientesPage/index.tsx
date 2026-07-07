import { useEffect, useMemo, useState } from 'react'
import api from '../../services/api'
import useClientesFilter from '../../hooks/useClientesFilter'
import useClientes from '../../hooks/useClientes'
import NovoClienteDialog from '../../components/clientes/NovoClienteDialog'

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

import PeopleIcon from '@mui/icons-material/People'
import HandshakeIcon from '@mui/icons-material/Handshake'
import BlockIcon from '@mui/icons-material/Block'
import AddIcon from '@mui/icons-material/Add'
import BusinessIcon from '@mui/icons-material/Business'
import KpiCard from '../../components/kpiCard'

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
  empresa?:string
  documento:string
  email:string
  telefone:string
  endereco:string
  cidade?:string
  activo?:number
  created_at:string
}

export default function ClientesPage(){

  const [ clientes,setClientes ]=useState<Cliente[]>([])
  const [ search,setSearch ] = useState('')
  const [ filtroStatus, setFiltroStatus ] = useState('')
  const [ openNovo, setOpenNovo ] = useState(false)

  const usuario = JSON.parse(
    localStorage.getItem('usuario') || '{}'
  )
  const {
    filtrados
  } = useClientesFilter(
    clientes,
    search,
    filtroStatus
  )
  const {
    criarCliente,
  } = useClientes()

  const carregarClientes = async () => {

    try {

      const response = await api.get(
        '/clientes'
      )

      setClientes(response.data)

    } catch(error) {

      console.error(error)

    }

  }
  useEffect(() => {
    carregarClientes()
  },[])

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
        {
          (usuario.rol === 'admin' ||
           usuario.rol === 'operador') && (
             <Button
               variant="contained"
               startIcon={<AddIcon />}
               onClick={() => setOpenNovo(true)}
             >
               Nuevo Cliente
             </Button>
          )
        }
      </Box>

      <Grid container spacing={3} mb={4}>

        <Grid size={{ xs:12, md:4 }}>
          <KpiCard
            title="Clientes"
            value={totalClientes}
            icon={<PeopleIcon />}
            color="#3b82f6"
          />
        </Grid>

        <Grid size={{ xs:12, md:4 }}>
          <KpiCard
            title="Activos"
            value={clientesActivos}
            icon={<HandshakeIcon />}
            color="#10b981"
          />
        </Grid>

        <Grid size={{ xs:12, md:4 }}>
          <KpiCard
            title="Inactivos"
            value={clientesInactivos}
            icon={<BlockIcon />}
            color="#ef4444"
          />
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
                <TableCell>Email</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Ciudad</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {filtrados.map(cliente=>(

                <TableRow key={cliente.id} hover>


                  <TableCell>
                      {cliente.nome}
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

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>
      <NovoClienteDialog
        open={openNovo}
        onClose={() => setOpenNovo(false)}
        onSalvar={async (dados) => {

          await criarCliente(dados)

          await carregarClientes(dados)

          setClientes(response.data)

          setOpenNovo(false)

        }}
      />
    </Box>

  )

}
