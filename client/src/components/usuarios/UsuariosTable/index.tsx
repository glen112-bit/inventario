
// src/components/equipamentos/UsuariosTable/index.tsx

import useUsuarios from '../../../hooks/useUsuarios'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'

type Props = {
  usuarios:any[]
  onEditar: (usuario: any) => void
  onExcluir: (usuario:any) => void
}

export default function UsuariosTable({
  usuarios,
  onEditar,
  onEditar
}:Props){

  // console.log(usuarios)
  return (

    <TableContainer
      component={Paper}
    >

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Nome 
            </TableCell>

            <TableCell>
              E-mail
            </TableCell>

            <TableCell align="center">
              Telefone
            </TableCell>

            <TableCell align="center">
              Rol
            </TableCell>

            <TableCell align="center">
              Estado
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {usuarios.map(
            usuario => (

              <TableRow
                key={`${usuario.nome}-${usuario.email}-${usuario.telefone}`}
                hover
              >

                <TableCell>
                  {usuario.nome}
                </TableCell>

                <TableCell>
                  {usuario.email}
                </TableCell>

                <TableCell align="center">
                  <Chip
                    label={usuario.telefone}
                    size="small"
                  />
                </TableCell>

               <TableCell align="center">
                  <Chip
                    label={usuario.rol}
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <Chip
                    label={
                      usuario.activo
                        ? 'Ativo'
                        : 'Inativo'
                    }
                    color={
                      usuario.activo
                        ? 'success'
                        : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">

                  <IconButton
                    onClick={() => onEditar(usuario)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onExcluir(usuario.id)}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <IconButton
                    color="warning"
                    onClick={() => onAlterarSenha(usuario)}
                  >
                    <LockResetIcon />
                  </IconButton>

                </TableCell>
              </TableRow>

            )
          )}

        </TableBody>

      </Table>

    </TableContainer>

  )

}
