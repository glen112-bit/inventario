import { useState } from 'react'
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

type marca = {
  id:number
  nome:string
}

type Props = {
  marcas:Marca[]
  onEditar?:(cliente:Cliente)=>void
}

export default function MarcasTable({
  
  clientes,
  onEditar
}:Props){
const [marcas, setMarcas] = useState('')
  return (

    <Paper
      sx={{
        borderRadius:1
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
            <TableRow>
              <TableCell>
                id
              </TableCell>
              <TableCell>
                nome
              </TableCell>
              
              <TableCell align="center">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marcas.map(marca => (
              <TableRow
                hover
                key={cliente.id}
              >
                <TableCell>
                  {mara.id}
                </TableCell>
                <TableCell>
                  {cliente.nome}
                </TableCell>
                
               
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={
                      <EditIcon />
                    }
                    onClick={() =>
                      onEditar?.(
                        cliente
                      )
                    }
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
