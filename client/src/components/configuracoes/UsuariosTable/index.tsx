import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Stack
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

type Props = {
  usuarios: any[]
  onEditar?: (usuario: any) => void
  onExcluir?: (usuario: any) => void
}

export default function UsuariosTable({
  usuarios,
  onEditar,
  onExcluir
}:Props){

  const formatarData = (data?: string) => {
    if (!data) return '-'

      return new Date(data).toLocaleDateString('pt-BR')
  }
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
          overflow:'hidden'
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
                  {usuario.rol}
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color={usuario.ativo ? 'success' : 'default'}
                    label={usuario.ativo ? 'Ativo' : 'Inativo'}
                  />
                </TableCell>

                <TableCell>
                  {formatarData(usuario.created_at)}
                </TableCell>

                <TableCell align="center">

                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => onEditar?.(usuario)}
                  >
                    Editar
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    sx={{ ml: 1 }}
                    startIcon={<DeleteIcon />}
                    onClick={() => {

                      if (
                        window.confirm(
                          `Excluir ${usuario.nome}?`
                        )
                      ) {
                        onExcluir?.(usuario)
                      }

                    }}
                  >
                    Excluir
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
