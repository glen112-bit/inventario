import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import ClienteRow from './ClienteRow'

type Props = {
  clientes: any[]
}

export default function ClientesTable({
  clientes
}: Props) {

  return (

    <Paper
      sx={{
        p: 3,
        borderRadius: 4
      }}
    >

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Cliente</TableCell>

              <TableCell>Email</TableCell>

              <TableCell>Telefone</TableCell>

              <TableCell align="center">
                Aluguéis
              </TableCell>

              <TableCell align="center">
                Equipamentos
              </TableCell>

              <TableCell align="center">
                Complementos
              </TableCell>

              <TableCell>
                Cidade
              </TableCell>

              <TableCell align="center">
                Estado
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {clientes.map(cliente => (

              <ClienteRow
                key={cliente.id}
                cliente={cliente}
              />

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  )

}
