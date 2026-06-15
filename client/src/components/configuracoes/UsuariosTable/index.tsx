
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

type Props = {
  usuarios:any[]
}

export default function UsuariosTable({usuarios}:props){

  return (

    <Paper
      sx={{
        borderRadius:1,
        border:1
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
                Nome
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell>
                Telefone
              </TableCell>
              <TableCell>
                Rol
              </TableCell>
              <TableCell>
                Ativo
              </TableCell>
              <TableCell>
                Criado
              </TableCell>
              <TableCell align="center">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map(usuario => (
              <TableRow
                hover
                key={usuario.id}
              >
                <TableCell>
                  {usuario.nome}
                </TableCell>
                <TableCell>
                  {usuario.email}
                </TableCell>
                <TableCell>
                  {usuario.telefone}
                </TableCell>
                <TableCell>
                  {usuario.rol_id}
                </TableCell>
                <TableCell>
                  {usuario.created_at}
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color={
                      usuario.ativo
                        ? 'success'
                        : 'default'
                    }
                    label={
                      usuario.ativo
                        ? 'Ativo'
                        : 'Inativo'
                    }
                  />
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
