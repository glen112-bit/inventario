import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper
} from '@mui/material'
import IconButton from '@mui/material/IconButton'

import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

type Props = {
  alugueis:any[]
  onDetalhes:(aluguel:any)=>void
  onEditar:(aluguel:any)=>void
  onExcluir:(aluguel:any)=>void
  onFinalizar?:(aluguel:any)=>void
}

export default function AlugueisTable({
  alugueis,
  onDetalhes,
  onEditar,
  onExcluir,
  onFinalizar
}: Props) {
  // console.log(alugueis)

  return (

    <TableContainer
      component={Paper}
    >

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              ID
            </TableCell>

            <TableCell>
              Cliente
            </TableCell>

            <TableCell>
              Saída
            </TableCell>

            <TableCell>
              Retorno
            </TableCell>

            <TableCell>
              Status
            </TableCell>

            <TableCell>
              Equipos
            </TableCell>

            <TableCell>
              Ações
            </TableCell>
          </TableRow>

        </TableHead>

        <TableBody>

          {alugueis.map(item => (

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

                {
                  item.fecha_salida
                    ? new Date(
                      item.fecha_salida
                    ).toLocaleDateString(
                    'pt-BR'
                    )
                    : '-'
                }

              </TableCell>

              <TableCell>

                {
                  item.fecha_retorno
                    ? new Date(
                      item.fecha_retorno
                    ).toLocaleDateString(
                    'pt-BR'
                    )
                    : '-'
                }

              </TableCell>

              <TableCell>

                <Chip
                  size="small"
                  label={item.estado}
                  color={
                    item.estado === 'ativo'
                      ? 'success'
                      : item.estado === 'reservado'
                        ? 'warning'
                        : item.estado === 'cancelado'
                          ? 'error'
                          : 'default'
                  }
                />

              </TableCell>
              <TableCell>
                {item.total_equipamentos || 0}
              </TableCell>
              <TableCell>

                <IconButton
                  color="primary"
                  onClick={() => onDetalhes(item)}
                >
                  <VisibilityIcon />
                </IconButton>

                <IconButton
                  color="warning"
                  onClick={() => onEditar(item)}
                >
                  <EditIcon />
                </IconButton>

                {item.estado === 'ativo' && (
                  <IconButton
                    color="success"
                    onClick={() => onFinalizar?.(item)}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                )}

                <IconButton
                  color="error"
                  onClick={() => {
                    if(
                      window.confirm(
                        `Deseja excluir o aluguel #${item.id}?`
                      )
                    ){
                      onExcluir(item)
                    }
                  }}
                  >
                  <DeleteIcon />
                  </IconButton>

                  </TableCell>
                  </TableRow>

          ))}

          </TableBody>

          </Table>

          </TableContainer>

  )

}
