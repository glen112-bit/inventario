import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'

type Cliente = {
  id:number
  nome:string
  documento:string
  telefone:string
  email:string
  cidade:string
  ativo:boolean
}

type Props = {
  clientes:Cliente[]
  onEditar?:(cliente:Cliente)=>void
}

export default function ClientesTable({
  clientes,
  onEditar
}:Props){
  return (

    <Paper
      sx={{
        borderRadius:1,
        border:1,
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
        overflow:'hiden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              // sx={{
                // '& td': {
                  // borderBottom: 'none'
              // },
              // borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
              // }}
            >
              <TableCell>
                Nome
              </TableCell>
              <TableCell>
               docuemto 
              </TableCell>
              <TableCell>
                 Email
              </TableCell>
              <TableCell>
               Telefone 
              </TableCell>
              <TableCell>
                Endereco
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map(cliente => (
              <TableRow
                hover
                key={cliente.id}
              >
                 <TableCell>
                  {cliente.nome}
                </TableCell>
                <TableCell>
                  {cliente.documento}
                </TableCell>
                <TableCell>
                  {cliente.email}
                </TableCell>
                <TableCell>
                  {cliente.telefome}
                </TableCell>
                <TableCell>
                  {cliente.endereco}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
