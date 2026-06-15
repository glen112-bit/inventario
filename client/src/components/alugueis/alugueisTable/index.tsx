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

type Props = {
  alugueis:any[]
}

export default function AlugueisTable({
  alugueis
}: Props) {

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

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </TableContainer>

  )

}
