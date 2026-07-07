import { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Stack
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'

type Props = {
  clientes: any[]
  onEditar?: (cliente: any) => void
  onExcluir?: (cliente: any) => void
  onDetalhes?: (cliente: any) => void
}

export default function ClientesTable({
  clientes,
  onEditar,
  onExcluir,
  onDetalhes
}: Props) {

const [ openDetalhes, setOpenDetalhes ] = useState(false)
const [ clienteSelecionado, setClienteSelecionado ] = useState<any>(null)

const abrirDetalhes = (cliente:any) => {

    setClienteSelecionado(cliente)

    setOpenDetalhes(true)

}
  const formatarData = (data?: string) => {

    if (!data) return '-'

    return new Date(data).toLocaleDateString(
      'pt-BR'
    )

  }

  return (

    <Paper
      sx={{
        borderRadius: 3,
        overflow: 'hidden'
      }}
    >

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
               Cliente 
              </TableCell>

              <TableCell>
                Telefone
              </TableCell>

              <TableCell>
                Email
              </TableCell>

              <TableCell>
               Endereco 
              </TableCell>

              <TableCell>
                Cadastro
              </TableCell>

              <TableCell align="center">
                Ações
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {clientes.map((cliente) => (

              <TableRow
                hover
                key={cliente.id}
              >

                <TableCell>
                  {cliente.nome}
                </TableCell>

                <TableCell>
                  {cliente.telefone || '-'}
                </TableCell>

                <TableCell>
                  {cliente.email || '-'}
                </TableCell>

                <TableCell>
                  {cliente.endereco || '-'}
                </TableCell>

                <TableCell>
                  {formatarData(
                    cliente.created_at
                  )}
                </TableCell>

                <TableCell align="center">

                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                  >

                    <IconButton
                      color="primary"
                      onClick={() =>
                        onDetalhes?.(cliente)
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton
                      color="warning"
                      onClick={() =>
                        onEditar?.(cliente)
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => {

                        if (
                          window.confirm(
                            `Excluir ${cliente.nome}?`
                          )
                        ) {
                          onExcluir?.(cliente)
                        }

                      }}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </Stack>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  )

}
